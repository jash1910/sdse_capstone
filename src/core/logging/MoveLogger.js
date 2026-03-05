export class MoveLogger {
    constructor() {
        this.moves = [];
    }

    /**
     * Record a move exactly as it was played
     * @param {Move} move
     */
    logMove(move) {
        // Clone or preserve the properties strictly to prevent mutational side effects
        this.moves.push({
            fromRow: move.fromRow,
            fromCol: move.fromCol,
            toRow: move.toRow,
            toCol: move.toCol,
            piece: { ...move.piece },
            capturedPiece: move.capturedPiece ? { ...move.capturedPiece } : null,
            promotion: move.promotion
        });
    }

    getHistory() {
        return [...this.moves];
    }

    clear() {
        this.moves = [];
    }
}
