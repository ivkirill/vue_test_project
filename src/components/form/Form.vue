<template>
  <div class="section section-full">
	<div class="grid">
	  <div class="cell width-x-4">
		<pre class="pass text-small">{{ items }}</pre>
	  </div>
	  <div class="cell width-x-8">
		<form v-on:submit.prevent="submitForm" novalidate>
		  <input-form v-for="item in items" v-bind:data="item"></input-form>
		</form>
	  </div>
	</div>
  </div>
</template>

<script>
import Input from '../form/Input.vue'

export default {
  name: 'component-form',
	components: {
	  'input-form' : Input
	},
	data: function() {
	  return {
	    // элементы формы
		  items: form_fields
    }
	},
	computed: {
    // валидность формы
		valid: function() {
  		console.log(this);
		
			this.items.forEach(function(el) {
				console.log(el.value, el.valid);
			});
		}
	},
	methods : {
	  submitForm : function() {
	    // проблема с кешированием вычисляемого свойства this.valid
      
      
      if(this.valid) {
        console.log('Форма валидна, можно отправлять.')
      }
      else {
        console.log('Форма НЕ валидна, нужно исправить данные в полях.')
      }
	  }
	},
	mounted: function() {
	  console.log( this.items, typeof this.items );
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
