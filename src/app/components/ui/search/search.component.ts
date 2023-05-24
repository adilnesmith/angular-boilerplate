import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  searchText: string = '';

  filterResults() {
    this.searchChange.emit(this.searchText);
  }
}