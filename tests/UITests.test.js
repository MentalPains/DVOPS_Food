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

        // Collecting initial review information
        const initialRestaurantName = await driver.findElement(By.id('restaurant-name')).getText();
        const initialDescription = await driver.findElement(By.id('review-description')).getText();

        // Clicking on the "Edit Review" button to open the modal
        await driver.findElement(By.id('edit-review-button')).click();

        // Modifying review information in the edit modal
        const newRestaurantName = 'New Restaurant Name';
        const newDescription = 'Updated review description.';

        // Selecting a different restaurant from the dropdown
        await driver.findElement(By.id('editName')).sendKeys(newRestaurantName);

        // Modifying the review description
        await driver.findElement(By.id('editDescription')).clear();
        await driver.findElement(By.id('editDescription')).sendKeys(newDescription);

        // Clicking the "Update Review" button in the modal
        await driver.findElement(By.id('updateButton')).click();

        // Waiting for the changes to be reflected (assuming an asynchronous update)
        await driver.sleep(2000);

        // Verifying the changes by checking the updated review in the backend
        const updatedReview = await getReviewById(reviewId); // Implement a function to get a review by ID

        // Asserting that the review information has been successfully updated in the backend
        expect(updatedReview.name).to.equal(newRestaurantName);
        expect(updatedReview.description).to.equal(newDescription);
    });
});


after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});