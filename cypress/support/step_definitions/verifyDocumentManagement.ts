/// <reference types="Cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../pages/LoginPage';
const CHECKIT_ENV = require('../../fixtures/env/checkit_env.json');

Given(`I am on documentManagment application`, () => {

    const page = new LoginPage();
    page.navigateToThisPage(60);
    page.enterUsername(CHECKIT_ENV.USERNAME);
     page.enterPassword(CHECKIT_ENV.PASSWORD);
    page.clickLoginButton();
});
