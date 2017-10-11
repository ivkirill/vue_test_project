<template>
  <input :name="field.name" type="text" v-model="current" @input="$emit('input', current)">
</template>

<script>
export default {
	name: 'input-text',
	props: {
    	field: {
			type: Object,
			required: true
		},
		value: {
			type: String,
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