import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth, db } from '../../firebase';
import { Chart, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartSeries, ChartTitle, ChartLegend } from '@progress/kendo-react-charts';
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

    return (
        <div className="viz__page">
            <HabitAppBar userName={appbarDisplay} />
            <div className="area__chart">
                <Chart
                    style={{
                        height:350,
                    }}
                >
                    <ChartTitle text="Area Chart" />
                    <ChartLegend position="top" orientation="horizontal" />
                    <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={months} startAngle={45} />
                    </ChartCategoryAxis>
                    <ChartSeries>
                        {habitsData.map((item, idx) => (
                            <ChartSeriesItem
                                key={idx}
                                type="area"
                                tooltip={{
                                    visible: true
                                }}
                                visible={true}
                                data={item.habitCounts}
                                name={item.habit}
                            />
                        ))}
                    </ChartSeries>
                </Chart>
            </div>
        </div>
    );
}

export default VizPage;