import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateTagDto {
    @ApiProperty({ type: String, example: 'Tag Name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: 'A1:B2:C3:D4:E5' })
    @IsNotEmpty()
    @IsString()
    mac: string;

    @ApiProperty({ type: String, example: '0,52' })
    @IsNotEmpty()
    @IsString()
    price: number;

    @ApiProperty({ type: String, example: '0000-00-00T00:00:00' })
    @IsNotEmpty()
    @IsDateString()
    leased?: Date;
};

export default CreateTagDto;