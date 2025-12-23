<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageLayout from 'layouts/Page/PageLayout.vue';
import { ColumnModel } from 'src/components/Table/column-model';
import type { IClientDto } from 'src/stores/Registrations/client/dtos/iclient-dto';
import { useClientStore } from 'src/stores/Registrations/client/client-store';

const clientStore = useClientStore();

const analyticsData = ref([
  {
    label: 'Total Clients',
    value: 100,
  },
  {
    label: 'Active Clients',
    value: 50,
  },
  {
    label: 'Credit Limit Reached',
    value: 20,
  },
  {
    label: 'Inactive Clients',
    value: 30,
  },
]);

const clients = ref<IClientDto[]>([]);

const search = ref('');

const columns = ref<ColumnModel[]>([
  new ColumnModel('code', 'Code', true, false, '', true, false),
  new ColumnModel('user', 'User', false, false, '', true, false, 'person'),
  new ColumnModel('type', 'Type', false, false, '', true, false, 'category'),
  new ColumnModel('mobile', 'Mobile', false, false, '', true, false, 'smartphone'),
  new ColumnModel('phone', 'Phone', false, false, '', true, false, 'phone'),
  new ColumnModel('branch', 'Branch', false, false, '', true, false, 'store'),
  new ColumnModel('registration', 'Registration', false, false, '', true, false, 'how_to_reg'),
  new ColumnModel('zone', 'Zone', false, false, '', true, false),
  new ColumnModel('refferedBy', 'Reffered By', false, false, '', true, false),
  new ColumnModel('status', 'Status', false, false, '', true, false, 'info'),
  new ColumnModel('comment', 'Comment', false, false, '', true, false),
  new ColumnModel('action', 'Action', false, false, '', true, false),
]);

const data = ref<unknown[]>([
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
  {
    code: '1234567890',
    user: 'john.doe@example.com',
    type: 'Mobile',
    mobile: '1234567890',
    phone: '1234567890',
    branch: 'Branch',
    registration: 'Registration',
    zone: 'Zone',
    refferedBy: 'Reffered By',
    status: 'Status',
    comment: 'Comment',
    action: 'Action',
  },
]);

onMounted(async () => {
  clients.value = await clientStore.getList();
});
</script>

<template>
  <PageLayout
    v-model:search="search"
    :content-data="analyticsData"
    :columns="columns"
    :data="data"
    page-title="Client Overview"
  />
</template>

<style lang="scss"></style>
