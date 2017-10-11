<template>
  <div class="panel panel-primary">
    <div class="panel-heading" v-on:headertail="setHeader">{{ heading }}</div>
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
  },
  
  data: function() {
    return {
      bubblingHeader: ''
    }
  },

  computed: {
    heading: function() {
      return this.header + ' ' + this.bubblingHeader;
    }
  },

  methods: {
    setHeader: function(text) {
      console.log( text );
      this.bubblingHeader = text;
    }
  }
}
</script>