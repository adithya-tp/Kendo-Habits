import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth, db } from '../../firebase';
import { Chart, ChartSeries } from '@progress/kendo-react-charts';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import './VizPage.css';

const VizPage = () => {

    const [currentUser, setCurrentUser] = useState();
    const [appbarDisplay, setAppbarDisplay] = useState('');
    const [habitsData, setHabitsData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setCurrentUser(authUser);
                setAppbarDisplay(authUser.displayName);

                db.collection('users')
                .doc(authUser.uid)
                .collection('dailyHabits')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {
                    setHabitsData(
                        snapshot.docs.map(
                            doc => ({
                                id: doc.id,
                                    habit: doc.data().habit,
                                    habitCounts: doc.data().habitCounts,
                            })
                        )
                    )
                });

                console.log(habitsData);
            } else {
                history.push('/');
            }
        });
        return unsubscribe;
    }, []);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const today = new Date(Date.now());
    console.log(today.getFullYear());
    console.log(today.getMonth());

    return (
        <div className="viz__page">
            <HabitAppBar userName={appbarDisplay} />
        </div>
    );
}

export default VizPage;