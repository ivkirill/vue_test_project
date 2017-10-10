<template>
  <div class="section section-full">
		<div class="grid">
			<div class="cell width-x-12">
				<filter-table v-bind:content="content" v-on:outfilter="output"></filter-table>

				<table class="table table-striped">
					<colgroup width="100"></colgroup>
					<colgroup width="100"></colgroup>
					<thead>
						<tr>
							<th class="text-nowrap" v-for="(key, index) in headings" v-on:click="sortBy(key)">{{ key.title | lowercase }} 
								<span class="arrow" v-if="sortFlag(key, index)" v-bind:data-after="sortIcon"></span>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="entry in renderContent" v-bind:key="entry.product_uid_id">
							<td v-for="key in headings">
								<router-link v-if="key.name === 'product_uid_id'" :to="{ name: 'product', params: { id: entry[key.name] }}">{{entry[key.name]}}</router-link>
								<img v-else-if="key.name === 'product_img_image'" :src="domain + entry[key.name]" width="50" height="50" class="img-responsive" :alt="entry.product_chr_name">
								<template v-else>{{entry[key.name]}}</template>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cell width-x-12">
				Заголовки:
				<pre class="pass text-small">{{ headings }}</pre>
				Строки:
				<pre class="pass text-small">{{ renderContent }}</pre>
			</div>			
		</div>
  </div>
</template>

/*
    "product_txt_text": null,
    "product_dec_price1": "185.00",
    "product_img_image": "office/654/i/product/2453458.jpg",
    "product_enm_new": "NO",
    "product_smp_create": "2013-03-19 12:27:11",
    "product_chr_article": "2453458",
    "product_chr_name": "Мультиинструмент",
    "product_uid_id": "18283"
*/

<script>
import axios from 'axios';
import Filter from '../common/Filter.vue'

export default {
  name: 'table-sortable',
	components: {
	  'filter-table' : Filter
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

			// поле сортировки
			sortName: '',

			// направление сортировки ("1" - asc, "-1" - desc)
			sortOrder: 1,

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
					return (a === b ? 0 : a > b ? 1 : -1) * order
				})
			}

			// возвращаем новые данные
			return content;
	  }
	},

	filters: {
	  // делаем строку прописными
	  lowercase: function (string) {
			return string.toLowerCase();
	  }
	},

	mounted: function() {
	  // получаем данные в таблицу
	  var self = this;
	  fetch('http://seedunit.ru/test1.html?show=187423&array=187423&mime=json').then(function(data) {
			return data.json();
	  }).then(function(content) {
			self.content = content;
	  });
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  pre {
		max-height: 300px;
		overflow-y: auto;
		text-align: left;
  }

  .arrow:after {
		content: attr(data-after);
  }
</style>