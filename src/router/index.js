import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import {i18n} from '../plugins/i18n.js';

var currentUrl = window.location.pathname;
var result = currentUrl.split('/');
var Param = result[result.length - 2];
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')
const DefaultLandingPage = () => import('@/containers/DefaultLandingPage')
const KpiStatusReport = () => import('@/views/reports/KpiStatusReport')
const KpiPivotReport = () => import('@/views/reports/KpiPivotReport')
const KpiExceptionReport = () => import('@/views/reports/KpiExceptionReport')
const KpiPerformanceReport = () => import('@/views/reports/KpiPerformanceReport')
const UnitPerformanceReport = () => import('@/views/reports/UnitPerformanceReport')
// Views
const Dashboard = () => import('@/views/Dashboard')
const testDashboard = () => import('@/views/testDashboard')
const Landingpage = () => import('@/views/landingpage')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

// Views - Components
const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')
const gaugechart = () => import('@/components/gaugecharts/gaugechart')
const sectiontreemap = () => import('@/components/sectiontreemap/SectionTreeMap')
const mindmap = () => import('@/components/mindmap/mindmap')
const maintenance = () => import('@/components/maintenance/maintenance')
const gaugechartreport = () => import('@/components/gaugecharts/gaugechartreport')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/components/auth/Login')
const Register = () => import('@/views/pages/Register')
const Profile = () => import('@/components/user/Profile')
const Reset = () => import('@/components/auth/Reset.vue')
const CreatePassword = () => import('@/components/auth/CreatePassword.vue')

// Users
const Users = () => import('@/components/user/Users');
const User = () => import('@/components/user/User');
const RolesUser = () => import('@/components/roles/roles');
const ObjectModels = () => import('@/components/models/objectmodels');

const GroupTanents = () => import('@/components/groupsTenant/GroupTenants');
const GroupTanent = () => import('@/components/groupsTenant/GroupTenant');

const Tanents = () => import('@/components/tenant/Tenants');
const Tanent = () => import('@/components/tenant/Tenant');
const Orgchart = () => import('@/components/tenant/Orgchart');
const TaskList = () => import('@/components/taskList/TaskLists');
const TaskListNew = () => import('@/components/taskList/TaskListNew');
const ProcessList = () => import('@/components/process/ProcessList');
const ProcessTask = () => import('@/components/process/ProcessTask');
const updateCredentials = () => import('@/components/user/updateCredentials');
const ProcessInstance = () => import('@/components/process/ProcessInstance');
const Priority = () => import('@/components/priority/Priority');
const PriorityRange = () => import('@/components/priority/PriorityRange');
const organizationchart = () => import('@/components/organizationchart/organizationchart');

const process_list = () => import('@/components/process1/process_list');
const ProcessCategory = () => import('@/components/processcategory/ProcessCategory');
const strategy_list = () => import('@/components/strategyList/strategy_list');
const holiday = () => import('@/components/holidays/holiday');


const KpiList = () => import('@/components/kpiList');
const newFormGenerator = () => import('@/components/newFormGenerator');
const kpivalues = () => import('@/components/kpivalues');
// const kpihistory = () => import('@/components/kpiHistory');


const DynamicForms = () => import('@/components/DynamicForms');
const Translations = () => import('@/components/translationadmin');
const kpivalueshistory = () => import('@/components/kpivalueshistory');

const loginlogs = () => import('@/components/loginlogs/loginlog');
const audittrial = () => import('@/components/audittrial/audittrial');
const sectionperformance = () => import('@/components/unitperformance/sectionperformance');
const departmentperformance = () => import('@/components/unitperformance/departmentperformance');
const ministrydepartmentperformance = () => import('@/components/ministryunitperformance/departmentperformance');
const treeselect = () => import('@/components/treeselect/treeselect');

const risklist = () => import('@/components/risks/risklist');
const riskdefinition = () => import('@/components/risks/riskdefinition');
const riskupdation = () => import('@/components/risks/riskupdation');


Vue.use(Router)

