import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Icons } from '../interfaces/icons';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  constructor( 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) { }


    /**
     * Register the stored icons when this function is called.
     */
    public registerIcons(): void {
      try {
        this.loadIcons(Object.values(Icons), '../assets/svg/icons');
      } catch (error) {
        console.error("loadIcons ERROR. " + error);
      }
    }

    /**
     * Receive an iconKey value, and an iconUrl and register
     * them into the app to use in the location where are called.
     * @param iconKeys 
     * @param iconUrl 
     * @returns void
     */
    private loadIcons(iconKeys: string[], iconUrl: string): void{
      try {
        iconKeys.forEach( key => {
          this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
        })
      } catch (error) {
        console.error("loadIcons ERROR. " + error);
      }
    }
}
