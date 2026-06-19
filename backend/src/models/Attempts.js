const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      default: 0,
    },
    answers: [
      {
        questionIndex:  { type: Number },
        selectedAnswer: { type: Number }, // index chosen by user
        isCorrect:      { type: Boolean },
        pointsEarned:   { type: Number, default: 0 },
      },
    ],
    timeTaken: {
      type: Number, // seconds
      default: 0,
    },
    xpEarned: {
      type: Number,
      default: 0,
    },
    rank: {
      type: String,
      enum: ['Beginner', 'Skilled', 'Expert', 'Master'],
      default: 'Beginner',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attempt', attemptSchema);