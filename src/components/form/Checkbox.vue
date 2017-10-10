<template>
   <label class="input-checkbox-label">
	<input :type="type" :name="name" :value="value">
	<span>{{ caption }}</span>
  </label>
</template>

<script>
export default {
  name: 'input-checkbox',
  model: {
      prop: 'active',
      event: 'change'
  },
  props: {
	name : {
        type: String,
        required: true
    },
    caption: String,
    active : Boolean,
    type: String,
    value: String
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
