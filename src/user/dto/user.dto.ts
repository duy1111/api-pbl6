import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Expose()
  @ApiProperty({ type: String })
  @Matches(/^[a-zA-Z0-9_ ]{6,20}$/)
  name: string;

  @IsOptional()
  @Expose()
  @ApiProperty({ type: String })
  gender: string;

  @IsOptional()
  @Expose()
  @ApiProperty({ type: String })
  avatarUrl: string;

  @IsOptional()
  @Expose()
  @ApiProperty({ type: String })
  phoneNumber: string;
}
