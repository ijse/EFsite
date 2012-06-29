/**
 * Main js file
 */

$.prettyDate.messages = {
	now: "刚刚",
	minute: "1分钟前",
	minutes: $.prettyDate.template("{0}分钟前"),
	hour: "1小时前",
	hours: $.prettyDate.template("{0}小时前"),
	yesterday: "昨天",
	days: $.prettyDate.template("{0}天前"),
	weeks: $.prettyDate.template("{0}周前")
};
$(function($) {
	/**
	 * 在标签上添加rel=dateType属性，将会
	 * 自动将该标签的title属性值的日期转换为人性化日期
	 * @type {[type]}
	 */
	$("[rel=dateType]").prettyDate();

	/**
	 * 引用回复
	 */
	$(".fn-refer").live("click", function(event) {
		
	});
});

/**
 * 当@某位用户时，在编辑嚣中插入标记
 */
function atuser(userid, name) {
	var editor = $(".xheditor").xheditor();
	editor.pasteHTML("<a href='p/" + userid + "' class='my-atuser'>@" + name + "</a>&nbsp;");
}

/**
 * 引用某用户的回复
 */
