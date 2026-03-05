import { GameEngine } from '../engine/GameEngine.js';
import { Color } from '../game/Piece.js';

export class TournamentManager {
    constructor(ratingSystem = null) {
        this.ratingSystem = ratingSystem;
        this.participants = new Map(); // Map of agent string ID -> { agent, rating, points, wins, losses, draws }
        this.matchHistory = [];
    }

    registerAgent(id, agent, initialRating = 1200) {
        if (this.participants.has(id)) {
            throw new Error(`Agent with ID ${id} is already registered.`);
        }

        this.participants.set(id, {
            id,
            agent,
            rating: initialRating,
            points: 0,
            wins: 0,
            losses: 0,
            draws: 0
        });
    }

    async runMatch(id1, id2) {
        const participant1 = this.participants.get(id1);
        const participant2 = this.participants.get(id2);

        if (!participant1 || !participant2) return;

        // Randomize colors, though id1 is White for this match execution for simplicity if not randomized
        // In a comprehensive system, you'd run match pairs shifting colors

        // Assign colors temporarily for the match
        participant1.agent.color = Color.WHITE;
        participant2.agent.color = Color.BLACK;

        const engine = new GameEngine(participant1.agent, participant2.agent);

        // Limits the game length to avoid infinite simulations during AI testing if no progression is made
        const MAX_MOVES = 200;
        let movesPlayed = 0;

        while (!engine.isGameOver && movesPlayed < MAX_MOVES) {
            await engine.playTurn();
            movesPlayed++;
        }

        let result = null;
        let outcome1 = 0.5; // Default draw

        if (!engine.isGameOver) {
            result = 'DRAW_MAX_MOVES';
        } else if (engine.winner === Color.WHITE) {
            result = 'WHITE_WINS';
            outcome1 = 1.0;
        } else if (engine.winner === Color.BLACK) {
            result = 'BLACK_WINS';
            outcome1 = 0.0;
        } else {
            result = 'DRAW'; // formal draw handled theoretically
        }

        this.processMatchResult(participant1, participant2, outcome1);

        this.matchHistory.push({
            white: id1,
            black: id2,
            movesPlayed,
            result,
            newRatingWhite: participant1.rating,
            newRatingBlack: participant2.rating
        });

        return result;
    }

    processMatchResult(p1, p2, outcome1) {
        // 1.0 means p1 won. 0.0 means p1 lost (p2 won). 0.5 means draw.

        // Update Stats
        if (outcome1 === 1.0) {
            p1.wins++; p1.points += 1;
            p2.losses++;
        } else if (outcome1 === 0.0) {
            p1.losses++;
            p2.wins++; p2.points += 1;
        } else {
            p1.draws++; p1.points += 0.5;
            p2.draws++; p2.points += 0.5;
        }

        // Update Ratings
        if (this.ratingSystem) {
            const { newRatingA, newRatingB } = this.ratingSystem.calculateNewRatings(
                p1.rating, p2.rating, outcome1
            );
            p1.rating = newRatingA;
            p2.rating = newRatingB;
        }
    }

    getLeaderboard() {
        return Array.from(this.participants.values())
            .map(p => ({
                id: p.id,
                rating: p.rating,
                points: p.points,
                record: `${p.wins}-${p.losses}-${p.draws}`
            }))
            .sort((a, b) => b.rating - a.rating || b.points - a.points);
    }
}
