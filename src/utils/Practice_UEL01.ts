// import { expect, Locator, Page } from '@playwright/test';
// import { createLogger, type Logger } from '@utils/logger';

// export const DEFAULT_ACTION_TIMEOUT_MS = 15_000;

// export type Flex = string | Locator;

// export class UEL01 {

//     private readonly page: Page;
//     private readonly log: Logger;

//     constructor(page: Page, scope: string = 'UEL01') {
//         this.page = page;
//         this.log = createLogger(scope);
//     }

//     private toLocator(target: Flex): Locator {
//         return typeof target === 'string' ? this.page.locator(target) : target;
//     }

//     private describe(target: Flex): string {
//         return typeof target === 'string' ? target : target.toString();
//     }

//     // ---------- mouse actions ----------

//     async click(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
//         const loc = this.toLocator(target);
//         this.log.debug(`click ${this.describe(target)}`);
//         await loc.click({ timeout })
//     }

//     async doubleClick(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
//         const loc = this.toLocator(target);
//         this.log.debug(`doubleClick ${this.describe(target)}`);
//         await loc.dblclick({ timeout })
//     }

//     async hover(target: Flex, timeout: number = DEFAULT_ACTION_TIMEOUT_MS): Promise<void> {
//         const loc = this.toLocator(target);
//         this.log.debug(`hover${this.describe(target)}`);
//         await loc.hover({ timeout })
//     }




// }