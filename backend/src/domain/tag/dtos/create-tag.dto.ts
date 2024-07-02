import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class CreateTagDto {
    @ApiProperty({ type: String, example: 'Tag Name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: 'A1:B2:C3:D4:E5' })
    @IsNotEmpty()
    @IsString()
    mac: string;
};

export default CreateTagDto;