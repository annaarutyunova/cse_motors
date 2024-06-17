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

 /* ****************************************
*  Process Add New Classification
* *************************************** */
invCont.addNewClassification = async function(req, res) {
  const { classification_name } = req.body

  const newVehicleResult = await invModel.addNewClass(
    classification_name
  )
  if (newVehicleResult) {
    let nav = await utilities.getNav()
    req.flash(
      "success semi-bold",
      `The ${classification_name} classification was successfully added.`
    )
    res.status(201).render("./inventory/management", {
      title: "Vehicle management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Please provide a correct classification name.")
    res.status(501).render("./inventory/new-classification", {
      title: "Add Classification ",
      nav,
      errors
    })
  }
}

invCont.addNewVehicle = async function(req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_description, inv_image, inv_thumbnail, 
    inv_price, inv_year, inv_miles, inv_color, classification_id} = req.body
    const newVehicleResult = await invModel.addNewVehicle(
      inv_make, 
      inv_model, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_year, 
      inv_miles, 
      inv_color,
      classification_id
    )
    if (newVehicleResult) {
      const classificationData = await invModel.getClassifications()
      let select = await utilities.selectClassification(classificationData.rows)
      req.flash(
        "success semi-bold",
        `The ${inv_make} ${inv_model} was successfully added.`
      )
      res.status(201).render("./inventory/management", {
        title: "Vehicle management",
        nav,
        errors: null,
        select
      })
    } else {
      req.flash("notice", "Please provide correct information.")
      res.status(501).render("./inventory/new-inventory", {
        title: "Add Vehicle",
        nav,
        errors,
        select
      })
    }
}



module.exports = invCont