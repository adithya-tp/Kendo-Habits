import React, { useEffect, useState } from 'react';
import GardenItem from './GardenItem';
import Square from './Square';
import './GardenMini.css';


const GardenMini = ({ itemPosition }) => {
    
    const [coordinates, setCoordinates] = useState([...itemPosition]);
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        let tempSquares = [];
        let [itemX, itemY] = coordinates;
        console.log(itemX, itemY);
        for (let i = 0; i < 100; i++) {
            const x = i % 10;
            const y = Math.floor(i / 10);
            const isitemHere = x === itemX && y === itemY;
            const piece = isitemHere ? <GardenItem /> : null;


            tempSquares.push(
                <div onClick={() => handleSquareClick(x, y)} key={i} style={{ cursor: 'pointer', width: '10%', height: '10%' }}>
                    <Square>{piece}</Square>
                </div>
            );
        }
        setSquares([...tempSquares]);
    }, [coordinates]);

    const handleSquareClick = (x, y) => {
        setCoordinates([x, y]);
    }

    return (
        <div className="garden__mini-grid"
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
        {squares}
        </div>
    )
}

export default GardenMini;