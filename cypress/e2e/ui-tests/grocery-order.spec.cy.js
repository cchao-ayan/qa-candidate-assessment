describe('Order Groceries', () => {
  it('Visits Souce Demo website', () => {
    cy.visit('/');
  });
  it('Login successfully', () => {
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
  });
  it('Add items to cart and checkout', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)');
    cy.get('[data-test="inventory-item"]').first().within(() => {
      cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    });
    cy.get('[data-test="product-sort-container"]').select('Price (high to low)');
    cy.get('[data-test="inventory-item"]').first().within(() => {
      cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    });
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
  });
  it('Fill in checkout information and complete order', () => {
    cy.get('[data-test="firstName"]').type('test_first_name');
    cy.get('[data-test="lastName"]').type('test_lastname');
    cy.get('[data-test="postalCode"]').type('test_postal_code')
    cy.get('[data-test="continue"]').click();
  });
  it('Finish order and logout', () => {
    cy.get('[data-test="finish"]').click();
    cy.get('[data-test="back-to-products"]').click();
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
  })
})