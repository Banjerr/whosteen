import {
    ImageEvent,
    TextEvent,
} from '@merc/react-timeline';
import 'react-medium-image-zoom/dist/styles.css';
import Song from "../components/Song";
import Video from '../components/Video';
import Image from '../components/Image';
import formatDate from './formatDate';
import Post from '../components/Post';
const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function componentSwitch(d: any, i: any) {
    let component,
        body;
    switch (d.type) {        
        case 'song':
            component = <ImageEvent marker={() => <span>🎸</span>} className={`song-type song-type-${d.id}`} key={i + 1} date={d.attributes.date} credit={`song-type-${d.attributes.song.data.id}`} src={d.attributes.song.data.attributes.url} alt={d.attributes.title} card={Song} />;
            break;
        case 'video':
            component = <ImageEvent marker={() => <span>🎥</span>} className={`video-type video-type-${d.id}`} key={i + 1} credit={`image-type-${d.attributes.video.data.id}`} date={d.attributes.date} src={d.attributes.video.data.attributes.url} alt={d.attributes.title} card={Video} />;
            break;
        case 'picture':
            component = <ImageEvent date={d.attributes.date}
                marker={() => <span>📷</span>}
                credit={`picture-type-${d.attributes.image.data.id}`}
                src={backendURL + d.attributes.image.data.attributes.url}
                alt={d.attributes.title}
                key={i + 1}
                className={`picture-type picture-type-${d.id}`}
                card={Image}
            />
            break;
        case 'post':
            body = d.attributes.body.replace(/\/uploads/g, `${backendURL}/uploads`);
            component = <ImageEvent credit={`post-type-${d.id}`} marker={() => <span>💌</span>} className={`post-type post-type-${d.id}`} key={i + 1} date={formatDate(d.attributes.date)} src={body} alt={d.attributes.title} card={Post} />
            break;
        default:
            component = <TextEvent key={i + 1} text="No Posts Found :(" />;
            break;
    }
    return component;
}