Z.define('plusList/plusList', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;
		var $smallPlus = self.$wrap.find('.list_small');
		$smallPlus.on('mouseenter', 'li', function(){
			$(this).find('.list_cover').stop().animate({'opacity': '0.8'});
			$(this).find('.left_line').stop().animate({'opacity': 1, 'left': '111px'});
			$(this).find('.right_line').stop().animate({'opacity': 1, 'right': '111px'});
			$(this).find('.list_play').stop().animate({'opacity': 1, 'top': '0'});
		});
		$smallPlus.on('mouseleave', 'li', function(){
			$(this).find('.list_cover').stop().animate({'opacity': '0'});
			$(this).find('.left_line').stop().animate({'opacity': '0', 'left': '90px'});
			$(this).find('.right_line').stop().animate({'opacity': '0', 'right': '90px'});
			$(this).find('.list_play').stop().animate({'opacity': '0', 'top': '20px'});
		});

		var $bigPlus = self.$wrap.find('.list_big .big_content');
		$bigPlus.on('mouseenter', function(){
			$(this).find('.list_cover').stop().animate({'opacity': '0.8'});
			$(this).find('.left_line').stop().animate({'opacity': 1, 'left': '211px'});
			$(this).find('.right_line').stop().animate({'opacity': 1, 'right': '211px'});
			$(this).find('.list_play').stop().animate({'opacity': 1, 'top': '0'});
		});
		$bigPlus.on('mouseleave', function(){
			$(this).find('.list_cover').stop().animate({'opacity': '0'});
			$(this).find('.left_line').stop().animate({'opacity': '0', 'left': '190px'});
			$(this).find('.right_line').stop().animate({'opacity': '0', 'right': '190px'});
			$(this).find('.list_play').stop().animate({'opacity': '0', 'top': '20px'});
		});
	}
});
