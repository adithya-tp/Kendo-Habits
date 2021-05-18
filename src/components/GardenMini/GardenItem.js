import React from 'react';

const gardenItemStyle = {
    fontSize: 18,
    fontWeight: 'bold',
    cursor: 'move',
};

const GardenItem = ( {gardenItemName}) => {

    var itemIcon = '';
    if(gardenItemName === 'tree_one') {
        itemIcon = '🟢';
    } else if (gardenItemName === 'tree_two') {
        itemIcon = '🟣';
    } else if (gardenItemName === 'tree_three') {
        itemIcon = '🟠';
    } else if (gardenItemName === 'tree_four') {
        itemIcon = '🔴';
    }
    return (
        <div style={{...gardenItemStyle}}>{itemIcon}</div>        
    );
}

export default GardenItem;