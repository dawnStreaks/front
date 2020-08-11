<template>
    <div v-if="this.$i18n.locale == 'en'">
    <b-button variant="primary" size="md" class="btn float-right" @click="changeLanguage({title: 'sdfsfsf',
                        value: 'ar'})"
              style="margin-left: 1%; margin-right: 1%">
        <b><i class="fa fa-language font-1xl"></i> العربية</b></b-button>
    </div>
    <div v-else>
        <b-button variant="primary" size="md" class="btn float-right" @click="changeLanguage({title: 'sdfsfsf',
                        value: 'en'})"
                  style="margin-left: 1%; margin-right: 1%">
            <b><i class="fa fa-language font-1xl"></i> English </b></b-button>
    </div>
    <!--<b-navbar type="dark" variant="primary" toggleable>
        <b-nav-item-dropdown :text=" $t('language_picker_helper') " right>
            <b-dropdown-item v-for="(lang, index) in languages"
                             :key="`lang${index}`"
                             v-on:click="changeLanguage(lang)">{{ lang.title }}</b-dropdown-item>
        </b-nav-item-dropdown>
    </b-navbar>-->
</template>
<script>
    import {store} from '@/components/store'
    import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
    export default {
        name: 'DefaultHeaderDropdownLang',
        store: store,
        components: {
            AppHeaderDropdown
        },
        data() {
            return {
                itemsCount: 15,
                languages: [
                    {
                        title: this.$t('languages.english'),
                        value: 'en',
                    },
                    /*{
                        title: this.$t('languages.norwegian'),
                        value: 'nb',
                    },*/
                    {
                        title: this.$t('languages.arabic'),
                        value: 'ar',
                    },
                ],
            };
        },
        created() {
            let next = document.querySelector('div.vue-form-wizard');
            //alert(this.$i18n.locale);
            if (this.$i18n.locale == 'ar' ) {
                document.querySelector('html').setAttribute('dir', 'rtl');
                next && next.classList.add('isRtl');


            } else {
                document.querySelector('html').setAttribute('dir', '');
                let dropdown = next && next.classList.contains('isRtl');
                if(dropdown) {
                    next.classList.remove('isRtl');
                }
            }
        },
        methods: {
            changeLanguage(lang) {
                //alert(lang.value);
                localStorage.setItem('language', lang.value);
                this.$i18n.locale = lang.value;
                const vals = this.$route.path.split('/');
                if(vals.includes('newFormGenerator')) {
                    this.$store.dispatch('loadFormData', this.$route.params.id);
                }

                let next = document.querySelector('div.vue-form-wizard');

                let head = document.querySelector('body .rtlEnArClass');

                //this.$store.dispatch('language/setLanguage', lang.value);
                //alert(this.$i18n.locale);
                if (this.$i18n.locale == 'ar' ) {
                    document.querySelector('html').setAttribute('dir', 'rtl');
                    next && next.classList.add('isRtl');
                    head && head.classList.add('rtlArClass');
                    head && head.classList.remove('rtlEnClass');
                } else {
                    document.querySelector('html').setAttribute('dir', '');
                    let dropdown = next && next.classList.contains('isRtl');
                    if(dropdown) {
                        next.classList.remove('isRtl');
                    }
                    head && head.classList.add('rtlEnClass');
                    head && head.classList.remove('rtlArClass');
                }
                //alert(this.$i18n.locale);
            },
        }
    }
</script>
