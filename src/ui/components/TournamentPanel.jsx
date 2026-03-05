import React from 'react';

const TournamentPanel = ({ onStartTournament, leaderboard, isRunning }) => {
    return (
        <div className="glass-panel" style={{
            padding: '24px',
            minWidth: '350px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Tournament Mode</h2>
                <button
                    className="btn-primary"
                    onClick={onStartTournament}
                    disabled={isRunning}
                    style={{
                        padding: '10px 18px',
                        backgroundColor: isRunning ? '#64748b' : 'var(--accent-color)', // slate-500 or blue-500
                        border: 'none',
                        borderRadius: '8px',
                        cursor: isRunning ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '0.95rem',
                        boxShadow: isRunning ? 'none' : '0 4px 14px rgba(0,0,0,0.2)'
                    }}
                    onMouseOver={(e) => {
                        if (!isRunning) e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
                    }}
                    onMouseOut={(e) => {
                        if (!isRunning) e.currentTarget.style.backgroundColor = 'var(--accent-color)';
                    }}
                >
                    {isRunning ? 'Running...' : 'Run Simulation'}
                </button>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                Run AI vs AI matches to simulate ELO ratings changes automatically.
            </p>

            <div style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '16px',
                borderRadius: '8px',
                flex: 1,
                overflowY: 'auto',
                minHeight: '200px',
                border: '1px solid var(--panel-border)'
            }}>
                {(!leaderboard || leaderboard.length === 0) ? (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', marginTop: '60px', fontStyle: 'italic' }}>No stats available</div>
                ) : (
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--panel-border)' }}>
                                <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Rank</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Agent</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontWeight: '600' }}>Rating</th>
                                <th style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontWeight: '600' }}>W-L-D</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, idx) => (
                                <tr key={entry.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>#{idx + 1}</td>
                                    <td style={{ padding: '12px 8px', fontWeight: '500' }}>{entry.id}</td>
                                    <td style={{ padding: '12px 8px', fontWeight: 'bold', color: 'var(--accent-color)' }}>{entry.rating}</td>
                                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{entry.record}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TournamentPanel;
