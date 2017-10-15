<template>
	<textarea :name="field.name" ref="rte" v-model="field.value"></textarea> 
</template>

<script>
// подключаем плагин codemirror
import 'jodit/build/jodit.min.js';
import 'jodit/build/jodit.min.css';

export default {
	name: 'input-textarea',
	props: {
    	field: {
			type: Object,
			required: true
		}
	},
	data: function() {
		return {
			rte: null
		}
	},
	methods: {
		// инициализация плагина
		init: function() {
			var self = this;
			this.rte = new Jodit(this.$refs.rte, {

			});

			// обработка передачи нового значения в textarea
			this.rte.editor.addEventListener('input', function () {
				self.field.value = this.innerHTML;
			});
		}
	},
	mounted: function() {
		this.init();
	}	
}
</script>

<style></style>
