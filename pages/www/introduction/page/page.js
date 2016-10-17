Z.define('introduction/page', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;

		var $wrapModule = this.$wrap.find('.wrap_module');	
		var w = $wrapModule.width(); 
		var h = $wrapModule.height(); 

		$wrapModule.on('mousemove', function(e) {
			var $poster = $(this).find('.pic_show');
			var color = $poster.data('color');
			if( !color ){
				color = '49, 52, 59';
			}
			var mouse = F.getMousePos(e, $(this));
			var o_x = 0.5 - mouse.x / w; 
			var o_y = 0.5 - mouse.y / h;
			var times = 10;
			//var transformPoster = 'translateY(' + -o_x * times + 'px) rotateX(' + (-o_y * times) + 'deg) rotateY(' + (o_x * (times * 2)) + 'deg)';
			var transformPoster = 'rotateX(' + (o_y * times) + 'deg) rotateY(' + (-o_x * (times * 2)) + 'deg)';

			var shadow = o_x * times * 8 + 'px ' + o_y * times * 8 + 'px 80px rgba(' + color + ', 0.4)';
			$poster.css({
				'transform': transformPoster, 
				'-webkit-transform': transformPoster, 
				'-moz-transform': transformPoster, 
				'-ms-transform': transformPoster, 
				'-o-transform': transformPoster, 
				'boxShadow': shadow,
				'-webkit-boxShadow': shadow,
				'-moz-boxShadow': shadow,
				'-ms-boxShadow': shadow,
				'-o-boxShadow': shadow
			});
		});
	}
})
