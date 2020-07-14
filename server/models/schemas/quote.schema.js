const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuoteSchema = new Schema(
  {
    quote_number: String,
    rental_price: Number,
    property_id: String,
    quote_price: String,
    minimum_income: String,
    quote_version: String,
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);

module.exports = QuoteSchema;
