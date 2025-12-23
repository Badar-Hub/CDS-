import type { IMaterialIdentifiableObjectDto } from './imaterial-identifiable-object-dto';

export interface IClientMaterialPriceDto {
  material: IMaterialIdentifiableObjectDto;
  price: number;
}
