<template>
  <div class="app animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>

<b-row>
  <b-col sm="12" md="12">
    <transition name="fade">
      <b-card  no-body v-if="show">
        <div slot="header">
          {{
          get_text('kpi_map@kpi_def@l') }}
          <div class="card-header-actions">

            <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
              <i class="icon-arrow-up"></i>
            </b-link>
            <b-link href="#" class="card-header-action btn-close" v-on:click="printmindmap('mindmapdiv')">
              <i class="icon-printer"></i>
            </b-link>
          </div>
        </div>
        <b-collapse id="collapse1" style="display: none;">
          <b-card-body>
            <b-row>
            <b-col md="3" class="my-1">
              <b-form-group horizontal :label="get_text('sector@kpi_def@l')" class="mb-4">
                <b-input-group>
                  <b-form-select v-model="sortByTenant"
                                 :options="this.$store.state.setTenant"  @change="getsubtenants()" >
                    <option slot="first" :value="null">{{
                      get_text('please_select@kpi_def@l') }}
                    </option>
                  </b-form-select>
                </b-input-group>
              </b-form-group>
              <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')" class="mb-4">
                <b-input-group>
<!--                  <b-form-select v-model="sortBySubTenant"-->
<!--                                 :options="this.$store.state.setSubTenant"  @change="getmindmap()">-->
<!--                    <option slot="first" :value="null">{{-->
<!--                      get_text('please_select@kpi_def@l')-->
<!--                      }}-->
<!--                    </option>-->
<!--                  </b-form-select>-->
                  <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')"
                              :normalizer="normalizer" searchable="searchable" :options="options" v-model="sortBySubTenant"
                              @input="getmindmap()"/>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col md="6" class="my-1">
              <!--<div align="right">   <button  id="myPrntbtn" v-on:click="printmindmap('mindmapdiv')"><i class="fa fa-print "></i></button></div>-->

              <b-form-group
                label=""
                label-for="basicCustomRadios1"
                :label-cols="3"
                :horizontal="true">
                <b-form-radio-group
                  id="basicCustomRadios1"
                  name="customRadioInline1">
                  <div class="custom-control custom-radio custom-control-inline">


                    <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="1" checked v-model="linkflag" v-on:change="getmindmap">
                    <label class="custom-control-label" for="customRadioInline1"> {{
                      get_text('kpi_def@mindmap@l') }}</label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="2" v-model="linkflag" v-on:change="getmindmap">
                    <label class="custom-control-label" for="customRadioInline2">{{
                      get_text('quick_view@mindmap@l') }}</label>
                  </div>

                </b-form-radio-group>


              </b-form-group>

            </b-col>
            </b-row>
          </b-card-body>
        </b-collapse>
      </b-card>
    </transition>
  </b-col>
</b-row>

 <b-row  v-if="this.$store.state.nodes2.length > 0">
   <b-col cols="12" xl="12">
   <b-card>
     <div v-if="!$auth.ready() || !this.$store.state.loading">
       <div style="text-align:center; padding-top:50px;">
         {{ this.get_text('loading@l') }}
       </div>
     </div>
     <div id="mindmapdiv" align="center" style="background-color: #ffffff" v-if="$auth.ready() && this.$store.state.loading">

    <mindmap
      :title="jjjjj"
      :nodes="this.$store.state.nodes2"
      :connections="this.$store.state.connections2"
      :editable="true"
    />
</div>


   </b-card>
   </b-col>
 </b-row>
  </div>

</template>

