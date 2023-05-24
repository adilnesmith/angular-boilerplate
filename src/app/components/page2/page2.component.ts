
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  entries!: any

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getEntries().subscribe((data: any) => {
      this.entries = data.entries;
    });
  }
}