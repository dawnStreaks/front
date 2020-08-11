<template>
  <div id="app">
    <treeselect  :options="options" v-model="sortBySubTenant"  />
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Vue from "vue";

  export default {
    // register the component
    props: ['sortBySubTenant'],
    components: { Treeselect },
    data() {
      return {
        // define the default value
        value: null,
        sortBySubTenant:null,
        subid:'',
        options:'',
        // define options
        // options:
        //   [ {
        //   id: 'a',
        //   label: 'a',
        //   children: [ {
        //     id: 'aa',
        //     label: 'aa',
        //     ssd:'wwwqew'
        //   }, {
        //     id: 'ab',
        //     label: 'ab',
        //     ssd:'wwwqew'
        //   } ],
        // }, {
        //   id: 'b',
        //   label: 'b',
        //   ssd:'wwwqew'
        // }, {
        //   id: 'c',
        //   label: 'c',
        //   ssd:'wwwqew'
        // } ],
      }

    },
    mounted(){
      this.subid=9;
      Vue.axios.get('/subtenanttree/'+this.subid)

        .then(response => {
          if (response.data.code == 200) {
            this.options = response.data.subTenants;


          }
        });

    },

  }
</script>
