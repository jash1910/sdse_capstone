import React from 'react';

/**
 * A purely presentational component for a single square
 */
const Square = ({ row, col, piece, isDark, isSelected, isHighlighted, onClick }) => {
    // Determine standard colors for dark and light squares
    const baseColor = isDark ? 'var(--board-dark)' : 'var(--board-light)';

    // Highlight currently selected or valid target squares
    let squareBg = baseColor;
    if (isSelected) {
        squareBg = 'var(--highlight-color)';
    } else if (isHighlighted && !piece) {
        // Keep base color for empty highlighted squares, we'll draw a dot instead
    } else if (isHighlighted && piece) {
        squareBg = 'var(--highlight-color)'; // Highlight captured pieces slightly
    }

    return (
        <div
            onClick={() => onClick(row, col)}
            style={{
                width: '84px',
                height: '84px',
                backgroundColor: squareBg,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '56px',
                cursor: 'pointer',
                userSelect: 'none',
                position: 'relative',
                transition: 'background-color 0.2s ease, filter 0.2s ease'
            }}
            onMouseOver={(e) => {
                if (!isSelected && !isHighlighted) {
                    e.currentTarget.style.filter = 'brightness(1.1)';
                }
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.filter = 'none';
            }}
        >
            {/* Fallback to simple unicode matching if specific SVGs aren't available yet */}
            {piece && (
                <span className="piece" style={{
                    color: piece.color === 'w' ? '#ffffff' : '#000000',
                    textShadow: piece.color === 'w' ? '0 2px 4px rgba(0,0,0,0.8)' : '0 1px 2px rgba(255,255,255,0.4)',
                    lineHeight: 1,
                    filter: piece.color === 'w' ? 'drop-shadow(0 2px 5px rgba(0,0,0,0.5))' : 'drop-shadow(0 2px 5px rgba(255,255,255,0.2))'
                }}>
                    {getPieceSymbol(piece.color, piece.type)}
                </span>
            )}

            {/* Optional: Add dot for legal move highlights */}
            {isHighlighted && !piece && (
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.2)', pointerEvents: 'none' }} />
            )}

            {/* Ring around enemy piece for capture highlight */}
            {isHighlighted && piece && (
                <div style={{ position: 'absolute', width: '74px', height: '74px', borderRadius: '50%', border: '5px solid rgba(0,0,0,0.2)', boxSizing: 'border-box', pointerEvents: 'none' }} />
            )}
        </div>
    );
};

// Helper to convert type to symbol
function getPieceSymbol(color, type) {
    const symbols = {
        w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
        b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' }
    };
    return symbols[color]?.[type] || '';
}

export default Square;
