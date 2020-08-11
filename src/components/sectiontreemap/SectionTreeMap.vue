<template>
    <div id="app" >
        <!-- <div class='wrapper'> -->
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header" style="text-align:left" >


                        <table align="right"  >
                            <tr>
                                <td><strong> Section KPI MAP</strong></td>
                                <td>
                                    &nbsp; &nbsp;
                                    {{sector_name}}
                                </td>

                            </tr>
                        </table>

                        <button  id="myPrntbtn" v-on:click="loaded"><i  class="fa fa-print "></i></button>


                    </div>
                    <div class="card-body">
                        <b-container class="bv-example-row"  >
                            <b-row>

                                <b-col cols="2" >
                                    <strong>

                                        {{ this.get_text('sector_name@gaugechart@l') }}
                                    </strong>
                                    <!-- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <this.value_type{{this.mtp_options}}input v-model="kpi_name" placeholder="edit me"> -->

                                </b-col>
                                <b-col cols="2">
                                    {{this.sector_name}}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('dept_name@gaugechart@l') }}
                                    </strong>
                                    <!-- &nbsp;&nbsp;
                                    <input v-model="org_unit" placeholder="edit me"> -->
                                </b-col>
                                <b-col cols="2">
                                    {{this.dept_name}}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text(' section_name@gaugechart@l') }}

                                    </strong>
                                    <!-- <label for="date-mask">As of Date</label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <masked-input v-model="as_of_date" mask="1111 / 11 / 11" placeholder="Date" name="date-mask" id="todays"/>  -->
                                </b-col>
                                <b-col cols="2">
                                    {{this. section_name}}
                                </b-col>

                            </b-row>
                            <br>
                            <b-row>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('mtp@gaugechart@l') }}

                                    </strong>
                                    <!-- <label for="date-mask2">Last Value Date </label>

                                      <masked-input v-model="last_value_date" mask="11 / 11 / 1111" placeholder="Date" name="date-mask2"/> -->
                                </b-col>
                                <b-col cols="2">
                                    {{
                                    this.mtp
                                    }}
                                </b-col>

                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('current_date@gaugechart@l') }}
                                    </strong>
                                    <!-- <input v-model="last_value" placeholder="edit me"> -->
                                </b-col>
                                <b-col cols="2">
                                    {{this.current_date}}
                                </b-col>
                                <b-col cols="2">
                                    <strong>
                                        {{ this.get_text('no_of_kpi@gaugechart@l') }}
                                    </strong>

                                </b-col>
                                <b-col cols="2">
                                    {{this.no_of_kpi}}
                                </b-col>
                            </b-row>

                        </b-container>
                        <br>

                        <b-container id="treemap1" class="bv-example-row" dir="ltr"  >
                            <b-row>
                                <div class="control_wrapper" style="margin:auto" >
                                    <ejs-treemap id="treemap"  :dataSource='dataSource' :rangeColorValuePath='rangeColorValuePath' :weightValuePath='weightValuePath' :leafItemSettings='leafItemSettings'  :tooltipSettings='tooltipSettings' :layoutType='layoutType' ></ejs-treemap>
                                </div>
                            </b-row>
                        </b-container>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    // import { enableRtl } from '@syncfusion/ej2-base';
    import {store} from '@/components/store';
    //  import Template1 from "./LabelTemplate.vue";
    import moment from 'moment';
    import  { TreeMapPlugin,TreeMapLegend,TreeMapTooltip } from '@syncfusion/ej2-vue-treemap';
    Vue.use(TreeMapPlugin);

    let contentVue = Vue.component("contentTemplate", {
        template: '<div><p>Name : {{data.State}}</p><p>Current Value : {{data.Current}}</p></div>',
        data() {
            return {
                data: {}
            };
        }
    });

    let contentTemplate = function() {
        return { template: contentVue };
    };
    export default {
        store: store,
        data: function () {
            return {
                // width:"80%",
                // height:"80%",

                i:0,
                j:0,
                sector_name:null,
                dept_name:null,
                section_name:"خطة 2010-2012 لوزارة المالية",
                mtp:null,
                current_date:null,
                no_of_kpi:null,





                dataSource: [

                    { Title: 'قسم متابعة الشركات الكويتية', State: "state", Count: 3,Current: 84 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "2state", Count: 3,Current: 100 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "3state", Count: 3 ,Current: 99 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state4", Count: 3 ,Current: 101},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state5", Count: 3 ,Current: 201},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state6", Count: 3,Current: 85 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state7", Count: 3,Current: 101 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state8", Count: 3 ,Current: 83},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state9", Count: 3 ,Current: 102},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state10", Count: 3 ,Current: 203},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state11", Count: 3,Current: 208 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state12", Count: 3,Current: 105 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state13", Count: 3 ,Current: 90 },
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state14", Count: 3 ,Current: 108},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state15", Count: 3 ,Current: 205},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state16", Count: 3 ,Current: 105},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state17", Count: 3 ,Current: 305},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state18", Count: 3 ,Current: 205},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state17", Count: 3 ,Current: 305},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state19", Count: 3 ,Current: 205},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state20", Count: 3 ,Current: 305},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state21", Count: 3 ,Current: 205},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state22", Count: 3 ,Current: 305},
                    { Title: 'قسم متابعة الشركات الكويتية', State: "state23", Count: 3 ,Current: 205},

                ],
                //  enableRtl:true,
                legendSettings: {
                    visible: true,
                    position: 'Bottom',
                    shape: 'Rectangle'
                },

                weightValuePath:'Count',
                rangeColorValuePath:'Current',
                tooltipSettings: {
                    visible: true,
                    format: ' <b >KPI Name:${State}</b><br>Current : ${Current}%<br>Target : ${Current} %<br>Org Unit Name : ${Title}'
                },
                leafItemSettings: {
                    labelPath: 'State',
                    labelPosition:'TopRight',
                    colorMapping:[
                        {
                            from:-999,
                            to:0,
                            color:'red'
                        },
                        {
                            from:1,
                            to:84,
                            color:'#FFA500'
                        },

                        {
                            from:84.1,
                            to:99,
                            color:'#90EE90'
                        },
                        {
                            from:100,
                            to:100,
                            color:'green'
                        },
                        {
                            from:101,
                            to:200,
                            color:'blue'
                        },
                        {
                            from:201,
                            to:999,
                            color:'red'
                        },
                    ]
                }
            }
        },
        provide: {
            // circulargauge: [Annotations]
            //  treemap:[TreeMapLegend],
            treemap:[TreeMapTooltip]
        },
        components:{

        },
        methods: {
            loaded: function(args) {
                var printButton = document.getElementById("myPrntbtn");
                printButton.style.visibility = 'hidden';
                window.print()
                printButton.style.visibility = 'visible';

            },






            get_text(textbit) {
                var transtext = this.$store.state.translations[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if(spliteText.length > 2) {
                        var newTxt = (spliteText[0]+'@'+'l');
                        var transtext1 = this.$store.state.translations[this.$i18n.locale][newTxt];
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
        created() {
            this.$store.dispatch('translation');

            this.$store.dispatch('loadKPIvalue');
            this.$store.dispatch('loadKPIquarter');
            this.$store.dispatch('loadMTP');

        },



        computed:{

        }}


</script>
<style>

    @media print {


        body {
            margin-right: 0px;
            margin-left: 0px;
            font-size: 10px ;
            line-height: 1;
            background: #fff !important;
            color: #000;
            display: block;
        }
        .row{
            width:85%;
            /* height:50%;      */
            /* float:right; */

        }
        .col-2{
            max-width: 13%;

        }


        #treemap{
            /* display: block;  */
            padding-left: 100px;
            padding-right: 100px;
            margin-right: 200px;
            margin-left:100px;

            /* margin:auto; */
        }
        svg
        {   display:block;
            transform:scale(0.6) translate(0px,0px);

        }


        /** Seitenränder einstellen    */
        @page { size: auto;  margin: 0mm; }

        .sidebar,.breadcrumb,.noprint{
            display: none;
        }
    }
    /* .wrapper {
      max-width: 400px;
      max-height:100px;
      margin: 0 auto;
    } */


</style>



