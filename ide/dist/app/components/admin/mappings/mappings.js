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
var common_service_1 = require('../../../services/common.service');
var app_1 = require('../../../app');
var Mappings = (function () {
    function Mappings(app, _commonService) {
        this._commonService = _commonService;
        if (app.access_token == undefined) {
            location.href = "login";
        }
        else {
            this.bindModel();
        }
    }
    Mappings.prototype.bindModel = function () {
        this.getMappingListData();
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            displayname: '',
            description: ''
        };
    };
    Mappings.prototype.getMappingListData = function () {
        var _this = this;
        this.mappingList = [];
        var result = this._commonService.getMappingList()
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.mappingList = result.Data;
            }
            else {
                _this.mappingList = [];
            }
        });
    };
    Mappings.prototype.editMapping = function (id) {
        var item = this.mappingList.filter(function (a) { return a.Id === id; });
        this.model = {
            Id: item[0].Id,
            displayname: item[0].DisplayName,
            description: item[0].Description
        };
        this.btnText = 'Update';
    };
    Mappings.prototype.deleteMapping = function (index, id) {
        var _this = this;
        if (confirm('are you sure you want to delete')) {
            var result = this._commonService.deleteMapping(id)
                .subscribe(function (result) {
                if (result.Result === 'Ok') {
                    if (index > -1) {
                        _this.mappingList.splice(index, 1);
                    }
                }
                else {
                    alert(result.Data);
                }
            });
        }
    };
    Mappings.prototype.addUpdateMapping = function () {
        var _this = this;
        var result = this._commonService.addUpdateMapping(this.model.Id, "1", this.model.displayname, this.model.description)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.bindModel();
                alert(result.Data);
            }
            else {
                alert(result.Data);
            }
        });
    };
    Mappings = __decorate([
        core_1.Component({
            selector: 'mappings',
            templateUrl: 'app/components/admin/mappings/mappings.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App, common_service_1.CommonService])
    ], Mappings);
    return Mappings;
}());
exports.Mappings = Mappings;
//# sourceMappingURL=mappings.js.map