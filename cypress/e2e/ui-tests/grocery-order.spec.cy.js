import { addTheFirstItemToCartWithSortOption, clickCartLink, clickBurgerMenuButton, clickLogoutLink } from '../../actions/inventory.actions';
import { loginSuccessfully } from '../../actions/login.actions';
import { clickCheckoutButton } from '../../actions/cart.actions';
import { fillInCheckoutInformationAndContinue } from '../../actions/checkout-step-one.actions';
import { clickFinishButton } from '../../actions/checkout-step-two.actions';
import { clickBackToProductsButton } from '../../actions/checkout-complete.actions';

describe('Order Groceries', () => {
  beforeEach('Visits Source Demo website and logs in', () => {
    cy.visit('/');
    loginSuccessfully();
  });
  it('should complete a grocery order end-to-end', () => {
    // Add items to cart
    addTheFirstItemToCartWithSortOption('Price (low to high)');
    addTheFirstItemToCartWithSortOption('Price (high to low)');
    clickCartLink();

    clickCheckoutButton();

    // Fill in checkout information and continue
    fillInCheckoutInformationAndContinue();

    // Finish order and logout
    clickFinishButton();

    clickBackToProductsButton();
    
    clickBurgerMenuButton();

    clickLogoutLink();
  });
})