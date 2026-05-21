import React, { useState } from 'react';

export default function App() {
  const [display, setDisplay] = useState('');
  const [equation, setEquation] = useState('');

  // --- BACKEND LOGIC / ENGINE (Nasa iisang file) ---
  const handleInput = (value) => {
    if (value === 'C') {
      setDisplay('');
      setEquation('');
    } else if (value === '=') {
      try {
        // Tiyakin na ligtas ang evaluation (palitan ang '×' at '÷' ng '*' at '/')
        const sanitizedEquation = equation
          .replace(/×/g, '*')
          .replace(/÷/g, '/');
        
        if (!sanitizedEquation) return;

        // Engine calculation (Backend computing equivalent)
        const result = Function(`"use strict"; return (${sanitizedEquation})`)();
        
        setDisplay(Number(result).toLocaleString('en-US', { maximumFractionDigits: 4 }));
        setEquation(String(result));
      } catch (error) {
        setDisplay('Error');
        setEquation('');
      }
    } else {
      // Bawal mag-double ng operators sa unahan o magkasunod
      const operators = ['+', '-', '×', '÷'];
      if (operators.includes(value) && (equation === '' || operators.includes(equation.slice(-1)))) {
        return; 
      }
      setEquation((prev) => prev + value);
      setDisplay((prev) => (operators.includes(value) ? value : prev + value));
    }
  };

  // --- STYLES (UI/UX) ---
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      fontFamily: 'system-ui, sans-serif',
      padding: '20px',
    },
    calculator: {
      width: '100%',
      maxWidth: '360px',
      backgroundColor: 'rgba(30, 41, 59, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRadius: '24px',
      padding: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
    },
    screen: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      height: '110px',
      marginBottom: '24px',
      padding: '12px 16px',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      borderRadius: '16px',
      overflow: 'hidden',
    },
    history: {
      fontSize: '14px',
      color: '#94a3b8',
      marginBottom: '4px',
      minHeight: '20px',
      wordBreak: 'break-all',
    },
    mainDisplay: {
      fontSize: '36px',
      fontWeight: '600',
      color: '#f8fafc',
      whiteSpace: 'nowrap',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
    },
    button: (type) => ({
      padding: '20px 0',
      fontSize: '20px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      backgroundColor: 
        type === 'action' ? '#ef4444' : 
        type === 'operator' ? '#3b82f6' : 'rgba(255, 255, 255, 0.03)',
      color: type === 'plain' ? '#cbd5e1' : '#ffffff',
    })
  };

  const buttons = [
    { label: 'C', type: 'action' },
    { label: '÷', type: 'operator' },
    { label: '×', type: 'operator' },
    { label: '-', type: 'operator' },
    { label: '7', type: 'plain' },
    { label: '8', type: 'plain' },
    { label: '9', type: 'plain' },
    { label: '+', type: 'operator' },
    { label: '4', type: 'plain' },
    { label: '5', type: 'plain' },
    { label: '6', type: 'plain' },
    { label: '=', type: 'operator', rowSpan: true },
    { label: '1', type: 'plain' },
    { label: '2', type: 'plain' },
    { label: '3', type: 'plain' },
    { label: '0', type: 'plain', colSpan: true },
    { label: '.', type: 'plain' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        {/* Screen */}
        <div style={styles.screen}>
          <div style={styles.history}>{equation || '0'}</div>
          <div style={styles.mainDisplay}>{display || '0'}</div>
        </div>

        {/* Keypad */}
        <div style={styles.grid}>
          {buttons.map((btn, index) => {
            const customStyle = {
              ...styles.button(btn.type),
              ...(btn.colSpan && { gridColumn: 'span 2' }),
              ...(btn.rowSpan && { gridRow: 'span 2', height: '100%' }),
            };
            return (
              <button 
                key={index} 
                style={customStyle}
                onClick={() => handleInput(btn.label)}
                onMouseOver={(e) => e.target.style.filter = 'brightness(1.2)'}
                onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
              >
                {btn.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
