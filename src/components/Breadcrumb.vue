<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list"><span class="active" v-if="isLast(index)">{{ showName(item) }}</span>
      <router-link :to="item.path" v-else>{{ showName(item) }}</router-link>
    </li>
  </ol>
</template>

<script>
    import {store} from '@/components/store'
    export default {
        store:store,
        props: {
            list: {
                type: Array,
                required: true,
                default: () => []
            }
        },
        data: function () {
            return {
                translation: []
            }
        },
        beforeMount() {
            if (localStorage.getItem('translation')) {
                this.translation = JSON.parse(localStorage.getItem('translation'));
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
            isLast(index) {
                return index === this.list.length - 1
            },
            showName(item) {
                if (item.meta && item.meta.label) {
                    item = item.meta && item.meta.label
                }
                if (item.name) {
                    item = item.name
                }
                return this.get_text(item+'@l')
            }
        }
    }
</script>
