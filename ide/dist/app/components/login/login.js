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
var Login = (function () {
    function Login(app) {
        this.message = '';
        if (app.access_token !== undefined) {
            location.href = "home";
        }
    }
    Login.prototype.authentication = function () {
        var googleredirect_Uri = 'http://localhost:56290/home/GoogleOAuthRedirectUrl';
        var googleOauth_Uri = 'https://accounts.google.com/o/oauth2/v2/auth?&redirect_uri=';
        var googleClientId = '40718424116-bas2p9gq246in90npamius51va0ddhhb.apps.googleusercontent.com';
        location.href = googleOauth_Uri + googleredirect_Uri + "&response_type=code&client_id=" + googleClientId + "&scope=email profile";
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'app/components/login/login.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map