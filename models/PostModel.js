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
	}
})
var PostModel = new Schema({
	title: String,
	visits: {
		type: Number,
		"default": 0
	},
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
	reply: {
		type: [Comment],
		"default": []
	}
})

PostModel.statics.findAndModify = function() {
  return this.collection.findAndModify.apply(this.collection, arguments);
};

PostModel.statics.comment = function(pid, comment, callback) {
	this.findById(pid, function(err, post) {
		post.reply.push(comment);
		post.save(callback);
	})
}

mongoose.model("Post", PostModel);
module.exports = PostModel;