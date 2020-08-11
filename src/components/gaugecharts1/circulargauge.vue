<template>
<ejs-circulargauge ref="circulargauge1">
    <e-axes>
        <e-axis startAngle=230 endAngle=140 :maximum=this.improved2() radius='60%'
                :annotations='annotations' :pointers='pointers' :ranges='ranges'
                :lineStyle='lineStyle' :minorTicks='minorTicks'
                :majorTicks='majorTicks'>
        </e-axis>
    </e-axes>
</ejs-circulargauge>
</template>
<script>
    import {Doughnut} from 'vue-chartjs'
    import {store} from '@/components/gaugecharts/store';
    import { CircularGaugePlugin,Annotations } from "@syncfusion/ej2-vue-circulargauge";

    export default {
        extends: Doughnut,
        store: store,
        props: ['target', 'actual', 'kpi_status', 'improved'],
        data() {
            return {
                majorTicks: {
                    width: 1, color: '#8c8c8c'
                },
                lineStyle: {width: 2},
                minorTicks: {
                    width: 1, color: '#8c8c8c'
                },
                pointers: [{
                    value: this.target,
                    type: 'Marker',
                    markerShape: 'InvertedTriangle',
                    radius: '100%',
                    markerHeight: 15,
                    markerWidth: 15
                },
                    {
                        value: this.actual,
                        radius: '60%'
                    }],
                annotations:[{
                    content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('value_targetted@gaugechart@l') + ':'+this.target+'</div>',//currentTemplate,
                    angle: this.improved,
                    radius: '120%',
                    zIndex: '1',
                },

                    {
                        content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('actual@gaugechart@l') + ':'+this.actual+'</div>',//currentTemplate,
                        angle:60,
                        radius: '20%',
                        zIndex: '1',
                    },

                ],
                ranges: [{

                    start: 0,
                    end:this.actual,
                    radius: '110%',
                    endWidth: 15,
                    startWidth: 15,
                    color:this.getKpiStatusRangeColor(),//'#ff5985'  ,////this.kpi_status==100?'green':'blue',//
                }],
            }
        },
        provide: {
            circulargauge: [Annotations]
        },
        /*mounted(){
            this.buildChart(this.chartdata )
        },*/
         mounted()
        {
               this.$store.dispatch('translation');
        },
        methods: {
                        getKpiStatusRangeColor: function () {

                if (this.kpi_status != '' && this.kpi_status < 0)
                    return ' #cc043e';

                else if (this.kpi_status != '' && (this.kpi_status >= 0) && (this.kpi_status <= 84))
                    return '#FF3333';

                else if (this.kpi_status != '' && (this.kpi_status >= 84.1) && (this.kpi_status < 100))
                    return '#63b23c';

                else if (this.kpi_status != '' && (this.kpi_status == 100))
                    return '#01996d';

                else if (this.kpi_status != '' && (this.kpi_status >= 101) && (this.kpi_status <= 200))
                    return '#0475CC';

                else if (this.kpi_status != '' && (this.kpi_status >= 201))
                    return 'blue';
                else
                    return ''

            },

            get_text(textbit) {
                var transtext = this.$store.state.translations[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if (spliteText.length > 2) {
                        var newTxt = (spliteText[0] + '@' + 'l');
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

             improved2() {
                var kpi_name = this.$store.state.kpi_value
                var kpi_improved = (kpi_name.length > 0) ? ((kpi_name[0]['target_value'] * (1 + kpi_name[0]['margin_pct'])))+10: 0;
                kpi_improved = kpi_improved.toFixed(2)
                //maximum=(130/kpi_improved
                return kpi_improved
            },
        },
        watch: {
            target: {
                handler() {
                    this.pointers = [{
                        value: this.target,
                        type: 'Marker',
                        markerShape: 'InvertedTriangle',
                        radius: '100%',
                        markerHeight: 15,
                        markerWidth: 15
                    },
                        {
                            value: this.actual,
                            radius: '60%'
                        }];
                        this.annotations = [{
                        content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('value_targetted@gaugechart@l') + ':'+this.target+'</div>',//currentTemplate,
                        angle: this.improved,
                        radius: '120%',
                        zIndex: '1',
                    },

                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('actual@gaugechart@l') + ':'+this.actual+'</div>',//currentTemplate,
                             angle:60,
                            radius: '20%',
                            zIndex: '1',
                        },

                    ];

                    this.ranges = [{

                        start: 0,
                        end:this.actual,
                        radius: '110%',
                        endWidth: 15,
                        startWidth: 15,
                        color:this.getKpiStatusRangeColor(),//'#ff5985'  ,////this.kpi_status==100?'green':'blue',//
                    }]
                },
                immediate: true
            },
            actual: {
                handler() {
                     this.pointers = [{
                        value: this.target,
                        type: 'Marker',
                        markerShape: 'InvertedTriangle',
                        radius: '100%',
                        markerHeight: 15,
                        markerWidth: 15
                    },
                        {
                            value: this.actual,
                            radius: '60%'
                        }];

                    this.annotations = [{
                        content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('value_targetted@gaugechart@l') + ':'+this.target+'</div>',//currentTemplate,
                        angle: this.improved,
                        radius: '140%',
                        zIndex: '1',
                    },

                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;">'+this.get_text('actual@gaugechart@l') + ':'+this.actual+'</div>',//currentTemplate,
                            angle:60,
                            radius: '20%',
                            zIndex: '1',
                        },

                    ];

                    this.ranges = [{

                        start: 0,
                        end:this.actual,
                        radius: '110%',
                        endWidth: 15,
                        startWidth: 15,
                        color:this.getKpiStatusRangeColor(),//'#ff5985'  ,////this.kpi_status==100?'green':'blue',//
                    }]
                },
                  immediate: true
            }
            
        }
        
    }
</script>


