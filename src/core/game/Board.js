import { Piece, PieceType, Color } from './Piece.js';

export class Board {
    constructor() {
        this.grid = Array(8).fill(null).map(() => Array(8).fill(null));
    }

    setupInitialPosition() {
        // Array indexing: row 0 is Rank 8 (Black's back rank), row 7 is Rank 1 (White's back rank)
        const backRankOrder = [
            PieceType.ROOK, PieceType.KNIGHT, PieceType.BISHOP, PieceType.QUEEN,
            PieceType.KING, PieceType.BISHOP, PieceType.KNIGHT, PieceType.ROOK
        ];

        for (let c = 0; c < 8; c++) {
            // Black pieces
            this.grid[0][c] = new Piece(Color.BLACK, backRankOrder[c]);
            this.grid[1][c] = new Piece(Color.BLACK, PieceType.PAWN);

            // White pieces
            this.grid[6][c] = new Piece(Color.WHITE, PieceType.PAWN);
            this.grid[7][c] = new Piece(Color.WHITE, backRankOrder[c]);
        }
    }

    getPiece(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.grid[row][col];
        }
        return null;
    }

    setPiece(row, col, piece) {
        if (this.isValidPosition(row, col)) {
            this.grid[row][col] = piece;
        }
    }

    removePiece(row, col) {
        if (this.isValidPosition(row, col)) {
            this.grid[row][col] = null;
        }
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    clone() {
        const newBoard = new Board();
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (this.grid[r][c]) {
                    newBoard.grid[r][c] = new Piece(this.grid[r][c].color, this.grid[r][c].type);
                }
            }
        }
        return newBoard;
    }
}
