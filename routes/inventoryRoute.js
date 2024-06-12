// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")


// Inventory management view
router.get("/", utilities.handleErrors(invController.buildInventoryManagement));

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:invId", utilities.handleErrors(invController.buildById));

router.get("/new-classification", utilities.handleErrors(invController.buildAddNewClassifictionForm));

router.get("/new-inventory", utilities.handleErrors(invController.buildAddNewInventoryForm));

module.exports = router;