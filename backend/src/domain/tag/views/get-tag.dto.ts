import { Exclude, Expose, plainToInstance, Transform } from "class-transformer";

import ListClientDto from "src/domain/client/views/list-client.dto";

@Exclude()
class GetTagDto {
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

    @Expose()
    @Transform((data) => plainToInstance(ListClientDto, data.obj.client))
    client: ListClientDto;
};

export default GetTagDto;