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
var element_service_1 = require('../services/element.service');
var ng2_dnd_1 = require('ng2-dnd');
var TinyMCEComponent = (function () {
    function TinyMCEComponent(_elementService, zone) {
        this._elementService = _elementService;
        this.zone = zone;
        this.isDragged = false;
        this.isDirty = new core_1.EventEmitter();
    }
    TinyMCEComponent.prototype.ngOnInit = function () {
        var _this = this;
        var tiny = this;
        tinymce.init({
            selector: '.tinymce-wrap',
            plugins: ["code", "save", "link"],
            toolbar: "save | undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | unlink link | image",
            save_onsavecallback: function () { _this.saveFormLayout(); },
            setup: function (editor) {
                editor.on('change', function (e) {
                    tiny.isDirty.emit(true);
                });
            },
            content_style: './tiny-mce-content.css',
            menubar: "file edit insert view format table tools",
            height: "780",
            resize: false
        });
        this.getFormLayout();
    };
    TinyMCEComponent.prototype.getFormLayout = function () {
        this._elementService.getElementFormLayout(this.id).subscribe(function (data) { tinymce.activeEditor.setContent(data ? data : ''); }, function (err) { return console.error(err); });
    };
    TinyMCEComponent.prototype.saveFormLayout = function () {
        var tiny = this;
        if (tinymce.activeEditor !== null) {
            this._elementService.patchElement(this.id, JSON.stringify({
                "form_layout": tinymce.activeEditor.getContent()
            })).subscribe(function () {
                tiny.isDirty.emit(false);
            }, function (err) { return console.error(err); });
        }
    };
    TinyMCEComponent.prototype.allowDrop = function () {
        var _this = this;
        return function (dragData) { return dragData.parent === _this.id; };
    };
    TinyMCEComponent.prototype.dropped = function (element) {
        tinymce.activeEditor.execCommand('mceInsertContent', false, '<p><span class="' + element.dragData.type.charAt(0).toLowerCase() +
            element.dragData.type.slice(1) + 'Class">' +
            element.dragData.name.split('/').pop() + '</span></p>');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TinyMCEComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TinyMCEComponent.prototype, "isDragged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TinyMCEComponent.prototype, "isDirty", void 0);
    TinyMCEComponent = __decorate([
        core_1.Component({
            selector: 'plomino-tiny-mce',
            template: "\n    <form #theEditor><textarea class=\"tinymce-wrap\"></textarea></form>\n    <div *ngIf=\"isDragged\" [style.height]=\"theEditor.offsetHeight+'px'\" [style.margin-top]=\"'-'+theEditor.offsetHeight+'px'\" class=\"drop-zone\" dnd-droppable [allowDrop]=\"allowDrop()\" (onDropSuccess)=\"dropped($event)\"></div>\n    ",
            styles: ["\n        .drop-zone {\n            width: 100%;\n            background-color: black;\n            opacity: 0;\n            transition: opacity 0.5s linear;\n        }\n        .dnd-drag-over {\n            opacity: 0.1;\n        }\n        "],
            directives: [ng2_dnd_1.DND_DIRECTIVES],
            providers: [element_service_1.ElementService]
        }), 
        __metadata('design:paramtypes', [element_service_1.ElementService, core_1.NgZone])
    ], TinyMCEComponent);
    return TinyMCEComponent;
}());
exports.TinyMCEComponent = TinyMCEComponent;
//# sourceMappingURL=tiny-mce.component.js.map