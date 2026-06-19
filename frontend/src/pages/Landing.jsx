import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Trophy, Zap, Star, Users, Target, Sparkles, Play, Code } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
 
export default function Landing() {
  const navigate = useNavigate();
 
  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "Real-time Quiz", desc: "Live competitive gameplay" },
    { icon: <Trophy className="w-6 h-6" />, title: "Leaderboards", desc: "Track your rankings" },
    { icon: <Star className="w-6 h-6" />, title: "XP System", desc: "Earn rewards & badges" },
    { icon: <Users className="w-6 h-6" />, title: "Multiplayer", desc: "Challenge friends" },
  ];
 
  const topPlayers = [
    { rank: 1, name: "Alex_Pro", score: 9850, xp: 2500, avatar: "🥇" },
    { rank: 2, name: "QuizMaster", score: 9420, xp: 2300, avatar: "🥈" },
    { rank: 3, name: "BrainStorm", score: 9100, xp: 2100, avatar: "🥉" },
    { rank: 4, name: "FastThinker", score: 8900, xp: 2000, avatar: "⚡" },
    { rank: 5, name: "WiseOwl", score: 8700, xp: 1900, avatar: "🦉" },
  ];
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Trophy className="w-16 h-16 text-[#F59E0B]" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-6xl opacity-20"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Star className="w-16 h-16 text-[#00F5D4]" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32 text-6xl opacity-20"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <Zap className="w-16 h-16 text-[#FF2E63]" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-40 text-6xl opacity-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16 text-[#6C5CE7]" />
        </motion.div>
      </div>
 
 
 
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="px-4 py-2 bg-gradient-to-r from-[#6C5CE7]/20 to-[#FF2E63]/20 border border-[#6C5CE7]/30 rounded-full text-sm font-game">
              🎮 THE ULTIMATE QUIZ EXPERIENCE
            </span>
          </motion.div>
 
          <h1 className="text-5xl lg:text-7xl font-game font-bold mb-6 bg-gradient-to-r from-[#6C5CE7] via-[#00F5D4] to-[#FF2E63] bg-clip-text text-transparent leading-tight">
            PLAY. COMPETE. WIN.
          </h1>
 
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Challenge yourself and compete with players worldwide in the most exciting quiz game platform
          </p>
 
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all text-lg px-8 py-6 font-game"
                onClick={() => navigate("/Questions")}
              >
                <Play className="w-5 h-5 mr-2" />
                START GAME
              </Button>
            </motion.div>
 
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#00F5D4] text-[#00F5D4] hover:bg-[#00F5D4]/10 hover:shadow-[0_0_30px_rgba(0,245,212,0.3)] transition-all text-lg px-8 py-6 font-game"
                onClick={() => navigate("/JoinQuiz")}
              >
                <Code className="w-5 h-5 mr-2" />
                JOIN WITH CODE
              </Button>
            </motion.div>
          </div>
 
          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Active Players", value: "10K+", color: "#6C5CE7" },
              { label: "Total Quizzes", value: "500+", color: "#00F5D4" },
              { label: "XP Earned", value: "1M+", color: "#FF2E63" },
              { label: "Countries", value: "50+", color: "#22C55E" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-[#111827] border border-white/10 rounded-xl p-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="text-2xl font-bold font-game" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
        {/* Features Section */}
        <motion.div
          className="mt-20 max-w-6xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-game font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
              GAME FEATURES
            </span>
          </h2>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <Card className="bg-[#111827] border-[#6C5CE7]/20 hover:border-[#6C5CE7] transition-all p-6 hover:shadow-[0_0_30px_rgba(108,92,231,0.2)]">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6C5CE7] to-[#FF2E63] rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-game text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
        {/* Leaderboard Preview */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl lg:text-4xl font-game font-bold">
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#FF2E63] bg-clip-text text-transparent">
                TOP PLAYERS
              </span>
            </h2>
            <Button
              variant="ghost"
              className="text-[#00F5D4] hover:text-[#00F5D4] hover:bg-[#00F5D4]/10"
              onClick={() => navigate("/LeaderBoard")}
            >
              View All
            </Button>
          </div>
 
          <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
            <div className="space-y-3">
              {topPlayers.map((player, i) => (
                <motion.div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    i < 3
                      ? "bg-gradient-to-r from-[#6C5CE7]/10 to-[#FF2E63]/10 border border-[#6C5CE7]/30"
                      : "bg-[#1E293B]/50"
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <div className="text-2xl font-game font-bold text-[#6C5CE7] w-8">
                    #{player.rank}
                  </div>
                  <div className="text-3xl">{player.avatar}</div>
                  <div className="flex-1">
                    <div className="font-semibold">{player.name}</div>
                    <div className="text-sm text-gray-400">{player.xp} XP</div>
                  </div>
                  <div className="text-right">
                    <div className="font-game font-bold text-[#00F5D4]">
                      {player.score.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">points</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
 