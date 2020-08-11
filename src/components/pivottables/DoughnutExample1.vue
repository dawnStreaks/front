<script>
import { Doughnut } from 'vue-chartjs'
import {store} from '@/components/store';

export default {
  extends: Doughnut,
     store: store,
     computed:{

     },

  methods:{
     min_allowed1(){
               var kpi_name=  this.$store.getters.kpi_value  
               var kpi_min_allowed= kpi_name[0].acc_value 
               var kpi_value_type= kpi_name[0].value_type 
               if(kpi_value_type!=1)
                  {
                    kpi_improved=kpi_name[0].improved_value 
                    kpi_min_allowed=(kpi_min_allowed/kpi_improved)*100
                  }
                 return kpi_min_allowed
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
            
        },
  
  mounted () {
        props: ['data','options'],
    this.renderChart({
      labels: [this.get_text('min_allowed@gaugechart@l')],
      datasets: [
        {
          backgroundColor: [
            '#FFA500',
            
          ],
          data: [this.min_allowed1(),(100-this.min_allowed1())],
          //percentageInnerCutout: 90,
        //  cutoutPercentage:70,

        //  options: {
        //   // cutoutPercentage:70,
            
        //   }

        }
      ]
    }, {responsive: false, maintainAspectRatio: true, cutoutPercentage:70,

 })
  }
}
</script>

