<template v-if="formInputTypes.includes(input.type)">
    <div class="col-lg-12">
        <div v-if="(input.type == 'String' && !Label.includes('date')) || (input.type == 'Long' && !Label.includes('date'))" class="form-group">
            <label for="text">{{Label}}:</label>
            <input :type="input.type" class="form-control"  :name="Label" v-model="input.value" :disabled="isDisabled" :class="{ demo : isDisabled}" :placeholder="Label">
        </div>
        <div v-if="Label.includes('date')">
            <b-row>
                <b-col sm="12">
            <label for="text">{{Label}}:</label>
                </b-col>
            </b-row>
            <el-date-picker style="width:100%" :name="Label" v-model="input.value" type="date" :placeholder="Label" :disabled="isDisabled" format="yyyy/MM/dd">
            </el-date-picker>
        </div>
        <!--<div v-if="input.type == 'Long'" class="form-group">
            <label for=" ">{{Label}}</label>
            <textarea class="form-control"  rows="5" id="" :disabled="isDisabled"  :class="{ demo : isDisabled}"></textarea>
        </div>-->

        <div v-if="input.type == 'Boolean'" class="checkbox">
            <label><input type="checkbox"  v-model="input.value" :disabled="isDisabled"  :class="{ demo : isDisabled}">{{Label}}</label>
        </div>

        <div v-if="input.type == 'Enum'" class="form-group">
        <label for="sel1">{{Label}}:</label>
        <select  v-model="input.value" class="form-control" id="sel1" :disabled="isDisabled"  :class="{ demo : isDisabled}">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
        </select>
        </div>

    </div>
</template>

<script>
export default {
  name:'camunda-input',
  props:{
      input:{},
      Label:'',
      isDisabled: ''
  },
  data(){
	  return {
		  formInputTypes:[
			  "long",
			  "string",
			  "boolean",
			  "date",
			  "num"
		  ]
	  }
  },
  methods:{

  }

}
</script>