var RoutesArray = [
  {
    path: '/',
    component: Login,
    meta: {
      auth: false
    }
  },
  /* {
     path: '/Orgchart',
     name: 'Orgchart',
     component: Orgchart,
     //props: true

   },*/
  {
    path: '/auth',
    name: 'Login',
    redirect: '/',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '/auth/password/reset/request',
    name: 'Reset',
    component: Reset,
    meta: {
      auth: false
    }
  },
  {
    path: '/auth/password/reset/:token',
    name: 'CreatePassword',
    component: CreatePassword,
    meta: {
      auth: false
    }
  },
  {
    meta: {
      auth: true,
    },
    path: '/',
    redirect: '/landingpage',
    //name: 'Home',
    component: DefaultLandingPage,
    children: [
      {
        path: 'landingpage',
        name: 'applications_board',
        component: Landingpage
      }
    ]
  },
  {
    meta: {
      auth: true,
    },
    path: '/',
    redirect: 'dashboard',
    name: 'dashboard',
    component: DefaultContainer,
    children: [
      {
        path: 'dashboard',
        //name: 'Dashboard',
        component: testDashboard,
        children: [
          {
            path: ':id',
            name: 'dashboard',
            component: testDashboard,
          },
        ]
      },
      /*{
        path: 'testDashboard',
        //name: 'Dashboard',
        component: testDashboard,
        children: [
          {
            path: ':id',
            name: 'testDashboard',
            component: testDashboard,
          },
        ]
      },*/
      {
        path: 'KpiStatusReport',
        //name: 'Dashboard',
        component: KpiStatusReport,
        children: [
          {
            path: ':id',
            name: 'KpiStatusReport',
            component: KpiStatusReport,
          },
        ]
      },
      {
        path: 'KpiPivotReport',
        //name: 'Dashboard',
        component: KpiPivotReport,
        children: [
          {
            path: ':id',
            name: 'KpiPivotReport',
            component: KpiPivotReport,
          },
        ]
      },

      {
        path: 'KpiExceptionReport',
        //name: 'Dashboard',
        component: KpiExceptionReport,
        children: [
          {
            path: ':id',
            name: 'KpiExceptionReport',
            component: KpiExceptionReport,
          },
        ]
      },
{
        path: 'risklist',
        meta: {label: 'risk_list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/risklist',
            component: risklist,
          },
	{
            path: ':id',
            component: risklist,
         	 },

        ]
      },
 {
        path: 'riskdefinition',
        meta: {label: 'risk_definition'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/riskdefinition',
            component: riskdefinition,
          },
  	{
            path: ':id',
            component: riskdefinition,
         	 },
        ]
      },

{
        path: 'riskupdation',
        meta: {label: 'risk_updation'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/riskupdation',
            component: riskupdation,
          },
  	{
            path: ':id',
            component: riskupdation,
         	 },
        ]
      },
      {
        path: 'KpiPerformanceReport',
        //name: 'Dashboard',
        component: KpiPerformanceReport,
        children: [
          {
            path: ':id',
            name: 'KpiPerformanceReport',
            component: KpiPerformanceReport,
          },
        ]
      },
      {
        path: 'UnitPerformanceReport',
        //name: 'Dashboard',
        component: UnitPerformanceReport,
        children: [
            {
                path: ':id',
                name: 'UnitPerformanceReport',
                component: UnitPerformanceReport,
            },
        ]
    },

      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'updateCredentials',
        name: 'update_credentials',
        component: updateCredentials
      },
      {
        path: 'theme',
        redirect: '/theme/colors',
        name: 'Theme',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'colors',
            name: 'Colors',
            component: Colors
          },
          {
            path: 'typography',
            name: 'Typography',
            component: Typography
          }
        ]
      },
      {
        path: 'charts',
        name: 'Charts',
        component: Charts
      },
      {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
      },
      {
        path: 'priority',
        meta: {label: 'priority'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: Priority,
          },
          {
            path: 'range',
            meta: {label: 'priority range'},
            name: 'PriorityRange',
            component: PriorityRange,
          },
        ]
      },

      {
        path: 'organizationchart',
        meta: {label: 'organization_chart'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: organizationchart,
          },
          {
            path: ':id',
            meta: {label: 'organization_chart'},
            name: 'organizationchart',
            component: organizationchart,
          },
        ]
      },
      {
        path: 'users',
        meta: {label: 'users'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: Users,
          },
          {
            path: ':id',
            meta: {label: 'User Details'},
            name: 'user',
            component: User,
          },
        ]
      },
      {
        path: 'loginlog',
        meta: {label: 'Loginlog'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/loginlogs',
            component: loginlogs,
          },
        ]
      },
      {
        path: 'tenant',
        meta: {label: 'SubTenant'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: Tanents,
          },
          {
            path: '/Orgchart',
            name: 'orgchart',
            meta: {label: 'Orgchart'},
            component: Orgchart,
            props: true
          }
        ]
      },
      {
        path: 'models',
        meta: {label: 'models'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: ObjectModels,
          },
        ]
      },
      {
        path: 'roles',
        meta: {label: 'roles'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: RolesUser,
          },
        ]
      },
      {
        path: 'groups',
        meta: {label: 'groups'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: GroupTanents,
          },
          {
            path: ':id',
            meta: {label: 'Group Details'},
            name: 'Group',
            component: GroupTanent,
          },
        ]
      },
      {
        path: 'tasklist',
        meta: {label: 'Tasklist'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            //component: TaskList,
            component: TaskListNew,
          },
          {
            path: ':id',
            meta: {label: 'Tasklist Details'},
            name: 'Tasklist',
            component: TaskListNew,
          },
        ]
      },
	{
        path: 'holiday',
        meta: {label: 'holiday'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: holiday,
          },

        ]
      },

 {
        path: 'strategyList',
        meta: {label: 'strategy_list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: strategy_list,
          },

        ]
      },
      {
        path: 'process1',
        meta: {label: 'process_list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: process_list,
          },

        ]
      },
      {
        path: 'processcategory',
        meta: {label: 'processcategory'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: ProcessCategory,
          },

        ]
      },


      {
        path: 'process',
        meta: {label: 'ProcessList'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: ProcessList,
          },
          {
            path: '/process-defination/:id',
            meta: {label: 'ProcessTask'},
            name: 'ProcessTasks',
            component: ProcessTask,
          },
          {
            path: '/process-instance/:id',
            meta: {label: 'ProcessInstance'},
            name: 'ProcessInstance',
            component: ProcessInstance,
          },
        ]
      },
      {
        path: 'newFormGenerator',
        redirect: '/kpilist',
        meta: {label: 'kpi list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: ':id',
            component: newFormGenerator,
          },
          {
            path: ':id/:kpi',
            meta: {
              label: (
                (Param == 1) ? "kpi definition" :
                  ((Param == 2) ? "benchmark" :
                    ((Param == 3) ? "kpi target" : 'kpi'))
              )
            },
            name: 'newFormGenerator',
            component: newFormGenerator,
          },
        ]
      },
      {
        path: 'gaugechart',
        meta: {label: 'kpi list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            redirect: '/kpilist',
            component: gaugechart,
          },
          {
            path: ':id',
            meta: {label: 'gauge chart'},
            name: 'gaugechart',
            component: gaugechart,
          },
        ]
      },
      {
        path: 'gaugechartreport',
        meta: {label: 'kpi list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [

          {
            path: '',
            meta: {label: 'gauge chart'},
            name: 'gaugechartreport',
            component: gaugechartreport,
          },
        ]
      },
      {
        path: 'sectiontreemap',
        meta: {label: 'sectiontreemap'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: sectiontreemap,
          },
          {
            path: ':id',
            meta: {label: 'sectiontreemap'},
            name: 'sectiontreemap',
            component: sectiontreemap,
          },
        ]
      },
      {
        path: 'mindmap',
        meta: {label: 'kpi list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            name: 'mindmap',
            component: mindmap,
          },
        ]
      },
      {
        path: 'maintenance',
        meta: {label: 'kpi list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            name: 'maintenance',
            component: maintenance,
          },
        ]
      },
      {
        path: 'kpivalues',
        meta: {label: 'kpi values'},
        component: {
          render(c) {
            return c('router-view')
          }
        },

        children: [
          {
            path: ':id',
            component: kpivalues,
          },
        ]
      },

      {
        path: 'kpilist',
        meta: {label: 'kpi list'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: KpiList,
          },
          {
            path: ':id',
            component: KpiList,
          },
        ]
      },

      //   {
      //   path: 'kpihistory',
      //   meta: {label: 'KPI History'},
      //   component: {
      //     render(c) {
      //       return c('router-view')
      //     }
      //   },
      //   children: [
      //     {
      //       path: '',
      //       component: kpihistory,
      //     },
      //   ]
      // },
      {
        path: 'kpivalueshistory',
        meta: {label: 'kpi history'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: ':id',
            component: kpivalueshistory,
          },
        ]
      },
      {
        path: 'DynamicForms',
        meta: {label: 'forms'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: DynamicForms,
          },
          {
            path: ':id',
            meta: {label: 'forms'},
            name: 'DynamicForms',
            component: DynamicForms,
          },
        ]
      },
      {
        path: 'Translations',
        meta: {label: 'translations'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: Translations,
          },
          {
            path: ':id',
            meta: {label: 'Translations'},
            name: 'translations',
            component: Translations,
          },
        ]
      },
      {
        path: 'Audittrial',
        meta: {label: 'audittrial'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: audittrial,
          },
          {
            path: ':id',
            meta: {label: 'audittrial'},
            name: 'audittrial',
            component: audittrial,
          },
        ]
      },

      {
        path: 'unitperformance',
        meta: {label: 'unitperformance'},
        component: {
          render(c) {
            return c('router-view')
          }
        },

      },
      {
        path: 'departmentperformance',
        meta: {label: 'org_unit_performance'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/departmentperformance',
            component: departmentperformance,
          },
        ]
      },
      {
        path: 'ministrydepartmentperformance',
        meta: {label: 'ministry_unit_performance'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: ministrydepartmentperformance,
          },
          {
            path: ':id',
            component: ministrydepartmentperformance,
          },
        ]
      },
      {
        path: 'sectionperformance',
        meta: {label: 'section_performance'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '/sectionperformance',
            component: sectionperformance,
          },
        ]
      },
      {
        path: 'treeselect',
        meta: {label: 'treeselect'},
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: '',
            component: treeselect,
          },
          {
            path: ':id',
            meta: {label: 'treeselect'},
            name: 'treeselect',
            component: treeselect,
          },
        ]
      },

      {
        path: 'base',
        redirect: '/base/cards',
        name: 'Base',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'cards',
            name: 'Cards',
            component: Cards
          },
          {
            path: 'forms',
            name: 'Forms',
            component: Forms
          },
          {
            path: 'switches',
            name: 'Switches',
            component: Switches
          },
          {
            path: 'tables',
            name: 'Tables',
            component: Tables
          },
          {
            path: 'tabs',
            name: 'Tabs',
            component: Tabs
          },
          {
            path: 'breadcrumbs',
            name: 'Breadcrumbs',
            component: Breadcrumbs
          },
          {
            path: 'carousels',
            name: 'Carousels',
            component: Carousels
          },
          {
            path: 'collapses',
            name: 'Collapses',
            component: Collapses
          },
          {
            path: 'jumbotrons',
            name: 'Jumbotrons',
            component: Jumbotrons
          },
          {
            path: 'list-groups',
            name: 'List Groups',
            component: ListGroups
          },
          {
            path: 'navs',
            name: 'Navs',
            component: Navs
          },
          {
            path: 'navbars',
            name: 'Navbars',
            component: Navbars
          },
          {
            path: 'paginations',
            name: 'Paginations',
            component: Paginations
          },
          {
            path: 'popovers',
            name: 'Popovers',
            component: Popovers
          },
          {
            path: 'progress-bars',
            name: 'Progress Bars',
            component: ProgressBars
          },
          {
            path: 'tooltips',
            name: 'Tooltips',
            component: Tooltips
          }
        ]
      },
      {
        path: 'buttons',
        redirect: '/buttons/standard-buttons',
        name: 'Buttons',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'standard-buttons',
            name: 'Standard Buttons',
            component: StandardButtons
          },
          {
            path: 'button-groups',
            name: 'Button Groups',
            component: ButtonGroups
          },
          {
            path: 'dropdowns',
            name: 'Dropdowns',
            component: Dropdowns
          },
          {
            path: 'brand-buttons',
            name: 'Brand Buttons',
            component: BrandButtons
          }
        ]
      },
      {
        path: 'icons',
        redirect: '/icons/font-awesome',
        name: 'Icons',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'coreui-icons',
            name: 'CoreUI Icons',
            component: CoreUIIcons
          },
          {
            path: 'flags',
            name: 'Flags',
            component: Flags
          },
          {
            path: 'font-awesome',
            name: 'Font Awesome',
            component: FontAwesome
          },
          {
            path: 'simple-line-icons',
            name: 'Simple Line Icons',
            component: SimpleLineIcons
          }
        ]
      },
      {
        path: 'notifications',
        redirect: '/notifications/alerts',
        name: 'Notifications',
        component: {
          render(c) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'alerts',
            name: 'Alerts',
            component: Alerts
          },
          {
            path: 'badges',
            name: 'Badges',
            component: Badges
          },
          {
            path: 'modals',
            name: 'Modals',
            component: Modals
          }
        ]
      }
    ]
  },
  {
    meta: {
      auth: true,
    },
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: Page404
      },
      {
        path: '500',
        name: 'Page500',
        component: Page500
      },
      {
        path: 'login',
        name: 'Login1',
        component: Login
      },
      {
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {path: "*", component: Page404}
];


let router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  //base: 'admin',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: RoutesArray
});

// router.beforeEach((to, from, next) => {

//   const currentUser = Vue.auth.check();

//   const requiresAuth = to.matched.some(record => record.meta.auth);

//   if (requiresAuth && !currentUser) {

//    next('/login');

//   } else if (requiresAuth && currentUser) {

//    next();

//   } else {

//    next();

//   }

//   });

router.beforeEach((to, from, next) => {
  var lan = localStorage.getItem('language');
  if (lan && lan !== i18n.locale) {
    i18n.locale = lan;
    next();
  } else if (!lan) {
    //navigator.languages
    store.dispatch('language/setLanguage', 'ar')
      .then(() => {
        i18n.locale = lan;
        next();
      });
  } else {

    next();
  }
});

export default router
