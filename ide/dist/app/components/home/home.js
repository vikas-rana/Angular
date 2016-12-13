/// <reference path="../../global.ts" />
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_service_1 = require('../../services/common.service');
var app_1 = require('../../app');
var adminlayout_1 = require('../layout/adminlayout');
var globals = require('../../global');
var Home = (function () {
    function Home(app, _commonService) {
        this._commonService = _commonService;
        if (app.access_token == undefined) {
            location.href = "login";
        }
        globals.isUserPage = true;
    }
    Home.prototype.spareButton = function () {
        alert('Function not installed');
    };
    Home.prototype.loadComments = function () {
        // Get all comments
        // return this._commonService.todolist();
    };
    Home = __decorate([
        core_1.Component({
            selector: 'home',
            styleUrls: ['app/components/home/home.css'],
            templateUrl: 'app/components/home/home.html',
            directives: [router_1.ROUTER_DIRECTIVES, adminlayout_1.AdminLayout]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App, common_service_1.CommonService])
    ], Home);
    return Home;
}());
exports.Home = Home;
//# sourceMappingURL=home.js.map