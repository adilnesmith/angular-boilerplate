import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/lib/types/menuitem'
import { menuData } from 'src/app/lib/constants'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarLinks: MenuItem[] = menuData;
}
