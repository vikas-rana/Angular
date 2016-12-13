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
var http_1 = require('@angular/http');
var ElementService = (function () {
    function ElementService(http) {
        this.http = http;
        this.headers = new http_1.Headers();
        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');
    }
    ElementService.prototype.getElement = function (id) {
        return this.http.get(id, { headers: this.headers }).map(function (res) { return res.json(); });
    };
    // Had some issues with TinyMCEComponent, had to do this instead of using getElement() method
    ElementService.prototype.getElementFormLayout = function (id) {
        return this.http.get(id, { headers: this.headers }).map(function (res) { return res.json().form_layout; });
    };
    ElementService.prototype.getElementCode = function (url) {
        return this.http.get(url).map(function (res) { return res.text(); });
    };
    ElementService.prototype.postElementCode = function (url, type, id, code) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, JSON.stringify({ "Type": type, "Id": id, "Code": code }), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ElementService.prototype.patchElement = function (id, element) {
        return this.http.patch(id, element, { headers: this.headers });
    };
    ElementService.prototype.postElement = function (url, newElement) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        if (newElement['@type'] == 'PlominoField') {
            url = url + '/@@add-field';
            headers.append('Accept', '*/*');
        }
        else {
            headers.append('Accept', 'application/json');
        }
        return this.http.post(url, JSON.stringify(newElement), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ElementService.prototype.deleteElement = function (url) {
        return this.http.delete(url);
    };
    ElementService.prototype.searchElement = function (query) {
        return this.http.get('../../search?SearchableText=' + query + '*', { headers: this.headers }).map(function (res) { return res.json(); });
    };
    ElementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ElementService);
    return ElementService;
}());
exports.ElementService = ElementService;
//# sourceMappingURL=element.service.js.map