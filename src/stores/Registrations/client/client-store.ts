import { defineStore } from 'pinia';
import ApiService from 'src/services/api-service';
import type { IIdentifiableObjectDto } from 'src/stores/interfaces/iidentifiable-object-dto';
import type { SimpleResponseDto } from 'src/stores/interfaces/isimple-response-dto';
import type { IClientDto } from './dtos/iclient-dto';
import type { IPageDto } from 'src/stores/interfaces/ipage-dto';

// const accountStore = useAccountStore();

export const useClientStore = defineStore('clientStore', {
  state: () => ({
    baseUrl: '/client',
    pageUrl: '/Client/paginated',
    clients: [] as IClientDto[],
    clientList: [] as IIdentifiableObjectDto[],
    clientsPage: {} as IPageDto<IClientDto>,
  }),

  actions: {
    async getList(forceUpdate?: boolean): Promise<IClientDto[]> {
      if (this.clients.length > 0 && !forceUpdate) {
        return this.clients;
      }
      this.clients = await ApiService.get<IClientDto[]>(this.baseUrl);
      return this.clients;
    },
    async getPaginatedList(pageNumber: number, rowsPerPage: number): Promise<IPageDto<IClientDto>> {
      const url = `${this.pageUrl}?pageNumber=${pageNumber}&rowsPerPage=${rowsPerPage}`;

      this.clientsPage = await ApiService.get<IPageDto<IClientDto>>(url);
      return this.clientsPage;
    },
    async getIdentifiableList(): Promise<IIdentifiableObjectDto[]> {
      this.clientList = (await this.getList()).map((x) => ({
        id: x.id!,
        name: x.name,
        code: x.code,
      }));
      return this.clientList;
    },
    async create(client: IClientDto): Promise<SimpleResponseDto> {
      const res = await ApiService.post<SimpleResponseDto>(this.baseUrl, client);
      // await accountStore.getList(true);
      if (this.clientsPage.pageNumber && this.clientsPage.rowsPerPage) {
        await this.getPaginatedList(this.clientsPage.pageNumber, this.clientsPage.rowsPerPage);
      }
      return res;
    },
    async update(updatedClient: IClientDto): Promise<SimpleResponseDto> {
      const res = await ApiService.put<SimpleResponseDto>(this.baseUrl, updatedClient);
      // await accountStore.getList(true);
      if (this.clientsPage.pageNumber && this.clientsPage.rowsPerPage) {
        await this.getPaginatedList(this.clientsPage.pageNumber, this.clientsPage.rowsPerPage);
      }
      return res;
    },
    async delete(clientId: number): Promise<SimpleResponseDto> {
      const res = await ApiService.delete<SimpleResponseDto>(`${this.baseUrl}/${clientId}`);
      // await accountStore.getList(true);
      if (this.clientsPage.pageNumber && this.clientsPage.rowsPerPage) {
        await this.getPaginatedList(this.clientsPage.pageNumber, this.clientsPage.rowsPerPage);
      }
      return res;
    },
  },
});
