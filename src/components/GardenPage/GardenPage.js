import React from 'react';
import Garden from '../Garden/Garden';
import './GardenPage.css';
import '../Garden/game.css';
import GardenMini from '../GardenMini/GardenMini';

const GardenPage = () => {
    return (
        <div className="garden__page">
            <Garden />
            <div className="mini__garden">
                <GardenMini itemPosition={[4, 6]} />,
            </div>
        </div>
    );
}

export default GardenPage;