import ListTag from "../../tag/interfaces/list-tag.interface";

interface GetClient {
    id: number;
    name: string;
    email: string;

    tags: ListTag[];
};

export default GetClient;