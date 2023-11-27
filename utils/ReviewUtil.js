const { readJSON, writeJSON } = require('./UserUtil')
const { Review } = require('../models/review');
async function addReviews(req, res) {
    try {
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const owner = req.body.owner;
        const newReview = new Review(name, location, description, owner);
        const updatedReviews = await writeJSON(newReview, 'utils/reviews.json');
        return res.status(201).json(updatedReviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    addReviews
};