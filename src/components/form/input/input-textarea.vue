<template>
	<textarea :name="field.name" v-model="field.value"></textarea> 
</template>

<script>

import VmEditor from 'vm-editor';

export default {
	name: 'input-textarea',
	props: {
    	field: {
			type: Object,
			required: true
		}
	}
}
</script>

<style></style>
