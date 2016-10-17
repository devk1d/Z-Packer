Z.define('mediaFirst/mediaFirst', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;
		//‘加载更多’鼠标悬浮
		var $wrapGo = self.$wrap.find('.wrap_go');
		var $goCover = $wrapGo.find('span').eq(0);
		$wrapGo.on('mouseenter', function(ev){
			$goCover.stop();
			var mouse = F.getMousePos(ev,$(this));
			$(this).on('mousemove', function(ev){
				mouse = F.getMousePos(ev, $(this));
				$goCover.css({'right': parseInt($(this).width()-mouse.x)});
			});
		});
		$wrapGo.on('mouseleave', function(){
			$goCover.animate({'right':'160px'});
		});
		
		var $handVideo = self.$wrap.find('.hand_video');
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
	}
})

