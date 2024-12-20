import { ApiProperty } from '@nestjs/swagger';

export class OwnershipCheckRequestDto {
  @ApiProperty({
    example: '0x912845718dudh19d38dj8313d',
    description: 'Account Address',
  })
  accountAddress!: string;

  @ApiProperty({
    example: '0x912845718dudh19d38dj8313d',
    description: 'NFT Contract Address',
  })
  contractAddress!: string;
}
