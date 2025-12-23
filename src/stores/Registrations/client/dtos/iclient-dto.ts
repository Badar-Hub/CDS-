import type { IIdentifiableObjectDto } from 'src/stores/interfaces/iidentifiable-object-dto';
import type { IClientMaterialPriceDto } from './iclient-material-price-dto';

export interface IClientDto {
  id?: number;
  name: string;
  email: string;
  userName: string;
  password: string;
  code: string;
  registrationDate: string;
  address: string;
  mobileNumber: string;
  phoneNumber: string;
  creditAmount: number;
  comments: string;
  printingCenter?: IIdentifiableObjectDto;
  materialPrices: IClientMaterialPriceDto[];
  status: number;
  countryLocation?: IIdentifiableObjectDto;
  zone?: IIdentifiableObjectDto;
  clientType?: IIdentifiableObjectDto;
  referredBy?: IIdentifiableObjectDto;
  clientInvoiceDate: number;
}
