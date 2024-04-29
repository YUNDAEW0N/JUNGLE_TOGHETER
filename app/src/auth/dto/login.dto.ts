import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @ApiProperty({
        description: 'email of the login user',
        example: 'test@test.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'passwrod of the login user',
        example: 'PASSWORD',
    })
    @IsString()
    @IsNotEmpty()
    pwd: string;
}
