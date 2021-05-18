import React from 'react';
import Garden from '../Garden/Garden';
import './GardenPage.css';
import '../Garden/game.css';
import GardenMini from '../GardenMini/GardenMini';

const GardenPage = () => {
    return (
        <div className="garden__page">
            <Garden itemPositions={[['tree_one', 0, 0], ['tree_four', 4, 0], ['tree_two', 1, 4], ['tree_two', 8, 1], ['tree_three', 5, 4]]}/>
            <div className="mini__garden">
                {/* fetch x, y, and garden_item_type from firebase */}
                <GardenMini itemPositions={[[0, 0], [1, 4], [8, 1]]} />
            </div>
        </div>
    );
}

export default GardenPage;