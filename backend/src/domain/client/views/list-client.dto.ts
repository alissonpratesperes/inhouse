import { Exclude, Expose } from "class-transformer";

@Exclude()
class ListClientDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;
};

export default ListClientDto;