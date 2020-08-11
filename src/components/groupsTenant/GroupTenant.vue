<template>
  <div class="app animated fadeIn">
    <b-row>
    <b-col cols="12" lg="6">
      <b-card no-header>
        <template slot="header">
          User id:  {{ $route.params.id }}
        </template>
        <b-table striped small fixed responsive="sm" :items="groupDetail($route.params.id)" :fields="fields">
          <template slot="value" slot-scope="data">
            <strong>{{data.item.value}}</strong>
          </template>
        </b-table>
        <template slot="footer">
          <b-button variant="primary" @click="goBack"><i class="icon-arrow-left icons font-1xl"></i>{{ this.get_text('Back@l')}} </b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import { store } from '@/components/groupsTenant/store/store'
export default {
  name: 'User',
  store:store,
  props: {
    caption: {
      type: String,
      default: 'User id'
    },
  },
  created () {
    this.$store.dispatch('loadGroups')
  },
  data: () => {
    return {
      fields: [
        {key: 'key'},
        {key: 'value'},
      ],
    }
  },
  methods: {
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
    goBack() {
      this.$router.go(-1)
    },
    groupDetail(id) {
      const group = this.$store.state.groups.find( group => group.id.toString() === id)
      const groupDetails = group ? Object.entries(group) : [['id', 'Not found']]
      return groupDetails.map(([key, value]) => {return {key: key, value: value}})
    },
  }
}
</script>
