const { readJSON, writeJSON } = require('./UserUtil')
const { Resource } = require('../models/Resource');
async function viewResources(req, res) {
    try {
        const allResources = await readJSON('utils/resources.json');
        return res.status(201).json(allResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    viewResources
};