const { readJSON, writeJSON } = require('./UserUtil')
const { Review } = require('../models/review');
const fs = require('fs').promises;

async function addReviews(req, res) {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const owner = req.body.owner;
        const newReview = new Review(name, description, owner);
        const updatedReviews = await writeJSON(newReview, 'utils/reviews.json');
        return res.status(201).json(updatedReviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewReviews(req, res) {
    try {
        const allReviews = await readJSON('utils/reviews.json');
        return res.status(201).json(allReviews);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function editReviews(req, res) {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const description = req.body.description;
        const allReviews = await readJSON('utils/reviews.json');
        var modified = false;
        for (var i = 0; i < allReviews.length; i++) {
            var curcurrReview = allReviews[i];
            if (curcurrReview.id == id) {
                allReviews[i].name = name;
                allReviews[i].description = description;
                modified = true;
            }
        }
        if (modified) {
            await fs.writeFile('utils/reviews.json', JSON.stringify(allReviews), 'utf8');
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

    async function confirmDelete() {
        // Display a confirmation dialog
        const confirmed = confirm("Are you sure you want to delete this review?");
    
        // Check if the user clicked OK
        if (confirmed) {
            // Call the deleteReviews function
            await deleteReviews();
        } else {
            // User clicked Cancel, do nothing or provide feedback
            console.log("Delete operation canceled");
        }
    }


module.exports = { addReviews, viewReviews, editReviews, deleteReviews, confirmDelete };
