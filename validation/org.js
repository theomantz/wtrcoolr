const {default: validator } = require('validator')
const Validator = require('validator')
const validText = require('./valid-text')

module.exports = function validateOrgInput(data){
  let errprs = {}
  data.title = validText(data.title) ? data.title : "";

  if (!Validator.isLength(data.title, {min: 2, max: 30})){
    errors.name = 'Title must be longer than 2 and less than 30 characters'
  }

  return {
    errors,
    isvalid: Object.keys(errors).length === 0
  }

}