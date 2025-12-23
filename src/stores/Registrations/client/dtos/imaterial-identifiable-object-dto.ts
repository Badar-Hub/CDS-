import type { IIdentifiableObjectDto } from 'src/stores/interfaces/iidentifiable-object-dto';

export interface IMaterialIdentifiableObjectDto extends IIdentifiableObjectDto {
  retailRate: number;
}
