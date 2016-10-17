Z.define('data/index', {
	initialize: function() {				
		var self = this;
	    this.$wrap = $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){
		var self = this;
		var $itemList = this.$wrap.find('.item_list');
		$itemList.on('mouseenter', 'a', function(){
			var $img = $(this).find('img');
			$img.attr('src', $img.data('hover'));
			$(this).find('span').addClass('span_active');
		});
		$itemList.on('mouseleave', 'a', function(){
			var $img = $(this).find('img');
			$img.attr('src', $img.data('origin'));
			$(this).find('span').removeClass('span_active');
		});

		var $phoneList = this.$wrap.find('.phone_list');
		$phoneList.on('mousemove', '.list_wrap', function(e){
			var $poster = $(this).find('.wrap_poster'),
				$posterLayer = $(this).find('.poster_layer');

			var w = $(this).width(),
				h = $(this).height(),
				mousePos = F.getMousePos(e, $(this)),
				offsetX = 0.5 - mousePos.x / w,
				offsetY = 0.5 - mousePos.y / h,
				offsetPoster = $poster.data('offset'),
				transformPoster = 'translateY(' + ( -offsetX * offsetPoster ) + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)';

			$poster.css('transform', transformPoster);

			$posterLayer.each(function() {
				var $this = $(this),
				offsetLayer = $this.data('offset') || 0,
				transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

				$this.css('transform', transformLayer);
			});
		});
	},
})
