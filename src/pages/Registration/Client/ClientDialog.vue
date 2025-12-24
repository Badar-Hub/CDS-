<script setup lang="ts">
import { ref, computed } from 'vue';
import type { IClientDto } from 'src/stores/Registrations/client/dtos/iclient-dto';
import type { IIdentifiableObjectDto } from 'src/stores/interfaces/iidentifiable-object-dto';
import { useClientStore } from 'src/stores/Registrations/client/client-store';
import CdsInput from 'src/components/Form/CdsInput.vue';
import CdsSelect from 'src/components/Form/CdsSelect.vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'created'): void;
}>();

const clientStore = useClientStore();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

const activeTab = ref('clients');

// Form state
const getInitialFormState = () => ({
  name: '',
  userName: '',
  email: '',
  password: '',
  code: 'CLI001',
  registrationDate: new Date().toISOString().split('T')[0],
  clientInvoiceDate: new Date().getTime(),
  address: '',
  mobileNumber: '',
  phoneNumber: '',
  creditAmount: 5,
  comments: '',
  status: 1,
  materialPrices: [],
});

const clientForm = ref(getInitialFormState());
const invoiceDate = ref(new Date().toISOString().split('T')[0]);
const countryName = ref('');

// Dropdown options (these would typically come from stores)
const typeOptions = ref<IIdentifiableObjectDto[]>([]);
const branchOptions = ref<IIdentifiableObjectDto[]>([]);
const zoneOptions = ref<IIdentifiableObjectDto[]>([]);
const referredByOptions = ref<IIdentifiableObjectDto[]>([]);

// Selected dropdown values
const selectedType = ref<IIdentifiableObjectDto | null>(null);
const selectedBranch = ref<IIdentifiableObjectDto | null>(null);
const selectedZone = ref<IIdentifiableObjectDto | null>(null);
const selectedReferredBy = ref<IIdentifiableObjectDto | null>(null);

const statusOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 0 },
  { label: 'Defaulter', value: 2 },
];

const creditUnitOptions = ['in Millions', 'in Thousands', 'in Units'];
const creditMultiplierOptions = ['> 10', '> 100', '> 1000'];

const selectedCreditUnit = ref('in Millions');
const selectedCreditMultiplier = ref('> 10');

const generateCode = () => {
  const randomNum = Math.floor(Math.random() * 900) + 100;
  clientForm.value.code = `CLI${randomNum}`;
};

const resetForm = () => {
  clientForm.value = getInitialFormState();
  invoiceDate.value = new Date().toISOString().split('T')[0];
  countryName.value = '';
  selectedType.value = null;
  selectedBranch.value = null;
  selectedZone.value = null;
  selectedReferredBy.value = null;
};

const handleCancel = () => {
  resetForm();
  isOpen.value = false;
};

const handleSubmit = async () => {
  const clientData: IClientDto = {
    ...clientForm.value,
    clientType: selectedType.value ?? undefined,
    printingCenter: selectedBranch.value ?? undefined,
    zone: selectedZone.value ?? undefined,
    referredBy: selectedReferredBy.value ?? undefined,
  } as IClientDto;

  await clientStore.create(clientData);
  emit('created');
  handleCancel();
};
</script>

