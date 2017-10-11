<template>
	<div>
	<h2 v-if="loading === true && content === null" class="text-center">Загружаем данные...</h2>
	<template v-else>
		<div v-if="loading === true && content !== null" class="seed-overlay animate">
			<div class="loader"></div>
		</div>
		<table class="table table-striped table-responsive" >
			<thead>
				<tr>
					<th class="text-nowrap" v-for="(key, index) in headings" v-on:click="sortBy(key)">{{ key.title | lowercase }}
						<span class="arrow" v-if="sortFlag(key, index)" v-bind:data-after="sortIcon"></span>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colspan="7">
						<div class="grid middle between">
							<div class="cell">
								<block-filter :content="content" v-on:outfilter="output"></block-filter>
							</div>
							<div class="cell">
								<block-pagination :total="total" :per="per" :first="first" v-on:changePage="getContent"></block-pagination>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
			<tbody>
				<tr v-for="entry in renderContent" v-bind:key="entry.product_uid_id">
					<td v-for="key in headings" :data-title="key.title">
						<router-link v-if="key.name === 'product_uid_id'" :to="{ name: 'product', params: { id: entry[key.name] }}">{{entry[key.name]}}</router-link>
						<img v-else-if="key.name === 'product_img_image'" :src="domain + entry[key.name]" width="50" height="50" :alt="entry.product_chr_name">
						<small v-else-if="key.name === 'product_smp_create'">{{entry[key.name]}}</small>
						<template v-else>{{entry[key.name]}}</template>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="7">
						<pre class="pass text-small">{{ renderContent }}</pre>
					</td>
				</tr>
			</tfoot>
		</table>
  	</template>
	</div>
</template>

/*
    "product_uid_id": "18283"
    "product_chr_name": "Мультиинструмент",
    "product_chr_article": "2453458",
    "product_img_image": "office/654/i/product/2453458.jpg",
    "product_dec_price1": "185.00",
    "product_txt_text": null,
    "product_enm_new": "NO",
    "product_smp_create": "2013-03-19 12:27:11",
*/

<script>
import Filter from '../common/Filter.vue'

export default {
  name: 'table-sortable',
	components: {
		'block-filter': function(resolve) {
		require(['@/components/common/filter.vue'], resolve);
		},
		'block-pagination': function(resolve) {
			require(['@/components/common/pagination.vue'], resolve);
		}
	},

	data: function() {
	  return {
			// заголовки таблицы
			headings: [
				{'title' : 'UID', 'name' : 'product_uid_id'},
				{'title' : 'Фото', 'name' : 'product_img_image'},
				{'title' : 'Артикул', 'name' : 'product_chr_article'},
				{'title' : 'Название', 'name' : 'product_chr_name'},
				{'title' : 'Цена, руб', 'name' : 'product_dec_price1'},
				{'title' : 'Новинка', 'name' : 'product_enm_new'},
				{'title' : 'Добавлен', 'name' : 'product_smp_create'}
			],

      		// домен для изображений
      		domain: 'http://seedunit.ru/',
			
			// статус загрузки
			loading: false,
			
			// поле сортировки
			sortName: '',
			
			// направление сортировки ("1" - asc, "-1" - desc)
			sortOrder: 1,

			links: [{
				title: 1,
				href:'/',
				active: true
			}],

			// offset для получения продукции
			first: 0,

			// общее количество
			total: 10,

			// количество товаров на страницу
			per: 10,

			// контент таблицы
			content: null, //{"product_chr_name": "", "product_chr_article": "", "product_uid_id": ""}
			contentFiltered: null,
			filterString: ''
		}
	},

	computed: {
		// контент отфильтрованный и отсортированный
		renderContent: function() {
			return this.sorting(( this.filterString ) ? this.contentFiltered : this.content);
		},
		
		sortIcon: function() {
			return this.sortOrder > 0 ? '⏶' : '⏷';
		}
	},

	methods : {
		// метод сортировки
		sortBy: function(key) {
			this.sortName = key.name;
			this.sortOrder *= -1;
		},

		sortFlag: function(key, index) {
				return (key.name == this.sortName || (this.sortName == '' && index == 0));
		},
		
		output: function(content, filterString) {
			this.filterString = filterString;
			this.contentFiltered = content;
			this.getTotal();
		},

		// сортируем данные
		sorting: function (content) {
			// поле сортировки
			var name = this.sortName;

			// направление сортировки
			var order = this.sortOrder || 1;

			// сортируем
			if (name) {
				content = content.sort(function (a, b) {
					a = a[name]
					b = b[name]
					return (
						a === b
							? 0
							: a > b
								? 1
								: -1
					) * order
				})
			}

			// возвращаем новые данные
			return content;
		},

		// получаем данные в таблицу
		getContent: function (offset) {
			console.log('getContent', offset);
			var self = this;
			this.loading = true;
			this.first = (offset === 'undefined') ? this.first : offset;
			
			fetch('http://seedunit.ru/test1.html?show=187423&array=187423&mime=json&firstproduct=' + this.first)
			.then(function (data) {
				return data.json();
			})
			.then(function (content) {
				self.content = content;
				self.loading = false;
			});
		},

		// получаем общее количество товаров
		getTotal: function() {
			var self = this;
			fetch('http://seedunit.ru/test1.html?show=187423&total=187423&mime=txt')
			.then(function (data) {
				return data.text();
			})
			.then(function (content) {
				self.total = content*1;
			});
		}
	},

	filters: {
	  // делаем строку прописными
	  lowercase: function (string) {
			return string.toLowerCase();
	  }
	},

	mounted: function() {
		// запрашиваем контент
		this.getContent();
		// запрашиваем общее количество
		this.getTotal();
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .arrow:after {
		content: attr(data-after);
  }

  img {
	  display: block;
	  background-color: #eee;
  }
</style>