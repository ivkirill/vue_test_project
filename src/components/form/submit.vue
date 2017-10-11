<template>
  <button :name="field.name" class="btn btn-primary" type="submit">{{ field.title }}</button>
</template>

<script>
export default {
	name: 'input-submit',
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

<style></style>