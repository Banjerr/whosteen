import axios from 'axios';

export default async function getData(url: string) {
    try {
        const res = await axios.get(url);
        return res.data.data;
    } catch (error) {
        return error;
    }
}