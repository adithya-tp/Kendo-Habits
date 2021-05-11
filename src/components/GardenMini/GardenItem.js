import React from 'react';
import { useDrag } from 'react-dnd';
import { GardenTypes } from './GardenTypes';

const gardenItemStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'move',
};

const GardenItem = () => {

    const [{ isDragging }, drag ] = useDrag(() => ({
        type: GardenTypes.TREE,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    return (
        <div ref={drag} style={{...gardenItemStyle}}>🟢</div>
    );
}

export default GardenItem;