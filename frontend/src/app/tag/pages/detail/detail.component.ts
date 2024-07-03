import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import TagService from "../../services/tag.service";
import ClientService from "../../../client/services/client.service";
import ListClient from "../../../client/interfaces/list-client.interface";

@Component({ selector: 'app-detail', templateUrl: './detail.component.html', styleUrls: [] })
export class DetailComponent {
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private tagService: TagService, private clientService: ClientService) { };

  lease: number | 0 = 0;
  id: string | null = null;
  clients: ListClient[] = [];
  client: ListClient | null = null;
  form: FormGroup = this.createForm();
  selectedClient: number | null = null;

  ngOnInit(): void { this.id = this.route.snapshot.paramMap.get('id'); if (this.id) this.load(this.id); };

  get f() { return this.form.controls; };

  createForm(): FormGroup {
    return this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      mac: ['', [Validators.required, Validators.email]],
      price: [[Validators.required]],
      leased: [],
    });
  };

  load(id: string) {
    this.tagService.get(id).subscribe((tag) => { this.form.patchValue(tag.data); this.client = tag.data.client; });
    this.clientService.list("", 1, 1000).subscribe((response) => { if (response.data) { response.data.items.map((client) => { this.clients.push(client) }); }; });
  };

  save() {
    const formData = { ...this.form.value };
    formData.price = parseFloat(formData.price);

    if (this.id) {
      this.tagService.update(this.id, formData).subscribe((response) => { this.router.navigate(['/tags']); });
    } else {
      this.tagService.create(formData).subscribe((response) => { this.router.navigate(['/tags']); });
    };
  };

  delete() {
    this.tagService.delete(this.id).subscribe((response) => { this.router.navigate(['/tags']); });
  };

  leasing() {
    const id = { ...this.form.value };

    function getFormattedTime(format: any) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      return format.replace('YYYY', year).replace('MM', month).replace('DD', day).replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
    };

    const desiredFormat = 'YYYY-MM-DD hh:mm:ss';
    const formattedTime = getFormattedTime(desiredFormat);
    const leasingInformation = { id: id.id, leased: formattedTime, clientId: this.selectedClient };

    this.tagService.lease(leasingInformation).subscribe((response) => { this.router.navigate(['/tags']); });
  };
};