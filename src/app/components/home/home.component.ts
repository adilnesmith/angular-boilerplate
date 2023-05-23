import { Component, inject } from '@angular/core';
import { HousingService } from '../../housing.service';
import { HousingLocation } from '../../lib/@types/housinglocation';

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
  totalPages: number[] = []; // Array of page numbers
  housingService: HousingService = inject(HousingService);

  constructor() {
    this.loadHousingLocations();
  }

  loadHousingLocations() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList.slice();
    this.calculateTotalPages();
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  calculateTotalPages() {
    const totalItems = this.filteredLocationList.length;
    this.totalPages = Array(Math.ceil(totalItems / this.itemsPerPage)).fill(0).map((_, index) => index + 1);
  }

  getPageItems(): HousingLocation[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredLocationList.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages.length) {
      this.currentPage = pageNumber;
    }
  }
}
