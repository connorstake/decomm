import { ApiProperty } from '@nestjs/swagger';
import { NFTOwnerhshipDetails } from 'src/token-verify/types/NftOwnershipDetailsType';

export class OwnershipCheckResponseDto implements NFTOwnerhshipDetails {
  @ApiProperty({
    example: true,
    description:
      'The account holds an NFT in the specified collection. Reponds with true or false.',
  })
  owned!: boolean;

  @ApiProperty({
    example: 2,
    description:
      'The number of NFTs an account holds of a specified collection',
  })
  amountOwned!: number;

  @ApiProperty({
    example: ['10293824', '10293824'],
    description: 'The unique ids of the NFTs owned by the specified account',
  })
  ids: string[];

  @ApiProperty({
    example: '0x1dj37dh1938hd3d3',
    description: 'The contract address of a given NFT',
  })
  contractAddress: string;
}
