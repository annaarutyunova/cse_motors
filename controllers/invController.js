const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildById = async function (req, res, next) {
  const inv_id= req.params.invId;
  console.log({inv_id})
  const data = await invModel.getInventoryById(inv_id)
  console.log("INVENTORY", data)
  const container = await utilities.buildById(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: "Inventory",
    nav,
    container
  })

}


invCont.buildInventoryManagement = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Inventory Management",
    nav,
    errors: null,
  })
}

invCont.buildAddNewClassifictionForm = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/new-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
  })
}

invCont.buildAddNewInventoryForm = async function(req, res, next) {
  let nav = await utilities.getNav()
  const classifications = await invModel.getClassifications()
  let select = await utilities.selectClassification(classifications.rows)
  res.render("./inventory/new-inventory", {
    title: "Add New Inventory",
    nav,
    select,
    errors: null
  })
}

module.exports = invCont