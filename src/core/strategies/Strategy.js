export class Strategy {
    /**
     * Interface to be overridden by strategy implementations.
     * @param {GameState} gameState 
     * @returns {Promise<Move>} 
     */
    async chooseMove(gameState) {
        throw new Error("chooseMove() must be implemented by subclasses");
    }
}
