<template>
    <div class="app animated fadeIn">
        <loading :active.sync="this.$store.state.isLoading"
                 :can-cancel="true"
                 :is-full-page="this.$store.state.fullPage"></loading>
        <b-row>
            <b-col md="4" class="aside " :class="{ active: active}">
                <b-list-group>
                    <b-card>
                        <div slot="header">
                          <b class="h4"> {{ get_text('title@TaskList@l') }}</b>
                        </div>
                        <b-tabs v-model="activeMain">
                            <b-tab active @click="getUserTasks">
                                <template slot="title">
                                    <i class="fa fa-user"></i>{{ get_text('my@TaskList@l') }}
                                </template>
                                <br>
                                <div v-if="userTasks.length">
                                    <b-list-group-item href="#" v-for="(data, index) in userTasks" :key="data.id"
                                                       :class="{ 'active': userActiveIndex == data.id }"
                                                       @click="setActive(data.id, 'user'),taskDetails(data)">
                                        <div v-if="typeof data == 'object'">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{{ data.name}}</h5>
                                            </div>
                                            <p class="mb-1">{{ processName(data.processDefinitionId, data.name) }}
                                                <span class="pull-right">{{data.assign}}</span></p>
                                            <p>
                                                <small v-if="data.due">
                                                  {{ get_text('due@TaskList@l') }}
                                                    <timeago :datetime="data.due" :auto-update="1"></timeago>
                                                </small>
                                                <small v-if="data.followUp">
                                                  {{ get_text('followup@TaskList@l') }}
                                                    <timeago :datetime="data.followUp" :auto-update="1"></timeago>
                                                </small>
                                                <small>
                                                  {{ get_text('created@TaskList@l') }}
                                                    <timeago :datetime="data.created" :auto-update="1"></timeago>
                                                </small>
                                            </p>
                                            <p>{{ get_text('priority@TaskList@l') }}<span class="pull-right">{{data.priority}}</span></p>
                                            <small>{{ get_text('tenant@TaskList@l') }} : {{ data.tenantId }}</small>
                                            <div class="task-card-details">
                                                <p v-show="index === showDropDown" class="mb-1">
                                                    <span>{{ get_text('execution_id@TaskList@l') }}: {{ data.executionId}}</span>
                                                </p>
                                                <div class="menu-btn text-center shutter">
                                                    <a @click="moreLessActive(index)" href="#" style="color: black">
                                                        <i :class="{ 'fa-chevron-up': (index == showDropDown), 'fa-chevron-down': (index != showDropDown) }"
                                                           class="fa"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </b-list-group-item>
                                </div>
                                <div v-else>{{ get_text('no_task_found@TaskList@l') }}</div>
                            </b-tab>
                            <b-tab @click="getTasks">
                                <template slot="title">
                                    <i class="fa fa-group"></i> {{ get_text('my_group_task@TaskList@l') }}
                                </template>
                                <br>
                                <div v-if="groupTasks.length">
                                    <b-list-group-item href="#" v-for="(data, index) in groupTasks" :key="data.id"
                                                       :class="{ 'active': groupActiveIndex === data.id }"
                                                       @click="setActive(data.id, 'group'),taskDetails(data)">
                                        <div v-if="typeof data == 'object'">
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{{ data.name}}</h5>
                                            </div>
                                            <p class="mb-1">{{ processName(data.processDefinitionId, data.name) }}
                                                <span class="pull-right">{{data.assign}}</span></p>
                                            <p>
                                                <small v-if="data.due">
                                                  {{ get_text('due@TaskList@l') }}
                                                    <timeago :datetime="data.due" :auto-update="1"></timeago>
                                                </small>
                                                <small v-if="data.followUp">
                                                  {{ get_text('followup@TaskList@l') }}
                                                    <timeago :datetime="data.followUp" :auto-update="1"></timeago>
                                                </small>
                                                <small>
                                                  {{ get_text('created@TaskList@l') }}
                                                    <timeago :datetime="data.created" :auto-update="1"></timeago>
                                                </small>
                                            </p>
                                            <p>{{ get_text('priority@TaskList@l') }}:<span class="pull-right">{{data.priority}}</span></p>
                                            <small>{{ get_text('tenant@TaskList@l')}} : {{ data.tenantId }}</small>
                                            <div class="task-card-details">
                                                <p v-show="index === showDropDown" class="mb-1">
                                                    <span>{{ get_text('execution_id@TaskList@l') }}: {{ data.executionId}}</span>
                                                </p>
                                                <div class="menu-btn text-center shutter">
                                                    <a @click="moreLessActive(index)" href="#" style="color: black">
                                                        <i :class="{ 'fa-chevron-up': (index == showDropDown), 'fa-chevron-down': (index != showDropDown) }"
                                                           class="fa"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </b-list-group-item>
                                </div>
                                <div v-else>{{ get_text('no_task_found@TaskList@l') }}</div>
                            </b-tab>
                        </b-tabs>
                    </b-card>

                </b-list-group>
            </b-col>
            <b-col md="8" v-bind:class="{'col-md-12': !active, 'col-md-8':(active)}">
                <b-card v-if="task">
                    <div slot="header">
                        <b-row>
                            <b-col sm="8">
                                <b-button variant="primary" size="md" @click="toggleNav()">
                                    <span v-if="active"><i class="fa fa-backward"></i> </span>
                                    <span v-else> <i class="fa fa-forward"></i> </span>
                                </b-button>
                              {{ get_text('assign_reviewer@TaskList@l') }}
                            </b-col>
                            <b-col sm="4">
                                <b-button variant="primary" size="md" class="btn float-right"
                                          @click="showingModal= true">
                                    <b><i class="icon-plus icons font-1xl"></i> {{ get_text('add_comment@TaskList@l') }}</b></b-button>
                            </b-col>
                        </b-row>
                    </div>
                    <b-row>
                        <b-col md="12">
                            <h2>{{ task.name}}</h2>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="12">
                            <h4>{{ processName(task.processDefinitionId, task.name) }}</h4>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="3" class="text-center">
                            <a href="#"><i class="fa fa-calendar"></i> {{ get_text('set_follow_up_date@TaskList@l') }}</a>
                        </b-col>
                        <b-col md="3" class="text-center">
                            <a href="#"><i class="fa fa-bell"></i> {{ get_text('set_due_date@TaskList@l') }}</a>
                        </b-col>
                        <b-col md="3" class="text-center">
                            <a href="#"><i class="fa fa-group"></i> {{ get_text('set_groups@TaskList@l') }}</a>
                        </b-col>
                        <b-col md="3" class="text-center">
                            <a href="#"><i class="fa fa-user"></i>
                                <span v-if="!checkAssignee()"> {{ get_text('assign@TaskList@l') }}</span>
                                <span v-else> {{ get_text('reassign@TaskList@l') }}</span>
                            </a>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="3" class="py-3 text-center">
                            <el-date-picker size="small" v-model="followupDate" type="datetime"
                                            placeholder="Set follow-up date" :picker-options="pickerOptions1"
                                            @change="setFollowUpDate(followupDate, task)" style="width: 150px">
                            </el-date-picker>
                        </b-col>
                        <b-col md="3" class="py-3 text-center">
                            <el-date-picker size="small" v-model="dueDate" type="datetime" :placeholder="get_text('set_due_date@TaskList@l')"
                                            :picker-options="pickerOptions1" @change="setDueDate(dueDate, task)"
                                            style="width: 150px">
                            </el-date-picker>
                        </b-col>
                        <b-col md="3" class="py-3 text-center">
                            <a href="#" @click="showingGroupModal = true;"><i class="fa fa-th"></i>
                                <span v-if="task.identityLink"> {{ getIdentiyLink(task.identityLink) ? getIdentiyLink(task.identityLink) : 'Add groups' }} </span>
                                <span v-else>{{ get_text('add_groups@TaskList@l') }}</span>
                            </a>
                        </b-col>
                        <b-col md="3" class="py-3 text-center">
                            <a href="#" v-if="!checkAssignee()" @click.prevent="claimTask(task)" class=""><i
                                    class="fa fa-user"></i> {{ get_text('claim@TaskList@l') }}</a>
                            <a href="#" v-else @click="unClaimTask(task)"><i class="fa fa-user"></i> {{
                                $store.getters.getUser.name+" "+$store.getters.getUser.last_name }} <i
                                        class="fa fa-remove"></i></a>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col md="3" class="text-center">
                            <small v-if="task.followUp">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <timeago :datetime="followupDate" :auto-update="1"></timeago>&nbsp;
                                <a href="#" @click="setFollowUpDate(null, task)"><i class="fa fa-remove"></i> </a>
                            </small>
                        </b-col>
                        <b-col md="3" class="text-center">
                            <small v-if="task.due">
                                <i class="fa fa-bell"></i>&nbsp;
                                <timeago :datetime="dueDate" :auto-update="1"></timeago>&nbsp;
                                <a href="#" @click="setDueDate(null, task)"><i class="fa fa-remove"></i> </a>
                            </small>
                        </b-col>
                        <b-col md="3"></b-col>
                        <b-col md="3"></b-col>
                    </b-row>
                    <hr>
                    <b-tabs v-model="activeName">
                        <b-tab label="Form" name="Form">
                            <template slot="title">
                                <i class="fa fa-file-code-o"></i> {{tabs[0]}}
                            </template>
                            <br>
                            <form @submit.prevent="submitTaskForm" v-if="task.formVariable" name="generatedForm"
                                  role="form" :class="{ formActive : formActive}">

                                <div v-for="(input,index) of task.formVariable" :key="index" class="form-group">

                                    <camunda-input :input="input" :v-model="input.value" :Label="index"
                                                   :isDisabled="formActive"></camunda-input>

                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <button class="btn btn-primary btn-lg" :disabled="formActive" style="width:100%"
                                                :class="{ demo : formActive}">{{ get_text('submit@TaskList@l') }}
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div v-else class="form-group">
                                <button @click.prevent="submitTaskForm" style="width:100%" :disabled="formActive"
                                        class="btn btn-lg btn-primary" :class="{ demo : formActive}">{{ get_text('complete_task@TaskList@l') }}
                                </button>
                            </div>
                        </b-tab>
                        <b-tab label="History" name="History">
                            <template slot="title">
                                <i class="fa fa-history "></i> {{tabs[1]}}
                            </template>
                            <br>
                            <div v-if="task.history">
                                <b-row class="day ng-scope" v-for="(operation,index) in orderedUsers" :key="index">
                                    <b-col cols="3">
                                        <div class="date-badge">
                                            <div v-if="operation.timestamp">
                                                <span class="day ng-binding">{{ operation.timestamp | moment("Do") }}</span>
                                                <span class="month ng-binding">{{ operation.timestamp | moment("MMMM") }}</span>
                                                <span class="year ng-binding">{{ operation.timestamp | moment("YYYY") }}</span>
                                            </div>
                                        </div>
                                    </b-col>

                                    <b-col cols="9">
                                        <!-- ngRepeat: event in day.events | orderBy:'-time' -->
                                        <b-row class="instant row ng-scope"
                                               v-for="(history,index) in orderedHistory(operation)" :key="index"
                                               v-if="index != 0">
                                            <b-col sm="3" class="operation-meta">
                                                <div class="operation-time" tooltip-placement="left"
                                                     tooltip="Tuesday, 15 January 2019 12:12">
                                                    <span v-if="history.timestamp">{{ history.timestamp | moment("h:mm a") }}</span>
                                                    <span v-else>{{ history.time | moment("h:mm a") }}</span>
                                                </div>
                                                <div class="operation-user">{{ history.userId }}
                                                </div>
                                            </b-col>

                                            <b-col sm="9" class="operation-detail">
                                                <b-row>
                                                    <h4 class="col-xl-12 ng-binding">
                                                        <span v-if="history.operationType">{{ history.operationType }}</span>
                                                        <span v-else-if="index != 0">{{ get_text('comment@TaskList@l') }}</span></h4>
                                                </b-row>

                                                <b-row class="event-body">
                                                    <b-col sm="12" md="4" class="event-property ng-binding">
                                                        <span v-if="history.property">{{ history.property }}</span>
                                                        <span v-else>{{ history.message }}</span>
                                                    </b-col>

                                                    <b-col sm="12" md="8">
                                                        <b-col v-if="history.orgValue" class="original-value">
                                                            <span class="ng-binding">{{ history.orgValue }}</span>
                                                        </b-col>
                                                        <b-col v-else>
                                                            <span class="ng-binding">{{ history.newValue }}</span>
                                                        </b-col>
                                                    </b-col>
                                                </b-row>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </div>
                            <div v-else> {{ get_text('no_history_found@TaskList@l') }}</div>
                        </b-tab>
                        <b-tab label="Diagram" name="Diagram" @click="handleClick">
                            <template slot="title">
                                <i class="fa fa-image"></i> {{tabs[2]}}
                            </template>
                            <br>
                            <div id="diagramCanvas"></div>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-file-text"></i> {{tabs[3]}}
                            </template>
                            <br>
                            <p v-if="task.description">{{ task.description }}</p>
                            <p v-else>{{ get_text('no_description@TaskList@l') }} </p>
                        </b-tab>
                        <b-tab>
                            <template slot="title">
                                <i class="fa fa-pencil-square-o"></i> {{tabs[4]}}
                            </template>
                            <br>
                            <section class="todoapp">
                                <header class="header">

                                    <input type="text" class="new-todo todo-input" placeholder="What need to do Done"
                                           v-model="newTodo" @keyup.enter="addTodo">
                                </header>
                                <section class="mainSection">
                                    <input id="toggle-all" class="toggle-all" type="checkbox" :checked="!anyRemaining"
                                           @click.prevent="checkAllTodos">
                                    <label for="toggle-all"></label>
                                    <!--<input class="toggle-all" type="checkbox" :checked="!anyRemaining"
                                           @click.prevent="checkAllTodos">-->
                                    <ul class="todo-list">
                                        <li v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo" :class="{ completed: todo.completed, editing: todo == editedTodo }">
                                            <!--{{ editedTodo }} {{ todo }}-->
                                            <div class="view">
                                                <input type="checkbox" @click="doUndoTask(todo)" class="toggle"
                                                       v-model="todo.completed">
                                                <label @dblclick="editTodo(todo)"
                                                       :class="{ completed : todo.completed }">{{ todo.todo_text
                                                    }}</label>
                                                <button class="destroy" @click="removeTodo(index, todo)"></button>
                                            </div>
                                            <input
                                                   class="edit" type="text"
                                                   v-model="todo.todo_text"
                                                   v-focus
                                                   @blur="doneEdit(todo)"
                                                   @keyup.enter="doneEdit(todo)"
                                                   @keyup.esc="cancelEdit(todo)">
                                        </li>
                                    </ul>
                                </section>
                                <footer class="footer" v-show="todos.length" v-cloak>
                                     <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
    </span>
                                    <ul class="filters">
                                        <li><a href="#/all" :class="{ active: filter == 'all' }"
                                               @click.prevent="filter='all'">{{ get_text('all@TaskList@l')  }}</a></li>
                                        <li><a href="#/active" :class="{ active: filter == 'active' }"
                                               @click.prevent="filter='active'">{{ get_text('active@TaskList@l')  }}</a></li>
                                        <li><a href="#/completed" :class="{ active: filter == 'completed' }"
                                               @click.prevent="filter='completed'">{{ get_text('completed@TaskList@l') }}</a></li>
                                    </ul>
                                </footer>
                            </section>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <b-modal :title="get_text('manage_groups@TaskList@l')" size="md" class="modal-primary" v-model="showingGroupModal"
                 ok-variant="primary">
            <div class="modalcontent">
                <b-col md="12" class="text-center">
                    <b-row>
                        <b-col sm="12">
                            <b-form-group label-for="elementsAppendButton"
                                          :description="get_text('add_groups@TaskList@l')">
                                <b-input-group>
                                    <b-form-select v-model="myInput"
                                                   :options="this.$store.state.groups">
                                        <template slot="first">
                                            <option :value="null" disabled>-- {{ get_text('please_select@TaskList@l') }} --</option>
                                        </template>
                                    </b-form-select>
                                    <b-input-group-append>
                                        <b-button :disabled="!myInput" variant="primary" @click="addGroup(task)">{{ get_text('add_groups@TaskList@l') }}!
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-row>

                    <div v-if="task">
                        <div v-if="!this.isLoadAdd && !this.isLoadDelete">
                            <b-list-group v-for="(data, index) in task.identityLink" :key="data.groupId">
                                <b-list-group-item v-if="data.userId == null">
                                    <a href="#" @click="removeGroup(task, data.groupId)"><i
                                            class="fa fa-remove float-left"></i></a> {{ data.groupId }}
                                </b-list-group-item>
                            </b-list-group>
                        </div>
                        <div v-else>
                          {{ get_text('loading@TaskList@l') }}
                        </div>
                    </div>
                </b-col>
            </div>
        </b-modal>
        <b-modal :title="get_text('add_comment@TaskList@l')" size="lg" class="modal-primary" v-model="showingModal"
                 @close="myComment = null" hide-footer>
            <b-form @submit.prevent="addComment(task, myComment)">
                <b-row>
                    <b-col sm="12">
                        <b-form-group>
                            <b-form-textarea id="textarea1"
                                             v-model="myComment"
                                             :placeholder="get_text('please_enter@TaskList@l')"
                                             :rows="3"
                                             :max-rows="6">
                            </b-form-textarea>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-button :disabled="!myComment" :class="{ demo: !myComment}" class="float-right" variant="primary"
                          size="md" type="submit">{{ get_text('save@TaskList@l') }}
                </b-button>
            </b-form>
        </b-modal>
    </div>
