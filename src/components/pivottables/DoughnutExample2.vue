<script>
import { Doughnut } from 'vue-chartjs'
import {store} from '@/components/store';

export default {
  extends: Doughnut,
  store: store,

  methods:{
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
            target1(){
              var kpi_name=  this.$store.getters.kpi_value  
               var kpi_target_value= kpi_name[0].acc_value 
               var kpi_value_type= kpi_name[0].value_type 
               if(kpi_value_type!=1)
                  {
                    kpi_improved=kpi_name[0].improved_value 
                   kpi_target_value=(kpi_target_value/kpi_improved)*100
                  }
                 return kpi_target_value
            }
  },
  created() {
            this.$store.dispatch('translation');
            this.$store.dispatch('loadKPIvalue');

        },
  mounted () {
    this.renderChart({
      labels: [this.get_text('target@gaugechart@l')],
      datasets: [
        {
          backgroundColor: [
            
            '	#008000'
          ],
          data: [this.target1(),(100-this.target1())],
          
        }
      ]
    }, {responsive: false, maintainAspectRatio: false, cutoutPercentage:70,})
  }
}
</script>
