import React from 'react';
import { AppBar, AppBarSection, AppBarSpacer, Avatar } from "@progress/kendo-react-layout";
import './HabitAppBar.css';

let kendokaAvatar = "https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png";

const HabitAppBar = ({ userName }) => {
    console.log(userName);
    return (
        <>
            <AppBar className="habit__appbar">
                <AppBarSection>
                    <h2 className="appbar__name">Kendo-Habits</h2>
                </AppBarSection>

                <AppBarSpacer />

                <AppBarSection>
                    <h3 className="user__welcome">Welcome back {userName}!</h3>
                </AppBarSection>
                <AppBarSection>
                    <Avatar shape="circle" type="image">
                        <img src={kendokaAvatar} />
                    </Avatar>
                </AppBarSection>
            </AppBar>
        </>
    );
}

export default HabitAppBar;