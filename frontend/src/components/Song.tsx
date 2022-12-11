import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import QRModal from './QRModal';
const backendURL = process.env.REACT_APP_BACKEND_URL;

type SongDataWrapper = {
    children: SongData[];
    date: Date;
}

type SongData = {
    props: {
        alt: string;
        src: string;
        text: string;
    }
}

const SongCard = (data: SongDataWrapper) => (
    <Card id={`song-type-${data.date}`}>
        <CardHeader>
            <h3>{data.children[1].props.alt}</h3>
        </CardHeader>
        <CardBody>
            <ReactAudioPlayer
                src={`${data.children[1].props.src}`}
                controls
            />
        </CardBody>   
        <CardFooter>
            <QRModal urlToShare={`${backendURL}?shared-post=${data.children[2].props.text}`} />
        </CardFooter>      
    </Card>
);

function Song(data: SongDataWrapper) {
    if (data?.children[1]?.props?.src) {
        return (
            SongCard(data)
        );
    }
    return (
        <div className='song'><p>No audio file found :(</p></div>
    );
}

export default Song;
