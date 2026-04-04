import { inventorySelectors } from "../selectors/inventory.selector";

export function sortProducts(sortOption) {
    switch (sortOption) {
        case 'Price (low to high)':
            inventorySelectors.sortProduct().select('Price (low to high)');
            break;
        case 'Price (high to low)':
            inventorySelectors.sortProduct().select('Price (high to low)');
            break;
        default:
            throw new Error(`Invalid sort option: ${sortOption}`);
    }
}
export function addFirstItemToCart() {
    inventorySelectors.firstInventoryItem().should('be.visible').within(() => {
        inventorySelectors.firstAddToCartButton().should('be.visible').click();
    });
}

export function addTheFirstItemToCartWithSortOption(sortOption) {
    sortProducts(sortOption);
    addFirstItemToCart();
}

export function clickCartLink() {
    inventorySelectors.cartLink().should('be.visible').click();
}

export function clickBurgerMenuButton() {
    inventorySelectors.burgerMenuButton().should('be.visible').click();
}

export function clickLogoutLink() {
    inventorySelectors.logoutLink().should('be.visible').click();
}