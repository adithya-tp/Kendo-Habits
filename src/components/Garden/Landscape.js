import React from 'react';
import {
    land_both,
    land_dark,
    tree_one,
    tree_four
} from "../../garden/images";

import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../../garden/constants";
import Tile from "./Tile";

const Landscape = () => {
    const tiles = [];
    for (let i = WORLD_SIZE; i > 0; i--) {
        if(i === 1) {
            tiles.push(Array(WORLD_SIZE).fill('land_both'));
        } else {
            tiles.push(Array(WORLD_SIZE).fill('land_dark'));
        }
    }
    tiles[1][4] = 'tree_four';
    tiles[0][0] = 'tree_one';
    console.log(tiles);
    const yOffset = (100 / WORLD_SIZE) * (TILE_ASPECT_RATIO / 2.6);

    return (
        <>
            {
                tiles.map((row, y) => {
                    const yBase = yOffset * y + 20;
                    
                    const xBase = 50 - (100 / (4 * WORLD_SIZE)) * y;
                    return row.map((tile, x) => {
                        const z = x + 1;
                        const xAbs = xBase + (50 / (2 * WORLD_SIZE)) * x;
                        let yAbs = yBase + yOffset * x;
                        const yBaseCopy = yAbs;
                        let src;
                        if (tile === 'land_both') {
                            src = land_both;
                        } else if (tile === 'tree_four') {
                            yAbs = yAbs - 30;
                            src = tree_four;
                        } else if (tile === 'tree_one') {
                            yAbs = yAbs - 19;
                            src = tree_one;
                        } else {
                            src = land_dark;
                        }
                        return <Tile key={`${x}${y}`} src={src} x={xAbs} y={yAbs} z={z} ybase={yBaseCopy} />
                    })
                })
            }
        </>
    );
}

export default React.memo(Landscape);
