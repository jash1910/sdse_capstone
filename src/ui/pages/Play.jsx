import React, { useState, useEffect, useRef } from 'react';
import ChessBoard from '../components/ChessBoard';
import ControlPanel from '../components/ControlPanel';

import { GameEngine } from '../../core/engine/GameEngine';
import { GameRules } from '../../core/game/GameRules';
import { Color } from '../../core/game/Piece';
import { HumanAgent } from '../../core/agents/HumanAgent';
import { AIAgent } from '../../core/agents/AIAgent';
import { AlphaBetaStrategy } from '../../core/strategies/AlphaBetaStrategy';

const Play = () => {
    const [engine, setEngine] = useState(null);
    const [board, setBoard] = useState(null);
    const [turn, setTurn] = useState(Color.WHITE);
    const [status, setStatus] = useState("Ready to Start");
    const [isGameActive, setIsGameActive] = useState(false);

    const [selectedSquare, setSelectedSquare] = useState(null);
    const [validMoves, setValidMoves] = useState([]);

    const humanAgentRef = useRef(null);

    useEffect(() => {
        if (engine) {
            setBoard(engine.gameState.board.clone());
            setTurn(engine.gameState.turn);
            if (engine.isGameOver) {
                setStatus(`Game Over! Winner: ${engine.winner === 'w' ? 'White' : 'Black'}`);
                setIsGameActive(false);
            } else {
                setStatus(`Turn: ${engine.gameState.turn === 'w' ? 'White' : 'Black'}`);
            }
        }
    }, [engine, validMoves, selectedSquare]);

    const handleStartGame = async () => {
        if (isGameActive) {
            setIsGameActive(false);
            setEngine(null);
            setBoard(null);
            setStatus("Ready to Start");
            setSelectedSquare(null);
            setValidMoves([]);
            return;
        }

        const human = new HumanAgent(Color.WHITE);
        humanAgentRef.current = human;

        // For now, hardcode advanced strategy for immediate playability
        const ai = new AIAgent(Color.BLACK, new AlphaBetaStrategy(3));

        const newEngine = new GameEngine(human, ai);

        // Force react render when engine fires move internally
        const originalMakeMove = newEngine.gameState.makeMove.bind(newEngine.gameState);
        newEngine.gameState.makeMove = (move) => {
            originalMakeMove(move);
            setBoard(newEngine.gameState.board.clone());
            setTurn(newEngine.gameState.turn);
        };

        setEngine(newEngine);
        setBoard(newEngine.gameState.board.clone());
        setIsGameActive(true);
        setStatus("Turn: White");

        newEngine.runGame().then(winner => {
            setStatus(`Game Over! Winner: ${winner === 'w' ? 'White' : (winner === 'b' ? 'Black' : 'Draw')}`);
            setIsGameActive(false);
            setBoard(newEngine.gameState.board.clone());
        }).catch(err => {
            console.error("Game Exception:", err);
            setStatus("Game Halted Error.");
        });
    };

    const handleSquareClick = (row, col) => {
        if (!isGameActive || !engine) return;

        if (engine.gameState.turn === Color.WHITE && humanAgentRef.current) {
            const targetMove = validMoves.find(m => m.toRow === row && m.toCol === col);

            if (targetMove) {
                humanAgentRef.current.submitMove(targetMove);
                setSelectedSquare(null);
                setValidMoves([]);
            } else {
                const piece = engine.gameState.board.getPiece(row, col);
                if (piece && piece.color === Color.WHITE) {
                    setSelectedSquare({ row, col });
                    const moves = GameRules.getPseudoLegalMoves(engine.gameState.board, row, col);
                    setValidMoves(moves);
                } else {
                    setSelectedSquare(null);
                    setValidMoves([]);
                }
            }
        }
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ControlPanel
                    onStartGame={handleStartGame}
                    isGameActive={isGameActive}
                    currentTurn={turn}
                    statusText={status}
                />
            </div>
            <div>
                <ChessBoard
                    board={board}
                    selectedSquare={selectedSquare}
                    validMoves={validMoves}
                    onSquareClick={handleSquareClick}
                />
            </div>
        </div>
    );
};

export default Play;
