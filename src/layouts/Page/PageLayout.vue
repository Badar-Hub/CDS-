<script setup lang="ts">
import { ref } from 'vue';
import CdsTable from 'components/Table/CdsTable.vue';
import { ColumnModel } from 'components/Table/column-model';

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
</script>
<template>
  <div class="block full-width">
    <div class="row full-width justify-between">
      <div class="column q-px-lg">
        <h4 class="q-my-xs">Header</h4>
        <h6 class="q-my-xs">Sales > <strong>Client</strong></h6>
      </div>
      <div class="q-px-lg q-my-auto">
        <q-btn label="Create New" icon="add" color="primary" />
      </div>
      <div class="col-12">
        <q-separator />
      </div>
    </div>
    <div class="row q-px-md q-mt-lg full-width justify-between">
      <div class="col-3 row content">
        <div class="row content-container">
          <q-avatar size="60px" class="q-my-auto q-mx-lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column q-ml-sm">
            <h6 class="q-my-none">24</h6>
            <h6 class="q-my-none text-body2">Total Clients</h6>
          </div>
        </div>
      </div>
      <div class="col-3 row content">
        <div class="row content-container">
          <q-avatar size="60px" class="q-my-auto q-mx-lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column q-ml-sm">
            <h6 class="q-my-none">19</h6>
            <h6 class="q-my-none text-body2">Active Clients</h6>
          </div>
        </div>
      </div>
      <div class="col-3 row content">
        <div class="row content-container">
          <q-avatar size="60px" class="q-my-auto q-mx-lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column q-ml-sm">
            <h6 class="q-my-none">10</h6>
            <h6 class="q-my-none text-body2">Credit Limit reached</h6>
          </div>
        </div>
      </div>
      <div class="col-3 row content">
        <div class="row content-container">
          <q-avatar size="60px" class="q-my-auto q-mx-lg">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column q-ml-sm">
            <h6 class="q-my-none">5</h6>
            <h6 class="q-my-none text-body2">Inactive clients</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row full-width q-px-lg q-my-lg">
      <div class="col-12 row justify-between q-mb-lg">
        <q-input v-model="search" outlined dense debounce="400" placeholder="Search">
          <template #prepend>
            <q-icon name="search" />
          </template>
        </q-input>
        <div class="row">
          <q-btn icon="filter_list" size="18px" flat label="Filters" color="primary" no-caps />
          <q-btn icon="more_vert" size="18px" flat label="More" color="primary" no-caps />
        </div>
      </div>
      <CdsTable
        class="full-width"
        :columns="columns"
        :data="data"
        :pagination="{ page: 1, rowsPerPage: 10 }"
        entity-name="clients"
        last-updated="Last Updated 1min Ago"
        enableExport
        exportFileName="clients"
      />
    </div>
  </div>
</template>

<style lang="scss">
.content {
  padding: 10px;
  .content-container {
    width: 100%;
    background-color: $light-page;
    border-radius: 8px;
    padding: 10px;
  }
}

.body--dark .content {
  .content-container {
    background-color: #46505b;
  }
}
</style>
