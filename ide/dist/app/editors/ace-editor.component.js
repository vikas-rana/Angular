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
var popover_component_1 = require('./popover.component');
var element_service_1 = require('../services/element.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ACEEditorComponent = (function () {
    function ACEEditorComponent(_elementService) {
        this._elementService = _elementService;
        this.isDirty = new core_1.EventEmitter();
    }
    ACEEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = 'editor' + this.aceNumber;
        this._elementService.getElement(this.url).subscribe(function (data) {
            _this.type = data['@type'];
            _this.fullType = data.parent['@type']
                .replace('Plomino', '')
                .replace('Database', '') + _this.type.replace('Plomino', '');
            _this.name = _this.url.replace(window.location.href
                .replace("++resource++Products.CMFPlomino/ide/index.html", ""), "");
            _this._elementService.getElementCode("../../code?" + _this.fullType + "=" + _this.name)
                .subscribe(function (code) {
                var parsed = JSON.parse(code);
                _this.editor.setValue(parsed.code, -1);
                _this.methodList = parsed.methods;
                _this.editor.getSession().on('change', function () {
                    _this.isDirty.emit(true);
                });
                _this.addMethodInfos();
                _this.editor.getSession().setUndoManager(new ace.UndoManager());
            });
        });
    };
    ACEEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.editor = ace.edit(this.id);
        this.editor.setTheme("ace/theme/xcode");
        this.editor.getSession().setMode("ace/mode/python");
        this.editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
        var staticWordCompleter = {
            getCompletions: function (editor, session, pos, prefix, callback) {
                var wordList = _this.getMethodList();
                callback(null, wordList.map(function (word) {
                    return {
                        caption: word.caption,
                        value: word.value,
                        meta: "methods"
                    };
                }));
            }
        };
        this.editor.completers = [];
        this.editor.completers.push(staticWordCompleter);
        this.editor.commands.addCommand({
            name: 'saveFile',
            bindKey: {
                win: 'Ctrl-S',
                mac: 'Command-S',
                sender: 'editor|cli'
            },
            exec: function (env, args, request) {
                _this.save();
            }
        });
    };
    ACEEditorComponent.prototype.addMethod = function (id) {
        this.editor.getSession().insert({
            row: this.editor.getSession().getLength(),
            column: 0
        }, "\n\n## START " + id + " {\n\n## END " + id + " }");
        this.addMethodInfos();
    };
    ACEEditorComponent.prototype.save = function () {
        var _this = this;
        this._elementService.postElementCode("../../@@code", this.fullType, this.name, this.editor.getSession().getValue()).subscribe(function (response) {
            _this.addMethodInfos();
            if (response.type == "OK") {
                _this.isDirty.emit(false);
            }
            if (response.type == "Error") {
                var annotations = _this.editor.getSession().getAnnotations();
                annotations.push({
                    row: response.line - 1,
                    html: response.error,
                    type: "error"
                });
                _this.editor.getSession().setAnnotations(annotations);
            }
        });
    };
    ACEEditorComponent.prototype.addMethodInfos = function () {
        var methods = [];
        for (var i = this.editor.getSession().getLength(); i >= 0; i--) {
            if (this.editor.getSession().getLine(i).match(/^##.START.*{$/) != null) {
                var id = this.editor.getSession().getLine(i)
                    .match(/^##.START(.*){$/).pop().trim();
                var _a = this.getMethodInfos(id), name_1 = _a.name, desc = _a.desc, error = _a.error;
                methods.push({
                    row: i,
                    html: "<strong>" + name_1 + "</strong> <br>" + desc,
                    type: error ? "error" : "info"
                });
            }
        }
        this.editor.getSession().setAnnotations(methods);
    };
    ACEEditorComponent.prototype.getMethodInfos = function (id) {
        for (var _i = 0, _a = this.methodList; _i < _a.length; _i++) {
            var method = _a[_i];
            if (method.id === id) {
                return {
                    name: method.name,
                    desc: method.desc,
                    error: false
                };
            }
        }
        return {
            name: 'Not found',
            desc: 'Method doesn\'t exist',
            error: true
        };
    };
    ACEEditorComponent.prototype.getMethodList = function () {
        var buildMethod = function (name) {
            return {
                caption: name,
                value: "## START " + name + " {\n\n## END " + name + " }",
                popup: false
            };
        };
        switch (this.type) {
            case "PlominoForm":
                return this.methodList.map(function (method) { return ({
                    caption: method.id,
                    value: "## START " + method.id + " {\n\n## END " + method.id + " }",
                    popup: false
                }); });
            case "PlominoField":
                return [
                    buildMethod("formula"),
                    buildMethod("validation_formula"),
                    buildMethod("html_attributes_formula")
                ];
            case "PlominoAction":
                return [
                    buildMethod("content"),
                    buildMethod("hidewhen")
                ];
            case "PlominoView":
                return [
                    buildMethod("selection_formula"),
                    buildMethod("form_formula"),
                    buildMethod("onOpenView")
                ];
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], ACEEditorComponent.prototype, "aceNumber", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ACEEditorComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ACEEditorComponent.prototype, "path", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ACEEditorComponent.prototype, "isDirty", void 0);
    ACEEditorComponent = __decorate([
        core_1.Component({
            selector: 'plomino-ace-editor',
            templateUrl: "./ace-editor.component.html",
            styles: ["\n        .ace-editor {\n            display: block;\n            height: 858px;\n            text-align: left;\n        }\n        .popover {\n            width: 500px;\n        }\n        .toolbar {\n            background-color: #F2F2F2;\n            width: 100%;\n            padding: 3px;\n        }\n        .dropdown-item {\n            cursor: pointer;\n        }\n        .dropdown-menu {\n            width: 195px;\n        }\n    "],
            directives: [ng2_bootstrap_1.DropdownDirective, popover_component_1.PopoverComponent],
            providers: [element_service_1.ElementService]
        }), 
        __metadata('design:paramtypes', [element_service_1.ElementService])
    ], ACEEditorComponent);
    return ACEEditorComponent;
}());
exports.ACEEditorComponent = ACEEditorComponent;
//# sourceMappingURL=ace-editor.component.js.map