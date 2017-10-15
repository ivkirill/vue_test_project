<template>
  <input v-if="field.type === 'hidden'" :name="field.name" :type="field.type" :value="field.value">
  <div v-else class="form-group">
	<div class="title">
		<template v-if="field.type === 'submit'"></template>
		<template v-else>{{ field.title }}</template>	
	</div>
	<div :class="[classValid, classHolder]">
		<template v-if="field.type === 'checkbox' || field.type === 'radio'">
			<input-checkbox v-for="item in field.items" :field="field" :item="item" :key="item.index" @change.native="validate"></input-checkbox>
		</template>
		<template v-else-if="field.type === 'select'">
			<input-select :field="field"></input-select>
		</template>
		<template v-else>
			<component :is="view" :field="field" v-model="field.value" @input.native="validate" @remove="remove"></component>
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
			require(['@/components/form/input/input-select.vue'], resolve);
		},
			'input-checkbox': function (resolve) {
			require(['@/components/form/input/input-checkbox.vue'], resolve);
		},
			'input-text': function (resolve) {
			require(['@/components/form/input/input-text.vue'], resolve);
		},
			'input-file': function (resolve) {
			require(['@/components/form/input/input-image.vue'], resolve);
		},
			'input-date': function (resolve) {
			require(['@/components/form/input/input-date.vue'], resolve);
		},
			'input-number': function (resolve) {
			require(['@/components/form/input/input-number.vue'], resolve);
		},		
			'input-textarea': function (resolve) {
			require(['@/components/form/input/input-textarea.vue'], resolve);
		},
			'input-submit': function (resolve) {
			require(['@/components/form/input/input-submit.vue'], resolve);
		}
	},
	props: {
		// свойства поля
		field: {
			type: Object,
			required: true
		}
	},

	data: function() {
		return {
			// класс обертки поля
			classHolder: 'input-holder'
		}
	},

	computed: {
		// класс валидности
		classValid: function() {
			return ( this.field.valid === true ) ? 'has-success' : ( ( this.field.valid === false ) ? 'has-error' : '');
		},

		// выбор компонента поля, а зависимости от типа поля
		view: function() {
			if( this.field.type === 'submit' ) return 'input-submit';
			if( this.field.type === 'file' ) return 'input-file';
			if( this.field.type === 'textarea' ) return 'input-textarea';
			if( this.field.type === 'date' ) return 'input-date';
			if( this.field.type === 'email' ) return 'input-text';
			if( this.field.type === 'text' ) return 'input-text';
			if( this.field.type === 'number' ) return 'input-number';
			else return '';
		}
	},

	methods: {
		// метод проксирующий в родителя валидацию
		validate: function() {
			this.$emit('validate', this.field);
		},
		// метод проксирующий в родителя удаление
		remove: function(key) {
			this.$emit('remove', key);
		}		
	}
}
</script>

<style></style>