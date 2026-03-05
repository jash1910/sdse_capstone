import { Strategy } from './Strategy.js';
import { GameRules } from '../game/GameRules.js';
import { PieceType, Color } from '../game/Piece.js';

const PIECE_VALUES = {
    [PieceType.PAWN]: 1,
    [PieceType.KNIGHT]: 3,
    [PieceType.BISHOP]: 3,
    [PieceType.ROOK]: 5,
    [PieceType.QUEEN]: 9,
    [PieceType.KING]: 0
};

export class HeuristicStrategy extends Strategy {
    async chooseMove(gameState) {
        const color = gameState.turn;
        let bestScore = -Infinity;
        let bestMoves = [];

        const moves = this.getAllAvailableMoves(gameState.board, color);

        // Fallback if no moves available
        if (moves.length === 0) return null;

        for (const move of moves) {
            const simulatedBoard = this.simulateMove(gameState.board, move);
            const score = this.evaluateBoard(simulatedBoard, color);

            if (score > bestScore) {
                bestScore = score;
                bestMoves = [move];
            } else if (score === bestScore) {
                bestMoves.push(move);
            }
        }

        // Pick a random best move if multiple moves yield the same immediate score
        if (bestMoves.length > 0) {
            const randomIndex = Math.floor(Math.random() * bestMoves.length);
            return bestMoves[randomIndex];
        }

        return moves[0];
    }

    simulateMove(board, move) {
        const newBoard = board.clone();
        newBoard.removePiece(move.fromRow, move.fromCol);
        if (move.promotion) {
            newBoard.setPiece(move.toRow, move.toCol, { color: move.piece.color, type: move.promotion });
        } else {
            newBoard.setPiece(move.toRow, move.toCol, move.piece);
        }
        return newBoard;
    }

    getAllAvailableMoves(board, color) {
        const moves = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board.getPiece(r, c);
                if (piece && piece.color === color) {
                    moves.push(...GameRules.getPseudoLegalMoves(board, r, c));
                }
            }
        }
        return moves;
    }

    evaluateBoard(board, maximizingColor) {
        let score = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board.getPiece(r, c);
                if (piece) {
                    const value = PIECE_VALUES[piece.type] || 0;
                    if (piece.color === maximizingColor) {
                        score += value;
                    } else {
                        score -= value;
                    }
                }
            }
        }
        return score;
    }
}
