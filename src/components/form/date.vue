<template>
  <input :name="field.name" type="date" v-model="current" @input="$emit('input', current)">
</template>

<script>
export default {
	name: 'input-date',
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
			this.current = this.value.replace(/(.+)\s.*/,'$1');
		}
	}
}
</script>
<style></style>