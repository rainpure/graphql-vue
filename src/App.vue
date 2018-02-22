<template>
	<div class="app">
		<post-list></post-list>
	</div>
</template>

<script>
	import PostList from './PostList.vue';

	export default {
		name: 'app',
		components: {
			PostList,
		},
	};

</script>

<style>
@import 'styles/main.css';
</style>