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

describe('Testing Reviews UI', function () {
    it('Should be able to add and display new reviews', async function () {
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
        // Locate and interact with the Login button
        const addButton = await driver.findElement(By.xpath("//div[@class='col-md-2']//button[contains(text(), 'Add Review')]"));
        await addButton.click();
        // Wait for the modal to load
        const reviewModal = await driver.findElement(By.id('reviewModal'));
        await driver.wait(until.elementIsVisible(reviewModal), 5000);
        const { Select } = require('selenium-webdriver/lib/select');
        const nameDropdownElement = await driver.findElement(By.id('name'));
        const nameSelect = new Select(nameDropdownElement);
        await nameSelect.selectByVisibleText('Macs'); // This will select the 'Macs' option
        // Locate and interact with the description field
        const rDescElement = await driver.findElement(By.id('description'));
        await rDescElement.click(); // Click on the element
        await rDescElement.sendKeys('Project purpose');
        // Locate the table element and locate all tr within table
        const tableBefore = await driver.findElement(By.tagName('table')); // Replace with the actual ID of your table
        const rowsBefore = await tableBefore.findElements(By.tagName('tr'));
        const beforeCount = rowsBefore.length
        // Locate and interact with the Login button
        const addButtonModal = await driver.findElement(By.xpath("//div[@class='modal-footer']//button[contains(text(), 'Add Review')]"));
        await addButtonModal.click();
        // Wait for the modal to dismiss
        await driver.manage().setTimeouts({ implicit: 5000 });
        // Locate the table element and locate all tr within table
        const tableUpdated = await driver.findElement(By.tagName('table'));
        const rowsUpdated = await tableUpdated.findElements(By.tagName('tr'));
        // Assert that the table rows increased by 1
        expect(rowsUpdated.length).to.equal(beforeCount + 1);
    });
});
afterEach(async function () {
    await driver.executeScript('return window.__coverage__;').then(async (coverageData) => {
        if (coverageData) {
            // Save coverage data to a file
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
after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});
