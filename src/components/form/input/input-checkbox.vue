<template>
    <label class="input-checkbox-label">
        <input v-if="field.type == 'radio'" type="radio" :name="field.name" :checked="checked" :value="item.value" v-model="field.value">
        <input v-else-if="field.type == 'checkbox'" type="checkbox" :name="field.name" :checked="checked" :value="item.value" v-model="field.value">
        <span>{{ item.title }}</span>
    </label>
</template>

<script>
	export default {
		name: 'input-checkbox',
		props: {
			field: {
				type: Object,
				required: true
			},
			item: {
				type: Object,
				required: true
			}
		},
		computed: {
			checked: function() {
				return (this.field.value === this.item.value ) ? true : false;
			}
		},
		model: {
			event: 'change'
		}
	}
</script>

<style></style>