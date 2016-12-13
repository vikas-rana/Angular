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
var MemberShip = (function () {
    function MemberShip(app, _commonService) {
        this._commonService = _commonService;
        this.pageSize = 10;
        this.inputFocused = false;
        this.showPopup = false;
        this.isAdminRole = false;
        this.isLogin = false;
        this.Columns2Display = [
            { colName: "EmailAddress", sortable: true },
            { colName: "Access", sortable: true },
            { colName: "Active", sortable: true }];
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
            this.accessList = [
                { id: 1, value: 'Read' },
                { id: 2, value: 'Write' },
                { id: 3, value: 'Admin' },
            ];
            this.bindModel(0);
        }
    }
    MemberShip.prototype.bindModel = function (pageIndex) {
        this.getAllMemberList(pageIndex);
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            email: '',
            access: this.accessList[0],
            active: false
        };
    };
    MemberShip.prototype.getAllMemberList = function (pageIndex) {
        var model = {
            PageIndex: pageIndex,
            CreatePaging: true
        };
        this.pageIndexClick(model);
    };
    MemberShip.prototype.pageIndexClick = function (model) {
        var _this = this;
        this.pageIndex = model.PageIndex;
        var result = this._commonService.getAllMemberByPaging(this.pageIndex, this.pageSize, this.searchText)
            .subscribe(function (result) {
            if (result.Result === 'Ok') {
                _this.memberList = result.Data;
                _this.totalRows = result.ToatlCount;
                _this._AutoGrid.RenderPageIndexChangeData(result.Data, _this.totalRows, model.CreatePaging);
            }
        });
    };
    MemberShip.prototype.editRecord = function (id) {
        var item = this.memberList.filter(function (a) { return a.Id === id; });
        if (item != null) {
            var aValue_1 = item[0].Access;
            var accessValue = this.accessList.filter(function (a) { return a.value === aValue_1; });
            this.model = {
                Id: item[0].Id,
                email: item[0].EmailAddress,
                access: accessValue[0],
                active: item[0].Active === 'true' ? true : false
            };
            this.btnText = 'Update';
            this.showPopup = true;
        }
        else {
            alert("Id is invalid");
        }
    };
    MemberShip.prototype.removeRecord = function (value) {
        var _this = this;
        var val = value.split('_');
        if (confirm('are you sure you want to delete')) {
            var result = this._commonService.deleteMember(val[1])
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
    MemberShip.prototype.addUpdateRecord = function () {
        var _this = this;
        if (this.validateForm()) {
            var accessval = this.model.active === true ? "1" : "0";
            var result = this._commonService.addUpdateMemberShip(this.model.Id, this.model.email, this.model.access.id, accessval)
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
    MemberShip.prototype.validateForm = function () {
        var isValid = true;
        this.errorEmail = '';
        if (this.model.email != '') {
            if (!this.isEmail(this.model.email)) {
                this.errorEmail = 'please fill correct email address';
                isValid = false;
            }
        }
        else {
            this.errorEmail = 'this field is required';
            isValid = false;
        }
        return isValid;
    };
    MemberShip.prototype.isEmail = function (email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };
    MemberShip.prototype.clear = function () {
        this.errorEmail = '';
        this.btnText = 'Save';
        this.model = {
            Id: '0',
            email: '',
            access: this.accessList[0],
            active: false
        };
    };
    MemberShip.prototype.searchModel = function () {
        var value = this.searchText;
        this.bindModel(0);
    };
    MemberShip.prototype.searchUtil = function (items, toSearch) {
        var data = [];
        if (toSearch != undefined) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (item.EmailAddress.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Access.toLowerCase().indexOf(toSearch.toLowerCase()) > -1 || item.Active.toLowerCase().indexOf(toSearch.toLowerCase()) > -1) {
                    data.push(item);
                }
            }
        }
        else {
            data = items;
        }
        return data;
    };
    MemberShip.prototype.closePopup = function () {
        this.showPopup = false;
    };
    MemberShip.prototype.openPopup = function () {
        this.clear();
        this.showPopup = true;
    };
    __decorate([
        core_1.ViewChild(autogrid_1.AutoGrid), 
        __metadata('design:type', autogrid_1.AutoGrid)
    ], MemberShip.prototype, "_AutoGrid", void 0);
    MemberShip = __decorate([
        core_1.Component({
            selector: 'membership',
            templateUrl: 'app/components/admin/membership/membership.html',
            directives: [router_1.ROUTER_DIRECTIVES, autogrid_1.AutoGrid, adminlayout_1.AdminLayout]
        }),
        __param(0, core_1.Inject(core_1.forwardRef(function () { return app_1.App; }))), 
        __metadata('design:paramtypes', [app_1.App, common_service_1.CommonService])
    ], MemberShip);
    return MemberShip;
}());
exports.MemberShip = MemberShip;
//# sourceMappingURL=membership.js.map