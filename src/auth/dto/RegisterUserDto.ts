import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    example: true,
    description:
      'The account holds an NFT in the specified collection. Reponds with true or false.',
  })
  email!: boolean;
}
