import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { mobileType: 'ios' | 'android', promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<PromptComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
   * Fires a prompt when the user click on install.
   * @returns void
   */
  public installPwa(): void {
    try {
      this.data.promptEvent.prompt();
      this.close();
    } catch (error) {
      console.error("installPwa ERROR. " + error);
    }
  }

  /**
   * Close the prompt.
   */
  public close(): void {
    this.bottomSheetRef.dismiss();
  }

}
