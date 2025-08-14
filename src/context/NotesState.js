import React, { useState } from 'react';
import NotesContext from './NotesContext';

const NotesState = (props) => {
    const state = [
        {
            "_id": "689d55f133a6f11c8c1c9459",
            "user": "6891bf0b79d95955450483e2",
            "title": "AI-Powered Resume Builder",
            "description": "A web app that helps users create professional resumes using AI-driven suggestions.",
            "tag": "career",
            "date": "2025-08-14T03:20:17.626Z",
            "__v": 0
        },
        {
            "_id": "689d561a33a6f11c8c1c945b",
            "user": "6891bf0b79d95955450483e2",
            "title": "Healthy Meal Planner",
            "description": "An app that generates weekly meal plans based on dietary preferences and available ingredients.",
            "tag": "health",
            "date": "2025-08-14T03:20:58.195Z",
            "__v": 0
        },
        {
            "_id": "689d561e33a6f11c8c1c945d",
            "user": "6891bf0b79d95955450483e2",
            "title": "Crypto Price Tracker",
            "description": "A dashboard for tracking cryptocurrency prices in real-time with historical data charts.",
            "tag": "finance",
            "date": "2025-08-14T03:21:02.214Z",
            "__v": 0
        },
        {
            "_id": "689d562833a6f11c8c1c945f",
            "user": "6891bf0b79d95955450483e2",
            "title": "Eco-Friendly Travel Guide",
            "description": "A platform suggesting sustainable travel options and green hotels around the world.",
            "tag": "travel",
            "date": "2025-08-14T03:21:12.419Z",
            "__v": 0
        },
        {
            "_id": "689d563233a6f11c8c1c9461",
            "user": "6891bf0b79d95955450483e2",
            "title": "Online Language Exchange",
            "description": "A service connecting language learners with native speakers for practice sessions.",
            "tag": "education",
            "date": "2025-08-14T03:21:22.155Z",
            "__v": 0
        },
        {
            "_id": "689d563933a6f11c8c1c9463",
            "user": "6891bf0b79d95955450483e2",
            "title": "Daily Mindfulness Coach",
            "description": "An app that sends short daily mindfulness and meditation exercises.",
            "tag": "wellness",
            "date": "2025-08-14T03:21:29.433Z",
            "__v": 0
        },
        {
            "_id": "689d564133a6f11c8c1c9465",
            "user": "6891bf0b79d95955450483e2",
            "title": "Remote Team Task Manager",
            "description": "A collaboration tool designed for remote teams to track projects and assign tasks.",
            "tag": "productivity",
            "date": "2025-08-14T03:21:37.486Z",
            "__v": 0
        },
        {
            "_id": "689d564a33a6f11c8c1c9467",
            "user": "6891bf0b79d95955450483e2",
            "title": "Smart Home Energy Monitor",
            "description": "An IoT-based device and dashboard to monitor and optimize home energy consumption.",
            "tag": "technology",
            "date": "2025-08-14T03:21:46.074Z",
            "__v": 0
        },
        {
            "_id": "689d565433a6f11c8c1c9469",
            "user": "6891bf0b79d95955450483e2",
            "title": "Local Event Finder",
            "description": "An app that shows concerts, meetups, and community events happening nearby.",
            "tag": "lifestyle",
            "date": "2025-08-14T03:21:56.815Z",
            "__v": 0
        },
        {
            "_id": "689d565c33a6f11c8c1c946b",
            "user": "6891bf0b79d95955450483e2",
            "title": "Personal Finance Mentor",
            "description": "A budgeting app that teaches financial literacy while tracking expenses.",
            "tag": "finance",
            "date": "2025-08-14T03:22:04.295Z",
            "__v": 0
        }
    ];
    const [notes, setNotes] = useState(state);

    return (
        <NotesContext.Provider value={{notes, setNotes }}>
            {props.children}
        </NotesContext.Provider>
    );
};

export default NotesState;
