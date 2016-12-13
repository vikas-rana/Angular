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
var FormsSettingsComponent = (function () {
    function FormsSettingsComponent(_elementService) {
        this._elementService = _elementService;
        this.isDirty = new core_1.EventEmitter();
        this.titleChanged = new core_1.EventEmitter();
        this.elementDeleted = new core_1.EventEmitter();
    }
    FormsSettingsComponent.prototype.ngOnInit = function () {
        this.getElement();
    };
    FormsSettingsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.form.control.valueChanges
            .subscribe(function () { return _this.isDirty.emit(true); });
    };
    FormsSettingsComponent.prototype.getElement = function () {
        var _this = this;
        this._elementService.getElement(this.id)
            .subscribe(function (data) {
            _this.data = data;
            _this.isDirty.emit(false);
        }, function (err) { return console.error(err); });
    };
    FormsSettingsComponent.prototype.onSubmit = function (id, title, description, formMethod, hideDefaultActions, isPage, searchForm, searchView, resourcesJS, resourcesCSS) {
        var _this = this;
        var element = {
            "title": title,
            "description": description,
            "form_method": formMethod,
            "hide_default_actions": hideDefaultActions,
            "isPage": isPage,
            "isSearchForm": searchForm,
            "search_view": searchView,
            "resources_js": resourcesJS,
            "resources_css": resourcesCSS
        };
        this._elementService.patchElement(id, JSON.stringify(element)).subscribe(function () {
            _this.titleChanged.emit(_this.data.title);
            _this.isDirty.emit(false);
        }, function (err) { return console.error(err); });
    };
    FormsSettingsComponent.prototype.deleteElement = function () {
        var _this = this;
        this._elementService.deleteElement(this.data["@id"]).subscribe(function () { return _this.elementDeleted.emit(_this.data["@id"]); }, function (err) { return console.error(err); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], FormsSettingsComponent.prototype, "id", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormsSettingsComponent.prototype, "isDirty", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormsSettingsComponent.prototype, "titleChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], FormsSettingsComponent.prototype, "elementDeleted", void 0);
    __decorate([
        core_1.ViewChild('form'), 
        __metadata('design:type', Object)
    ], FormsSettingsComponent.prototype, "form", void 0);
    FormsSettingsComponent = __decorate([
        core_1.Component({
            selector: 'plomino-forms-settings',
            template: require('./forms-settings.component.html'),
            styles: ['form {margin: 15px;} .help-block {font-style: italic;}'],
            providers: [element_service_1.ElementService],
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [element_service_1.ElementService])
    ], FormsSettingsComponent);
    return FormsSettingsComponent;
}());
exports.FormsSettingsComponent = FormsSettingsComponent;
//# sourceMappingURL=forms-settings.component.js.map