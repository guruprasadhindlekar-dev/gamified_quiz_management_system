import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Edit2, Trophy, Zap, Star, Target, TrendingUp, Calendar,
  Award, Flame, BarChart3, Clock, Mail, Shield, Camera, Check,
  Crown, Medal, Sparkles, ArrowLeft, Save, X, Lock, Eye, EyeOff, Upload, Trash2
} from "lucide-react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("QuizPlayer123");
  const [userEmail, setUserEmail] = useState("player@quiz.com");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  // Form states
  const [editedName, setEditedName] = useState(userName);
  const [editedEmail, setEditedEmail] = useState(userEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check authentication and get user info
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/");
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== "user") {
      navigate("/admin");
      return;
    }

    setUserName(user.username || user.email);
    setUserEmail(user.email);
    setEditedName(user.username || user.email);
    setEditedEmail(user.email);

    // Load profile photo if exists
    if (user.profilePhoto) {
      setProfilePhoto(user.profilePhoto);
    }
  }, [navigate]);

  // Avatar options
  const avatarColors = [
    { from: "#6C5CE7", to: "#FF2E63" },
    { from: "#00F5D4", to: "#6C5CE7" },
    { from: "#F59E0B", to: "#FF2E63" },
    { from: "#22C55E", to: "#00F5D4" },
    { from: "#FF2E63", to: "#F59E0B" },
    { from: "#6C5CE7", to: "#00F5D4" },
  ];

  // User stats
  const userStats = {
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    totalQuizzes: 48,
    winRate: 67,
    currentStreak: 7,
    bestStreak: 12,
    rank: 245,
    totalPoints: 12450,
    accuracy: 82,
    avgTime: "45s",
    joinDate: "Jan 2025",
  };

  // Badges and achievements
  const badges = [
    { id: 1, name: "Speed Demon", icon: "⚡", color: "#00F5D4", description: "Complete 10 quizzes in under 30s", progress: 100, unlocked: true },
    { id: 2, name: "Quiz Master", icon: "🏆", color: "#F59E0B", description: "Win 50 quizzes", progress: 96, unlocked: true },
    { id: 3, name: "Perfect Score", icon: "💯", color: "#FF2E63", description: "Get 100% on any quiz", progress: 100, unlocked: true },
    { id: 4, name: "Week Warrior", icon: "🔥", color: "#6C5CE7", description: "Maintain 7-day streak", progress: 100, unlocked: true },
    { id: 5, name: "Century Club", icon: "💰", color: "#22C55E", description: "Play 100 quizzes", progress: 48, unlocked: false },
    { id: 6, name: "Unstoppable", icon: "🚀", color: "#00F5D4", description: "Win 10 quizzes in a row", progress: 60, unlocked: false },
  ];

  // Stats breakdown
  const statsBreakdown = [
    { label: "Total Quizzes", value: userStats.totalQuizzes, icon: Target, color: "#00F5D4" },
    { label: "Total Points", value: userStats.totalPoints.toLocaleString(), icon: Star, color: "#F59E0B" },
    { label: "Win Rate", value: `${userStats.winRate}%`, icon: TrendingUp, color: "#22C55E" },
    { label: "Accuracy", value: `${userStats.accuracy}%`, icon: Award, color: "#6C5CE7" },
    { label: "Best Streak", value: userStats.bestStreak, icon: Flame, color: "#FF2E63" },
    { label: "Avg Time", value: userStats.avgTime, icon: Clock, color: "#00F5D4" },
  ];

  const handleSaveProfile = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    currentUser.username = editedName;
    currentUser.email = editedEmail;
    if (profilePhoto) {
      currentUser.profilePhoto = profilePhoto;
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    setUserName(editedName);
    setUserEmail(editedEmail);
    setIsEditingProfile(false);
  };

  const handleCancelProfile = () => {
    setEditedName(userName);
    setEditedEmail(userEmail);
    setIsEditingProfile(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  const handleUploadPhoto = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.div
          className="absolute top-20 left-20"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Trophy className="w-32 h-32 text-[#F59E0B]" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-28 h-28 text-[#6C5CE7]" />
        </motion.div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-[#111827]/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/user-dashboard")}
                className="hover:bg-white/10"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="font-game text-2xl bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
              MY PROFILE
            </h1>
            <div className="w-32" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
                <div className="text-center">
                  {/* Avatar Selection */}
                  <div className="relative inline-block mb-4">
                    {profilePhoto ? (
                      <div className="relative">
                        <img
                          src={profilePhoto}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-[#6C5CE7]"
                        />
                        <button
                          onClick={handleRemovePhoto}
                          className="absolute top-0 right-0 bg-[#FF2E63] hover:bg-[#E01B4F] rounded-full p-2 transition-colors"
                          title="Remove photo"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div
                        className="w-32 h-32 rounded-full flex items-center justify-center mx-auto"
                        style={{
                          background: `linear-gradient(to bottom right, ${avatarColors[selectedAvatar].from}, ${avatarColors[selectedAvatar].to})`
                        }}
                      >
                        <User className="w-16 h-16 text-white" />
                      </div>
                    )}

                    {/* Upload/Change Photo Button */}
                    <label
                      htmlFor="photo-upload"
                      className="absolute bottom-0 right-0 bg-[#6C5CE7] hover:bg-[#5B4BD6] rounded-full p-2 transition-colors cursor-pointer"
                      title={profilePhoto ? "Change photo" : "Upload photo"}
                    >
                      <input
                        id="photo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleUploadPhoto}
                        className="hidden"
                      />
                      <Camera className="w-4 h-4 text-white" />
                    </label>
                  </div>

                  {/* Avatar Color Options - Only show if no photo uploaded */}
                  {!profilePhoto && (
                    <>
                      <div className="flex gap-2 justify-center mb-4">
                        {avatarColors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedAvatar(index)}
                            className={`w-6 h-6 rounded-full transition-all ${
                              selectedAvatar === index ? "ring-2 ring-white scale-110" : "opacity-50 hover:opacity-100"
                            }`}
                            style={{
                              background: `linear-gradient(to bottom right, ${color.from}, ${color.to})`
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-4">
                        Select avatar color or upload your photo
                      </p>
                    </>
                  )}

                  {/* Upload Photo Button (Alternative) */}
                  {!profilePhoto && (
                    <label
                      htmlFor="photo-upload-alt"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#6C5CE7]/20 hover:bg-[#6C5CE7]/30 border border-[#6C5CE7]/30 hover:border-[#6C5CE7] rounded-lg transition-all cursor-pointer mb-4"
                    >
                      <input
                        id="photo-upload-alt"
                        type="file"
                        accept="image/*"
                        onChange={handleUploadPhoto}
                        className="hidden"
                      />
                      <Upload className="w-4 h-4 text-[#00F5D4]" />
                      <span className="text-sm text-gray-300">Upload Photo</span>
                    </label>
                  )}

                  {/* Level Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6C5CE7] to-[#FF2E63] px-4 py-2 rounded-full mb-4">
                    <Crown className="w-4 h-4 text-white" />
                    <span className="font-game text-white">Level {userStats.level}</span>
                  </div>

                  <h3 className="font-game text-2xl font-bold mb-1">{userName}</h3>
                  <p className="text-sm text-gray-400 mb-2">{userEmail}</p>
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {userStats.joinDate}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-white/10">
                    <div>
                      <p className="text-2xl font-game font-bold text-[#F59E0B]">#{userStats.rank}</p>
                      <p className="text-xs text-gray-400">Global Rank</p>
                    </div>
                    <div>
                      <p className="text-2xl font-game font-bold text-[#6C5CE7]">{badges.filter(b => b.unlocked).length}/{badges.length}</p>
                      <p className="text-xs text-gray-400">Badges</p>
                    </div>
                  </div>

                  {/* XP Progress */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-[#00F5D4]" />
                        {userStats.xp} XP
                      </span>
                      <span>Next Level: {userStats.xpToNextLevel} XP</span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4]"
                        initial={{ width: 0 }}
                        animate={{ width: `${(userStats.xp / userStats.xpToNextLevel) * 100}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-center">
                      {userStats.xpToNextLevel - userStats.xp} XP to Level {userStats.level + 1}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
                <h3 className="font-game font-bold mb-4 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
                  QUICK STATS
                </h3>
                <div className="space-y-3">
                  {statsBreakdown.slice(0, 3).map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${stat.color}20` }}
                        >
                          <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                        </div>
                        <span className="text-sm text-gray-400">{stat.label}</span>
                      </div>
                      <span className="font-game font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Middle Column - Stats & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detailed Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
                <h2 className="text-2xl font-game font-bold mb-6 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
                  PERFORMANCE STATS
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {statsBreakdown.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="bg-[#1E293B]/50 rounded-xl p-4 hover:bg-[#1E293B] transition-all"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <p className="text-2xl font-game font-bold mb-1" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements & Badges */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-game font-bold bg-gradient-to-r from-[#F59E0B] to-[#FF2E63] bg-clip-text text-transparent">
                    ACHIEVEMENTS
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>{badges.filter(b => b.unlocked).length} / {badges.length} Unlocked</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {badges.map((badge, index) => (
                    <motion.div
                      key={badge.id}
                      className={`bg-[#1E293B]/50 rounded-xl p-4 transition-all ${
                        badge.unlocked ? "border border-white/10" : "opacity-60"
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: badge.unlocked ? 1 : 0.6 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: badge.unlocked ? 1.02 : 1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            badge.unlocked ? "" : "grayscale"
                          }`}
                          style={{
                            backgroundColor: `${badge.color}20`,
                            filter: badge.unlocked ? `drop-shadow(0 0 8px ${badge.color})` : "none"
                          }}
                        >
                          <span className="text-2xl">{badge.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{badge.name}</h4>
                            {badge.unlocked && (
                              <div className="bg-[#22C55E]/20 rounded-full p-1">
                                <Check className="w-3 h-3 text-[#22C55E]" />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mb-2">{badge.description}</p>

                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Progress</span>
                              <span style={{ color: badge.color }}>{badge.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full"
                                style={{ backgroundColor: badge.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${badge.progress}%` }}
                                transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Account Settings */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="bg-[#111827] border-[#6C5CE7]/20 p-6">
                <h2 className="text-2xl font-game font-bold mb-6 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4] bg-clip-text text-transparent">
                  ACCOUNT SETTINGS
                </h2>

                {/* Profile Information */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-[#6C5CE7]" />
                      Profile Information
                    </h3>
                    {!isEditingProfile && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingProfile(true)}
                        className="border-[#6C5CE7]/30 hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/10"
                      >
                        <Edit2 className="w-3 h-3 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {isEditingProfile ? (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Username</label>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="w-full bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 focus:border-[#6C5CE7] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Email</label>
                          <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            className="w-full bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 focus:border-[#6C5CE7] focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={handleSaveProfile}
                            className="flex-1 bg-gradient-to-r from-[#6C5CE7] to-[#00F5D4]"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={handleCancelProfile}
                            variant="outline"
                            className="border-[#FF2E63]/30 hover:border-[#FF2E63] hover:bg-[#FF2E63]/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="viewing"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[#1E293B]/50 rounded-lg p-4 space-y-2"
                      >
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Username:</span>
                          <span className="font-semibold">{userName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Email:</span>
                          <span className="font-semibold">{userEmail}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Security Settings */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#FF2E63]" />
                      Security
                    </h3>
                    {!isEditingPassword && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingPassword(true)}
                        className="border-[#FF2E63]/30 hover:border-[#FF2E63] hover:bg-[#FF2E63]/10"
                      >
                        <Lock className="w-3 h-3 mr-2" />
                        Change Password
                      </Button>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {isEditingPassword ? (
                      <motion.div
                        key="changing-password"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                      >
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="w-full bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 pr-10 focus:border-[#FF2E63] focus:outline-none transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">New Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 focus:border-[#FF2E63] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-1 block">Confirm New Password</label>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-[#1E293B] border border-white/10 rounded-lg px-4 py-2 focus:border-[#FF2E63] focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={handleChangePassword}
                            className="flex-1 bg-gradient-to-r from-[#FF2E63] to-[#F59E0B]"
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            Update Password
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditingPassword(false);
                              setCurrentPassword("");
                              setNewPassword("");
                              setConfirmPassword("");
                            }}
                            variant="outline"
                            className="border-[#6C5CE7]/30 hover:border-[#6C5CE7] hover:bg-[#6C5CE7]/10"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="password-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[#1E293B]/50 rounded-lg p-4"
                      >
                        <div className="flex items-center gap-2 text-gray-400">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">Password: ••••••••</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}