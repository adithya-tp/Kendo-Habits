import React from 'react';
import Garden from '../Garden/Garden';
import './GardenPage.css';
import '../Garden/game.css';
import GardenMini from '../GardenMini/GardenMini';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const GardenPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="garden__page">
                <Garden />
                <div className="mini__garden">
                    {/* fetch x, y, and garden_item_type from firebase */}
                    <GardenMini itemPosition={[[0, 0], [1, 4], [2, 2]]} />
                </div>
            </div>
        </DndProvider>
    );
}

export default GardenPage;