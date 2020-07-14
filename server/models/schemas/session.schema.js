const mongoose = require('mongoose');

const { Schema } = mongoose;
const SessionSchema = new Schema(
  {
    professional: String,
    availability: [
      {
        day: String,
        interval_hours: [
          {
            start: String,
            end: String,
          },
        ],
        booked_sessions: [
          {
            customer: String,
            date: String,
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
