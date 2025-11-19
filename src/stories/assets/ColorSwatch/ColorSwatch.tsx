import React from 'react';

interface ColorSwatchProps {
  tokenName: string;
  description: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ tokenName, description }) => {
  return (
    <div style={{ 
      padding: '12px', 
      border: '1px solid #E5E7EB', 
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div 
        style={{
          height: '60px',
          width: '100%',
          backgroundColor: `var(${tokenName})`,
          borderRadius: '4px',
          border: '1px solid rgba(0,0,0,0.1)'
        }}
      ></div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold' }}>
          {tokenName}
        </span>
        <span style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
          {description}
        </span>
      </div>
    </div>
  );
};

export default ColorSwatch;