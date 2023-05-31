import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/entries.api.service';
import { Entry } from 'src/app/lib/types/entry';
import { PaginationService } from 'src/app/pagination.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  entries: Entry[] = [];
  filteredEntries: Entry[] = [];

  constructor(private apiService: ApiService, private paginationService: PaginationService) { }


  ngOnInit() {
    this.apiService.getEntries().subscribe((data: any) => {
      this.entries = data.entries;
      this.filteredEntries = this.entries.slice();
      this.updatePagination();
    });
  }
  currentPage: number = 1;
  itemsPerPage: number = 20; // Number of items to display per page
  totalPages: number[] = [];

  updatePagination() {
    this.totalPages = this.paginationService.calculateTotalPages(this.filteredEntries, this.itemsPerPage);
    this.currentPage = this.paginationService.adjustCurrentPage(this.currentPage, this.totalPages);
  }

  getPageItems(): Entry[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.paginationService.getPageItems(this.filteredEntries, startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages.length) {
      this.currentPage = pageNumber;
    }
  }


  filterResults(text: string) {
    if (!text) {
      this.filteredEntries = this.entries.slice();
    } else {
      this.filteredEntries = this.entries.filter(
        (entry: Entry) => entry?.API.toLowerCase().includes(text.toLowerCase())
      );
    }
    this.updatePagination();
  }


}
