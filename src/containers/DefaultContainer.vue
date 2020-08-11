<template>
    <div class="app">
        <AppHeader fixed>
            <SidebarToggler class="d-lg-none" display="md" mobile/>
            <b-link class="navbar-brand" to="#">
                <img class="navbar-brand-full" src="/img/brand/logo_new.png" width="100" height="45" alt="RMC Logo">
                <img class="navbar-brand-minimized" src="/img/brand/logo-symbol_new.png" width="30" height="30" alt="RMC Logo">
            </b-link>
            <SidebarToggler class="d-md-down-none" display="lg"/>
            <b-navbar-nav class="d-md-down-none">
                <b-nav-item class="px-3" to="/landingpage">{{ this.get_text('landing_page@l') }}</b-nav-item>
                <!--<b-nav-item class="px-3" to="/dashboard">{{ this.get_text('Dashboard@l') }}</b-nav-item>
                <b-nav-item class="px-3" to="/users" exact>{{ this.get_text('users@l') }}</b-nav-item>-->
                <!--<b-nav-item class="px-3">Settings</b-nav-item>-->
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto rtlEnArClass">
                <!--<b-nav-item class="d-md-down-none">
                  <DefaultHeaderDropdownLang/>
                </b-nav-item>-->
                <DefaultHeaderDropdownLang/>
                <b-nav-item class="d-md-down-none">
                  <DefaultHeaderDropdownNotif/>
                </b-nav-item>
                <b-nav-item class="d-md-down-none">
                    <i class="icon-list"></i>
                </b-nav-item>
                <!--<b-nav-item class="d-md-down-none">-->
                    <!--<i class="icon-location-pin"></i>-->
                <!--</b-nav-item>-->
                <DefaultHeaderDropdownAccnt/>
            </b-navbar-nav>
            <!--<AsideToggler class="d-none d-lg-block"/>-->
            <!--<AsideToggler class="d-lg-none" mobile />-->
        </AppHeader>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader/>
                <SidebarForm/>
                <SidebarNav :navItems="nav"></SidebarNav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </AppSidebar>
            <main class="main">
                <Breadcrumb :list="list"/>
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <AppAside fixed>
                <!--aside-->
                <DefaultAside/>
            </AppAside>
        </div>
        <!--<TheFooter>
            &lt;!&ndash;footer&ndash;&gt;
            <div>
                <a href="http://iriyada.com">RMC</a>
                <span class="ml-1">&copy; 2018.</span>
            </div>
            <div class="ml-auto">
                <span class="mr-1">Powered by</span>
                <a href="http://iriyada.com">RMC</a>
            </div>
        </TheFooter>-->
        <TheFooter>

            <div class="col-md-2"  dir="rtl" >

            </div>
            <div class="col-md-8" dir="rtl" align="center" >
                <span style="text-align: center" class="mr-1">جميع الحقوق محفوظة لوزارة المالية – إدارة التخطيط والمتابعة</span>
                <!--<a href="https://coreui.io">CoreUI for Vue</a>-->

            </div>
            <div class="col-md-2" dir="rtl" style="text-align: left" >
                <span style="text-align:left;font-size: 12px;" class="mr-1"><span class="mr-1">Powered by</span>&nbsp;&nbsp;<a href="http://iriyada.com">RMC</a></span>
            </div>


        </TheFooter>
    </div>
</template>

<script>

    import {store} from '@/components/store'
    import nav from '@/_nav'
    import {
        Header as AppHeader,
        SidebarToggler,
        SidebarFooter,
        SidebarForm,
        SidebarHeader,
        SidebarMinimizer,
        Aside as AppAside,
        AsideToggler,
        Footer as TheFooter
    } from '@coreui/vue'

    import Breadcrumb from '../components/Breadcrumb'
    import AppSidebar from '../components/Sidebar'
    import SidebarNav from '../components/SidebarNav'
    import DefaultAside from './DefaultAside'
    import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
    import DefaultHeaderDropdownLang from './DefaultHeaderDropdownLang'
    import DefaultHeaderDropdownNotif from './DefaultHeaderDropdownNotif'

    export default {
        name: 'full',
        store: store,
        components: {
            AsideToggler,
            AppHeader,
            AppSidebar,
            AppAside,
            TheFooter,
            Breadcrumb,
            DefaultAside,
            DefaultHeaderDropdownAccnt,
            DefaultHeaderDropdownLang,
            DefaultHeaderDropdownNotif,
            SidebarForm,
            SidebarFooter,
            SidebarToggler,
            SidebarHeader,
            SidebarNav,
            SidebarMinimizer
        },
        data() {
            return {
                nav: nav.items,
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        mounted() {
            let next = document.querySelector('div.vue-form-wizard');

            let head = document.querySelector('body .rtlEnArClass');

            if (this.$i18n.locale == 'ar') {
                document.querySelector('html').setAttribute('dir', 'rtl');
                next && next.classList.add('isRtl');
                head && head.classList.add('rtlArClass');
                head && head.classList.remove('rtlEnClass');
            } else {
                document.querySelector('html').setAttribute('dir', '');
                let dropdown = next && next.classList.contains('isRtl');
                if (dropdown) {
                    next.classList.remove('isRtl');
                }
                head && head.classList.add('rtlEnClass');
                head && head.classList.remove('rtlArClass');
            }
        },
        computed: {
            name() {
                return this.$route.name
            },
            list() {
                return this.$route.matched.filter((route) => route.name || route.meta.label)
            }
        },
        methods: {
            get_text(textbit) {
                var transtext = (typeof this.translation[this.$i18n.locale][textbit] != "undefined" && this.translation[this.$i18n.locale][textbit] != null) ? this.translation[this.$i18n.locale][textbit] : "!"+textbit;
                return transtext;
            },
        }
    }
</script>
<style>
    .rtlEnClass {
        margin-left: auto !important;
    }

    .rtlArClass {
        margin-left: 0 !important;
    }

    .rtlEnClass ul.dropdown-menu.dropdown-menu-right {
        right: 10px;
    }
    .rtlArClass ul.dropdown-menu.dropdown-menu-right {
        right: -122px;
    }
</style>
