import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

class LeaseTagDto {
    @ApiProperty({ type: Number, example: '34' })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ type: String, example: '0000-00-00T00:00:00' })
    @IsNotEmpty()
    @IsDateString()
    leased: Date;

    @ApiProperty({ type: Number, example: '2' })
    @IsNotEmpty()
    @IsNumber()
    clientId: number;
};

export default LeaseTagDto;