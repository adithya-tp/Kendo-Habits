import React from 'react';
import { AppBar, AppBarSection, AppBarSpacer, Avatar } from "@progress/kendo-react-layout";
import './HabitAppBar.css';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router';

let kendokaAvatar = "https://www.telerik.com/kendo-react-ui-develop/images/kendoka-react.png";

const HabitAppBar = ({ userName }) => {
    const { logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        console.log("clicked");
        try {
            await logout();
            history.push("/");
        } catch {
            console.log("Could not log out!");
        }
    }

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
                        <img alt="kendo-avatar" src={kendokaAvatar} />
                    </Avatar>
                </AppBarSection>

                <AppBarSpacer style={{width: 32}}/>

                
                <AppBarSection style={{ backgroundColor:"#FDF074", width: "20px", padding: "0 5px", borderRadius: "5px",}}>
                    <span style={{ cursor: "pointer" }} onClick={handleLogout} className="k-icon k-i-logout" />
                </AppBarSection>
            </AppBar>
        </>
    );
}

export default HabitAppBar;