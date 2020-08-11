<script>
    import {Doughnut} from 'vue-chartjs'
    import {store} from '@/components/gaugecharts/store';

    export default {
        extends: Doughnut,
        store: store,
        props: ['chartdata'],
          beforeCreate()
        {
               this.$store.dispatch('translation');
        },
        mounted() {
            this.$store.dispatch('translation');
            this.buildChart(this.chartdata);

        },
        methods: {
            buildChart() {
                this.renderChart({
                    labels: [this.get_text('improved@gaugechart@l')],
                    datasets: [
                        {
                            backgroundColor: [

                                "#0475CC",

                            ],
                            data: [this.chartdata],

                        }
                    ]
                }, {responsive: false, maintainAspectRatio: false, cutoutPercentage: 70,})
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
        },
        created() {
            this.$store.dispatch('translation');
        },
        watch: {
            chartdata: {
                handler() {
                    this.chart_val = [this.chartdata];
                    this.buildChart(this.chartdata)
                },
                deep: true
            }
        }
    }
</script>
