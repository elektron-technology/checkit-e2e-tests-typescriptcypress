/// <reference types="Cypress" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage from '../pages/LoginPage';
import ControlCentreHomePage from '../pages/ControlCentreHomePage';
import DocumentManagementPage from '../pages/DocumentManagementPage';
import { stringify } from "querystring";
const CHECKIT_ENV = require('../../fixtures/env/checkit_env.json');

Given(`I am on documentManagment application`, () => {

    const page = new LoginPage();
    page.navigateToThisPage(60);
    page.enterUsername(CHECKIT_ENV.USERNAME);
    page.enterPassword(CHECKIT_ENV.PASSWORD);
    page.clickLoginButton();
    const ccPage = new ControlCentreHomePage();
    ccPage.clickOnDocumentManagementButton();
});

When('I click on the UPLOAD document link', () => {
    const documentPage = new DocumentManagementPage();
    documentPage.clickOnUploadButton();
});

Then('I fill in the upload document form with DocumentName as {string} and Description as {string}', (documentName:string, documentDesc:string) => {
    const documentPage = new DocumentManagementPage();
    documentPage.enterDocumentNameAndDescription(documentName,documentDesc);
});
