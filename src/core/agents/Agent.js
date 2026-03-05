export class Agent {
    constructor(color) {
        this.color = color;
    }

    /**
     * Abstract method for deciding a move
     * @param {GameState} gameState 
     * @returns {Promise<Move>} Resolves to the chosen move
     */
    async decideMove(gameState) {
        throw new Error("decideMove() must be implemented by subclasses");
    }
}
