import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import {Notification} from 'element-ui'
import router from '../../../router'
import BpmnViewer from 'bpmn-js'
import {i18n} from "../../../plugins/i18n";
require('bpmn-js/dist/assets/diagram-js.css');

var $ = require('jquery');

Vue.use(Vuex);
Vue.use(Element);
Vue.prototype.$notify = Notification;

export const store = new Vuex.Store({
    state: {
        translations: {
            en: {
                "hello": "Hello World"
            },
            ar: {
                "hello": "Hallo Verden"
            }
        },
        loading: false,
        process: [],
        processTasks: [],
        processInstance: [],
        isLoading: false,
        fullPage: true,
        activeInstance: null,
        taskId: null,
        title: '',
        message: '',
    },
    mutations: {
        SET_PROCESS(state, groups) {
            state.process = groups
        },
        SET_PROCESS_TASKS(state, groups) {
            if(groups) {
                state.processTasks = groups
            } else  {
                //alert('ssss');
                state.processTasks = []
            }
            //state.taskId = groups[0].taskDefinitionKey
        },
        SET_PROCESS_INSTANCE_USER_TASKS(state, userTask) {
            if(userTask) {
                state.processInstance = userTask
            } else  {
                //alert('ssss');
                state.processInstance = []
            }
        },
        SET_PROCESS_DEFINATION_COUNT(state, count) {
            state.activeInstance = count
        },
        SET_PROCESS_DEFINATION_TASK_ID(state, staticdata) {
            //state.taskId = staticdata[0].id
            if(staticdata) {
            state.taskId = staticdata.map(function (item) {
                return {
                    taskId: item.id,
                    instance: item.instances,
                    //value: item.id
                }
            });
            } else {
                state.taskId = []
            }
            console.log(state.taskId)
        },
        SET_PROCESS_DEFINATION_XML(state, task) {
            var taskId = this.state.taskId;
            //var instance = this.state.activeInstance;
            //console.log(task.data.diagram.id);
            var initialDiagram = task.data.diagram.bpmn20Xml;

            var container = $('#diagramCanvas');
            var viewer = new BpmnViewer({
                container: container,
                width: '100%',
                height: '200px'
            });
            viewer.importXML(initialDiagram, function (err) {

                if (err) {
                    console.log('error rendering', err);
                } else {
                    var canvas = viewer.get('canvas');
                    // zoom to fit full viewport
                    canvas.zoom('fit-viewport', true);
                    canvas.viewbox();
                    container.removeClass('with-error')
                        .addClass('with-diagram');
                }

                //var canvas = viewer.get('canvas');
                var overlays = viewer.get('overlays');
                // zoom to fit full viewport
                // attach an overlay to a node
                for (var prop in taskId) {
                    overlays.add(taskId[prop].taskId, 'note', {
                        position: {
                            left: 0,
                            top: 80
                        },
                        html: '<div class="activity-bottom-left-position instances-overlay" style="position: absolute; left: -0.7em; bottom: -0.25em;">' +
                            '<span style="font-size: 12px;border-width: 1px;border-style: solid;background-color: #70b8db;border-color: #143d52;color: #143d52;border-radius:10px;" class="badge instance-count" data-original-title="" title="">' + taskId[prop].instance + '</span></div>'
                    });
                    // add marker
                    canvas.addMarker(taskId[prop].taskId, 'highlighted');
                }
            });
            this.currentXml = initialDiagram;
            this.state.isLoading = false
        },
        GET_TEXT_TITLE(state, text) {
            return state.title = text;
        },
        GET_TEXT_MSG(state, text) {
            return state.message = text;
        },
    },
    getters: {
        process: state => state.process,
        processTasks: state => state.processTasks,
        getRowCount: state => state.process.length,
        processInstance: state => state.processInstance,
    },
    actions: {
        get_text_title({commit}, textbit) {
            var transtext = this.state.translations[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_TITLE', transtext)
                //return ;
            } else {
                commit('GET_TEXT_TITLE', "!" + textbit)
            }

        },
        get_text_message({commit}, textbit) {
            var transtext = this.state.translations[i18n.locale][textbit];
            if (transtext) {
                commit('GET_TEXT_MSG', transtext)
                //return ;
            } else {
                commit('GET_TEXT_MSG', "!" + textbit)
            }

        },
        loadProcess({commit}) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'process',
                method: 'GET'
            })
                .then(response => {
                    this.state.isLoading = false;
                    if (response.data.code == 200) {
                        this.state.loading = true,
                            commit('SET_PROCESS', (response.data.process))
                    } else {
                        this.dispatch('get_text_title', 'Error@m');
                        this.dispatch('get_text_message', response.data.msg+'@m');

                        this.state.loading = true,
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }
                });
        },
        loadProcessTasks({commit}, processId) {
            this.state.isLoading = true;
            Vue.axios({
                url: 'process/' + processId + '/task',
                method: 'GET'
            })
                .then(response => {
                    if (response.data.code == 200) {
                        this.state.loading = true;
                        //commit('SET_PROCESS_TASKS', (response.data.process))
                    } else if (response.data.code == 404) {
                        this.dispatch('get_text_title', 'Error@m');
                        this.dispatch('get_text_message', 'Process Not Available@m');
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                        router.go(-1);
                    } else {
                        this.dispatch('get_text_title', 'Error@m');
                        this.dispatch('get_text_message', response.data.msg+'@m');
                        Vue.prototype.$notify.error({
                            title: this.state.title,
                            message: this.state.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }
                });
        },
        loadProcessDefinitionCount({commit}, processId) {
            this.state.isLoading = true;
            Vue.axios({
                url: `process-definition/${processId}/count`,
                method: 'GET'
            }).then(response => {
                commit('SET_PROCESS_DEFINATION_COUNT', (response.data.count))
            })
        },
        processDefinitionXML({commit}, processId) {
            Vue.axios.get(`process-definition/${processId}/xml`)
                .then((response) => {
                    //this.timeout = setTimeout(function () {
                        commit('SET_PROCESS_DEFINATION_XML', (response))
                    //}, 1500)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        loadDefinationStatistic({commit}, processId) {
            this.state.isLoading = true;
            Vue.axios({
                url: `process-definition/${processId}/statistics`,
                method: 'GET'
            }).then(response => {
                commit('SET_PROCESS_DEFINATION_TASK_ID', (response.data.process))
            }).catch(error => {
                console.log(error.response.data.message);
                this.state.isLoading = false;
                if (error.response.status == 403){
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.message+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }});
        },
        loadHistoryProcessDefination({commit}, processId) {
            this.state.isLoading = true;
            Vue.axios({
                url: `process-instance-history/${processId}`,
                method: 'GET'
            }).then(response => {

                if (response.data.code == 200 || response.data.code == 400) {
                    this.state.loading = true;
                    commit('SET_PROCESS_TASKS', (response.data.process))
                } else if (response.data.code == 404) {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', 'Process Not Available@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                    router.go(-1);
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        },
        loadProcessInstanceUserTask({ commit }, processId) {
            this.state.isLoading = true;
            Vue.axios({
                url: `processinstance/${processId}`,
                method: 'GET'
            }).then(response => {

                if (response.data.code == 200 || response.data.code == 400) {
                    console.log(response.data.processinstancedetails)
                    this.state.loading = true;
                    commit('SET_PROCESS_INSTANCE_USER_TASKS', (response.data.processinstancedetails))
                } else if (response.data.code == 404) {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', 'Process Not Available@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                    router.go(-1);
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        },
        translation() {
            Vue.axios.get(`/gettranslations`).then(response => {
                this.state.isLoading = false;
                if (response.data.code == 200) {
                    var trans=JSON.stringify(response.data.data);
                    //console.log("testing")
                    //console.log(trans);
                    this.state.translations=response.data.data;
                } else {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', response.data.msg+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    })
                }
            }).catch(error => {
                this.state.isLoading = false;
                if (error.response.status == 422) {
                    this.dispatch('get_text_title', 'Error@m');
                    this.dispatch('get_text_message', error.response.data.errors.Type[0]+'@m');
                    Vue.prototype.$notify.error({
                        title: this.state.title,
                        message: this.state.message,
                        type: 'Error',
                        position: 'top-right'
                    });
                }
            })
        }
    }
})
