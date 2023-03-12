const Joi = require('joi')
require('dotenv').config()

export const validateRegisterData = (data: any) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  })
  return Joi.validate(data, schema)
}
