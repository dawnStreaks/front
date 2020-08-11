export default {
  items: [
    {
      name: 'applications_board',
      url: '/LandingPage',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: 'statistics_board',
      url: '/dashboard',
      icon: 'fab fa-algolia',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'staticdashboard-view',
    },
    {
      name: 'ministry_board',
      url: '/ministrydepartmentperformance',
      icon: 'fab fa-algolia',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor'],
      allPermissions: 'ministrydashboard-view',
    },
    /*{
        title: true,
        name: '',
        // class: '',
        // wrapper: {
        //     element: '',
        //     attributes: {}
        // }
    },*/
    {
      name: 'prc_type',
      url: '/priority',
      icon: 'icon-puzzle',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'prctype-view',
    },
    {
      name: 'prc_range',
      url: '/priority/range',
      icon: 'icon-user',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'prcrange-view',
    },
    /* {
         name: 'PRC',
         url: '/priority',
         icon: 'icon-layers',
         roles: ['Admin', 'Director', 'manager', 'Supervisor', 'Employees'],
         //allPermissions: 'prctype-view',
         children: [
             {
                 name: 'PRC Types',
                 url: '/priority',
                 icon: 'icon-puzzle',
             },
             {
                 name: 'PRC Range',
                 url: '/priority/range',
                 icon: 'icon-directions'
             }
         ]
     },*/

    {
      name: 'users',
      icon: 'icon-user',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'user-view',
      children: [
        {
          name: 'users',
          url: '/users',
          icon: 'icon-user',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
          allPermissions: 'user-view',
        },
        {
          name: 'user_login_logs',
          url: '/loginlogs',
          icon: 'fa-clock-o',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
          allPermissions: 'reportskpi-view',
        },
      ]
    },
    /* {
         name: 'Update Credentials',
         url: '/updateCredentials',
         icon: 'icon-user'
     },*/
    {
      name: 'subtenant',
      url: '/tenant',
      icon: 'icon-user',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'subtenant-view',
    },
    {
      name: 'models',
      url: '/models',
      icon: 'icon-list',
      roles: ['Admin', 'Manager'],
      allPermissions: 'models-view',
    },
    {
      name: 'role',
      url: '/roles',
      icon: 'icon-list',
      roles: ['Admin', 'Manager'],
      allPermissions: 'role-view',
    },
    {
      name: 'groups',
      url: '/groups',
      icon: 'icon-list',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'group-view',
    },
    {
      name: 'task_list',
      url: '/tasklist',
      icon: 'icon-list',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'task-view',
    },

    {
      name: 'holiday',
      url: '/holiday',
      icon: 'icon-puzzle',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'process-view',
    },
    {
      name: 'strategy_list',
      url: '/strategyList',
      icon: 'icon-puzzle',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'process-view',
    },

    {
      name: 'process_list',
      url: '/process1',
      icon: 'icon-puzzle',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'process-view',
    },
  {
          name: 'risk_list',
          url: '/risklist',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'projects-view',
        },
    {
      name: 'process_category',
      url: '/processcategory',
      icon: 'icon-puzzle',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'process-view',
    },
    {
      name: 'camunda_process_list',
      url: '/process',
      icon: 'icon-list',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'process-view',
    },
    {
      name: 'kpi list',
      url: '/kpilist',
      icon: 'fa fa-crosshairs',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
      allPermissions: 'kpi-view',
    },
    {
      name: 'kpi reports',
      url: '#',
      icon: 'fa fa-file-contract',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
      allPermissions: 'reportskpi-view',
      children: [
        {
          name: 'quickview',
          url: '/gaugechartreport',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
        {
          name: 'processmap',
          url: '/mindmap',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
        {
          name: 'maintenance',
          url: '/maintenance',
          icon: 'icon-speedometer',
          roles: ['Admin'],
          allPermissions: 'maintenance-view',
        },
        {
          name: 'kpi_status_report',
          url: '/KpiStatusReport',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
        {
          name: 'kpi_pivot_report',
          url: '/KpiPivotReport',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
        {
          name: 'kpi_exception_report',
          url: '/KpiExceptionReport',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
        {
          name: 'kpi_performance_report',
          url: '/KpiPerformanceReport',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
        {
          name: 'unit_performance_report',
          url: '/UnitPerformanceReport',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
      ]
    },

    {
      name: 'organization_chart',
      url: '/organizationchart',
      icon: 'icon-list',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'organizationChart-view',
    },
    /*{
        name: 'gaugechart',
        url: '/gaugechart',
        icon: 'icon-list',
        roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
        allPermissions: 'gaugechart-view',
    },*/
    {
      name: 'forms',
      url: '/DynamicForms',
      icon: 'icon-list',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'forms-view',
    },
    {
      name: 'translations',
      url: '/Translations',
      icon: 'fa fa-language',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'translations-view',
    },
    {
      name: 'audittrial',
      url: '/audittrial',
      icon: 'fa fa-language',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees'],
      allPermissions: 'role-view',
    },

    {
      name: 'unit_performance',
      url: '#',
      icon: 'fa fa-file-contract',
      roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
      allPermissions: 'reportskpi-view',
      children: [
        {
          name: 'org_unit_performance',
          url: '/departmentperformance',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },

        {
          name: 'section_performance',
          url: '/sectionperformance',
          icon: 'icon-speedometer',
          roles: ['Admin', 'Director', 'Manager', 'Supervisor', 'Employees', 'Department Communicator', 'Strategy Executive'],
          allPermissions: 'reportskpi-view',
        },
      ]
    },
    /*{
        name: 'Colors',
        url: '/theme/colors',
        icon: 'icon-drop',
        roles: ['Admin'],
    },
    {
        name: 'Typography',
        url: '/theme/typography',
        icon: 'icon-pencil',
        roles: ['Admin'],
    },*/
    /*{
        title: true,
        name: 'Components',
        class: '',
        wrapper: {
            element: '',
            attributes: {}
        }
    },*/
    /*{
        name: 'Base',
        url: '/base',
        icon: 'icon-puzzle',
        roles: ['Admin'],
        children: [
            {
                name: 'Breadcrumbs',
                url: '/base/breadcrumbs',
                icon: 'icon-puzzle'
            },
            {
                name: 'Cards',
                url: '/base/cards',
                icon: 'icon-puzzle'
            },
            {
                name: 'Carousels',
                url: '/base/carousels',
                icon: 'icon-puzzle'
            },
            {
                name: 'Collapses',
                url: '/base/collapses',
                icon: 'icon-puzzle'
            },
            {
                name: 'Forms',
                url: '/base/forms',
                icon: 'icon-puzzle'
            },
            {
                name: 'Jumbotrons',
                url: '/base/jumbotrons',
                icon: 'icon-puzzle'
            },
            {
                name: 'List Groups',
                url: '/base/list-groups',
                icon: 'icon-puzzle'
            },
            {
                name: 'Navs',
                url: '/base/navs',
                icon: 'icon-puzzle'
            },
            {
                name: 'Navbars',
                url: '/base/navbars',
                icon: 'icon-puzzle'
            },
            {
                name: 'Paginations',
                url: '/base/paginations',
                icon: 'icon-puzzle'
            },
            {
                name: 'Popovers',
                url: '/base/popovers',
                icon: 'icon-puzzle'
            },
            {
                name: 'Progress Bars',
                url: '/base/progress-bars',
                icon: 'icon-puzzle'
            },
            {
                name: 'Switches',
                url: '/base/switches',
                icon: 'icon-puzzle'
            },
            {
                name: 'Tables',
                url: '/base/tables',
                icon: 'icon-puzzle'
            },
            {
                name: 'Tabs',
                url: '/base/tabs',
                icon: 'icon-puzzle'
            },
            {
                name: 'Tooltips',
                url: '/base/tooltips',
                icon: 'icon-puzzle'
            }
        ]
    },
    {
        name: 'Buttons',
        url: '/buttons',
        icon: 'icon-cursor',
        roles: ['Admin'],
        children: [
            {
                name: 'Buttons',
                url: '/buttons/standard-buttons',
                icon: 'icon-cursor'
            },
            {
                name: 'Button Dropdowns',
                url: '/buttons/dropdowns',
                icon: 'icon-cursor'
            },
            {
                name: 'Button Groups',
                url: '/buttons/button-groups',
                icon: 'icon-cursor'
            },
            {
                name: 'Brand Buttons',
                url: '/buttons/brand-buttons',
                icon: 'icon-cursor'
            }
        ]
    },
    {
        name: 'Charts',
        url: '/charts',
        icon: 'icon-pie-chart',
        roles: ['Admin'],
    },
    {
        name: 'Icons',
        url: '/icons',
        icon: 'icon-star',
        roles: ['Admin'],
        children: [
            {
                name: 'CoreUI Icons',
                url: '/icons/coreui-icons',
                icon: 'icon-star',
                badge: {
                    variant: 'info',
                    text: 'NEW'
                }
            },
            {
                name: 'Flags',
                url: '/icons/flags',
                icon: 'icon-star'
            },
            {
                name: 'Font Awesome',
                url: '/icons/font-awesome',
                icon: 'icon-star',
                badge: {
                    variant: 'secondary',
                    text: '4.7'
                }
            },
            {
                name: 'Simple Line Icons',
                url: '/icons/simple-line-icons',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Notifications',
        url: '/notifications',
        icon: 'icon-bell',
        roles: ['Admin'],
        children: [
            {
                name: 'Alerts',
                url: '/notifications/alerts',
                icon: 'icon-bell'
            },
            {
                name: 'Badges',
                url: '/notifications/badges',
                icon: 'icon-bell'
            },
            {
                name: 'Modals',
                url: '/notifications/modals',
                icon: 'icon-bell'
            }
        ]
    },
    {
        name: 'Widgets',
        url: '/widgets',
        icon: 'icon-calculator',
        roles: ['Admin'],
        badge: {
            variant: 'primary',
            text: 'NEW'
        }
    },
    {
        divider: true
    },
    /!*{
        title: true,
        name: 'Extras',
    },*!/
    {
        name: 'Pages',
        url: '/pages',
        icon: 'icon-star',
        roles: ['Admin'],
        children: [
            {
                name: 'Login',
                url: '/pages/login',
                icon: 'icon-star'
            },
            {
                name: 'Register',
                url: '/pages/register',
                icon: 'icon-star'
            },
            {
                name: 'Error 404',
                url: '/pages/404',
                icon: 'icon-star'
            },
            {
                name: 'Error 500',
                url: '/pages/500',
                icon: 'icon-star'
            }
        ]
    },
    {
        name: 'Download CoreUI',
        url: 'http://coreui.io/vue/',
        icon: 'icon-cloud-download',
        roles: ['Admin'],
        class: 'mt-auto',
        variant: 'success'
    },
    {
        name: 'Try CoreUI PRO',
        url: 'http://coreui.io/pro/vue/',
        icon: 'icon-layers',
        roles: ['Admin'],
        variant: 'danger'
    }*/
  ]
}
