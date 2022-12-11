export default function postOrderer(data: any) {
    return data.sort((a: any, b: any) => {
        const dateA = new Date(a.attributes.date).getTime();
        const dateB = new Date(b.attributes.date).getTime();
        if (dateA < dateB) {
            return -1;
        }

        if (dateA > dateB) {
            return 1;
        }

        return 0;
    });
}