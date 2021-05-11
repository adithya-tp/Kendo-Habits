import React from 'react';
import GardenItem from './GardenItem';
import Square from './Square';
import './GardenMini.css';


const GardenMini = ({ itemPosition }) => {
    function renderSquare(i, [itemX, itemY]) {
        const x = i % 10;
        const y = Math.floor(i / 10);
        const isitemHere = x === itemX && y === itemY;
        const piece = isitemHere ? <GardenItem /> : null;
    
        return (
            <div key={i} style={{ width: '10%', height: '10%' }}>
                <Square>{piece}</Square>
        </div>
        )
    }

    const squares = [];
    for (let i = 0; i < 100; i++) {
        squares.push(renderSquare(i, itemPosition));
    }

    return (
        <div className="garden__mini-grid"
            style={{
                width: '250px',
                height: '250px',
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
        {squares}
        </div>
    )
}

export default GardenMini;