(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-331c1a00"],{"2b56":function(t,a,e){"use strict";var s=e("31f8"),i=e.n(s);i.a},"31f8":function(t,a,e){},"469f":function(t,a,e){e("6c1c"),e("1654"),t.exports=e("7d7b")},"54a1":function(t,a,e){e("6c1c"),e("1654"),t.exports=e("95d5")},"5d73":function(t,a,e){t.exports=e("469f")},7277:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"animated fadeIn"},[e("div",{staticClass:"card",attrs:{id:"dropdown1"}},[e("div",{staticClass:"card-header"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-11"}),e("div",{staticClass:"col-md-1",staticStyle:{"text-align":"right"}},[e("b-link",{directives:[{name:"b-toggle",rawName:"v-b-toggle.my-collapse",modifiers:{"my-collapse":!0}}],staticClass:"card-header-action btn-minimize"},[e("i",{staticClass:"icon-arrow-up"})]),e("b-link",{staticClass:"card-header-action btn-close",attrs:{id:"myPrntbtn"},on:{click:t.loaded}},[e("i",{staticClass:"icon-printer"})])],1)])]),e("b-collapse",{attrs:{id:"my-collapse"}},[e("div",{staticClass:"card-body"},[e("b-row",[e("b-col",[e("b-form-group",{attrs:{horizontal:"",label:t.get_text("sector@l")}},[e("b-form-select",{attrs:{options:this.$store.state.setTenant},on:{change:function(a){return t.getSector()}},model:{value:t.sector,callback:function(a){t.sector=a},expression:"sector"}},[t._v("\n                                "+t._s(t.sector)+"\n                                "),e("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v("-- اختر --")])])],1)],1),e("b-col",[e("b-form-group",{attrs:{horizontal:"",label:t.get_text("org_unit@l")}},[e("b-form-select",{attrs:{options:this.$store.state.setSubTenant},on:{change:function(a){return t.getOrg_unit()}},model:{value:t.org_unit,callback:function(a){t.org_unit=a},expression:"org_unit"}},[t._v("\n                                "+t._s(t.org_unit)+"\n                                "),e("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v("-- اختر --")])])],1)],1),e("b-col",[e("b-form-group",{attrs:{horizontal:"",label:t.get_text("mtp@l")}},[e("b-form-select",{attrs:{options:t.mtp_options},on:{change:function(a){return t.getSelectedMTP()}},model:{value:t.mtp_date,callback:function(a){t.mtp_date=a},expression:"mtp_date"}},[e("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v("-- اختر --")])])],1)],1)],1)],1)])],1),e("b-row",[e("b-col",{attrs:{sm:"4",lg:"4"}},[e("div",{staticClass:"brand-card"},[e("div",{staticClass:"brand-card-header bg-twitter"},[t._v("\n                       "),e("span",{staticClass:"text-white"},[t._v(t._s(t.get_text("active_inactive@statistics@l"))+" ")]),t._v("  \n                    "),e("i",{staticClass:"fas fa-star-half-alt"}),e("div",{staticClass:"chart-wrapper"},[e("social-box-chart-example",{attrs:{chartId:"box-chart-01",data:[50,50,50,50,50,50],height:"90"}})],1)]),e("div",{staticClass:"brand-card-body"},[e("div",[e("div",{staticClass:"text-value"},[t._v(t._s(this.$store.state.dashboard_value.length>0?this.$store.state.dashboard_value[0]["active_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted small"},[t._v(t._s(t.get_text("active@statistics@l")))])]),e("div",[e("div",{staticClass:"text-value"},[t._v("\n                            "+t._s(this.$store.state.dashboard_value[0]["active_count"]?this.$store.state.dashboard_value[0]["kpi_count"]-this.$store.state.dashboard_value[0]["active_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted small"},[t._v(t._s(t.get_text("inactive@statistics@l")))])])])])]),e("b-col",{attrs:{sm:"4",lg:"4"}},[e("div",{staticClass:"brand-card"},[e("div",{staticClass:"brand-card-header bg-twitter"},[t._v("\n                       "),e("span",{staticClass:"text-white"},[t._v(t._s(t.get_text("uptodate_notuptodate@statistics@l"))+" ")]),t._v("\n                      \n                    "),e("i",{staticClass:"fas fa-route"}),e("div",{staticClass:"chart-wrapper"},[e("social-box-chart-example",{attrs:{chartId:"box-chart-02",data:[50,50,50,50,50,50],height:"90"}})],1)]),e("div",{staticClass:"brand-card-body"},[e("div",[e("div",{staticClass:"text-value"},[t._v(t._s(this.$store.state.dashboard_value.length>0?this.$store.state.dashboard_value[0]["up_to_date_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted small"},[t._v(t._s(t.get_text("up_to_date@statistics@l")))])]),e("div",[e("div",{staticClass:"text-value"},[t._v("\n                            "+t._s(this.$store.state.dashboard_value[0]["up_to_date_count"]?this.$store.state.dashboard_value[0]["kpi_count"]-this.$store.state.dashboard_value[0]["up_to_date_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted small"},[t._v(t._s(t.get_text("not_up_to_date@statistics@l")))])])])])]),e("b-col",{attrs:{sm:"4",lg:"4"}},[e("div",{staticClass:"brand-card"},[e("div",{staticClass:"brand-card-header bg-twitter"},[t._v("\n                      "),e("span",{staticClass:"text-white"},[t._v(t._s(t.get_text("efficiency_strategy@statistics@l"))+" ")]),t._v("  \n                    "),e("i",{staticClass:"fas fa-traffic-light"}),e("div",{staticClass:"chart-wrapper"},[e("social-box-chart-example",{attrs:{chartId:"box-chart-03",data:[50,50,50,50,50,50],height:"90"}})],1)]),e("div",{staticClass:"brand-card-body"},[e("div",[e("div",{staticClass:"text-value"},[t._v(t._s(this.$store.state.dashboard_value.length>0?this.$store.state.dashboard_value[0]["process_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted small"},[t._v(t._s(t.get_text("efficiency@statistics@l")))])]),e("div",[e("div",{staticClass:"text-value"},[t._v("\n                            "+t._s(this.$store.state.dashboard_value[0]["process_count"]?this.$store.state.dashboard_value[0]["strategy_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted small"},[t._v(t._s(t.get_text("strategy@statistics@l")))])])])])])],1),e("div",{staticClass:"row"},[e("div",{staticClass:"col-4 col-lg-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body p-0 d-flex align-items-center"},[e("i",{staticClass:"fa fa-thermometer-full bg-danger p-4 font-2xl mr-3"}),e("div",[e("div",{staticClass:"text-value-sm text-danger"},[t._v(t._s(this.$store.state.dashboard_value.length>0?this.$store.state.dashboard_value[0]["imp_hi_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted font-weight-bold small"},[t._v(t._s(t.get_text("high@statistics@l")))])])])])]),e("div",{staticClass:"col-4 col-lg-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body p-0 d-flex align-items-center"},[e("i",{staticClass:"fa fa-thermometer-half bg-danger p-4 font-2xl mr-3"}),e("div",[e("div",{staticClass:"text-value-sm text-danger"},[t._v(t._s(this.$store.state.dashboard_value.length>0?this.$store.state.dashboard_value[0]["imp_mid_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted font-weight-bold small"},[t._v(t._s(t.get_text("mid@statistics@l")))])])])])]),e("div",{staticClass:"col-4 col-lg-4"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body p-0 d-flex align-items-center"},[e("i",{staticClass:"fa fa-thermometer-quarter bg-danger p-4 font-2xl mr-3"}),e("div",[e("div",{staticClass:"text-value-sm text-danger"},[t._v(t._s(this.$store.state.dashboard_value.length>0?this.$store.state.dashboard_value[0]["imp_low_count"]:"")+"\n                        ")]),e("div",{staticClass:"text-muted font-weight-bold small"},[t._v(t._s(t.get_text("low@statistics@l")))])])])])])]),e("b-row",[e("b-col",{attrs:{md:"12"}},[e("b-card",{attrs:{header:t.get_text("org_unit@statistics@l")}},[e("b-table",{staticClass:"mb-0 table-outline",attrs:{responsive:"sm",hover:"",items:t.dashboard_table_val,fields:t.tableFields,"head-variant":"light"},scopedSlots:t._u([{key:"sub_name",fn:function(a){return e("div",{staticStyle:{"text-align":"center"}},[e("strong",[t._v(t._s(a.value))])])}},{key:"kpi_count",fn:function(a){return e("div",{staticStyle:{"text-align":"center"}},[e("strong",[t._v("\n                            "+t._s(a.value)+"\n\n                        ")])])}},{key:"process_count",fn:function(a){return e("div",{staticStyle:{"text-align":"center"}},[e("div",{staticClass:"clearfix"},[e("strong",[t._v(t._s(a.value))])])])}},{key:"strategy_count",fn:function(a){return e("div",{staticStyle:{"text-align":"center"}},[e("div",{staticClass:"clearfix"},[e("strong",[t._v(t._s(a.value))])])])}},{key:"up_to_date_count",fn:function(a){return e("div",{staticStyle:{"text-align":"center"}},[e("div",{staticClass:"clearfix"},[e("div",[e("span",[e("i",{staticClass:"fa fa-check-square",attrs:{"aria-hidden":"true"}}),e("strong",[t._v("  "+t._s(a.value))])]),t._v("\n                                 "),e("span",[e("i",{staticClass:"fa fa-window-close",attrs:{"aria-hidden":"true"}}),e("strong",[t._v("  "+t._s(t.dashboard_table_val[0].kpi_count-a.value)+"   ")])])])])])}},{key:"active_count",fn:function(a){return e("div",{staticStyle:{"text-align":"center"}},[e("div",{staticClass:"clearfix"},[e("span",[e("i",{staticClass:"fa fa-circle",staticStyle:{color:"green"},attrs:{"aria-hidden":"true"}}),e("strong",[t._v("  "+t._s(a.value))])]),t._v("\n                             "),e("span",[e("i",{staticClass:"fa fa-circle",staticStyle:{color:"red"},attrs:{"aria-hidden":"true"}}),e("strong",[t._v(" "+t._s(t.dashboard_table_val[0].kpi_count-a.value)+"   ")])])])])}}])})],1)],1)],1)],1)},i=[],o=(e("28a5"),e("f1fb"),e("768b")),r=(e("7f7f"),e("a026")),n=e("2f62"),l=e("5c96"),c=e.n(l),d=e("d3a4");r["default"].use(n["a"]),r["default"].use(c.a),r["default"].prototype.$notify=l["Notification"];var u=new n["a"].Store({state:{translations:{en:{hello:"Hello World"},ar:{hello:"Hallo Verden"}},setTenant:[],setSubTenant:[],loading:!1,dashboard_value:[],dashboard_table_value:[],dashboard_mtp:[],lestatus:99,isLoading:!1,fullPage:!0,periodicity:1,mtp_date:4,kpi_id:null,title:"",message:"",decimalVal:"",performance:"",arrayVals:[],arraylabel:[]},mutations:{SET_DASHBOARD_VALUE:function(t,a){t.dashboard_value=a},SET_DASHBOARD_TABLE:function(t,a){t.dashboard_table_value=a},SET_MTP:function(t,a){t.dashboard_mtp=a.map((function(t){return{value:t.id,text:t.name}}))}},getters:{dashboard_value:function(t){return t.dashboard_value},dashboard_mtp:function(t){return t.dashboard_mtp},dashboard_table_value:function(t){return t.dashboard_table_value},kpi_rounding:function(t){return t.decimalVal},kpi_preformance:function(t){return t.performance},kpi_arrayvals:function(t){return t.arrayVals},kpi_arraylabel:function(t){return t.arraylabel}},actions:{get_text_title:function(t,a){var e=t.commit,s=this.state.translations[d["a"].locale][a];e("GET_TEXT_TITLE",s||"!"+a)},get_text_message:function(t,a){var e=t.commit,s=this.state.translations[d["a"].locale][a];e("GET_TEXT_MSG",s||"!"+a)},loadDashboardValues:function(t,a){var e=t.commit,s=Object(o["a"])(a,2),i=s[0],n=s[1];void 0==i&&(i=4),void 0==n&&(n=2),r["default"].axios.get("/dashboardVal/".concat(i,"/").concat(n)).then((function(t){200==t.data.code?e("SET_DASHBOARD_VALUE",t.data.data):r["default"].prototype.$notify.error({title:"error",message:t.data.msg,type:"Error",position:"top-right",duration:1e4})})).catch((function(t){console.log(t.response.data.message),403==t.response.status&&r["default"].prototype.$notify.error({title:"خطأ",message:t.response.data.message,type:"Error",position:"top-right",duration:1e4})}))},loadSubTenants:function(t,a){var e=this;t.commit;r["default"].axios.get("/loadSubTenants/".concat(a)).then((function(t){200==t.data.code&&(e.state.setSubTenant=t.data.tenants.map((function(t){return{text:t.name,value:t.id}})))}))},loadTenants:function(t){var a=this;t.commit;r["default"].axios({url:"loadTenants",method:"GET"}).then((function(t){200==t.data.code&&(a.state.setTenant=t.data.tenants.map((function(t){return{text:t.name,value:t.id}})))}))},loadMTP:function(t){var a=this,e=t.commit;r["default"].axios({url:"mtpDashboard",method:"GET"}).then((function(t){200==t.data.code&&(a.state.loading=!0,e("SET_MTP",t.data.data))})).catch((function(t){a.state.isLoading=!1,403==t.response.status&&r["default"].prototype.$notify.error({title:"خطأ",message:t.response.data.message,type:"Error",position:"top-right",duration:1e4})}))},loadDashboardTable:function(t,a){var e=t.commit,s=Object(o["a"])(a,2),i=s[0],n=s[1];void 0==i&&(i=4),void 0==n&&(n=2),r["default"].axios.get("/dashboardTableVal/".concat(i,"/").concat(n)).then((function(t){200==t.data.code?e("SET_DASHBOARD_TABLE",t.data.data):r["default"].prototype.$notify.error({title:"error",message:t.data.msg,type:"Error",position:"top-right",duration:1e4})})).catch((function(t){console.log(t.response.data.message),403==t.response.status&&r["default"].prototype.$notify.error({title:"خطأ",message:t.response.data.message,type:"Error",position:"top-right",duration:1e4})}))},translation:function(){var t=this;r["default"].axios.get("/gettranslations").then((function(a){if(t.state.isLoading=!1,200==a.data.code){JSON.stringify(a.data.data);t.state.translations=a.data.data}else t.dispatch("get_text_title","Error@m"),t.dispatch("get_text_message",a.data.msg+"@m"),r["default"].prototype.$notify.error({title:t.state.title,message:t.state.message,type:"Error",position:"top-right"})})).catch((function(a){t.state.isLoading=!1,422==a.response.status&&(t.dispatch("get_text_title","Error@m"),t.dispatch("get_text_message",a.response.data.errors.Type[0]+"@m"),r["default"].prototype.$notify.error({title:t.state.title,message:t.state.message,type:"Error",position:"top-right"}))}))}}}),h=e("e6ad"),_={store:u,name:"dashboard",components:{SocialBoxChartExample:h["a"]},data:function(){return{translation:[],sector:2,org_unit:6,mtp_date:4,parent:2,mtp:"",selected:"Month",tableFields:[]}},beforeMount:function(){localStorage.getItem("translation")&&(this.translation=JSON.parse(localStorage.getItem("translation")))},beforeCreate:function(){this.$store.dispatch("loadDashboardValues",[this.mtp_date,this.sector]),this.$store.dispatch("loadTenants"),this.$store.dispatch("loadMTP"),this.$store.dispatch("loadDashboardTable",[this.mtp_date,this.sector])},computed:{dashboard_table_val:function(){this.tableFields=[{key:"sub_name",label:this.get_text("org_name@statistics@c")},{key:"kpi_count",label:this.get_text("kpi_count@statistics@c"),sortable:!0,sortDirection:"asc"},{key:"process_count",label:this.get_text("by_efficiency@statistics@c")},{key:"strategy_count",label:this.get_text("by_strategy@statistics@c")},{key:"up_to_date_count",label:this.get_text("by_uptodate@statistics@c")},{key:"active_count",label:this.get_text("by_active@statistics@c")}];var t=this.$store.state.dashboard_table_value;return this.totalRows=t.length,t},mtp_options:function(){var t=this.$store.state.dashboard_mtp.map((function(t){return{value:t.value,text:t.text}}));return t}},methods:{getSector:function(){null==this.sector&&(this.org_unit="",this.$store.state.setSubTenant={}),this.org_unit="",this.parent=this.sector,this.$store.dispatch("loadDashboardValues",[this.mtp_date,this.sector]),this.$store.dispatch("loadSubTenants",this.sector),this.$store.dispatch("loadDashboardTable",[this.mtp_date,this.sector])},getOrg_unit:function(){null==this.org_unit?this.parent=this.sector:this.parent=this.org_unit,this.$store.dispatch("loadDashboardValues",[this.mtp_date,this.parent]),this.$store.dispatch("loadDashboardTable",[this.mtp_date,this.parent])},getSelectedMTP:function(){this.$store.dispatch("loadDashboardValues",[this.mtp_date,this.parent]),this.$store.dispatch("loadDashboardTable",[this.mtp_date,this.parent])},loaded:function(t){var a=document.getElementById("myPrntbtn");a.style.visibility="hidden";var e=document.getElementById("dropdown1");e.style.visibility="hidden",window.print(),a.style.visibility="visible",e.style.visibility="visible"},get_text:function(t){if("undefined"!=typeof this.translation[this.$i18n.locale][t]&&null!=this.translation[this.$i18n.locale][t])return this.translation[this.$i18n.locale][t];var a=t.split("@");if(a.length>2){var e=a[0]+"@l",s=this.translation[this.$i18n.locale][e];return s||"!"+t}return"!"+t},flag:function(t){return"flag-icon flag-icon-"+t}}},v=_,p=(e("2b56"),e("2877")),f=Object(p["a"])(v,s,i,!1,null,null,null);a["default"]=f.exports},"768b":function(t,a,e){"use strict";var s=e("a745"),i=e.n(s);function o(t){if(i()(t))return t}var r=e("5d73"),n=e.n(r),l=e("c8bb"),c=e.n(l);function d(t,a){if(c()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t)){var e=[],s=!0,i=!1,o=void 0;try{for(var r,l=n()(t);!(s=(r=l.next()).done);s=!0)if(e.push(r.value),a&&e.length===a)break}catch(d){i=!0,o=d}finally{try{s||null==l["return"]||l["return"]()}finally{if(i)throw o}}return e}}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function h(t,a){return o(t)||d(t,a)||u()}e.d(a,"a",(function(){return h}))},"7d7b":function(t,a,e){var s=e("e4ae"),i=e("7cd6");t.exports=e("584a").getIterator=function(t){var a=i(t);if("function"!=typeof a)throw TypeError(t+" is not iterable!");return s(a.call(t))}},"7f7f":function(t,a,e){var s=e("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,r="name";r in i||e("9e1e")&&s(i,r,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},"95d5":function(t,a,e){var s=e("40c3"),i=e("5168")("iterator"),o=e("481b");t.exports=e("584a").isIterable=function(t){var a=Object(t);return void 0!==a[i]||"@@iterator"in a||o.hasOwnProperty(s(a))}},a745:function(t,a,e){t.exports=e("f410")},c8bb:function(t,a,e){t.exports=e("54a1")},e6ad:function(t,a,e){"use strict";var s,i,o=e("1fca"),r={extends:o["c"],props:{data:{type:Array,default:function(){return[0,22,34,46,58,70,46]}},height:{type:String,default:"100"}},mounted:function(){this.renderChart({datasets:[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff",borderWidth:2,data:this.data}]},{responsive:!0,maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:0,hoverRadius:0,hoverBorderWidth:0}}})}},n=r,l=e("2877"),c=Object(l["a"])(n,s,i,!1,null,null,null);a["a"]=c.exports}}]);
//# sourceMappingURL=chunk-331c1a00.47625d23.js.map