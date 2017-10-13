<template>
	<input :name="field.name" type="text" v-model="field.value">
</template>

<script>
export default {
	name: 'input-text',
	props: {
    	field: {
			type: Object,
			required: true
		}
	}
}
</script>

<style></style>