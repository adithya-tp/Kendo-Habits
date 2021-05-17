import React from 'react';
import World from './World';

const Garden = ({ itemPositions }) => {
    return (
        <>
            <World itemPositions={itemPositions} />
        </>
    );
}

export default Garden;