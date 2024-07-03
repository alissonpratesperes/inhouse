import ListClient from "../../client/interfaces/list-client.interface";

interface GetTag {
    id: number;
    name: string;
    mac: string;
    price: number;
    leased: Date;

    client: ListClient;
};

export default GetTag;