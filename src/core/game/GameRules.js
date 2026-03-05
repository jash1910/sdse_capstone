import { Move } from './Move.js';
import { PieceType, Color } from './Piece.js';

export class GameRules {
    static getPseudoLegalMoves(board, row, col) {
        const piece = board.getPiece(row, col);
        if (!piece) return [];

        const moves = [];

        switch (piece.type) {
            case PieceType.PAWN:
                moves.push(...this.getPawnMoves(board, row, col, piece.color));
                break;
            case PieceType.KNIGHT:
                moves.push(...this.getKnightMoves(board, row, col, piece.color));
                break;
            case PieceType.BISHOP:
                moves.push(...this.getSlidingMoves(board, row, col, piece.color, [[-1, -1], [-1, 1], [1, -1], [1, 1]]));
                break;
            case PieceType.ROOK:
                moves.push(...this.getSlidingMoves(board, row, col, piece.color, [[-1, 0], [1, 0], [0, -1], [0, 1]]));
                break;
            case PieceType.QUEEN:
                moves.push(...this.getSlidingMoves(board, row, col, piece.color, [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]));
                break;
            case PieceType.KING:
                moves.push(...this.getKingMoves(board, row, col, piece.color));
                break;
        }

        return moves;
    }

    static getPawnMoves(board, row, col, color) {
        const moves = [];
        const direction = color === Color.WHITE ? -1 : 1;
        const startRow = color === Color.WHITE ? 6 : 1;
        const piece = board.getPiece(row, col);

        // Forward 1 step
        if (board.isValidPosition(row + direction, col) && !board.getPiece(row + direction, col)) {
            moves.push(new Move(row, col, row + direction, col, piece));

            // Forward 2 steps
            if (row === startRow && !board.getPiece(row + 2 * direction, col)) {
                moves.push(new Move(row, col, row + 2 * direction, col, piece));
            }
        }

        // Captures (Diagonal left/right)
        const captureCols = [col - 1, col + 1];
        for (const c of captureCols) {
            if (board.isValidPosition(row + direction, c)) {
                const target = board.getPiece(row + direction, c);
                if (target && target.color !== color) {
                    moves.push(new Move(row, col, row + direction, c, piece, target));
                }
            }
        }

        return moves;
    }

    static getKnightMoves(board, row, col, color) {
        const moves = [];
        const piece = board.getPiece(row, col);
        const jumps = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        for (const [dr, dc] of jumps) {
            const r = row + dr;
            const c = col + dc;
            if (board.isValidPosition(r, c)) {
                const target = board.getPiece(r, c);
                if (!target || target.color !== color) {
                    moves.push(new Move(row, col, r, c, piece, target));
                }
            }
        }
        return moves;
    }

    static getSlidingMoves(board, row, col, color, directions) {
        const moves = [];
        const piece = board.getPiece(row, col);

        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            while (board.isValidPosition(r, c)) {
                const target = board.getPiece(r, c);
                if (!target) {
                    moves.push(new Move(row, col, r, c, piece));
                } else {
                    if (target.color !== color) {
                        moves.push(new Move(row, col, r, c, piece, target));
                    }
                    break; // Stop sliding when a piece is hit
                }
                r += dr;
                c += dc;
            }
        }
        return moves;
    }

    static getKingMoves(board, row, col, color) {
        const moves = [];
        const piece = board.getPiece(row, col);
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [dr, dc] of directions) {
            const r = row + dr;
            const c = col + dc;
            if (board.isValidPosition(r, c)) {
                const target = board.getPiece(r, c);
                if (!target || target.color !== color) {
                    moves.push(new Move(row, col, r, c, piece, target));
                }
            }
        }
        return moves;
    }
}
