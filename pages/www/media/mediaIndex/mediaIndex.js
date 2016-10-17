Z.define('mediaIndex/mediaIndex', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;
		var $handVideo = self.$wrap.find('.common_list');
		$handVideo.on('mouseenter', 'li', function(){
			$(this).find('.list_cover').stop().animate({'opacity': '0.8'});
			$(this).find('.left_line').stop().animate({'opacity': 1, 'left': '111px'});
			$(this).find('.right_line').stop().animate({'opacity': 1, 'right': '111px'});
			$(this).find('.list_play').stop().animate({'opacity': 1, 'top': '0'});
		});
		$handVideo.on('mouseleave', 'li', function(){
			$(this).find('.list_cover').stop().animate({'opacity': '0'});
			$(this).find('.left_line').stop().animate({'opacity': '0', 'left': '90px'});
			$(this).find('.right_line').stop().animate({'opacity': '0', 'right': '90px'});
			$(this).find('.list_play').stop().animate({'opacity': '0', 'top': '20px'});
		});

		var $contentAbstract = self.$wrap.find('.content_abstract');
		var $bigAbs = $contentAbstract.find('.abstract_big');
		var $smallAbs = $contentAbstract.find('.abstract_small');
		/*$bigAbs.on('mouseenter', function(){
			$(this).find('.big_title').stop().animate({'bottom': '0'});
		});
		$bigAbs.on('mouseleave', function(){
			$(this).find('.big_title').stop().animate({'bottom': '-60px'});
		});*/
		$smallAbs.on('mouseenter', function(){
			$(this).find('.small_title').stop().animate({'bottom': '0'});
		});
		$smallAbs.on('mouseleave', function(){
			$(this).find('.small_title').stop().animate({'bottom': '-40px'});
		});
	}
});
