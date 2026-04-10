import {
  loginSuccessfully,
  addTheFirstItemToCartWithSortOption,
  clickCartLink,
  clickCheckoutButton,
  fillInCheckoutInformationAndContinue,
  clickFinishButton,
  clickBackToProductsButton,
  clickBurgerMenuButton,
  clickLogoutLink
} from "../../actions";

describe('Order Groceries', () => {
  beforeEach('Visits Source Demo website and logs in', () => {
    cy.visit('/');
    loginSuccessfully();
  });
  it('should complete a grocery order and logout', () => {
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