import { Image, Spinner } from '@chakra-ui/react';
import Zoom from 'react-medium-image-zoom';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import contentGatherer from '../utilities/contentGatherer';

export default function AboutComponent() {
    const [loading, isLoading] = useState(true);
    const [error, showError] = useState(false);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let data = await contentGatherer({
                    song: false,
                    post: false,
                    picture: false,
                    video: false,
                    about: true
                });
                setData(data);
                isLoading(false);
            } catch (error) {
                console.error('error fetching data', error);
                showError(true);
            }
        }
        fetchData();
    }, []);

    return (
        error ? 
            <p className='about-info'>Error... :(</p> : 
            loading ?
                <Spinner className='about-info' /> :
                <div
                    className='about-info'
                >
                    {
                        data[0].attributes.Quote ? <h3>{data[0].attributes.Quote}</h3> : null
                    }
                    <Zoom>
                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={data[0].attributes.Picture.data.attributes.url}
                            alt='Justin Redden'
                        />
                    </Zoom>           
                    <ReactMarkdown rehypePlugins={[rehypeRaw]} children={data[0].attributes.about} />
                </div>
    );
}