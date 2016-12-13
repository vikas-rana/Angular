"use strict";
exports.isUserPage = true;
exports.adminMenuItems = [
    { 'Name': 'Dashboard', 'URl': '/admin/dashboard', 'class': 'fa-th' },
    { 'Name': 'Users', 'URl': '/admin/membership', 'class': 'fa-users' },
    { 'Name': 'Reports', 'URl': '#', 'class': 'fa-bar-chart' },
    { 'Name': 'Direct archive setup', 'URl': '#', 'class': 'fa-globe' },
    { 'Name': 'SLA maintenance', 'URl': '#', 'class': 'fa-clock-o' },
    { 'Name': 'QA configuration', 'URl': '#', 'class': 'fa-flask' },
    { 'Name': 'Node setup', 'URl': '#', 'class': 'fa-sitemap' },
    { 'Name': 'Master record', 'URl': '/admin/masterrecords', 'class': 'fa-pencil-square-o' },
    { 'Name': 'Data types', 'URl': '/admin/datatypes', 'class': 'fa-table' }
];
exports.userMenuItems = [
    { 'Name': 'Dashboard', 'URl': '/home', 'class': 'fa-th' },
    { 'Name': 'Direct archive access', 'URl': '/archivequery', 'class': 'fa-globe' },
    { 'Name': 'Ad-hoc brand search', 'URl': '#', 'class': 'fa-users' },
    { 'Name': 'SLA Monitor', 'URl': '#', 'class': 'fa-bar-chart' }
];
//# sourceMappingURL=global.js.map