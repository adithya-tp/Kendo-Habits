import React from 'react';

const Square = ({ children }) => {
    return (
        <div 
            style={{
                position: 'relative',
                backgroundColor: "#ffffff",
                width: '100%',
                height: '100%',
                borderLeft: '2px dotted black',
                borderTop: '2px dotted black',
                opacity: 0.4,
            }}
        >
            { children }
        </div>
    );
}

export default Square;