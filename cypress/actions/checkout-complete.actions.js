import { checkoutCompleteSelectors } from "../selectors/checkout-complete.selector";

export function clickBackToProductsButton() {
    checkoutCompleteSelectors.backToProductsButton().click();
}