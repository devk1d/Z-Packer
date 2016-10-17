Z.define('index/page', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},
	bindEvent: function(){ 
		var self = this;

		//大banner下和深度好文下的点击轮播处理
		var $sliderList1 = this.$wrap.find('.banner_sliderUl'),
		    $sliderList2 = this.$wrap.find('.plus_sliderList'),
		    item1_width = parseInt($sliderList1.width()/8), 
		    item2_width = parseInt($sliderList2.width()/8),
			moveComplete = true; //用来判断移动动画是否已结束
		
		this.$wrap.on("click", '.slider_arrow', function(e){
			if(!moveComplete){
				return;
			}
			moveCompplete = false;
			var $this = $(this),
				$container = $sliderList1,
				itemWid = item1_width,	
				moveMult = 0,	
				direction = 'last';

			if($this.parent().hasClass('plus_slider')){
				$container = $sliderList2;
				itemWid = item2_width;	
			}

			if($this.hasClass('slider_arrowRight')){
				moveMult = -2;
				direction = 'first';
			}

			sliderMove($container, itemWid, moveMult, direction);
		})
		/*
		 * @$continer     需移动的DOM对象
		 * @width         item的宽度
		 * @multiple      用来设置容器animate时left值的倍数
		 * @width         截取item的位置
		 */
		function sliderMove ($container, width, multiple, direction){
			$container.animate({
				left: multiple * width 
			}, 300, function() {
				direction === 'first' ? $container.find('li:first').appendTo($container) : $container.find('li:last').prependTo($container);
				$container.css('left', -width + 'px');
				moveComplete = true;
			});
		}

		//深度好文左右滑动
		var $artWrap = this.$wrap.find(".art_wrap"),
			$artLists = $artWrap.find(".art_list");
		
		$artWrap.on('click', '.page_arrow', function() {
			var $this = $(this);

			if(!$this.hasClass('unclick')) return;
			
			var delta = $this.hasClass('arrow_left') ? '+=1140px' : '-=1140px';
			$artLists.animate({left: delta}, 400);

			$this.removeClass('unclick').siblings().addClass('unclick');

		});

		// 高通广告监控曝光量
		function exposureCount($url) {
			var reg = /adServer.bs/;
			var ebRand = Math.round(Math.random()*1000000000);

			if (reg.test($url)) {
				$url = $url.replace('[timestamp]', ebRand);
			}

			return $url;
		}

		if ($('.banner_firstBig').find('.global_gaNode').hasClass('exposure')) {
			var url = $('.exposure').attr('href');
			url = exposureCount(url);
			$('.exposure').attr('href', url);

			impressionURL = 'http://bsch.serving-sys.com/BurstingPipe/adServer.bs?cn=tf&c=19&mc=imp&pli=18277801&PluID=0&ord=[timestamp]&rtu=-1';
			impressionURL = exposureCount(impressionURL);
			var oScript = document.createElement("img");
			oScript.src = impressionURL;

			//google事件统计
			F.ga('button','click','高通曝光量统计');

			$('.exposure').on('click', function() {
				F.ga('button','click','高通点击量统计');
			})
		} 

	}
});
