"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_1 = require('./app');
var app_routes_1 = require('./app.routes');
var http_1 = require('@angular/http');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_1.App, [
    app_routes_1.appRouterProviders, http_1.HTTP_PROVIDERS
])
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=main.js.map