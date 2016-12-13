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
var app_1 = require('../../app');
var app_helpers_1 = require('./app.helpers');
var globals = require('../../global');
//Component defention
var AdminHeader = (function () {
    function AdminHeader(app) {
        this.isAdminRole = false;
        this.isAdminRole = app.isAdmin;
        this.isUserHomePage = globals.isUserPage;
        if (this.isUserHomePage) {
            this.dashboardText = "Admin Dashboard";
            this.dashboardLink = "/admin/dashboard";
        }
        else {
            this.dashboardText = "User Dashboard";
            this.dashboardLink = "/home";
        }
        this.appData = app;
    }
    AdminHeader.prototype.logout = function () {
        this.appData.logout();
    };
    AdminHeader.prototype.toggleNavigation = function () {
        jQuery("body").toggleClass("mini-navbar");
        app_helpers_1.smoothlyMenu();
    };
    AdminHeader = __decorate([
        core_1.Component({
            selector: 'AdminHeader',
            templateUrl: '/app/components/header/adminHeader.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App])
    ], AdminHeader);
    return AdminHeader;
}());
exports.AdminHeader = AdminHeader;
//# sourceMappingURL=adminheader.js.map