import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const QuoteSchema = require('./schemas/quote.schema');

QuoteSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Quote', QuoteSchema);
