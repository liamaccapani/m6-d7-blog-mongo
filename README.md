# m6-d7-blog-mongo
 Strive Blog API MongoDB
###
{
	    "_id": "MONGO GENERATED ID",
	    "category": "ARTICLE CATEGORY",
	    "title": "ARTICLE TITLE",
	    "cover":"ARTICLE COVER (IMAGE LINK)",
	    "readTime": {
	      "value": Number,
	      "unit": "minute"
	    },
	    "author": {
	      "name": "AUTHOR NAME",
	      "avatar":"AUTHOR AVATAR LINK"
	    },
	    "content": "HTML",
	    "createdAt": "DATE",
      "updatedAt": "DATE"           
}
###

### POSTS ###
#### GET /blogPosts => returns the list of blogPosts 
#### GET /blogPosts /123 => returns a single blogPost
#### POST /blogPosts => create a new blogPost
#### PUT /blogPosts /123 => edit the blogPost with the given id
#### DELETE /blogPosts /123 => delete the blogPost with the given id


### COMMENTS ###
#### GET /blogPosts/:id/comments => returns all the comments for the specified blog post
#### GET /blogPosts/:id/comments/:commentId=> returns a single comment for the specified blog post
#### POST /blogPosts/:id => adds a new comment for the specified blog post
#### PUT /blogPosts/:id/comment/:commentId => edit the comment belonging to the specified blog post
#### DELETE /blogPosts/:id/comment/:commentId=> delete the comment belonging to the specified blog post

### POSTS ###
#####