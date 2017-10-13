<template>
	<div class="pagination">
		<template v-for="link in links">
	        <a v-if="link.class === ''" @click="changePage(link.href)">{{ link.title }}</a>
	        <span v-else-if="isDivider(link)" :class="link.class">..</span>
	        <b v-else>{{ link.title }}</b>
		</template>
  </div>
</template>

<script>
	export default {
		name: 'block-pagination',
		props: {
			// индекс товара при выборке, выборка начинается с указанного индекса (10 - выборка начнется с 11 товара)
			offset: {
				type: Number,
				default: 0
			},
			// всего товаров
			total: {
				type: Number,
				required: true
			},
			// количество товаров на страницу
			quantity: {
				default: 10
			}
		},
		data: function() {
			return {
				// количесто страниц
				pages: 1
			}
		},
		computed: {
			// список ссылок
			links: function() {
				var pages = [];
				var start = [],
					middle = [],
					end = [];
				var i = 0;
				this.pages = Math.ceil(this.total / this.quantity) - 1;
				while (i < this.pages) {
					pages.push({
						title: i + 1,
						href: i * this.quantity,
						class: (this.offset === i * this.quantity) ? 'active' : ''
					});
					i++;
				}
				// алгоритм пагинации # нужно будет подумать как сделать лушче...
				if (pages.length > 6) {
					if (this.offset - this.quantity * 1 >= this.quantity * 3 && this.total - this.offset > this.quantity * 4) {
						start = pages.splice(0, 1);
						start.push({
							class: 'divider divider-start'
						});
						middle = pages.splice(this.offset / this.quantity - 2, 3);
						middle.push({
							class: 'divider divider-end'
						});
						end = pages.splice(-1);
					} else if (this.total - this.offset < this.quantity * 4) {
						start = pages.splice(0, 1);
						start.push({
							class: 'divider divider-end'
						});
						end = pages.splice(-5);
					} else {
						start = pages.splice(0, 5);
						start.push({
							class: 'divider divider-start'
						});
						end = pages.splice(-1);
					}
					pages = start.concat(middle).concat(end);
				}
				return pages;
			}
		},
		methods: {
			// определение разделителя по классу
			isDivider: function(link) {
				return String(link.class).toLowerCase().indexOf('divider') > -1;
			},			
			changePage: function(offset) {
				this.$emit('changeOffset', offset);
			}
		}
	}
</script>

<style>
	.pagination {
		margin-top: 0;
		margin-bottom: 0;
		display: flex;
	}
	.pagination>a {
		cursor: pointer;
	}
	.pagination>a,
	.pagination>b,
	.pagination>span {
		display: block;
		float: none;
		line-height: 2.2rem;
		height: 3.4rem;
	}
</style>