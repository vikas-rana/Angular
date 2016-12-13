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
var AutoGridPipe = (function () {
    function AutoGridPipe() {
    }
    //Sort,Dir ... will be passed through the component
    AutoGridPipe.prototype.transform = function (array, _a) {
        var SortBy = _a[0], Dir = _a[1];
        array.sort(function (a, b) {
            if (a[SortBy] > b[SortBy]) {
                return 1 * Dir; //we switch ascending and descending by multiply x -1
            }
            if (a[SortBy] < b[SortBy]) {
                return -1 * Dir; //we switch ascending and descending by multiply x -1
            }
            return 0;
        });
        return array;
    };
    AutoGridPipe = __decorate([
        core_1.Pipe({
            name: 'AutoGridPipe',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], AutoGridPipe);
    return AutoGridPipe;
}());
exports.AutoGridPipe = AutoGridPipe;
//# sourceMappingURL=autogridpipe.js.map