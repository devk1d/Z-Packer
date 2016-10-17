//视频 
Z.define('post/video', {
	initialize: function() {
		var self = this;
		this.$container = $('.J_post_video_wrap');
		this.$head = $('.post_video_head');
		this.$container.data('done', true);
		
		/*
		setTimeout(function() {
			if(self.$head.hasClass('active')) {
				self.$head.trigger('click');
			}
		}, 100);
		*/

		this.$container.on('init', function() {
			$(this).off('init');
		});
	}
});
