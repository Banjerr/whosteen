import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import rehypeRaw from "rehype-raw";
import QRModal from './QRModal';
const frontendURL = process.env.REACT_APP_FRONTEND_URL;

type PostDataWrapper = {
    children: PostData[]
}

type PostData = {
    props: {
        alt: string;
        src: string;
        text: string;
    }
}

const PostCard = (data: PostDataWrapper) => (
    <Card>
        <CardHeader>
            <h3>{data.children[1].props.alt}</h3>
        </CardHeader>
        <CardBody>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={data.children[1].props.src} />
        </CardBody>  
        <CardFooter>
            <QRModal urlToShare={`${frontendURL}?shared-post=${data.children[2].props.text}`} />
        </CardFooter>         
    </Card>
);

function Post(data: PostDataWrapper) {
    if (data?.children[1]?.props?.src) {
        return (
            PostCard(data)
        );
    }
    return (
        <div className='song'><p>No post found :(</p></div>
    );
}

export default Post;
