import React from 'react';
import {
    Timeline,
    Events,
    themes,
    createTheme
} from '@merc/react-timeline';
import 'react-medium-image-zoom/dist/styles.css'

import componentSwitch from '../utilities/timelineComponentSwitch';

const theme = createTheme(themes.default, {
    timeline: {
        backgroundColor: '#fff',
    },
    timelineTrack: {
        backgroundColor: '#CE1141',
        width: '2px'
    },
    date: {
        backgroundColor: '#EAAA00',
        color: '#fff',
    },
    marker: {
        border: "2px solid #CE1141",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        zIndex: 100
    },
    button: {
        backgroundColor: '#CE1141',
    },
});

export default function TimelineComponent(data: unknown[]) {
    return (
        <Timeline theme={theme}>
            <Events>
                {
                    data && data.length ?
                        data.map((d, i) => {
                            return (
                                componentSwitch(d, i)
                            );
                        })
                        : null
                }
            </Events>
        </Timeline>
    );
}
