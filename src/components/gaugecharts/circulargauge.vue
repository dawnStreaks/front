<template>
    <div class='wrapper'>
        <ejs-circulargauge ref="circulargauge1">
            <e-axes>
                <e-axis startAngle=220 endAngle=160 :minimum='(this.kpi_circleMin)' :maximum='this.kpi_circleMax' radius='70%'
                        :annotations='annotations' :pointers='pointers' :ranges='ranges'
                        :lineStyle='lineStyle' :minorTicks='minorTicks'
                        :majorTicks='majorTicks'>
                </e-axis>
            </e-axes>
        </ejs-circulargauge>
    </div>
</template>
<script>
    import {Doughnut} from 'vue-chartjs'
    import {store} from '@/components/gaugecharts/store';
    import {CircularGaugePlugin, Annotations} from "@syncfusion/ej2-vue-circulargauge";

    export default {
        extends: Doughnut,
        store: store,
        props: ['target', 'actual', 'kpi_status', 'improved', 'languages1', 'languages2', 'min_allowed', 'kpi_circleMin', 'kpi_circleMax', 'value_explanation', 'kpi_circleInterval'],
        data() {
            return {
                majorTicks: {
                    width: 1,
                    color: '#8c8c8c',
                    interval: this.kpi_circleInterval
                },
                lineStyle: {
                    width: 2
                },
                minorTicks: {
                    width: 1,
                    color: '#8c8c8c'
                },
                pointers: [
                    {
                        value: ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ),
                        type: 'Marker',
                        markerShape: 'InvertedTriangle',
                        radius: '100%',
                        markerHeight: 15,
                        markerWidth: 15
                    },
                    {
                        value: ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ),
                        radius: '60%'
                    }
                ],
                annotations: [
                    {
                        content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages1 + ':' + ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                        angle: this.improved,
                        radius: '100%',
                        zIndex: '1',
                    },
                    {
                        content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages1 + ':' + ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                        angle: 60,
                        radius: '20%',
                        zIndex: '1',
                    },
                ],
                ranges: [
                    {
                        start: 0,
                        end: ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ),
                        radius: '110%',
                        endWidth: 15,
                        startWidth: 15,
                        color: this.getKpiStatusRangeColor(),
                    }
                ],
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        provide: {
            circulargauge: [Annotations]
        },
        methods: {
            getKpiStatusRangeColor: function () {
                /*return (
                    (this.actual != null && this.actual <= this.min_allowed ? "#cc043e" :
                        (this.actual != null && this.actual > this.min_allowed && this.actual < this.target) ? "#ffa500" :
                            ((this.actual != null && (this.actual == this.target) ? "#01996d" :
                                (this.actual != null && (this.actual > this.target) && (this.actual <= this.improved)) ? "#0475CC" :
                                    ((this.actual != null && (this.actual > this.improved)) ? "#065a9b" : "")))))*/
                var colorBg = '';
                if(this.value_explanation == 1 || this.value_explanation == 2 || this.value_explanation ==3) {
                    colorBg = (this.actual == null ? "#FFF" :
                        (this.actual >= this.min_allowed && this.actual <= this.target ? "#01996d" :
                            (this.target < this.actual && this.actual <= this.improved ? "#3e98a3" :
                                (this.improved<this.actual ? "#065a9b" :
                                    ((this.target+this.min_allowed)/2 <= this.actual && this.actual < this.min_allowed ? "#ffa500" :
                                        (this.actual<(this.target+this.min_allowed)/2 ? "#cc043e" : ""))))))
                } else if(this.value_explanation == 11 || this.value_explanation == 12 || this.value_explanation ==13) {
                    colorBg = (this.actual == null ? "#FFF" :
                        (this.target<=this.actual && this.actual<=this.improved ? "#01996d" :
                            (this.min_allowed<=this.actual && this.actual<this.target ? "#3e98a3" :
                                (this.improved<this.actual ? "#065a9b" :
                                    ((this.target+this.min_allowed)/2<=this.actual && this.actual<this.min_allowed ? "#ffa500" :
                                        (this.actual<(this.target+this.min_allowed)/2 ? "#cc043e" : ""))))))
                } else if(this.value_explanation == 4) {
                    colorBg = (this.actual == null ? "#FFF" :
                        (this.target<=this.actual ? "#01996d" :
                            (this.actual<this.target ? "#cc043e" : "")))
                } else if(this.value_explanation == 14) {
                    colorBg = (this.actual == null ? "#FFF" :
                        (this.actual<=this.target ? "#01996d" :
                            (this.target<this.actual ? "#cc043e" : "")))
                }

                return colorBg;
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
            improved2() {
                var kpi_name = this.$store.state.kpi_value
                var kpi_improved = (kpi_name.length > 0) ? ((kpi_name[0]['target_value'] * (1 + kpi_name[0]['margin_pct']))) + 10 : 0;
                kpi_improved = kpi_improved.toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                return kpi_improved
            },
        },
        watch: {
            target: {
                handler() {
                    this.majorTicks= [{
                        width: 1,
                            color: '#8c8c8c',
                            interval: this.kpi_circleInterval
                    }];
                    this.pointers = [
                        {
                            value: ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding) : this.target) : this.target ),
                            type: 'Marker',
                            markerShape: 'InvertedTriangle',
                            radius: '100%',
                            markerHeight: 15,
                            markerWidth: 15
                        },
                        {
                            value: ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding) : this.actual) : this.actual ),
                            radius: '60%'
                        }
                    ];
                    this.annotations = [
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages1 + ':' + ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                            angle: 5,
                            radius: '110%',
                            zIndex: '1',
                        },
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages2 + ':' + ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                            angle: 30,
                            radius: '20%',
                            zIndex: '1',
                        },
                    ];
                    this.ranges = [
                        {
                            start: 0,
                            end: ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding) : this.actual) : this.actual ),
                            radius: '100%',
                            endWidth: 15,
                            startWidth: 15,
                            color: this.getKpiStatusRangeColor(),
                        }
                    ]
                },
                immediate: true
            },
            actual: {
                handler() {
                    this.majorTicks= [{
                        width: 1,
                            color: '#8c8c8c',
                            interval: this.kpi_circleInterval
                    }];
                    this.pointers = [
                        {
                            value: ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding) : this.target) : this.target ),
                            type: 'Marker',
                            markerShape: 'InvertedTriangle',
                            radius: '100%',
                            markerHeight: 15,
                            markerWidth: 15
                        },
                        {
                            value: ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding) : this.actual) : this.actual ),
                            radius: '60%'
                        }
                    ];
                    this.annotations = [
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages1 + ':' + ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '<label style="' + ((this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]["value_type"] != 2) ? "display:none" : "") + '"> </label></div>',
                            angle: 5,
                            radius: '110%',
                            zIndex: '1',
                        },
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages2 + ':' + ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '<label style="' + ((this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]["value_type"] != 2) ? "display:none" : "") + '"></label></div>',
                            angle: 30,
                            radius: '20%',
                            zIndex: '1',
                        },
                    ];
                    this.ranges = [
                        {
                            start: 0,
                            end: ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding) : this.actual) : this.actual ),
                            radius: '110%',
                            endWidth: 15,
                            startWidth: 15,
                            color: this.getKpiStatusRangeColor(),
                        }
                    ]
                },
                immediate: true
            },
            languages1: {
                handler() {
                    this.annotations = [
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages1 + ':' + ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',
                            angle: 5,
                            radius: '110%',
                            zIndex: '1',
                        },
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages2 + ':' + ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                            angle: 30,
                            radius: '20%',
                            zIndex: '1',
                        },
                    ];
                }
            },
            languages2: {
                handler() {
                    this.annotations = [
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px; font-weight: bold;">' + this.languages1 + ':' + ((this.target != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.target*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                            angle: 5,
                            radius: '110%',
                            zIndex: '1',
                        },
                        {
                            content: '<div style="color:#757575; font-family:Roboto; font-size:10px;font-weight: bold;">' + this.languages2 + ':' + ((this.actual != null) ? ((this.$store.state.kpi_value[0]['value_type'] == 2) ? (this.actual*100).toFixed(this.$store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+'%' : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')) : this.actual.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') ) + '</div>',//currentTemplate,
                            angle: 30,
                            radius: '20%',
                            zIndex: '1',
                        },
                    ];
                }
            }
        }
    }
</script>
