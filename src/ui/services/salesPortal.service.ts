import { expect } from "@playwright/test";
import { INOTIFICATION } from "data/textNotification";
import { SalesPortalPage } from "ui/pages/salesPortal.page";


export class SalesPortalService extends SalesPortalPage {
    readonly uniqueElement = '';


    async checkNotificationText(action: INOTIFICATION) {
        expect(await this.getNotificationText()).toEqual(action)
        await this.closeNotificationWindow()
    }
}