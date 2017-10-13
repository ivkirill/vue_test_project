<template>
	<input :name="field.name" type="text" v-model.number="field.value" :min="field.min" :max="field.max">
</template>

<script>
export default {
	name: 'input-number',
	props: {
    	field: {
			type: Object,
			required: true
		}
	}
}
</script>

<style></style>