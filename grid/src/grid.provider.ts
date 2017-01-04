import { Observable } from 'rxjs';
import { URLSearchParams } from '@angular/http';
import { isNullOrUndefined } from 'util';
import { Mapper } from './mapper';

export class GridProvider<MODEL> {

  private _pagination: Pagination = Pagination.empty;

  private _filter: Filter = new Filter();

  params: URLSearchParams;

  _pageRequest: PageRequest = new PageRequest();

  get pagination() {
    return this._pagination;
  }

  get filter() {
    return this._filter;
  }

  get pageRequest() {
    return this._pageRequest;
  }


  static builder() : GridProviderBuilder {
    return new GridProviderBuilder();
  }

  constructor(public serverApi: any,
              protected mapper: Mapper,
              protected params: URLSearchParams,
              protected _headers: Array<string>,
              protected _hasEditPermissions: boolean = true,
              protected _hasRemovePermissions: boolean = true,
              protected _readOnly: boolean,
              protected _hasFilter: boolean = true) {}


  get headers() {
    return this._headers;
  }

  get path() {
    return this.serverApi.getResourceUrl();
  }

  get hasEditPermissions() {
    return this._hasEditPermissions;
  }

  get hasRemovePermissions() {
    return this._hasRemovePermissions;
  }

  get readOnly() {
    return this._readOnly;
  }

  get hasFilter() {
    return this._hasFilter;
  }

  getData(page: number = -1): Observable<Array<any>> {
    if (page === -1) {
      page = this._pagination.currentPage;
    }
    this._pageRequest.page = page;
    return this.loadPageData(this._pageRequest);
  }

  loadPageData(pageRequest: PageRequest): Observable<Array<any>> {
    this.params.setAll(this._filter.buildParams());
    this.params.setAll(pageRequest.buildParams());
    return this.serverApi.list(this.params).map(data=> {
      this._pagination = new Pagination(data.numberOfElements, data.totalPages, data.totalElements, pageRequest.page);
      return data.content.map((model)=>{
        return this.mapper(model);
      });
    });
  }

  remove(id:number): Observable<boolean>  {
    return this.serverApi.remove(id);
  }
}

class GridProviderBuilder {

  private _service : any;

  private _mapper : Mapper;

  private _params: URLSearchParams;

  private _headers: Array<string>;

  private _hasEditPermissions: boolean;

  private _hasRemovePermissions: boolean;

  private _readOnly: boolean = false;

  private _hasFilter: boolean;

  service(service: any): GridProviderBuilder {
    this._service = service;
    return this;
  }

  mapper(mapper: Mapper): GridProviderBuilder {
    this._mapper = mapper;
    return this;
  }

  params(params: URLSearchParams): GridProviderBuilder {
    this._params = params;
    return this;
  }

  addParams(key:string, value:string): GridProviderBuilder {

    if(this._params == undefined) {
      this._params = new URLSearchParams();
    }

    this._params.append(key, value);

    return this;
  }

  headers(headers: Array<string>): GridProviderBuilder {
    this._headers = headers;
    return this;
  }

  hasEditPermissions(editPermissions: boolean): GridProviderBuilder {
    this._hasEditPermissions = editPermissions;
    return this;
  }

  hasRemovePermissions(removePermissions: boolean): GridProviderBuilder {
    this._hasRemovePermissions = removePermissions;
    return this;
  }

  readOnly(): GridProviderBuilder {
    this._readOnly = true;
    return this;
  }

  hasFilter(filter: boolean): GridProviderBuilder {
    this._hasFilter = filter;
    return this;
  }


  build(): GridProvider<MODEL> {
    let params: URLSearchParams = this._params || new PageRequest().buildParams();
    return new GridProvider(this._service, this._mapper, params, this._headers, this._hasEditPermissions, this._hasRemovePermissions, this._readOnly, this._hasFilter);
  }
}

class Pagination {

  static defaultPageSize: number = 10;
  static defaultPageNumber: number = 0;

  static empty:Pagination = new Pagination(0, 0, 0, 0);

  constructor(public totalElements: number,
              public totalPages: number,
              public totalRegisters: number,
              public currentPage: number) { }

  previousPage(): number {
    return this.currentPage - 1;
  }

  nextPage(): number {
    return this.currentPage + 1;
  }

  canShowPage(page: number): boolean {
    let canShow = true;

    if (page < 0 || page > this.totalPages) {
      canShow = false;
    }

    return canShow;
  }

  canShowPrevious(page: number) : boolean {
    return page > 0;
  };

  canShowNext(page: number) : boolean {
    return page < this.totalPages
  };

}

abstract class Params {
  public buildParams(): URLSearchParams {
    let filters: URLSearchParams = new URLSearchParams();
    for (var prop in Object.keys(this)) {
      if (!isNullOrUndefined(this[Object.keys(this)[prop]])) {
        filters.set(Object.keys(this)[prop], this[Object.keys(this)[prop]]);
      }
    }
    return filters;
  }
}

class Filter extends Params {
    status: boolean;
    q: string;

    constructor(status?: boolean, q?: string) {
        super();
        this.status = status;
        this.q = q;
    }
}

class PageRequest extends Params {
    page: number;
    size: number;

    constructor(page: number = Pagination.defaultPageNumber, size: number = Pagination.defaultPageSize) {
        super();
        this.page = page;
        this.size = size;
    }
}
