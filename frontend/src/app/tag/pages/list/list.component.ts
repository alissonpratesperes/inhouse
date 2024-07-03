import { Component } from "@angular/core";

import TagService from "../../services/tag.service";
import ListTag from "../../interfaces/list-tag.interface";

@Component({ selector: 'app-list', templateUrl: './list.component.html', styleUrls: [] })
export class ListComponent {
  constructor(private tagService: TagService) { };

  page: number = 1;
  total: number = 0;
  filters: any = {};
  items: ListTag[] = [];

  ngOnInit(): void { this.load(); };

  load() { this.tagService.list(this.filters, this.page).subscribe((response: any) => { if (response.data) { this.items = response.data.items; this.total = response.data.totalItems; }; }); };

  changed(page: any) { this.page = page; this.load(); };

  filter() { this.load(); };
};