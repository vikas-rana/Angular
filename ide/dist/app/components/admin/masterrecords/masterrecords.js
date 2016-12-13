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
var autogrid_1 = require('../../autogrid/autogrid');
var adminlayout_1 = require('../../layout/adminlayout');
var globals = require('../../../global');
var MasterRecords = (function () {
    function MasterRecords(app, _commonService) {
        this._commonService = _commonService;
        this.pageSize = 10;
        this.showPopup = false;
        this.isAdminRole = false;
        this.isLogin = false;
        this.Columns2Display = [
            { colName: "Group", sortable: true },
            { colName: "KeyName", sortable: true },
            { colName: "KeyValue", sortable: true }];
        if (app.access_token == undefined) {
            location.href = "login";
        }
        else if (!app.isAdmin) {
            location.href = "home";
        }
        else {
            this.searchText = '';
            this.isAdminRole = app.isAdmin;
            globals.isUserPage = false;
            this.isLogin = app.isLogin;
            this.bindModel(0);
        }
    }
    MasterRecords.prototype.bindModel = function (pageIndex) {
        this.getMasterRecordData(pageIndex);
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            group: '',
            keyName: '',
            keyValue: ''
        };
    };
    MasterRecords.prototype.getMasterRecordData = function (pageIndex) {
        var model = {
            PageIndex: pageIndex,
            CreatePaging: true
        };
        this.pageIndexClick(model);
    };
    MasterRecords.prototype.pageIndexClick = function (model) {
        var _this = this;
        this.pageIndex = model.PageIndex;
        var result = this._commonService.GetMasterRecordByPaging(this.pageIndex, this.pageSize, this.searchText)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.records = result.Data;
                _this.totalRows = result.ToatlCount;
                _this._AutoGrid.RenderPageIndexChangeData(result.Data, _this.totalRows, model.CreatePaging);
            }
        });
    };
    MasterRecords.prototype.editRecord = function (id) {
        var item = this.records.filter(function (a) { return a.Id === id; });
        if (item != null) {
            this.model = {
                Id: item[0].Id,
                group: item[0].Group,
                keyName: item[0].KeyName,
                keyValue: item[0].KeyValue
            };
            this.btnText = 'Update';
            this.showPopup = true;
        }
        else {
            alert("Id is invalid");
        }
    };
    MasterRecords.prototype.removeRecord = function (value) {
        var _this = this;
        var val = value.split('_');
        if (confirm('are you sure you want to delete')) {
            var result = this._commonService.deleteMasterRecord(val[1])
                .subscribe(function (result) {
                if (result.Result === 'Ok') {
                    _this.bindModel(_this.pageIndex);
                }
                else {
                    alert(result.Data);
                }
            });
        }
    };
    MasterRecords.prototype.addUpdateMasterRecord = function () {
        var _this = this;
        if (this.validateForm()) {
            var result = this._commonService.addUpdateMasterRecord(this.model.Id, this.model.group, this.model.keyName, this.model.keyValue)
                .subscribe(function (result) {
                if (result.Result === 'Ok') {
                    var dataResult = result.Data;
                    _this.bindModel(_this.pageIndex);
                    _this.showPopup = false;
                    alert(dataResult);
                }
                else {
                    alert(result.Data);
                }
            });
        }
    };
    MasterRecords.prototype.validateForm = function () {
        var isValid = true;
        this.errorGroup = '';
        this.errorKeyName = '';
        this.errorKeyValue = '';
        if (this.model.group == '') {
            this.errorGroup = 'this field is required';
            isValid = false;
        }
        if (this.model.keyName == '') {
            this.errorKeyName = 'this field is required';
            isValid = false;
        }
        if (this.model.keyValue == '') {
            this.errorKeyValue = 'this field is required';
            isValid = false;
        }
        return isValid;
    };
    MasterRecords.prototype.clear = function () {
        this.errorGroup = '';
        this.errorKeyName = '';
        this.errorKeyValue = '';
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            group: '',
            keyName: '',
            keyValue: ''
        };
    };
    MasterRecords.prototype.searchModel = function () {
        var value = this.searchText;
        this.bindModel(0);
    };
    MasterRecords.prototype.searchUtil = function (items, toSearch) {
        var data = [];
        if (toSearch != undefined) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (item.Group.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.KeyName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.KeyValue.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) {
                    data.push(item);
                }
            }
        }
        else {
            data = items;
        }
        return data;
    };
    MasterRecords.prototype.closePopup = function () {
        this.showPopup = false;
    };
    MasterRecords.prototype.openPopup = function () {
        this.clear();
        this.showPopup = true;
    };
    __decorate([
        core_1.ViewChild(autogrid_1.AutoGrid), 
        __metadata('design:type', autogrid_1.AutoGrid)
    ], MasterRecords.prototype, "_AutoGrid", void 0);
    MasterRecords = __decorate([
        core_1.Component({
            selector: 'masterrecords',
            templateUrl: 'app/components/admin/masterrecords/masterrecords.html',
            directives: [router_1.ROUTER_DIRECTIVES, autogrid_1.AutoGrid, adminlayout_1.AdminLayout]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App, common_service_1.CommonService])
    ], MasterRecords);
    return MasterRecords;
}());
exports.MasterRecords = MasterRecords;
//# sourceMappingURL=masterrecords.js.map