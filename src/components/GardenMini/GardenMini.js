import React, { useEffect, useRef, useState } from 'react';
import GardenItem from './GardenItem';
import Square from './Square';
import './GardenMini.css';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';


const GardenMini = ({ itemPositions }) => {
    
    const [squares, setSquares] = useState([]);
    const [lastCoord, setLastCoord] = useState([]);
    const square_ref = useRef(null);
    const [hasItem, setHasItem] = useState(new Array(100).fill(['empty', false]));
    const [currentUser, setCurrentUser] = useState();
    const history = useHistory();
    // console.log("cloud pos: ", itemPositions);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setCurrentUser(authUser);
            } else {
                history.push('/');
            }
        });
        return unsubscribe;
    }, []);

    // for initial render of item positions
    useEffect(() => {
        itemPositions.forEach((coordinate) => {
            var temp__coordinates = [coordinate[2], 9 - coordinate[1]];
            hasItem[temp__coordinates[0] * 10 + temp__coordinates[1]] = [coordinate[0], true];
        });
    }, [itemPositions]);

    // for subsequent render of item positions
    useEffect(() => {
        // console.log("Has item changed", hasItem);
        let tempSquares = [];
        for(let x = 0; x < 10; x++) {
            for(let y = 0; y < 10; y++) {
                const piece = hasItem[10 * x + y][1] ? <GardenItem gardenItemName={hasItem[10 * x +y][0]} /> : null;
                tempSquares.push(
                    <div onClick={(e) => handleSquareClick(e, hasItem[10 * x + y][1], x, y)} key={10 * x + y} style={{ cursor: 'pointer', width: '10%', height: '10%' }}>
                        <Square>{piece}</Square>
                    </div>
                );
            }
        }
        setSquares([...tempSquares]);
    }, [lastCoord, hasItem]);

    const updateMiniGarden = () => {
        var true_points = [];
        hasItem.forEach( function(item, idx) {
            if(item[0] !== 'empty') {
                true_points.push({idx: [item[0], 9 - idx % 10, Math.floor(idx / 10)]});
            }
        })

        db.collection('gardens')
        .doc(currentUser.uid)
        .set({
            coordinates: true_points,
        })
    }

    const handleSquareClick = function(event, containsItem, x, y) {

        // deal with the last square that was selected, if any
        if(square_ref.current != null) {
            square_ref.current.style.backgroundColor = 'white';
        }

        // deal with the new square
        if(containsItem) {
            event.target.style.backgroundColor = 'black';
            square_ref.current = event.target;
            setLastCoord([x, y]);
        } else {
            if(square_ref.current != null) {
                // console.log(lastCoord);
                var last_x = lastCoord[0], last_y = lastCoord[1];
                var temp_has_state = hasItem;
                temp_has_state[10 * x + y] = [temp_has_state[10 * last_x + last_y][0], true];
                temp_has_state[10 * last_x + last_y] = ['empty', false];
                setHasItem(temp_has_state);
                setLastCoord([]);

                updateMiniGarden(x, y);
            }
            square_ref.current = null;
        }
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