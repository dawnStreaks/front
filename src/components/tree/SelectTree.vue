<template>
    <optgroup :label="get_text('select_the_parent_entity@users@l')" v-html="html">
        {{ this.tree}}
    </optgroup>
</template>

<script>
    export default{
        mounted(){
            this.buildTree(this.tree , 1 )
        },
        data(){
            return{
               dash:'-',
               firstTime:0,
               html:'',
                translation:[]
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        props: [ 'tree'],
        methods:{
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
            buildTree(tree , rep = 1){
                var html = '' ;
                var app = this ;
                var dash = "--" ;
                tree.forEach(function(element){
                    app.firstTime ++ ;
                    if((element.bpm_ref == null || element.bpm_ref == 0)){
                    app.html+= "<option value='"+element.id+"'>"+dash.repeat(rep) +element.name+"</option>";
                    }

                    if(typeof element.tree != "undefined"){
                        if(element.tree.length > 0){
                            app.buildTree(element.tree , rep + 2 )
                        }
                    }
                })
                return app.html ;
            }
        },
        watch:{
            tree:{
                handler(){
                    this.html = '' ;
                    this.buildTree(this.tree)
                },
                deep:true
            }
        }
    }

</script>
