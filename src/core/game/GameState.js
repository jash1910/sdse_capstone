import { Board } from './Board.js';
import { Color } from './Piece.js';

export class GameState {
    constructor() {
        this.board = new Board();
        this.board.setupInitialPosition();
        this.turn = Color.WHITE;
        this.moveHistory = [];
    }

    makeMove(move) {
        this.board.removePiece(move.fromRow, move.fromCol);

        // Handle pawn promotion
        if (move.promotion) {
            this.board.setPiece(move.toRow, move.toCol, { color: move.piece.color, type: move.promotion });
        } else {
            this.board.setPiece(move.toRow, move.toCol, move.piece);
        }

        this.moveHistory.push(move);
        this.switchTurn();
    }

    switchTurn() {
        this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE;
    }
}
