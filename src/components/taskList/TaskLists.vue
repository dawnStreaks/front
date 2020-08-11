<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col md="4">
                <b-form-input style="border: 1px solid" class="form-control-lg" type="text" id="Creditor"
                              placeholder="Filter Tasks"></b-form-input>
                <b-list-group>
                    <b-list-group-item href="#" v-for="(data, index) in subscriptions" :key="data.id"
                                       :class="{ 'active': activeIndex == index }" @click="setActive(index)">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">List group item heading</h5>
                            <small>3 days ago</small>
                        </div>
                        <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                            varius blandit.</p>
                        <small>Donec id elit non mi porta.</small>
                        <div class="task-card-details">
                            <p v-show="index === showDropDown" class="mb-1">Donec id elit non mi porta gravida at eget
                                metus. Maecenas sed diam eget risus varius blandit.</p>
                            <div class="menu-btn text-center shutter">
                                <a @click="moreLessActive(index)" href="#" style="color: black">
                                    <i :class="{ 'fa-chevron-up': (index == showDropDown), 'fa-chevron-down': (index != showDropDown) }"
                                       class="fa"></i></a>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col md="8">
                <b-card>
                    <div slot="header">
                        Assign Reviewer
                    </div>
                    <b-row>
                        <b-col sm="12">
                            <b-nav>
                                <b-nav-item><i class="fa fa-calendar"></i> Set follow-up date</b-nav-item>
                                <b-nav-item><i class="fa fa-bell"></i> Set due date</b-nav-item>
                                <b-nav-item><i class="fa fa-th"></i> Add groups</b-nav-item>
                                <b-nav-item><i class="fa fa-user"></i> {{ $auth.user().name }}</b-nav-item>
                            </b-nav>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-tabs v-model="tabIndex[0]">
                        <b-tab active>
                            <template slot="title">
                                <i class="fa fa-file-code-o"></i> <!--{{tabs[0]}}-->
                            </template>
                            <br>
                            <b-form @submit.prevent="updateGroup">
                                <b-row>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <label for="Creditor">Creditor</label>
                                            <b-form-input type="text" id="Creditor"
                                                          placeholder="Enter Creditor name"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <label for="Amount">Amount</label>
                                            <b-form-input type="text" id="Amount" placeholder="Amount"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <label for="Invoice_Number">Invoice Number</label>
                                            <b-form-input type="text" id="Invoice_Number"
                                                          placeholder="Invoice Number"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="12">
                                        <b-form-group>
                                            <label for="Reviewer">Reviewer</label>
                                            <b-form-input type="text" id="Reviewer"
                                                          placeholder="Reviewer"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="12">
                                        <b-button class="float-right" variant="primary" size="lg" type="submit">UPDATE
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-history "></i> <!--{{tabs[1]}}-->
                            </template>
                            <br>2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-image"></i> <!--{{tabs[2]}}-->
                            </template>
                            <br>3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-file-text"></i> <!--{{tabs[3]}}-->
                            </template>
                            <br>4. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua.
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import {store} from '@/components/taskList/store/store'

    import Vue from 'vue'
    import Element from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    Vue.use(Loading);
    Vue.use(Element);

    export default {
        store: store,
        data: () => {
            return {
                showDropDown: null,
                activeIndex: undefined,
                tabIndex: [0, 0],
                tabs: [
                    'Form',
                    'History',
                    'Diagram',
                    'Description'
                ],
                subscriptions: [
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                    {id: 3, name: 'three'}
                ],
            }
        },
        components: {
            'loading': Loading,
        },
        methods: {
            setActive(index) {
                this.activeIndex = index
            },
            moreLessActive(index) {
                this.showDropDown = (index != this.showDropDown ? index : null)
            },
        }
    }

</script>

<style>
    .list-group-item.active {
        z-index: 2;
        color: #000;
        border-left: 3px solid #cc1013 !important;
        border-color: #fff;
        background-color: white;
    }

    .list-group-item:hover:not(.active) {
        border-left: 3px solid #1622af !important;
    }

    .task-card-details .shutter {
        display: block;
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        height: 30px;
        background-color: rgba(255, 255, 255, 0);
        background-image: -webkit-linear-gradient(top, rgba(255, 255, 255, 0), #fff) !important;
        background-image: -moz-linear-gradient(top, rgba(255, 255, 255, 0), #fff) !important;
        background-image: -o-linear-gradient(top, rgba(255, 255, 255, 0), #fff) !important;
        background-image: -ms-linear-gradient(top, rgba(255, 255, 255, 0), #fff) !important;
    }
</style>