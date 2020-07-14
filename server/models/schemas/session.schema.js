const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;
const SessionSchema = new Schema(
  {
    professional: String,
    availability: [
      {
        _id: ObjectId,
        day: Number,
        interval_hours: [
          {
            start: String,
            end: String,
          },
        ],
        booked_sessions: [
          {
            _id: ObjectId,
            customer: String,
            date: Date,
            hour: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  }
);

module.exports = SessionSchema;
