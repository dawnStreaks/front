(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54e89fdc"],{"0bcc":function(t,e,a){},"3a14":function(t,e,a){},"4c17":function(t,e,a){"use strict";var s=a("0bcc"),i=a.n(s);i.a},"5c16":function(t,e,a){"use strict";var s=a("3a14"),i=a.n(s);i.a},f7b0:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app animated fadeIn"},[a("loading",{attrs:{active:this.$store.state.isLoading,"can-cancel":!0,"is-full-page":this.$store.state.fullPage},on:{"update:active":function(e){return t.$set(this.$store.state,"isLoading",e)}}}),a("b-row",[a("b-col",{ref:"formContainer",attrs:{cols:"12",xl:"12"}},[a("transition",{attrs:{name:"slide"}},[a("b-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("b",{staticClass:"h4"},[t._v(t._s(t.get_text("title@prcType@l")))]),t.$can("prctype-create")?a("b-button",{staticClass:"btn float-right",attrs:{variant:"primary",size:"md"},on:{click:function(e){t.showingModal=!0}}},[a("b",[a("i",{staticClass:"icon-plus icons font-1xl"}),t._v(" "+t._s(this.get_text("add@prcType@l")))])]):t._e()],1),t.$auth.ready()&&this.$store.state.loading?t._e():a("div",[a("div",{staticStyle:{"text-align":"center","padding-top":"50px"}},[t._v("\n                            "+t._s(this.get_text("loading@prcType@l"))+"\n                        ")])]),t.$auth.ready()&&this.$store.state.loading?a("div",[a("b-row",[a("b-col",{staticClass:"my-1",attrs:{md:"4"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:this.get_text("filter@l")}},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:t.get_text("type_to_search@l")},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("b-input-group-append",[a("b-btn",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v(t._s(t.get_text("clear@l")))])],1)],1)],1)],1),a("b-col",{staticClass:"my-1",attrs:{md:"4"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:"Sort"}},[a("b-input-group",[a("b-form-select",{attrs:{options:t.sortOptions},model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}},[a("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v(t._s(t.get_text("none@l")))])]),a("b-form-select",{attrs:{slot:"append",disabled:!t.sortBy},slot:"append",model:{value:t.sortDesc,callback:function(e){t.sortDesc=e},expression:"sortDesc"}},[a("option",{domProps:{value:!1}},[t._v(t._s(t.get_text("asc@l")))]),a("option",{domProps:{value:!0}},[t._v(t._s(t.get_text("desc@l")))])])],1)],1)],1),a("b-col",{staticClass:"my-1",attrs:{md:"4"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:t.get_text("per_page@l")}},[a("b-form-select",{attrs:{options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1),a("b-table",{attrs:{hover:t.hover,striped:t.striped,bordered:t.bordered,small:t.small,fixed:t.fixed,responsive:"sm",items:t.priorities,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"status",fn:function(e){return[a("b-badge",{attrs:{variant:t.getBadge(e.item.status)}},[t._v(t._s(t.getName(e.item.status))+"\n                                ")])]}},{key:"Actions",fn:function(e){return[a("b-row",{staticClass:"text-center"},[t.$can("prctype-delete")?a("b-col",{staticClass:"mb-3 mb-xl-0",attrs:{cols:"2",sm:"4",md:"2",xl:"1"}},[a("b-button",{attrs:{variant:"primary",size:"sm"},on:{click:function(a){return t.editPriority(e.item,"view")}}},[a("b",[a("i",{staticClass:"icon-eye icons font-1xl"})])])],1):t._e(),t._v(" \n                                    "),t.$can("prctype-view")?a("b-col",{staticClass:"mb-3 mb-xl-0",attrs:{cols:"2",sm:"4",md:"2",xl:"1"}},[a("b-button",{attrs:{variant:"warning",size:"sm"},on:{click:function(a){return t.editPriority(e.item,"edit")}}},[a("b",[a("i",{staticClass:"icon-pencil icons font-1xl"})])])],1):t._e(),t._v(" \n                                    "),t.$can("prctype-edit")?a("b-col",{staticClass:"mb-xl-0",attrs:{cols:"2",sm:"4",md:"2",xl:"1"}},[a("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:function(a){t.showingdeleteModal=!0,t.selectPriority(e.item)}}},[a("b",[a("i",{staticClass:"icon-trash icons font-1xl"})])])],1):t._e(),t._v(" \n                                ")],1)]}}],null,!1,3512416464)}),a("nav",[a("b-pagination",{attrs:{size:"sm","total-rows":t.getRowCount,"per-page":t.perPage,"prev-text":this.get_text("prev@l"),"next-text":this.get_text("next@l"),"hide-goto-end-buttons":""},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1):t._e()])],1),a("b-modal",{staticClass:"modal-primary",attrs:{title:t.get_text("add@prcType@l"),size:"lg","hide-footer":""},on:{close:t.setPriorityData},model:{value:t.showingModal,callback:function(e){t.showingModal=e},expression:"showingModal"}},[a("b-form",{on:{submit:function(e){return e.preventDefault(),t.createPriority(e)}}},[a("b-row",[a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"TypeCode"}},[t._v(t._s(t.get_text("prc_type@prcType@l"))),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),a("b-form-select",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":t.submitted&&t.errors.has("TypeCode")},attrs:{plain:!0,value:"Please select",name:"TypeCode",id:"TypeCode",options:[{text:t.get_text("please_select@prcType@l"),value:null},{text:t.get_text("priority@prcType@l"),value:"Priority"},{text:t.get_text("risk@prcType@l"),value:"Risk"},{text:t.get_text("complexity@prcType@l"),value:"Complexity"}]},model:{value:t.priorityData.TypeCode,callback:function(e){t.$set(t.priorityData,"TypeCode",e)},expression:"priorityData.TypeCode"}}),t.submitted&&t.errors.has("TypeCode")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("TypeCode"))+"\n                                ")]):t._e()],1)],1),a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"Type"}},[t._v(t._s(t.get_text("type@prcType@l"))),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":t.submitted&&t.errors.has("Type")},attrs:{type:"text",name:"Type",id:"Type",placeholder:t.get_text("enter_prc_type_name@prcType@l")},model:{value:t.priorityData.Type,callback:function(e){t.$set(t.priorityData,"Type",e)},expression:"priorityData.Type"}}),t.submitted&&t.errors.has("Type")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("Type"))+"\n                                ")]):t._e()],1)],1)],1),a("b-button",{staticClass:"float-right",attrs:{variant:"primary",size:"lg",type:"submit"}},[t._v(t._s(t.get_text("save@prcType@l")))])],1)],1),a("b-modal",{ref:"vueModel",staticClass:"modal-primary",attrs:{title:t.get_text("edit@prcType@l"),size:"lg","hide-footer":""},model:{value:t.showingeditModal,callback:function(e){t.showingeditModal=e},expression:"showingeditModal"}},[a("b-form",{on:{submit:function(e){return e.preventDefault(),t.updatePriority(e)}}},[a("b-row",[a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"TypeCode"}},[t._v(t._s(t.get_text("prc_type@prcType@l"))),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),a("b-form-select",{class:{"is-invalid":t.updated&&t.errors.has("TypeCode")},attrs:{plain:!0,value:"Please select",name:"TypeCode",id:"TypeCode",disabled:"",placeholder:"Enter your name",options:[{text:t.get_text("please_select@prcType@l"),value:null},{text:t.get_text("priority@prcType@l"),value:"Priority"},{text:t.get_text("risk@prcType@l"),value:"Risk"},{text:t.get_text("complexity@prcType@l"),value:"Complexity"}]},model:{value:t.priorityData.TypeCode,callback:function(e){t.$set(t.priorityData,"TypeCode",e)},expression:"priorityData.TypeCode"}}),t.updated&&t.errors.has("TypeCode")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("TypeCode"))+"\n                                ")]):t._e()],1)],1),a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"Type"}},[t._v(t._s(t.get_text("type@prcType@l"))),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":t.updated&&t.errors.has("Type")},attrs:{type:"text",id:"Type",name:"Type",placeholder:t.get_text("enter_prc_type_name@prcType@l")},model:{value:t.priorityData.Type,callback:function(e){t.$set(t.priorityData,"Type",e)},expression:"priorityData.Type"}}),t.updated&&t.errors.has("Type")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("Type"))+"\n                                ")]):t._e()],1)],1)],1),a("b-button",{staticClass:"float-right",attrs:{variant:"primary",size:"lg",type:"submit"}},[t._v(t._s(t.get_text("update@prcType@l")))])],1)],1),a("b-modal",{staticClass:"modal-danger",attrs:{title:t.get_text("delete@prcType@l"),size:"lg","ok-variant":"danger"},model:{value:t.showingdeleteModal,callback:function(e){t.showingdeleteModal=e},expression:"showingdeleteModal"}},[a("div",{staticClass:"modalcontent"},[a("h3",{staticClass:"text-center"},[t._v(t._s(t.get_text("are_you_sure_to_delete@prcType@l"))+" "),a("b",[t._v(t._s(t.priorityData.name))]),t._v("?")]),a("b-col",{staticClass:"text-center",attrs:{md:"12"}},[a("button",{staticClass:"btn btn-outline-danger left",on:{click:function(e){t.showingdeleteModal=!1,t.removePriority(t.priorityData)}}},[t._v(t._s(t.get_text("yes@prcType@l"))+"\n                        ")]),t._v(" \n                        "),a("button",{staticClass:"btn btn-outline-success right",on:{click:function(e){t.showingdeleteModal=!1}}},[t._v(t._s(t.get_text("no@prcType@l"))+"\n                        ")])])],1)]),a("b-modal",{staticClass:"modal-info",attrs:{title:t.get_text("information@prcType@l"),size:"lg","ok-variant":"info"},model:{value:t.showingViewModal,callback:function(e){t.showingViewModal=e},expression:"showingViewModal"}},[this.priorityInfo?a("div",{staticClass:"modalcontent"},t._l(this.priorityInfo,(function(e,s){return a("b-row",{key:s},[a("b-col",{attrs:{sm:"6"}},[t._v(t._s(t.get_text(s+"@PRCType@c")))]),a("b-col",{attrs:{sm:"6"}},[t._v(t._s(e))])],1)})),1):t._e()])],1)],1)],1)},i=[],o=(a("28a5"),a("a026")),r=a("2f62"),n=a("5c96"),l=a.n(n),c=a("d3a4");o["default"].use(r["a"]),o["default"].use(c["a"]),o["default"].use(l.a),o["default"].prototype.$notify=n["Notification"];var p=new r["a"].Store({state:{translations:{en:{hello:"Hello World"},ar:{hello:"Hallo Verden"}},loading:!1,priorities:[],userProfile:[],groups:[],isLoading:!1,fullPage:!0,title:"",message:""},mutations:{SET_PRIORITIES:function(t,e){t.priorities=e},REMOVE_PRIORITY:function(t,e){var a=t.priorities;a.splice(a.indexOf(e),1)},UPDATE_PRIORITY:function(t,e){console.log(e)},CREATED_PRIORITY:function(t,e){console.log("add User",e),this.dispatch("loadPriorities"),console.log("after User",t.priorities)},GET_TEXT_TITLE:function(t,e){return t.title=e},GET_TEXT_MSG:function(t,e){return t.message=e}},getters:{priorities:function(t){return t.priorities},getRowCount:function(t){return t.priorities.length},translations:function(t){return t.translations}},actions:{get_text_title:function(t,e){var a=t.commit,s=this.state.translations[c["a"].locale][e];a("GET_TEXT_TITLE",s||"!"+e)},get_text_message:function(t,e){var a=t.commit,s=this.state.translations[c["a"].locale][e];a("GET_TEXT_MSG",s||"!"+e)},loadPriorities:function(t){var e=this,a=t.commit;this.state.isLoading=!0,o["default"].axios({url:"PRCTypes",method:"GET"}).then((function(t){200==t.data.code?(e.state.loading=!0,a("SET_PRIORITIES",t.data.PRCTypes)):(e.dispatch("get_text_title","Error@m"),e.dispatch("get_text_message",t.data.msg+"@m"),o["default"].prototype.$notify.error({title:e.state.title,message:e.state.message,type:"Error",position:"top-right"})),e.state.isLoading=!1}))},removePriority:function(t,e){var a=this,s=t.commit;this.state.isLoading=!0,o["default"].axios.delete("/PRCTypes/".concat(e.IdPRCType)).then((function(t){a.state.isLoading=!1,200==t.data.code?(a.dispatch("get_text_title","Success@m"),a.dispatch("get_text_message",t.data.msg+"@m"),console.log("removed user",t.data.code,"from the server"),o["default"].prototype.$notify({title:a.state.title,message:a.state.message,type:"success",position:"top-right"}),s("REMOVE_PRIORITY",e)):(a.dispatch("get_text_title","Error@m"),a.dispatch("get_text_message",t.data.msg+"@m"),o["default"].prototype.$notify.error({title:a.state.title,message:a.state.message,type:"Error",position:"top-right"}))}))},updatePriority:function(t,e){var a=this,s=t.commit;console.log(e),this.state.isLoading=!0,o["default"].axios.post("PRCTypes/".concat(e.where),e.data).then((function(t){a.state.isLoading=!1,a.dispatch("get_text_title","Success@m"),a.dispatch("get_text_message",t.data.msg+"@m"),console.log("Update user",t.data.code,"from the server"),o["default"].prototype.$notify({title:a.state.title,message:a.state.message,type:"success",position:"top-right"}),s("UPDATE_PRIORITY",e.data)})).catch((function(t){422==t.response.status&&(his.dispatch("get_text_title","Error@m"),a.dispatch("get_text_message",t.response.data.errors.Type[0]+"@m"),o["default"].prototype.$notify.error({title:a.state.title,message:a.state.message,type:"Error",position:"top-right"}))}))},createPriority:function(t,e){var a=this,s=t.commit;this.state.isLoading=!0,o["default"].axios.post("/PRCTypes",e.data).then((function(t){a.state.isLoading=!1,200==t.data.code?(a.dispatch("get_text_title","Success@m"),a.dispatch("get_text_message",t.data.msg+"@m"),console.log("Created user",t.data.code,"from the server"),o["default"].prototype.$notify({title:a.state.title,message:a.state.message,type:"success",position:"top-right"}),s("CREATED_PRIORITY",e.data)):(a.dispatch("get_text_title","Error@m"),a.dispatch("get_text_message",t.data.msg+"@m"),o["default"].prototype.$notify.error({title:a.state.title,message:a.state.message,type:"Error",position:"top-right"}))})).catch((function(t){a.state.isLoading=!1,422==t.response.status&&(a.dispatch("get_text_title","Error@m"),a.dispatch("get_text_message",t.response.data.errors.Type[0]+"@m"),o["default"].prototype.$notify.error({title:a.state.title,message:a.state.message,type:"Error",position:"top-right"}))}))},translation:function(){var t=this;o["default"].axios.get("/gettranslations").then((function(e){if(t.state.isLoading=!1,200==e.data.code){JSON.stringify(e.data.data);t.state.translations=e.data.data}else t.dispatch("get_text_title","Error@m"),t.dispatch("get_text_message",e.data.msg+"@m"),o["default"].prototype.$notify.error({title:t.state.title,message:t.state.message,type:"Error",position:"top-right"})})).catch((function(e){t.state.isLoading=!1,422==e.response.status&&(t.dispatch("get_text_title","Error@m"),t.dispatch("get_text_message",e.response.data.errors.Type[0]+"@m"),o["default"].prototype.$notify.error({title:t.state.title,message:t.state.message,type:"Error",position:"top-right"}))}))}}}),d=(a("0fae"),a("9062")),u=a.n(d);a("e40d");o["default"].use(l.a),o["default"].use(u.a);var g={store:p,props:{hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1}},created:function(){this.$store.dispatch("loadPriorities")},data:function(){return{selected:null,fields:[],button:"",currentPage:1,perPage:5,totalRows:0,priorityData:{TypeCode:null,Type:null},priorityInfo:null,showingeditModal:!1,showingViewModal:!1,showingModal:!1,showingdeleteModal:!1,submitted:!1,updated:!1,pageOptions:[5,10,15],sortBy:null,sortDesc:!1,sortDirection:"asc",filter:null,translation:[]}},beforeMount:function(){localStorage.getItem("translation")&&(this.translation=JSON.parse(localStorage.getItem("translation")))},computed:{priorities:function(){return this.fields=[{key:"IdPRCType",label:"#",sortable:!0,sortDirection:"desc"},{key:"TypeCode",label:this.get_text("type_code@prcType@c"),sortable:!0,sortDirection:"desc"},{key:"Type",label:this.get_text("type@prcType@c")},{key:"Actions",label:this.get_text("actions@l")}],this.$store.getters.priorities},getRowCount:function(){return this.$store.getters.getRowCount},sortOptions:function(){return this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}}))}},watch:{showingeditModal:function(){0==this.showingeditModal&&(this.$store.dispatch("loadPriorities"),this.priorityData={})}},components:{loading:u.a},methods:{setPriorityData:function(){this.priorityData={TypeCode:"",Type:""}},get_text:function(t){var e=this.translation[this.$i18n.locale][t];if(e)return e;var a=t.split("@");if(a.length>2){var s=a[0]+"@l",i=this.translation[this.$i18n.locale][s];return i||"!"+t}return"!"+t},$can:function(t){return-1!==this.$auth.user().allPermissions.indexOf(t)},createPriority:function(){var t=this;this.submitted=!0,this.$validator.validate().then((function(e){e&&(t.resetPasswordBtn=!0,t.showingModal=!1,t.$store.dispatch("createPriority",{data:{TypeCode:t.priorityData.TypeCode,Type:t.priorityData.Type}}),t.priorityData={TypeCode:null,Type:null},t.$validator.reset())}))},selectPriority:function(t){this.priorityData=t},editPriority:function(t){var e=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this.$store.state.isLoading=!0,o["default"].axios.get("/PRCTypes/".concat(t.IdPRCType),t.PRCTypes).then((function(t){401==t.data.code?o["default"].prototype.$notify.error({title:e.get_text("Error@m"),message:e.get_text(t.data.msg+"@m"),type:"Error",position:"top-right"}):"view"==a?(e.showingViewModal=!0,e.priorityInfo=t.data.data):(e.showingeditModal=!0,e.priorityData=t.data.data),e.$store.state.isLoading=!1})).catch((function(t){console.log(t)}))},updatePriority:function(){var t=this;this.updated=!0,this.$validator.validate().then((function(e){e&&(t.showingeditModal=!1,t.$store.dispatch("updatePriority",{where:t.priorityData.IdPRCType,data:{TypeCode:t.priorityData.TypeCode,Type:t.priorityData.Type}}),t.priorityData={TypeCode:null,Type:null},t.$validator.reset())}))},removePriority:function(t){this.$store.dispatch("removePriority",t)},getBadge:function(t){return 1==t?"success":0===t?"warning":"primary"},getName:function(t){return"1"==t?"Active":"0"==t?"Deactive":"primary"},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1}}},y=g,f=(a("4c17"),a("5c16"),a("2877")),m=Object(f["a"])(y,s,i,!1,null,"b71e1922",null);e["default"]=m.exports}}]);
//# sourceMappingURL=chunk-54e89fdc.d47da83f.js.map