<script>
  import Vue from 'vue'
  import VueMindmap from 'vue-mindmap'
  // You need a specific loader for CSS files like https://github.com/webpack/css-loader
  import 'vue-mindmap/dist/vue-mindmap.css'
  import {store} from '@/components/mindmap/store';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import 'element-ui/lib/theme-chalk/index.css';
  import Element from 'element-ui'
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  Vue.use(Element);
  Vue.use(Loading);
  Vue.use(VueMindmap)
  export default {
    store: store,
     data() {

      return {
        connections1:[],
        nodes1:[],
        sortByTenant: null,
        sortBySubTenant: null,
        translation:[],
        linkflag:1,
        show: true,
        options:'',
        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.tree,
          }
        },

      }
    },
    beforeMount() {
     // alert(this.$auth.user().subtenant_id);

      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));

      }
      if (sessionStorage.getItem('mindmapid')) {
       // this.sortBySubTenant = JSON.parse(sessionStorage.getItem('mindmapid'));
      }
      if (sessionStorage.getItem('linkflag')) {
        this.linkflag=JSON.parse(sessionStorage.getItem('linkflag'));
      }



    },
    created() {
      this.$store.dispatch('loadTenants');
      if (sessionStorage.getItem('mindmapsectorid')) {
        //this.sortByTenant = JSON.parse(sessionStorage.getItem('mindmapsectorid'));
        this.getsubtenants();

      }
      if (sessionStorage.getItem('mindmapid')) {
        //this.sortBySubTenant = JSON.parse(sessionStorage.getItem('mindmapid'));
      }
      if (sessionStorage.getItem('linkflag')) {
        this.linkflag=JSON.parse(sessionStorage.getItem('linkflag'));
      }

      if (sessionStorage.getItem('mindmapid')){
        this.getmindmap();
        // sessionStorage.removeItem('mindmapid');
        // sessionStorage.removeItem('mindmapsectorid');
      }
      else if(this.$auth.user().subtenant_id){

        this.sortBySubTenant=this.$auth.user().subtenant_id;
        this.getsectors(this.$auth.user().subtenant_id);
        this.getmindmap();
      }
    },
    computed :{
      nodes() {

        return this.nodes1
      },

      connections() {

        return this.connections1
      }
    },
    components: {
      'loading': Loading,
      Treeselect
    },
    methods: {
      getsectors(subtenant) {

         Vue.axios.get('/loadSection/'+subtenant)
           .then(response => {
             if (response.data.code == 200) {
               //this.state.loading = true,
               this.sortByTenant=response.data.id;
               this.$store.dispatch('loadSubTenants', this.sortByTenant);
               this.sortBySubTenant=response.data.child_subtenant_id;

             }
           });

     },

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
      printmindmap(mindmapdiv)
      {
        //alert(this.$store.state.nameselected)
        var mywindow = window.open('', 'PRINT', 'height=1000,width=600');

        mywindow.document.write('<style>.mindmap-svg {\n' +
          '  height: 80vh;\n' +
          '  width: 100%; }\n' +
          '  .mindmap-svg:focus {\n' +
          '    outline: none; }\n' +
          '\n' +
          '.mindmap-node > a {\n' +
          '  background: #f5f5f5;\n' +
          '  border-radius: 10px;\n' +
          '  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n' +
          '  color: #212121;\n' +
          '  display: inline-block;\n' +
          '  font-family: \'Raleway\';\n' +
          '  font-size: 22px;\n' +
          '  margin: 0 auto;\n' +
          '  padding: 15px;\n' +
          '  text-align: center;\n' +
          '  text-decoration: none;\n' +
          '  transition: background-color .2s, color .2s ease-out; }\n' +
          '  .mindmap-node > a[href]:hover {\n' +
          '    background-color: #f57c00;\n' +
          '    color: #fff;\n' +
          '    cursor: pointer; }\n' +
          '\n' +
          '.mindmap-node--editable {\n' +
          '  cursor: all-scroll; }\n' +
          '  .mindmap-node--editable > a {\n' +
          '    pointer-events: none;\n' +
          '  background-color: #cdcdcd\n' +
          '  }\n' +
          '\n' +
          '.mindmap-subnode-group {\n' +
          '  align-items: center;\n' +
          '  border-left: 4px solid #9e9e9e;\n' +
          '  display: flex;\n' +
          '  margin-left: 15px;\n' +
          '  padding: 5px;\n' +
          '\n' +
          '}\n' +
          '  .mindmap-subnode-group a {\n' +
          '    color: #212121;\n' +
          '    font-family: \'Raleway\';\n' +
          '    font-size: 16px;\n' +
          '    padding: 2px 5px;\n' +
          '  /*background-color: red}*/\n' +
          '}\n' +
          '\n' +
          '.mindmap-connection {\n' +
          '  fill: transparent;\n' +
          '  stroke: #9e9e9e;\n' +
          '  stroke-dasharray: 10px 4px;\n' +
          '  stroke-width: 3px; }\n' +
          '\n' +
          '.mindmap-emoji {\n' +
          '  height: 24px;\n' +
          '  vertical-align: bottom;\n' +
          '  width: 24px;\n' +
          '  visibility: hidden!important;\n' +
          '}\n' +
          '\n' +
          '.reddit-emoji {\n' +
          '  border-radius: 50%; }\n</style></style><html><head><title>' + this.$store.state.nameselected  + '</title>');

        mywindow.document.write('</head><body >');

        mywindow.document.write(document.getElementById(mindmapdiv).innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;

       // window.location.reload(true);
      },
      foo(){
        this.$store.state.linkflag=this.linkflag;
       // alert(this.$store.state.linkflag);
      },
      getsubtenants(){
        this.options='';
        if (this.sortByTenant != null) {
          this.$store.dispatch('loadSubTenants', this.sortByTenant);
          Vue.axios.get('/subtenanttree/' + this.sortByTenant)

            .then(response => {
              if (response.data.code == 200) {
                this.options = response.data.subTenants;


              }
            });
        }
      },
      getmindmap() {
       // alert(this.sortBySubTenant);

        // if (this.sortBySubTenant == null) {
        //   this.$store.dispatch('get_text_title', 'error@m');
        //   this.$store.dispatch('get_text_message', 'please select Organization Unit' + '@m');
        //   Vue.prototype.$notify.error({
        //     title: this.$store.state.title,
        //     message: this.$store.state.message,
        //     type: 'Error',
        //     position: 'top-right'
        //   });
        //   return false;
        //
        // }
        // else {
        // alert("hi");
        sessionStorage.setItem('mindmapid', this.sortBySubTenant);
        sessionStorage.setItem('mindmapsectorid', this.sortByTenant);
        sessionStorage.setItem('linkflag', this.linkflag);
          this.$store.state.linkflag = this.linkflag;
          this.$store.state.nodes2 = [];
          this.$store.state.connections2 = [];
          this.$store.dispatch('loadmindmapdata', [this.sortBySubTenant, this.linkflag]);
          //this.$store.state.isLoading = false;
        // }
      },

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
      // loadmindmapdata(){
      //   Vue.axios.get('mindmapdata')
      //     .then(response => {
      //       console.log(response.data.data)
      //     })
      //
      // }
    }
  }

</script>
<style>
  .mindmap-svg {
    overflow: visible !important;
  }
  /*width: 100%;*/
  @media print {
    html, body {
      height: 99%;
    }
  }

  #hidespan {
  display: none;
  }
  /*.mindmap-subnodes {*/
    /*transform: scaleX(-1) !important;*/
  /*}*/
  #node-undefined {
    transform: scaleX(-1) !important;
  }
  .mindmap-svg
  {
    transform: scaleX(-1) !important;
  }
  .mindmap-subnode-group a

  {
    transform: scaleX(-1) !important;
    direction: rtl;
  }
  #process {
    background-color: #dbf21f !important;
  }
</style>
