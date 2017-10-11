<template>
  <input v-if="field.type === 'hidden'" :name="field.name" :type="field.type" :value="value">
  <div v-else class="form-group">
	<div class="title">
	  <template v-if="field.type === 'submit'"></template>
	  <template v-else>{{ field.title }}</template>	
	</div>
	<div :class="[classValid, classHolder]">

	  <template v-if="field.type === 'checkbox' || field.type === 'radio'">
		  <input-checkbox v-for="item in field.items" :field="field" :value="value" :item="item" @input="setValue"></input-checkbox>
	  </template>

	  <template v-else-if="field.type === 'select'">
		  <input-select :field="field"></input-select>
	  </template>

	  <template v-else>
		  <component :is="view" :field="field" :value="value" @input="setValue"></component>
	  </template>
	</div>
  </div>
</template>

<script>

export default {
  name: 'input-form',

	// компоненты полей
  components: {
	  'input-select': function (resolve) {
        require(['@/components/form/select.vue'], resolve);
    },
	  'input-checkbox': function (resolve) {
        require(['@/components/form/checkbox.vue'], resolve);
    },
		'input-default': function (resolve) {
        require(['@/components/form/text.vue'], resolve);
    },
		'input-file': function (resolve) {
        require(['@/components/form/text.vue'], resolve);
    },
		'input-date': function (resolve) {
        require(['@/components/form/date.vue'], resolve);
    },
		'input-number': function (resolve) {
        require(['@/components/form/number.vue'], resolve);
    },		
		'input-textarea': function (resolve) {
        require(['@/components/form/textarea.vue'], resolve);
    },
		'input-submit': function (resolve) {
        require(['@/components/form/submit.vue'], resolve);
    }
	},
	props: {
		
		// свойства поля
		field: {
			type: Object,
			required: true
		},

		// выставляем дефолты для типа поля
		'field.type': {
			type: String,
			default: 'text'
		},

		// значение поля, заполняем при получении ответ от API
		value: {
			default: ''
		}
	},

	data: function() {
	  return {
      // класс обертки поля
		  classHolder: 'input-holder',
			// класс валидности
			classValid: ''
	  }
	},

	watch: {
		// следим за валидность и возвращаем class
		'field.valid': {
			handler: function() {
  	    this.classValid = ( this.field.valid === true ) ? 'has-success' : 'has-error';
			}
		}
	},

	computed: {
		// выбор компонента поля, а зависимости от типа поля
		view: function() {
			if( this.field.type === 'submit' ) return 'input-submit';
			if( this.field.type === 'file' ) return 'input-file';
			if( this.field.type === 'textarea' ) return 'input-textarea';
			if( this.field.type === 'date' ) return 'input-date';
			if( this.field.type === 'email' ) return 'input-default';
			if( this.field.type === 'text' ) return 'input-default';
			if( this.field.type === 'number' ) return 'input-number';
			else return '';
		}
	},

	methods: {
		// получаем новое значение от компонента поля
		setValue: function(value) {
			console.log(value);
			this.field.value = value;

			// и сразу его отправляем на валидацию
			this.validate();
		},

		// метод проксирующий в родителя валидацию
		validate: function() {
			this.$emit('validate', this.field);
		}
	}
}
</script>

<style></style>