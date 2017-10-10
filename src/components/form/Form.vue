<template>
	<div class="section section-full">
    <form v-on:submit.prevent="submitForm" novalidate="novalidate">
        <input-form v-for="field in fields" v-bind:data="field"></input-form>
    </form>
		<pre class="pass text-small">{{ fields }}</pre>
	</div>
</template>

<script>
	export default {
		name: 'component-form',
		components: {
			'input-form': function (resolve) {
        require(['@/components/form/input.vue'], resolve);
      }
		},
		props: {
			// элементы формы
			fields: {
				type: Array,
				required: true
			}
		},
		computed: {
			// валидность формы
			valid: function() {
				console.log(this);
			
				this.fields.forEach(function(el) {
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
			console.log( this.fields, typeof this.fields );
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
