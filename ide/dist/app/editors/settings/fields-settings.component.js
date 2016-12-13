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
var forms_1 = require('@angular/forms');
var element_service_1 = require('../../services/element.service');
var core_2 = require('@angular/core');
var FieldsSettingsComponent = (function () {
    function FieldsSettingsComponent(_elementService, changeDetector) {
        this._elementService = _elementService;
        this.changeDetector = changeDetector;
        this.fieldTypeValue = "GOOGLECHART";
        this.conditional = this.conditionalInit();
        this.isDirty = new core_1.EventEmitter();
        this.titleChanged = new core_1.EventEmitter();
        this.elementDeleted = new core_1.EventEmitter();
    }
    FieldsSettingsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.getElement();
        this.form.control.valueChanges
            .subscribe(function () { return _this.isDirty.emit(true); });
    };
    FieldsSettingsComponent.prototype.conditionalInit = function () {
        return {
            "googlechart": {},
            "text": {},
            "number": {},
            "datetime": {},
            "datagrid": {},
            "doclink": {},
            "googlevisualization": {},
            "selection": {},
            "name": {},
            "richtext": {},
            "boolean": {},
            "attachment": {}
        };
    };
    FieldsSettingsComponent.prototype.getElement = function () {
        var _this = this;
        this._elementService.getElement(this.id)
            .subscribe(function (data) {
            if (data.field_type === 'SELECTION')
                data.selectionlist = data.selectionlist.join('\n');
            _this.data = data;
            _this.fieldTypeValue = data.field_type;
            _this.updateConditional();
            _this.changeDetector.detectChanges(); // this way the tab isn't marked as unsaved
            _this.isDirty.emit(false);
        }, function (err) { return console.error(err); });
    };
    FieldsSettingsComponent.prototype.onSubmit = function (id, title, description, fieldMode, indexType, readTemplate, editTemplate, mandatory, toBeIndexed) {
        var _this = this;
        var element = {
            "title": title,
            "description": description,
            "field_type": this.fieldTypeValue,
            "field_mode": fieldMode,
            "read_template": readTemplate,
            "edit_template": editTemplate,
            "mandatory": mandatory,
            "to_be_indexed": toBeIndexed
        };
        this._elementService.patchElement(id, JSON.stringify(element)).subscribe(function () {
            _this.titleChanged.emit(_this.data.title);
            _this.patchConditional();
        }, function (err) { return console.error(err); });
    };
    FieldsSettingsComponent.prototype.updateConditional = function () {
        switch (this.fieldTypeValue) {
            case "GOOGLECHART":
                this.conditional.googlechart = {
                    "editrows": this.data.editrows
                };
                break;
            case "TEXT":
                this.conditional.text = {
                    "carriage": this.data.carriage,
                    "size": this.data.size,
                    "widget": this.data.widget
                };
                break;
            case "NUMBER":
                this.conditional.number = {
                    "format": this.data.format,
                    "number_type": this.data.number_type,
                    "size": this.data.size
                };
                break;
            case "DATETIME":
                this.conditional.datetime = {
                    "format": this.data.format,
                    "startingyear": this.data.startingyear,
                    "widget": this.data.widget
                };
                break;
            case "DATAGRID":
                this.conditional.datagrid = {
                    "associated_form": this.data.associated_form,
                    "field_mapping": this.data.field_mapping,
                    "widget": this.data.widget
                };
                break;
            case "DOCLINK":
                this.conditional.doclink = {
                    "labelcolumn": this.data.labelcolumn,
                    "separator": this.data.separator,
                    "sourceview": this.data.sourceview,
                    "widget": this.data.widget
                };
                break;
            case "GOOGLEVISUALIZATION":
                this.conditional.googlevisualization = {
                    "chartid": this.data.chartid
                };
                break;
            case "SELECTION":
                this.conditional.selection = {
                    "separator": this.data.separator,
                    "selectionlist": this.data.selectionlist,
                    "widget": this.data.widget
                };
                break;
            case "NAME":
                this.conditional.name = {
                    "restricttogroup": this.data.restricttogroup,
                    "selector": this.data.selector,
                    "separator": this.data.separator,
                    "type": this.data.type
                };
                break;
            case "RICHTEXT":
                this.conditional.richtext = {
                    "height": this.data.height
                };
                break;
            case "BOOLEAN":
                this.conditional.boolean = {
                    "widget": this.data.widget
                };
                break;
            case "ATTACHMENT":
                this.conditional.attachment = {
                    "type": this.data.type
                };
                break;
        }
    };
    FieldsSettingsComponent.prototype.patchConditional = function () {
        var _this = this;
        var element = JSON.parse(JSON.stringify(this.conditional[this.fieldTypeValue.toLowerCase()]));
        if (this.fieldTypeValue === "SELECTION") {
            element.selectionlist = this.conditional.selection.selectionlist.split('\n');
        }
        this._elementService.patchElement(this.id, JSON.stringify(element)).subscribe(function () { _this.isDirty.emit(false); });
    };
    FieldsSettingsComponent.prototype.deleteElement = function () {
        var _this = this;
        this._elementService.deleteElement(this.data["@id"]).subscribe(function () { return _this.elementDeleted.emit(_this.data["@id"]); }, function (err) { return console.error(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FieldsSettingsComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], FieldsSettingsComponent.prototype, "tree", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldsSettingsComponent.prototype, "isDirty", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldsSettingsComponent.prototype, "titleChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FieldsSettingsComponent.prototype, "elementDeleted", void 0);
    __decorate([
        core_1.ViewChild('form'), 
        __metadata('design:type', Object)
    ], FieldsSettingsComponent.prototype, "form", void 0);
    __decorate([
        core_1.ViewChild('theForm'), 
        __metadata('design:type', Object)
    ], FieldsSettingsComponent.prototype, "theForm", void 0);
    FieldsSettingsComponent = __decorate([
        core_1.Component({
            selector: 'plomino-fields-settings',
            templateUrl: './fields-settings.component.html',
            styles: ["\n        form {\n            margin: 15px;\n        }\n        .help-block {\n            font-style: italic;\n        }\n        .specificOptions {\n            border: 1px solid #AAAAAA;\n            border-radius: 5px;\n            padding: 15px;\n            padding-bottom: 0px;\n            margin-bottom: 15px;\n        }\n        .specificOptions legend {\n            width: inherit;\n            font-size: inherit;\n            font-style: italic;\n            border-bottom: 0;\n            margin-bottom: 0;\n        }\n    ", './settings-styles.css'],
            providers: [element_service_1.ElementService],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [element_service_1.ElementService, core_2.ChangeDetectorRef])
    ], FieldsSettingsComponent);
    return FieldsSettingsComponent;
}());
exports.FieldsSettingsComponent = FieldsSettingsComponent;
//# sourceMappingURL=fields-settings.component.js.map