const mongoose = require('mongoose');

// Standalone Question model
// (Questions are also embedded in Quiz schema,
//  this standalone model is for a shared question bank)

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: (arr) => arr.length === 4,
        message: 'Exactly 4 options required',
      },
    },
    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
    points: {
      type: Number,
      default: 100,
    },
    category: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);