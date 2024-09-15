import { expect } from "@playwright/test";
import { INOTIFICATION } from "data/textNotification";
import { SalesPortalPage } from "ui/pages/salesPortal.page";
import { logStep } from "utils/report/logStep";


export class SalesPortalService extends SalesPortalPage {
    readonly uniqueElement = '';

    @logStep()
    async checkNotificationText(action: INOTIFICATION) {
        expect(await this.getNotificationText()).toEqual(action)
        await this.closeNotificationWindow()
    }
}