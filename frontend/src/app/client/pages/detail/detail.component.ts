import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import ClientService from "../../services/client.service";
import TagService from "../../../tag/services/tag.service";
import ListTag from "../../../tag/interfaces/list-tag.interface";

@Component({ selector: 'app-detail', templateUrl: './detail.component.html', styleUrl: './detail.component.scss' })
export class DetailComponent {
  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private tagService: TagService,
    private router: Router,
    private route: ActivatedRoute
  ) { };

  tags: ListTag[] = [];
  id: string | null = null;
  selectedTag: number | 0 = 0;
  form: FormGroup = this.createForm();

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) this.load(this.id);
  };

  get f() { return this.form.controls; };

  createForm(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  };

  load(id: string) {
    this.clientService.get(id).subscribe((client) => { this.form.patchValue(client.data); client.data.tags.map((tag: ListTag) => this.tags.push(tag)); });
  };

  save() {
    if (this.form.invalid)
      return;

    if (this.id) {
      this.clientService.update(this.id, this.form.value).subscribe((response) => { this.router.navigate(['/clients']); });
    } else {
      this.clientService.create(this.form.value).subscribe((response) => { this.router.navigate(['/clients']); });
    };
  };

  delete() {
    this.clientService.delete(this.id).subscribe((response) => { this.router.navigate(['/clients']); });
  };

  shut(id: number) {
    this.tagService.shut(id).subscribe((response) => {
      this.router.navigate(['/tags']); alert(`Custo: ${response.data.cost}, Tempo: ${response.data.time}`);
    });
  };
};