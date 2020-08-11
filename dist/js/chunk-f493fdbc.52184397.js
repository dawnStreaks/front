(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f493fdbc"],{"27d6":function(t,e,s){"use strict";s.d(e,"a",(function(){return u}));var a=s("a026"),o=s("2f62"),i=s("5c96"),n=s.n(i),r=s("a18c"),l=s("88eb"),c=s("d3a4");s("f910");var d=s("1157");a["default"].use(o["a"]),a["default"].use(n.a),a["default"].prototype.$notify=i["Notification"];var u=new o["a"].Store({state:{translations:{en:{hello:"Hello World"},ar:{hello:"Hallo Verden"}},loading:!1,process:[],processTasks:[],processInstance:[],isLoading:!1,fullPage:!0,activeInstance:null,taskId:null,title:"",message:""},mutations:{SET_PROCESS:function(t,e){t.process=e},SET_PROCESS_TASKS:function(t,e){t.processTasks=e||[]},SET_PROCESS_INSTANCE_USER_TASKS:function(t,e){t.processInstance=e||[]},SET_PROCESS_DEFINATION_COUNT:function(t,e){t.activeInstance=e},SET_PROCESS_DEFINATION_TASK_ID:function(t,e){t.taskId=e?e.map((function(t){return{taskId:t.id,instance:t.instances}})):[],console.log(t.taskId)},SET_PROCESS_DEFINATION_XML:function(t,e){var s=this.state.taskId,a=e.data.diagram.bpmn20Xml,o=d("#diagramCanvas"),i=new l["a"]({container:o,width:"100%",height:"200px"});i.importXML(a,(function(t){if(t)console.log("error rendering",t);else{var e=i.get("canvas");e.zoom("fit-viewport",!0),e.viewbox(),o.removeClass("with-error").addClass("with-diagram")}var a=i.get("overlays");for(var n in s)a.add(s[n].taskId,"note",{position:{left:0,top:80},html:'<div class="activity-bottom-left-position instances-overlay" style="position: absolute; left: -0.7em; bottom: -0.25em;"><span style="font-size: 12px;border-width: 1px;border-style: solid;background-color: #70b8db;border-color: #143d52;color: #143d52;border-radius:10px;" class="badge instance-count" data-original-title="" title="">'+s[n].instance+"</span></div>"}),e.addMarker(s[n].taskId,"highlighted")})),this.currentXml=a,this.state.isLoading=!1},GET_TEXT_TITLE:function(t,e){return t.title=e},GET_TEXT_MSG:function(t,e){return t.message=e}},getters:{process:function(t){return t.process},processTasks:function(t){return t.processTasks},getRowCount:function(t){return t.process.length},processInstance:function(t){return t.processInstance}},actions:{get_text_title:function(t,e){var s=t.commit,a=this.state.translations[c["a"].locale][e];s("GET_TEXT_TITLE",a||"!"+e)},get_text_message:function(t,e){var s=t.commit,a=this.state.translations[c["a"].locale][e];s("GET_TEXT_MSG",a||"!"+e)},loadProcess:function(t){var e=this,s=t.commit;this.state.isLoading=!0,a["default"].axios({url:"process",method:"GET"}).then((function(t){e.state.isLoading=!1,200==t.data.code?(e.state.loading=!0,s("SET_PROCESS",t.data.process)):(e.dispatch("get_text_title","Error@m"),e.dispatch("get_text_message",t.data.msg+"@m"),e.state.loading=!0,a["default"].prototype.$notify.error({title:e.state.title,message:e.state.message,type:"Error",position:"top-right"}))}))},loadProcessTasks:function(t,e){var s=this;t.commit;this.state.isLoading=!0,a["default"].axios({url:"process/"+e+"/task",method:"GET"}).then((function(t){200==t.data.code?s.state.loading=!0:404==t.data.code?(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message","Process Not Available@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}),r["a"].go(-1)):(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message",t.data.msg+"@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}))}))},loadProcessDefinitionCount:function(t,e){var s=t.commit;this.state.isLoading=!0,a["default"].axios({url:"process-definition/".concat(e,"/count"),method:"GET"}).then((function(t){s("SET_PROCESS_DEFINATION_COUNT",t.data.count)}))},processDefinitionXML:function(t,e){var s=t.commit;a["default"].axios.get("process-definition/".concat(e,"/xml")).then((function(t){s("SET_PROCESS_DEFINATION_XML",t)})).catch((function(t){console.log(t)}))},loadDefinationStatistic:function(t,e){var s=this,o=t.commit;this.state.isLoading=!0,a["default"].axios({url:"process-definition/".concat(e,"/statistics"),method:"GET"}).then((function(t){o("SET_PROCESS_DEFINATION_TASK_ID",t.data.process)})).catch((function(t){console.log(t.response.data.message),s.state.isLoading=!1,403==t.response.status&&(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message",t.response.data.message+"@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}))}))},loadHistoryProcessDefination:function(t,e){var s=this,o=t.commit;this.state.isLoading=!0,a["default"].axios({url:"process-instance-history/".concat(e),method:"GET"}).then((function(t){200==t.data.code||400==t.data.code?(s.state.loading=!0,o("SET_PROCESS_TASKS",t.data.process)):404==t.data.code?(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message","Process Not Available@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}),r["a"].go(-1)):(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message",t.data.msg+"@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}))}))},loadProcessInstanceUserTask:function(t,e){var s=this,o=t.commit;this.state.isLoading=!0,a["default"].axios({url:"processinstance/".concat(e),method:"GET"}).then((function(t){200==t.data.code||400==t.data.code?(console.log(t.data.processinstancedetails),s.state.loading=!0,o("SET_PROCESS_INSTANCE_USER_TASKS",t.data.processinstancedetails)):404==t.data.code?(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message","Process Not Available@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}),r["a"].go(-1)):(s.dispatch("get_text_title","Error@m"),s.dispatch("get_text_message",t.data.msg+"@m"),a["default"].prototype.$notify.error({title:s.state.title,message:s.state.message,type:"Error",position:"top-right"}))}))},translation:function(){var t=this;a["default"].axios.get("/gettranslations").then((function(e){if(t.state.isLoading=!1,200==e.data.code){JSON.stringify(e.data.data);t.state.translations=e.data.data}else t.dispatch("get_text_title","Error@m"),t.dispatch("get_text_message",e.data.msg+"@m"),a["default"].prototype.$notify.error({title:t.state.title,message:t.state.message,type:"Error",position:"top-right"})})).catch((function(e){t.state.isLoading=!1,422==e.response.status&&(t.dispatch("get_text_title","Error@m"),t.dispatch("get_text_message",e.response.data.errors.Type[0]+"@m"),a["default"].prototype.$notify.error({title:t.state.title,message:t.state.message,type:"Error",position:"top-right"}))}))}}})},3846:function(t,e,s){s("9e1e")&&"g"!=/./g.flags&&s("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:s("0bfb")})},"5f6c":function(t,e,s){"use strict";var a=s("ff41"),o=s.n(a);o.a},"6b54":function(t,e,s){"use strict";s("3846");var a=s("cb7c"),o=s("0bfb"),i=s("9e1e"),n="toString",r=/./[n],l=function(t){s("2aba")(RegExp.prototype,n,t,!0)};s("79e5")((function(){return"/a/b"!=r.call({source:"a",flags:"b"})}))?l((function(){var t=a(this);return"/".concat(t.source,"/","flags"in t?t.flags:!i&&t instanceof RegExp?o.call(t):void 0)})):r.name!=n&&l((function(){return r.call(this)}))},"7f7f":function(t,e,s){var a=s("86cc").f,o=Function.prototype,i=/^\s*function ([^ (]*)/,n="name";n in o||s("9e1e")&&a(o,n,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},d217:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("optgroup",{attrs:{label:t.get_text("select_the_parent_entity@users@l")},domProps:{innerHTML:t._s(t.html)}},[t._v("\n    "+t._s(this.tree)+"\n")])},o=[],i=(s("7f7f"),s("14b9"),s("ac6a"),s("28a5"),{mounted:function(){this.buildTree(this.tree,1)},data:function(){return{dash:"-",firstTime:0,html:"",translation:[]}},beforeMount:function(){localStorage.getItem("translation")&&(this.translation=JSON.parse(localStorage.getItem("translation")))},props:["tree"],methods:{get_text:function(t){var e=this.translation[this.$i18n.locale][t];if(e)return e;var s=t.split("@");if(s.length>2){var a=s[0]+"@l",o=this.translation[this.$i18n.locale][a];return o||"!"+t}return"!"+t},buildTree:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,s=this,a="--";return t.forEach((function(t){s.firstTime++,null!=t.bpm_ref&&0!=t.bpm_ref||(s.html+="<option value='"+t.id+"'>"+a.repeat(e)+t.name+"</option>"),"undefined"!=typeof t.tree&&t.tree.length>0&&s.buildTree(t.tree,e+2)})),s.html}},watch:{tree:{handler:function(){this.html="",this.buildTree(this.tree)},deep:!0}}}),n=i,r=s("2877"),l=Object(r["a"])(n,a,o,!1,null,null,null);e["a"]=l.exports},e045:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"app animated fadeIn"},[s("loading",{attrs:{active:this.$store.state.isLoading,"can-cancel":!0,"is-full-page":this.$store.state.fullPage},on:{"update:active":function(e){return t.$set(this.$store.state,"isLoading",e)}}}),s("b-row",[s("b-col",{attrs:{cols:"12",xl:"12"}},[s("transition",{attrs:{name:"slide"}},[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[s("b",{staticClass:"h4"},[t._v("  "+t._s(this.get_text("title@ProcessList@l")))])]),t.$auth.ready()&&this.$store.state.loading?t._e():s("div",[s("div",{staticStyle:{"text-align":"center","padding-top":"50px"}},[t._v("\n                            "+t._s(this.get_text("loading@l"))+"\n                        ")])]),t.$auth.ready()&&this.$store.state.loading?s("div",[s("b-row",[s("b-col",{staticClass:"my-1",attrs:{md:"4"}},[s("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:t.get_text("filter@l")}},[s("b-input-group",[s("b-form-input",{attrs:{placeholder:t.get_text("type to search@l")},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),s("b-input-group-append",[s("b-btn",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v(t._s(t.get_text("clear@l")))])],1)],1)],1)],1),s("b-col",{staticClass:"my-1",attrs:{md:"4"}},[s("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:t.get_text("sort@l")}},[s("b-input-group",[s("b-form-select",{attrs:{options:t.sortOptions},model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}},[s("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v(t._s(t.get_text("none@l")))])]),s("b-form-select",{attrs:{slot:"append",disabled:!t.sortBy},slot:"append",model:{value:t.sortDesc,callback:function(e){t.sortDesc=e},expression:"sortDesc"}},[s("option",{domProps:{value:!1}},[t._v(t._s(t.get_text("asc@l")))]),s("option",{domProps:{value:!0}},[t._v(t._s(t.get_text("desc@l")))])])],1)],1)],1),s("b-col",{staticClass:"my-1",attrs:{md:"4"}},[s("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:t.get_text("per page@l")}},[s("b-form-select",{attrs:{options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1),s("b-table",{attrs:{hover:t.hover,striped:t.striped,bordered:t.bordered,small:t.small,fixed:t.fixed,responsive:"sm",items:t.process,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"id",fn:function(e){return[s("b-col",{staticClass:"mb-3 mb-xl-0"},[t._v("\n                                    "+t._s(e.index+1)+"\n                                ")])]}},{key:"Process",fn:function(e){return t.$can("process-view")?[s("b-col",{staticClass:"mb-3 mb-xl-0 text-center"},[s("b-button",{staticClass:"btn-pill",attrs:{variant:"primary",size:"md"},on:{click:function(s){return t.editGroupTenant(e.item.id)}}},[s("i",{staticClass:"icon-eye icons font-1xl"}),t._v(" "+t._s(t.get_text("process details@l"))+"\n                                    ")])],1)]:void 0}}],null,!0)}),s("nav",[s("b-pagination",{attrs:{size:"sm","total-rows":t.totalRows,"per-page":t.perPage,"prev-text":t.get_text("prev@l"),"next-text":t.get_text("next@l"),"hide-goto-end-buttons":""},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1):t._e()])],1),s("b-modal",{staticClass:"modal-info",attrs:{title:t.get_text("information@ProcessList@l"),size:"md","ok-variant":"info"},model:{value:t.showingViewModal,callback:function(e){t.showingViewModal=e},expression:"showingViewModal"}},[s("div",{staticClass:"modalcontent"},[t._v("\n                    "+t._s(this.get_text("view process information@l"))+"\n                ")])])],1)],1)],1)},o=[],i=(s("6b54"),s("28a5"),s("27d6")),n=s("a026"),r=(s("0fae"),s("5c96")),l=s.n(r),c=s("9062"),d=s.n(c),u=(s("e40d"),s("d217"));n["default"].use(d.a),n["default"].use(l.a);var p={name:"tables",store:i["a"],props:{caption:{type:String,default:"Users"},hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1}},created:function(){this.$store.dispatch("loadProcess")},data:function(){return{fields:[],button:"",currentPage:1,perPage:5,totalRows:0,showingeditModal:!1,showingModal:!1,showingdeleteModal:!1,showingViewModal:!1,submitted:!1,updated:!1,groupInfo:null,pageOptions:[5,10,15],sortBy:null,sortDesc:!1,sortDirection:"asc",filter:null,translation:[]}},beforeMount:function(){localStorage.getItem("translation")&&(this.translation=JSON.parse(localStorage.getItem("translation")))},components:{loading:d.a,child:u["a"]},computed:{process:function(){return this.fields=[{key:"id",label:"#",thClass:"text-center",tdClass:"text-center"},{key:"name",label:this.get_text("process name@l"),sortable:!0},{key:"resource",label:this.get_text("process resource@l")},{key:"Process",label:this.get_text("process@l"),thClass:"text-center",tdClass:"text-center"}],this.$store.getters.process},sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}},watch:{showingeditModal:function(){0==this.showingeditModal&&(this.$store.dispatch("loadGroups"),this.groupData={})}},methods:{get_text:function(t){var e=this.translation[this.$i18n.locale][t];if(e)return e;var s=t.split("@");if(s.length>2){var a=s[0]+"@l",o=this.translation[this.$i18n.locale][a];return o||"!"+t}return"!"+t},$can:function(t){return-1!==this.$auth.user().allPermissions.indexOf(t)},selectUser:function(t){console.log(t),this.groupData=t},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},processTaskLink:function(t){return this.$store.state.processInstance=[],"process-defination/".concat(t.toString())},editGroupTenant:function(t){var e=this.processTaskLink(t);this.$router.push({path:e})}}},f=p,g=(s("5f6c"),s("2877")),h=Object(g["a"])(f,a,o,!1,null,"0b8dd03a",null);e["default"]=h.exports},ff41:function(t,e,s){}}]);
//# sourceMappingURL=chunk-f493fdbc.52184397.js.map