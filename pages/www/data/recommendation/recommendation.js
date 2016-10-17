Z.define('data/recommend', {
	initialize: function() {				
	    this.$container = $('.detail_recommendation');
		this.getRelate();
		this.getPrice();
	},
	getRelate: function() {
		var $container = this.$container;
		//相关视频轮播图

		var $slideUl = $container.find('ul');
		var $slideLi = $slideUl.find('li');
		var imgWidth = 300;
		var slideNum = 0;
		//获取添加头尾li之后的li个数
		$slideLi = $slideUl.find('li');
		var slideLi_len = $slideLi.length;

		//第一个li
		var $slideLi_First = $slideLi.eq(0);
		var $slideLi_Last = $slideLi.eq(slideLi_len-1);
		//clone第一个li
		var $slideLi_Clone = $slideLi_First.clone();
		$slideLi_Clone.appendTo($slideUl);
		//clone最后一个li
		var $slideLi_Clone = $slideLi_Last.clone();
		$slideLi_Clone.prependTo($slideUl);

		//获取添加头尾li之后的li个数
		$slideLi = $slideUl.find('li');
		slideLi_len = $slideLi.length;
		//轮播图初始化
		$slideUl.css('left', -imgWidth);

		var $slide_prev = $container.find('.btn_left');
		var $slide_next = $container.find('.btn_right');

		//向下一张移动的left值
		function nextMove() {
			if ($slideUl.is(':animated')) {
				return false;
			}
			var left = parseInt($slideUl.css('left'));
	
			if (left == -imgWidth * (slideLi_len - 2)) {
				$slideUl.css('left','0px');
			}
			sliderAnimate(-imgWidth);
			if (slideNum == slideLi_len - 3){
				slideNum = 0;
			} else {
				slideNum++;
			}
		}
		//向上一张移动的left值
		function preMove() {
			if ($slideUl.is(':animated')) {
				return false;
			}
			var left = parseInt($slideUl.css('left'));
			if (left == 0) {
				$slideUl.css('left', -imgWidth * (slideLi_len - 2) + 'px');
			}
			sliderAnimate(imgWidth);
			if (slideNum == 0) {
				slideNum = slideLi_len - 3;
			} else {
				slideNum--;
			}
		}

		//轮播图左右两侧按钮
		$slide_prev.on('click', preMove);
		$slide_next.on('click', nextMove);

		//轮播图滑动效果图
		function sliderAnimate(offset) {
			var oldLeft = $slideUl.css('left');
			var newLeft = parseInt(oldLeft) + offset + 'px';
			$slideUl.stop().animate({'left': newLeft}, 'slow');
		}
	},
	getPrice: function() {
		var $container = this.$container;
		var $price_header = $container.find('.recomm_header');
		var $price_tab = $container.find('.price_tab');

		var $price_inner = $container.find('.price_inner');

		//切换tab
		$price_tab.on('click', function() {
			var $this = $(this);
			$this.siblings('.price_tab').removeClass('active');
			$this.addClass('active');
			var _id = $this.data('id');
			
			$price_inner.hide();
			$price_inner.eq(_id).show();
		})

		//弹窗
		var $price_other = $container.find('.price_other_pos');
		var $price_other_box = $container.find('.price_other_box');

		$price_other.on('mouseenter', function() { 
			//$price_other.css('border-bottom-color', '#fff');
			$price_other_box.show();
		})

		$price_other_box.on('mouseenter', function() { 
			//$price_other.css('border-bottom-color', '#fff');
			$price_other_box.show();
		})

		$price_other_box.on('mouseleave', function() { 
			//$price_other.css('border-bottom-color', '#e0e0e0');
			$price_other_box.hide();
		})

		$price_other.on('mouseleave', function() { 
			//$price_other.css('border-bottom-color', '#e0e0e0');
			$price_other_box.hide();
		})

	}
})
