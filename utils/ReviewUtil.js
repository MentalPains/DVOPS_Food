const { readJSON, writeJSON } = require('./UserUtil')
const { Review } = require('../models/review');
async function viewReviews(req, res) {
    try {
        const allReviews = await readJSON('utils/reviews.json');
        return res.status(201).json(allReviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewReviews
};

