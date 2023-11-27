const { describe, it } = require('mocha');
const { expect } = require('chai');

const fs = require('fs').promises;
const { editReviews, deleteReviews} = require('../utils/ReviewUtil')

describe('Testing Review related features', () => {
    const reviewFilePath = 'utils/reviews.json';
    var orgContent = "";

    beforeEach(async () => {
        orgContent = await fs.readFile(reviewFilePath, 'utf8');
        orgContent = JSON.parse(orgContent);
    });

    afterEach(async () => {
        await fs.writeFile(reviewFilePath, JSON.stringify(orgContent), 'utf8');
    });

    it('Should edit a review successfully', async () => {
        const req = {
            body: {
                name: "Test",
                location: "Temasek",
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
                location: "Temasek",
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