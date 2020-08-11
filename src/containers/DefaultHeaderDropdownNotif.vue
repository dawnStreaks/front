<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <i class="icon-bell"></i>
      <b-badge pill variant="info">{{itemsCount.length}}</b-badge>
    </template>
    <template slot="dropdown">
      <div class="dropdown-menu-lg">
        <b-dropdown-header tag="div"
                           class="text-center"><strong>You have {{itemsCount.length}} messages</strong></b-dropdown-header>
        <b-dropdown-item v-for="(notification, index) in (itemsCount)" :key="index">
          <div class="message">
            <div class="pt-3 mr-3 float-left">
              <div class="avatar">
                <img :src="$auth.user().url + '/images/' + JSON.parse(notification)['userImage']"
                     class="img-avatar" alt="admin@bootstrapmaster.com" onerror="this.src='/img/avatars/no_user.png'">
                <span class="avatar-status bg-success"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">{{JSON.parse(notification)['user']}}</small>
              <small class="text-muted float-right mt-1"><timeago
                :datetime="JSON.parse(notification)['time']"></timeago></small>
            </div>
            <div class="text-truncate font-weight-bold"><span class="fa fa-exclamation text-danger"></span> {{JSON.parse(notification)['id'] }}</div>
            <div class="small text-muted text-truncate">{{JSON.parse(notification)['kpiname'] }}</div>
          </div>
        </b-dropdown-item>
        <!--<b-dropdown-item href="#">
          <div class="message">
            <div class="pt-3 mr-3 float-left">
              <div class="avatar">
                <img src="img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span class="avatar-status bg-warning"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">Jane Doe</small>
              <small class="text-muted float-right mt-1">5 minutes ago</small>
            </div>
            <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <div class="message">
            <div class="pt-3 mr-3 float-left">
              <div class="avatar">
                <img src="img/avatars/5.jpg" class="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span class="avatar-status bg-danger"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">Janet Doe</small>
              <small class="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>
        <b-dropdown-item href="#">
          <div class="message">
            <div class="pt-3 mr-3 float-left">
              <div class="avatar">
                <img src="img/avatars/4.jpg" class="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span class="avatar-status bg-info"></span>
              </div>
            </div>
            <div>
              <small class="text-muted">Joe Doe</small>
              <small class="text-muted float-right mt-1">4:03 AM</small>
            </div>
            <div class="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div class="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...</div>
          </div>
        </b-dropdown-item>-->
        <b-dropdown-item href="#" class="text-center"><strong>View all messages</strong></b-dropdown-item>
      </div>
    </template>
  </AppHeaderDropdown>
</template>
<script>
  import Vue from 'vue'
  import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
  import pmStore from '../components/store';
  import VueTimeago from 'vue-timeago'

  Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: 'en', // Default locale
    // We use `date-fns` under the hood
    // So you can use all locales from it
    locales: {
      'zh-CN': require('date-fns/locale/zh_cn'),
      'ja': require('date-fns/locale/ja'),
    }
  });

  export default {
    store:pmStore,
    name: 'DefaultHeaderDropdownNotif',
    components: {
      AppHeaderDropdown
    },
    data: () => {
      return {
        //itemsCount: {}
      }
    },
    computed: {
      itemsCount()  {
        return (this.$store.state.notifications);
      }
    }
  }
</script>
