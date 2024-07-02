import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

import CreateClientDto from "./create-client.dto";

class UpdateClientDto extends PartialType(CreateClientDto) {
    @ApiProperty({ type: Number, example: '17' })
    @IsNotEmpty()
    @IsNumber()
    id: number;
};

export default UpdateClientDto;