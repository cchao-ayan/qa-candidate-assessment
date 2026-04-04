import { loginSelectors } from '../selectors/login.selector';
import user from '../fixtures/user.json';

export function loginSuccessfully() {
    loginSelectors.usernameInput().type(user.username);
    loginSelectors.passwordInput().type(user.password);
    loginSelectors.loginButton().click();
}

