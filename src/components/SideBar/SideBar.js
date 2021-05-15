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
        text: "Your Habits: Visualized",
        icon: "k-i-graph",
        route: "/visualizations"
    },
    {
        separator: true,
    },
    {
        text: "Your Garden",
        icon: "k-i-snap-grid",
        route: "/garden"
    },
    {
        separator: true,
    },
];

const SideBar = (props) => {
    const [expanded, setExpanded] = useState(true);


    const onSelect = (e) => {
        props.history.push(e.itemTarget.props.route);
    };

    const setSelectedItem = (pathName) => {
        let currentPath = sidebarOptions.find((option) => option.route === pathName);
        if (currentPath && currentPath.text) {
            return currentPath.text;
        }
    };

    let selected = setSelectedItem(props.location.pathname);
    return (
        <div className="sidebar-dashboard">
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