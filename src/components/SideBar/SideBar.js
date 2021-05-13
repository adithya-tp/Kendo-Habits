import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";

import React from 'react';
import { useState } from "react";
import { withRouter } from "react-router-dom";
import './SideBar.css';

const sidebarOptions = [
    {
        text: "Your Daily Habits",
        icon: "k-i-inbox",
        selected: true,
        route: "/user"
    },
    {
        separator: true,
    },
    {
        text: "Your Habit Streaks",
        icon: "k-i-stumble-upon-box",
        route: "/habit-streak"
    },
    {
        separator: true,
    },
    {
        text: "Your Garden",
        icon: "k-i-tri-state-null",
        route: "/garden"
    },
    {
        separator: true,
    },
];

const SideBar = (props) => {
    const [expanded, setExpanded] = useState(true);
    // const handleClick = () => {
    //     setExpanded(!expanded);
    // };

    const onSelect = (e) => {
        props.history.push(e.itemTarget.props.route);
    };

    const setSelectedItem = (pathName) => {
        let currentPath = sidebarOptions.find((option) => option.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    };

    let selected = setSelectedItem(props.location.pathname);
    return (
        <div className="sidebar-dashboard">
            {/* <div className="custom-toolbar">
                <Button icon="menu" look="flat" onClick={handleClick} />
                <span className="mail-box">Kendo Habits Menu</span>
            </div> */}
            <Drawer
                expanded={expanded}
                position={"start"}
                mode={"push"}
                mini={true}
                items={sidebarOptions.map((option) => ({
                ...option,
                selected: option.text === selected,
                }))}
                onSelect={onSelect}
            >
                <DrawerContent>{props.children}</DrawerContent>
            </Drawer>
        </div>
    );
}

export default withRouter(SideBar);