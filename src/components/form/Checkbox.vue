<template>
    <label class="input-checkbox-label">
        <input v-if="field.type == 'radio'" type="radio" :name="field.name" v-model="current" :value="item.value" @change="change">
        <input v-else-if="field.type == 'checkbox'" type="checkbox" :name="field.name" v-model="current" :value="item.value" @change="change">
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
    },
    value: String
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
	},
  methods: {
    change: function() {
      this.$emit('input', this.current);
    }
  }
}
</script>

<style></style>