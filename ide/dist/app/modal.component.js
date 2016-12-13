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
var ng2_bs3_modal_1 = require('ng2-bs3-modal/ng2-bs3-modal');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var PlominoModalComponent = (function () {
    function PlominoModalComponent() {
        this.modalClosed = new core_1.EventEmitter();
        this.modalDismissed = new core_1.EventEmitter();
        this.action_type = "OPENFORM";
        this.nameError = false;
    }
    PlominoModalComponent.prototype.ngAfterViewInit = function () {
        this.modal.open();
    };
    PlominoModalComponent.prototype.onModalClose = function () {
        if (this.name === undefined || !/\S/.test(this.name)) {
            this.nameError = true;
            this.modal.open();
        }
        else {
            var element = this.data;
            element.name = this.name;
            if (element.type === 'PlominoAction')
                element.action_type = this.action_type;
            this.modalClosed.emit(element);
        }
    };
    PlominoModalComponent.prototype.onModalDismiss = function () {
        this.modalDismissed.emit(true);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PlominoModalComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlominoModalComponent.prototype, "modalClosed", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PlominoModalComponent.prototype, "modalDismissed", void 0);
    __decorate([
        core_1.ViewChild('modal'), 
        __metadata('design:type', ng2_bs3_modal_1.ModalComponent)
    ], PlominoModalComponent.prototype, "modal", void 0);
    PlominoModalComponent = __decorate([
        core_1.Component({
            selector: 'modal',
            templateUrl: require('./modal.component.html'),
            directives: [ng2_bs3_modal_1.MODAL_DIRECTIVES, ng2_bootstrap_1.AlertComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], PlominoModalComponent);
    return PlominoModalComponent;
}());
exports.PlominoModalComponent = PlominoModalComponent;
//# sourceMappingURL=modal.component.js.map