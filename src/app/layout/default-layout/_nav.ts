import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Customer',
    // url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Manual Entry',
        url: '/manual',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Bulk Entry',
        url: '/bulk',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Customer View',
        url: '/customerData',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Invoice',
    // url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Bulk Invoice',
        url: '/uploadInvoice',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'List Invoice',
        url: '/listInvoice',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Payment',
    // url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Transaction History',
        url: '/paymentHistory',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Mark Payment As Cash',
        url: '/markCash',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    name: 'Credentials',
    title:true,
  },
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      }
]
