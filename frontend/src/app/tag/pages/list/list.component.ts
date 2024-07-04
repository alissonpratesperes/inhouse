import { Component } from "@angular/core";

import TagService from "../../services/tag.service";
import ResponseDTO from "../../../../dtos/response.dto";
import ListTag from "../../interfaces/list-tag.interface";
import PaginationDTO from "../../../../dtos/pagination.dto";

@Component({ selector: 'app-list', templateUrl: './list.component.html', styleUrls: [] })
export class ListComponent {
  constructor(private tagService: TagService) { };

  page: number = 1;
  total: number = 0;
  filters: any = {};
  items: ListTag[] = [];

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
    this.tagService.list(this.filters, this.page).subscribe((response: ResponseDTO<PaginationDTO<ListTag>>) => {
      this.items = response.data.items;
      this.total = response.data.totalItems;
    });
  };
};