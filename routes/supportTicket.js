const express = require('express')
const supportTicketController = require('../controller/supportTicketController')
const router = express.Router()

router.get('/getRequests', supportTicketController.getRequests)
router.post('/createRequest', supportTicketController.createRequest)
router.post('/updateStatus', supportTicketController.updateStatus)

module.exports = router
