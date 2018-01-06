<template>
	<div class="post-list">
		<h1>这是一个GraphQL+Vue2.0的小demo</h1>
		<template>
			<ul>
				<li v-for="post in posts" :key="post.id">
					{{ post.title }} posted by{{ post.author.firstName }} {{ post.author.lastName }}
					<span>({{ post.agree }} agree)</span>
					<button @click="upvote(post.id)">投票</button>
				</li>
			</ul>
		</template>

		<author v-if="authorId" :id="authorId"></author>
		<button @click="getAuthor(1)">获取author: {{author}} </button>
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
			author {
				id
				firstName
				lastName
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
			lastName
		}
	}
	`;
	export default {
		data() {
			return {
				posts: [],
				author: {},
				authorId: null
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