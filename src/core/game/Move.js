export class Move {
    constructor(fromRow, fromCol, toRow, toCol, piece, capturedPiece = null, promotion = null) {
        this.fromRow = fromRow;
        this.fromCol = fromCol;
        this.toRow = toRow;
        this.toCol = toCol;
        this.piece = piece;
        this.capturedPiece = capturedPiece;
        this.promotion = promotion; // Expected to be a PieceType if promoting
    }
}
