<template>
    <div class="app animated fadeIn">
        <b-row>
            <b-col cols="12" xl="12" ref="formContainer">
                <transition name="slide">
                    <div class="control-section" style="height:100%;width:100%; background-color: #ffffff">
                        <b-card>
                            <div slot="header">
                                <b class="h4">{{ this.get_text('organization_chart@subtenant@l') }}</b>
                            </div>
                          <div class="control-section">
                            <div class="col-lg-12 control-section" style="width: 100%; float:left;">
                              <div  class="content-wrapper">
                            <ejs-diagram style='display:block;' id="diagram" :width='width' :height='height'
                                         :getConnectorDefaults='getConnectorDefaults' :getNodeDefaults='getNodeDefaults'
                                         :snapSettings='snapSettings' :layout='layout'
                                         :dataSourceSettings='dataSourceSettings' :tool='tool'></ejs-diagram>
                              </div>
                            </div>
                          </div>
                        </b-card>

                    </div>
                </transition>
            </b-col>
        </b-row>
    </div>
</template>
<style>
</style>
<script>
    import Vue from "vue";
    import {
        DiagramPlugin,
        Diagram,
        NodeModel,
        ConnectorModel,
        Node,
        DataBinding,
        HierarchicalTree,
        DiagramTools
    } from "@syncfusion/ej2-vue-diagrams";
    import {DataManager} from "@syncfusion/ej2-data";
    import {store} from '@/components/store'

    Vue.use(DiagramPlugin);

    export default Vue.extend({
        name: 'User',
        store: store,
        props: {
            caption: {
                type: String,
                default: 'User id'
            }
        },
        data: () => {
            return {
                width: "100%",
                height: 1050,
                //Configures data source
                subtanents: [],
                subtanentstree: [],
                subtanentsname: [],
                subtanentsnamenew: [],
                translation:[],
                //Configrues organizational chart layout
                layout: {
                    type: "OrganizationalChart",
                    horizontalSpacing: 150,
                    verticalSpacing: 100,
                    getLayoutInfo: (node, options) => {
                      console.log("this"+options);
                          // if (node.data['isassistantparent'] != 'null') {
                          //      // options.assistants.push(options.children[0]);
                          //      // options.children.splice(0, 1);
                          //   console.log("this is new node"+node.data['Name']);
                          //  }
                      if (node.data['subtanentid'] === '3') {
                        if (options.hasSubTree) {
                          options.type = 'Center';
                          options.orientation = 'Horizontal';
                        }
                      }if (node.data['subtanentid'] !== '6') {
                        if (!options.hasSubTree) {
                          options.type = 'Right';
                          options.orientation = 'Vertical';
                        }
                      }

                      if (node.data['subtanentid'] === '4') {
                        if (!options.hasSubTree) {
                        options.orientation = 'Horizontal';
                        options.type = 'Center';
                        }

                      }

                    }
                },
                getNodeDefaults: (obj) => {
                    //Initialize shape
                    obj.shape = {type: "Basic", shape: "Rectangle", marginBottom: 0};
                    obj.shape.margin = {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    };
                    obj.draggable = true;
                    obj.collapseIcon.offset = {
                        x: .5,
                        y: .85
                    }
                    obj.collapseIcon.height = 15;
                    obj.collapseIcon.width = 15;
                    obj.collapseIcon.shape = "Plus";
                    obj.height = 20;
                    obj.borderColor = '#000000';
                    obj.borderWidth = 1;
                    if ((obj.data)["subtanentid"] == 1) {
                        console.log(obj);
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 180;
                        obj.height = 100;
                    }
                    if ((obj.data)["subtanentid"] == 2) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 180;
                        obj.height = 100;
                    }
                    if ((obj.data)["subtanentid"] == 3) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 100;
                        obj.height = 150;
                    }

                    if ((obj.data)["subtanentid"] == 4) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.expandIcon = {
                            height: 15,
                            width: 15,
                            shape: "Minus",
                            fill: 'lightgray',
                        }
                        obj.width = 120;
                        obj.height = 150;
                    }
                    if ((obj.data)["subtanentid"] == 5) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 60;
                        obj.height = 140;
                    }
                    if ((obj.data)["subtanentid"] == 6) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 120;
                        obj.height = 130;
                    }
                    if ((obj.data)["subtanentid"] == 7) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 60;
                        obj.height = 140;
                    }
                    if ((obj.data)["subtanentid"] == 8) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 60;
                        obj.height = 140;
                    }
                    if ((obj.data)["subtanentid"] == 9) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 60;
                        obj.height = 140;
                    }
                    if ((obj.data)["subtanentid"] == 10) {
                        obj.style.fill = (obj.data)["colorcode"];
                        obj.backgroundColor = (obj.data)["colorcode"];
                        obj.width = 60;
                        obj.height = 140;

                    }
                },
                //Sets the default values of connector
                getConnectorDefaults: (connector) => {
                    connector.type = "Orthogonal";
                    connector.style.strokeColor = "#000000";
                    connector.targetDecorator.shape = "Arrow";
                    connector.style.length = 500;
                },
                //Disables all interactions except zoom/pan
                tool: DiagramTools.ZoomPan,
                snapSettings: {constraints: 0}
            };
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
            }
        },
        computed: {
            dataSourceSettings() {
                return {
                    id: "Name",
                    parentId: "ReportingPerson",
                    dataManager: new DataManager(this.subtanentsname),
                    //binds the external data with node

                    doBinding: (nodeModel, data, diagram) => {
                        // alert(data["subtanentid"]);
                        if (data["subtanentid"] === 1) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:130px;height:70px;margin-left: -90px;margin-top: -7px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 2) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:130px;height:70px;margin-left:-76px;margin-top: -10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 3) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:70px;margin-left:-26px;height:70px;margin-top:-30px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 4) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:-30px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 5) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:0px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 6) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:-30px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 7) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:0px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 8) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:-40px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 9) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:-40px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }
                        if (data["subtanentid"] === 10) {
                            var aassa = '<div style="word-wrap: break-word;color:black;width:48px;margin-left:-24px;height:70px;margin-top:-40px;font-size: 10px;">' + data["LabelName"] + '</div>';
                        }

                        nodeModel.annotations = [
                            {
                                template: aassa,
                                style: {fontSize: 10},
                                textAlign: 'top',
                                textOverflow: 'Ellipsis',
                                horizontalAlignment: 'top',
                            }
                        ];
                    }
                }
            },
        },

        provide: {
            diagram: [DataBinding, HierarchicalTree]
        },
        created() {
          //this.$store.dispatch('loadTranslations');
            this.tanents();

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
            tanents() {
                Vue.axios.get('tenantdata')
                    .then(response => {
                        console.log(response.data.subTenants)
                        this.subtanentsname = response.data.subTenants;
                    })
            },
        }
    });

</script>
<style>
    #diagram {
        direction: ltr;
        text-align: right;
    }
  #diagramcontent{
    position:relative!important;


  }

  g#diagram_backgroundLayer.e-background-layer{
    position:relative!important;

  }
    rect {

    }
</style>