</template>
<style>

    .djs-container .highlighted .djs-outline {
        stroke-width: 2px !important;
        stroke: transparent !important;
        background: #a9def9 !important;
    }

    .djs-container .highlighted .djs-visual > :nth-child(1) {
        fill: #a9def9 !important;
    }
</style>
<script>
    import {store} from '@/components/taskList/store/store'
    import Vue from 'vue'
    import Element from 'element-ui'
    import 'element-ui/lib/theme-chalk/index.css';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import CamundaInput from "./CamundaInput"
    import BpmnViewer from 'bpmn-js'

    require('bpmn-js/dist/assets/diagram-js.css');
    var $ = require('jquery');
    Vue.use(Loading);
    Vue.use(Element);
    import lang from 'element-ui/lib/locale/lang/en';
    import locale from 'element-ui/lib/locale';

    locale.use(lang);
    Vue.use(require('vue-moment'));
    import VueTimeago from 'vue-timeago'

    Vue.use(VueTimeago, {
        name: 'Timeago', // Component name, `Timeago` by default
        locale: 'en', // Default locale
        // We use `date-fns` under the hood
        // So you can use all locales from it
        locales: {
            'zh-CN': require('date-fns/locale/zh_cn'),
            'ja': require('date-fns/locale/ja'),
        }
    });

    var _ = require('lodash');

    export default {
        store: store,
        data: () => {
            return {
                pickerOptions1: {
                    shortcuts: [{
                        text: 'Today',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: 'A week ago',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            //alert('in'+date)
                            picker.$emit('pick', date);
                        }
                    }]
                },
                myInput: '',
                myComment: '',
                userTasks: {},
                groupTasks: {},
                task: null,
                active: true,
                followupDate: '',
                dueDate: '',
                showDropDown: null,
                userActiveIndex: undefined,
                groupActiveIndex: undefined,
                showingGroupModal: false,
                activeName: 0,
                activeMain: 0,
                isLoadAdd: false,
                isLoadDelete: false,
                formActive: false,
                showingModal: false,
                comment: '',
                newTodo: '',
                filter: 'all',
                editedTodo: null,
                translation:[],
                //tabIndex: [0, 0],
                tabs: [
                    'Form',
                    'History',
                    'Diagram',
                    'Description',
                    'Todos',
                ],
                subscriptions: [
                    {id: 1, name: 'one'},
                    {id: 2, name: 'two'},
                    {id: 3, name: 'three'}
                ],
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        created() {
            this.$store.dispatch('translation');
            this.getUserTasks();
            this.getTasks();
            this.$store.dispatch('loadGroups')
        },
        components: {
            'loading': Loading,
            'CamundaInput': CamundaInput
        },
        computed: {
            orderedUsers: function () {
                var unordered = this.task.days;
                var resultArray = $.map(unordered, function (value, index) {
                    return [value];
                });
                return resultArray.sort().reverse();
            },
            todos() {
                return this.$store.state.todos
            },
            count() {
                return this.$store.getters.count
            },
            doneTodosCount() {
                return this.$store.getters.doneTodosCount
            },
            anyRemaining() {
                return this.$store.getters.remaining != 0;
            },
            remaining() {
                return this.$store.getters.remaining;
            },
            todosFiltered() {
                if (this.filter == "all") {
                    return this.$store.state.todos
                } else if (this.filter == "active") {
                    return this.$store.state.todos.filter(todo => !todo.completed)
                } else if (this.filter == "completed") {
                    return this.$store.state.todos.filter(todo => todo.completed)
                }

                return this.$store.state.todos
            },
            showClearCompletedButton() {
                return this.$store.state.todos.filter(todo => todo.completed).length > 0
            }
        },
        filters: {
            pluralize: function (n) {
                return n === 1 ? 'item' : 'items'
            }
        },
        directives: {
            'focus': {
                inserted: function (el) {
                    el.focus();
                },
                update: function (el) {
                    Vue.nextTick(function () {
                        el.focus();
                    })
                }
            }
        },
        methods: {
            get_text(textbit) {
                var transtext = this.translation[this.$i18n.locale][textbit];
                if (transtext) {
                    return transtext;
                } else {
                    var spliteText = (textbit.split("@"));
                    if(spliteText.length > 2) {
                        var newTxt = (spliteText[0]+'@'+'l');
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
            orderedHistory: function (ar) {
                return _.orderBy(ar, ['timestamp'], ['desc'])
            },
            async getUserTasks() {
                this.task = null;
                this.userActiveIndex = undefined;
                this.groupActiveIndex = undefined;
                this.$store.state.isLoading = true;
                Vue.axios.post(`/user_tasks`)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.userTasks = response.data.tasks;
                            if (this.userTasks.length > 0) {
                            } else {
                            }
                        } else {
                            this.userTasks = [];
                        }
                        this.$store.state.isLoading = false;
                    }).catch(error => {
                    console.log(error.response.data.message);
                    this.$store.state.isLoading = false;
                    if (error.response.status == 403){
                        Vue.prototype.$notify.error({
                            title: 'Error',
                            message: error.response.data.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }});
            },
            async getTasks() {
                this.task = null;
                this.userActiveIndex = undefined;
                this.groupActiveIndex = undefined;
                this.$store.state.isLoading = true;
                Vue.axios.post(`/group_tasks`)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.groupTasks = response.data.tasks
                            if (this.groupTasks.length > 0) {
                            } else {
                                //this.notFound = true
                            }
                        } else {
                            this.groupTasks = [];
                        }
                        this.$store.state.isLoading = false;
                    }).catch(error => {
                    console.log(error.response.data.message);
                    this.$store.state.isLoading = false;
                    if (error.response.status == 403){
                        Vue.prototype.$notify.error({
                            title: 'Error',
                            message: error.response.data.message,
                            type: 'Error',
                            position: 'top-right'
                        });
                    }});
            },
            async taskDetails(task, isLoad = null) {
                this.activeName = 0;
                if (isLoad == 'add') {
                    this.isLoadAdd = true;
                } else if (isLoad == 'delete') {
                    this.isLoadDelete = true;
                } else {
                    this.$store.state.isLoading = true;
                }
                Vue.axios.post(`/user_task_details`, task)
                    .then(response => {
                        if (this.activeMain) {
                            this.formActive = true;
                        } else {
                            this.formActive = false;
                        }
                        if (response.data.code == 200) {
                            this.task = response.data.task;
                            this.$store.state.todos = response.data.task.todos;
                            this.followupDate = this.task.followUp;
                            this.dueDate = (this.task.due != null) ? this.task.due : '';
                            if (this.activeMain == 0) {
                                this.userActiveIndex = this.task.id
                            } else {
                                this.groupActiveIndex = this.task.id
                            }
                        } else {

                        }
                        if (isLoad == 'add') {
                            this.isLoadAdd = false;
                        } else if (isLoad == 'delete') {
                            this.isLoadDelete = false;
                        } else {
                            this.$store.state.isLoading = false;
                        }
                    })
                    .catch(e => {
                        //console.log(e)
                    })
            },
            async claimTask(task) {
                Vue.axios.post(`/claim_task`, task)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.taskDetails(task);
                            this.getTasks();
                            this.getUserTasks();

                            if (this.activeMain == 1) {
                                this.activeMain = 0;
                            } else {
                                this.activeMain = 1;
                            }
                        } else {

                        }
                    })
                    .catch(e => {
                        //console.log(e)
                    })
            },
            async unClaimTask(task) {
                Vue.axios.post(`/unclaim_task`, task)
                    .then(response => {
                        if (response.data.code == 200) {
                            this.taskDetails(task);
                            this.getTasks();
                            this.getUserTasks();
                            //alert(task);

                            if (this.activeMain == 1) {
                                this.activeMain = 0;
                                this.userActiveIndex = task.id;
                            } else {
                                this.activeMain = 1;
                                this.groupActiveIndex = task.id;
                            }
                        } else {
                        }
                    })
                    .catch(e => {
                        //console.log(e)
                    })
            },
            handleClick(tab, event) {
                if (this.activeName == "2") {
                    this.handleDiagram(this.task)
                }
            },
            handleDiagram(task) {
                /** Check if this diagram is implemented before */
                var xml = task.diagram.bpmn20Xml
                if (this.currentXml == xml) {
                    return;
                }

                var container = $('#diagramCanvas');
                container.html("");

                var viewer = new BpmnViewer({
                    container: container,
                    width: '100%',
                    height: '100%'
                });


                var app = this
                viewer.importXML(xml, function (err) {

                    if (err) {
                        console.log('error rendering', err);
                    } else {
                        var canvas = viewer.get('canvas');
                        // zoom to fit full viewport
                        canvas.zoom('fit-viewport', true);
                        canvas.viewbox();
                        container.removeClass('with-error')
                            .addClass('with-diagram');

                        canvas.addMarker(app.task.taskDefinitionKey, 'highlighted');

                        /*viewer.saveXML({ format: true }, function (err, xml) {
                            // here xml is the bpmn format
                        });*/

                    }
                });
                //this.currentXml = xml;
            },
            processName(str, name) {
                var string = str.split(":");
                return (string[0]) ? string[0] : name;
            },
            checkAssignee(AccessType = '') {
                if (AccessType === 'form') {
                    /** Event Must be onclick */
                    if (!this.checkAssignee()) {
                        $('body input').css('disabled', 'disabled')
                        alert("PLEASE claim the task first")
                        return false;
                    }
                }
                //alert(this.$store.getters.getUser.bpm_ref+'=='+this.task.assignee);
                if (this.task.assignee === this.$store.getters.getUser.bpm_ref) {
                    return true;
                }
                return false;
            },
            setActive(index, type) {
                if (type == "group") {
                    this.groupActiveIndex = index;
                } else {
                    this.userActiveIndex = index;
                }
            },
            moreLessActive(index) {
                this.showDropDown = (index != this.showDropDown ? index : null)
            },
            getIdentiyLink(identy) {
                const linesWithBreaks = []
                //const valus = ''
                identy.forEach((line) => {
                    if (line.userId == null)
                        linesWithBreaks.push(line.groupId)
                })

                return linesWithBreaks.join().length > 10 ? linesWithBreaks.join().substring(0, 14) + '...' : linesWithBreaks.join();
            },
            addGroup(task) {
                Vue.axios.post(`/add_identity_link`, {'id': task.id, groupId: this.myInput})
                    .then(response => {

                        if (response.data.code == 200) {
                            this.taskDetails(task, 'add');
                        }
                    })
                    .catch(e => {

                    })
            },
            removeGroup(task, groupId) {
                Vue.axios.post(`/remove_identity_link`, {'id': task.id, groupId: groupId})
                    .then(response => {

                        if (response.data.code == 200) {
                            //this.task.identityLink.push({groupId: groupId});
                            this.taskDetails(task, 'delete');
                        }
                    })
                    .catch(e => {

                    })
            },
            setFollowUpDate(value, task) {
                this.$store.state.isLoading = true;
                Vue.axios.post(`/set_follow_up_date`, {task: task, followUp: value})
                    .then(response => {
                        if (response.data.code == 200) {
                            this.getUserTasks();
                            this.getTasks();
                            this.taskDetails(task);
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch(e => {

                    })
            },
            setDueDate(value, task) {
                this.$store.state.isLoading = true;
                Vue.axios.post(`/set_due_date`, {task: task, due: value})
                    .then(response => {
                        if (response.data.code == 200) {
                            this.getUserTasks();
                            this.getTasks();
                            this.taskDetails(task);
                        }
                        this.$store.state.isLoading = false;
                    })
                    .catch(e => {

                    })
            },
            submitTaskForm() {
                Vue.axios.post(`/submit_task_form`, this.task)
                    .then(response => {
                        this.getUserTasks();
                        this.task = null;
                        if (response.data.code == 200) {
                            this.task = response.data.task
                        } else {
                        }
                    })
                    .catch(e => {
                        //console.log(e)
                    })
            },
            toggleNav() {
                this.$parent.$emit('toggleNav')
            },
            addComment(task, myComment) {
                Vue.axios.post(`/create_comment_list`, {"id": task.id, "myComment": this.myComment})
                    .then(response => {
                        this.task = null;
                        if (response.data.code == 200) {
                            //this.task = response.data.task
                        } else {
                        }
                        this.taskDetails(task);
                        this.showingModal = false;
                    })
                    .catch(e => {
                        //console.log(e)
                    })
            },
            createTodo() {
                var number = this.$store.getters.count
                var id = number + 1;
                var text = this.newTodo;
                var taskId = this.task.id;
                var todo = {id: id, taskId: taskId, todo_text: text, completed: false}
                return todo
            },

            addTodo() {
                if (this.newTodo.trim() == 0) {
                    return
                }
                this.$store.commit('add', this.createTodo())
                this.newTodo = '';
            },

            editTodo(todo) {
                this.$store.commit('edit', todo)
                this.editedTodo = todo
            },
            doneEdit(todo) {
                if (todo.todo_text.trim() == '') {
                    todo.todo_text = this.$store.state.beforeEditCache;
                }
                const edit = 'yes';
                this.$store.commit('Todoedit', {edit, todo})
                todo.editing = false;
                this.editedTodo = null
            },
            doUndoTask(todo) {
                //console.log(todo)
                this.$store.commit('doundo', todo)
            },
            cancelEdit(todo) {
                this.editedTodo = null
                this.$store.commit('cancel', todo)
            },
            removeTodo(index, todo) {
                this.$store.commit('remove', {index, todo})
            },
            checkAllTodos() {
                this.$store.commit('toggleAll')
            },
            clearCompleted() {
                this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
            }
        },
        mounted() {
            this.$parent.$on('toggleNav', () => {
                //console.log('received')
                this.active = !this.active
            })
        },
        watch: {
            tasks: {
                handler() {

                },
                deep: true
            },
            task: {
                handler() {

                },
                deep: true
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

    .day.row:first-child {
        margin-top: 0;
        border-top: none;
        padding-top: 0;
    }

    .day.row {
        margin-top: 5px;
        border-top: 1px dotted #777;
        padding-top: 5px;
        margin-bottom: 5px !important;
    }

    .date-badge {
        max-width: 75px;
        margin: auto;
    }

    .date-badge > div {
        border-radius: 50%;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        overflow: hidden;
        background-color: #eee;
    }

    .date-badge .day {
        font-size: 16px;
        margin-top: 5px;
    }

    .date-badge span {
        display: block;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .date-badge span {
        display: block;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .date-badge span {
        display: block;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .instant.row {
        margin-bottom: 0;
    }

    .instant {
        overflow: hidden;
    }

    .instant:first-child > div {
        padding-top: 0;
    }

    .instant .operation-meta {
        text-align: center;
    }

    .instant > div {
        padding-top: 15px;
    }

    .instant .operation-time {
        margin-bottom: 9px;
    }

    .instant .operation-user {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .instant:first-child > div {
        padding-top: 0;
    }

    .instant > div {
        padding-top: 15px;
    }

    .instant h4 {
        margin-top: 0;
    }

    .event-body > .line:first-child {
        margin-top: 0;
    }

    .event-body > .line {
        overflow: hidden;
        margin-top: 15px;
    }

    .instant h5 {
        margin-top: 2px;
        margin-bottom: 0;
    }

    .event-property {
        font-weight: bold;
        padding-right: 15px;
    }

    .original-value {
        text-decoration: line-through;
        color: #777;
    }

    .aside {
        display: none;
    }

    .aside.active {
        display: block;
    }

    .formActive {
        background-color: #f4f4f4;
        cursor: not-allowed;
    }

    .demo {
        cursor: not-allowed;
    }

    .instant > div:before {
        display: block;
        content: ' ';
        width: 100%;
        height: 1px;
        margin-top: -1px;
        border-top: 1px solid #ddd;
        margin-bottom: 15px;
    }
</style>
<style lang="scss">

    /*html,
    body {
        margin: 0;
        padding: 0;
    }
*/
    button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /*body {
        font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.4em;
        background: #f5f5f5;
        color: #4d4d4d;
        min-width: 230px;
        max-width: 550px;
        margin: 0 auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-weight: 300;
    }*/

    :focus {
        outline: 0;
    }

    .hidden {
        display: none;
    }

    .todoapp {
        background: #fff;
        //margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
        0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    .todoapp input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp h1 {
        position: absolute;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }

    .new-todo,
    .edit {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .new-todo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }

    .main {
        position: relative;
        z-index: 2;
        border-top: 1px solid #e6e6e6;
    }

    .toggle-all {
        text-align: center;
        border: none; /* Mobile Safari */
        opacity: 0;
        position: absolute;
    }

    .toggle-all + label {
        width: 60px;
        height: 34px;
        font-size: 0;
        position: absolute;
        top: 0px;
        left: 0px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .toggle-all + label:before {
        content: '❯';
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    .toggle-all:checked + label:before {
        color: #737373;
    }

    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .todo-list li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
        border-bottom: none;
    }

    .todo-list li.editing {
        border-bottom: none;
        padding: 0;
    }

    .todo-list li.editing .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }

    .todo-list li.editing .view {
        display: none;
    }

    .todo-list li .toggle {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        border: none; /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    .todo-list li .toggle {
        opacity: 0;
    }

    .todo-list li .toggle + label {
        /*
            Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
            IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
        */
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-position: center left;
    }

    .todo-list li .toggle:checked + label {
        background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
    }

    .todo-list li label {
        word-break: break-all;
        padding: 15px 15px 15px 60px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    .todo-list li.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    .todo-list li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    .todo-list li .destroy:hover {
        color: #af5b5e;
    }

    .todo-list li .destroy:after {
        content: '×';
    }

    .todo-list li:hover .destroy {
        display: block;
    }

    .todo-list li .edit {
        display: none;
    }

    .todo-list li.editing:last-child {
        margin-bottom: -1px;
    }

    .footer {
        color: #777;
        padding: 10px 15px;
        height: 40px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
    }

    .footer:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
        0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2),
        0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    .todo-count {
        float: left;
        text-align: left;
    }

    .todo-count strong {
        font-weight: 300;
    }

    .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .filters li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    .filters li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    .clear-completed,
    html .clear-completed:active {
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
    }

    .clear-completed:hover {
        text-decoration: underline;
    }

    .info {
        margin: 65px auto 0;
        color: #bfbfbf;
        font-size: 10px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
        text-align: center;
    }

    .info p {
        line-height: 1;
    }

    .info a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }

    .info a:hover {
        text-decoration: underline;
    }

    .filters li a.active {
        border-color: rgba(175, 47, 47, 0.2);
    }
    /*
        Hack to remove background from Mobile Safari.
        Can't use it globally since it destroys checkboxes in Firefox
    */
    @media screen and (-webkit-min-device-pixel-ratio:0) {
        .toggle-all,
        .todo-list li .toggle {
            background: none;
        }

        .todo-list li .toggle {
            height: 40px;
        }
    }

    @media (max-width: 430px) {
        .footer {
            height: 50px;
        }

        .filters {
            bottom: 0px;
        }
    }
</style>
