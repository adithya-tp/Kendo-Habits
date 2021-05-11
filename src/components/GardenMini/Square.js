import React from 'react';

const Square = ({ children }) => {
    return (
        <div 
            style={{
                position: 'relative',
                backgroundColor: "#ffffff",
                width: '100%',
                height: '100%',
                border: '1px solid black',
                opacity: 0.4,
            }}
        >
            { children }
        </div>
    );
}

export default Square;