import React, { useState } from "react"
import { useAuth } from "../lib/useAuth"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Users, Target, Crown, TrendingUp, User } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { showSuccess, showError } from "../components/ui/sonner"
import axios from "../lib/axios"

export default function LandingPage() {
  const { user } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)

  React.useEffect(() => {
    // No routing from landing page
  }, []);

  // Handlers for login/signup
  const handleLoginChange = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  const handleSignupChange = (e) => setSignupForm({ ...signupForm, [e.target.name]: e.target.value })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`/users/login`, {
        email: loginForm.email,
        password: loginForm.password,
      }, { withCredentials: true })
      if (response.data.success) {
        showSuccess("Logged in successfully")
        setLoginForm({ email: "", password: "" })
        // Store user in localStorage for persistence
        localStorage.setItem('ranked_user', JSON.stringify(response.data.user))
        setTimeout(() => {
          setLoading(false)
          // Removed navigation
        }, 1000)
      }
      else {
        showError(response.data.message || "Login failed")
        setLoading(false)
      }
    } catch (error) {
      console.error("Login error:", error)
      showError("An error occurred while logging in. Please try again.")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (signupForm.password !== signupForm.confirmPassword) {
      showError("Passwords do not match")
      setLoading(false)
      return
    }
    try {
      const response = await axios.post(`/users/signup`, {
        username: signupForm.username,
        email: signupForm.email,
        password: signupForm.password,
      })
      if (response.data.success) {
        showSuccess("Account created successfully! Please log in.")
        setSignupOpen(false)
        setSignupForm({ username: "", email: "", password: "", confirmPassword: "" })
      }
      else {
        showError(response.data.message || "Signup failed")
      }
    } catch (err) {
      showError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // CountUp hook for animated numbers
  function useCountUp({ end, duration = 1.2 }) {
    const [count, setCount] = React.useState(0)
    React.useEffect(() => {
      let raf, start;
      const totalFrames = Math.round(duration * 60)
      let frame = 0;
      function animate(ts) {
        if (!start) start = ts
        frame = Math.min(totalFrames, Math.round(((ts - start) / 1000) * 60))
        const progress = Math.min(frame / totalFrames, 1)
        setCount(Math.floor(progress * end))
        if (frame < totalFrames) {
          raf = requestAnimationFrame(animate)
        } else {
          setCount(end)
        }
      }
      raf = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(raf)
    }, [end, duration])
    return count
  }

  // Animated stats values (all start together)
  const activeBattlers = useCountUp({ end: 10000, duration: 1.2 })
  const battlesFought = useCountUp({ end: 50000, duration: 1.2 })

  // Animated '24' and '7' with random numbers for matching speed
  function useAnimatedNumber(finalValue, duration = 1.2, min = 1, max = 30) {
    const [value, setValue] = React.useState(0)
    React.useEffect(() => {
      let raf, start
      const totalFrames = Math.round(duration * 60)
      let frame = 0
      function animate(ts) {
        if (!start) start = ts
        frame = Math.min(totalFrames, Math.round(((ts - start) / 1000) * 60))
        if (frame < totalFrames) {
          setValue(Math.floor(Math.random() * (max - min + 1)) + min)
          raf = requestAnimationFrame(animate)
        } else {
          setValue(finalValue)
        }
      }
      raf = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(raf)
    }, [finalValue, duration, min, max])
    return value
  }
  const liveMatches = useAnimatedNumber(24, 1.2, 10, 30)
  const liveDays = useAnimatedNumber(7, 1.2, 1, 9)

  return (
    <div className="min-h-screen bg-[#101010] text-white font-sans" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#101010]/95 backdrop-blur supports-[backdrop-filter]:bg-[#101010]/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
              Ranked
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              className="text-lg font-medium text-gray-300 hover:text-white hover:bg-gray-800 tracking-tight"
              onClick={() => setLoginOpen(true)}
              style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 text-lg font-semibold px-6 py-2 tracking-tight shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300"
              onClick={() => setSignupOpen(true)}
              style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 hover:bg-fuchsia-500/20 p-4 text-2xl font-semibold tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>
            Live 1v1 Battles
          </Badge>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif', letterSpacing: '-0.02em' }}>
            Compete. Win. Get{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
              Ranked
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>
            Face off against developers worldwide in real-time DSA challenges. Climb the ranks, prove your skills, and
            become the ultimate coding champion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 text-2xl px-10 py-6 h-auto font-bold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300 tracking-tight"
              style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}
            >
              Enter Battle Arena
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-fuchsia-400 mb-2 tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>
                {activeBattlers.toLocaleString()}+
              </div>
              <div className="text-lg text-gray-400 font-medium tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>Active Battlers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2 tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>
                {battlesFought.toLocaleString()}+
              </div>
              <div className="text-lg text-gray-400 font-medium tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>Battles Fought</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-fuchsia-400 mb-2 tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>
                {liveMatches}/{liveDays}
              </div>
              <div className="text-lg text-gray-400 font-medium tracking-tight" style={{ fontFamily: 'Mori, Inter, ui-sans-serif, system-ui, sans-serif' }}>Live Matches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                Ranked?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The ultimate platform for competitive programming and skill development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-fuchsia-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real-time Battles</h3>
                <p className="text-gray-400">
                  Face opponents in live 1v1 coding challenges with instant feedback and results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Rating System</h3>
                <p className="text-gray-400">
                  Climb the leaderboards with our ELO-based rating system and track your progress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-fuchsia-500/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Community</h3>
                <p className="text-gray-400">Connect with developers worldwide and learn from the best in the field.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Real-time{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
                Leaderboard
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">See who's dominating the arena right now</p>
          </div>

          <div className="text-center m-6">
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              Live Updates
            </Badge>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* --- UNIFY LEADERBOARD CARD COLORS --- */}
            <Card className="bg-[#181022] border-fuchsia-700 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-fuchsia-600/10 to-purple-600/10 border-b border-fuchsia-700 p-4">
                  <div className="flex items-center justify-between text-sm font-medium text-gray-300">
                    <span>Rank</span>
                    <span>Player</span>
                    <span>Rating</span>
                  </div>
                </div>

                <div className="divide-y divide-fuchsia-900/30">
                  {[
                    { rank: 1, username: "CodeMaster_X", rating: 2847, isTop: true },
                    { rank: 2, username: "AlgoNinja", rating: 2756, isTop: true },
                    { rank: 3, username: "ByteWarrior", rating: 2689, isTop: true },
                    { rank: 4, username: "DataStructGod", rating: 2634, isTop: false },
                    { rank: 5, username: "RecursiveQueen", rating: 2598, isTop: false },
                  ].map((player) => (
                    <div
                      key={player.rank}
                      className={`flex items-center justify-between p-4 transition-colors ${
                        player.isTop ? "bg-gradient-to-r from-fuchsia-600/5 to-purple-600/5" : "hover:bg-fuchsia-900/10"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            player.rank === 1
                              ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                              : player.rank === 2
                                ? "bg-gradient-to-r from-gray-400 to-gray-500 text-black"
                                : player.rank === 3
                                  ? "bg-gradient-to-r from-amber-600 to-amber-700 text-white"
                                  : "bg-[#232136] text-gray-300 border border-fuchsia-900/30"
                          }`}
                        >
                          {player.rank}
                        </div>
                      </div>

                      {/* Align avatar and name to the center under Player heading */}
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-white text-center truncate">{player.username}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`font-bold text-lg ${player.isTop ? "text-fuchsia-400" : "text-gray-300"}`}>
                          {player.rating.toLocaleString()}
                        </span>
                        {player.rank <= 3 && (
                          <Crown
                            className={`w-4 h-4 ${
                              player.rank === 1
                                ? "text-yellow-400"
                                : player.rank === 2
                                  ? "text-gray-400"
                                  : "text-amber-600"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-[#232136] border-t border-fuchsia-900/30 p-4 text-center">
                  <Button variant="ghost" className="text-fuchsia-400 hover:text-fuchsia-300 hover:bg-fuchsia-500/10">
                    View Full Leaderboard
                    <TrendingUp className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-fuchsia-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="w-16 h-16 text-fuchsia-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Prove Your Worth?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Do you have what it takes to rise through the ranks and become a coding champion?
            </p>
            <Button
              size="lg"
              className=" bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white border-0 text-lg md:text-2xl px-12 py-6 h-auto font-semibold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all duration-300"
            >
              Start Your Battle Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-md mx-auto bg-[#161622] p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Login to Your Account
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter your credentials to access your dashboard
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="bg-[#101010] border border-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent rounded-lg py-3 px-4 text-white placeholder-gray-500"
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="bg-[#101010] border border-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent rounded-lg py-3 px-4 text-white placeholder-gray-500"
                required
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                      />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="text-fuchsia-400 hover:text-fuchsia-300"
                onClick={() => {
                  setLoginOpen(false)
                  setSignupOpen(true)
                }}
              >
                Sign up here
              </Button>
            </span>
          </div>

          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-md mx-auto bg-[#161622] p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Create a New Account
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details below to sign up
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={signupForm.username}
                onChange={handleSignupChange}
                className="bg-[#101010] border border-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent rounded-lg py-3 px-4 text-white placeholder-gray-500"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={signupForm.email}
                onChange={handleSignupChange}
                className="bg-[#101010] border border-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent rounded-lg py-3 px-4 text-white placeholder-gray-500"
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={signupForm.password}
                onChange={handleSignupChange}
                className="bg-[#101010] border border-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent rounded-lg py-3 px-4 text-white placeholder-gray-500"
                required
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={signupForm.confirmPassword}
                onChange={handleSignupChange}
                className="bg-[#101010] border border-gray-700 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent rounded-lg py-3 px-4 text-white placeholder-gray-500"
                required
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-700 hover:to-purple-700 text-white rounded-lg py-3 px-4 font-semibold transition-all duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                      />
                    </svg>
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-fuchsia-400 hover:text-fuchsia-300"
                onClick={() => {
                  setSignupOpen(false)
                  setLoginOpen(true)
                }}
              >
                Login here
              </Button>
            </span>
          </div>

          <DialogClose asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}

