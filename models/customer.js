const Joi = require("joi");
const mongoose = require("mongoose");

// Model
const customerSchema = mongoose.Schema({
  isGold: { type: Boolean, default: false },
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  phone: { type: String, required: true, minlength: 5, maxlength: 50 },
});

const Customer = mongoose.model("Customer", customerSchema);

// Joi validation
const customerValidation = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(5).max(50).required(),
    name: Joi.boolean(),
  });

  const result = schema.validate(customer);
  return result;
};

exports.Customer = Customer;
exports.validate = customerValidation;
