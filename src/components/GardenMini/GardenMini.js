import React, { useEffect, useRef, useState } from 'react';
import GardenItem from './GardenItem';
import Square from './Square';
import './GardenMini.css';


const GardenMini = ({ itemPosition }) => {
    
    const [coordinates, setCoordinates] = useState([...itemPosition]);
    const [squares, setSquares] = useState([]);
    const [lastCoord, setLastCoord] = useState([]);
    const square_ref = useRef(null);
    const [hasItem, setHasItem] = useState(Array(100).fill(false));

    useEffect(() => {
        console.log(coordinates);
        coordinates.forEach((coordinate) => {
            var temp__coordinates = [coordinate[1], 9 - coordinate[0]];
            hasItem[temp__coordinates[0] * 10 + temp__coordinates[1]] = true;
        });
        
        let tempSquares = [];
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                const piece = hasItem[10 * x + y] ? <GardenItem /> : null;
                tempSquares.push(
                    <div onClick={(e) => handleSquareClick(e, hasItem[10 * x + y], x, y)} key={10 * x + y} style={{ cursor: 'pointer', width: '10%', height: '10%' }}>
                        <Square>{piece}</Square>
                    </div>
                );
            }
        }

        
        // for (let i = 0; i < 100; i++) {
        //     const x = i % 10;
        //     const y = Math.floor(i / 10);
        //     const isitemHere = x === itemX && y === itemY;
        //     const piece = isitemHere ? <GardenItem style={{ zIndex: 100}} onClick={() => handleItemClick()} /> : null;
            

        //     tempSquares.push(
        //         <div onClick={() => handleSquareClick(x, y)} key={i} style={{ cursor: 'pointer', width: '10%', height: '10%' }}>
        //             <Square>{piece}</Square>
        //         </div>
        //     );
        // }
        setSquares([...tempSquares]);
    }, [lastCoord, hasItem]);

    const handleSquareClick = function(event, hasItem, x, y) {
        // console.log(square_ref.current);

        // deal with the last square that was selected, if any
        if(square_ref.current != null) {
            square_ref.current.style.backgroundColor = 'white';
        }

        // deal with the new square
        if(hasItem) {
            event.target.style.backgroundColor = 'black';
            square_ref.current = event.target;
            setLastCoord([x, y]);
            console.log(x, y);
            console.log("last: ", lastCoord);
            // console.log(square_ref.current);
        } else {
            if(square_ref.current != null) {
                console.log(lastCoord);
                var last_x = lastCoord[0], last_y = lastCoord[1];
                setHasItem[10 * last_x + last_y] = false;
                setHasItem[10 * x + y] = true;
                setLastCoord([]);
            }
            square_ref.current = null;
        }
    }

    // const handleSquareClick = (x, y) => {
    //     setCoordinates([x, y]);
    // }

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