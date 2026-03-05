import React from 'react';

const ControlPanel = ({ onStartGame, isGameActive, currentTurn, statusText }) => {
    return (
        <div className="glass-panel" style={{
            padding: '24px',
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }}>
            <h2 style={{ margin: '0 0 10px 0', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px', fontSize: '1.5rem', fontWeight: '600' }}>
                Game Controls
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                <strong style={{ color: currentTurn === 'w' ? '#fff' : '#cbd5e1' }}>
                    {statusText || 'Ready to start'}
                </strong>
            </div>

            {!isGameActive && (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Difficulty / AI Strategy:</label>
                        <select disabled={isGameActive} style={{ padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--panel-border)', outline: 'none', cursor: 'pointer' }}>
                            <option value="heuristic">Beginner (Heuristic)</option>
                            <option value="minimax">Intermediate (Minimax D2)</option>
                            <option value="alphabeta">Advanced (Alpha-Beta D3)</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Time Control:</label>
                        <select disabled={isGameActive} style={{ padding: '10px', borderRadius: '6px', background: 'rgba(0,0,0,0.2)', color: '#fff', border: '1px solid var(--panel-border)', outline: 'none', cursor: 'pointer' }}>
                            <option value="unlimited">Unlimited</option>
                            <option value="blitz">Blitz (5 min)</option>
                            <option value="classical">Classical</option>
                        </select>
                    </div>
                </>
            )}

            <button
                className="btn-primary"
                onClick={onStartGame}
                style={{
                    padding: '14px',
                    marginTop: '16px',
                    backgroundColor: isGameActive ? '#ef4444' : 'var(--accent-color)', // red-500 or blue-500
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => {
                    if (isGameActive) e.currentTarget.style.backgroundColor = '#dc2626'; // red-600
                }}
                onMouseOut={(e) => {
                    if (isGameActive) e.currentTarget.style.backgroundColor = '#ef4444'; // red-500
                    else e.currentTarget.style.backgroundColor = 'var(--accent-color)';
                }}
            >
                {isGameActive ? 'Resign / Reset' : 'Start Game'}
            </button>
        </div>
    );
};

export default ControlPanel;
