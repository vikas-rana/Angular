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
/// <reference path="../admin/membership/membership.ts" />
//Imports
var core_1 = require('@angular/core');
//Needed for triggering events
var Subject_1 = require('rxjs/Subject');
//Needed for sorting
var autogridpipe_1 = require('./autogridpipe');
var editRecord;
//Component defention
var AutoGrid = (function () {
    function AutoGrid() {
        this.editClick = new core_1.EventEmitter();
        this.deleteClick = new core_1.EventEmitter();
        this.pageIndexClick = new core_1.EventEmitter();
        this.SortBy = ""; //This param is used to determine which column to use for sorting
        this.Direction = 1; //1 is ascending -1 is descending
        this.Pages = []; //Dummy array to load the pagination
        this.Data = []; //Main data container
        this.AllowDelete = true; //Can a row be deleted
        this.Columns = []; //Name of the coulmns to display / order
        this.AllowSorting = true; //Allow client side sorting
        this.TotalRows = 0; //Total number of rows for paging
        this.PageSize = 0;
        this.PageIndex = 0; //To control the start page index
        this.RowDeleted$ = new Subject_1.Subject(); //Subscribe to this to handle delete event
        this.PageIndexChanged$ = new Subject_1.Subject(); //Subscribe to this to handle "page index change" event
    }
    AutoGrid.prototype.LoadData = function (pageIndex) {
        this.OnPageIndexChange(pageIndex);
    };
    AutoGrid.prototype.edit = function (id) {
        this.editClick.emit(id);
    };
    AutoGrid.prototype.delete = function (index, id) {
        this.deleteClick.emit(index + "_" + id);
    };
    AutoGrid.prototype.OnDeleteRow = function (Row2Delete) {
        this.RowDeleted$.next(Row2Delete);
        //client side delete for data can be done here
    };
    AutoGrid.prototype.OnPageIndexChange = function (index) {
        this.PageIndex = index - 1;
        var model = {
            PageIndex: this.PageIndex,
            CreatePaging: false
        };
        this.pageIndexClick.emit(model);
        //let startIndex = (this.PageIndex * this.PageSize);
        //let endIndex = startIndex + this.PageSize;
        //this.Data = this.dataItem.slice(startIndex, endIndex);
    };
    AutoGrid.prototype.RenderPageIndexChangeData = function (_data, totalCount, createPaging) {
        if (createPaging) {
            this.TotalRows = totalCount;
            this.Data = _data;
            this.pageWidth();
            this.gridPages();
        }
        this.Data = _data;
        this.PageIndexChanged$.next(this.PageIndex);
    };
    AutoGrid.prototype.pageWidth = function () {
        this.Width = '';
        var totalPages = (this.TotalRows / this.PageSize);
        this.Width = "auto";
    };
    AutoGrid.prototype.gridPages = function () {
        this.Pages = [];
        for (var i = 0; i < this.TotalRows / this.PageSize; i++)
            this.Pages.push(i + 1);
    };
    AutoGrid.prototype.Sort = function (key, dir) {
        //Change the sorting criteria
        this.SortBy = key;
        this.Direction = dir;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoGrid.prototype, "editClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoGrid.prototype, "deleteClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AutoGrid.prototype, "pageIndexClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoGrid.prototype, "AllowDelete", void 0);
    __decorate([
        //Can a row be deleted
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AutoGrid.prototype, "Columns", void 0);
    __decorate([
        //Name of the coulmns to display / order
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AutoGrid.prototype, "AllowSorting", void 0);
    __decorate([
        //Allow client side sorting
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoGrid.prototype, "TotalRows", void 0);
    __decorate([
        //Total number of rows for paging
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoGrid.prototype, "PageSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AutoGrid.prototype, "PageIndex", void 0);
    AutoGrid = __decorate([
        core_1.Component({
            selector: 'AutoGrid',
            templateUrl: '/app/components/AutoGrid/AutoGrid.html',
            pipes: [autogridpipe_1.AutoGridPipe] //link the Pipe
        }), 
        __metadata('design:paramtypes', [])
    ], AutoGrid);
    return AutoGrid;
}());
exports.AutoGrid = AutoGrid;
//# sourceMappingURL=autogrid.js.map