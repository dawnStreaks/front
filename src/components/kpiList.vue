<template>
  <div class="app animated fadeIn">
    <loading :active.sync="this.$store.state.isLoading"
             :can-cancel="true"
             :is-full-page="this.$store.state.fullPage"></loading>
    <b-row>
      <b-col cols="12" xl="12" ref="formContainer">
        <transition name="slide">
          <b-card>
            <div slot="header">
              <b class="h4">{{ get_text('kpi_list@kpi_def@l') }}<!--{{ $t('greeting') }}--></b>
              <b-link :href="'/newFormGenerator/1'">
                <b-button variant="primary" size="md" class="btn float-right">
                  <b><i class="icon-plus icons font-1xl"></i> {{ get_text('add_kpi@kpi_def@l') }}</b>
                </b-button>
              </b-link>
              <!--<b-link :href="'mindmap'">
                <b-button variant="warning" size="md" class="btn float-right"
                          style="margin-left: 1%; margin-right: 1%">
                  <b><i class="glyphicon-dashboard glyphicon font-1xl"></i> {{
                    get_text('kpi_map@kpi_def@l') }}</b>
                </b-button>
              </b-link>
              <b-link :href="'sectiontreemap'">
                  <b-button variant="warning" size="md" class="btn float-right">
                      <b><i class="glyphicon-dashboard glyphicon font-1xl"></i> {{
                          get_text('kpi_dashboard@kpi_def@l') }}</b></b-button>
              </b-link>-->
              <div class="col-md-5 float-right">
                <b-form-group horizontal :label="get_text('quick_access_link@l')" class="mb-0" label-cols="5"
                              :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                  <b-form-select v-model="selectedLink" @change="quickAccessLink(selectedLink)">
                    <option value="/KpiPerformanceReport">{{ get_text('kpi_performance_report@l') }}</option>
                    <option value="/KpiStatusReport">{{ get_text('kpi_status_report@l') }}</option>
                    <option value="/KpiPivotReport">{{ get_text('kpi_pivot_report@l') }}</option>
                  </b-form-select>
                </b-form-group>
              </div>
              <!--<b-link :href="'KpiPerformanceReport'">
                <b-button variant="success" size="md" class="btn float-right"
                          style="margin-left: 0.2em; margin-right: 0.2em">
                  <b><i class="glyphicon-dashboard glyphicon font-1xl"></i> {{
                    get_text('kpi_performance@kpi_def@l') }}</b>
                </b-button>
              </b-link>
              <b-link :href="'KpiExceptionReport'">
                <b-button variant="success" size="md" class="btn float-right"
                          style="margin-left: 0.2em; margin-right: 0.2em">
                  <b><i class="glyphicon-dashboard glyphicon font-1xl"></i> {{
                    get_text('kpi_exception@kpi_def@l') }}</b>
                </b-button>
              </b-link>
              <b-link :href="'KpiStatusReport'">
                <b-button variant="success" size="md" class="btn float-right"
                          style="margin-left: 0.2em; margin-right: 0.2em">
                  <b><i class="glyphicon-dashboard glyphicon font-1xl"></i> {{
                    get_text('kpi_status@kpi_def@l') }}</b>
                </b-button>
              </b-link>-->
            </div>
            <div v-if="!$auth.ready() || !this.$store.state.loading">
              <div style="text-align:center; padding-top:50px;">
                {{ get_text('loading@kpi_def@l') }}
              </div>
            </div>
            <div v-if="$auth.ready() && this.$store.state.loading">
              <b-row>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('filter@l')" class="mb-0"
                                :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-input v-model="filter" :placeholder="get_text('type_to_search@l')"/>
                      <b-input-group-append>
                        <b-btn :disabled="!filter" @click="filter = ''">{{ get_text('clear@l')
                          }}
                        </b-btn>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('sort@l')" class="mb-0" label-cols="5"
                                :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortBy" :options="sortOptions">
                        <option slot="first" :value="null">{{ get_text('please_select@l') }}
                        </option>
                      </b-form-select>
                      <b-form-select :disabled="!sortBy" v-model="sortDesc" slot="append">
                        <option :value="false">{{ get_text('asc@l') }}</option>
                        <option :value="true">{{ get_text('desc@l') }}</option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('per_page@l')" class="mb-0" label-cols="5"
                                :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-form-select :options="pageOptions" v-model="perPage"/>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('sector@kpi_def@l')" class="mb-0"
                                :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortByTenant" @change="loadKpiDataSector(sortByTenant)"
                                     :options="this.$store.state.setTenant">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l') }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')" class="mb-0" label-cols="5"
                                :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <!--                                            <b-form-select v-model="sortBySubTenant" @change="loadKpiDataOrgUnit(sortBySubTenant)"-->
                      <!--                                                           :options="this.$store.state.setSubTenant">-->
                      <!--                                                <option slot="first" :value="null">{{-->
                      <!--                                                    get_text('please_select@kpi_def@l')-->
                      <!--                                                    }}-->
                      <!--                                                </option>-->
                      <!--                                            </b-form-select>-->
                      <treeselect :dir="rtl ? 'rtl' : 'ltr'" :placeholder="get_text('please_select@l')"
                                  :normalizer="normalizer" searchable="searchable" :options="options" v-model="sortBySubTenant"
                                  @input="loadKpiDataOrgUnit(sortBySubTenant)"/>

                    </b-input-group>
                  </b-form-group>
                </b-col>
                <b-col md="4" class="my-1">
                  <b-form-group horizontal :label="get_text('kpicat@kpi_def@l')" class="mb-0" label-cols="5"
                                :label-align="$i18n.locale=='en' ? 'right' : 'left'">
                    <b-input-group>
                      <b-form-select v-model="sortByKpiCat"
                                     :options="this.$store.state.setCategory">
                        <option slot="first" :value="null">{{
                          get_text('please_select@kpi_def@l')
                          }}
                        </option>
                      </b-form-select>
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-modal id="rejectModal" :title="get_text('reject_reason@kpi_def@l')" class="modal-danger"
                       v-model="dangerModal" @ok="dangerModal = false"
                       ok-variant="danger" v-bind:hide-footer="true">
                <b-form @submit.prevent="kpiRejectsave">
                  <b-row>
                    <b-col sm="12">
                      <b-form-group>
                        <label for="rejectreason">{{ get_text('reject_reason@kpi_def@l') }}<i
                          class="fa fa-asterisk danger fa-xs"
                          style="font-size:10px;color:red;"></i></label>

                        <b-form-textarea id="rejecttext" v-validate="'required'"
                                         name="rejecttext" v-model="rejectreasontext"
                                         :class="{ 'is-invalid': submitted && errors.has('rejecttext') }"
                                         rows="8"
                        >
                        </b-form-textarea>
                        <div v-if="submitted && errors.has('rejecttext')"
                             class="invalid-feedback">{{
                          errors.first('rejecttext') }}
                        </div>
                      </b-form-group>
                    </b-col>

                  </b-row>
                  <b-button class="float-left" variant="primary" size="md" type="submit">{{
                    get_text('save_reject_reason@kpi_def@l')}}
                  </b-button>
                  <b-btn size="md" style="float:right" variant="danger"
                         @click="$bvModal.hide('rejectModal')">
                    Cancel
                  </b-btn>
                </b-form>
              </b-modal>

              <b-modal size="lg" id="exceptionModal" :title="get_text('exception_count@kpi_def@l')"
                       class="modal fade cd-example-modal-lg"
                       v-model="exceptionModal" @ok="exceptionModal = false"
                       ok-variant="danger" v-bind:hide-footer="true">

                <b-row>
                  <b-col sm="12">
                    <b-link href="#" v-on:click="printtable('exceptiondiv')">
                      <i class="icon-printer"></i>
                    </b-link>
                    <br/>
                    <div id="exceptiondiv">
                      <b-row style="padding-bottom: 5px">

                        <b-col md="12">
                          <b class="h5">
                            {{ this.get_text('name@kpi_def@c')}}: {{ this.kpiname
                            }}
                          </b></b-col>
                      </b-row>
                      <b-row style="padding-bottom: 5px">
                        <b-col md="12">
                          <b class="h5">
                            {{ this.get_text('symbol@kpi_def@c')}}: {{ this.symbol
                            }}
                          </b></b-col>
                      </b-row>


                      <b-table :hover="hover" :striped="striped" :bordered="bordered"
                               :fixed="fixed" responsive="sm" :items="exceptions" :fields="fieldsexceptions"
                               :current-page="currentPage" :per-page="perPage" :filter="filter"
                               :sort-by.sync="sortBy"
                               :sort-desc.sync="sortDesc"
                               :sort-direction="sortDirection"
                               @filtered="onFiltered">


                      </b-table>
                    </div>
                    <nav>
                      <b-pagination size="sm" :total-rows="getRowCount" :per-page="perPage"
                                    v-model="currentPage" :prev-text="this.get_text('prev@l')"
                                    :next-text="this.get_text('next@l')"
                                    hide-goto-end-buttons/>
                    </nav>
                  </b-col>

                </b-row>

              </b-modal>
              <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small"
                       :fixed="fixed" responsive :items="priorities" :fields="fields"
                       :current-page="currentPage" :per-page="perPage" :filter="filter"
                       :sort-by.sync="sortBy"
                       :sort-desc.sync="sortDesc"
                       :sort-direction="sortDirection"
                       @filtered="onFiltered">
                <!-- <template slot="id" slot-scope="data">
                     <b-col class="mb-3 mb-xl-0">
                         {{ data.index + 1 }}
                     </b-col>
                 </template>-->
                <template slot="active_status" slot-scope="data">
                  <b-badge :variant="getBadge1(data.item.active_status)">{{ get_text(
                    getName(data.item.active_status)+'@kpi_def@l') }}
                  </b-badge>
                </template>
                <template slot="status" slot-scope="data">
                  <b-badge v-b-tooltip.hover :title="data.item.reject_reason"
                           :variant="getBadge(data.item.status)">{{
                    get_text(getNameStatus(data.item.status)+'@kpi_def@l') }}
                  </b-badge>
                </template>
                <template slot="next_reading_date" slot-scope="data">
                  <b-row class="setwidth">
                    <b-badge>{{ (data.item.next_reading_date) }}
                    </b-badge>

                    <i v-if="new Date() >= new Date(data.item.next_reading_date)" style="color:red;"
                       class="fa fa-exclamation fa-lg"></i>
                    <i v-if="new Date() <= new Date(data.item.next_reading_date)" style="color:green;"
                       class="fa fa-check fa-lg"></i>

                  </b-row>
                </template>
                <template slot="exception_count" slot-scope="data">
                  <b-row>
                    <i v-if="data.item.exception_count" class="fas fa-exclamation-triangle" style="color:red;"
                       @click="kpiException(data.item.id)"></i>

                  </b-row>
                </template>

                <template slot="Manage" slot-scope="data">
                  <b-dropdown variant="link"
                              toggle-class="($i18n.locale == 'en' ? 'text-center btnClassCustmEn' : 'text-center btnClassCustmAr')"
                              no-caret class="">
                    <template slot="button-content">
                      <button class="btn btn-primary btn-sm">
                        <i class="fa-gears fa font-1xl"></i>
                      </button>
                    </template>
                    <!--{{ data.item.status }}
                    @click="kpiDeletePermanently(data.item.id)"
                    -->
                    <b-dropdown-item
                      v-if="data.item.status==0 && data.item.next_reading_date!=null || data.item.next_reading_date==null"
                      @click="showingdeleteModal = true;  selectUser(data.item)">{{
                      get_text('delete@kpi_def@l')
                      }}
                    </b-dropdown-item>
                    <b-dropdown-item v-if="data.item.status==0 && data.item.next_reading_date!=null"
                                     @click="kpiApproveReject(data.item.id, 1)">{{
                      get_text('approve@kpi_def@l')
                      }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="(data.item.status!=1 && data.item.next_reading_date!=null|| data.item.status==0 &&  data.item.status!=2 && data.item.next_reading_date!=null)"
                      @click="kpiApproveReject(data.item.id, 2)">{{
                      get_text('reject@kpi_def@l')
                      }}
                    </b-dropdown-item>
                    <b-dropdown-item
                      v-if="data.item.active_status!=1 && data.item.status!=2 && data.item.status!=0"
                      @click="kpiActiveInactive(data.item.id, 1)"
                      :disabled="(data.item.status==0 || data.item.active_status==1  && data.item.status!=2) ? true : false">
                      {{
                      get_text('activate@kpi_def@l')
                      }}
                    </b-dropdown-item>
                    <b-dropdown-item v-if="data.item.active_status==1 && data.item.status!=2"
                                     @click="kpiActiveInactive(data.item.id, 0)"
                    > {{
                      get_text('deactivate@kpi_def@l')
                      }}
                    </b-dropdown-item>
                  </b-dropdown>
                  <!--<b-dropdown id="dropdown-1" text="Actions" class="m-md-2">-->
                  <!--&lt;!&ndash;{{ data.item.status }}&ndash;&gt;-->
                  <!--<b-dropdown-item :disabled="(data.item.status==1 || data.item.status==2) ? true : false" @click="kpiApproveReject(data.item.id, 1)">Approve-->
                  <!--</b-dropdown-item>-->
                  <!--<b-dropdown-item :disabled="(data.item.status==2 || data.item.status==1) ? true : false" @click="kpiApproveReject(data.item.id, 2)">Reject-->
                  <!--</b-dropdown-item>-->
                  <!--<b-dropdown-divider></b-dropdown-divider>-->
                  <!--<b-dropdown-item @click="kpiActiveInactive(data.item.id, 1)"-->
                  <!--:disabled="(data.item.status==0 || data.item.active_status==1 || data.item.status==2) ? true : false">Activate-->
                  <!--</b-dropdown-item>-->
                  <!--<b-dropdown-item @click="kpiActiveInactive(data.item.id, 0)"-->
                  <!--:disabled="(data.item.status==0 || data.item.status==2) ? true : false">Inactive-->
                  <!--</b-dropdown-item>-->
                  <!--</b-dropdown>-->
                </template>
                <template slot="Actions" slot-scope="data">
                  <b-row class="text-center">
                    <b-link :href="'/newFormGenerator/1/'+data.item.id" style="height:28px"
                            class="customClass">
                      <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0"
                             v-if="$can('kpi-edit')">
                        <b-button variant="" size="sm" :title="get_text('definition@kpi_def@l')"
                        ><b><i class="fa fa-key font-1xl"></i></b></b-button>
                      </b-col>
                    </b-link>
                    <b-link :href="'/newFormGenerator/3/'+data.item.id" style="height:28px"
                            class="customClass">
                      <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0"
                             v-if="$can('kpi-edit')">
                        <b-button variant="" size="sm" :title="get_text('target@kpi_def@l')"
                                  @click="editPriority(data.item, 'edit')"><b><i
                          class="fa fa-balance-scale font-1xl"></i></b></b-button>
                      </b-col>&nbsp;
                    </b-link>
                    <b-link :href="'/newFormGenerator/2/'+data.item.id" style="height:28px"
                            class="customClass">
                      <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0"
                             v-if="$can('kpi-edit')">
                        <b-button variant="" size="sm"
                                  @click="editPriority(data.item, 'view') "><b><i
                          style="font-weight: bold" class="fab fa-skyatlas font-1xl"
                          :title="get_text('benchmark@kpi_def@l')"></i></b></b-button>
                      </b-col>
                    </b-link>
                    <b-link :href="'/kpivalues/'+data.item.id" style="height:28px"
                            class="customClass"
                            :class="(new Date() <= new Date(data.item.next_reading_date) ||  data.item.status==0  || data.item.active_status==0) ? 'pointerClass' : ''">
                      <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">
                        <b-button variant="" size="sm" :title="get_text('readings@kpi_def@l')"
                                  :disabled="(new Date() <= new Date(data.item.next_reading_date) || data.item.status==0 || data.item.active_status==0) ? true: false">
                          <b><i style="font-weight: bold"
                                class="fab fa-linode font-1xl"></i></b></b-button>
                      </b-col>
                    </b-link>
                    <b-link :href="'/kpivalueshistory/'+data.item.id" style="height:28px"
                            class="customClass"
                            :class="(data.item.target_determining_method!=1) ? 'pointerClass' : ''">
                      <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">
                        <b-button variant="" size="sm" :title="get_text('historic_readings@kpi_def@l')"
                                  :disabled="(data.item.target_determining_method!=1) ? true: false"
                                  @click="editPriority(data.item, 'edit')"><b><i
                          class="fa fa-history font-1xl"></i></b></b-button>
                      </b-col>&nbsp;
                    </b-link>
                    <b-link :href="'/gaugechart/'+data.item.id" style="height:28px"
                            class="customClass"
                            :class="(data.item.status==0  || data.item.active_status==0) ? 'pointerClass' : ''">
                      <b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">
                        <b-button variant="" size="sm" :title="get_text('quick_view@kpi_def@l')"
                                  :disabled="(data.item.status==0 || data.item.active_status==0) ? true: false">
                          <b><i style="font-weight: bold"
                                class="icon-eye icons font-1xl"></i></b></b-button>
                      </b-col>
                    </b-link>
                    <!--<b-link href="#" style="height:28px">-->
                    <!--<b-col cols="2" sm="4" md="2" xl="1" class="mb-xl-0">-->
                    <!--<b-button variant="danger" size="sm"><b><i-->
                    <!--class="fa-gears fa font-1xl"></i></b></b-button>-->
                    <!--</b-col>-->
                    <!--</b-link>-->
                  </b-row>
                </template>
              </b-table>
              <nav>
                <b-pagination size="sm" :total-rows="this.totalRows" :per-page="perPage"
                              v-model="currentPage" :prev-text="get_text('prev@kpi_def@l')"
                              :next-text="get_text('next@kpi_def@l')"
                              hide-goto-end-buttons/>
              </nav>
            </div>
          </b-card>
        </transition>
        <b-modal :title="get_text('delete@Users@l')" size="lg" class="modal-danger" v-model="showingdeleteModal"
                 hide-footer="true" ok-variant="danger">
          <div class="modalcontent">
            <h3 class="text-center" style="width: auto !important;">{{ this.get_text('are_you_sure_to_delete@Users@l')
              }} <b>{{kpiDeleteData.name}}</b>?</h3>
            <b-col md="12" class="text-center" style="width: auto !important;">

              <button class="btn btn-outline-danger left"
                      @click="showingdeleteModal = false; kpiDeletePermanently(kpiDeleteData.id)">{{
                this.get_text('yes@l') }}
              </button>&nbsp;
              <button class="btn btn-outline-success right" @click="showingdeleteModal = false;">{{
                this.get_text('no@l') }}
              </button>
            </b-col>
          </div>
        </b-modal>
      </b-col>

    </b-row>
  </div>
</template>

<script>
  import {store} from '@/components/store'
  import {dashStore} from '@/views/dashboard/store'
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css';
  import Element from 'element-ui'
  //import {Notification} from 'element-ui'
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'


  Vue.use(Element);
  Vue.use(Loading);
  export default {
    store: store,
    props: {
      hover: {
        type: Boolean,
        default: true
      },
      striped: {
        type: Boolean,
        default: true
      },
      bordered: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      fixed: {
        type: Boolean,
        default: false
      }
    },
    sockets: {
      message(data) {
        //let message = JSON.parse(data);
        //console.log(message);
        this.$store.dispatch('newMessageNotification', data);
      },
      dashboard(data) {
        //alert('ttt');
        let message = JSON.parse(data);
        console.log(message);
        dashStore.dispatch('realTimeUpdateDashboard', [this.mtp_date, this.sector]);
      }
    },
    created() {


      this.$store.dispatch('loadTenants');
      this.$store.dispatch('loadCategory');

// if(this.backlink==1)
// {
      var x = document.cookie;
      var name = 'sectorname';
      var name1 = 'orgname';
//  var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(',');
      var nameEQ = name + "=";
      var nameEQ1 = name1 + "=";

      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c != "sectorname=") {
          if (c.indexOf(nameEQ) == 0) {
            var y = c.substring(nameEQ.length, c.length);
            if (y != "undefined" || y != "") {
              this.sortByTenant = y;
              this.loadKpiDataSector(y);
            }
          }
        }
        if (c != "orgname=") {
          if (c.indexOf(nameEQ1) == 0) {
            var z = c.substring(nameEQ1.length, c.length);
            // alert(c);
            if (z != "undefined" || z != "") {
              this.sortBySubTenant = z;
              this.loadKpiDataOrgUnit(z);
            }
          }

        }
      }
      document.cookie = "sectorname=; domain=.najah.online; path=/;";
      document.cookie = "orgname=;domain=.najah.online;path=/;";


      // document.cookie = "sectorname=; path=/;";
      // document.cookie = "orgname=;path=/;";


      this.backlink = 0;
// alert(y);


      if (localStorage.getItem('isSession') == 'true') {
        localStorage.removeItem('isSession');
        if (localStorage.getItem('session_sector') && localStorage.getItem('session_unit') == null) {
          this.sortByTenant = JSON.parse(localStorage.getItem('session_sector'));
          this.loadKpiDataSector(localStorage.getItem('session_sector'));
        }
        if (localStorage.getItem('session_unit') && localStorage.getItem('session_unit')) {
          this.sortByTenant = JSON.parse(localStorage.getItem('session_sector'));
          this.sortBySubTenant = JSON.parse(localStorage.getItem('session_unit'));
          this.$store.dispatch('loadSubTenants', this.sortByTenant);
          this.loadKpiDataOrgUnit(localStorage.getItem('session_unit'));
        }
      } else {
        this.$store.dispatch('loadPriorities');
      }
    },
    data: () => {
      return {
        backlink: 0,
        kpiDeleteData: {},
        rejectreasontext: '',
        selectkpidata: '',
        dangerModal: false,
        exceptionModal: false,
        selected: null,
        selectedLink: null,
        fields: [
          /* {key: 'id', label: '#', sortable: false, sortDirection: 'desc'},
           {key: 'name', label: 'KPI Name', sortable: true, sortDirection: 'desc'},
           {key: 'subtenant_name', label: 'Tenant'},
           {key: 'active_status', label: 'Status'},
           {key: 'Actions'},*/
        ],
        button: '',
        currentPage: 1,
        perPage: 50,
        totalRows: 0,
        sortByTenant: null,
        sortByStatus: null,
        sortBySubTenant: null,
        sortByKpiCat: null,
        kpiexceptiondata: null,
        priorityData: {
          TypeCode: null,
          Type: null,
        },
        priorityInfo: null,
        showingeditModal: false,
        showingViewModal: false,
        showingModal: false,
        showingdeleteModal: false,
        submitted: false,
        updated: false,
        pageOptions: [10, 20, 50, 100],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        nextreaddate: 0,
        translation: [],
        showingdeleteModal: false,
        kpiname: '',
        symbol: '',
        options:'',
        normalizer(node) {
          return {
            id: node.id,
            label: node.name,
            children: node.tree,
          }
        },
      }
    },
    beforeMount() {
      if (localStorage.getItem('translation')) {
        this.translation = JSON.parse(localStorage.getItem('translation'));
      }
    },
    beforeDestroy() {
      if (this.backlink == 0) {
        localStorage.removeItem('session_sector');
        localStorage.removeItem('session_unit');
      }
      document.cookie = "sectorname=; domain=.najah.online; path=/;";
      document.cookie = "orgname=; domain=.najah.online; path=/;";
      // document.cookie = "sectorname=;  path=/;";
      // document.cookie = "orgname=;  path=/;";


    },


    computed: {
      exceptions() {
        if (this.$i18n.locale == 'en') {
          this.fieldsexceptions = [
            {key: 'no', label: '#'},
            {key: 'short_desc_en', label: this.get_text('short_desc_en@kpi_def@c'), sortable: true},
            {key: 'long_desc_en', label: this.get_text('long_desc_en@kpi_def@c')},
          ];
        } else {
          this.fieldsexceptions = [
            {key: 'no', label: '#'},
            {key: 'short_desc_ar', label: this.get_text('short_desc_ar@kpi_def@c'), sortable: true},
            {key: 'long_desc_ar', label: this.get_text('long_desc_ar@kpi_def@c')},
          ];
        }


        return this.kpiexceptiondata
      },
      priorities() {
        this.fields = [
          {key: 'no', label: '#', tdClass: 'trtdrow'},
          {key: 'symbol', label: this.get_text('symbol@kpi_def@c'), sortable: true, tdClass: 'symbolCls'},
          {key: 'name', label: this.get_text('name@kpi_def@c'), sortable: true, sortDirection: 'desc'},
          {key: 'subtenant_name', label: this.get_text('child_subtenant_id@kpi_def@c')},
          {
            key: 'active_status',
            sortable: true,
            sortDirection: 'desc',
            label: this.get_text('active_status@kpi_def@c')
          },
          {key: 'status', sortable: true, sortDirection: 'desc', label: this.get_text('status@kpi_def@c')},
          {
            key: 'next_reading_date',
            sortable: true,
            sortDirection: 'desc',
            label: this.get_text('next_reading_date@kpi_def@l'),
            thClass: 'setwidth'
          },
          {
            key: 'exception_count',
            sortable: true,
            sortDirection: 'desc',
            label: this.get_text('exception_count@kpi_def@l')
          },
          {key: 'Actions', label: this.get_text('actions@kpi_def@l')},
          {key: 'Manage', label: this.get_text('manage@kpi_def@l'), thClass: 'text-center'},
        ];

        /*if (this.sortByTenant != null && this.$store.getters.priorities.length > 0) {
            this.$store.dispatch('loadSubTenants', this.sortByTenant);
            var filterData = [];
            filterData = this.$store.getters.priorities.filter(data => {
                return data.subtenant_id.toString().includes(this.sortByTenant)
            })
            this.totalRows = filterData.length;
            return filterData;
        } else */
        if (this.sortByKpiCat != null && this.$store.getters.priorities.length > 0) {
          var filterData = [];
          filterData = this.$store.getters.priorities.filter(data => {
            return data.kpi_cat != null ? data.kpi_cat.toString().includes(this.sortByKpiCat) : ''
          })
          this.totalRows = filterData.length;
          return filterData;
        } else {
          var filterData = this.$store.getters.priorities;
          this.totalRows = filterData.length;
          //alert(this.totalRows)
          return filterData;
        }

        return this.$store.getters.priorities
      },
      getRowCount() {
        return this.$store.getters.getRowCount
      },
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return {text: f.label, value: f.key}
          })
      }
    },
    watch: {
      showingeditModal: function () {
        if (this.showingeditModal == false) {
          this.$store.dispatch('loadPriorities')
          this.priorityData = {}
        }
      }
    },
    components: {
      'loading': Loading,
      Treeselect
    },
    methods: {
      quickAccessLink(val) {
        this.$router.push(val);
        this.backlink = 1;
        localStorage.setItem('back_link', this.backlink);
        this.backlink = 0;


      },
      selectUser(kpi) {
        this.kpiDeleteData = kpi;
      },
      loadKpiDataSector(sector) {

        this.options='';
        localStorage.setItem('session_sector', sector);
        this.$store.dispatch('loadSubTenants', sector);
        this.$store.dispatch('loadKpiDataSector', sector);
        Vue.axios.get('/subtenanttree/' + this.sortByTenant)

          .then(response => {
            if (response.data.code == 200) {
              this.options = response.data.subTenants;


            }
          });
      },
      loadKpiDataOrgUnit(orgUnit) {
        localStorage.setItem('session_unit', orgUnit);
        this.$store.dispatch('loadKpiDataOrgUnit', orgUnit);
      },
      kpiDeletePermanently(kpiId) {
        this.$store.dispatch('removeKpiPermanently', kpiId)
      },
      printtable(printdiv) {

        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.write('<html><head><style> tr:nth-child(even) {background-color: #f2f2f2;}\n .table {\n' +
          '        width: 100%;\n' +
          '        margin-bottom: 1rem;\n' +
          '        color:#23282c;\n' +
          '        \n' +
          '      }\n' +
          '      .table thead th {\n' +
          '        vertical-align: bottom;\n' +
          '        border-bottom: 2px solid\n' +
          '        #c8ced3;\n' +
          '      }\n' +
          '      table th, .table td {\n' +
          '        padding: 0.75rem;\n' +
          '        vertical-align: top;\n' +
          '        border-top: 1px solid\n' +
          '        #c8ced3;\n' +
          '      }\n</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById(printdiv).innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
        return true;
      },
      kpiException(kpiid) {
        this.exceptionModal = true;

        Vue.axios.get(`/kpiexceptionlist/${kpiid}`)
          .then((response) => {
            if (response.data.code == 401) {
              this.$store.dispatch('get_text_title', 'success@m');
              this.$store.dispatch('get_text_message', response.data.msg + '@m');
              Vue.prototype.$notify.error({
                title: this.$store.state.title,
                message: this.$store.state.message,
                type: 'Error',
                position: 'top-right'
              })
            } else {

              this.kpiexceptiondata = response.data.kpiexception;
              this.kpiname = response.data.kpidetails[0].name;
              this.symbol = response.data.kpidetails[0].symbol;


            }
            this.$store.state.isLoading = false;
          })
          .catch((error) => {
            console.log(error)
          })

      },
      kpiApproveReject(kpi, status) {
        if (status == 2) {
          this.dangerModal = true;
          this.rejectreasontext = '';
          this.selectkpidata = kpi;
          return;
          //this.kpiRejectsave(kpi, status);
        } else {

          // return tru;
          Vue.axios.post(`/kpiApproveReject`, {kpi: kpi, status: status})
            .then((response) => {
              if (response.data.code == 400) {
                this.$store.dispatch('get_text_title', 'error@m');
                this.$store.dispatch('get_text_message', response.data.msg + '@m');
                Vue.prototype.$notify.error({
                  title: this.$store.state.title,
                  message: this.$store.state.message,
                  type: 'Error',
                  position: 'top-right'
                })
              } else {
                this.showingeditModal = true;
                this.$store.dispatch('get_text_title', 'success@m');
                this.$store.dispatch('get_text_message', response.data.msg + '@m');
                Vue.prototype.$notify.success({
                  title: this.$store.state.title,
                  message: this.$store.state.message,
                  type: 'Success',
                  position: 'top-right'
                })
                this.$store.dispatch('loadPriorities');
              }
              this.$store.state.isLoading = false;
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },

      kpiRejectsave(kpi) {
        this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            Vue.axios.post(`/kpiApproveReject`, {
              kpi: this.selectkpidata,
              status: 2,
              rejectreason: this.rejectreasontext
            })
              .then((response) => {
                if (response.data.code == 400) {
                  this.$store.dispatch('get_text_title', 'error@m');
                  this.$store.dispatch('get_text_message', response.data.msg + '@m');
                  Vue.prototype.$notify.error({
                    title: this.$store.state.title,
                    message: this.$store.state.message,
                    type: 'Error',
                    position: 'top-right'
                  })
                } else {
                  this.dangerModal = false;
                  this.rejectreasontext = '';
                  this.$store.dispatch('get_text_title', 'success@m');
                  this.$store.dispatch('get_text_message', response.data.msg + '@m');
                  Vue.prototype.$notify.success({
                    title: this.$store.state.title,
                    message: this.$store.state.message,
                    type: 'Success',
                    position: 'top-right'
                  })
                  this.$store.dispatch('loadPriorities');
                }
                this.$store.state.isLoading = false;
              })
              .catch((error) => {
                console.log(error)
              })
            this.$validator.reset();
          }
        });

      },
      kpiActiveInactive(kpi, activeStatus) {
        this.$store.state.isLoading = true;
        Vue.axios.post(`/kpiActiveInactive`, {kpi: kpi, status: activeStatus})
          .then((response) => {
            if (response.data.code == 400) {
              this.$store.dispatch('get_text_title', 'error@m');
              this.$store.dispatch('get_text_message', response.data.msg + '@m');
              Vue.prototype.$notify.error({
                title: this.$store.state.title,
                message: this.$store.state.message,
                type: 'Error',
                position: 'top-right'
              })
            } else {
              this.showingeditModal = true
              this.$store.dispatch('get_text_title', 'success@m');
              this.$store.dispatch('get_text_message', response.data.msg + '@m');
              Vue.prototype.$notify.success({
                title: this.$store.state.title,
                message: this.$store.state.message,
                type: 'Success',
                position: 'top-right'
              })
              this.$store.dispatch('loadPriorities');
            }
            this.$store.state.isLoading = false;
          })
          .catch((error) => {
            console.log(error)
          })
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
      $can(permissionName) {
        // alert(this.$auth.user().allPermissions);
        return this.$auth.user().allPermissions.indexOf(permissionName) !== -1;
      },
      createPriority() {
        this.submitted = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            this.resetPasswordBtn = true,
              this.showingModal = false
            this.$store.dispatch('createPriority', {
              data: {
                TypeCode: this.priorityData.TypeCode,
                Type: this.priorityData.Type,
              }
            })
            this.priorityData = {
              TypeCode: null,
              Type: null,
            }
            this.$validator.reset();
          }
        });
      },
      selectPriority(priority) {
        this.priorityData = priority;
      },
      editPriority(priority, value = null) {
        this.$store.state.isLoading = true;
        Vue.axios.get(`/PRCTypes/${priority.id}`, priority.PRCTypes)
          .then((response) => {
            if (response.data.code == 401) {
              this.$store.dispatch('get_text_title', 'success@m');
              this.$store.dispatch('get_text_message', response.data.msg + '@m');
              Vue.prototype.$notify.error({
                title: this.$store.state.title,
                message: this.$store.state.message,
                type: 'Error',
                position: 'top-right'
              })
            } else {
              if (value == 'view') {
                this.showingViewModal = true;
                this.priorityInfo = response.data.data
              } else {
                this.showingeditModal = true
                this.priorityData = response.data.data
              }
            }
            this.$store.state.isLoading = false;
          })
          .catch((error) => {
            console.log(error)
          })
      },
      updatePriority() {
        this.updated = true;
        this.$validator.validate().then(valid => {
          if (valid) {
            this.showingeditModal = false
            this.$store.dispatch('updatePriority', {
              where: this.priorityData.IdPRCType,
              data: {
                TypeCode: this.priorityData.TypeCode,
                Type: this.priorityData.Type,
              }
            })
            this.priorityData = {
              TypeCode: null,
              Type: null,
            }
            this.$validator.reset();
          }
        });
      },
      removePriority(priorities) {
        this.$store.dispatch('removePriority', priorities)
      },
      getBadge(status) {
        return status == 1 ? 'success' : status == 0 ? 'primary' : 'danger'
      },
      getBadge1(status) {
        return status == 1 ? 'success' : status == 0 ? 'danger' : 'primary'
      },
      // getBadge2(next_reading_date) {
      //   return next_reading_date == 1 ? 'success' : next_reading_date == 0 ? 'danger' : 'primary'
      // },

      getName(status) {
        return status == '1' ? 'active' : status == '0' ? 'inactive' : 'danger'
      },
      getNamedate(next_reading_date) {
        var GivenDate = next_reading_date;
        // alert("given date"+GivenDate);

        var CurrentDate = new Date();
        GivenDate = new Date(GivenDate);

        // var mydate=new Date(next_reading_date);
        //  alert("given date"+GivenDate);
        //  alert("current date"+CurrentDate);
        this.nextreaddate = 0;
        if (CurrentDate <= GivenDate) {
          this.nextreaddate = 1;
        }
        //return next_reading_date
      },
      getNameStatus(status) {
        return (
          (status == 0) ? "pending_for_approval" :
            ((status == 1) ? "approved" :
              ((status == 2) ? "rejected" : "pending_for_approval"))
        );
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
  }

</script>
<style>
  .mb-xl-0.col-sm-4.col-md-2.col-xl-1.col-2 {
    margin: 0;
    padding-left: 0px;
    padding-right: 6px;
  }

  .customClass button.btn.btn-secondary.btn-sm {
    background-color: transparent;
  }

  .btnClassCustmAr {
    padding-left: 0px !important;
  }

  .btnClassCustmEn {
    padding-right: 0px !important;
  }

  .trtdrow {
    background: #43a9cc;
    color: #ffffff;
    font-weight: bold;
  }

  .symbolCls {
    white-space: nowrap;
  }

  .modal-header .close {
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
<style scoped>
  .card-body >>> table > tbody > tr > td {
    cursor: pointer;
    vertical-align: middle !important;
    padding-top: 5px !important;
    padding-bottom: 5px !important;

  }

  .b-dropdown {
    margin-top: 0 !important;
  }

  .text-center {
    width: 225px !important;
  }

  .setwidth {
    width: 110px !important;
  }

  .pointerClass {
    pointer-events: none;
    cursor: none;
  }

  @media print {
    .table {
      width: 100%;
      margin-bottom: 1rem;
      color: #23282c;

    }

    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #c8ced3;
    }

    table th, .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #c8ced3;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

  }

</style>
