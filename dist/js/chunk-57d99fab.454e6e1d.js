(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57d99fab"],{2567:function(t,e,a){"use strict";var s=a("51cf"),i=a.n(s);i.a},"51cf":function(t,e,a){},9662:function(t,e,a){"use strict";var s=a("ef23"),i=a.n(s);i.a},d58d:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app animated fadeIn"},[a("loading",{attrs:{active:this.$store.state.isLoading,"can-cancel":!0,"is-full-page":this.$store.state.fullPage},on:{"update:active":function(e){return t.$set(this.$store.state,"isLoading",e)}}}),a("b-row",[a("b-col",{ref:"formContainer",attrs:{cols:"12",xl:"12"}},[a("transition",{attrs:{name:"slide"}},[a("b-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("b",{staticClass:"h4"},[t._v(" "+t._s(this.get_text("kpi_name@kpi_values@l"))+": "+t._s(this.kpivalueData.kpiname))]),a("br"),a("b",{staticClass:"h4"},[t._v(" "+t._s(this.get_text("organization_unit@kpi_values@l"))+": "+t._s(this.kpivalueData.orgunit))]),a("br"),a("b",{staticClass:"h4"},[t._v(" "+t._s(this.get_text("kpi_id@kpi_values@l"))+": "+t._s(this.kpivalueData.kpiid))]),a("br"),a("b",{staticClass:"h4"},[t._v(" "+t._s(this.get_text("value_type@kpi_def@c"))+": "+t._s("Number"==this.kpivalueData.value_type?this.get_text("number@fg_form@l"):"Percentage"==this.kpivalueData.value_type?this.get_text("percentage@fg_form@l"):"Ratio"==this.kpivalueData.value_type?this.get_text("ratio@fg_form@l"):"Rate"==this.kpivalueData.value_type?this.get_text("rate@fg_form@l"):""))]),a("b-button",{staticClass:"btn float-right",staticStyle:{"margin-left":"1%","margin-right":"1%"},attrs:{variant:"warning",size:"md"},on:{click:t.backToList}},[a("b",[a("i",{staticClass:"glyphicon-list glyphicon font-1xl"}),t._v(" "+t._s(t.get_text("kpi_list@kpi_def@l")))])])],1),t.$auth.ready()&&this.$store.state.loading?t._e():a("div",[a("div",{staticStyle:{"text-align":"center","padding-top":"50px"}},[t._v("\n\n\n                            "+t._s(this.get_text("loading@kpi_values@l"))+"\n                        ")])]),t.$auth.ready()&&this.$store.state.loading?a("div",[a("b-row",[a("b-col",{attrs:{md:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:this.get_text("filter@l")}},[a("b-input-group",[a("b-form-input",{attrs:{placeholder:this.get_text("type_to_search@l")},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("b-input-group-append",[a("b-btn",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v(t._s(this.get_text("clear@l"))+"\n                                            ")])],1)],1)],1)],1),a("b-col",{attrs:{md:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:this.get_text("sort@l")}},[a("b-input-group",[a("b-form-select",{attrs:{options:t.sortOptions},model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}},[a("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v("-- "+t._s(this.get_text("none@l"))+" --\n                                            ")])]),a("b-form-select",{attrs:{slot:"append",disabled:!t.sortBy},slot:"append",model:{value:t.sortDesc,callback:function(e){t.sortDesc=e},expression:"sortDesc"}},[a("option",{domProps:{value:!1}},[t._v(t._s(this.get_text("asc@l")))]),a("option",{domProps:{value:!0}},[t._v(t._s(this.get_text("desc@l"))+"\n                                            ")])])],1)],1)],1),a("b-col",{staticClass:"my-1",attrs:{md:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:t.get_text("mtp@kpi_history@l")}},[a("b-input-group",[a("b-form-select",{attrs:{options:this.$store.state.setmtp},model:{value:this.$store.state.setmtp[0].value,callback:function(e){t.$set(this.$store.state.setmtp[0],"value",e)},expression:"this.$store.state.setmtp[0].value"}})],1)],1)],1),a("b-col",{attrs:{md:"3"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:this.get_text("per_page@l")}},[a("b-form-select",{attrs:{options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1),a("hr",{staticClass:"new1"}),a("b-row",[a("b-col",{staticClass:"my-1",attrs:{md:"4"}},[a("b-form-group",{staticClass:"mb-0",attrs:{horizontal:"",label:t.get_text("base_y_value@kpi_history@l")}},[a("b-input-group",[a("b-form-input",{attrs:{type:"text",name:"base_y_value",id:"base_y_value",placeholder:t.get_text("enter_base_y_value@kpi_history@l")},model:{value:t.base_y_value,callback:function(e){t.base_y_value=e},expression:"base_y_value"}})],1)],1)],1),a("b-col",{staticClass:"my-1",attrs:{md:"3"}},[a("b-button",{staticClass:"float-left",attrs:{variant:"primary",size:"sm",type:"submit"},on:{click:function(e){return t.base_y_valuesave()}}},[t._v(t._s(t.get_text("submit@kpi_history@l"))+"\n                                ")])],1)],1),a("b-table",{attrs:{hover:t.hover,striped:t.striped,bordered:t.bordered,small:t.small,fixed:t.fixed,responsive:"sm",items:t.kpivalueslists,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"actions",fn:function(e){return[a("b-row",{staticClass:"text-center"},[a("div",[t.$can("kpi-edit")?a("b-col",{staticClass:"mb-3 mb-xl-0",attrs:{cols:"2",sm:"4",md:"2",xl:"1"}},[a("b-button",{class:[0===t.$store.state.kpivalueshistorycount?"highlight1":""],attrs:{id:"editbutton",variant:"warning",size:"sm"},on:{click:function(a){return t.editKpivalues(e.item,"edit")}}},[a("b",[a("i",{staticClass:"icon-pencil icons font-1xl",class:[0===t.$store.state.kpivalueshistorycount?"highlight1":""]})])])],1):t._e()],1)])]}}],null,!1,3388311117)}),a("nav",[a("b-pagination",{attrs:{size:"sm","total-rows":t.getRowCount,"per-page":t.perPage,"prev-text":this.get_text("prev@l"),"next-text":this.get_text("next@l"),"hide-goto-end-buttons":""},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),a("b-button",{staticClass:"float-right",attrs:{variant:"primary",size:"lg",type:"submit"},on:{click:function(e){return t.editdatatable()}}},[t._v(t._s(t.get_text("submit@kpi_history@l"))+"\n                        ")])],1):t._e()])],1),a("b-modal",{ref:"vueModel",staticClass:"modal-primary",attrs:{title:t.get_text("edit@kpi_history@l"),size:"lg","hide-footer":""},model:{value:t.showingeditModal,callback:function(e){t.showingeditModal=e},expression:"showingeditModal"}},[a("b-form",{on:{submit:function(e){return e.preventDefault(),t.updatekpivalues(e)}}},[a("b-row",["Number"===this.kpivalueData.value_type?a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"actualvalue"}},[t._v(t._s(t.get_text("actual_value@kpi_history@l"))),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),"Number"===this.kpivalueData.value_type?a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":t.updated&&t.errors.has("actualvalue")},attrs:{type:"text",id:"actualvalue",name:"actualvalue",placeholder:t.get_text("enter_actual_values@kpi_history@l")},model:{value:t.actual_value,callback:function(e){t.actual_value=e},expression:"actual_value"}}):t._e(),t.updated&&t.errors.has("actualvalue")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("actualvalue"))+"\n                                ")]):t._e()],1)],1):t._e(),"Number"!=this.kpivalueData.value_type?a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"actualnumerator"}},[t._v(t._s(this.kpivalueData.numeratorname)),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":t.updated&&t.errors.has("actualnumerator")},attrs:{type:"text",id:"actualnumerator",name:"actualnumerator"},model:{value:t.actual_numerator,callback:function(e){t.actual_numerator=e},expression:"actual_numerator"}}),t.updated&&t.errors.has("actualnumerator")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("actualnumerator"))+"\n                                ")]):t._e()],1)],1):t._e(),"Number"!=this.kpivalueData.value_type?a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"actualdenominator"}},[t._v(t._s(this.kpivalueData.denominatorname)),a("i",{staticClass:"fa fa-asterisk danger fa-xs",staticStyle:{"font-size":"10px",color:"red"}})]),a("b-form-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],class:{"is-invalid":t.updated&&t.errors.has("actualdenominator")},attrs:{type:"text",id:"actualdenominator",name:"actualdenominator"},model:{value:t.actual_denominator,callback:function(e){t.actual_denominator=e},expression:"actual_denominator"}}),t.updated&&t.errors.has("actualdenominator")?a("div",{staticClass:"invalid-feedback"},[t._v(t._s(t.errors.first("actualdenominator"))+"\n                                ")]):t._e()],1)],1):t._e(),a("b-col",{attrs:{sm:"6"}},[a("b-form-group",[a("label",{attrs:{for:"Type"}},[t._v(t._s(t.get_text("notes@kpi_history@l")))]),a("b-form-textarea",{attrs:{id:"notes",rows:"8"},model:{value:t.notes,callback:function(e){t.notes=e},expression:"notes"}})],1)],1)],1),a("b-button",{staticClass:"float-right",attrs:{variant:"primary",size:"lg",type:"submit"}},[t._v(t._s(t.get_text("update@kpi_history@l"))+"\n                    ")])],1)],1),a("b-modal",{ref:"vueModel",staticClass:"modal-primary",attrs:{title:t.get_text("history@kpi_history@l"),size:"lg","cancel-title":t.get_text("cancel@fg_form@l"),"ok-title":t.get_text("continue@fg_form@l")},on:{ok:t.goToNext,cancel:t.goToList},model:{value:t.showmodelhistory,callback:function(e){t.showmodelhistory=e},expression:"showmodelhistory"}},[t._v("\n                "+t._s(t.get_text("kpi history values saved@m"))+"\n            ")])],1)],1)],1)},i=[],o=(a("28a5"),a("a481"),a("f430")),r=a("a026"),l=(a("0fae"),a("5c96")),n=a.n(l),u=a("9062"),c=a.n(u);a("e40d");r["default"].use(n.a),r["default"].use(c.a);var p={store:o["a"],props:{hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1}},created:function(){this.$store.dispatch("loadTranslations")},data:function(){return{base_y_value:"",value:0,datacount:1,kpidatavalues:[],tableslist:[],tablesdata:[],tablecolumnlist:[],tablecolumndata:[],tablesselect:"",selected:null,tablecolumns:null,keytypeselected:null,keyname:"",keynameEn:"",keynameAr:"",keynameshortEn:"",keynameshortAr:"",keyid:"",items:"",fields:"",button:"",currentPage:1,perPage:12,totalRows:0,actual_value:"",notes:"",actual_denominator:"",actual_numerator:"",kpivalueData:{actual_value:null,notes:null,id:null,kpiname:null,orgunit:null,kpiid:null,targetid:null},key_typefilter:null,priorityInfo:null,showingeditModal:!1,submitted:!1,updated:!1,pageOptions:[12,24,36],sortBy:null,sortDesc:!1,sortDirection:"asc",filter:null,translationdatae:"",translationData:"",translateData:{key_type:""},sortByKpiMtp:"",isValidationAllowed:!1,showmodelhistory:!1,translation:[],sortOptions:[]}},beforeMount:function(){localStorage.getItem("translation")&&(this.translation=JSON.parse(localStorage.getItem("translation"))),this.$store.dispatch("loadmtp"),this.kpivalueshistorysave(this.$route.params.id)},mounted:function(){this.$store.dispatch("loadkpivalueshistory",this.$route.params.id),this.kpivaluelistdata=this.$store.state.kpivalueshistory},computed:{validated:function(){return this.isValidationAllowed&&!this.base_y_value},kpivalueslists:function(){for(var t in console.log(this.$store.getters.kpivalueshistory),this.kpivaluelistdata=this.$store.getters.kpivalueshistory,this.kpivaluelistdata)this.kpidatavalues.push(this.kpivaluelistdata[t]);this.kpivalueData.kpiname=this.kpivaluelistdata[0].kpiname,this.kpivalueData.orgunit=this.kpivaluelistdata[0].subtenant_name,this.kpivalueData.kpiid=this.kpivaluelistdata[0].kpiid,this.kpivalueData.value_type=this.kpivaluelistdata[0].value_type,this.kpivalueData.denominatorname=this.kpivaluelistdata[0].denominatorname,this.kpivalueData.numeratorname=this.kpivaluelistdata[0].numeratorname,this.kpivalueData.targetid=this.kpivaluelistdata[0].targetid,null!=this.kpivaluelistdata[0].base_y_value&&(this.base_y_value=this.kpivaluelistdata[0].base_y_value),this.items=this.kpidatavalues;var e=[];e=this.items,this.totalRows=e.length;var a=[];for(var s in this.items[0])a.push(s);a=a.filter((function(t){return"id"!==t})),a=a.filter((function(t){return"kpi_target_id"!==t})),a=a.filter((function(t){return"targetid"!==t})),a=a.filter((function(t){return"target_year"!==t})),a=a.filter((function(t){return"target_month"!==t})),a=a.filter((function(t){return"kpiname"!==t})),a=a.filter((function(t){return"value_type"!==t})),a=a.filter((function(t){return"subtenant_name"!==t})),a=a.filter((function(t){return"kpiid"!==t})),a=a.filter((function(t){return"numeratorname"!==t})),a=a.filter((function(t){return"denominatorname"!==t})),a=a.filter((function(t){return"base_y_value"!==t}));for(var i=[],o=a.length,r=0;r<o;r++){var l=!0;"actual_denominator"!=a[r]&&"actual_numerator"!=a[r]&&"notes"!=a[r]||(l=!1),i.push({key:a[r],label:this.get_text(a[r]+"@kpi_values@c"),sortable:l,resizeable:!0})}return i.push({key:"actions",label:this.get_text("actions@kpi_values@c"),sortable:!1,resizeable:!0}),i[2].label=i[2].label.replace(i[2].label,this.kpivalueData.numeratorname),i[3].label=i[3].label.replace(i[3].label,this.kpivalueData.denominatorname),"Number"==this.kpivalueData.value_type&&i.splice(2,2),this.fields=i,this.sortOptions=this.fields.filter((function(t){return t.sortable})).map((function(t){return{text:t.label,value:t.key}})),this.$store.getters.kpivalueshistory},getRowCount:function(){return this.$store.getters.kpivalueshistory.length},sortOptions:function(){}},watch:{showingeditModal:function(){0==this.showingeditModal&&(this.$store.dispatch("loadTranslations"),this.priorityData={})}},components:{loading:c.a},methods:{backToList:function(){sessionStorage.removeItem("kpi_id"),window.location.replace("/kpilist")},base_y_valuesave:function(){var t=this;if(this.isValidationAllowed=!0,""==this.base_y_value)return!1;r["default"].axios.post("/kpibaseyvaluesave",{base_y_value:this.base_y_value,targetid:this.kpivalueData.targetid}).then((function(e){400==e.data.code?(t.$store.dispatch("get_text_title","error@m"),t.$store.dispatch("get_text_message",e.data.msg+"@m"),r["default"].prototype.$notify.error({title:t.$store.state.title,message:t.$store.state.message,type:"Error",position:"top-right"})):(t.$store.dispatch("get_text_title","success@m"),t.$store.dispatch("get_text_message",e.data.msg+"@m"),r["default"].prototype.$notify.success({title:t.$store.state.title,message:t.$store.state.message,type:"Success",position:"top-right"}))})).catch((function(t){console.log(t)}))},goToList:function(){sessionStorage.removeItem("kpi_id"),window.location.replace("/kpilist")},goToNext:function(){window.location.replace("/newFormGenerator/3/"+this.$route.params.id)},kpivalueshistorysave:function(t){var e=this;this.$store.state.isLoading=!0,r["default"].axios.post("/kpivalueshistorysave",{data:t}).then((function(t){400==t.data.code?(e.$store.dispatch("get_text_title","error@m"),e.$store.dispatch("get_text_message",t.data.msg+"@m"),r["default"].prototype.$notify.error({title:e.$store.state.title,message:e.$store.state.message,type:"Error",position:"top-right"})):202==t.data.code?(e.$store.state.isLoading=!1,e.$store.dispatch("loadkpivalueshistory",e.$route.params.id)):(e.$store.dispatch("get_text_title","success@m"),e.$store.dispatch("get_text_message",t.data.msg+"@m"),r["default"].prototype.$notify.success({title:e.$store.state.title,message:e.$store.state.message,type:"Success",position:"top-right"}),e.$store.state.isLoading=!1,e.$store.dispatch("loadkpivalueshistory",e.$route.params.id))})).catch((function(t){console.log(t)}))},get_text:function(t){var e=this.translation[this.$i18n.locale][t];if(e)return e;var a=t.split("@");if(a.length>2){var s=a[0]+"@l",i=this.translation[this.$i18n.locale][s];return i||"!"+t}return"!"+t},editdatatable:function(){var t=this;r["default"].axios.post("/kpivaluesUpdate",{kpivalues:this.$store.getters.kpivalueshistory}).then((function(e){400==e.data.code?(t.$store.dispatch("get_text_title","error@m"),t.$store.dispatch("get_text_message",e.data.msg+"@m"),r["default"].prototype.$notify.error({title:t.$store.state.title,message:t.$store.state.message,type:"Error",position:"top-right"})):(t.showmodelhistory=!0,t.dangerModal=!1,t.rejectreasontext="",t.$store.dispatch("get_text_title","success@m"),t.$store.dispatch("get_text_message",e.data.msg+"@m"),r["default"].prototype.$notify.success({title:t.$store.state.title,message:t.$store.state.message,type:"Success",position:"top-right"}),t.$store.dispatch("loadkpivalueshistorycheck",t.$route.params.id)),t.$store.state.isLoading=!1})).catch((function(t){console.log(t)}))},updatekpivalues:function(){var t=this;this.updated=!0,this.$validator.validate().then((function(e){if(e){for(var a in t.showingeditModal=!1,console.log(t.$store.getters.kpivalueshistory),t.$store.getters.kpivalueshistory)"Number"!=t.kpivalueData.value_type&&(t.actual_value=t.actual_numerator/t.actual_denominator),"Percentage"==t.kpivalueData.value_type&&(t.actual_value=t.actual_numerator/t.actual_denominator*100,t.actual_value=t.actual_value.toFixed(2),t.actual_value=t.actual_value+"%"),"Rate"!=t.kpivalueData.value_type&&"Ratio"!=t.kpivalueData.value_type||(t.actual_value=t.actual_value.toFixed(8)),t.$store.getters.kpivalueshistory[a].id==t.kpivalueData[0].id&&(t.$store.getters.kpivalueshistory[a].actual_value=t.actual_value,t.$store.getters.kpivalueshistory[a].actual_numerator=t.actual_numerator,t.$store.getters.kpivalueshistory[a].actual_denominator=t.actual_denominator,t.$store.getters.kpivalueshistory[a].notes=t.notes);t.actual_value="",t.notes="",t.actual_numerator="",t.actual_denominator="",t.$validator.reset()}}))},$can:function(t){return-1!==this.$auth.user().allPermissions.indexOf(t)},editKpivalues:function(t){var e=this;arguments.length>1&&void 0!==arguments[1]&&arguments[1];r["default"].axios.get("/kpivaluesbyId/".concat(t.id)).then((function(t){401==t.data.code?(e.$store.dispatch("get_text_title","error@m"),e.$store.dispatch("get_text_message",t.data.msg+"@m"),r["default"].prototype.$notify.error({title:e.$store.state.title,message:e.$store.state.message,type:"Error",position:"top-right"})):(e.actual_value=t.data.data[0].actual_value,e.notes=t.data.data[0].notes,e.base_y_value=t.data.data[0].base_y_value,e.showingeditModal=!0,e.kpivalueData=t.data.data,console.log(e.kpivalueData)),e.$store.state.isLoading=!1})).catch((function(t){console.log(t)}))},getBadge:function(t){return 1==t?"success":0===t?"warning":"primary"},getName:function(t){return"1"==t?"Active":"0"==t?"Deactive":"primary"},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1}}},d=p,v=(a("2567"),a("9662"),a("2877")),h=Object(v["a"])(d,s,i,!1,null,"c5ddf8c8",null);e["default"]=h.exports},ef23:function(t,e,a){}}]);
//# sourceMappingURL=chunk-57d99fab.454e6e1d.js.map