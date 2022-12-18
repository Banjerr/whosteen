import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import Zoom from 'react-medium-image-zoom';
import QRModal from './QRModal';
const frontendURL = process.env.REACT_APP_FRONTEND_URL;

type Img = {
    children: ImageData[];
    credit: number;
}

type ImageData = {
    props: {
        alt: string;
        src: string;
        text: string;
    }
}   

const ImageCard = (d: Img) => (
    <Card>
        <CardHeader>
            <h3>{d.children[1].props.alt}</h3>
        </CardHeader>
        <CardBody>
            <Zoom>
                <img 
                    src={d.children[1].props.src}
                    alt={d.children[1].props.alt} 
                />
            </Zoom>
        </CardBody>
        <CardFooter>
            <QRModal urlToShare={`${frontendURL}?shared-post=${d.children[2].props.text}`} />
        </CardFooter>  
    </Card>    
);

function Image(data: Img) {
    if (data?.children[1]?.props?.src) {
        return (
            ImageCard(data)
        );
    }
    return (
        <div className='song'><p>No image file found :(</p></div>
    );
}

export default Image;
