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
var DataTypes = (function () {
    function DataTypes(app, _commonService) {
        this._commonService = _commonService;
        this.pageSize = 10;
        this.showPopup = false;
        this.isAdminRole = false;
        this.isLogin = false;
        this.Columns2Display = [
            { colName: "DisplayName", sortable: true },
            { colName: "Description", sortable: true }];
        if (app.access_token == undefined) {
            location.href = "login";
        }
        else if (!app.isAdmin) {
            location.href = "home";
        }
        else {
            this.isAdminRole = app.isAdmin;
            globals.isUserPage = false;
            this.searchText = "";
            this.isLogin = app.isLogin;
            this.bindModel(0);
        }
    }
    DataTypes.prototype.bindModel = function (pageIndex) {
        this.getSourceListData(pageIndex);
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            displayname: '',
            description: ''
        };
    };
    DataTypes.prototype.getSourceListData = function (pageIndex) {
        var model = {
            PageIndex: pageIndex,
            CreatePaging: true
        };
        this.pageIndexClick(model);
    };
    DataTypes.prototype.pageIndexClick = function (model) {
        var _this = this;
        this.dataSourceList = [];
        this.pageIndex = model.PageIndex;
        var result = this._commonService.getSourceListByPaging(this.pageIndex, this.pageSize, this.searchText)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.dataSourceList = result.Data;
                _this.mainDataSourceList = result.Data;
                _this.totalRows = result.ToatlCount;
                _this._AutoGrid.RenderPageIndexChangeData(result.Data, _this.totalRows, model.CreatePaging);
            }
            else {
                _this.dataSourceList = [];
            }
        });
    };
    DataTypes.prototype.editRecord = function (id) {
        var item = this.dataSourceList.filter(function (a) { return a.Id === id; });
        if (item != null) {
            this.model = {
                Id: item[0].Id,
                displayname: item[0].DisplayName,
                description: item[0].Description
            };
            this.btnText = 'Update';
            this.showPopup = true;
        }
        else {
            alert("Id is invalid");
        }
    };
    DataTypes.prototype.removeRecord = function (value) {
        var _this = this;
        var val = value.split('_');
        if (confirm('are you sure you want to delete')) {
            var result = this._commonService.deleteSource(val[1])
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
    DataTypes.prototype.addUpdateDataType = function () {
        var _this = this;
        if (this.validateForm()) {
            var result = this._commonService.addUpdateSource(this.model.Id, this.model.displayname, this.model.description)
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
    DataTypes.prototype.validateForm = function () {
        var isValid = true;
        this.errorDisplayname = '';
        this.errorDescription = '';
        if (this.model.displayname == '') {
            this.errorDisplayname = 'this field is required';
            isValid = false;
        }
        if (this.model.description == '') {
            this.errorDescription = 'this field is required';
            isValid = false;
        }
        return isValid;
    };
    DataTypes.prototype.clear = function () {
        this.errorDisplayname = '';
        this.errorDescription = '';
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            displayname: '',
            description: ''
        };
    };
    DataTypes.prototype.searchModel = function () {
        var value = this.searchText;
        this.bindModel(0);
        // this._AutoGrid.LoadData(this.dataSourceList, 'DisplayName', 0);
    };
    DataTypes.prototype.searchUtil = function (items, toSearch) {
        var data = [];
        if (toSearch != undefined) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (item.DisplayName.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Description.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) {
                    data.push(item);
                }
            }
        }
        else {
            data = items;
        }
        return data;
    };
    DataTypes.prototype.closePopup = function () {
        this.showPopup = false;
    };
    DataTypes.prototype.openPopup = function () {
        this.clear();
        this.showPopup = true;
    };
    __decorate([
        core_1.ViewChild(autogrid_1.AutoGrid), 
        __metadata('design:type', autogrid_1.AutoGrid)
    ], DataTypes.prototype, "_AutoGrid", void 0);
    DataTypes = __decorate([
        core_1.Component({
            selector: 'datatypes',
            templateUrl: 'app/components/admin/datatypes/datatypes.html',
            directives: [router_1.ROUTER_DIRECTIVES, autogrid_1.AutoGrid, adminlayout_1.AdminLayout]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App, common_service_1.CommonService])
    ], DataTypes);
    return DataTypes;
}());
exports.DataTypes = DataTypes;
//# sourceMappingURL=datatypes.js.map