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

export class AlphaBetaStrategy extends Strategy {
    constructor(depth = 3) {
        super();
        this.depth = depth;
    }

    async chooseMove(gameState) {
        const color = gameState.turn;
        let bestScore = -Infinity;
        let bestMove = null;

        const moves = this.getAllAvailableMoves(gameState.board, color);
        if (moves.length === 0) return null;

        let alpha = -Infinity;
        let beta = Infinity;

        for (const move of moves) {
            const simulatedBoard = this.simulateMove(gameState.board, move);
            const score = this.alphaBeta(simulatedBoard, this.depth - 1, alpha, beta, false, color);

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            alpha = Math.max(alpha, bestScore);
        }

        return bestMove || moves[0];
    }

    alphaBeta(board, depth, alpha, beta, isMaximizing, maximizingColor) {
        if (depth === 0) {
            return this.evaluateBoard(board, maximizingColor);
        }

        const currentColor = isMaximizing ? maximizingColor : (maximizingColor === Color.WHITE ? Color.BLACK : Color.WHITE);
        const moves = this.getAllAvailableMoves(board, currentColor);

        if (moves.length === 0) {
            return isMaximizing ? -Infinity : Infinity;
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (const move of moves) {
                const simulatedBoard = this.simulateMove(board, move);
                const ev = this.alphaBeta(simulatedBoard, depth - 1, alpha, beta, false, maximizingColor);
                maxEval = Math.max(maxEval, ev);
                alpha = Math.max(alpha, ev);
                if (beta <= alpha) break;
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of moves) {
                const simulatedBoard = this.simulateMove(board, move);
                const ev = this.alphaBeta(simulatedBoard, depth - 1, alpha, beta, true, maximizingColor);
                minEval = Math.min(minEval, ev);
                beta = Math.min(beta, ev);
                if (beta <= alpha) break;
            }
            return minEval;
        }
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
