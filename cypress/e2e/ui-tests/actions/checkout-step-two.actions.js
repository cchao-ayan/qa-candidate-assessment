import { checkoutStepTwoSelectors } from "../selectors/checkout-step-two.selector";

export function clickFinishButton() {
    checkoutStepTwoSelectors.finishButton().click();
}