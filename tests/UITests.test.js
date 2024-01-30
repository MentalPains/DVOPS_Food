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

describe('Testing Edit Resource UI', function () {
    it('Should be able to edit and display updated resource', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/instrumented';
        await driver.get(baseUrl);

        // Logging in before editing a resource
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('john@gmail.com');
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('123456');
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();

        // Navigate to the edit page of a specific resource
        // Assuming there is a list of resources and each has an 'Edit' button
        const editButton = await driver.findElement(By.xpath("//button[contains(text(), 'Edit')]")); // Adjust XPath as needed
        await editButton.click();

        // Editing resource details
        const rNameElement = await driver.findElement(By.id('name'));
        await rNameElement.clear();
        await rNameElement.sendKeys('Updated Monitor');
        const rLocElement = await driver.findElement(By.id('location'));
        await rLocElement.clear();
        await rLocElement.sendKeys('Updated Location');
        const rDescElement = await driver.findElement(By.id('description'));
        await rDescElement.clear();
        await rDescElement.sendKeys('Updated Description');

        // Saving the updated resource details
        const saveButton = await driver.findElement(By.xpath("//button[contains(text(), 'Save Changes')]")); // Adjust XPath as needed
        await saveButton.click();

        // Verification
        // Assuming there is a way to access the updated resource details for verification
        // Verify that the resource details have been updated correctly
        const updatedName = await driver.findElement(By.id('resource-name')).getText(); // Replace with actual selectors
        const updatedLocation = await driver.findElement(By.id('resource-location')).getText();
        const updatedDescription = await driver.findElement(By.id('resource-description')).getText();

        expect(updatedName).to.equal('Updated Monitor');
        expect(updatedLocation).to.equal('Updated Location');
        expect(updatedDescription).to.equal('Updated Description');
    });
});

after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});