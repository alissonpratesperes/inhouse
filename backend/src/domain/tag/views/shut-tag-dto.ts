import { Exclude, Expose } from "class-transformer";

@Exclude()
class ShutTagDto {
    @Expose()
    cost: number;

    @Expose()
    time: number;
};

export default ShutTagDto;