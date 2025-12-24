<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageLayout from 'layouts/Page/PageLayout.vue';
import ClientDialog from './ClientDialog.vue';
import { ColumnModel } from 'src/components/Table/column-model';
import { useClientStore } from 'src/stores/Registrations/client/client-store';
import type { IClientDto } from 'src/stores/Registrations/client/dtos/iclient-dto';
import type { IPagination } from 'src/components/Table/interfaces/pagination';

const clientStore = useClientStore();
const showDialog = ref(false);

const analyticsData = ref([
  {
    label: 'Total Clients',
    value: 100,
    icon: 'trending_up',
  },
  {
    label: 'Active Clients',
    value: 50,
    icon: 'trending_up',
  },
  {
    label: 'Credit Limit Reached',
    value: 20,
    icon: 'trending_down',
  },
  {
    label: 'Inactive Clients',
    value: 30,
    icon: 'trending_down',
  },
]);

const clients = ref<IPagination<IClientDto>>({
  data: [],
  pageNumber: 1,
  rowsPerPage: 10,
  totalPages: 0,
  totalRows: 0,
});

const search = ref('');

const columns = ref<ColumnModel[]>([
  new ColumnModel('code', 'Code', true, false, '', true, false),
  new ColumnModel('name', 'Name', false, false, '', true, false, 'person'),
  new ColumnModel(
    (row: IClientDto): string => (row.clientType && row.clientType.name) || '',
    'Type',
    false,
    false,
    '',
    true,
    false,
    'category',
  ),
  new ColumnModel(
    (row: IClientDto) => (row.mobileNumber !== '0' ? row.mobileNumber : 'N/A'),
    'Mobile',
    false,
    false,
    '',
    true,
    false,
    'smartphone',
  ),
  new ColumnModel(
    (row: IClientDto) => (row.phoneNumber !== '0' ? row.phoneNumber : 'N/A'),
    'Phone',
    false,
    false,
    '',
    true,
    false,
    'phone',
  ),
  new ColumnModel(
    (row: IClientDto) => (row.printingCenter && row.printingCenter.name) || '',
    'Branch',
    false,
    false,
    '',
    true,
    false,
    'store',
  ),
  new ColumnModel(
    (row: IClientDto) =>
      row.registrationDate ? new Date(row.registrationDate).toLocaleDateString() : 'N/A',
    'Registration',
    false,
    false,
    '',
    true,
    false,
    'how_to_reg',
  ),
  new ColumnModel(
    (row: IClientDto) => (row.zone && row.zone.name) || '',
    'Zone',
    false,
    false,
    '',
    true,
    false,
  ),
  new ColumnModel(
    (row: IClientDto) => (row.referredBy && row.referredBy.name) || 'N/A',
    'Reffered By',
    false,
    false,
    '',
    true,
    false,
  ),
  new ColumnModel(
    (row: IClientDto) => (row.status === 1 ? 'Active' : 'Inactive'),
    'Status',
    false,
    false,
    '',
    true,
    false,
    'info',
  ),
  new ColumnModel(
    (row: IClientDto) => row.comments || 'N/A',
    'Comment',
    false,
    false,
    '',
    true,
    false,
  ),
  new ColumnModel('action', 'Action', false, false, '', true, false),
]);

const fetchClients = async (pageNumber: number, rowsPerPage: number = 10) => {
  const page = await clientStore.getPaginatedList(pageNumber, rowsPerPage);
  clients.value.data = page.data;
  clients.value.pageNumber = page.pageNumber;
  clients.value.rowsPerPage = page.rowsPerPage;
  clients.value.totalPages = page.totalPages;
  clients.value.totalRows = page.totalRows;
};

const handlePageChange = async (page: number) => {
  await fetchClients(page, clients.value.rowsPerPage);
};

const handleCreateNew = () => {
  showDialog.value = true;
};

const handleClientCreated = async () => {
  await fetchClients(clients.value.pageNumber, clients.value.rowsPerPage);
};

onMounted(async () => {
  await fetchClients(1, 10);
});
</script>

<template>
  <PageLayout
    v-model:search="search"
    :content-data="analyticsData"
    :columns="columns"
    :data="clients.data"
    page-title="Client Overview"
    entity-name="clients"
    :pagination="{
      page: clients.pageNumber,
      rowsPerPage: clients.rowsPerPage,
      rowsNumber: clients.totalRows,
    }"
    @page-change="handlePageChange"
    @create-new="handleCreateNew"
  />

  <ClientDialog
    v-model="showDialog"
    @created="handleClientCreated"
  />
</template>

<style lang="scss"></style>
