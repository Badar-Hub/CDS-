import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // Dashboard routes
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('pages/EmptyPage.vue'),
        meta: { icon: 'dashboard' },
      },

      // Sale routes
      {
        path: 'sale',
        name: 'Sale',
        component: () => import('pages/EmptyPage.vue'),
        meta: { icon: 'point_of_sale' },
        children: [
          {
            path: '',
            name: 'SaleIndex',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'point_of_sale' },
          },
          {
            path: 'invoice',
            name: 'Invoice',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'description' },
          },
          {
            path: 'job-board',
            name: 'Job Board',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'dashboard' },
          },
          {
            path: 'jobs',
            name: 'Jobs',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'work' },
          },
          {
            path: 'receive-payment',
            name: 'Receive Payment',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'payments' },
          },
        ],
      },

      // Account routes
      {
        path: 'account',
        name: 'Account',
        component: () => import('pages/EmptyPage.vue'),
        meta: { icon: 'account_balance' },
        children: [
          {
            path: '',
            name: 'AccountIndex',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'account_balance' },
          },
          {
            path: 'account-type',
            name: 'Account Type',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'category' },
          },
          {
            path: 'cof',
            name: 'Chart of Account',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'attach_money' },
          },
          {
            path: 'expense',
            name: 'Expense',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'money_off' },
          },
          {
            path: 'journal-voucher',
            name: 'Journal Voucher',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'receipt_long' },
          },
          {
            path: 'transaction',
            name: 'Transaction',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'swap_horiz' },
          },
        ],
      },

      // Registration routes
      {
        path: 'registration',
        name: 'Registration',
        component: () => import('pages/EmptyPage.vue'),
        meta: { icon: 'app_registration' },
        children: [
          {
            path: '',
            name: 'RegistrationIndex',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'app_registration' },
          },
          {
            path: 'branch',
            name: 'Branch',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'store' },
          },
          {
            path: 'client',
            name: 'Client',
            component: () => import('pages/Registration/Client/ClientOverview.vue'),
            meta: { icon: 'people' },
          },
          {
            path: 'department',
            name: 'Department',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'business' },
          },
          {
            path: 'employee',
            name: 'Employee',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'badge' },
          },
          {
            path: 'product',
            name: 'Product',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'inventory_2' },
          },
          {
            path: 'workflow-template',
            name: 'Workflow Template',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'account_tree' },
          },
          {
            path: 'zone',
            name: 'Zone',
            component: () => import('pages/EmptyPage.vue'),
            meta: { icon: 'location_on' },
          },
        ],
      },

      // Report routes
      {
        path: 'report',
        name: 'Report',
        component: () => import('pages/EmptyPage.vue'),
        meta: { icon: 'assessment' },
      },

      // Setting routes
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('pages/EmptyPage.vue'),
        meta: { icon: 'settings' },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'NotFound',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { icon: 'error' },
  },
];

export default routes;
