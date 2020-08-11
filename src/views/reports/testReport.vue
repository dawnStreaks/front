
<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>

        <b-col cols="12">

          <div style="width:100%;height:100%;background-color: #ffffff">
            
            <b-embed
              aspect="16by9"
              :src=" 'http://dev.api.najah.online/api/v1/client/test/'"
              allowfullscreen
            />
            <!--<iframe id="iframe" src="http://api360.najah.online/array"   +this.$i18n.locale"
" width="700" height="450"></iframe>-->
          </div>
          <!--<b-card-->
          <!--header-tag="header"-->
          <!--footer-tag="footer">-->
          <!--<div slot="header">-->
          <!--<i class="fa fa-align-justify"></i><strong> Bootstrap Breadcrumb</strong>-->
          <!--<div class="card-header-actions">-->
          <!--dsadsadsd-->
          <!--&lt;!&ndash;<vue-friendly-iframe :src="example1Form.src" @load="onLoad" @document-load="onDocumentLoad"></vue-friendly-iframe>&ndash;&gt;-->


          <!--<a href="https://bootstrap-vue.js.org/docs/components/breadcrumb" class="card-header-action" rel="noreferrer noopener" target="_blank">-->
          <!--<small class="text-muted">docs</small>-->
          <!--</a>-->
          <!--</div>-->
          <!--</div>-->
          <!--<b-breadcrumb :items="items"/>-->
          <!--</b-card>-->
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue';
  import VueFriendlyIframe from 'vue-friendly-iframe';
  Vue.component('vue-friendly-iframe', VueFriendlyIframe);
  export default {
    name: 'InactiveReport',
    data () {
      return {
        items: [{
          text: 'Admin',
          href: '#'
        }, {
          text: 'Manage',
          href: '#'
        }, {
          text: 'Library',
          active: true
        }],
        // created1:"hi",

      }
    },
    beforeMount() {
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
    },
    methods : {
      get_text(textbit) {
        var transtext = this.translation[this.$i18n.locale][textbit];
        if (transtext) {
          return transtext;
        } else {
          var spliteText = (textbit.split("@"));
          if (spliteText.length > 2) {
            var newTxt = (spliteText[0] + '@' + 'l');
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
    }
    }
</script>
<style>
  .sidebar-minimized .sidebar .nav-dropdown-items .nav-item .nav-link {
    width: 200px;
    /*overflow-wrap: break-word;*/
    white-space: normal;
  }
</style>
