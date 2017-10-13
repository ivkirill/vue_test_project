<template>
	<input :name="field.name" type="text" v-model="field.value" :min="field.min" :max="field.max">
</template>

<script>
export default {
	name: 'input-date',
	props: {
    	field: {
			type: Object,
			required: true
		}
	}
}
</script>

<style></style>