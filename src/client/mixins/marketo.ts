import { Page } from 'puppeteer';

export class MarketoAware {
  public client: Page;

  public async getFinishedMarketoRequests(): Promise<any> {
    return this.client['__networkRequests'];
  }
}
