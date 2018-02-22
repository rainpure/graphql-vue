<template>
	<div class="post-list">
		<h1 class="title">年度最受欢迎文学作品投票</h1>
		<ul class="book-list">
			<li v-for="post in posts" :key="post.id" class="card book-item">
				<img src="./static/hamburger.png" class="book-cover">
				<div class="book-info">
					<p>{{ post.title }}<span class="author"> {{ post.author.firstName }}</span></p>
					<p class="digest">“{{ post.digest }}”</p>
					<span class="vote">获得票数：{{ post.agree }}</span>
					<button class="button button--mini vote-btn" @click="upvote(post.id)">投票</button>
				</div>
			</li>
		</ul>

		<button class="button button--mini" @click="getAuthor(1)">获取author: {{author}} </button>
	</div>
</template>

<script>
	import resources from './resources'
	// GraphQL query
	const postsQuery = `
	query {
		posts {
			id
			title
			agree
			digest
			author {
				id
				firstName
			}
		}
	}`;
	const upvoteMutation = `
	mutation upvotePost($postId: Int!) {
		upvotePost(postId: $postId) {
			id
			agree
		}
	}
	`;
	const authorQuery = `
	query ($id: Int!) {
		author(id: $id) {
			id
			firstName
		}
	}
	`;
	export default {
		data() {
			return {
				posts: [],
				author: {},
			}
		},
		methods: {
			getPosts() {
				let _this = this;
				this.$ajax.post(`${resources.graphQlApi}`, {
					'query': `${postsQuery}`
				})
				.then(res => {
					_this.posts = res.data.data.posts.slice().sort((x, y) => y.agree - x.agree);
				});
			},
			upvote(post_id) {
				let _this = this;
				this.$ajax.post(`${resources.graphQlApi}`, {
					query: `${upvoteMutation}`,
					variables: {
						postId: post_id
					}
				})
				.then(res => {
					_this.getPosts();
				});
			},
			getAuthor(id) {
				let _this = this;
				this.$ajax.post(`${resources.graphQlApi}`, {
					query: `${authorQuery}`,
					variables: {
						id: id
					}
				})
				.then(res => {
					_this.author = res.data.data.author;
				});
			}
		},
		mounted: function () {
			this.getPosts();
		}
	};

</script>