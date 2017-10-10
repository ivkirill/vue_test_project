<template>
  <div class="pagination">
    <template v-for="link in links" >
      <a v-if="link.class === ''" @click="page(link.href)">{{ link.title }}</a>
      <span v-else-if="String(link.class).toLowerCase().indexOf('divider') > -1" :class="link.class">..</span>
      <b v-else>{{ link.title }}</b>
    </template>
  </div>
</template>

<script>
export default {
  name: 'block-pagination',
  props: {
    first: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    per: {
        type: Number,
        default: 10
    }
  },

  data: function() {
    return {
      count: 1
    }    
  },

  computed: {
    links: function() {
      var pages = [];
      var start = [], middle = [], end = [];
      var i = 0;
      this.count = Math.ceil(this.total/this.per) - 1;

      while (i < this.count) {
        pages.push({
          title: i+1,
          href: i * this.per,
          class : (this.first === i * this.per ) ? 'active' : ''
        });
        i++;
      }

      // алгоритм пагинации # нужно будет подумать как сделать лушче...
      if(pages.length > 6) {
        if( this.first - this.per*1 >= this.per*3 && this.total - this.first > this.per*4) {
          start = pages.splice(0, 1);
          start.push({ class: 'divider divider-start' });
          
          middle = pages.splice(this.first/this.per-2, 3);
          middle.push({ class: 'divider divider-end' });

          end = pages.splice(-1);
        }

        else if (this.total - this.first < this.per*4) {
          start = pages.splice(0, 1);
          start.push({ class: 'divider divider-end' });
          end = pages.splice(-5);          
        }
        
        else {
          start = pages.splice(0, 5);
          start.push({ class: 'divider divider-start' });
          end = pages.splice(-1);
        }

        pages = start.concat(middle).concat(end);
      }

      return pages;
    }    
  },

  methods: {
    page: function(offset) {
      this.$emit('changePage', offset);
    }
  }
}
</script>

<style>
    .pagination {
        margin-top:0;
        margin-bottom:0;
        display: flex;
    }

    .pagination > a {
      cursor: pointer;      
    }
    
    .pagination > a,
    .pagination > b,
    .pagination > span {
      display: block;
      float: none;
      line-height: 2.4rem;
    }
</style>