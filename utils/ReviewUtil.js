const { readJSON, writeJSON } = require('./UserUtil')
const { Review } = require('../models/review');
const fs = require('fs').promises;
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

async function editReviews(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const location = req.body.location;
        const description = req.body.description;
        const allReviews = await readJSON('utils/review.json');
        var modified = false;
        for (var i = 0; i < allReviews.length; i++) {
            var curcurrReview = allReviews[i];
            if (curcurrReview.id == id) {
                allReviews[i].name = name;
                allReviews[i].location = location;
                allReviews[i].description = description;
                modified = true;
            }
        }
        if (modified) {
            await fs.writeFile('utils/review.json', JSON.stringify(allReviews), 'utf8');
            return res.status(201).json({ message: 'Review modified successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


async function deleteReviews(req, res) {
    try {
        const id = req.params.id;
        const allReviews = await readJSON('utils/reviews.json');
        var index = -1;
        for (var i = 0; i < allReviews.length; i++) {
            var curcurrReview = allReviews[i];
            if (curcurrReview.id == id)
                index = i;
        }
        if (index != -1) {
            allReviews.splice(index, 1);
            await fs.writeFile('utils/reviews.json', JSON.stringify(allReviews), 'utf8');
            return res.status(201).json({ message: 'Review deleted successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to delete!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



module.exports = { viewReviews, editReviews, deleteReviews };