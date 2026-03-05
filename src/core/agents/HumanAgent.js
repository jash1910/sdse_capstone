import { Agent } from './Agent.js';

export class HumanAgent extends Agent {
    constructor(color) {
        super(color);
        this.pendingMoveResolver = null;
    }

    /**
     * Wait for UI to provide a move
     */
    async decideMove(gameState) {
        return new Promise((resolve) => {
            this.pendingMoveResolver = resolve;
        });
    }

    /**
     * Called by the UI when a user makes a move
     */
    submitMove(move) {
        if (this.pendingMoveResolver) {
            this.pendingMoveResolver(move);
            this.pendingMoveResolver = null;
        } else {
            console.warn("HumanAgent received a move, but was not waiting for one.");
        }
    }
}
