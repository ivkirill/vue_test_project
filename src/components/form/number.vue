<template>
  <input :name="field.name" type="number" v-model="current" :min="field.min" :max="field.max" @input="$emit('input', current)">
</template>

<script>
export default {
	name: 'input-number',
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