import getData from './getData';
import strapiURLFinder from './strapiDataFetcher';

async function contentGatherer(dataToFetch: any): Promise<any[]> {
    let data: any[] = [];
    for (const key in dataToFetch) {
        if (Object.hasOwnProperty.call(dataToFetch, key)) {
            const propValue = dataToFetch[key];
            if (!propValue) continue;
            const urlToFetch = strapiURLFinder(key);
            try {
                const respData = await getData(urlToFetch);
                if (Array.isArray(respData)) {
                    respData.forEach(el => {
                        data.push({
                            ...el,
                            type: key
                        });
                    });
                } else {
                    data.push({
                        ...respData,
                        type: key
                    });
                }                
            } catch (error) {
                console.error('error getting data', error);
                return [];
            }
        }
    }
    return data;
}

export default contentGatherer;