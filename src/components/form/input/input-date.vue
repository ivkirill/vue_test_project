<template>
	<input :name="field.name" :placeholder="field.placeholder" type="text" ref="datepicker" v-model="field.value">
</template>

<script>
// подключаем плагин календаря
import flatpickr from 'flatpickr';
import { ru } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/flatpickr.css';

export default {
	name: 'input-date',
	props: {
    	field: {
			type: Object,
			required: true
		}
	},
	data: function() {
		return {
			fp: null
		}
	},
	methods: {
		// инициализация плагина
		init: function() {
			var self = this;
			this.fp = flatpickr(this.$refs.datepicker, {
				locale: ru,
				dateFormat: 'Y-m-d H:i:S',
				defaultDate: Date.now(),
				enableTime: true,
				time_24hr: true,
				onReady: function(date, str) {
					self.$refs.datepicker.removeAttribute('readonly');
				}
			})
		}
	},
	mounted: function() {
		this.init();
	}
}
</script>

<style></style>