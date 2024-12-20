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
}
