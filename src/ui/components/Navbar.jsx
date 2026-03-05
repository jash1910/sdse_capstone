import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav style={{
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--panel-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '16px 32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px'
            }}>
                <NavLink to="/" currentPath={location.pathname}>Home</NavLink>
                <NavLink to="/play" currentPath={location.pathname}>Play</NavLink>
                <NavLink to="/tournament" currentPath={location.pathname}>Tournament</NavLink>
                <NavLink to="/replay" currentPath={location.pathname}>Replay</NavLink>
                <NavLink to="/about" currentPath={location.pathname}>About</NavLink>
            </div>
        </nav>
    );
};

const NavLink = ({ to, currentPath, children }) => {
    const isActive = currentPath === to;
    return (
        <Link to={to} style={{
            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            textDecoration: 'none',
            fontWeight: isActive ? '600' : '500',
            fontSize: '1rem',
            transition: 'color 0.2s',
            borderBottom: isActive ? '2px solid var(--accent-color)' : '2px solid transparent',
            paddingBottom: '4px'
        }}
            onMouseOver={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseOut={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
            }}>
            {children}
        </Link>
    );
};

export default Navbar;
