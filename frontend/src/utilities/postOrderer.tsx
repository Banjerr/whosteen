export default function postOrderer(data: any) {
    return data.sort((a: any, b: any) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        console.log('a',dateA);
        console.log('b',dateB)
        if (dateA < dateB) {
            return -1;
        }

        if (dateA > dateB) {
            return 1;
        }

        return 0;
    });
}