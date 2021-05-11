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
                {/* fetch x, y, and garden_item_type from firebase */}
                <GardenMini itemPosition={[4, 7]} />
            </div>
        </div>
    );
}

export default GardenPage;