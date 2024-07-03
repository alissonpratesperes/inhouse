import { Component } from "@angular/core";

import ClientService from "../../services/client.service";
import ListClient from "../../interfaces/list-client.interface";

@Component({ selector: 'app-list', templateUrl: './list.component.html', styleUrls: [] })
export class ListComponent {
  constructor(private clientService: ClientService) { };

  page: number = 1;
  total: number = 0;
  filters: any = {};
  items: ListClient[] = [];

  ngOnInit(): void { this.load(); };

  load() { this.clientService.list(this.filters, this.page).subscribe((response: any) => { if (response.data) { this.items = response.data.items; this.total = response.data.totalItems; }; }); };

  changed(page: any) { this.page = page; this.load(); };

  filter() { this.load(); };
};