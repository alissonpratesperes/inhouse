import { Exclude, Expose, plainToInstance, Transform } from "class-transformer";

import ListTagDto from "src/domain/tag/views/list-tag.dto";

@Exclude()
class GetClientDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    @Transform((data) => plainToInstance(ListTagDto, data.obj.tags))
    tags: ListTagDto[];
};

export default GetClientDto;