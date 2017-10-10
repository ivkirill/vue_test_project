<template>
<h1>{{ heading }}</h1>
  <div class="panel">
	<div class="panel-heading">{{ header }}</div>
    <div class="panel-body">
        <slot></slot>
	</div>
	<div class="panel-footer">{{ footer }}</div>
  </div>
</template>

<script>
export default {
  name: 'block-panel',
  props: {
    header: {
        type: String,
        required: true
    },
    heading: {
        type: String
    },
    footer: {
        type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>