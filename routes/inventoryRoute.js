// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const invValidate = require("../utilities/inventory-validation")


// Inventory management view
router.get("/", utilities.handleErrors(invController.buildInventoryManagement));

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

router.get("/detail/:invId", utilities.handleErrors(invController.buildById));

router.get("/new-classification", utilities.handleErrors(invController.buildAddNewClassifictionForm));

router.post("/new-classification", 
    invValidate.newClassificationRules(),
    invValidate.checkNewClassificationData,
    utilities.handleErrors(invController.addNewClassification));

router.get("/new-inventory", utilities.handleErrors(invController.buildAddNewInventoryForm));
router.post(
    "/new-inventory",
    invValidate.addNewVehicleRules(),
    invValidate.checkNewVehicleData,
    utilities.handleErrors(invController.addNewVehicle)
    )

module.exports = router;