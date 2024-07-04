import { Component } from "@angular/core";

import ResponseDTO from "../../../../dtos/response.dto";
import ClientService from "../../services/client.service";
import PaginationDTO from "../../../../dtos/pagination.dto";
import ListClient from "../../interfaces/list-client.interface";

@Component({ selector: 'app-list', templateUrl: './list.component.html', styleUrls: [] })
export class ListComponent {
  constructor(private clientService: ClientService) { };

  page: number = 1;
  total: number = 0;
  filters: any = {};
  items: ListClient[] = [];

  ngOnInit(): void {
    this.load();
  };

  filter() {
    this.load();
  };

  changed(page: any) {
    this.page = page;
    this.load();
  };

  load() {
    this.clientService.list(this.filters, this.page).subscribe((response: ResponseDTO<PaginationDTO<ListClient>>) => {
      this.items = response.data.items;
      this.total = response.data.totalItems;
    });
  };
};