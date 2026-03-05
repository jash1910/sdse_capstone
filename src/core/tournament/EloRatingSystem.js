import { RatingSystem } from './RatingSystem.js';

export class EloRatingSystem extends RatingSystem {
    constructor(kFactor = 32) {
        super();
        this.kFactor = kFactor;
    }

    calculateNewRatings(ratingA, ratingB, outcome) {
        // Calculate expected score for both players
        const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
        const expectedB = 1 - expectedA;

        // outcome represents actual score for Player A (1 for win, 0.5 for draw, 0 for loss)
        const actualA = outcome;
        const actualB = 1 - outcome;

        // Update ratings
        const newRatingA = ratingA + this.kFactor * (actualA - expectedA);
        const newRatingB = ratingB + this.kFactor * (actualB - expectedB);

        return {
            newRatingA: Math.round(newRatingA),
            newRatingB: Math.round(newRatingB),
        };
    }
}
