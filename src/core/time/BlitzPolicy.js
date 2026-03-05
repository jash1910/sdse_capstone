import { TimePolicy } from './TimePolicy.js';

export class BlitzPolicy extends TimePolicy {
    /**
     * @param {number} initialTimeMs Total time for the game in ms (e.g., 300000 for 5 mins)
     * @param {number} incrementMs Added time per move in ms (e.g., 3000 for 3 secs)
     */
    constructor(initialTimeMs, incrementMs = 0) {
        super(initialTimeMs);
        this.incrementMs = incrementMs;
    }

    updateRemainingTime() {
        if (!this.lastStartTime) return;

        const elapsed = Date.now() - this.lastStartTime;
        // Deduct elapsed time and optionally grant increment back
        this.remainingTimeMs = this.remainingTimeMs - elapsed + this.incrementMs;

        // Timer stops once updated
        this.lastStartTime = null;
    }

    isTimeOver() {
        return this.peekRemainingTime() <= 0;
    }
}
