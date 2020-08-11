<template>
  <div class="app animated fadeIn">
    <b-row>
    <b-col cols="12" lg="6">
      <b-card no-header>
        <template slot="header">
          User id:  {{ $route.params.id }}
        </template>
        <b-table striped small fixed responsive="sm" :items="getTanent($route.params.id)" :fields="fields">
          <template slot="value" slot-scope="data">
            <strong>{{data.item.value}}</strong>
          </template>
        </b-table>
        <template slot="footer">
          <b-button variant="primary" @click="goBack"><i class="icon-arrow-left icons font-1xl"></i> Back</b-button>
        </template>
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import { store } from '@/components/tenant/store/store'

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
    this.$store.dispatch('loadTanent')
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
    goBack() {
      this.$router.go(-1)
    },
    getTanent(id) {
      const tanent = this.$store.state.tanents.find( tanent => tanent.idSubTenant.toString() === id)
      const tanentDetails = tanent ? Object.entries(tanent) : [['id', 'Not found']]
      return tanentDetails.map(([key, value]) => {return {key: key, value: value}})
    },
  }
}
</script>
