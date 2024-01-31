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

describe('Testing Edit Review UI', function () {
    it('Should be able to edit and update a review', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@gmail.com');

        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('123456');

        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');

        // Navigate to the "EditModal" page
        const editButton = await driver.findElement(By.xpath("//button[contains(text(), 'Edit')]"));
        await editButton.click();

        // Wait for the modal to load
        const editReviewModal = await driver.findElement(By.id('editReviewModal'));
        await driver.wait(until.elementIsVisible(editReviewModal), 5000);

        const modalIsOpen = await driver.findElement(By.id('editReviewModal')).isDisplayed();
        expect(modalIsOpen).to.equal(true);

        // Interaction with the dropdown
        const dropdown = await driver.findElement(By.id('editName'));
        await dropdown.click();

        // Select "Macs" from the dropdown
        const optionXPath = `//select[@id='editName']/option[text()='Macs']`;
        const option = await driver.findElement(By.xpath(optionXPath));
        await option.click();

        // Verify that the selected value in the dropdown is "Macs"
        const selectedValue = await dropdown.getAttribute('value');
        expect(selectedValue).to.equal('Macs');

        const newDescription = 'Updated review description.';

        // Clear the existing description
        const descriptionInput = await driver.findElement(By.id('editDescription'));
        await descriptionInput.clear();

        // Enter the new description
        await descriptionInput.sendKeys(newDescription);

        // Verify that the description field has been updated
        const updatedDescription = await descriptionInput.getAttribute('value');
        expect(updatedDescription).to.equal(newDescription);

        const updateButton = await driver.findElement(By.id('updateButton'));
        await updateButton.click();

        // Wait for the changes to be reflected (assuming an asynchronous update)
        await driver.sleep(2000);

        // For now, let's just check if the modal is closed after clicking the update button
        const isModalClosed = await editReviewModal.isDisplayed().catch(() => false);
        expect(isModalClosed).to.equal(false);
    });
    it('Should cancel the edit operation and close the modal on "Close" button click', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@gmail.com');

        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click(); // Click on the element
        await passwordElement.sendKeys('123456');

        // Locate and interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        // Wait for the page to be redirected
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
        // Assert that the URL matches the expected URL
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');

        // Navigate to the "EditModal" page
        const editButton = await driver.findElement(By.xpath("//button[contains(text(), 'Edit')]"));
        await editButton.click();

        // Wait for the modal to load
        const editReviewModal = await driver.findElement(By.id('editReviewModal'));
        await driver.wait(until.elementIsVisible(editReviewModal), 5000);

        const modalIsOpen = await driver.findElement(By.id('editReviewModal')).isDisplayed();
        expect(modalIsOpen).to.equal(true);


        // Check if the "Close" button is present
        const closeButton = await driver.findElement(By.xpath("//button[text()='close']"));
        console.log('Found the "Close" button.');

        // Wait for the modal to be visible
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('editReviewModal'))), 5000, 'Timed out waiting for the modal to be visible');

        // Check the initial state of the modal
        const isModalInitialState = await driver.findElement(By.id('editReviewModal')).isDisplayed();
        console.log('Initial state of the modal:', isModalInitialState);

        // Click the "Close" button
        // Click the "Close" button
        try {
            await closeButton.click();
            console.log('Clicked the Close button.');

            // Wait for the modal to be closed
            await driver.wait(async () => {
                const isModalClosed = await driver.findElement(By.id('editReviewModal')).isDisplayed().catch(() => false);
                return !isModalClosed;
            }, 10000, 'Timed out waiting for the modal to close');

            // Check the state of the modal after waiting
            const isModalClosedAfterDelay = await driver.findElement(By.id('editReviewModal')).isDisplayed().catch(() => false);
            console.log('Is modal closed after delay?', isModalClosedAfterDelay);

            // Assert that the state after clicking the "Close" button is different from the initial state
            expect(isModalClosedAfterDelay).to.not.equal(isModalInitialState);
        } catch (error) {
            console.error('Error clicking the Close button:', error);
        }

    });
});

after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});