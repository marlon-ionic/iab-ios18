import { Component, inject } from '@angular/core';
import { IonHeader, IonButton, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IABService } from '../services/iab.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private readonly iabService = inject(IABService);

  async iab(target?: '_blank' | '_system' | '_top' ) {
    if(target === '_system') {
    await this.iabService.openSystemBrowser('https://ionic.io?a=1');
  } else {
    const b = await this.iabService.openInAppBrowser('https://ionic.io?a=1');
    b?.show();
  }
}
}
