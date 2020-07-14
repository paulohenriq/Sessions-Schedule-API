import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const SessionSchema = require('./schemas/session.schema');

SessionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Session', SessionSchema);
