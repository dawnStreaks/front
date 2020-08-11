<template>
<div class="app animated fadeIn">
  <b-row>
    <b-col cols="12" lg="6">
      <b-card no-header>
        <template slot="header">
          User id:  {{ $route.params.id }}
        </template>
        <b-table striped small fixed responsive="sm" :items="items($route.params.id)" :fields="fields">
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
import { store } from '@/components/user/store/store'

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
    this.$store.dispatch('loadUsers')
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
    items(id) {
      const user = this.$store.state.users.find( user => user.id.toString() === id)
      const userDetails = user ? Object.entries(user) : [['id', 'Not found']]
      return userDetails.map(([key, value]) => {return {key: key, value: value}})
    },
  }
}
</script>
