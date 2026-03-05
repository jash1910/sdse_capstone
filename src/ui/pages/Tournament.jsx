import React, { useState } from 'react';
import TournamentPanel from '../components/TournamentPanel';
import { TournamentManager } from '../../core/tournament/TournamentManager';
import { EloRatingSystem } from '../../core/tournament/EloRatingSystem';
import { Color } from '../../core/game/Piece';
import { AIAgent } from '../../core/agents/AIAgent';
import { MinimaxStrategy } from '../../core/strategies/MinimaxStrategy';
import { AlphaBetaStrategy } from '../../core/strategies/AlphaBetaStrategy';
import { HeuristicStrategy } from '../../core/strategies/HeuristicStrategy';

// Keep it outside component if we want persistence across route changes
const globalTournamentManager = new TournamentManager(new EloRatingSystem());
globalTournamentManager.registerAgent('AlphaBeta (D3)', new AIAgent(Color.WHITE, new AlphaBetaStrategy(3)), 1500);
globalTournamentManager.registerAgent('Minimax (D2)', new AIAgent(Color.BLACK, new MinimaxStrategy(2)), 1300);
globalTournamentManager.registerAgent('Heuristic', new AIAgent(Color.WHITE, new HeuristicStrategy()), 1100);

const Tournament = () => {
    const [leaderboard, setLeaderboard] = useState(globalTournamentManager.getLeaderboard());
    const [isTournamentRunning, setIsTournamentRunning] = useState(false);

    const handleStartTournament = async () => {
        if (isTournamentRunning) return;
        setIsTournamentRunning(true);

        const agents = ['AlphaBeta (D3)', 'Minimax (D2)', 'Heuristic'];

        for (let i = 0; i < agents.length; i++) {
            for (let j = i + 1; j < agents.length; j++) {
                await globalTournamentManager.runMatch(agents[i], agents[j]);
                setLeaderboard(globalTournamentManager.getLeaderboard());
            }
        }

        setIsTournamentRunning(false);
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', color: '#fff' }}>
            <TournamentPanel
                onStartTournament={handleStartTournament}
                leaderboard={leaderboard}
                isRunning={isTournamentRunning}
            />
        </div>
    );
};

export default Tournament;
