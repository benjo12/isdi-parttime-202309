class PostsView extends Component {
    constructor() {
        super(document.getElementById('posts-view'))
    }

    renderPosts() {
        this.container.innerHTML = ''

        try {
            const posts = logic.retrievePosts()

            posts.forEachReverse(function (post) {
                const article = document.createElement('article')
                article.setAttribute('class', 'post')

                const h2 = document.createElement('h2')
                h2.innerText = post.author

                const img = document.createElement('img')
                img.setAttribute('class', 'post-image')
                img.src = post.image

                const p = document.createElement('p')
                p.innerText = post.text

                article.append(h2, img, p)

                this.container.append(article)
            }.bind(this))
        } catch (error) {
            alert(error.message)
        }
    }
}