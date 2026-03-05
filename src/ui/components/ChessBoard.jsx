import React from 'react';
import Square from './Square';

/**
 * Renders the full 8x8 structural grid
 */
const ChessBoard = ({ board, selectedSquare, validMoves, onSquareClick }) => {
    // Flip rendering if playing as Black (optional, defaulting to White at bottom)
    const isFlipped = false;

    const renderSquare = (r, c) => {
        // Standard logic to compute if a square should be colored dark
        const isDark = (r + c) % 2 !== 0;

        // Check if current square has an active interacting state
        const isSelected = selectedSquare && selectedSquare.row === r && selectedSquare.col === c;
        const isHighlighted = validMoves && validMoves.some(m => m.toRow === r && m.toCol === c);

        const piece = board ? board.getPiece(r, c) : null;

        return (
            <Square
                key={`${r}-${c}`}
                row={r}
                col={c}
                piece={piece}
                isDark={isDark}
                isSelected={isSelected}
                isHighlighted={isHighlighted}
                onClick={onSquareClick}
            />
        );
    };

    const rows = [];
    const startRow = isFlipped ? 0 : 7;
    const endRow = isFlipped ? 8 : -1;
    const rowStep = isFlipped ? 1 : -1;

    for (let r = startRow; r !== endRow; r += rowStep) {
        const cols = [];
        const startCol = isFlipped ? 7 : 0;
        const endCol = isFlipped ? -1 : 8;
        const colStep = isFlipped ? -1 : 1;

        for (let c = startCol; c !== endCol; c += colStep) {
            cols.push(renderSquare(r, c));
        }

        rows.push(
            <div key={r} style={{ display: 'flex' }}>
                {cols}
            </div>
        );
    }

    return (
        <div style={{
            border: '8px solid var(--panel-bg)',
            borderRadius: '16px',
            display: 'inline-block',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            backgroundColor: 'var(--panel-bg)',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
        }}>
            {rows}
        </div>
    );
};

export default ChessBoard;
