# Ranked - Competitive DSA Platform

[![Lice## 📚 Learning Resources

Curated study materials to help you improve:

- **📝 Handpicked Blog Posts**: Expert insights and tutorials
- **🎥 Trusted YouTube Videos**: Visual learning content
- **📊 DSA Sheets and Roadmaps**: Structured learning paths
- **🔍 Problem Analysis**: Detailed explanations of battle problems

Turn your losses into learning opportunities with targeted resources for weak areas identified during matches.

## 🏆 Leaderboard and Rankings

- **Global Leaderboard**: See how you rank worldwide
- **Rating Progression**: Track your improvement over time
- **Battle Statistics**: Win/loss ratios, favorite topics, and more
- **Achievement System**: Unlock badges and milestones

## ✨ What Makes Us Different

| Traditional Platforms | Ranked |
|----------------------|--------|
| Solve problems in isolation | Real-time 1v1 battles |
| Weekly contests | Instant matchmaking anytime |
| Static difficulty | Adaptive difficulty system |
| Individual progress | Head-to-head competition |

We're turning DSA preparation into a competitive sport with real-time battles, adaptive matchmaking, and a dynamic difficulty system that evolves with your skills.//img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.0+-blue)](https://reactjs.org/)

A competitive programming platform that brings the excitement of 1v1 battles to Data Structures and Algorithms, similar to what platforms like Chess.com have done for chess.

## 🚀 Features

### Core Functionality
- **1v1 DSA Battles**: Real-time competitive programming matches
- **ELO Rating System**: Fair matchmaking based on skill level using Glicko rating system
- **Progressive Difficulty**: Problems adapt to your rating level
- **Real-time Code Execution**: Powered by Judge0 API
- **Live Leaderboards**: Global rankings and statistics

### User Experience
- **Smart Matchmaking**: Redis-powered real-time player matching
- **Learning Resources**: Curated study materials and roadmaps
- **Performance Analytics**: Track your progress and improvement
- **Battle History**: Review past matches and solutions

## 🎯 How It Works

Users engage in 1v1 DSA battles where each match consists of problems tailored to the players' current rating levels. The outcome affects their ELO-based rating:

- **Win**: Rating increases ⬆️
- **Loss**: Rating decreases ⬇️

This ensures players are always matched with opponents of similar skill levels, making competitions fair, engaging, and growth-oriented.

## 📈 Progressive Difficulty System

The difficulty of problems evolves dynamically with your rating to ensure continuous learning:

| Rating Range | Topics | Examples |
|--------------|--------|----------|
| **Beginner (800-1200)** | Arrays, Strings, Basic Patterns | Two Sum, Palindrome Check, String Reversal |
| **Intermediate (1200-1600)** | Recursion, Searching, Sorting, Sliding Window | Binary Search, Merge Sort, Maximum Subarray |
| **Advanced (1600+)** | Trees, Graphs, Dynamic Programming | LCA, Dijkstra's Algorithm, Knapsack Problem |

This system gamifies the learning process, giving users clear goals and visible progress.

## Learning Resources
We’ll include a curated resources section featuring:

Handpicked blog posts

Trusted YouTube videos

DSA sheets and roadmaps

This helps users strengthen weak areas identified during matches, turning losses into learning opportunities.

## Leaderboard and Rankings
Like Chess.com, we’ll have a global leaderboard to fuel competitiveness and motivation. Users can track their improvement and see how they stack up against others worldwide.

## Why This Is Different
Most platforms focus on solving problems in isolation or participating in weekly contests. We're introducing real-time head-to-head battles, adaptive matchmaking, and a dynamic difficulty system that evolves with your skills. The format is both competitive and educational, turning DSA prep into a sport.

## 🛠️ Tech Stack

### Frontend
- **React.js 18+** - Modern UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful and accessible components
- **Axios** - HTTP client for API requests

### Backend
- **Node.js & Express.js** - Server framework
- **Socket.io** - Real-time WebSocket communication
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Primary database
- **Redis** - Caching and real-time matchmaking
- **JWT** - Authentication and authorization

### External Services
- **Judge0 API** - Code execution and testing
- **Docker** - Containerization for development

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vercel** - Frontend deployment

## 📁 Project Structure

```
Ranked/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── ...
│   └── package.json
├── server/                # Backend Express application
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Custom middleware
│   ├── prisma/           # Database schema and migrations
│   ├── problems/         # DSA problems and test cases
│   ├── routes/           # API route definitions
│   ├── helpers/          # Utility functions
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **Docker & Docker Compose**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ranked
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client && npm install
   
   # Install server dependencies
   cd ../server && npm install
   ```

3. **Set up environment variables**
   ```bash
   # Navigate to server directory
   cd server
   
   # Copy the environment template (if available)
   cp .env.example .env
   ```
   
   Edit `server/.env` with your configuration. Required variables include:
   - `DATABASE_URL` - PostgreSQL connection string
   - `PATH_TO_PROBLEMS` - Full path to problems directory
   - `JUDGE0_API_URL` - Judge0 API endpoint
   - `JUDGE0_API_KEY` - Your Judge0 API key
   - `CALLBACK_URL` - Callback URL for Judge0
   - `JWT_SECRET` - Secure JWT secret key
   - `REDIS_HOST` - Redis host (localhost for local development)
   - `REDIS_PORT` - Redis port (6379 by default)

4. **Start the database services**
   ```bash
   # Make sure you're in the server directory
   cd server
   docker-compose -f docker-compose.pg.yaml up
   ```

5. **Set up Prisma Studio** (New Terminal)
   ```bash
   cd server
   npx prisma studio
   ```

6. **Start the backend server** (New Terminal)
   ```bash
   cd server
   npm run start-dev
   ```

7. **Start the frontend** (New Terminal)
   ```bash
   cd client
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Prisma Studio: http://localhost:5555

## 🔧 Development

### Development Workflow

1. **Start Docker services** (Terminal 1):
   ```bash
   cd server
   docker-compose -f docker-compose.pg.yaml up
   ```

2. **Launch Prisma Studio** (Terminal 2):
   ```bash
   cd server
   npx prisma studio
   ```

3. **Start backend** (Terminal 3):
   ```bash
   cd server
   npm run start-dev
   ```

4. **Start frontend** (Terminal 4):
   ```bash
   cd client
   npm run dev
   ```

### Available Scripts

#### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Server
- `npm run start-dev` - Start development server
- `npm start` - Start production server
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed the database

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# View database in browser (runs on http://localhost:5555)
npx prisma studio
```

### Docker Commands

```bash
# Start database services
docker-compose -f docker-compose.pg.yaml up

# Start services in background
docker-compose -f docker-compose.pg.yaml up -d

# Stop services
docker-compose -f docker-compose.pg.yaml down

# View running containers
docker-compose -f docker-compose.pg.yaml ps
```

## 📡 API Documentation

### Authentication
```http
POST /auth/register
POST /auth/login
POST /auth/logout
```

### User Management
```http
GET /api/users/profile
PUT /api/users/profile
GET /api/users/stats
```

### Matchmaking
```http
POST /api/matchmaking/join-queue
DELETE /api/matchmaking/leave-queue
GET /api/matchmaking/status
```

### Battles
```http
GET /api/battles/history
GET /api/battles/:id
POST /api/battles/:id/submit
```

### Leaderboard
```http
GET /api/leaderboard
GET /api/leaderboard/user/:id
```

## 🧪 Testing

```bash
# Run server tests
cd server
npm test

# Run client tests
cd client
npm test
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`

### Backend
1. Set up your production database
2. Configure environment variables
3. Deploy using your preferred platform (Railway, Heroku, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🎯 Roadmap

- [ ] Mobile application
- [ ] Tournament system
- [ ] Team battles
- [ ] AI-powered problem recommendations
- [ ] Integration with popular coding platforms
- [ ] Advanced analytics dashboard

---

**Happy Coding! 🚀**

