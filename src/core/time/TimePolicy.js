export class TimePolicy {
    constructor(initialTimeMs) {
        this.remainingTimeMs = initialTimeMs;
        this.lastStartTime = null;
    }

    /**
     * Starts tracking time. Usually called when an agent starts processing a turn.
     */
    startTimer() {
        this.lastStartTime = Date.now();
    }

    /**
     * Updates the tracked time. Usually called when an agent finalizes its turn.
     */
    updateRemainingTime() {
        throw new Error("updateRemainingTime() must be implemented by subclasses");
    }

    /**
     * Returns whether the initial time capacity has been exhausted.
     * @returns {boolean}
     */
    isTimeOver() {
        throw new Error("isTimeOver() must be implemented by subclasses");
    }

    /**
     * Utility to observe time without implicitly advancing clock state
     */
    peekRemainingTime() {
        if (this.lastStartTime) {
            const elapsed = Date.now() - this.lastStartTime;
            return Math.max(0, this.remainingTimeMs - elapsed);
        }
        return Math.max(0, this.remainingTimeMs);
    }
}
