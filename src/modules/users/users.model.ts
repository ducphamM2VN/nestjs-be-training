import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  adress: string;
}
