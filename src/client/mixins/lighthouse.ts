import { Page } from 'puppeteer';
import * as lighthouse from 'lighthouse';
import * as DesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';
import * as MobileConfig from 'lighthouse/lighthouse-core/config/lr-mobile-config';

export class LighthouseAware {
  public client: Page;

  async getLighthouseScores(url: string, throttleTo: 'desktop' | 'mobile' = 'desktop', categories: string[] = ['performance']) {
    const browser = this.client.browser();

    const flags = {
      port: (new URL(browser.wsEndpoint())).port,
      output: 'json',
      logLevel: 'info',
    };

    const config: any = throttleTo === 'mobile' ? MobileConfig : DesktopConfig;
    config.settings.onlyCategories = categories;
    //// config.settings.emulatedFormFactor = throttleTo;

    const { lhr } = await lighthouse(url, flags, config);
    return lhr;
  }
}
