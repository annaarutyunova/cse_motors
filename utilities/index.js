const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<nav class='bg-black text-white mx-[-12px]'><ul  class='flex justify-around'>"
  list += '<li class="p-3"><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li class='p-3'>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul></nav>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display" class="flex flex-wrap justify-evenly mt-6">'
    data.forEach(vehicle => { 
      grid += '<li class="pb-6">'
      grid +=  '<a class="" href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img class="w-[350px] h-[200px] object-cover" src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
Build single inventory view
*/
Util.buildById = async function(data){
  let container
  if (data) {
    container = `
      <h2>${data.inv_make} ${data.inv_model}</h2>
      <p>${data.inv_description}</p>
      <p>${data.inv_year} | ${data.inv_make} | ${data.inv_model}</p>
    `
  }
  return container
}


/* ************************
 * Constructs select classification in form in inventory when adding new vehicle
 ************************** */
Util.selectClassification = async function(optionSelected){
  let data = await invModel.getClassifications()
  let select = "<select name='classification_id' class='semi-bold' id='classificationList'>"
  let options = "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    options += `<option
      value = "${row.classification_id}"
      ${row.classification_id === Number(optionSelected)? 'selected':''}
      >
      ${row.classification_name}
    </option>`
  })
  select += options
  select += "</select>"
  return select
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)



module.exports = Util
