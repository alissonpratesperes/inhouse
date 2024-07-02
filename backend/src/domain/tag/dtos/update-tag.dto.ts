import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import CreateTagDto from "./create-tag.dto";

class UpdateClientDto extends PartialType(CreateTagDto) {
    @ApiProperty({ type: Number, example: '34' })
    @IsNotEmpty()
    @IsNumber()
    id: number;
};

export default UpdateClientDto;