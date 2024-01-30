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

after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});