<template>
  <q-dialog
    v-model="isOpen"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="client-dialog">
      <q-card-section class="dialog-header q-pb-none">
        <div class="text-body2 text-grey-7">
          Client > <span class="text-primary">Create New</span>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-md">
        <q-tabs
          v-model="activeTab"
          dense
          class="text-grey-7"
          active-color="primary"
          indicator-color="primary"
          align="center"
          narrow-indicator
        >
          <q-tab name="clients" icon="people" label="Clients" />
          <q-tab name="pricelist" icon="list_alt" label="Price list" />
        </q-tabs>
        <q-separator />
      </q-card-section>

      <q-card-section class="q-pt-lg dialog-content">
        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="clients" class="q-pa-none">
            <!-- Header Section -->
            <div class="row items-center justify-between q-mb-lg">
              <div class="column">
                <div class="text-h5 text-weight-bold">Create New Client</div>
                <div class="text-body2 text-grey-7">Enter user details to register</div>
              </div>
              <div class="row items-center q-gutter-sm">
                <q-input v-model="clientForm.code" outlined dense readonly class="code-input" />
                <q-btn flat round icon="refresh" color="primary" size="sm" @click="generateCode" />
              </div>
            </div>

            <!-- Date and Avatar Section -->
            <div class="row items-center justify-between q-mb-lg">
              <div class="column items-center">
                <div class="text-body2 text-grey-7 q-mb-sm">Invoice Date</div>
                <q-input v-model="invoiceDate" dense type="date" class="date-input">
                  <template #prepend>
                    <q-icon name="event" color="primary" />
                  </template>
                </q-input>
              </div>

              <q-avatar size="80px" class="avatar-placeholder">
                <q-icon name="person" size="50px" color="grey-5" />
              </q-avatar>

              <div class="column items-center">
                <div class="text-body2 text-grey-7 q-mb-sm">Registration Date</div>
                <q-input
                  v-model="clientForm.registrationDate"
                  outlined
                  dense
                  type="date"
                  class="date-input"
                >
                  <template #prepend>
                    <q-icon name="event" color="primary" />
                  </template>
                </q-input>
              </div>
            </div>

            <!-- Status Radio Buttons -->
            <div class="row justify-center q-mb-lg">
              <q-option-group
                v-model="clientForm.status"
                :options="statusOptions"
                color="primary"
                inline
              />
            </div>

            <!-- Form Fields -->
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <CdsInput v-model="clientForm.userName" placeholder="User" icon="person_outline" />
              </div>
              <div class="col-6">
                <CdsSelect v-model="selectedType" :options="typeOptions" label="Type" icon="sell" />
              </div>

              <div class="col-6">
                <CdsInput
                  v-model="clientForm.email"
                  placeholder="Email"
                  icon="mail_outline"
                  type="email"
                />
              </div>
              <div class="col-6">
                <CdsInput
                  v-model="clientForm.mobileNumber"
                  placeholder="Phone/ Mobile No."
                  icon="phone"
                />
              </div>

              <div class="col-6">
                <CdsSelect
                  v-model="selectedBranch"
                  :options="branchOptions"
                  label="Branch"
                  icon="location_on"
                />
              </div>
              <div class="col-6">
                <CdsSelect
                  v-model="selectedZone"
                  :options="zoneOptions"
                  label="Zone"
                  icon="my_location"
                />
              </div>

              <div class="col-6">
                <CdsSelect
                  v-model="selectedReferredBy"
                  :options="referredByOptions"
                  label="Referred by"
                  icon="group_add"
                />
              </div>
              <div class="col-6">
                <CdsInput v-model="countryName" placeholder="Country" icon="public" />
              </div>

              <div class="col-12">
                <CdsInput v-model="clientForm.address" placeholder="Address" icon="location_on" />
              </div>

              <div class="col-12">
                <CdsInput
                  v-model="clientForm.comments"
                  placeholder="Comments"
                  icon="chat_bubble_outline"
                />
              </div>
            </div>

            <!-- Credit Limit Section -->
            <div class="credit-limit-section q-mt-lg">
              <div class="row items-center justify-between q-mb-sm">
                <div class="row items-center q-gutter-sm">
                  <q-icon name="verified_user" color="primary" />
                  <span class="text-body1">Credit Limit</span>
                </div>
                <div class="row q-gutter-sm">
                  <CdsSelect
                    v-model="selectedCreditUnit"
                    :options="creditUnitOptions"
                    icon="lock"
                    class="credit-select"
                  />
                  <CdsSelect
                    v-model="selectedCreditMultiplier"
                    :options="creditMultiplierOptions"
                    icon="filter_list"
                    class="credit-select"
                  />
                </div>
              </div>

              <q-slider
                v-model="clientForm.creditAmount"
                :min="0"
                :max="10"
                :step="1"
                label
                label-always
                color="primary"
                markers
                class="q-mx-md"
              />

              <div class="row items-center justify-center q-mt-md q-gutter-md">
                <span class="text-body2 text-grey-7">Accepted limit</span>
                <CdsInput
                  v-model="clientForm.creditAmount"
                  class="credit-input"
                  placeholder="Type here or Move the slider to select a limit"
                />
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="pricelist" class="q-pa-none">
            <div class="text-h6 text-center q-py-xl text-grey-6">
              Price list configuration coming soon...
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>

      <!-- Action Buttons -->
      <q-card-actions align="center" class="q-pa-lg">
        <q-btn
          label="Create Client"
          icon-right="arrow_forward"
          color="primary"
          unelevated
          class="action-btn"
          @click="handleSubmit"
        />
        <q-btn label="Cancel" outline color="primary" class="action-btn" @click="handleCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.client-dialog {
  width: 100%;
  max-width: 900px;
  margin: auto;
  border-radius: 8px;
}

.dialog-content {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
}

.code-input {
  width: 100px;

  :deep(.q-field__control) {
    background-color: $light-page;
  }
}

.date-input {
  width: 180px;

  :deep(.q-field__control) {
    background-color: $light-page;
  }
}

.avatar-placeholder {
  background-color: #e0e0e0;
  border: 2px solid #bdbdbd;
}

.credit-limit-section {
  background-color: $light-page;
  border-radius: 8px;
  padding: 16px;
}

.credit-select {
  min-width: 120px;
}

.credit-input {
  min-width: 300px;
}

.action-btn {
  min-width: 150px;
  padding: 8px 24px;
}

.body--dark {
  .client-dialog {
    background-color: $dark;
  }

  .code-input,
  .date-input {
    :deep(.q-field__control) {
      background-color: $dark-page;
    }
  }

  .credit-limit-section {
    background-color: $dark-page;
  }

  .avatar-placeholder {
    background-color: #424242;
    border-color: #616161;
  }
}
</style>
