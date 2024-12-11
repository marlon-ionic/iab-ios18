import { Injectable } from '@angular/core';
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Preferences } from '@capacitor/preferences';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class IABService {
  private duration?: string;
  private browser?: InAppBrowserObject;
  private readonly randomJwtToken = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMzk0ODIzMiwiaWF0IjoxNzMzOTQ4MjMyfQ.5mYhY-HcPuSV0kefPRSGAOjpYFFgMlwzYGgOaGIbBsY';

  constructor(private readonly inAppBrowser: InAppBrowser ) { }

  // public methods
  public async openInAppBrowser(ssoUrl: string): Promise<InAppBrowserObject|undefined> {
    const location = Capacitor.getPlatform() === 'android' ? 'yes' : 'no';
    const options: InAppBrowserOptions = {
        hideurlbar: 'yes',
        toolbarcolor: '#00857d',
        closebuttoncolor: '#ffffff',
        navigationbuttoncolor: '#ffffff',
        toolbarposition: 'top',
        location: location,
        closebuttoncaption: 'Done',
        hidden: 'yes',
        suppressesIncrementalRendering: 'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes'
    };

    return await this.OpenBrowser(ssoUrl, '_blank', options);
}

public async openSystemBrowser(ssoUrl: string): Promise<InAppBrowserObject|undefined> {
    return await this.OpenBrowser(ssoUrl, '_system');
}

// private methods

private async OpenBrowser(ssoUrl: string, target?: string, options?: InAppBrowserOptions) {
    this.duration = new Date().toISOString();
    await Preferences.set({ key: 'RATING_KEY', value: this.duration });
    this.browser = this.inAppBrowser.create(`${ssoUrl}&token=${this.randomJwtToken}`, target, options);

    if (this.browser && Object.keys(this.browser).length > 0) {
        this.setupInAppBrowserEvents(this.browser);
    }
    return this.browser;
}

private setupInAppBrowserEvents(inAppBrowserObject: InAppBrowserObject): void {
    inAppBrowserObject.on('loadstart').subscribe(() => {
      console.log('loadstart');
    });

    inAppBrowserObject.on('loadstop')?.subscribe((event: any) => {
      console.log('loadstop');
    });

    inAppBrowserObject.on('loaderror').subscribe((event: any) => {
      console.log('loaderror', event);

        if (this.browser) {
            this.browser.close();
        }
    });

    inAppBrowserObject.on('exit').subscribe(async () => {
      console.log('exit');
        await Preferences.remove({ key: 'RATING_KEY' });
    });
}
}
