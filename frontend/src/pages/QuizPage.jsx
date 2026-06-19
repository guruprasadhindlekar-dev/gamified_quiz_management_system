import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Timer,
  Target,
  CheckCircle,
  FileQuestion,
} from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Label } from "../components/Label";
import { Textarea } from "../components/Textarea";

import { toast } from "sonner";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [category, setCategory] = useState("");
  const [timeLimit, setTimeLimit] = useState("15");
  const [questions, setQuestions] = useState([
    {
      id: "1",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 100,
    },
  ]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 100,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleSave = () => {
    if (!quizTitle || !category) {
      toast.error("Please fill in quiz title and category");
      return;
    }

    const incompleteQuestions = questions.some(
      (q) => !q.question || q.options.some((opt) => !opt)
    );

    if (incompleteQuestions) {
      toast.error("Please complete all questions and options");
      return;
    }

    toast.success("Quiz created successfully!");
    setTimeout(() => {
      navigate("/admin");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-[#6C5CE7]/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ top: "10%", left: "10%" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Button
            variant="ghost"
            className="mb-4 text-gray-400 hover:text-white"
            onClick={() => navigate("/admin")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63] rounded-2xl flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-game font-bold bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
                CREATE QUIZ
              </h1>
              <p className="text-gray-400">Design your custom quiz game</p>
            </div>
          </div>
        </motion.div>

        {/* Quiz Settings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6 mb-6">
            <h2 className="font-game text-xl mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-[#00F5D4]" />
              Quiz Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <FileQuestion className="w-4 h-4 text-[#6C5CE7]" />
                  Quiz Title
                </Label>
                <Input
                  placeholder="Enter quiz title"
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  className="bg-[#1E293B] border-[#6C5CE7]/30 focus:border-[#6C5CE7]"
                />
              </div>

              <div>
                <Label className="mb-2">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#1E293B] border border-[#6C5CE7]/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6C5CE7]"
                >
                  <option value="" disabled>Select category</option>
                  <option value="general">General Knowledge</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="math">Mathematics</option>
                  <option value="tech">Technology</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div>
                <Label className="mb-2 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-[#FF2E63]" />
                  Time per Question (seconds)
                </Label>
                <select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(e.target.value)}
                  className="w-full bg-[#1E293B] border border-[#6C5CE7]/30 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6C5CE7]"
                >
                  <option value="10">10 seconds</option>
                  <option value="15">15 seconds</option>
                  <option value="20">20 seconds</option>
                  <option value="30">30 seconds</option>
                </select>
              </div>

              <div className="flex items-end">
                <div className="bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF2E63]/10 border border-[#6C5CE7]/30 rounded-xl p-4 w-full">
                  <div className="text-sm text-gray-400 mb-1">Total Questions</div>
                  <div className="text-3xl font-game font-bold text-[#00F5D4]">
                    {questions.length}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Questions */}
        <div className="space-y-6 mb-6">
          {questions.map((question, qIndex) => (
            <motion.div
              key={question.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + qIndex * 0.05 }}
            >
              <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-game text-lg flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63] rounded-lg flex items-center justify-center text-sm">
                      {qIndex + 1}
                    </div>
                    Question {qIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      onClick={() => removeQuestion(question.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="mb-2">Question Text</Label>
                    <Textarea
                      placeholder="Enter your question"
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, "question", e.target.value)
                      }
                      className="bg-[#1E293B] border-[#6C5CE7]/30 focus:border-[#6C5CE7] min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label className="mb-3">Answer Options</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="relative">
                          <Input
                            placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                            value={option}
                            onChange={(e) =>
                              updateOption(question.id, oIndex, e.target.value)
                            }
                            className={`bg-[#1E293B] border-[#6C5CE7]/30 focus:border-[#6C5CE7] pr-10 ${
                              question.correctAnswer === oIndex
                                ? "border-[#22C55E] ring-1 ring-[#22C55E]/20"
                                : ""
                            }`}
                          />
                          <button
                            onClick={() =>
                              updateQuestion(question.id, "correctAnswer", oIndex)
                            }
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                              question.correctAnswer === oIndex
                                ? "text-[#22C55E]"
                                : "text-gray-600 hover:text-gray-400"
                            }`}
                          >
                            <CheckCircle
                              className={`w-5 h-5 ${
                                question.correctAnswer === oIndex ? "fill-current" : ""
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Click the checkmark to set the correct answer
                    </p>
                  </div>

                  <div>
                    <Label className="mb-2">Points</Label>
                    <Input
                      type="number"
                      value={question.points}
                      onChange={(e) =>
                        updateQuestion(question.id, "points", parseInt(e.target.value))
                      }
                      className="bg-[#1E293B] border-[#6C5CE7]/30 focus:border-[#6C5CE7] max-w-[200px]"
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Add Question Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="w-full border-dashed border-2 border-[#6C5CE7]/30 hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/10 h-16 text-lg"
            onClick={addQuestion}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Question
          </Button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            className="flex-1 bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] font-game text-lg"
            onClick={handleSave}
          >
            <Save className="w-5 h-5 mr-2" />
            Save Quiz
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[#6C5CE7]/30 hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/10"
            onClick={() => navigate("/admin")}
          >
            Cancel
          </Button>
        </motion.div>
      </div>
    </div>
  );
}