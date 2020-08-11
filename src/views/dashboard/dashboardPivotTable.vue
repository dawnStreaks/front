<template>
    <div class="control-section" style="overflow: auto">
      <div class="content-wrapper">
        <ejs-pivotview id="pivotview"
                       :dataSourceSettings="dataSourceSettings"
                       :gridSettings="gridSettings"
                       :width="width"
                       :height="height"
                       :allowExcelExport="allowExcelExport"
                       :allowPdfExport="allowPdfExport"
                       :showToolbar="showToolbar"
                       :modeData="modeData"
                       :toolbar="toolbar"
                       :locale="locale"
                       >
        </ejs-pivotview>
      </div>
    </div>
</template>
<script>
  import Vue from "vue";

  import {store} from '@/views/dashboard/store';
  import { L10n } from '@syncfusion/ej2-base';
  //import {PivotViewPlugin, IDataSet} from "@syncfusion/ej2-vue-pivotview";
  import {
    PivotViewPlugin,
    GroupingBar,
    FieldList,
    IDataSet,
    CalculatedField,
    Toolbar,
    PDFExport,
    ExcelExport,
    ConditionalFormatting
  } from "@syncfusion/ej2-vue-pivotview";

  import {extend, enableRipple} from '@syncfusion/ej2-base';
  //import "@syncfusion/ej2-pivotview/styles/material.css";

  enableRipple(false);

  Vue.use(PivotViewPlugin);
  export default {
    props: ['kpivlaues', 'translation'],
    data() {
      return {
        translation: [],
        dataSourceSettings: {},
        width: "100%",
        gridSettings: {columnWidth: 140},
        height: 600,
        allowExcelExport: true,
        allowConditionalFormatting: true,
        allowPdfExport: true,
        displayOption: { view: "Both" },
        showToolbar: true,
        allowCalculatedField: true,
        showFieldList: true,
        showGroupingBar: true,
        locale: this.$i18n.locale,
        toolbar: [
          /*"New",
          "Save",
          "SaveAs",
          "Rename",
          "Remove",
          "Load",
          "Grid",
          "Chart",
          "MDX",*/
          "Export",
          /*"SubTotal",
          "GrandTotal",
          "ConditionalFormatting",
          "FieldList"*/
        ],
        modeData: ["Excel", "CSV"]
      }
    },
    provide: {
      pivotview: [
        FieldList,
        CalculatedField,
        Toolbar,
        //PDFExport,
        ExcelExport,
        ConditionalFormatting,
        GroupingBar
      ]
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
          this.dataSourceSettings = {
            enableSorting: true,
            //columns: [{ name: "sector_name" }],
            values: [
              {name: "kpi_count", caption: this.get_text('kpi_count@statistics@c')},
              {name: "by_strategy", caption: this.get_text('by_strategy@statistics@c')},
              {name: "kpi_up_to_date", caption: this.get_text('by_uptodate@statistics@c')},
              {name: "not_uptodate", caption: this.get_text('by_notuptodate@statistics@c')},
              {name: "kpi_eff", caption: this.get_text('by_efficiency@statistics@c')},
              {name: "kpi_active", caption: this.get_text('by_active@statistics@c')},
              {name: "not_active", caption: this.get_text('by_notactive@statistics@c')},
              /*{ name: "kpi_count", caption: "Units Sold" },
              { name: "process_count", caption: "Units Sold" },*/
              /*{ name: "Year", caption: "Units Sold" },
              { name: "Quarter", caption: "Units Sold" },
              { name: "Sold", caption: "Units Sold" },
              { name: "Amount", caption: "Sold Amount" }*/
            ],
            //excludeFields: ["sector_name", "sub_name"],
            dataSource: this.kpivlaues,
            rows: [{name: "sub_parent"}, {name: "sub_name"}],
            //formatSettings: [{ name: "Amount", format: "C0" }],
            expandAll: false,
            filters: [],
            showTooltip: false,
            showGrandTotals: true,
          }
        }
      }
    }
  }
</script>
