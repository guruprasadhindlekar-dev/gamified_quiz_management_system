import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Star, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Progress } from "../components/Progress";
 
// Mock quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: 1,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Da Vinci", "Picasso", "Monet"],
    correct: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correct: 2,
  },
  {
    question: "What is the speed of light?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correct: 0,
  },
  {
    question: "Which programming language is known for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    correct: 1,
  },
  {
    question: "What year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correct: 2,
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correct: 2,
  },
];
 
export default function QuizGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [streak, setStreak] = useState(0);
 
  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
 
  useEffect(() => {
    if (timer > 0 && !showResult) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !showResult) {
      handleTimeout();
    }
  }, [timer, showResult]);
 
  const handleTimeout = () => {
    setShowResult(true);
    setStreak(0);
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };
 
  const handleAnswer = (index) => {
    if (showResult || selectedAnswer !== null) return;
 
    setSelectedAnswer(index);
    setShowResult(true);
 
    const isCorrect = index === question.correct;
    if (isCorrect) {
      const points = Math.max(100, timer * 10);
      const xp = Math.floor(points / 5);
      setScore((prev) => prev + points);
      setXpGained(xp);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
 
    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };
 
  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(15);
      setSelectedAnswer(null);
      setShowResult(false);
      setXpGained(0);
    } else {
      navigate("/results", { state: { score, totalQuestions: quizData.length } });
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-[#6C5CE7]/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ top: "20%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-[#FF2E63]/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ bottom: "20%", right: "10%" }}
        />
      </div>
 
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Timer */}
          <motion.div
            className="flex items-center gap-3 bg-[#111827] border border-[#6C5CE7]/30 rounded-xl px-6 py-3"
            animate={timer <= 5 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: timer <= 5 ? Infinity : 0 }}
          >
            <Clock
              className={`w-6 h-6 ${timer <= 5 ? "text-[#FF2E63]" : "text-[#00F5D4]"}`}
            />
            <span
              className={`text-2xl font-game font-bold ${
                timer <= 5 ? "text-[#FF2E63]" : "text-[#00F5D4]"
              }`}
            >
              {timer}s
            </span>
          </motion.div>
 
          {/* Score */}
          <motion.div
            className="flex items-center gap-3 bg-[#111827] border border-[#6C5CE7]/30 rounded-xl px-6 py-3"
            key={score}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            <Star className="w-6 h-6 text-[#F59E0B]" />
            <span className="text-2xl font-game font-bold text-[#F59E0B]">
              {score.toLocaleString()}
            </span>
          </motion.div>
 
          {/* Streak */}
          {streak > 0 && (
            <motion.div
              className="flex items-center gap-2 bg-gradient-to-r from-[#FF2E63] to-[#F59E0B] rounded-xl px-4 py-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Zap className="w-5 h-5 text-white" />
              <span className="text-lg font-game font-bold text-white">
                {streak}x
              </span>
            </motion.div>
          )}
        </div>
 
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {quizData.length}
            </span>
            <span className="text-sm text-[#00F5D4] font-game">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-[#1E293B]" />
        </div>
 
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-[#111827] border-[#6C5CE7]/30 p-8 mb-6 shadow-[0_0_50px_rgba(108,92,231,0.2)]">
              <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-8">
                {question.question}
              </h2>
 
              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === question.correct;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;
 
                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult || selectedAnswer !== null}
                      className={`relative p-6 rounded-xl text-left transition-all font-medium text-lg
                        ${
                          showCorrect
                            ? "bg-gradient-to-r from-[#22C55E] to-[#10B981] border-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                            : showWrong
                            ? "bg-gradient-to-r from-[#EF4444] to-[#DC2626] border-[#EF4444] shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                            : "bg-[#1E293B] border border-[#6C5CE7]/30 hover:border-[#6C5CE7] hover:shadow-[0_0_20px_rgba(108,92,231,0.3)]"
                        }
                      `}
                      whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      animate={showWrong ? { x: [-5, 5, -5, 5, 0] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showCorrect && (
                          <CheckCircle2 className="w-6 h-6 text-white" />
                        )}
                        {showWrong && <XCircle className="w-6 h-6 text-white" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
 
        {/* XP Gained Animation */}
        <AnimatePresence>
          {xpGained > 0 && (
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, y: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] rounded-2xl px-8 py-6 shadow-[0_0_50px_rgba(108,92,231,0.8)]">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-white mx-auto mb-2" />
                  <div className="text-3xl font-game font-bold text-white">
                    +{xpGained} XP
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}