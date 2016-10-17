/*
* @Title
* @Author	echoChan
* @Date 	Wed 10 Aug 2016 05:43:24 PM CST
*/

Z.define('topic/tesla', {
	initialize: function() {

		var self = this;
		$(document).scroll(function(){
			self.animate();
		});
	},

	animate : function() {
		var curr_top = $(window).scrollTop(),
			window_height = $(window).height(); // 浏览器窗口中网页可见高度
		// 判断每个div是否显示动画，因为用户可能在加载后改变页面尺寸，
		// 因此需要每次根据屏幕高度选择判断方案。
		var show_bottom = $(window).scrollTop() + $(window).height() - 400;
		$('[data=z_animate]').each(function(){
			var show_this = false;

			if (show_bottom > $(this).offset().top) {
				$(this).addClass('z_animate').removeAttr('data'); 
			}
		});
	}

});

