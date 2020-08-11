<script>
    import {Doughnut} from 'vue-chartjs'
    import {store} from '@/components/gaugecharts/store';

    export default {
        extends: Doughnut,
        store: store,
        props: ['chartdata','improved', 'languages'],
        data() {
            return {
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        mounted() {
            this.buildChart(this.chartdata,this.improved)
        },
        methods: {
            buildChart () {
                this.renderChart({
                    labels: [this.languages],
                    datasets: [
                        {
                            backgroundColor: [

                                '#FE7F01'
                            ],
                            data: [this.chartdata, (this.improved-this.chartdata)],

                        }
                    ]
                }, {responsive: false, maintainAspectRatio: false, cutoutPercentage:70,})
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
        },
        watch: {
            chartdata: {
                handler() {
                    this.chart_val = [this.chartdata, this.improved];
                    this.buildChart(this.chartdata,(this.improved-this.chartdata))
                },
                deep: true
            },
            languages: {
                handler() {
                    this.buildChart(this.chartdata,(this.improved-this.chartdata))
                }
            }
        }
    }
</script>
