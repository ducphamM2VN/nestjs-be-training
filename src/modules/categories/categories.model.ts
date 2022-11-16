import { ApiProperty } from "@nestjs/swagger";

export class Category {
  @ApiProperty()
  name: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  photo: string;
  @ApiProperty()
  status: boolean;
}
