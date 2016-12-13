"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Core
var core_1 = require('@angular/core');
// External Components
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
// Components
var tree_component_1 = require('./tree-view/tree.component');
var tiny_mce_component_1 = require('./editors/tiny-mce.component');
var ace_editor_component_1 = require('./editors/ace-editor.component');
var forms_settings_component_1 = require('./editors/settings/forms-settings.component');
var fields_settings_component_1 = require('./editors/settings/fields-settings.component');
var actions_settings_component_1 = require('./editors/settings/actions-settings.component');
var hide_when_settings_component_1 = require('./editors/settings/hide_when-settings.component');
var views_settings_component_1 = require('./editors/settings/views-settings.component');
var columns_settings_component_1 = require('./editors/settings/columns-settings.component');
var agents_settings_component_1 = require('./editors/settings/agents-settings.component');
var modal_component_1 = require('./modal.component');
// Services
var tree_service_1 = require('./services/tree.service');
var element_service_1 = require('./services/element.service');
var AppComponent = (function () {
    function AppComponent(_treeService, _elementService) {
        this._treeService = _treeService;
        this._elementService = _elementService;
        this.tabs = [];
        this.isModalOpen = false;
        this.aceNumber = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getTree();
    };
    AppComponent.prototype.getTree = function () {
        var _this = this;
        this._treeService.getTree()
            .subscribe(function (data) { _this.data = data; }, function (err) { return console.error(err); });
    };
    AppComponent.prototype.onAdd = function (event) {
        event.isAction = event.type == "PlominoAction";
        this.modalData = event;
        this.isModalOpen = true;
    };
    AppComponent.prototype.indexOf = function (type) {
        var index = {};
        var parentToSearch;
        if (type.parent === undefined)
            parentToSearch = type.type;
        else
            parentToSearch = type.parentType;
        switch (parentToSearch) {
            case 'Forms':
                index.parent = 0;
                break;
            case 'Views':
                index.parent = 1;
                break;
            case 'Agents':
                index.parent = 2;
                break;
        }
        if (type.parent != undefined) {
            index.index = this.searchParentIndex(type.parent, index.parent);
            switch (index.parent) {
                case 0:
                    switch (type.type) {
                        case 'Fields':
                            index.child = 0;
                            break;
                        case 'Actions':
                            index.child = 1;
                            break;
                    }
                    break;
                case 1:
                    switch (type.type) {
                        case 'Actions':
                            index.child = 0;
                            break;
                        case 'Columns':
                            index.child = 1;
                            break;
                    }
                    break;
            }
        }
        return index;
    };
    AppComponent.prototype.searchParentIndex = function (parent, index) {
        for (var i = 0; i < this.data[index].children.length; i++) {
            if (this.data[index].children[i].label === parent)
                return i;
        }
        return -1;
    };
    AppComponent.prototype.onEdit = function (event) {
        this.tabs.push(this.buildTab(event));
    };
    AppComponent.prototype.onModalClose = function (event) {
        var _this = this;
        this.isModalOpen = false;
        var newElement = {
            "@type": event.type,
            "title": event.name
        };
        if (event.type == "PlominoAgent")
            newElement.content = "";
        if (event.type == "PlominoAction")
            newElement.action_type = event.action_type;
        this._elementService.postElement(event.url, newElement)
            .subscribe(function (data) { return _this.getTree(); });
    };
    AppComponent.prototype.onTabClose = function (tab) {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
        if (tab.editor === 'code')
            this.aceNumber++;
        if (this.tabs.length === 0)
            this.selected = null;
    };
    AppComponent.prototype.index = function (type, parentIndex) {
        if (parentIndex === undefined)
            switch (type) {
                case 'Forms':
                    return 0;
                case 'Views':
                    return 1;
                case 'Agents':
                    return 2;
            }
        else {
            switch (parentIndex) {
                case 0:
                    switch (type) {
                        case 'Fields':
                            return 0;
                        case 'Actions':
                            return 1;
                        case 'Hide Whens':
                            return 2;
                    }
                    break;
                case 1:
                    switch (type) {
                        case 'Actions':
                            return 0;
                        case 'Columns':
                            return 1;
                    }
                    break;
                case 2:
                    return 0;
            }
        }
    };
    AppComponent.prototype.onTabSelect = function (path) {
        this.selected = this.retrieveTab(path);
    };
    AppComponent.prototype.retrieveTab = function (path) {
        var pindex = this.index(path[0].type);
        for (var _i = 0, _a = this.data[pindex].children; _i < _a.length; _i++) {
            var elt = _a[_i];
            if (elt.label == path[0].name) {
                if (path.length > 1) {
                    var cindex = this.index(path[1].type, pindex);
                    for (var _b = 0, _c = elt.children[cindex].children; _b < _c.length; _b++) {
                        var celt = _c[_b];
                        if (celt.label == path[1].name) {
                            return celt;
                        }
                    }
                }
                return elt;
            }
        }
    };
    AppComponent.prototype.buildTab = function (tab) {
        var newtab = { title: tab.label, editor: tab.editor, path: tab.path, url: tab.url };
        if (newtab.editor === 'code') {
            this.aceNumber++;
        }
        return newtab;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'plomino-app',
            templateUrl: './app.component.html',
            styleUrls: './app.component.css',
            directives: [
                tree_component_1.TreeComponent,
                ng2_bootstrap_1.TabDirective,
                tiny_mce_component_1.TinyMCEComponent,
                ace_editor_component_1.ACEEditorComponent,
                modal_component_1.PlominoModalComponent,
                forms_settings_component_1.FormsSettingsComponent,
                fields_settings_component_1.FieldsSettingsComponent,
                actions_settings_component_1.ActionsSettingsComponent,
                hide_when_settings_component_1.HideWhenSettingsComponent,
                views_settings_component_1.ViewsSettingsComponent,
                columns_settings_component_1.ColumnsSettingsComponent,
                agents_settings_component_1.AgentsSettingsComponent
            ],
            providers: [tree_service_1.TreeService, element_service_1.ElementService]
        }), 
        __metadata('design:paramtypes', [tree_service_1.TreeService, element_service_1.ElementService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map