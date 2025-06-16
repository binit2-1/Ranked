import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Trophy, Target, Zap, Crown, Sword, Shield, Star, TrendingUp, Award, Flame, ChevronRight } from "lucide-react"
import { useAuth } from "../lib/useAuth";
import Heatmap from "./Heatmap";

export const RevealBento = () => {
  const navigate = useNavigate()
  const { user, userStats } = useAuth();

  const matchesLost = Math.max(userStats.matchesPlayed - userStats.matchesWon, 0)
  const winRate =
    userStats.matchesPlayed > 0 ? ((userStats.matchesWon / userStats.matchesPlayed) * 100).toFixed(1) : "0.0"

  return (
    
    <div>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.1 }}
        className="mx-auto max-w-6xl relative z-10"
      >
        <ProfileHeader user={user} />
       
        <StatsGrid
          matchesPlayed={userStats.matchesPlayed}
          matchesWon={userStats.matchesWon}
          matchesLost={matchesLost}
          winRate={winRate}
        />
        <CompeteButton navigate={navigate} />
        <div className="mt-10">
          <Heatmap/>
        </div>
      </motion.div>
      
      <FloatingParticles />
  </div>
  )
}

const ProfileHeader = ({ user }) => {
  const getRankColor = (rank) => {
    if(rank == null || rank == undefined) return "from-gray-400 to-gray-600"
    if (rank <= 10) return "from-yellow-400 to-orange-500"
    if (rank <= 50) return "from-purple-400 to-pink-500"
    if (rank <= 100) return "from-blue-400 to-cyan-500"
    return "from-gray-400 to-gray-600"
  }

  const getEloColor = (elo) => {
    if (elo == null || elo == undefined) return "from-gray-400 to-gray-600"
    if (elo >= 2000) return "from-yellow-400 to-orange-500"
    if (elo >= 1500) return "from-purple-400 to-pink-500"
    if (elo >= 1000) return "from-blue-400 to-cyan-500"
    return "from-gray-400 to-gray-600"
  }

  const getRankIcon = (rank) => {
    if( rank == null || rank == undefined) return Target
    if (rank <= 10) return Crown
    if (rank <= 50) return Trophy
    if (rank <= 100) return Award
    return Target
  }
  console.log(user)
  const RankIcon = getRankIcon(user.rank)

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
      }}
      className="text-center mb-12"
    >
      <motion.div whileHover={{ scale: 1.05 }} className="relative inline-block mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-full p-8 border border-purple-500/30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-2 border-2 border-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30"
          ></motion.div>
          <RankIcon className="w-16 h-16 text-yellow-400 mx-auto" />
        </div>
      </motion.div>

      <motion.h1
        variants={{
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
        }}
        className="pb-4 text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4"
      >
        {user.username}
      </motion.h1>

      <div className="flex justify-center items-center gap-8 flex-wrap mt-5">
        <motion.div
          variants={{
            initial: { opacity: 0, x: -30 },
            animate: { opacity: 1, x: 0 },
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${getRankColor(user.rank)} text-black font-bold text-lg shadow-lg`}
        >
          <Crown className={`w-5 h-5`} />
          <span>Rank #{user.rank || "Unranked"}</span>
        </motion.div>

        <motion.div
          variants={{
            initial: { opacity: 0, x: 30 },
            animate: { opacity: 1, x: 0 },
          }}
          className={`${getEloColor(user.elo)} flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg`}
        >
          <Zap className="w-5 h-5" />
          <span>{user.elo !== null ? Math.round(user.elo) : "-"} Elo</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const StatsGrid = ({ matchesPlayed, matchesWon, matchesLost, winRate }) => {
  const stats = [
    {
      label: "Total Battles",
      value: matchesPlayed,
      icon: Sword,
      color: "from-slate-600 to-slate-700",
      accentColor: "text-slate-300",
      bgGlow: "shadow-slate-500/20",
    },
    {
      label: "Victories",
      value: matchesWon,
      icon: Trophy,
      color: "from-green-600 to-emerald-700",
      accentColor: "text-green-300",
      bgGlow: "shadow-green-500/20",
    },
    {
      label: "Defeats",
      value: matchesLost,
      icon: Shield,
      color: "from-red-600 to-rose-700",
      accentColor: "text-red-300",
      bgGlow: "shadow-red-500/20",
    },
    {
      label: "Win Rate",
      value: `${winRate}%`,
      icon: TrendingUp,
      color: "from-purple-600 to-violet-700",
      accentColor: "text-purple-300",
      bgGlow: "shadow-purple-500/20",
    },
  ]

  return (
    <motion.div
      variants={{
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </motion.div>
  )
}

const StatCard = ({ stat, index }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 50, rotateX: -15 },
        animate: { opacity: 1, y: 0, rotateX: 0 },
      }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-white/10 ${stat.bgGlow} shadow-2xl overflow-hidden group cursor-pointer`}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        animate={{
          x: isHovered ? "100%" : "-100%",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <stat.icon className={`w-8 h-8 ${stat.accentColor}`} />
          <motion.div animate={{ rotate: isHovered ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <Star className="w-5 h-5 text-yellow-400" />
          </motion.div>
        </div>

        <motion.div
          className="text-4xl font-bold text-white mb-2"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {stat.value}
        </motion.div>

        <div className={`text-sm font-medium ${stat.accentColor}`}>{stat.label}</div>
      </div>
    </motion.div>
  )
}

const CompeteButton = ({ navigate }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      }}
      className="flex justify-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => navigate("/battle")}
        className="relative group px-12 py-6 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 rounded-2xl font-bold text-2xl text-white shadow-2xl overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-500"
          animate={{
            scale: isHovered ? 1.1 : 1,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 group-hover:animate-pulse" />

        <div className="relative z-10 flex items-center gap-3">
          <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.5 }}>
            <Flame className="w-8 h-8" />
          </motion.div>
          <span>Enter Battle</span>
          <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.button>
    </motion.div>
  )
}

const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

