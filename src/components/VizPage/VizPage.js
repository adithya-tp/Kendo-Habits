import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth, db } from '../../firebase';
import { 
    ChartTooltip, 
    Chart, 
    ChartSeriesItem, 
    ChartCategoryAxis, 
    ChartCategoryAxisItem, 
    ChartSeries, 
    ChartTitle, 
    ChartLegend,
    ChartValueAxis,
    ChartValueAxisItem,
} from '@progress/kendo-react-charts';
import HabitAppBar from '../HabitAppBar/HabitAppBar';
import './VizPage.css';
import { Card } from '@progress/kendo-react-layout';

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
                                    currStreak: doc.data().currStreak,
                                    longestStreak: doc.data().longestStreak,
                            })
                        )
                    )
                });

                // console.log(habitsData);
            } else {
                history.push('/');
            }
        });
        return unsubscribe;
    }, []);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const hidden = {
        visible: false,
    };
    const tooltipRender = ({ point }) => {
        const { value } = point;
        return (
            <span>
                Longest Streak: {value.current}
            </span>
        );
    };

    const tooltipRenderCurrent = ({ point }) => {
        const { value } = point;
        return (
            <span>
                Current Streak: {value.current}
            </span>
        );
    };
    const habitPlotBands = [
        {
            from: 21,
            to: 31,
            color: "#FFFF46",
            opacity: 1,
        },
        {
            from: 12,
            to: 21,
            color: "#FA6520",
            opacity: 1,
        },
        {
            from: 5,
            to: 12,
            color: "#FA2020",
            opacity: 1,
        },
        {
            from: 0,
            to: 5,
            color: "#920F0F",
            opacity: 1,
        }
    ];


    return (
        <div className="viz__page">
            <HabitAppBar userName={appbarDisplay} />
                <div className="charts__wrapper">
                    <div className="line__chart">
                        <Card
                            style={{
                                padding: "0 10px 20px 10px",
                                borderRadius: "15px",
                                width: "30vw",
                                height: "38vh"
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'Arvo',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>Monthly Habit Patterns</h2>
                            <Chart>
                                <ChartLegend position="top" orientation="horizontal" />
                                <ChartCategoryAxis>
                                    <ChartCategoryAxisItem categories={months} startAngle={45} />
                                </ChartCategoryAxis>
                                <ChartSeries>
                                    {habitsData.map((item, idx) => (
                                        <ChartSeriesItem
                                            key={idx}
                                            type="line"
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

                            <h4 style={{
                                fontFamily: 'Arvo',
                                textAlign: 'center',
                                marginTop: '2px'
                            }}>(Right Click Legends to Toggle)</h4>
                        </Card>
                    </div>
                    <div className="longest__streaks">
                        <Card
                            style={{
                                borderRadius: "15px",
                                padding: "5px 10px 20px 10px",
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'Arvo',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>Longest Habit Streaks</h2>
                            {
                                habitsData.map((item, idx) => (
                                    <>
                                        <Chart
                                            key={item.id}
                                            style={{
                                                height:120,
                                            }}
                                        >
                                            <ChartTitle text={`${item.habit}`} />
                                            <ChartSeries>
                                                <ChartSeriesItem type="bullet" color="#fff" data={[[item.longestStreak, 0]]} />
                                            </ChartSeries>
                                            <ChartCategoryAxis>
                                            <ChartCategoryAxisItem
                                                majorGridLines={hidden}
                                                minorGridLines={hidden}
                                            />
                                            </ChartCategoryAxis>
                                            <ChartValueAxis>
                                            <ChartValueAxisItem
                                                majorGridLines={hidden}
                                                minorTicks={hidden}
                                                min={0}
                                                max={31}
                                                plotBands={habitPlotBands}
                                            />
                                            </ChartValueAxis>
                                            <ChartTooltip render={tooltipRender} />
                                        </Chart>
                                    </>
                                ))
                            }
                        </Card>
                    </div>

                    <div className="current__streaks">
                        <Card
                            style={{
                                borderRadius: "15px",
                                padding: "5px 10px 20px 10px",
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'Arvo',
                                textAlign: 'center',
                                marginTop: '10px'
                            }}>Current Habit Streaks</h2>
                            {
                                habitsData.map((item, idx) => (
                                    <>
                                        <Chart
                                            key={item.id}
                                            style={{
                                                height:120,
                                            }}
                                        >
                                            <ChartTitle text={`${item.habit}`} />
                                            <ChartSeries>
                                                <ChartSeriesItem type="bullet" color="#fff" data={[[item.currStreak, 0]]} />
                                            </ChartSeries>
                                            <ChartCategoryAxis>
                                            <ChartCategoryAxisItem
                                                majorGridLines={hidden}
                                                minorGridLines={hidden}
                                            />
                                            </ChartCategoryAxis>
                                            <ChartValueAxis>
                                            <ChartValueAxisItem
                                                majorGridLines={hidden}
                                                minorTicks={hidden}
                                                min={0}
                                                max={31}
                                                plotBands={habitPlotBands}
                                            />
                                            </ChartValueAxis>
                                            <ChartTooltip render={tooltipRenderCurrent} />
                                        </Chart>
                                    </>
                                ))
                            }
                        </Card>
                    </div>
                </div>

                <div className="column__chart">
                        <Card
                            style={{
                                padding: "0 10px 20px 10px",
                                borderRadius: "15px",
                                width: "30vw",
                                height: "40vh"
                            }}
                        >
                            <h2 style={{
                                fontFamily: 'Arvo',
                                textAlign: 'center',
                            }}>Habit Comparison</h2>
                            <Chart>
                                <ChartLegend position="top" orientation="horizontal" />
                                <ChartCategoryAxis>
                                    <ChartCategoryAxisItem categories={months} startAngle={45} />
                                </ChartCategoryAxis>
                                <ChartSeries>
                                    {habitsData.map((item, idx) => (
                                        <ChartSeriesItem
                                            key={idx}
                                            type="column"
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

                            <h4 style={{
                                fontFamily: 'Arvo',
                                textAlign: 'center',
                                marginTop: '2px'
                            }}>(Right Click Legends to Toggle)</h4>
                        </Card>
                    </div>
            </div>
    );
}

export default VizPage;