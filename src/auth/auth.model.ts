import { ApiProperty } from "@nestjs/swagger";

export class UserInfo {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    id: string;
    @ApiProperty()
    token: string;
}

export class LoginSchema {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class RegisterSchema {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}

export class TokenSchema {
    @ApiProperty()
    token: string;
}
