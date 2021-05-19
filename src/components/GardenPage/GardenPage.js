import React, { useEffect, useState } from 'react';
import Garden from '../Garden/Garden';
import './GardenPage.css';
import '../Garden/game.css';
import GardenMini from '../GardenMini/GardenMini';
import { auth, db } from '../../firebase';
import { useHistory } from 'react-router';

const GardenPage = () => {
    const [currentUser, setCurrentUser] = useState();
    const history = useHistory();
    const [cloudCoordinates, setCloudCoordinates] = useState([]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setCurrentUser(authUser);
                
                db.collection('gardens')
                .doc(authUser.uid)
                .onSnapshot((snapshot) => {
                    var temp_cloud = []
                    snapshot.data().coordinates.map((coordinate) => {
                        temp_cloud.push([coordinate.idx[0], coordinate.idx[1], coordinate.idx[2]]);
                    });
                    setCloudCoordinates(temp_cloud);
                });
            } else {
                history.push('/');
            }
        });
        return unsubscribe;
    }, [currentUser]);

    return (
        <div className="garden__page">
            <Garden itemPositions={cloudCoordinates} />
            <div className="mini__garden">
                {/* fetch x, y, and garden_item_type from firebase */}
                <GardenMini />
            </div>
        </div>
    );
}

export default GardenPage;