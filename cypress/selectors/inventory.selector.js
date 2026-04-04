export const inventorySelectors = {
    sortProduct: () => cy.get('[data-test="product-sort-container"]'),
    firstInventoryItem: () => cy.get('[data-test="inventory-item"]').first(),
    firstAddToCartButton: () => cy.get('button').contains('Add to cart'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
    burgerMenuButton: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => cy.get('[data-test="logout-sidebar-link"]'),
}
