<template>
  <div class="panel panel-primary">
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
      footer: {
        type: String
      }
    }
  }
</script>

<style>
  .panel-footer:empty {
    display: none;
  }
</style>