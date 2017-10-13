<template>
	<div class="seed-overlay animate">
		<div class="loader"></div>
		<div class="loader-text">{{ title }}</div>
	</div>
</template>

<script>
	export default {
		name: 'overlay-loader',
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>