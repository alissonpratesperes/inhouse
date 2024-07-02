import { Exclude, Expose } from "class-transformer";

@Exclude()
class ListTagDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    mac: string;

    @Expose()
    price: number;

    @Expose()
    leased: Date;
};

export default ListTagDto;