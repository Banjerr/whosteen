const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function strapiURLFinder(requestedDataType: string) {
    if (requestedDataType === 'song') {
        return `${backendURL}/api/songs?populate=%2A`;
    }
    if (requestedDataType === 'post') {
        
        return `${backendURL}/api/posts?populate=%2A`;
    }
    if (requestedDataType === 'picture') {
        
        return `${backendURL}/api/pictures?populate=%2A`;
    }
    if (requestedDataType === 'video') {
        
        return `${backendURL}/api/videos?populate=%2A`;
    }
    if (requestedDataType === 'about') {

        return `${backendURL}/api/about-info?populate=%2A`;
    }
    return "";
}