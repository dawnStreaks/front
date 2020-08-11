<template>
  <nav class="sidebar-nav">
    <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-y="scrollHandle">
      <ul class="nav">
        <template v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle :key="index"  :name="get_text(item.name+'@l')" :classes="item.class" :wrapper="item.wrapper"/>
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :key="index" :classes="item.class"/>
          </template>
          <template v-else-if="item.label">
            <SidebarNavLabel :key="index" :name="get_text(item.name+'@l')"  :url="item.url" :icon="item.icon" :label="item.label" :classes="item.class"/>
          </template>
          <template v-else>
            <template v-if="item.children && $auth.check(item.roles)">
              <!-- First level dropdown -->
              <SidebarNavDropdown :key="index"  :name="get_text(item.name+'@l')" :url="item.url" :icon="item.icon" v-if="$auth.check(item.roles) && $can(item.allPermissions)">
                <template v-for="(childL1, index1) in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :key="index1" :name="get_text(childL1.name+'@l')" :url="childL1.url" :icon="childL1.icon">
                      <li :key="index2" class="nav-item" v-for="(childL2, index2) in childL1.children">
                        <SidebarNavLink :name="get_text(childL2.name+'@l')" :url="childL2.url" :icon="childL2.icon" :badge="childL2.badge" :variant="childL2.variant" :attributes="childL2.attributes" />
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <SidebarNavItem :key="index1" :classes="item.class">
                      <SidebarNavLink :name="get_text(childL1.name+'@l')" :url="childL1.url" :icon="childL1.icon" :badge="childL1.badge" :variant="childL1.variant" :attributes="childL1.attributes" v-if="$can(item.allPermissions)"/>
                    </SidebarNavItem>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <!--{{ $can(item.allPermissions) }}-->
              <SidebarNavItem :key="index" :classes="item.class">
                <SidebarNavLink :name="get_text(item.name+'@l')" :url="item.url" :icon="item.icon" :badge="item.badge" :variant="item.variant" :attributes="item.attributes" v-if="$auth.check(item.roles) && $can(item.allPermissions)"/>
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot></slot>
    </VuePerfectScrollbar>
  </nav>
</template>

<script>
    import {store} from  '@/components/store'
    import SidebarNavDivider from './SidebarNavDivider'
    import SidebarNavDropdown from './SidebarNavDropdown'
    import SidebarNavLink from './SidebarNavLink'
    import SidebarNavTitle from './SidebarNavTitle'
    import SidebarNavItem from './SidebarNavItem'
    import SidebarNavLabel from './SidebarNavLabel'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        name: 'SidebarNav',
        store: store,
        components: {
            SidebarNavDivider,
            SidebarNavDropdown,
            SidebarNavLink,
            SidebarNavTitle,
            SidebarNavItem,
            SidebarNavLabel,
            VuePerfectScrollbar
        },
        props: {
            navItems: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        data () {
            return {
                translation:[]
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }

            if(typeof this.$auth.user().id != "undefined") {
                if(localStorage.getItem('appId') == null && !window.location.pathname.split("/").includes('landingpage')) {
                window.location.replace('/landingpage')
                }
            }
        },
        // mounted() {
        //     this.$store.dispatch('translation');
        // },
        computed: {
            psSettings: () => {
                // ToDo: find better rtl fix
                return {
                    maxScrollbarLength: 200,
                    minScrollbarLength: 40,
                    suppressScrollX: getComputedStyle(document.querySelector('html')).direction !== 'rtl',
                    wheelPropagation: false,
                    interceptRailY: styles => ({ ...styles, height: 0 })
                }
            }
        },
        methods: {
            get_text(textbit) {
                var transtext = this.translation[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if(spliteText.length > 2) {
                        var newTxt = (spliteText[0]+'@'+'l');
                        var transtext1 = this.translation[this.$i18n.locale][newTxt];
                        if (transtext1) {
                            return transtext1;
                        } else {
                            return "!" + textbit;
                        }
                    } else {
                        return "!" + textbit;
                    }
                }

            },
            scrollHandle (evt) {
                // console.log(evt)
            },
            $can(permissionName) {
                // alert(this.$auth.user().allPermissions);
                return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
            },
        }
    }
</script>
<style>
  @media (min-width: 992px){
    [dir=rtl] .sidebar-minimized .sidebar .nav {
      list-style-image: none !important;
    }
  }
  .sidebar .nav-link .nav-icon {
    font-size: 18px;
  }
</style>
<style scoped lang="css">
  .scroll-area {
    position: absolute;
    height: 100%;
    margin: auto;
  }
</style>
