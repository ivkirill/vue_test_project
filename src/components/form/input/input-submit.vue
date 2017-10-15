<template>
  <button :name="field.name" :class="btnClass" type="submit" @click="click">{{ field.title }}</button>
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
	},
	computed: {
		btnClass: function() {
			return (this.field.name == 'remove') ? 'btn btn-error' : 'btn btn-primary'
		}
	},
	methods: {
		click: function() {
			if(this.field.name == 'remove') {
				if(confirm('Вы действительно хотите удалить запись?')) {
					this.$emit('remove', true);
				}
				else {
					this.$emit('remove', false);
				}
			}
			else this.$emit('remove', false);
		}
	}
}
</script>

<style></style>