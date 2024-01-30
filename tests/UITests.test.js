const { app } = require('../index');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { describe, it, before, after } = require('mocha');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--headless');
const driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
var server;

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

        // Interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click(); // Click on the element
        await emailElement.sendKeys('john@gmail.com');

        // Interact with the Login button
        const loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'));
        await loginButton.click();

        // Retrieve and assert error message
        const errorMessage = await driver.findElement(By.id('error')).getText();
        expect(errorMessage).to.equal('All fields are required!');
    });
});

describe('Testing Register UI', function () {
    it('Should show error message - Passwords do not match!', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/register.html';
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('hongy@gmail.com');

        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('515151');

        // Locate and interact with the confirm password field
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click();
        await confirmPasswordElement.sendKeys('51515');

        // Locate and interact with the Register button
        const registerButton = await driver.findElement(By.xpath('//button[text()="Register"]'));
        await registerButton.click();

        // Locate the error element and retrieve its text
        const errorMessage = await driver.findElement(By.id('error')).getText();
        const errorStyle = await driver.findElement(By.id('error')).getAttribute('class');

        // Assert that the error message contains the expected text and style
        expect(errorMessage).to.equal('Passwords do not match!');
        expect(errorStyle).to.equal('text-danger');
    });

    it('Should clear textboxes when Reset is clicked', async function () {
        this.timeout(100000);
        const baseUrl = 'http://localhost:' + server.address().port + '/register.html';
        await driver.get(baseUrl);

        // Locate and interact with the email field
        const emailElement = await driver.findElement(By.id('email'));
        await emailElement.click();
        await emailElement.sendKeys('paul@gmail.com');

        // Locate and interact with the password field
        const passwordElement = await driver.findElement(By.id('password'));
        await passwordElement.click();
        await passwordElement.sendKeys('123456');

        // Locate and interact with the confirm password field
        const confirmPasswordElement = await driver.findElement(By.id('confirmPassword'));
        await confirmPasswordElement.click();
        await confirmPasswordElement.sendKeys('1234');

        // Locate and interact with the Reset button
        const resetButton = await driver.findElement(By.xpath('//button[text()="Reset"]'));
        await resetButton.click();

        // Retrieve the values of the textboxes
        const emailText = await emailElement.getAttribute('value');
        const passwordText = await passwordElement.getAttribute('value');
        const confirmPasswordText = await confirmPasswordElement.getAttribute('value');

        // Assert that the textboxes are all empty
        expect(emailText).to.equal('');
        expect(passwordText).to.equal('');
        expect(confirmPasswordText).to.equal('');
    });
});


after(async function () {
    await driver.quit();
    await server.close();
    process.exit(0);
});
