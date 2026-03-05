import { TimePolicy } from './TimePolicy.js';

export class UnlimitedPolicy extends TimePolicy {
    constructor() {
        // Arbitrary default, though conceptually it is unused
        super(Infinity);
    }

    updateRemainingTime() {
        // No-op for unlimited time
        this.lastStartTime = null;
    }

    isTimeOver() {
        return false;
    }
}
