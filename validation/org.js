const {default: validator } = require('validator')
const Validator = require('validator')
const validText = require('./valid-text')

module.exports = function validateOrgInput(data){

  let errors = {}
  data.name = validText(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, {min: 2, max: 30})){
    errors.name = 'Title must be longer than 2 and less than 30 characters'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }

}