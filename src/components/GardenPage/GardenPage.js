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
                <Garden itemPositions={[['tree_one', 0, 0], ['tree_four', 4, 0], ['tree_two', 1, 4], ['tree_two', 8, 1], ['tree_three', 5, 4]]}/>
                <div className="mini__garden">
                    {/* fetch x, y, and garden_item_type from firebase */}
                    <GardenMini itemPosition={[[0, 0], [1, 4], [8, 1]]} />
                </div>
            </div>
        </DndProvider>
    );
}

export default GardenPage;