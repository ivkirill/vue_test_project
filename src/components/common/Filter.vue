<template>
  <div class="filter">
	<label>Строка поиска: </label>
	<input type="text" name="string" v-on:input="filtering" v-model="filterString">
  </div>
</template>

<script>
export default {
  name: 'filter-string',

	props : {
		content : {
			required: true
		}
	},

	data: function() {
	  return {
			// фильтрационная строка
			filterString: ''
	  }
	},
	
	methods : {
	  // фильтруем данные
	  filtering: function() {
			
			// строка фильтрации
			var filter = this.filterString;
			var content = this.content;

			// фильтруем контент 
			if (filter && content) {
				content = content.filter(function (row) {
					return Object.keys(row).some(function (key) {
						return String(row[key]).toLowerCase().indexOf(filter) > -1
					})
				})
			}
			
			this.$emit('outfilter', content, this.filterString);
			// возвращаем новые данные
			return content;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>