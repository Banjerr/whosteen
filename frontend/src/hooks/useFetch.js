import { useEffect, useState } from "react";
import contentGatherer from "../utilities/contentGatherer";
import postOrderer from "../utilities/postOrderer";

export default function useFetch(dataToFetch) {
    const [loading, isLoading] = useState(true);
    const [error, showError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let data = await contentGatherer(dataToFetch);
                setData(data);
                isLoading(false);
            } catch (error) {
                console.error('error fetching data', error);
                showError(true);
            }
        }
        fetchData();
    }, [dataToFetch]);

    return { data, loading, error };
}