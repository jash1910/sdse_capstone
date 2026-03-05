import { TimePolicy } from './TimePolicy.js';

export class ClassicalPolicy extends TimePolicy {
    /**
     * @param {number} initialTimeMs e.g., 5400000 ms (90 minutes) per player
     * @param {number} additionalTimeAtMoveMs Bonus awarded at a specific move (often move 40)
     * @param {number} timeAddingThresholdMove The move number triggering the time addition
     * @param {number} incrementMs Increment granted per normal move
     */
    constructor(initialTimeMs, additionalTimeAtMoveMs = 0, timeAddingThresholdMove = 40, incrementMs = 0) {
        super(initialTimeMs);
        this.additionalTimeAtMoveMs = additionalTimeAtMoveMs;
        this.timeAddingThresholdMove = timeAddingThresholdMove;
        this.incrementMs = incrementMs;
        this.moveCount = 0;
    }

    updateRemainingTime() {
        if (!this.lastStartTime) return;

        this.moveCount++;
        const elapsed = Date.now() - this.lastStartTime;

        this.remainingTimeMs = this.remainingTimeMs - elapsed + this.incrementMs;

        // Classical typically features milestone time injections 
        if (this.moveCount === this.timeAddingThresholdMove) {
            this.remainingTimeMs += this.additionalTimeAtMoveMs;
        }

        this.lastStartTime = null;
    }

    isTimeOver() {
        return this.peekRemainingTime() <= 0;
    }
}
