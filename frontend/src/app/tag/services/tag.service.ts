import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import GetTag from "../interfaces/get-tag.interface";
import ResponseDTO from "../../../dtos/response.dto";
import ListTag from "../interfaces/list-tag.interface";
import ShutTag from "../interfaces/shut-tag.interface";
import PaginationDTO from "../../../dtos/pagination.dto";
import LeaseTag from "../interfaces/lease-tag.interface";
import environment from "../../../enviroments/environment";

@Injectable({ providedIn: 'root' })
class TagService {
    constructor(private http: HttpClient) { };

    create(tag: GetTag): Observable<ResponseDTO<GetTag>> { return this.http.post<ResponseDTO<GetTag>>(environment.url + '/tags/', tag); };

    get(id: string): Observable<ResponseDTO<GetTag>> { return this.http.get<ResponseDTO<GetTag>>(environment.url + '/tags/' + id); };

    list(filters: any, page: number, pageSize: number = 10): Observable<ResponseDTO<PaginationDTO<ListTag>>> { return this.http.get<ResponseDTO<PaginationDTO<ListTag>>>(environment.url + '/tags', { params: { page, pageSize, ...filters } }); };

    update(id: string, tag: GetTag): Observable<ResponseDTO<GetTag>> { return this.http.put<ResponseDTO<GetTag>>(environment.url + '/tags/' + id, tag); };

    delete(id: string | null): Observable<ResponseDTO<GetTag>> { return this.http.delete<ResponseDTO<GetTag>>(environment.url + '/tags/' + id); };

    lease(leasingInformation: LeaseTag): Observable<ResponseDTO<GetTag>> { return this.http.put<ResponseDTO<GetTag>>(environment.url + '/leases', leasingInformation); };

    shut(id: number): Observable<ResponseDTO<ShutTag>> { return this.http.post<ResponseDTO<ShutTag>>(environment.url + '/leases/' + id, {}); };
};

export default TagService;