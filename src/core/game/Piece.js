export const Color = {
    WHITE: 'w',
    BLACK: 'b'
};

export const PieceType = {
    PAWN: 'p',
    KNIGHT: 'n',
    BISHOP: 'b',
    ROOK: 'r',
    QUEEN: 'q',
    KING: 'k'
};

export class Piece {
    constructor(color, type) {
        this.color = color;
        this.type = type;
    }
}
