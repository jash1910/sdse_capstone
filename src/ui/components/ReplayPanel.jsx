import React from 'react';

const ReplayPanel = ({ moveHistory, currentReplayIndex, onReplayJump }) => {
    return (
        <div className="glass-panel" style={{
            padding: '24px',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            maxHeight: '400px',
            gap: '12px'
        }}>
            <h3 style={{ margin: '0 0 10px 0', borderBottom: '1px solid var(--panel-border)', paddingBottom: '12px', fontSize: '1.2rem' }}>Move History</h3>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: '12px',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                border: '1px solid var(--panel-border)'
            }}>
                {moveHistory && moveHistory.length === 0 && (
                    <div style={{ color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic', padding: '20px 0' }}>No moves yet</div>
                )}

                {/* Render moves dynamically grouped by turn conceptually or as list */}
                {moveHistory && moveHistory.map((move, idx) => {
                    const isActive = idx === currentReplayIndex;

                    return (
                        <div
                            key={idx}
                            onClick={() => onReplayJump(idx)}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '0.95rem',
                                color: isActive ? '#fff' : 'var(--text-primary)',
                                transition: 'background-color 0.2s',
                                fontWeight: isActive ? '600' : 'normal'
                            }}
                            onMouseOver={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                            }}
                            onMouseOut={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <span style={{ color: isActive ? '#fff' : 'var(--text-secondary)' }}>{Math.floor(idx / 2) + 1}. {idx % 2 !== 0 ? '...' : ''}</span>
                            <span style={{ fontFamily: 'monospace' }}>
                                {file(move.fromCol)}{rank(move.fromRow)}-{file(move.toCol)}{rank(move.toRow)}
                                {move.capturedPiece ? 'x' : ''}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// Simple visual helpers to convert grid coords to chess notation for UI rendering only
const file = (col) => String.fromCharCode(97 + col);
const rank = (row) => (row + 1).toString();

export default ReplayPanel;
