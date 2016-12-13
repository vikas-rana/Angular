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
var DirectArchive = (function () {
    function DirectArchive(app, _commonService) {
        this._commonService = _commonService;
        this.isListShow = false;
        this._downLoadGetData = 'payloaddata/Get_Data';
        this._baseUrl = 'http://localhost:59579/api/';
        this.isDirectAccessQuery = true;
        this.isRangeQuery = false;
        this.isStorageResult = false;
        this.showStorageRefSearch = true;
        this.showRangeQuery = false;
        this.showRangeQueryResult = false;
        this.isRangeListShow = false;
        this.showEditDetails = false;
        this.acquisition = '';
        if (app.access_token == undefined) {
            location.href = "login";
        }
        else {
            globals.isUserPage = true;
            this.model = {
                queryType: "Direct Access"
            };
            this.acquisition = "0";
            this.showErrorMessage = false;
            this.details = '';
        }
    }
    DirectArchive.prototype.changeQueryType = function (value) {
        this.showErrorMessage = false;
        if (value === '1') {
            this.isRangeQuery = false;
            this.searchDirectResultAgain();
        }
        else {
            this.isDirectAccessQuery = false;
            this.searchRangeResultAgain();
            this.getSourceListData();
            this.getMappingListData();
        }
    };
    DirectArchive.prototype.getSourceListData = function () {
        var _this = this;
        this.dataSourceList = [];
        var result = this._commonService.getSourceList()
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.dataSourceList = result.Data;
                if (_this.dataSourceList.length > 0) {
                    _this.datasource = _this.dataSourceList[0];
                }
            }
            else {
                _this.dataSourceList = [];
            }
        });
    };
    DirectArchive.prototype.getMappingListData = function () {
        var _this = this;
        this.mappingList = [];
        var result = this._commonService.getMappingList()
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.mappingList = result.Data;
                if (_this.mappingList.length > 0) {
                    _this.mapping = [_this.mappingList[0].DisplayName];
                }
            }
            else {
                _this.mappingList = [];
            }
        });
    };
    DirectArchive.prototype.getQueryData = function (path) {
        var _this = this;
        this.showStorageRefSearch = false;
        var result = this._commonService.getListDetail(path)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                if (result.ErrorMessage === '') {
                    var parseData = JSON.parse(result.Data);
                    _this.getListDetails = parseData.PayLoadData;
                    _this.showErrorMessage = false;
                    _this.isFileExist = true;
                    if (_this.getListDetails != undefined && _this.getListDetails != null) {
                        var array = [];
                        var fileInfo = _this.getListDetails.FileList.FileInformation;
                        if (fileInfo === undefined) {
                            _this.isFileExist = false;
                        }
                        else if (fileInfo[0] === undefined) {
                            array.push(fileInfo);
                            _this.getListDetails.FileList.FileInformation = array;
                        }
                        _this.isListShow = true;
                        _this.isStorageResult = true;
                    }
                    else {
                        _this.showErrorMessage = true;
                        _this.isListShow = false;
                        _this.isStorageResult = true;
                        _this.errorMessage = "No result found!";
                        _this.details = "Detail: " + result.ErrorMessage;
                    }
                }
                else {
                    _this.showErrorMessage = true;
                    _this.isListShow = false;
                    _this.isStorageResult = true;
                    _this.errorMessage = "No result found!";
                    _this.details = "Detail: " + result.ErrorMessage;
                }
            }
            else {
                _this.showErrorMessage = true;
                _this.isListShow = false;
                _this.isStorageResult = true;
                _this.errorMessage = "No result found! ";
                _this.details = "Error message: " + result.ErrorMessage;
            }
        });
    };
    DirectArchive.prototype.downloadContent = function (path) {
        var _this = this;
        var result = this._commonService.downloadGetData(path)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                var downLoad = _this._baseUrl + _this._downLoadGetData + "?filePath=" + path;
                window.location.href = downLoad;
            }
            else {
                alert(result.ErrorMessage);
            }
        });
    };
    DirectArchive.prototype.searchDirectResultAgain = function () {
        this.errorFromDate = '';
        this.errorToDate = '';
        this.isDirectAccessQuery = true;
        this.showStorageRefSearch = true;
        this.isStorageResult = false;
        this.isListShow = false;
        this.queryText = '';
        this.getListDetails = null;
        this.errorMessage = '';
    };
    DirectArchive.prototype.getRangeQueryData = function () {
        var _this = this;
        var isValid = true;
        this.errorFromDate = '';
        this.errorToDate = '';
        var fromDate = this.dateFrom;
        var toDate = this.dateTo;
        if (fromDate != '') {
            if (new Date(fromDate)) {
            }
            else {
                this.errorFromDate = 'Please enter valid date.';
                isValid = false;
            }
        }
        else {
            this.errorFromDate = 'Please enter valid date.';
            isValid = false;
        }
        if (toDate != '') {
            if (new Date(toDate)) {
                if (new Date(fromDate) > new Date(toDate)) {
                    isValid = false;
                    this.errorToDate = 'To date should be greater then to date';
                }
            }
            else {
                this.errorToDate = 'Please enter valid date.';
                isValid = false;
            }
        }
        else {
            this.errorToDate = 'Please enter valid date.';
            isValid = false;
        }
        if (isValid) {
            this.showRangeQuery = false;
            var mappingString = this.mapping.join(',');
            var result = this._commonService.getListData(this.dateFrom, this.dateTo, this.datasource.DisplayName, mappingString)
                .subscribe(function (result) {
                _this.showRangeQueryResult = true;
                if (result.Result === 'Ok') {
                    if (result.ErrorMessage === '') {
                        _this.showErrorMessage = false;
                        _this.rangeResultList = [];
                        result.Data.forEach(function (r) {
                            var parseData = JSON.parse(r.XML);
                            var payloadData = parseData.PayLoadData;
                            _this.rangeResultList.push(payloadData);
                        });
                        if (_this.rangeResultList.length > 0) {
                            _this.isRangeListShow = true;
                            _this.errorMessage = '';
                        }
                        else {
                            _this.showErrorMessage = true;
                            _this.isRangeListShow = false;
                            _this.errorMessage = "No result found!";
                            _this.details = "Detail: " + result.ErrorMessage;
                        }
                    }
                    else {
                        _this.showErrorMessage = true;
                        _this.isRangeListShow = false;
                        _this.errorMessage = "No result found! ";
                        _this.details = "Detail: " + result.ErrorMessage;
                    }
                }
                else {
                    _this.showErrorMessage = true;
                    _this.isRangeListShow = false;
                    _this.showRangeQueryResult = true;
                    _this.errorMessage = "No result found! ";
                    _this.details = "Error message: " + result.ErrorMessage;
                }
            });
        }
    };
    DirectArchive.prototype.searchRangeResultAgain = function () {
        var todayDate = new Date();
        var toDate = todayDate;
        var fromdate = todayDate;
        this.getListDetails = null;
        this.dateTo = this.formatDate(toDate);
        this.dateFrom = this.formatDate(fromdate.setDate(fromdate.getDate() - 7));
        this.showRangeQuery = true;
        this.isRangeQuery = true;
        this.showRangeQueryResult = false;
        this.isRangeListShow = false;
        this.showEditDetails = false;
        this.showErrorMessage = false;
    };
    DirectArchive.prototype.editContent = function (path) {
        var _this = this;
        this.errorMessage = '';
        var result = this._commonService.getListDetail(path)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                var parseData = JSON.parse(result.Data);
                _this.getListDetails = parseData.PayLoadData;
                _this.isFileExist = true;
                if (_this.getListDetails != undefined && _this.getListDetails != null) {
                    var array = [];
                    var fileInfo = _this.getListDetails.FileList.FileInformation;
                    if (fileInfo === undefined) {
                        _this.isFileExist = false;
                    }
                    else if (fileInfo[0] === undefined) {
                        array.push(fileInfo);
                        _this.getListDetails.FileList.FileInformation = array;
                    }
                    _this.showEditDetails = true;
                }
                else {
                    _this.showEditDetails = false;
                    _this.errorMessage = "No result found!";
                }
            }
            else {
                _this.showEditDetails = false;
                _this.errorMessage = result.ErrorMessage;
            }
        });
    };
    DirectArchive.prototype.closeRangeDetails = function () {
        this.showEditDetails = false;
        this.getListDetails = null;
    };
    DirectArchive.prototype.formatDate = function (date) {
        var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    };
    DirectArchive.prototype.isValidDate = function (s) {
        var bits = s.split('/');
        var d = new Date(bits[2] + '/' + bits[1] + '/' + bits[0]);
        return !!(d && (d.getMonth() + 1) == bits[1] && d.getDate() == Number(bits[0]));
    };
    DirectArchive = __decorate([
        core_1.Component({
            selector: 'directaccess',
            templateUrl: 'app/components/directarchive/directarchive.html',
            directives: [router_1.ROUTER_DIRECTIVES, adminlayout_1.AdminLayout]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App, common_service_1.CommonService])
    ], DirectArchive);
    return DirectArchive;
}());
exports.DirectArchive = DirectArchive;
//# sourceMappingURL=directarchive.js.map