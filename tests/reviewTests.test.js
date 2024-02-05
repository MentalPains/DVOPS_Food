const { describe, it } = require('mocha');
const { expect } = require('chai');
const fs = require('fs').promises;
const { addReviews, viewReviews, editReviews, deleteReviews } = require('../utils/ReviewUtil')

describe('Testing review related features', () => {
    const reviewsFilePath = 'utils/reviews.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(reviewsFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(reviewsFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should add a new review successfully', async () => {
        const req = {
            body: {
                name: "Macs",
                description: "For project showcase",
                owner: "john@gmail.com"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data).to.have.lengthOf(orgContent.length + 1);
                expect(data[orgContent.length].name).to.equal(req.body.name);
            },
        };
        await addReviews(req, res);
    });

    it('Should not be able to add review due to incomplete input', async () => {
        const req = {
            body: {
                name: "Macs",
                description: "For project showcase"
            },
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.not.equal(undefined);
            },
        };
        await addReviews(req, res);
    });

    it('Should edit a review successfully', async () => {
        const req = {
            body: {
                name: "Test",
                description: "Testing purpose",
            },
            params: {
                id: orgContent[0].id
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Review modified successfully!');
            },
        };
        await editReviews(req, res);
    });

    it('Should not be able to edit review due to invalid id', async () => {
        const req = {
            body: {
                name: "Test",
                description: "Testing purpose",
            },
            params: {
                id: "ABCDEFG"
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Error occurred, unable to modify!');
            },
        };
        await editReviews(req, res);
    });

    it('Should delete a review successfully', async () => {
        const req = {
            params: {
                id: orgContent[0].id
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(201);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Review deleted successfully!');
            },
        };
        await deleteReviews(req, res);
    });

    it('Should not be able to delete review due to invalid id', async () => {
        const req = {
            params: {
                id: "ABCDEFG"
            }
        };
        const res = {
            status: function (code) {
                expect(code).to.equal(500);
                return this;
            },
            json: function (data) {
                expect(data.message).to.equal('Error occurred, unable to delete!');
            },
        };
        await deleteReviews(req, res);
    });
});
