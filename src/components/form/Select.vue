<template>
  <select :name="data.name">
	  <option v-for="item in data.items" :value="item.value" :selected="(item.active === true)? 'selected' : ''">{{ item.caption }}</option>
  </select>
</template>

<script>
export default {
	name: 'input-select',
	props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
