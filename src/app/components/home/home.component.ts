import { Component } from '@angular/core';
import { HousingService } from '../../housing.service';
import { HousingLocation } from '../../lib/types/housinglocation';
import { PaginationService } from '../../pagination.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items to display per page
  totalPages: number[] = [];

  constructor(private housingService: HousingService, private paginationService: PaginationService) {
    this.loadHousingLocations();
  }

  loadHousingLocations() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList.slice();
    this.updatePagination();
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    } else {
      this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
      );
    }
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = this.paginationService.calculateTotalPages(this.filteredLocationList, this.itemsPerPage);
    this.currentPage = this.paginationService.adjustCurrentPage(this.currentPage, this.totalPages);
  }

  getPageItems(): HousingLocation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.paginationService.getPageItems(this.filteredLocationList, startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages.length) {
      this.currentPage = pageNumber;
    }
  }
}
