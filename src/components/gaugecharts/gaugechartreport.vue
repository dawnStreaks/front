<template>
    <div id="app">
        <div class="row">
            <div class="col-md-12">
              <div class="card">
                <b-collapse id="collapse1" style="display: block;">
                  <b-card-body>
                    <b-row>
                      <b-col md="4" class="my-1">
                      <b-form-group horizontal :label="get_text('mtp@gaugechart@l')">
                        <b-form-select v-model="mtp_date" :options="mtp_options"
                                       v-on:change=" showingdropModal=false; getSelectedMTP()">
                          <option slot="first" :value="null">-- اختر --</option>
                        </b-form-select>
                      </b-form-group>
                      </b-col>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal :label="get_text('sector@kpi_def@l')" class="mb-4">
                          <b-input-group>
                            <b-form-select v-model="sortByTenant"
                                           :options="this.$store.state.setTenant"  @change="getsubtenants()" >
                              <option slot="first" :value="null">{{
                                get_text('please_select@kpi_def@l') }}
                              </option>
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal :label="get_text('subtenant@kpi_def@l')" class="mb-4">
                          <b-input-group>
<!--                            <b-form-select v-model="sortBySubTenant"-->
<!--                                           :options="this.$store.state.setSubTenant"  @change="getkpilist()">-->
<!--                              <option slot="first" :value="null">{{-->
<!--                                get_text('please_select@kpi_def@l')-->
<!--                                }}-->
<!--                              </option>-->
<!--                            </b-form-select>-->
                            <treeselect :dir="rtl ? 'rtl' : 'ltr'" :options="options" :normalizer="normalizer"
                                        :placeholder="get_text('please_select@l')" @input="getkpilist()" searchable="searchable"
                                        :flatten-search-results="true"  v-model="sortBySubTenant"/>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal :label="get_text('kpilist@quickview@l')" class="mb-4">
                          <b-input-group>
                            <b-form-select v-model="sortBykpi"
                                           :options="this.$store.state.setkpilist"  @change="getquickview()">
                              <option slot="first" :value="null">{{
                                get_text('please_select@kpi_def@l')
                                }}
                              </option>
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                      <b-col md="4" class="my-1">
                        <b-form-group horizontal :label="get_text('symbol@quickview@l')" class="mb-4">
                          <b-input-group>
                            <b-form-select v-model="sortBykpi"
                                           :options="this.$store.state.setkpisymbol"  @change="getquickview()">
                              <option slot="first" :value="null">{{
                                get_text('please_select@kpi_def@l')
                                }}
                              </option>
                            </b-form-select>
                          </b-input-group>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card-body>
                </b-collapse>
              </div>
                <div v-if="sortBykpi" class="card">

                    <div  class="card-header" style="text-align:left">
                            <b-button v-if="$i18n.locale=='ar'" variant="warning" size="md" class="btn float-right printNo" @click="backToList"
                                      style="margin-left: 1%; margin-right: 1%">
                                <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                    get_text('kpi_list@kpi_def@l') }}</b></b-button>

                        {{ this.get_text('kpi_quick_view@gaugechart@l')}}
                        <b-dropdown id="dropdown-1" text="" class="m-md-2" auto-close="disabled" ref="dropdown" :style="($i18n.locale=='en') ? 'margin: 0px 1% 0px 0px !important;' : 'margin: 0px 0px 0px 1% !important;'">
                            <b-dropdown-form style="width:300px;">
                                <b-form-group horizontal :label="get_text('mtp@gaugechart@l')">
                                    <b-form-select v-model="mtp_date" :options="mtp_options"
                                                   v-on:change=" showingdropModal=false; getSelectedMTP()">
                                        <option slot="first" :value="null">-- اختر --</option>
                                    </b-form-select>
                                </b-form-group>
                            </b-dropdown-form>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-form style="width: 300px;">
                                <b-form-group horizontal :label="get_text('periodicity@gaugechart@l')">
                                    <b-form-select v-model="periodicity" :options="periodicity_options"
                                                   v-on:change="showingdropModal=true; getSelectedMTP()">
                                        {{periodicity}}
                                        <option slot="first" :value="null">-- اختر --</option>
                                    </b-form-select>
                                </b-form-group>
                            </b-dropdown-form>
                        </b-dropdown>
                        <button id="myPrntbtn" v-on:click="loaded"><i class="fa fa-print "></i></button>
                        <table align="right" style="margin-top: 0.2rem">
                            <tr>
                                <td><strong> {{ this.get_text('mtp@gaugechart@l') }}</strong></td>
                                <td>
                                    &nbsp; &nbsp;
                                    {{this.from_mtp}}
                                </td>
                                <td>
                                    &nbsp; &nbsp;
                                    {{this.to_mtp}}
                                </td>
                                <td>
                                    &nbsp;&nbsp;
                                    &nbsp;&nbsp;<span v-html="getUpToDateStatus()"></span>
                                </td>&nbsp;&nbsp;
                                <td v-if="$i18n.locale=='en'">
                                    <b-button variant="warning" size="md" class="btn float-right printNo" @click="backToList"
                                              style="margin-left: 1%; margin-right: 1%">
                                        <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                                            get_text('kpi_list@kpi_def@l') }}</b></b-button>
                                </td>
                            </tr>
                        </table>
                      <b-button v-if="showmindmap==1" variant="warning" size="md" class="btn float-right" @click="mindmap"
                                style="margin-left: 1%; margin-right: 1%">
                        <b><i class="glyphicon-list glyphicon font-1xl"></i> {{
                          get_text('kpi_map@kpi_def@l') }}</b></b-button>
                    </div>
                    <div class="card-body">
                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('kpi_name@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="10">
                                    <b-link :href="'/newFormGenerator/3/'+$route.params.id" style="height:28px" :title="get_text('target@kpi_def@l')" class="customClass">{{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['kpi_name']: '' }}
                                    </b-link>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;
                                        {{ this.get_text('org_unit@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="10">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['unit_name']: '' }}
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('value_unit@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ (this.$store.state.kpi_value.length > 0 &&
                                    this.$store.state.kpi_value[0]['value_unit_name'] != null) ?
                                    this.$store.state.kpi_value[0]['value_unit_name']: '-' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('value_type@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    ((this.$store.state.kpi_value[0]['value_type'] == 1) ?
                                    this.get_text('number@fg_form@l') :
                                    ((this.$store.state.kpi_value[0]['value_type'] == 2) ?
                                    this.get_text('percentage@fg_form@l') :
                                    ((this.$store.state.kpi_value[0]['value_type'] == 3) ?
                                    this.get_text('ratio@fg_form@l') :
                                    ((this.$store.state.kpi_value[0]['value_type'] == 4) ?
                                    this.get_text('rate@fg_form@l') : ''
                                    )))): '-' }}
                                </b-col>
                                <b-col cols="2" v-if="this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] != null && this.$store.state.kpi_value[0]['value_type'] != 1">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('formula@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2" v-if="this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['value_type'] !=null && this.$store.state.kpi_value[0]['value_type'] != 1">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['numerator_name']+' '+this.get_text('/@gaugechart@l')
                                    +' '+this.$store.state.kpi_value[0]['denominator_name']: '-' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('value_explanation@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ (this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['performance_name'] != null ? this.get_text(this.$store.state.kpi_value[0]['performance_name']+'@kpi_def@l')  : '-') }}
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('last_value@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ ((this.$store.state.kpi_value.length > 0) ?
                                    (this.$store.state.kpi_value[0]['value_type'] == 2 ? (this.$store.state.kpi_value[0]['last_value']*100).toFixed($store.getters.kpi_rounding) : (this.$store.state.kpi_value[0]['last_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '') }} <span
                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('last_value_date@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ (this.$store.state.kpi_value.length > 0 &&
                                    this.$store.state.kpi_value[0]['last_value_date'] != null ) ?
                                    this.$store.state.kpi_value[0]['last_value_date']: '-' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('last_year_value@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ (this.$store.state.kpi_value.length > 0 &&
                                    this.$store.state.kpi_value[0]['prev_year_value'] != null) ?
                                    this.$store.state.kpi_value[0]['prev_year_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): '-' }}
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('to_target@gaugechart@l') }}
                                    </strong>
                                </b-col>
                                <b-col cols="2">
                                    <label dir="ltr">{{this.target_diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</label> <span
                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                </b-col>
                                <b-col cols="2">
                                    <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                        this.get_text('upcoming_value_date@gaugechart@l') }}</strong>
                                </b-col>
                                <b-col cols="2">
                                    {{ this.$store.state.kpi_value.length > 0 ?
                                    this.$store.state.kpi_value[0]['next_value_date']: '' }}
                                </b-col>
                            </b-row>
                        </b-container>
                        <br>
                        <br>
                        <b-container class="bv-example-row">
                            <b-row>
                                <b-col sm="8">
                                    <div class="row">
                                        <div class="col-sm-12 clearfix">
                                            <b-row>
                                                <div class="col-sm-4">
                                                    <div>
                                                        <strong :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{
                                                            this.get_text('as_of_date@gaugechart@l') }}
                                                        </strong>
                                                        {{ this.$store.state.kpi_value.length > 0 ?
                                                        this.$store.state.kpi_value[0]['data_as_of_date']: '' }}
                                                    </div>
                                                    <br>
                                                    <br>
                                                    <div class="progress-group" style="">
                                                        <div class="progress-group-header" style="margin-bottom:0px">
                                                            <span class="title font-weight-bold" :style="$i18n.locale=='en' ? 'border-bottom: 2px solid #999999' : 'border-bottom: 2px solid #999999' ">&nbsp;{{ this.get_text('base value@gaugechart@l') }} {{ $store.state.kpi_value[0]['value_type'] == 2 ? (this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['base_value'] != null  ? (this.$store.state.kpi_value[0]['base_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'%': '-'): (this.$store.state.kpi_value[0]['base_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                                        </div>
                                                        <!--<div class="progress-group-bars">
                                                            <div class="progress-xs progress"
                                                                 style="background-color: #cc043e; height: 7px">
                                                            </div>
                                                        </div>-->
                                                    </div>
                                                    <div class="progress-group" style="">
                                                        <div class="progress-group-header" style="margin-bottom:0px">
                                                            <span class="title font-weight-bold" :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{ this.get_text('min_allowed@gaugechart@l') }} {{ $store.state.kpi_value[0]['value_type'] == 2 ? (this.min_allowed1()*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'%' : this.min_allowed1().toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                                        </div>
                                                        <!--<div class="progress-group-bars">
                                                            <div class="progress-xs progress"
                                                                 style="background-color: #cc043e; height: 7px">
                                                            </div>
                                                        </div>-->
                                                    </div>
                                                    <div class="progress-group" style="">
                                                        <div class="progress-group-header" style="margin-bottom:0px">
                                                            <span class="title font-weight-bold" :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{ this.get_text('value_targetted@gaugechart@l') }} {{ $store.state.kpi_value[0]['value_type'] == 2 ? (this.target1()*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'%' : this.target1().toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                                        </div>
                                                        <!--<div class="progress-group-bars">
                                                            <div class="progress-xs progress"
                                                                 style="background-color: #01996d; height: 7px">
                                                            </div>
                                                        </div>-->
                                                    </div>
                                                    <div class="progress-group" style="">
                                                        <div class="progress-group-header" style="margin-bottom:0px">
                                                            <span class="title font-weight-bold" :style="$i18n.locale=='en' ? 'border-left: 4px solid #999999' : 'border-right: 4px solid #999999' ">&nbsp;{{ this.get_text('improved@gaugechart@l') }} {{ $store.state.kpi_value[0]['value_type'] == 2 ? (this.improved1()*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'%' : this.improved1().toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                                        </div>
                                                        <!--<div class="progress-group-bars">
                                                            <div class="progress-xs progress"
                                                                 style="background-color: #0475CC; height: 7px">
                                                            </div>
                                                        </div>-->
                                                    </div>
                                                </div>
                                                <div class="col-sm-8">
                                                    <circulargauge ref="circulargauge1"
                                                                   :kpi_circleMin="$store.getters.kpi_circleMin"
                                                                   :kpi_circleMax="($store.getters.kpi_circleMax < improved1() ? improved1() : $store.getters.kpi_circleMax)"
                                                                   :kpi_circleInterval="$store.getters.kpi_circleInterval"
                                                                   :value_explanation="$store.state.kpi_value[0]['value_explanation']"
                                                                   :min_allowed="this.min_allowed1()"
                                                                   :target=this.target1()
                                                                   :actual=this.actual1()
                                                                   :improved=this.improved2()
                                                                   :languages1="this.get_text('value_targetted@gaugechart@l')"
                                                                   :languages2="this.get_text('actual@gaugechart@l')"
                                                                   :kpi_status=this.kpi_status></circulargauge>
                                                </div>
                                            </b-row>
                                        </div>
                                        <div class="col-sm-12 clearfix"
                                             :style="($i18n.locale=='en' ? 'padding-left:0' : 'padding-right:0')">
                                            <div class="quarter-map1" v-if="periodicity == 3">
                                                <b-row v-for="(mapVal,index) in this.$store.state.kpi_quarter_map"
                                                       :key="index">
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card"
                                                             :title="get_text('base value@gaugechart@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n '+ get_text('progress@gaugechart@l')+': '+quater_progress(mapVal['q1_target'], mapVal['q1_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['q1_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                            <div class="card-body"
                                                                 v-bind:style="styles(mapVal['q1_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div class="quarter-map">
                                                                    {{ get_text('target@gaugechart@l') }}
                                                                    {{ (mapVal['q1_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q1_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q1_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}<span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['q1_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>

                                                                <div class="quarter-map">
                                                                    {{ get_text('actual@gaugechart@l') }}

                                                                    {{ (mapVal['q1_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q1_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q1_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div id="progress_bar1"
                                                                     class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['q1_target'], mapVal['q1_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         :aria-valuenow="quater_progress(mapVal['q1_target'], mapVal['q1_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card" :title="get_text('base value@kpi_def@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n'+ get_text('progress@kpi_def@l')+': '+quater_progress(mapVal['q2_target'], mapVal['q2_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['q2_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                            <div class="card-body" :style="styles(mapVal['q2_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div class="quarter-map">
                                                                    {{ get_text('target@gaugechart@l') }} {{ (mapVal['q2_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q2_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q2_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['q2_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>
                                                                <div class="quarter-map">
                                                                    {{ get_text('actual@gaugechart@l') }}
                                                                    {{ (mapVal['q2_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q2_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q2_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div id="progress_bar2"
                                                                     class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['q2_target'], mapVal['q2_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         :aria-valuenow="quater_progress(mapVal['q2_target'], mapVal['q2_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card" :title="get_text('base value@kpi_def@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n'+ get_text('progress@kpi_def@l')+': '+quater_progress(mapVal['q3_target'], mapVal['q3_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['q3_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                            <div class="card-body" :style="styles(mapVal['q3_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div class="quarter-map">
                                                                    {{ get_text('target@gaugechart@l') }}
                                                                    {{ (mapVal['q3_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q3_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q3_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['q3_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>
                                                                <div class="quarter-map">
                                                                    {{ get_text('actual@gaugechart@l') }}
                                                                    {{ (mapVal['q3_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q3_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q3_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div id="progress_bar3"
                                                                     class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['q3_target'], mapVal['q3_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         :aria-valuenow="quater_progress(mapVal['q3_target'], mapVal['q3_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card" :title="get_text('base value@kpi_def@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n'+ get_text('progress@kpi_def@l')+': '+quater_progress(mapVal['q4_target'], mapVal['q4_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['q4_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;padding-left: 2px;padding-right: 2px; ">
                                                            <div class="card-body" :style="styles(mapVal['q4_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div class="quarter-map">
                                                                    {{ get_text('target@gaugechart@l') }}
                                                                    {{ (mapVal['q4_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q4_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q4_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['q4_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>
                                                                <div class="quarter-map">
                                                                    {{ get_text('actual@gaugechart@l') }}
                                                                    {{ (mapVal['q4_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['q4_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['q4_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div id="progress_bar4"
                                                                     class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['q4_target'], mapVal['q4_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         :aria-valuenow="quater_progress(mapVal['q4_target'], mapVal['q4_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                            <div class="quarter-map1" v-else-if="periodicity == 6">
                                                <b-row v-for="(mapVal,index) in this.$store.state.kpi_quarter_map"
                                                       :key="index">
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card" :title="get_text('base value@kpi_def@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n'+ get_text('progress@kpi_def@l')+': '+quater_progress(mapVal['h1_target'], mapVal['h1_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['h1_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;">
                                                            <div class="card-body" :style="styles(mapVal['h1_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div>
                                                                    {{ get_text('target@gaugechart@l') }}
                                                                    {{ (mapVal['h1_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['h1_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['h1_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['h1_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>
                                                                <div>
                                                                    {{ get_text('actual@gaugechart@l') }}
                                                                    {{ (mapVal['h1_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['h1_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['h1_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['h1_target'], mapVal['h1_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         v-bind:aria-valuenow="quater_progress(mapVal['h1_target'], mapVal['h1_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card" :title="get_text('base value@kpi_def@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n'+ get_text('progress@kpi_def@l')+': '+quater_progress(mapVal['h2_target'], mapVal['h2_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['h2_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;">
                                                            <div class="card-body" :style="styles(mapVal['h2_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div>
                                                                    {{ get_text('target@gaugechart@l') }}
                                                                    {{ (mapVal['h2_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['h2_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['h2_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['h2_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>
                                                                <div>
                                                                    {{ get_text('actual@gaugechart@l') }}
                                                                    {{ (mapVal['h2_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['h2_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['h2_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['h2_target'], mapVal['h2_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         v-bind:aria-valuenow="quater_progress(mapVal['h2_target'], mapVal['h2_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                            <div class="quarter-map1"
                                                 v-else-if="periodicity == 12 || periodicity == 36">
                                                <b-row v-for="(mapVal,index) in this.$store.state.kpi_quarter_map"
                                                       :key="index">
                                                    <b-col style="padding-left: 2px;padding-right: 2px; ">
                                                        <div class="card" :title="get_text('base value@kpi_def@l')+': '+(mapVal['base_value'] != null ? mapVal['base_value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : mapVal['base_value'])+'\n'+ get_text('progress@kpi_def@l')+': '+quater_progress(mapVal['y_target'], mapVal['y_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                             v-bind:class="[mapVal['y_value'] ? 'text-white':'text-black']"
                                                             style="margin-bottom:2px;">
                                                            <div class="card-body"
                                                                 v-bind:style="styles(mapVal['y_value'], $store.state.kpi_value[0]['value_explanation'])">
                                                                <div>
                                                                    {{ get_text('target@gaugechart@l') }}
                                                                    {{ (mapVal['y_target'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['y_target']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['y_target']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>&nbsp;<span v-html="getquartermapStatus(mapVal['y_value'], $store.state.kpi_value[0]['value_explanation'])"></span>
                                                                </div>
                                                                <div>
                                                                    {{ get_text('actual@gaugechart@l') }}
                                                                    {{ (mapVal['y_value'] != null) ?
                                                                    (($store.state.kpi_value[0]['value_type'] == 2) ? (mapVal['y_value']*100).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (mapVal['y_value']).toFixed($store.getters.kpi_rounding).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) : '' }}
                                                                    <span
                                                                        v-if="$store.state.kpi_value.length > 0 && $store.state.kpi_value[0]['value_type'] ==2 "> %</span>
                                                                </div>
                                                                <div class="progress progress-white progress-xs my-2">
                                                                    <div class="progress-bar" role="progressbar"
                                                                         :style="{width:quater_progress(mapVal['y_target'], mapVal['y_value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding) + '%'}"
                                                                         v-bind:aria-valuenow="quater_progress(mapVal['y_target'], mapVal['y    _value'], mapVal['base_value'], $store.state.kpi_value[0]['value_type'], $store.getters.kpi_rounding)"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </b-col>
                                                </b-row>
                                            </div>
                                            <div class="quarter-map1" v-else>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col sm="4">
                                    <div class="col-sm-12 clearfix">
                                        <div class="brand-card">
                                            <div class="brand-card-header"
                                                 :style="'background-color:'+ this.getKpiStatusRangeColor(min_allowed1(),target1(), actual1(),improved2(), $store.state.kpi_value[0]['value_explanation'])">
                                                <i class="glyphicon glyphicon-dashboard"></i>
                                                <div class="chart-wrapper" v-if="this.$store.getters.kpi_arrayvals.length > 0">
                                                    <social-box-chart-example chartId="box-chart-02"
                                                                              :data="this.$store.getters.kpi_arrayvals"
                                                                              height="90"/>
                                                </div>
                                            </div>
                                            <div class="brand-card-body" style="padding:1.75rem 0">
                                                <div>
                                                    <div class="text-value">
                                                        {{ $store.state.kpi_value.length > 0 && this.$store.getters.kpi_preformance != null ?
                                                        ((this.$store.getters.kpi_preformance*100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                                                        : '' }} %
                                                    </div>
                                                    <div class="text-uppercase text-muted small">{{ this.get_text('kpi performance@gaugechart@l') }}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="text-value" dir="ltr">
                                                        {{ (kpi_status*100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} %
                                                    </div>
                                                    <div class="text-uppercase text-muted small">{{
                                                        this.get_text('progress@gaugechart@l') }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <br>
                                    <div class="col-sm-12 clearfix">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <strong>{{ this.get_text('legend@gaugechart@l') }}</strong>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="decoratedLine1 vlabelBold" :class="($i18n.locale=='en' ? 'decoratedLine1En' : 'decoratedLine1Ar')" :style="($i18n.locale=='en' ? 'padding-left: 40px;' : 'padding-right: 40px;')"><span>{{ this.get_text('min allowed or less@gaugechart@l') }}</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="decoratedLine2 vlabelBold" :class="($i18n.locale=='en' ? 'decoratedLine2En' : 'decoratedLine2Ar')" :style="($i18n.locale=='en' ? 'padding-left: 40px;' : 'padding-right: 40px;')"><span>{{ this.get_text('attempt to target@gaugechart@l') }}</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="decoratedLine3 vlabelBold"  :class="($i18n.locale=='en' ? 'decoratedLine3En' : 'decoratedLine3Ar')" :style="($i18n.locale=='en' ? 'padding-left: 40px;' : 'padding-right: 40px;')"><span>{{ this.get_text('target achieved@gaugechart@l') }}</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="decoratedLine4 vlabelBold" :class="($i18n.locale=='en' ? 'decoratedLine4En' : 'decoratedLine4Ar')" :style="($i18n.locale=='en' ? 'padding-left: 40px;' : 'padding-right: 40px;')"><span>{{ this.get_text('improved result@gaugechart@l') }}</span></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="decoratedLine5 vlabelBold" :class="($i18n.locale=='en' ? 'decoratedLine5En' : 'decoratedLine5Ar')" :style="($i18n.locale=='en' ? 'padding-left: 40px;' : 'padding-right: 40px;')"><span>{{ this.get_text('result(s) miss planning@gaugechart@l') }}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-container>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {CircularGaugePlugin, Annotations} from "@syncfusion/ej2-vue-circulargauge";
    import DoughnutExample1 from './DoughnutExample1.vue';
    import DoughnutExample2 from './DoughnutExample2.vue';
    import DoughnutExample3 from './DoughnutExample3.vue';
    import circulargauge from './circulargauge.vue';
    import SocialBoxChartExample from './SocialChart'
    import {store} from '@/components/gaugecharts/store';
    import moment from 'moment';
    //import treeselect from '../treeselect/treeselect'
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    Vue.use(CircularGaugePlugin);
    export default {
        store: store,
        data: function () {
            return {
                showmindmap: 0,
                periodicity: 3,
                mtp_date: 4,
                kpi_id: this.$store.state.kpi_id,
                a: '',
                showingdropModal: false,
                translation: [],
                sortByTenant: null,
                sortBySubTenant: null,
                sortBykpi:null,
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
        beforeCreate() {
          this.$store.dispatch('loadTenants');
            //var url = window.location.pathname;

           // var kpi_id = url.substring(url.lastIndexOf('/') + 1);
            //kpi_id=1;
            this.$store.dispatch('loadMTP');
            this.$store.dispatch('loadKPIvalue', [4, 1, 3]);
        },
      mounted() {
        //alert(document.referrer);
        this.$store.dispatch('loadTenants');
        if (document.referrer.indexOf("mindmap") > -1) {
          this.showmindmap = 1;
        } else {
          this.showmindmap = 0;
        }
      },

        components: {
            DoughnutExample2,
            DoughnutExample1,
            DoughnutExample3,
            circulargauge,
            SocialBoxChartExample,
          Treeselect
        },
        watch: {
           /* a: function () {
                a = this.a
                this.min_allowed1()
                this.improved1()
                this.target1()
                this.styles(a);
            },*/
            mtp_date: function () {
                mtp_date = this.mtp_date;
                periodicity = this.periodicity;
                target_id = this.target_id;
                this.$store.dispatch('loadKPIvalue', [this.mtp_date, kpi_id, this.periodicity]);
                this.getSelectedMTP()
            },
            periodicity: function () {
                mtp_date = this.mtp_date;
                periodicity = this.periodicity;
                target_id = this.target_id;
                this.getSelectedMTP()
            },
        },
        computed: {
            target_id() {
                var kpi_av_value = this.$store.state.kpi_value.length > 0 ? this.$store.state.kpi_value[0]['kpi_target_id'] : ''
                return kpi_av_value;
            },
            kpi_status() {
                var kpi_value = this.$store.state.kpi_value
                if(kpi_value[0]['target_value'] == kpi_value[0]['base_value']) {
                    return 0;
                } else {
                var kpi_status = ((kpi_value.length > 0) && (kpi_value[0]['acc_value'] != null) && (kpi_value[0]['target_value'] != null)) ? (kpi_value[0]['acc_value'] - kpi_value[0]['base_value']) / (kpi_value[0]['target_value'] - kpi_value[0]['base_value']) : '';
                if (kpi_status != '') {
                    kpi_status = (kpi_status) ? kpi_status : '';
                    return kpi_status;
                }
                }
            },
            mtp_options() {
                var mtp_options = this.$store.state.kpi_mtp.map(function (item) {
                    return {
                        value: item.value,
                        text: item.text
                    }
                });
                return mtp_options
            },
            periodicity_options() {
                var options = [
                    {value: 3, text: this.get_text('quarter@gaugechart@l')},
                    {value: 6, text: this.get_text('semi_annual@gaugechart@l')},
                    {value: 12, text: this.get_text('annual@gaugechart@l')},
                    {value: 36, text: this.get_text('every_3_years@gaugechart@l')}]
                return options;
            },
            target_diff() {
                var kpi_name = this.$store.state.kpi_value;
                return (((kpi_name.length > 0) && (kpi_name[0].target_value != null)) ? (kpi_name[0].value_type == 2 ? ((kpi_name[0].target_value - kpi_name[0].last_value)*100).toFixed(this.$store.getters.kpi_rounding) : (kpi_name[0].target_value - kpi_name[0].last_value).toFixed(this.$store.getters.kpi_rounding)) : '');
            },
            quarter_map_values() {
                return (this.$store.state.kpi_quarter_map.length > 0) ? (this.$store.state.kpi_quarter_map) : {}
            },
            from_mtp() {
                var from_mtp = this.$store.state.kpi_value.length > 0 ? this.$store.state.kpi_value[0]['mtp_start_date'] : ''
                return from_mtp;
            },
            to_mtp() {
                var to_mtp = this.$store.state.kpi_value.length > 0 ? this.$store.state.kpi_value[0]['mtp_end_name'] : ''
                return to_mtp;
            },
        },
        methods: {
          getquickview(){

            this.$store.dispatch('loadKPIvalue', [4, this.sortBykpi, 3]);

          },
          getsubtenants(){
            this.options='';
            if (this.sortByTenant != null) {
              this.$store.dispatch('loadSubTenants', this.sortByTenant);
              Vue.axios.get('/subtenanttree/'+this.sortByTenant)

                .then(response => {
                  if (response.data.code == 200) {
                    this.options = response.data.subTenants;


                  }
                });
            }
          },

          getkpilist(){

            if (this.sortBySubTenant != null) {
              this.$store.dispatch('loadkpilist', this.sortBySubTenant);
              this.$store.dispatch('loadkpisymbol', this.sortBySubTenant);
            }
          },
            getTooltipData() {
                return 'test';
            },
            quater_progress(target, actual, baseVal, valType, rounding) {
                var kpi_status = ((target != null) && (actual != null)) ? (actual - baseVal) / (target - baseVal) : '0';
                if (kpi_status != '') {
                    kpi_status = ((valType == 2) ? (kpi_status*100).toFixed(rounding) : parseInt(kpi_status).toFixed(rounding));
                }
                return kpi_status;
            },
            backToList() {
                localStorage.setItem('isSession', 'true');
                sessionStorage.removeItem('kpi_id');
                window.location.replace('/kpilist')
            },
            styles(value, value_explanation) {
                var min_allowed = this.min_allowed1()
                var target = this.target1()
                var improved = this.improved1()
                var colorBg = '';
                if(value_explanation == 1 || value_explanation == 2 || value_explanation ==3) {
                    colorBg = (value == null ? "#FFF" :
                        (value >= min_allowed && value <= target ? "#01996d" :
                            (target < value && value <= improved ? "#3e98a3" :
                                (improved<value ? "#065a9b" :
                                    ((target+min_allowed)/2 <= value && value < min_allowed ? "#ffa500" :
                                        (value<(target+min_allowed)/2 ? "#cc043e" : ""))))))
                } else if(value_explanation == 11 || value_explanation == 12 || value_explanation ==13) {
                    colorBg = (value == null ? "#FFF" :
                        (target<=value && value<=improved ? "#01996d" :
                            (min_allowed<=value && value<target ? "#3e98a3" :
                                (improved<value ? "#065a9b" :
                                    ((target+min_allowed)/2<=value && value<min_allowed ? "#ffa500" :
                                        (value<(target+min_allowed)/2 ? "#cc043e" : ""))))))
                } else if(value_explanation == 4) {
                    colorBg = (value == null ? "#FFF" :
                        (target<=value ? "#01996d" :
                            (value<target ? "#cc043e" : "")))
                } else if(value_explanation == 14) {
                    colorBg = (value == null ? "#FFF" :
                        (value<=target ? "#01996d" :
                            (target<value ? "#cc043e" : "")))
                }
                var styles = {
                    'font-size': '11px',
                    'padding-left': '2px',
                    'padding-right': '2px',
                    'padding-top': '2px',
                    'padding-bottom': '2px',
                    'background-color':colorBg,
                    'text-align': 'center',
                }
                return styles;
            },
            mindmap() {
              //sessionStorage.removeItem('kpi_id');
              window.location.replace('/mindmap')
            },
            actual1() {
                var kpi_name = this.$store.state.kpi_value
                var actual1 = (kpi_name.length > 0 && kpi_name[0]['acc_value'] != null) ? kpi_name[0]['acc_value'] : '';
                return actual1
            },
            target1() {
                var kpi_target_value = (this.$store.state.kpi_value.length > 0 && this.$store.state.kpi_value[0]['target_value'] != null) ? (this.$store.state.kpi_value[0]['target_value']) : '';
                return kpi_target_value
            },
            getSelectedMTP() {
                var url = window.location.pathname;
                var kpi_id = url.substring(url.lastIndexOf('/') + 1);
                this.$store.dispatch('loadKPIvalue', [this.mtp_date, kpi_id, this.periodicity]);
                var targetVal = (typeof this.target_id != "undefined" && this.target_id != '') ? this.target_id : 0;
                if (this.showingdropModal) {
                    this.$refs.dropdown.hide(true)
                    showingdropModal = false;
                }
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
            getUpToDateStatus: function () {
                if (this.$store.state.kpi_value.length > 0) {
                    if (this.$store.state.kpi_value[0]['last_value_date'] == '') {
                        return '<font color="red"><strong>' + this.get_text('out_of_date_reading@gaugechart@l') + '</strong></font><i class="fa fa-exclamation-circle" style="color:#cc043e;font-size:22px;"></i>'

                    }
                    else if ((this.$store.state.kpi_value[0]['last_value_date'] >= this.$store.state.kpi_value[0]['due_value_date']) || (this.$store.state.kpi_value[0]['due_value_date'] == null)) {
                        return '<font color="green"><strong>' + this.get_text('updated_reading@gaugechart@l') + '</strong></font><i class="fa fa-check-circle" style="color:#01996d; font-size:22px;"></i>'
                    }
                    else {
                        return '<font color="red"><strong>' + this.get_text('out_of_date_reading@gaugechart@l') + '  &nbsp;</strong></font><i class="fa fa-exclamation-circle" style="color:#cc043e;font-size:22px;"></i>'
                    }
                }
            },
            loaded: function (args) {
                var printButton = document.getElementById("myPrntbtn");
                printButton.style.visibility = 'hidden';
                var dropButton = document.getElementById("dropdown-1");
                dropButton.style.visibility = 'hidden';

                window.print()
                printButton.style.visibility = 'visible';
                dropButton.style.visibility = 'visible';

            },
            min_allowed1() {
                var kpi_name = this.$store.state.kpi_value;
                var kpi_min_allowed = ((kpi_name.length > 0) && (kpi_name[0]['target_value'] != null)) ? ((kpi_name[0]['target_value']) * (1 - kpi_name[0]['margin_pct'])) : 0;
                var kpi_value_type = (kpi_name.length > 0 && kpi_name[0]['value_type'] != null ) ? kpi_name[0]['value_type'] : '';
                kpi_min_allowed = kpi_min_allowed
                return kpi_min_allowed
            },
            improved1() {
                var kpi_name = this.$store.state.kpi_value
                var kpi_improved = ((kpi_name.length > 0) && (kpi_name[0]['target_value'] != null)) ? (kpi_name[0]['target_value'] * (1 + kpi_name[0]['margin_pct'])) : 0;
                kpi_improved = kpi_improved;
                return kpi_improved
            },
            improved2() {
                var kpi_name = this.$store.state.kpi_value
                var kpi_improved = ((kpi_name.length > 0) && (kpi_name[0]['target_value'] != null)) ? ((kpi_name[0]['target_value'] * (1 + kpi_name[0]['margin_pct']))) : 0;
                kpi_improved = kpi_improved.toFixed(this.$store.getters.kpi_rounding)
                return kpi_improved
            },
            getKpiStatusRangeColor: function (min_allowed, target, value, improved, value_explanation) {
                var colorBg = '';
                if(value_explanation == 1 || value_explanation == 2 || value_explanation ==3) {
                    colorBg = (value == null ? "#FFF" :
                        (value >= min_allowed && value <= target ? "#01996d" :
                            (target < value && value <= improved ? "#3e98a3" :
                                (improved<value ? "#065a9b" :
                                    ((target+min_allowed)/2 <= value && value < min_allowed ? "#ffa500" :
                                        (value<(target+min_allowed)/2 ? "#cc043e" : ""))))))
                } else if(value_explanation == 11 || value_explanation == 12 || value_explanation ==13) {
                    colorBg = (value == null ? "#FFF" :
                        (target<=value && value<=improved ? "#01996d" :
                            (min_allowed<=value && value<target ? "#3e98a3" :
                                (improved<value ? "#065a9b" :
                                    ((target+min_allowed)/2<=value && value<min_allowed ? "#ffa500" :
                                        (value<(target+min_allowed)/2 ? "#cc043e" : ""))))))
                } else if(value_explanation == 4) {
                    colorBg = (value == null ? "#FFF" :
                        (target<=value ? "#01996d" :
                            (value<target ? "#cc043e" : "")))
                } else if(value_explanation == 14) {
                    colorBg = (value == null ? "#FFF" :
                        (value<=target ? "#01996d" :
                            (target<value ? "#cc043e" : "")))
                }

                return colorBg;
            },
            getquartermapStatus(value, value_explanation) {
                var min_allowed = this.min_allowed1();
                var target = this.target1();
                var improved = this.improved1();
                var colorBg = '';
                if(value_explanation == 1 || value_explanation == 2 || value_explanation ==3) {
                    colorBg = (value == null ? "" :
                        (value >= min_allowed && value <= target ? "<i class='fa fa-check-circle'></i>" :
                            (target < value && value <= improved ? "<i class='fa fa-check-double'></i>" :
                                (improved<value ? "<i class='fa fa-minus-circle'></i>" :
                                    ((target+min_allowed)/2 <= value && value < min_allowed ? "<i class='fa fa-arrow-circle-up'></i>" :
                                        (value<(target+min_allowed)/2 ? "<i class='fa fa-arrow-down'></i>" : ""))))))
                } else if(value_explanation == 11 || value_explanation == 12 || value_explanation ==13) {
                    colorBg = (value == null ? "" :
                        (target<=value && value<=improved ? "<i class='fa fa-check-circle'></i>" :
                            (min_allowed<=value && value<target ? "<i class='fa fa-check-double'></i>" :
                                (improved<value ? "<i class='fa fa-minus-circle'></i>" :
                                    ((target+min_allowed)/2<=value && value<min_allowed ? "<i class='fa fa-arrow-circle-up'></i>" :
                                        (value<(target+min_allowed)/2 ? "<i class='fa fa-arrow-down'></i>" : ""))))))
                } else if(value_explanation == 4) {
                    colorBg = (value == null ? "" :
                        (target<=value ? "<i class='fa fa-check-circle'></i>" :
                            (value<target ? "<i class='fa fa-arrow-circle-down'></i>" : "")))
                } else if(value_explanation == 14) {
                    colorBg = (value == null ? "" :
                        (value<=target ? "<i class='fa fa-check-circle'></i>" :
                            (target<value ? "<i class='fa fa-arrow-circle-down'></i>" : "")))
                }
                return colorBg;
            }
        }
    }
</script>
<style>

    #circulargauge_control_1_Axis_0_Pointer_Marker_0 {
        fill: rgb(224, 170, 57);
        /*stroke: rgb(221, 221, 221);
        stroke-width: 0;
        stroke-dasharray: 0;*/
        /*d: path("M 349.4 225 L 385.4 207.5 L 384.4 240.5 Z");
        transform: rotate(210deg, 222, 225);*/
    }
    .decoratedLine1, .decoratedLine2, .decoratedLine3, .decoratedLine4, .decoratedLine5 {
        overflow: hidden;
    }

    .decoratedLine1>span, .decoratedLine2>span, .decoratedLine3>span, .decoratedLine4>span, .decoratedLine5>span {
        position: relative;
        display: inline-block;
    }

    .decoratedLine1>span:before, .decoratedLine2>span:before, .decoratedLine3>span:before, .decoratedLine4>span:before, .decoratedLine5>span:before{
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 591px;
        margin: 0 20px;
    }
    .decoratedLine1>span:before {
        border-bottom: 12px solid #cc043e;
    }
    .decoratedLine2>span:before {
        border-bottom: 12px solid #ffa500;
    }
    .decoratedLine3>span:before {
        border-bottom: 12px solid #01996d;
    }
    .decoratedLine4>span:before {
        border-bottom: 12px solid #3e98a3;
    }
    .decoratedLine5>span:before {
        border-bottom: 12px solid #065a9b;
    }
    .decoratedLine1En>span:before, .decoratedLine2En>span:before, .decoratedLine3En>span:before,.decoratedLine4En>span:before, .decoratedLine5En>span:before {
        right: 100%;
    }
    .decoratedLine1Ar>span:before, .decoratedLine2Ar>span:before, .decoratedLine3Ar>span:before,.decoratedLine4Ar>span:before, .decoratedLine5Ar>span:before {
        left: 100%;
    }
    .labelCircle1, .labelCircle2, .labelCircle3 {
        display: flex !important;
        align-items: center !important;;
        justify-content: center !important;
        width: 70%;
    }
    .labelCircle1:before,
    .labelCircle1:after {
        background: #FF3333 !important;;
        height: 12px !important;;
        flex: 1 !important;;
        content: '';
    }
    .labelCircle2:before,
    .labelCircle2:after {
        background: #01996d !important;;
        height: 12px !important;;
        flex: 1 !important;;
        content: '';
    }
    .labelCircle3:before,
    .labelCircle3:after {
        background: #0475CC !important;;
        height: 12px !important;;
        flex: 1 !important;;
        content: '';
    }
    .labelCircle1.left:after {
        background: none !important;;
    }
    .labelCircle2.left:after {
        background: none !important;;
    }
    .labelCircle3.left:after {
        background: none !important;;
    }
    @media print {
        body {margin-top:0 !important;}
        body *, html * {
            visibility:hidden;
            margin: 0;
            padding: 0;
        }
        body *, html * {
            top: 0;
            margin-top: 0;
        }
        .printNo {
            display: none;
        }
        .card, .card * {
            visibility:visible;
            margin-bottom: -0.03rem;
            top: auto;
            clear: both;
        }
        @page{
            margin: 0;
            padding: 0;
        }
        .progress-group {
            margin-bottom: 1rem;
        }
        #dropdown-1, #myPrntbtn {
            display:none;
        }
        .donut-label {
            display: block;
            transform: translate(15px, 0px);
        }
        .col-2 {
            font-size: 10px;
        }
        @page {
            size: auto;
            margin: 0mm;
        }
        .sidebar, .breadcrumb,.app-footer {
            display: none;
            margin-bottom: 0px;
            margin-top: 0px;
        }
        .card {
            margin-bottom: 0px;
        }
    }
    .donut-head {
        text-align: center;
        transform: translate(200px, 0px);
    }
    svg {
        max-height: 350px;
        fill: none;
        box-sizing: content-box;
        transform: scale(0.8) translate(20px, -110px);
    }
    rect {
        fill: none;
    }
    .quarter-map1 {
        transform: scale(0.9) translate(0px, -100px);
    }
    .donut {
        text-align: center;
        transform: scale(0.9) translate(-50px, 10px);
    }
    .row {
        max-height: 18%;
    }
    .col {
        max-height: 50%;
    }
    .card-header {
        max-height: 60px;
    }
    .main .container-fluid {
        padding: 0 0;
        margin-top: 0;
    }
    .breadcrumb {
        max-height: 40px;
    }
</style>
