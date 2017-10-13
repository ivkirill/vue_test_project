<template>
	<div>
		<h2 v-if="loadingData" class="text-center">Загружаем данные...</h2>
		<template v-else>
			<component v-if="updatingData" is="overlay-loader"></component>
			<table class="table table-striped table-responsive" >
				<thead>
					<tr>
						<th class="text-nowrap" v-for="(key, index) in headings" :key="key.name">
							<span class="title" v-on:click="sortBy(key)"> {{ key.title }}
								<span class="arrow" v-if="sortFlag(key, index)" v-bind:data-after="sortIcon"></span>
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="7" class="toolbar">
							<div class="grid middle left-x between-s wrap-x nowrap-l">
								<div class="cell">
									<div class="unit">
										<div class="unit-left unit-middle">
											<label>Выводить по: </label>
										</div>
										<div class="unit-body">
											<input type="number" step="5" @input="getContent" min="10" max="50" v-model="quantity" />
										</div>
									</div>
								</div>
								<div class="cell">
									<block-pagination :total="total" :quantity="quantity" :offset="offset" @changeOffset="setOffset"></block-pagination>
								</div>
							</div>
						</td>
					</tr>
				</tbody>
				<tbody>
					<tr v-for="entry in renderContent" :key="entry.product_uid_id">
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
						<td colspan="7" class="toolbar">
							<div class="grid middle left-x between-s wrap-x nowrap-l">
								<div class="cell">
									<block-filter :content="content" v-on:outfilter="output"></block-filter>
								</div>							
								<div class="cell">
									<block-pagination :total="total" :quantity="quantity" :offset="offset" @changeOffset="setOffset"></block-pagination>
								</div>
							</div>
						</td>
					</tr>
				</tfoot>
			</table>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'table-sortable',
		components: {
			'overlay-loader': function(resolve) {
				require(['@/components/loader/loader.vue'], resolve);				
			},			
			'block-filter': function(resolve) {
				require(['@/components/common/search-string.vue'], resolve);
			},
			'block-pagination': function(resolve) {
				require(['@/components/common/pagination.vue'], resolve);
			}
		},
		data: function() {
			return {
				// заголовки таблицы
				headings: [
					{
						'title': 'UID',
						'name': 'product_uid_id'
					},
					{
						'title': 'Фото',
						'name': 'product_img_image'
					},
					{
						'title': 'Артикул',
						'name': 'product_chr_article'
					},
					{
						'title': 'Название',
						'name': 'product_chr_name'
					},
					{
						'title': 'Цена, руб',
						'name': 'product_dec_price1'
					},
					{
						'title': 'Новинка',
						'name': 'product_enm_new'
					},
					{
						'title': 'Добавлен',
						'name': 'product_smp_create'
					}
				],
				// домен для изображений
				domain: 'http://seedunit.ru/',
				// поле сортировки
				sortName: '',
				// направление сортировки ("1" - asc, "-1" - desc)
				sortOrder: 1,
				links: [{
					title: 1,
					href: '/',
					active: true
				}],
				// статус загрузки
				loading: false,
				// индекс товара при выборке, выборка начинается с указанного индекса (10 - выборка начнется с 11 товара)
				offset: 0,
				// всего товаров
				total: 10,
				// количество товаров на страницу
				quantity: 10,
				// контент таблицы
				content: null, //{"product_chr_name": "", "product_chr_article": "", "product_uid_id": ""}
				contentFiltered: null,
				filterString: ''
			}
		},
		computed: {
			// начальная загрузка данных 
			loadingData: function() {
				return ( this.loading === true && this.content === null ) ? true : false;
			},
			// загрузка обновления данных
			updatingData: function() {
				return ( this.loading === true && this.content !== null ) ? true : false;
			},
			// контент отфильтрованный и отсортированный
			renderContent: function() {
				return this.sorting((this.filterString) ? this.contentFiltered : this.content);
			},
			// иконка сортировки
			sortIcon: function() {
				return this.sortOrder > 0 ? '⏶' : '⏷';
			}
		},
		methods: {
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
			sorting: function(content) {
				// поле сортировки
				var name = this.sortName;
				// направление сортировки
				var order = this.sortOrder || 1;
				// сортируем, если есть поле
				if (name) {
					content = content.sort(function(a, b) {
						a = a[name]
						b = b[name]
						return (
							a === b ?
							0 :
							a > b ?
							1 :
							-1
						) * order
					})
				}
				// возвращаем новые данные
				return content;
			},

			// устанавливаем новое значение для offset
			setOffset: function(offset) {
				this.offset = (offset == 'undefined' || typeof offset != 'number') ? this.offset : offset;

				// запрашиваем контент
				this.getContent();				
			},
			
			// получаем данные в таблицу
			getContent: function() {
				var self = this;
				// меняем статус загрузки
				this.loading = true;
				fetch('http://seedunit.ru/test1.html?show=187423&array=187423&mime=json&firstproduct=' + this.offset + '&quantity=' + this.quantity)
					.then(function(data) {
						return data.json();
					})
					.then(function(content) {
						self.content = content;
						self.loading = false;
					});
			},
			// получаем общее количество товаров
			getTotal: function() {
				var self = this;
				fetch('http://seedunit.ru/test1.html?show=187423&total=187423&mime=txt' + '&quantity=' + this.quantity)
					.then(function(data) {
						return data.text();
					})
					.then(function(content) {
						self.total = content * 1;
					});
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
	.table.table-responsive {
		margin-bottom: 0;
	}
	.table.table-responsive th span {
		cursor: pointer;
	}	
	.table.table-responsive td.toolbar {
		padding-left: 10px;
		padding-bottom: 0;
	}
	.table.table-responsive td.toolbar .cell {
		padding-bottom: 10px;
	}
	.arrow:after {
		content: attr(data-after);
	}
	img {
		display: block;
		background-color: #eee;
	}
</style>