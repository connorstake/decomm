import { ApiProperty } from '@nestjs/swagger';

export class OwnershipCheckRequestDto {
  @ApiProperty({
    example: '0x912845718dudh19d38dj8313d',
    description: 'Account Address',
  })
  accountAddress!: string;

  @ApiProperty({
    example: '["0x912845718dudh19d38dj8313d", "0x982j19228e91rj8dh" ]',
    description: 'Array of NFT Contract Addresses',
  })
  contractAddresses!: string[];

  @ApiProperty({
    example: '1',
    description: 'the Unique chainID of the specified NFT collection',
  })
  chainId!: string;

  //   @ApiProperty({
  //     example: 'ERC721',
  //     description: 'The token standard of the NFT collection',
  //   })
  //   tokenType!: string;
}
