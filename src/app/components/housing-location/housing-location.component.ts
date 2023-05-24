import { Component, Input } from '@angular/core';
import { HousingLocation } from '../../lib/types/housinglocation';
@Component({
  selector: 'app-housing-location',
  templateUrl: './housing-location.component.html',
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}