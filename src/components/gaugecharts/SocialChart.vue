<script>
    import { Line } from 'vue-chartjs'
    import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
    import {store} from '@/components/gaugecharts/store';

    export default {
        extends: Line,
        props: {
            data: {
                type: Array,
                default: () => [0, 22, 34, 46, 58, 70, 46]
            },
            height: {
                type: String,
                default: '100'
            }
        },
        mounted () {
            this.renderChart(
                {
                    labels: this.$store.getters.kpi_arraylabel,
                    datasets: [
                        {
                            backgroundColor: 'rgba(255,255,255,.1)',
                            borderColor: 'rgba(255,255,255,.55)',
                            pointHoverBackgroundColor: '#fff',
                            borderWidth: 2,
                            data: this.$store.getters.kpi_arrayvals
                        }
                    ]
                },
                {
                    tooltips: {
                        enabled: false,
                        custom: CustomTooltips
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            display: false
                        }],
                        yAxes: [{
                            display: false
                        }]
                    },
                    elements: {
                        point: {
                            radius: 0,
                            hitRadius: 10,
                            hoverRadius: 4,
                            hoverBorderWidth: 3
                        }
                    }
                }
            )
        },
        watch: {
            data: {
                handler() {
                    this.renderChart(
                        {
                            labels: this.$store.getters.kpi_arraylabel,
                            datasets: [
                                {
                                    backgroundColor: 'rgba(255,255,255,.1)',
                                    borderColor: 'rgba(255,255,255,.55)',
                                    pointHoverBackgroundColor: '#fff',
                                    borderWidth: 2,
                                    data: this.$store.getters.kpi_arrayvals
                                }
                            ]
                        },
                        {
                            tooltips: {
                                enabled: false,
                                custom: CustomTooltips
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    display: false
                                }],
                                yAxes: [{
                                    display: false
                                }]
                            },
                            elements: {
                                point: {
                                    radius: 0,
                                    hitRadius: 10,
                                    hoverRadius: 4,
                                    hoverBorderWidth: 3
                                }
                            }
                        }
                    )
                }
            }
        }
    }
</script>
