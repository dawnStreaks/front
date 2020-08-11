<template>
  <div class="control-section" style="overflow: auto">
    <div class="content-wrapper">
      <ejs-treegrid
        :dataSource='data'
        idMapping='sub_id'
        parentIdMapping='sub_parent'
        hasChildMapping='true'
        :treeColumnIndex='0'
        >

      <!--<ejs-treegrid
        :dataSource='data'
        childMapping='subtasks'
        :treeColumnIndex='1'
        :allowPaging='true'
        :pageSettings='pageSettings'>-->
        <e-columns>
          <!--<e-column field='sub_id' headerText='Task ID' width='70' textAlign='Right'></e-column>-->
          <e-column field='sub_name' headerText='Sectors' width='200'></e-column>
          <e-column field='kpi_count' headerText='KPI Count' width='90' textAlign='Right'></e-column>
          <e-column field='by_strategy' headerText='By Strategy' width='90' textAlign='Right'></e-column>
          <e-column field='kpi_up_to_date' headerText='Up to date' width='90' textAlign='Right'></e-column>
          <e-column field='not_uptodate' headerText='Not up to date' width='90' textAlign='Right'></e-column>
          <e-column field='kpi_eff' headerText='By Efficiency' width='90' textAlign='Right'></e-column>
          <e-column field='kpi_active' headerText='By Active' width='90' textAlign='Right'></e-column>
          <e-column field='not_active' headerText='By Not Active' width='90' textAlign='Right'></e-column>
          <!--<e-column field='endDate' headerText='End Date' width='90' format="yMd" textAlign='Right'></e-column>
          <e-column field='duration' headerText='Duration' width='80' textAlign='Right'></e-column>
          <e-column field='progress' headerText='Progress' width='80' textAlign='Right'></e-column>
          <e-column field='priority' headerText='Priority' width='90'></e-column>-->
        </e-columns>
      </ejs-treegrid>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import { TreeGridPlugin, Filter, TreeGridComponent, Sort, Reorder, ITreeData, Page } from
      "@syncfusion/ej2-vue-treegrid";
  import { QueryCellInfoEventArgs, Column, getObject, ActionEventArgs } from '@syncfusion/ej2-grids';
  import { addClass, isNullOrUndefined } from '@syncfusion/ej2-base';

  Vue.use(TreeGridPlugin);

  export default {
    props: ['kpivlaues', 'translation'],
    data() {
      return {
        translation: [],
        data: {},
        pageSettings: { pageCount: 4 },
      }
    },
    provide: {
      //treegrid: [ Page ]
      treegrid: [ Filter, Sort, Reorder, Page ]
    },
    /*beforeMount() {
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
      //  this.$store.dispatch('loadDashboardValues');
    },*/
    methods: {
      get_text(textbit) {
        if ((typeof this.translation[this.$i18n.locale][textbit] != "undefined" && this.translation[this.$i18n.locale][textbit] != null)) {
          return this.translation[this.$i18n.locale][textbit];
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
    },
    watch: {
      kpivlaues: {
        handler() {
          this.data = this.kpivlaues
        }
      }
    }
  }
</script>
