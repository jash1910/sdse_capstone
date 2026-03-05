# ♟ Modular Chess AI Engine 

## Overview

The **Modular Chess AI Engine** is a scalable chess platform designed with strong software architecture principles.
Rather than building a simple chess game, this project focuses on creating a **flexible AI framework** capable of supporting multiple chess strategies, tournament simulations, and extensible system modules.

The application allows:

* Human vs AI gameplay
* AI vs AI simulations
* Strategy comparison
* Tournament simulation
* ELO rating updates
* Game replay and logging

The system is designed using **clean architecture and SOLID principles**, ensuring modularity, scalability, and maintainability.

---

# 🚀 Key Features

### ♟ Chess Gameplay

* Interactive chess board
* Human vs AI gameplay
* Move validation using chess rules
* Turn-based game engine

### 🤖 AI Strategies

Multiple AI strategies can be plugged into the system:

* **Heuristic Strategy**
* **Minimax Strategy**
* **Alpha-Beta Pruning Strategy**

Strategies are injected dynamically into AI agents using the **Strategy Design Pattern**.

---

### 🏆 Tournament Simulation

The platform supports automated tournaments between AI agents.

Features include:

* AI vs AI matches
* Multiple rounds simulation
* Match statistics
* Ranking system
* Win / Loss / Draw tracking

---

### 📊 ELO Rating System

AI agents are ranked using a dynamic **ELO rating system**.

Ratings update automatically after tournament matches using the standard ELO formula.

---

### ⏱ Time Control

Different time policies can be applied to games:

* Blitz
* Classical
* Unlimited

Time policies are implemented as configurable modules.

---

### 📜 Logging & Replay

Every game is recorded using a logging system.

Features include:

* Move history tracking
* Game metadata storage
* Replay system to reconstruct board states

---

# 🏗 System Architecture

The project follows a **layered architecture** where each module has a single responsibility.

```
UI Layer
│
├── Game Engine Layer
│
├── Agent Layer
│
├── Strategy Layer
│
├── Game Rules Layer
│
├── Tournament & Rating Layer
│
├── Time Policy Layer
│
└── Logging & Replay Layer
```

Each layer communicates only through **well-defined abstractions**, ensuring loose coupling.

---

# 🧠 Design Principles Used

The project follows modern software engineering principles:

* **SOLID Principles**
* **Dependency Inversion Principle**
* **Open-Closed Principle**
* **Separation of Concerns**
* **Strategy Design Pattern**
* **Modular Layered Architecture**

These principles make the system easy to extend with new AI strategies and modules.

---

# 📂 Project Structure

```
src
│
├── core
│   ├── game
│   │   ├── Board.js
│   │   ├── Piece.js
│   │   ├── Move.js
│   │   ├── GameState.js
│   │   └── GameRules.js
│   │
│   ├── engine
│   │   └── GameEngine.js
│   │
│   ├── agents
│   │   ├── Agent.js
│   │   ├── HumanAgent.js
│   │   └── AIAgent.js
│   │
│   ├── strategies
│   │   ├── Strategy.js
│   │   ├── MinimaxStrategy.js
│   │   ├── AlphaBetaStrategy.js
│   │   └── HeuristicStrategy.js
│   │
│   ├── tournament
│   │   ├── TournamentManager.js
│   │   ├── RatingSystem.js
│   │   └── EloRatingSystem.js
│   │
│   ├── time
│   │   ├── TimePolicy.js
│   │   ├── BlitzPolicy.js
│   │   ├── ClassicalPolicy.js
│   │   └── UnlimitedPolicy.js
│   │
│   └── logging
│       ├── MoveLogger.js
│       └── ReplaySystem.js
│
├── ui
│   ├── components
│   │   ├── ChessBoard.jsx
│   │   ├── Square.jsx
│   │   ├── ControlPanel.jsx
│   │   ├── TournamentPanel.jsx
│   │   └── ReplayPanel.jsx
│   │
│   └── pages
│       ├── Home.jsx
│       ├── Play.jsx
│       ├── Tournament.jsx
│       ├── Replay.jsx
│       └── About.jsx
│
├── App.jsx
└── main.jsx
```

---

# ⚙️ Vercel link

https://modularchess.vercel.app/
---

# 🎯 Project Goals

This project demonstrates:

* Clean object-oriented system design
* AI strategy modularization
* Extensible architecture
* Simulation framework implementation
* Real-world software engineering practices

The goal is to build a **Chess AI Framework**, not just a chess game.

---

# 🔮 Future Enhancements

Possible future improvements include:

* Iterative deepening search
* Opening book support
* Parallel search optimization
* Neural network evaluation
* REST API integration
* Multiplayer support
* Full graphical chess animations

---



