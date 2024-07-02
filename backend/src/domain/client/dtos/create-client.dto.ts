import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class CreateClientDto {
    @ApiProperty({ type: String, example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String, example: 'john.doe@mail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
};

export default CreateClientDto;