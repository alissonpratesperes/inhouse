import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import ResponseDTO from "../../../dtos/response.dto";
import PaginationDTO from "../../../dtos/pagination.dto";
import environment from "../../../enviroments/environment";
import GetClient from "../interfaces/get-client.interface";
import ListClient from "../interfaces/list-client.interface";

@Injectable({ providedIn: 'root' })
class ClientService {
    constructor(private http: HttpClient) { };

    create(client: GetClient): Observable<ResponseDTO<GetClient>> {
        return this.http.post<ResponseDTO<GetClient>>(environment.url + '/clients/', client);
    };

    get(id: string): Observable<ResponseDTO<GetClient>> {
        return this.http.get<ResponseDTO<GetClient>>(environment.url + '/clients/' + id);
    };

    list(filters: any, page: number, pageSize: number = 10): Observable<ResponseDTO<PaginationDTO<ListClient>>> {
        return this.http.get<ResponseDTO<PaginationDTO<ListClient>>>(environment.url + '/clients', { params: { page, pageSize, ...filters } });
    };

    update(id: string, client: GetClient): Observable<ResponseDTO<GetClient>> {
        return this.http.put<ResponseDTO<GetClient>>(environment.url + '/clients/' + id, client);
    };

    delete(id: string | null): Observable<ResponseDTO<GetClient>> {
        return this.http.delete<ResponseDTO<GetClient>>(environment.url + '/clients/' + id);
    };
};

export default ClientService;