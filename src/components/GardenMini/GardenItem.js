import React from 'react';

const gardenItemStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'move',
};

const GardenItem = () => {
    return (
        <div style={{...gardenItemStyle}}>🟢</div>
    );
}

export default GardenItem;