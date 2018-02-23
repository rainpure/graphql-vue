<template>
	<div class="post-list">
		<h1 class="title">年度最受欢迎文学作品投票</h1>
		<div class="add-book-form">
			<p>标题：<input type="text" v-model="addParams.title"></p>
			<p>作者：<input type="text" v-model="addParams.author"></p>
			<p>摘要：<input type="text" v-model="addParams.digest"></p>
			<button class="button button--mini" @click="addPost()">添加参赛作品</button>
		</div>
		<ul class="book-list">
			<li v-for="post in posts" :key="post.id" class="card book-item">
				<img src="./static/hamburger.png" class="book-cover">
				<div class="book-info">
					<p>{{ post.title }}</p>
					<p class="author"> {{ post.author.firstName }}</p>
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
	const postsAdd = `
	mutation addPost(
		$title: String!
		$digest: String
		$author: String
	) {
		addPost(
			title: $title
			digest: $digest
			author: $author
		) {
			id
			title
			digest
			author {
				firstName
			}
		}
	}`;
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
				addParams: {
					title: '',
					digest: '',
					author: ''
				}
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
			addPost() {
				let _this = this;
				this.$ajax.post(`${resources.graphQlApi}`, {
					query: `${postsAdd}`,
					variables: {
						title: _this.addParams.title,
						digest: _this.addParams.digest,
						author: _this.addParams.author
					}
				})
				.then(res => {
					_this.getPosts();
				});
			},
			upvote(postId) {
				let _this = this;
				this.$ajax.post(`${resources.graphQlApi}`, {
					query: `${upvoteMutation}`,
					variables: {
						postId: postId
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