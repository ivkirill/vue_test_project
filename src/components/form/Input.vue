<template>
  <input v-if="data.type === 'hidden'" :name="data.name" :type="data.type" :value="data.value">
  <div v-else class="form-group">
	<div class="title">

	  <template v-if="data.type === 'submit'"></template>
	  <template v-else>{{ data.title }}</template>	

	</div>
	<div :class="[validClass, styleHolderClass]">
	  <template v-if="data.type === 'checkbox' || data.type === 'radio'">
		  <item-checkbox v-for="item in data.items" :data="item" :name="data.name" :type="data.type"></item-checkbox>
	  </template>
	  <template v-else-if="data.type === 'select'">
		  <item-select :data="data"></item-select>
	  </template>
	  <template v-else-if="data.type === 'submit'">
		  <button :name="data.name" :type="data.type" :value="data.value" class="input-submit btn btn-primary">{{ data.value }}</button>
	  </template>
	  <template v-else-if="data.type === 'file'">
		  <input :name="data.name" type="file" @change="validate">
	  </template>
	  <template v-else-if="data.type === 'textarea'">
		  <textarea :name="data.name" v-model="data.value" @input="validate"></textarea>
	  </template>
	  <template v-else-if="data.type === 'date'">
		  <input :name="data.name" type="date" v-model="data.value" @input="validate">
	  </template>
	  <template v-else-if="data.type === 'email'">
		  <input :name="data.name" type="email" v-model="data.value" @input="validate">
	  </template>
	  <template v-else-if="data.type === 'number'">
		  <input :name="data.name" type="number" :min="data.min" :max="data.max" v-model="data.value" @input="validate">
	  </template>
	  <template v-else>
		  <input :name="data.name" type="text" v-model="data.value" @input="validate">
	  </template>
	</div>
  </div>
</template>

<script>

export default {
  name: 'input-form',
  components: {
	  'input-select': function (resolve) {
        require(['@/components/form/select.vue'], resolve);
    },
	  'input-checkbox': function (resolve) {
        require(['@/components/form/checkbox.vue'], resolve);
    }
	},
	props: ['data'],
	data: function() {
	  return {
      // валидность
		  valid: '',

      // класс обертки поля
		  styleHolderClass : 'input-holder',

      // дефолтный regexp, проверка на пусто
		  reDefault: /.*/
	  }
	},
	computed: {
    // вычисляемый тип поля
    type: function() {
      return this.data.type || 'text';
    },

    // класс валидации
	  validClass: function() {
      var cls = '';
      if( this.valid === true ) cls = 'has-success'
      else if( this.valid === false ) cls = 'has-error'
      return cls;
	  }
	},
	methods : {

    // валидация поля
	  validate: function(el) {
      this.valid = false;

      if( this.data.required === true ) {
        // если не задан regExp, то проверим нет ли спецопределений для полей
        if(!this.data.regexp) {
          this.data.regexp = ( this.data.type === 'email' ) ? /^[^\s]+@([-a-z0-9_]+\.)+[a-z\.]{2,10}$/i : false;
        }

        var re = new RegExp(this.data.regexp || this.reDefault);

        if( re.test(this.data.value) ) {
          this.valid = true;
        }
      }
      else {
        this.valid = true;
      }

      this.update();
	  },

    // обновление состояния
    update: function() {
      console.log(this);
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
