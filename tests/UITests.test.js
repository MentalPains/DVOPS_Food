const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
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
})


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
});

describe('Testing Delete Review UI', function () {
    it('Should be able to see a modal to confirm delete', async function () {
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


        const deleteButton = await driver.findElement(By.xpath("//button[contains(text(), 'Delete')]"));
        await deleteButton.click();

        const modal = await driver.findElement(By.id('myModal'));
        await driver.wait(until.elementIsVisible(modal), 5000);
        // Assert that the modal is displayed
        const isModalVisible = await modal.isDisplayed();
        expect(isModalVisible).to.be.true;

    });
});

describe('Testing Login UI', function () {
    it('Should have the correct title', async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);
        const title = await driver.getTitle();
        expect(title).to.equal('DVOPS - Food Review Web App');
    });

    it('Should show error message - All fields required', async function () {
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('john@gmail.com');
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('All fields are required!');
    });
});

describe('Testing Register UI', function () {
    it('Should show error message - Passwords do not match!', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/register.html';
        await driver.get(baseUrl);
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('hongy@gmail.com');
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('515151');
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click();
        await confirmPasswordElement.sendKeys('51515');
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');
        expect(errorMessage).to.equal('Passwords do not match!');
        expect(errorStyle).to.equal('text-danger');
    });

    it('Should clear textboxes when Reset is clicked', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/register.html';
        await driver.get(baseUrl);
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('paul@gmail.com');
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('123456');
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click();
        await confirmPasswordElement.sendKeys('1234');
        const resetButton = await driver.findElement(By.xpath('//button[text()="Reset"]'));
        await resetButton.click();
        const emailText = await emailElement.getAttribute('value');
        const passwordText = await passwordElement.getAttribute('value');
        const confirmPasswordText = await confirmPasswordElement.getAttribute('value');
        expect(emailText).to.equal('');
        expect(passwordText).to.equal('');
        expect(confirmPasswordText).to.equal('');
    });
});

describe('Testing Reviews UI', function () {
    it('Should be able to add and display new reviews', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port;
        await driver.get(baseUrl);
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('john@gmail.com');
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('123456');
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();
        await driver.wait(until.urlIs(baseUrl + '/home.html'), 10000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.equal('http://localhost:' + server.address().port + '/home.html');
        const addButton = await driver.findElement(By.xpath("//div[@class='col-md-2']//button[contains(text(), 'Add Review')]"));
        await addButton.click();
        const reviewModal = await driver.findElement(By.id('reviewModal'));
        await driver.wait(until.elementIsVisible(reviewModal), 5000);
        const { Select } = require('selenium-webdriver/lib/select');
        const nameDropdownElement = await driver.findElement(By.id('name'));
        const nameSelect = new Select(nameDropdownElement);
        await nameSelect.selectByVisibleText('Macs');
        const rDescElement = await driver.findElement(By.id('description'));
        await rDescElement.click();
        await rDescElement.sendKeys('Project purpose');
        const tableBefore = await driver.findElement(By.tagName('table'));
        const rowsBefore = await tableBefore.findElements(By.tagName('tr'));
        const beforeCount = rowsBefore.length;
        const addButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Add Review')]"));
        await addButtonModal.click();
        await driver.manage().setTimeouts({ implicit: 5000 });
        const tableUpdated = await driver.findElement(By.tagName('table'));
        const rowsUpdated = await tableUpdated.findElements(By.tagName('tr'));
        expect(rowsUpdated.length).to.equal(beforeCount + 1);
    });
});

afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            await fs.writeFile('coverage-frontend/coverage' + counter++ + '.json',
                JSON.stringify(coverageData), (err) => {
                    if (err) {
                        console.error('Error writing coverage data:', err);
                    } else {
                        console.log('Coverage data written to coverage.json');
                    }
                });
        }

    });
});



