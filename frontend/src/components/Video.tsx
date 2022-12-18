import React from 'react';
import ReactPlayer from 'react-player';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react';
import QRModal from './QRModal';
const frontendURL = process.env.REACT_APP_FRONTEND_URL;

type VideoDataWrapper = {
    children: VideoData[];
    text: number;
}

type VideoData = {
    props: {
        alt: string;
        src: string;
        text: number;
    }
}

const VideoCard = (data: VideoDataWrapper) => (
    <Card>
        <CardHeader>
            <h3>{data.children[1].props.alt}</h3>
        </CardHeader>
        <CardBody>
            <ReactPlayer width={'100%'} height={'auto'} controls={true} url={data.children[1].props.src} />
        </CardBody>   
        <CardFooter>
            <QRModal urlToShare={`${frontendURL}?shared-post=${data.children[2].props.text}`} />
        </CardFooter>     
    </Card>
);

function Video(data: VideoDataWrapper) {
    if (data?.children[1]?.props?.src) {
        return (
            VideoCard(data)
        );
    }
    return (
        <div className='song'><p>No video file found :(</p></div>
    );
}

export default Video;
