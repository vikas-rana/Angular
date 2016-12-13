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
var core_1 = require('@angular/core');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var element_service_1 = require('../services/element.service');
var ng2_dnd_1 = require('ng2-dnd');
var TreeComponent = (function () {
    function TreeComponent(_elementService) {
        this._elementService = _elementService;
        this.edit = new core_1.EventEmitter();
        this.add = new core_1.EventEmitter();
        this.isDragged = new core_1.EventEmitter();
        this.filtered = false;
    }
    TreeComponent.prototype.isItSelected = function (name) {
        if (name === this.selected) {
            if (this.selected != this.previousSelected) {
                this.previousSelected = this.selected;
                this.scroll();
            }
            return true;
        }
        else {
            return false;
        }
    };
    TreeComponent.prototype.scroll = function () {
        if (this.element != undefined)
            for (var _i = 0, _a = this.element._results; _i < _a.length; _i++) {
                var elt = _a[_i];
                if (elt.nativeElement.className === 'selected')
                    elt.nativeElement.scrollIntoView();
            }
    };
    TreeComponent.prototype.onEdit = function (event) {
        this.edit.emit(event);
    };
    TreeComponent.prototype.onAdd = function (event) {
        this.add.emit(event);
    };
    TreeComponent.prototype.sendSearch = function (query) {
        var _this = this;
        if (query === '') {
            this.searchResults = null;
            this.filtered = false;
        }
        else
            this._elementService.searchElement(query).subscribe(function (data) { _this.searchResults = data; _this.filtered = true; }, function (err) { return console.error(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "edit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "add", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "isDragged", void 0);
    __decorate([
        core_1.ViewChildren('selectable'), 
        __metadata('design:type', Object)
    ], TreeComponent.prototype, "element", void 0);
    TreeComponent = __decorate([
        core_1.Component({
            selector: 'plomino-tree',
            templateUrl: './tree.component.html',
            styleUrls: './tree.component.css',
            directives: [ng2_bootstrap_1.CollapseDirective, ng2_dnd_1.DND_DIRECTIVES],
            providers: [element_service_1.ElementService]
        }), 
        __metadata('design:paramtypes', [element_service_1.ElementService])
    ], TreeComponent);
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map