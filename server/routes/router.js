const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    const userData = require('../data/data.json');
    // TODO wrong path for data
})

module.exports = router