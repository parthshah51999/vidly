const { Customer, validate } = require("../models/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findById(id);
  if (!customer) res.status(400).send("Customer not found");

  res.send(customer);
});

router.post("/", async (req, res) => {
  const { name, phone, isGold } = req.body;

  const result = validate(req.body);
  if (result?.error) {
    res.status(400).send(result.error.details[0]?.message);
    return;
  }

  let customer = new Customer({ name, phone, isGold });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone } = req.body;

  const result = validate(req.body);
  if (result?.error) {
    res.status(400).send(result.error.details[0]?.message);
    return;
  }

  const customer = await Customer.findByIdAndUpdate(
    id,
    { name, phone },
    { new: true }
  );
  if (!customer) res.status(400).send("Customer not found");

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const customer = await Customer.findByIdAndRemove(id);
  if (!customer) res.status(400).send("Customer not found");

  res.send(customer);
});

module.exports = router;
