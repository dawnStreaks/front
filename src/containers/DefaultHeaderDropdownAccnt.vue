<template>
    <AppHeaderDropdown right no-caret>
        <template slot="header">
            <img v-if="imageName"
                 :src="imagePath"
                 class="img-avatar"
                 onerror="this.src='/img/avatars/no_user.png'"
                 style="width: 50px; height: 50px;"
                 :alt=" this.$auth.user().name"/>
        </template>
        <template slot="dropdown">
            <b-dropdown-header tag="div" class="text-center"><strong>{{ $auth.user().name}}</strong></b-dropdown-header>
            <!--<b-dropdown-item ><i class="fa fa-bell" /> Updates
              <b-badge variant="info">{{ itemsCount }}</b-badge>
            </b-dropdown-item>
            <b-dropdown-item><i class="fa fa-envelope" /> Messages
              <b-badge variant="success">{{ itemsCount }}</b-badge>
            </b-dropdown-item>
            <b-dropdown-item><i class="fa fa-tasks" /> Tasks
              <b-badge variant="danger">{{ itemsCount }}</b-badge>
            </b-dropdown-item>
            <b-dropdown-item><i class="fa fa-comments" /> Comments
              <b-badge variant="warning">{{ itemsCount }}</b-badge>
            </b-dropdown-item>-->
            <b-dropdown-header
                    tag="div"
                    class="text-center" style="background: #FFF;">
                <strong>{{ get_text('settings@l') }}</strong>
            </b-dropdown-header>
            <b-dropdown-item :to="{ path: '/profile'}"><i class="fa fa-user"/> {{ get_text('profile@l') }}</b-dropdown-item>
            <b-dropdown-item :to="{ path: '/updateCredentials'}"><i class="fa fa-wrench"/> {{ get_text('update_credentials@l') }}</b-dropdown-item>
            <!--<b-dropdown-item><i class="fa fa-usd" /> Payments
              <b-badge variant="secondary">{{ itemsCount }}</b-badge>
            </b-dropdown-item>
            <b-dropdown-item><i class="fa fa-file" /> Projects
              <b-badge variant="primary">{{ itemsCount }}</b-badge>
            </b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item><i class="fa fa-user-shield" /> Lock Account</b-dropdown-item>-->
            <b-dropdown-item v-on:click="logout()"><i class="fa fa-lock"/> {{ get_text('logout@l') }}</b-dropdown-item>
        </template>
    </AppHeaderDropdown>
</template>
<style>
    .app-header .navbar-nav.rtlEnClass .dropdown-menu-right {
        right: 10px !important;
    }

    .app-header .navbar-nav.rtlArClass .dropdown-menu-right {
        right: -122px;
        left: auto;
    }
</style>
<script>
    import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'

    export default {
        name: 'DefaultHeaderDropdownAccnt',
        components: {
            AppHeaderDropdown
        },
        data: () => {
            return {itemsCount: 42, imagePath: '', imageName: ''}
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        created() {
            this.imagePath = this.$auth.user().url + '/images/' + this.$auth.user().file_name;
            this.imageName = this.$auth.user().file_name;
        },
        methods: {
            get_text(textbit) {
                var transtext = (typeof this.translation[this.$i18n.locale][textbit] != "undefined" && this.translation[this.$i18n.locale][textbit] != null) ? this.translation[this.$i18n.locale][textbit] : "!" + textbit;
                return transtext;

            },
            logout() {
                localStorage.clear();
                sessionStorage.clear();
                this.$auth.logout();
                this.$router.push('/');
            },
        }
    }
</script>
