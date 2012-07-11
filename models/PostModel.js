var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Comment = new Schema({
	content: String,
	postUser: {
		type: Schema.ObjectId,
		ref: "User"
	},
	replyTime: {
		type: Date,
		"default": Date.now
	},
	refer: {
		type: Schema.ObjectId,
		ref: Comment 
	}
});

var PostModel = new Schema({
	title: String,
	content: {
		type: String,
		required: true
	},
	postUser: {
		type: Schema.ObjectId,
		ref: "User"
	},
	lastReplyUser: {
		type: Schema.ObjectId,
		ref: "User",
		"default": null
	},
	postTime: {
		type: Date,
		"default": Date.now
	},
	activeTime: {
		type: Date,
		"default": Date.now		
	},
	reply: {
		type: [Comment],
		"default": []
	},
	visits: {
		type: Number,
		"default": 0
	},
	deleted: {
		type: Boolean,
		"default": false
	},
	tags: {
		type: [Schema.ObjectId ]
	}
})

PostModel.statics.findAndModify = function() {
  return this.collection.findAndModify.apply(this.collection, arguments);
};

PostModel.statics.comment = function(pid, comment, callback) {
	this.findById(pid, function(err, post) {
		post.activeTime = Date.now();
		post.reply.push(comment);
		post.save(callback);
	})
}

mongoose.model("Post", PostModel);
//module.exports = PostModel;
module.exports = exports = mongoose.model("Post");
