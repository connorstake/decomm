import { ApiProperty } from '@nestjs/swagger';

export class OwnershipCheckResponseDto {
  @ApiProperty({
    example: true,
    description:
      'The account holds an NFT in the specified collection. Reponds with true or false.',
  })
  owned!: boolean;
}
