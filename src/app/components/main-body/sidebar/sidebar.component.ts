import { Component, OnInit } from '@angular/core';
import { menuData } from '../../../lib/constants'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarLinks = menuData;

}
