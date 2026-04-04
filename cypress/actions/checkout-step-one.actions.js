import checkoutInformation  from '../fixtures/checkout-information.json';
import { checkoutStepOneSelectors } from '../selectors/checkout-step-one.selector';

export function fillInCheckoutInformationAndContinue() {
    checkoutStepOneSelectors.firstNameInput().type(checkoutInformation.firstName);
    checkoutStepOneSelectors.lastNameInput().type(checkoutInformation.lastName);
    checkoutStepOneSelectors.postalCodeInput().type(checkoutInformation.postalCode);
    checkoutStepOneSelectors.continueButton().click();
}
