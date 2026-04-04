import { cartSelectors } from "../selectors/cart.selector";

export function clickCheckoutButton() {
    cartSelectors.checkoutButton().click();
}