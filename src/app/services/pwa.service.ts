import { Injectable } from '@angular/core';

import { Platform } from '@angular/cdk/platform';
import { timer } from 'rxjs/internal/observable/timer';
import { take } from 'rxjs/internal/operators/take';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PromptComponent } from '../components/prompt/prompt.component';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) { }

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(2000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}