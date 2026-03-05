export class RatingSystem {
    /**
     * Calculates new ratings based on the outcome of a match.
     * @param {number} ratingA - The pre-match rating of Player A
     * @param {number} ratingB - The pre-match rating of Player B
     * @param {number} outcome - 1 if A won, 0 if B won, 0.5 for a draw
     * @returns {{newRatingA: number, newRatingB: number}}
     */
    calculateNewRatings(ratingA, ratingB, outcome) {
        throw new Error("calculateNewRatings() must be implemented by subclasses");
    }
}
