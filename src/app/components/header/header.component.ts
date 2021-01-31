import { Component, OnInit } from '@angular/core';
import { IconService } from "../../services/icon.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  offline: boolean = false;

  constructor(private iconService : IconService) { }

  ngOnInit(): void {
    this.iconService.registerIcons();
  }
}
