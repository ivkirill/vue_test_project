<template>
  <input :name="field.name" type="file" v-model="value" @input="validate">
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
			default: ''
		}
	}
}
</script>

<style>

</style>
