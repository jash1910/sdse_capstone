import { GameState } from '../game/GameState.js';
import { GameRules } from '../game/GameRules.js';
import { Color } from '../game/Piece.js';

export class GameEngine {
    constructor(whiteAgent, blackAgent) {
        this.gameState = new GameState();

        // Assign agents for white and black
        this.agents = {
            [Color.WHITE]: whiteAgent,
            [Color.BLACK]: blackAgent
        };

        this.isGameOver = false;
        this.winner = null;
    }

    async playTurn() {
        if (this.isGameOver) return;

        const currentTurn = this.gameState.turn;
        const activeAgent = this.agents[currentTurn];

        // Request move from the agent using the new decideMove signature
        const move = await activeAgent.decideMove(this.gameState);

        // Call GameRules for validation
        if (!this.isValidMove(move)) {
            throw new Error(`Invalid move proposed by agent (${currentTurn})`);
        }

        // Apply move to GameState (GameState handles switching the turn player)
        this.gameState.makeMove(move);

        // Detect game end based on pseudo-legal moves for next player
        this.detectGameEnd();
    }

    isValidMove(move) {
        const pseudoLegalMoves = GameRules.getPseudoLegalMoves(
            this.gameState.board,
            move.fromRow,
            move.fromCol
        );

        // Ensure the proposed move matches a valid target square logic
        return pseudoLegalMoves.some(validMove =>
            validMove.toRow === move.toRow &&
            validMove.toCol === move.toCol
        );
    }

    detectGameEnd() {
        const nextTurn = this.gameState.turn;
        let hasAvailableMoves = false;

        // Check if next player has any pseudo-legal moves available
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = this.gameState.board.getPiece(r, c);
                if (piece && piece.color === nextTurn) {
                    const moves = GameRules.getPseudoLegalMoves(this.gameState.board, r, c);
                    if (moves.length > 0) {
                        hasAvailableMoves = true;
                        break;
                    }
                }
            }
            if (hasAvailableMoves) break;
        }

        if (!hasAvailableMoves) {
            this.isGameOver = true;
            // In the absence of formal check vs stalemate rules here,
            // end game logically defaults to a win for the player who just moved.
            this.winner = nextTurn === Color.WHITE ? Color.BLACK : Color.WHITE;
        }
    }

    async runGame() {
        this.isGameOver = false;
        this.winner = null;

        // Loop game turns until Game Over
        while (!this.isGameOver) {
            await this.playTurn();
        }

        return this.winner;
    }
}
