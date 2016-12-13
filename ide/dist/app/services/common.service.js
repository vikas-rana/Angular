"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var HttpHelpers_1 = require('../utils/HttpHelpers');
require('rxjs/Rx');
var CommonService = (function (_super) {
    __extends(CommonService, _super);
    function CommonService(http) {
        _super.call(this, http);
        this.http = http;
        this._baseUrl = 'http://localhost:59579/api/';
        this._getTodoListUrl = 'payloaddata/IsLoginSuccess';
        this._getListDetails = 'payloaddata/List_Detail';
        this._checkFileExist = 'payloaddata/Check_FileExist';
        this._getListDataUrl = 'payloaddata/List_Data';
        this._getSourceListByPaging = 'payloaddata/GetSourceListByPaging';
        this._getSourceList = 'payloaddata/GetSourceList';
        this._getMappingList = 'payloaddata/GetMappingList';
        this._deleteSource = 'payloaddata/DeleteSource';
        this._addUpdateSource = 'payloaddata/AddUpdateSource';
        this._deleteMapping = 'payloaddata/DeleteMapping';
        this._addUpdateMapping = 'payloaddata/AddUpdateMapping';
        this._getMasterRecords = 'payloaddata/GetMasterRecordByPaging';
        this._deleteMasterRecord = 'payloaddata/DeleteMasterRecord';
        this._addUpdateMasterRecord = 'payloaddata/AddUpdateMasterRecord';
        this._getAllMember = 'payloaddata/getAllMemberByPaging';
        this._deleteMember = 'payloaddata/DeleteMember';
        this._addUpdateMemberShip = 'payloaddata/AddUpdateMemberShip';
    }
    CommonService.prototype.getSourceList = function () {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._getSourceList).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.getSourceListByPaging = function (startIndex, pageSize, searchText) {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._getSourceListByPaging + "?startIndex=" + startIndex + "&pageSize=" + pageSize + "&searchText=" + searchText).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.getMappingList = function () {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._getMappingList).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.getListDetail = function (path) {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._getListDetails + "?path=" + path).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.downloadGetData = function (path) {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._checkFileExist + "?file_path=" + path).map(function (result) {
            if (result.Result === 'Ok') {
                result.Data = _this._baseUrl + _this.downloadGetData + "?file_path=" + path;
            }
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
        ;
    };
    CommonService.prototype.getListData = function (dateRangFrom, dateRangeTo, origins, files) {
        var _this = this;
        var parameters = "dateRangFrom=" + dateRangFrom + "&dateRangeTo=" + dateRangeTo + "&origins=" + origins + "&files=" + files;
        this.observable = this.getaction(this._baseUrl + this._getListDataUrl + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
        ;
    };
    CommonService.prototype.addUpdateSource = function (id, displayName, description) {
        var _this = this;
        var parameters = "id=" + id + "&displayName=" + displayName + "&description=" + description;
        this.observable = this.getaction(this._baseUrl + this._addUpdateSource + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.deleteSource = function (id) {
        var _this = this;
        var parameters = "id=" + id;
        this.observable = this.getaction(this._baseUrl + this._deleteSource + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.addUpdateMapping = function (id, storeId, displayName, description) {
        var _this = this;
        var parameters = "id=" + id + "&storeId=1&displayName=" + displayName + "&description=" + description;
        this.observable = this.getaction(this._baseUrl + this._addUpdateMapping + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.deleteMapping = function (id) {
        var _this = this;
        var parameters = "id=" + id;
        this.observable = this.getaction(this._baseUrl + this._deleteMapping + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.GetMasterRecordByPaging = function (startIndex, pageSize, searchText) {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._getMasterRecords + "?startIndex=" + startIndex + "&pageSize=" + pageSize + "&searchText=" + searchText).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
        ;
    };
    CommonService.prototype.addUpdateMasterRecord = function (id, group, keyName, keyValue) {
        var _this = this;
        var parameters = "id=" + id + "&group=" + group + "&keyName=" + keyName + "&keyValue=" + keyValue;
        this.observable = this.getaction(this._baseUrl + this._addUpdateMasterRecord + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.deleteMasterRecord = function (id) {
        var _this = this;
        var parameters = "id=" + id;
        this.observable = this.getaction(this._baseUrl + this._deleteMasterRecord + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.getAllMemberByPaging = function (startIndex, pageSize, searchText) {
        var _this = this;
        this.observable = this.getaction(this._baseUrl + this._getAllMember + "?startIndex=" + startIndex + "&pageSize=" + pageSize + "&searchText=" + searchText).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
        ;
    };
    CommonService.prototype.addUpdateMemberShip = function (id, email, access, active) {
        var _this = this;
        var parameters = "id=" + id + "&email=" + email + "&access=" + access + "&active=" + active;
        this.observable = this.getaction(this._baseUrl + this._addUpdateMemberShip + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService.prototype.deleteMember = function (id) {
        var _this = this;
        var parameters = "id=" + id;
        this.observable = this.getaction(this._baseUrl + this._deleteMember + "?" + parameters).map(function (result) {
            return _this.observable = result;
        }, function (error) { return _this.errormsg = error; }).share();
        return this.observable;
    };
    CommonService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CommonService);
    return CommonService;
}(HttpHelpers_1.HttpHelpers));
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map