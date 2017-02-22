"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var http_1 = require('@angular/http');
var util_1 = require('util');
var underscore_1 = require('underscore');
var GridProvider = (function () {
    function GridProvider(serverApi, mapper, params, _headers, _readOnly, _hasFilter, _actionRemove, _actionEdit, _actionMultiSelect, _actionSingleSelect) {
        if (_headers === void 0) { _headers = []; }
        if (_hasFilter === void 0) { _hasFilter = true; }
        this.serverApi = serverApi;
        this.mapper = mapper;
        this.params = params;
        this._headers = _headers;
        this._readOnly = _readOnly;
        this._hasFilter = _hasFilter;
        this._actionRemove = _actionRemove;
        this._actionEdit = _actionEdit;
        this._actionMultiSelect = _actionMultiSelect;
        this._actionSingleSelect = _actionSingleSelect;
        this._pagination = Pagination.empty;
        this._filter = new Filter();
        this._pageRequest = new PageRequest();
    }
    Object.defineProperty(GridProvider.prototype, "pagination", {
        get: function () {
            return this._pagination;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "filter", {
        get: function () {
            return this._filter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "actionRemove", {
        get: function () {
            return this._actionRemove;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "actionEdit", {
        get: function () {
            return this._actionEdit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "actionMultiSelect", {
        get: function () {
            return this._actionMultiSelect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "actionSingleSelect", {
        get: function () {
            return this._actionSingleSelect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "pageRequest", {
        get: function () {
            return this._pageRequest;
        },
        enumerable: true,
        configurable: true
    });
    GridProvider.builder = function () {
        return new GridProviderBuilder();
    };
    Object.defineProperty(GridProvider.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "path", {
        get: function () {
            return this.serverApi.getResourceUrl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "readOnly", {
        get: function () {
            return this._readOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridProvider.prototype, "hasFilter", {
        get: function () {
            return this._hasFilter;
        },
        enumerable: true,
        configurable: true
    });
    GridProvider.prototype.setService = function (serverApi) {
        this.serverApi = serverApi;
    };
    GridProvider.prototype.setHeaders = function (headers) {
        this._headers = headers;
    };
    GridProvider.prototype.setMapper = function (mapper) {
        this.mapper = mapper;
    };
    GridProvider.prototype.setActionRemove = function (hasPermission) {
        this._actionRemove = new ActionRemove(hasPermission);
    };
    GridProvider.prototype.setActionEdit = function (hasPermission) {
        this._actionEdit = new ActionEdit(hasPermission);
    };
    GridProvider.prototype.setActionMultiSelect = function (hasPermission, selectedItems) {
        if (hasPermission === void 0) { hasPermission = false; }
        if (selectedItems === void 0) { selectedItems = []; }
        this._actionMultiSelect = new ActionMultiSelect(hasPermission, selectedItems);
    };
    GridProvider.prototype.setActionSingleSelect = function (hasPermission, selectedItem, callback) {
        if (hasPermission === void 0) { hasPermission = false; }
        this._actionSingleSelect = new ActionSingleSelect(hasPermission, selectedItem, callback);
    };
    GridProvider.prototype.getData = function (page) {
        if (page === void 0) { page = -1; }
        if (page === -1) {
            page = this._pagination.currentPage;
        }
        this._pageRequest.page = page;
        return this.loadPageData(this._pageRequest);
    };
    GridProvider.prototype.loadPageData = function (pageRequest) {
        var _this = this;
        this.params = new http_1.URLSearchParams();
        this.params.setAll(this._filter.buildParams());
        this.params.setAll(pageRequest.buildParams());
        return this.serverApi.list(this.params).map(function (data) {
            _this._pagination = new Pagination(data.numberOfElements, data.totalPages, data.totalElements, pageRequest.page);
            return data.content;
        });
    };
    GridProvider.prototype.remove = function (id) {
        return this.serverApi.remove(id);
    };
    return GridProvider;
}());
exports.GridProvider = GridProvider;
var GridProviderBuilder = (function () {
    function GridProviderBuilder() {
        this._readOnly = false;
    }
    GridProviderBuilder.prototype.service = function (service) {
        this._service = service;
        return this;
    };
    GridProviderBuilder.prototype.mapper = function (mapper) {
        this._mapper = mapper;
        return this;
    };
    GridProviderBuilder.prototype.params = function (params) {
        this._params = params;
        return this;
    };
    GridProviderBuilder.prototype.addParams = function (key, value) {
        if (this._params == undefined) {
            this._params = new http_1.URLSearchParams();
        }
        this._params.append(key, value);
        return this;
    };
    GridProviderBuilder.prototype.headers = function (headers) {
        this._headers = headers;
        return this;
    };
    GridProviderBuilder.prototype.actionRemove = function (hasPermission) {
        if (hasPermission === void 0) { hasPermission = false; }
        this._actionRemove = new ActionRemove(hasPermission);
        return this;
    };
    GridProviderBuilder.prototype.actionEdit = function (hasPermission) {
        if (hasPermission === void 0) { hasPermission = false; }
        this._actionEdit = new ActionEdit(hasPermission);
        return this;
    };
    GridProviderBuilder.prototype.actionMultiSelect = function (hasPermission, selectedItems) {
        if (hasPermission === void 0) { hasPermission = false; }
        if (selectedItems === void 0) { selectedItems = []; }
        this._actionMultiSelect = new ActionMultiSelect(hasPermission, selectedItems);
        return this;
    };
    GridProviderBuilder.prototype.actionSingleSelect = function (hasPermission, selectedItem, callback) {
        if (hasPermission === void 0) { hasPermission = false; }
        this._actionSingleSelect = new ActionSingleSelect(hasPermission, selectedItem, callback);
        return this;
    };
    GridProviderBuilder.prototype.readOnly = function () {
        this._readOnly = true;
        return this;
    };
    GridProviderBuilder.prototype.hasFilter = function (filter) {
        this._hasFilter = filter;
        return this;
    };
    GridProviderBuilder.prototype.build = function () {
        var params = this._params || new PageRequest().buildParams();
        var actionEdit = this._actionEdit || new ActionEdit();
        var actionRemove = this._actionRemove || new ActionRemove();
        var actionMultiSelect = this._actionMultiSelect || new ActionMultiSelect();
        var actionSingleSelect = this._actionSingleSelect || new ActionSingleSelect();
        return new GridProvider(this._service, this._mapper, params, this._headers, this._readOnly, this._hasFilter, actionRemove, actionEdit, actionMultiSelect, actionSingleSelect);
    };
    return GridProviderBuilder;
}());
var Pagination = (function () {
    function Pagination(totalElements, totalPages, totalRegisters, currentPage) {
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.totalRegisters = totalRegisters;
        this.currentPage = currentPage;
    }
    Pagination.prototype.previousPage = function () {
        return this.currentPage - 1;
    };
    Pagination.prototype.nextPage = function () {
        return this.currentPage + 1;
    };
    Pagination.prototype.canShowPage = function (page) {
        var canShow = true;
        if (page < 0 || page > this.totalPages) {
            canShow = false;
        }
        return canShow;
    };
    Pagination.prototype.canShowPrevious = function (page) {
        return page > 0;
    };
    ;
    Pagination.prototype.canShowNext = function (page) {
        return page < this.totalPages;
    };
    ;
    Pagination.defaultPageSize = 10;
    Pagination.defaultPageNumber = 0;
    Pagination.empty = new Pagination(0, 0, 0, 0);
    return Pagination;
}());
var Params = (function () {
    function Params() {
    }
    Params.prototype.buildParams = function () {
        var filters = new http_1.URLSearchParams();
        for (var prop in Object.keys(this)) {
            if (!util_1.isNullOrUndefined(this[Object.keys(this)[prop]])) {
                filters.set(Object.keys(this)[prop], this[Object.keys(this)[prop]]);
            }
        }
        return filters;
    };
    return Params;
}());
var Filter = (function (_super) {
    __extends(Filter, _super);
    function Filter(status, q) {
        _super.call(this);
        if (status) {
            this.status = status;
        }
        else {
            this.status = '';
        }
        this.q = q;
    }
    return Filter;
}(Params));
var PageRequest = (function (_super) {
    __extends(PageRequest, _super);
    function PageRequest(page, size) {
        if (page === void 0) { page = Pagination.defaultPageNumber; }
        if (size === void 0) { size = Pagination.defaultPageSize; }
        _super.call(this);
        this.page = page;
        this.size = size;
    }
    return PageRequest;
}(Params));
var AbstractAction = (function () {
    function AbstractAction(hasPermission) {
        this.hasPermission = hasPermission;
    }
    AbstractAction.prototype.canShow = function () {
        return this.hasPermission;
    };
    return AbstractAction;
}());
var ActionRemove = (function (_super) {
    __extends(ActionRemove, _super);
    function ActionRemove(hasPermission) {
        if (hasPermission === void 0) { hasPermission = false; }
        _super.call(this, hasPermission);
    }
    return ActionRemove;
}(AbstractAction));
var ActionEdit = (function (_super) {
    __extends(ActionEdit, _super);
    function ActionEdit(hasPermission) {
        if (hasPermission === void 0) { hasPermission = false; }
        _super.call(this, hasPermission);
    }
    return ActionEdit;
}(AbstractAction));
var ActionMultiSelect = (function (_super) {
    __extends(ActionMultiSelect, _super);
    function ActionMultiSelect(hasPermission, selectedItems) {
        if (hasPermission === void 0) { hasPermission = false; }
        if (selectedItems === void 0) { selectedItems = []; }
        _super.call(this, hasPermission);
        this.selectedItems = [];
        this.selectedItems = selectedItems;
    }
    ActionMultiSelect.prototype.addItem = function (item) {
        this.selectedItems.push(item);
    };
    ActionMultiSelect.prototype.removeItem = function (item) {
        var indexToRemove = underscore_1._.findIndex(this.selectedItems, function (selectedItem) {
            return selectedItem.id == item.id;
        });
        this.selectedItems.splice(indexToRemove, 1);
    };
    return ActionMultiSelect;
}(AbstractAction));
var ActionSingleSelect = (function (_super) {
    __extends(ActionSingleSelect, _super);
    function ActionSingleSelect(hasPermission, selectedItem, callback) {
        if (hasPermission === void 0) { hasPermission = false; }
        _super.call(this, hasPermission);
        this.selectedItem = selectedItem;
        this.callback = callback;
    }
    ActionSingleSelect.prototype.addItem = function (item) {
        Object.assign(this.selectedItem, item);
        if (this.callback) {
            this.callback(this.selectedItem);
        }
    };
    ActionSingleSelect.prototype.removeItem = function () {
        delete this.selectedItem;
    };
    return ActionSingleSelect;
}(AbstractAction));
//# sourceMappingURL=grid.provider.js.map