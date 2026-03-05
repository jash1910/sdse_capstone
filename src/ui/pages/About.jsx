import React from 'react';

const About = () => {
    return (
        <div style={{ padding: '40px 20px', color: '#fff', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
            <h2 style={{ fontSize: '2rem', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>About Modular Chess Playground</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                This is a robust, clean architecture web application functioning as a playground for advanced AI testing capabilities natively modeled against abstract UI standards.
            </p>

            <h3>Core Mechanics</h3>
            <ul style={{ paddingLeft: '20px', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><strong>Game Engine:</strong> Abstracts turn flow entirely from visual components natively.</li>
                <li><strong>Agent Protocols:</strong> Abstract generic agents waiting dynamically over promises or recursive calculation calls smoothly.</li>
                <li><strong>AI Strategies:</strong> Injected explicitly handling isolated states using Minimax and AlphaBeta bounds constraints natively.</li>
                <li><strong>Simulators:</strong> Background matches utilizing Elo rating trackers purely abstracted.</li>
            </ul>
        </div>
    );
};

export default About;
