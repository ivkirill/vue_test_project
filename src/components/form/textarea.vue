<template>
  <textarea :name="field.name" type="text" v-model="current" @input="$emit('input', current)"></textarea>
</template>

<script>
export default {
	name: 'input-textarea',
	props: {
    	field: {
			type: Object,
			required: true
		},
		value: {
			default: ''
		}
	},
	data: function() {
		return {
			current: ''
		}
	},
	watch: {
		// следим за value, если дожидаемся ответа по ajax, заполняем значениями
		value: function() {
			this.current = this.value;
		}
	}
}
</script>

<style></style>
