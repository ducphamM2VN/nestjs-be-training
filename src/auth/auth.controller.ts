import { Body, Controller, Get, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { IResponse } from "src/shared/models/response.model";
import { LoginSchema, RegisterSchema } from "./auth.model";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    public login(@Body() body: LoginSchema) : Promise<IResponse> {
        return this.authService.login(body.email, body.password);
    }

    @Post('register')
    public register(@Body() body: RegisterSchema) : Promise<IResponse>  {
        return this.authService.register(body);
    }

    @Get('isLogging')
    public isLogging() : Promise<IResponse> {
        return this.authService.isLoging();
    }

    @Get('logout')
    public logout() : Promise<IResponse> {
        return this.authService.logOut();
    }
}