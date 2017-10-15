<template>
	<div>
		<input class="hide" :name="field.name" ref="filepicker" type="file" @change="upload">
		<img :src="src" class="img-responsive thumbnail" @click="chooseimage" title="Кликните для выбора нового изображения" />
	</div>
</template>

<script>
export default {
	name: 'input-image',
	props: {
    	field: {
			type: Object,
			required: true
		}
	},
	data: function() {
		return {
			newSrc: false
		}
	},
	computed: {
		src: function() {
			return (this.newSrc) ? this.newSrc : 'http://seedunit.ru/' + this.field.value;
		}
	},
	methods: {
		// эмулируем вызов кнопки обзора
		chooseimage: function() {
			this.$refs.filepicker.click();
		},
		// запрос к API на загрузку изображения
		upload: function(e) {
			var self = this;
			this.value = '/i/0018.jpg'

			// URL API
			var url = 'https://api.imgur.com/3/image'
			var formData = new FormData();
			formData.append('image', e.target.files[0]);

			// конфиг запроса
			var config = {
				body: formData,
				method: 'POST',
				headers: {
					'Authorization' : 'Client-ID be94a64852a66d4'
				},
			};

			// отправляем запрос к API
			fetch(url, config)
				.then(function(data) {
					return data.json();
				})
				.then(function(response) {
					// показываем картинку на странице
					self.newSrc = response.data.link;

					// в целом API самостоятельно обрабатывает и загружается картинки с локального адреса,
					// поэтому передача внешнего адреса игнорируется и не обрабатывается
				});
		}
	}
}
</script>

<style scoped lang="less">
	img {
		display: inline-block;
		cursor: pointer;
		min-width: 200px;
		min-height: 200px;
		font-size: 1.3rem;
		background: repeating-linear-gradient(
			135deg,
			#ffffff,
			#ffffff 10px,
			#f5f5f5 10px,
			#f5f5f5 20px
		);

		&.thumbnail {
			margin: 0;
		}

		&:hover {
			border-color: #2d6da3;
		}
	}
</style>