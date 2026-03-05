import { GameState } from '../game/GameState.js';

export class ReplaySystem {
    constructor(moveLogger) {
        this.moveLogger = moveLogger;
    }

    /**
     * Reconstruct a GameState dynamically from the very beginning up to a specific move index
     * @param {number} upToIndex The index in the move history to replay up to (inclusive) 
     * @returns {GameState} The reconstructed game state
     */
    reconstructState(upToIndex = null) {
        const history = this.moveLogger.getHistory();
        const state = new GameState();

        const limit = upToIndex !== null ? Math.min(upToIndex + 1, history.length) : history.length;

        for (let i = 0; i < limit; i++) {
            const move = history[i];
            // Note: GameState.makeMove expects a fully compliant move object that it strips and uses
            state.makeMove(move);
        }

        return state;
    }
}
