import React from 'react';
import ReplayPanel from '../components/ReplayPanel';

const Replay = () => {
    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', color: '#fff' }}>
            <div style={{ minWidth: '400px' }}>
                <h2 style={{ marginBottom: '15px' }}>Replay Viewer</h2>
                <p style={{ color: '#aaa', marginBottom: '20px' }}>
                    This section allows you to explore historical logs dynamically.
                </p>
                <ReplayPanel
                    moveHistory={[]}
                    currentReplayIndex={-1}
                    onReplayJump={() => { }}
                />
            </div>
        </div>
    );
};

export default Replay;
