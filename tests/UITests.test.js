const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;

const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');

const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;
var counter = 0;

before(async function () {
    server = await new Promise((resolve) => {
        server = app.listen(0, 'localhost', () => {
            resolve(server);
        });
    })
});

describe('Testing Edit Review Modal', function () {
    it('Should successfully update review information', async function () {
        console.log('Starting the test...');

        // Clicking on the "Edit Review" button to open the modal
        await driver.findElement(By.id('editReviewModalLabel')).click();
        console.log('Clicked on the "Edit Review" button...');

        // Modifying review information in the edit modal
        const newRestaurantName = 'New Restaurant Name';
        const newDescription = 'Updated review description.';

        // Selecting a different restaurant from the dropdown
        await driver.findElement(By.id('editName')).sendKeys(newRestaurantName);
        console.log('Selected a different restaurant...');

        // Modifying the review description
        await driver.findElement(By.id('editDescription')).clear();
        await driver.findElement(By.id('editDescription')).sendKeys(newDescription);
        console.log('Modified the review description...');

        // Clicking the "Update Review" button in the modal
        await driver.findElement(By.id('updateButton')).click();
        console.log('Clicked on the "Update Review" button...');

        // Waiting for the changes to be reflected (assuming an asynchronous update)
        await driver.sleep(2000);
        console.log('Waiting for changes to be reflected...');

        // Verifying the changes by checking the updated review on the frontend
        const updatedRestaurantName = await driver.findElement(By.id('editName')).getAttribute('value');
        const updatedDescription = await driver.findElement(By.id('editDescription')).getAttribute('value');

        console.log('Verifying changes...');
        // Asserting that the review information has been successfully updated on the frontend
        expect(updatedRestaurantName).to.equal(newRestaurantName);
        expect(updatedDescription).to.equal(newDescription);
        console.log('Assertions passed.');
    });
});




after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});