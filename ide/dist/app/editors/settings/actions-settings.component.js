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
var ActionsSettingsComponent = (function () {
    function ActionsSettingsComponent(_elementService) {
        this._elementService = _elementService;
        this.isDirty = new core_1.EventEmitter();
        this.titleChanged = new core_1.EventEmitter();
        this.elementDeleted = new core_1.EventEmitter();
    }
    ActionsSettingsComponent.prototype.ngOnInit = function () {
        this.getElement();
    };
    ActionsSettingsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.form.control.valueChanges
            .subscribe(function () { return _this.isDirty.emit(true); });
    };
    ActionsSettingsComponent.prototype.getElement = function () {
        var _this = this;
        this._elementService.getElement(this.id)
            .subscribe(function (data) {
            _this.data = data;
            _this.isDirty.emit(false);
        }, function (err) { return console.error(err); });
    };
    ActionsSettingsComponent.prototype.onSubmit = function (id, title, description, actionType, actionDisplay, inActionBar) {
        var _this = this;
        var element = {
            "title": title,
            "description": description,
            "action_type": actionType,
            "action_display": actionDisplay,
            "in_action_bar": inActionBar
        };
        this._elementService.patchElement(id, JSON.stringify(element)).subscribe(function () {
            _this.titleChanged.emit(_this.data.title);
            _this.isDirty.emit(false);
        }, function (err) { return console.error(err); });
    };
    ActionsSettingsComponent.prototype.deleteElement = function () {
        var _this = this;
        this._elementService.deleteElement(this.data["@id"]).subscribe(function () { return _this.elementDeleted.emit(_this.data["@id"]); }, function (err) { return console.error(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ActionsSettingsComponent.prototype, "id", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionsSettingsComponent.prototype, "isDirty", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionsSettingsComponent.prototype, "titleChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ActionsSettingsComponent.prototype, "elementDeleted", void 0);
    __decorate([
        core_1.ViewChild('form'), 
        __metadata('design:type', Object)
    ], ActionsSettingsComponent.prototype, "form", void 0);
    ActionsSettingsComponent = __decorate([
        core_1.Component({
            selector: 'plomino-actions-settings',
            templateUrl: './actions-settings.component.html',
            styles: ['form {margin: 15px;} .help-block {font-style: italic;}'],
            providers: [element_service_1.ElementService],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [element_service_1.ElementService])
    ], ActionsSettingsComponent);
    return ActionsSettingsComponent;
}());
exports.ActionsSettingsComponent = ActionsSettingsComponent;
//# sourceMappingURL=actions-settings.component.js.map