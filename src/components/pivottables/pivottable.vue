<template>
    <div id="app">
        <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showFieldList="showFieldList"> </ejs-pivotview>
    </div>
</template>

<script>
import Vue from "vue";
import { PivotViewPlugin, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './datasource.js';

Vue.use(PivotViewPlugin);

export default {
  data () {
    return {
      dataSourceSettings: {
        dataSource:  [
                { Amount: 100, Country: "Canada", Products: "Bike",Year: "1990", Quarter:"Q1", Sold:"3" },
                { Amount: 200, Country: "Germany", Products: "Van",Year: "1991", Quarter:"Q1", Sold:"3"  },
                { Amount: 300, Country: "Germany", Products: "Car",Year: "1991", Quarter:"Q2", Sold:"4"  },
                { Amount: 150, Country: "United Kingdom", Products: "Bike",Year: "1990", Quarter:"Q3", Sold:"4"  },
                { Amount: 200, Country: "Canada", Products: "Car",Year: "1990", Quarter:"Q2", Sold:"5"  }
            ],
        // pivotData,
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: [],
        calculatedFieldSettings: [{ name: 'Total', formula: '"Sum(Amount)"+"Sum(Sold)"' }]
      },
      showFieldList: true,
      height: 350
    }
  },
  provide: {
    pivotview: [FieldList]
  }
}
</script>
<style>

@import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-grids/styles/material.css";
@import "../../../node_modules/@syncfusion/ej2-pivotview/styles/material.css";
</style>