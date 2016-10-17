
//相机
Z.define('data/camera', {
	initialize: function() {
		var self = this;

		self.$container = $('.camera_tools_wrap');
		self.$head = $('.post_camera_head');
		self.select = Z.require('data/tools').select;
		//this.lineChart = Z.require('data/tools').lineChart;
		self.lineChart = Z.require('data/tools').verticalLine;
		self.chartTools = Z.require('data/tools').chartTools;
		self.animateTime = 800;

		self.$areaChartWrap = self.$container.find('.area_chart_wrap');
		self.$lineChartWrap = self.$container.find('.camera_chart_wrap');
		self.$compareWrap = self.$container.find('.camera_compare_wrap');
		self.$realPicWrap = self.$container.find('.real_pic_wrap');
		
		self.$container.on('init', function() {
			self.init(self.data);
			self.bindEvent();
			$(this).off('init');
		});

		//self.mobile2id 和 self.id2mobile用于发送ajax请求时查询手机id
		self.mobile2id = {};
		self.id2mobile = {};

		self.checkIE = function() {
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf("MSIE ");
			var edge = ua.indexOf("Edge");

			if (edge > 0 || msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {      
				return true;
			} else {
				return false;
			}
		};

		self.currentMobile = window.mobile_name;
		self.otherMobile_1 = window.compMobileName;
		self.otherMobile_2 = window.compMobileName;
		self.otherMobile_3 = window.compMobileName;
		self.id2mobile[window.mobile_id] = self.currentMobile;
		self.mobile2id[self.currentMobile] = window.mobile_id;

		self.initRealPic();

		self.realPicSelector.$select.find('.list_like ul li').each(function(i, item) {
			self.id2mobile[$(item).data('id')] = $(item).html();
			self.mobile2id[$(item).html()] = $(item).data('id');
			if($(item).text() == self.otherMobile_1) {
				$(item).attr('isclick', 'no');
				$(item).trigger('click');
				return false;
			}
		});
	},

	init: function(data) {
		var self = this;

		if(F.hasSVG()) {
			self.initLineChart();
		}else {
			var $el = self.$container.find('.camera_options .opt_3');
			$el.prev('.split').remove();
			$el.remove();
		}

		self.initCameraCompare();
	},

	bindEvent: function() {
		var self = this;
		var $toolsHead = $(".tools .post_camera_head");
		var $headTabs = $toolsHead.find('.head_tabs');

		var $unboxTab = $('.p_unbox');

		$headTabs.on('click', 'li', function(e) {
			e.stopPropagation();
			var $this = $(this);
			var _index = $this.index();
			var $currHead = $this.parent().parent();
			var $currTabs = $currHead.find('.head_tabs');
			var $currWrap = $currHead.next('.tools_wrap');

			if($this.hasClass('active')) {
				return;
			}
			$currTabs.find('li.active').removeClass('active');
			$this.addClass('active');
			$('.camera_tools_wrap').find('.wrap_tab.active').removeClass('active');
			$('.camera_tools_wrap').find('.wrap_tab_' + $this.data('tab')).addClass('active');

			var isStart = true;
			
			if( _index == 0 ) self.realPicInit();
			else if( _index == 1 ) self.cameraCompareInit();
			else if( _index == 2 ) self.lineChartInit(isStart);
		});

	},

	//成像分析
	initLineChart: function(isStart) {
		var self = this;
		var chartWidth = 480;
		var chartHeight = 398;
		var leftWidth = 290;
		var leftHeight = 500;
		var $wrap = self.$lineChartWrap.find('.camera_chart');
		var $lineChart = $wrap.find('.line_chart');
		var Slide = Z.require('data/screen').slide;
		var currentType = 'photo_details';
		var slideLeft = {};
		var slideRight = {};
		//$lineChart.css({width: chartWidth, height: chartHeight});
		var _lineChart = {};
		var nowScale = 10;

		var _init = function(chartData, isStart) {
			//F.unloading($lineChart);

			var _data = [];
			$.each(chartData, function(i, item) {
				_data.push([]);
				$.each(item.list[currentType], function(j, subItem) {
					_data[i].push({x: subItem.x, y: subItem.y});
				});
			});

			var lastTopLeft = -1;
			var lastTopRight = -1;

			if( currentIndex < 2 ){
				var verticalHeight = 250;
				var y_arr = [10, 20, 40, 80, 160, 320, 480, 600];
			} else {
				//var verticalHeight = 180;
				var verticalHeight = 179;
				var y_arr = [10, 20, 40, 80, 160, 320];
			}
			
			//var vertical_v = 70;
			_lineChart = new self.lineChart({
				wrap: $lineChart,
				width: chartWidth,
				height: verticalHeight,
				x: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100+'分'],
				y: y_arr,
				data: _data,
				onHover: function(x, y, $dom, e, isStart) {
					//slideLeft.$handler.stop();
					//slideRight.$handler.stop();

					var $this = $(e.target), yv;
					if($this.hasClass('tipper') || $this.parent().hasClass('tipper')) {
						return ;
					} else {
						yvLeft = $dom.eq(0).attr('oy');
						yvRight = $dom.eq(1).attr('oy');
					}
					nowScale = $dom.eq(0).attr('ox');
					var _topLeft = self.calculator(0, leftHeight, max_v, min_v, yvLeft);
					var _topRight = self.calculator(0, leftHeight, max_v, min_v, yvRight);
					if(_topLeft == lastTopLeft || _topRight == lastTopRight) {
						//return ;
					}
					lastTopLeft = _topLeft;
					lastTopRight = _topRight;

					slideLeft.$handler.stop().animate({
						'top': _topLeft
					/*}, {
						speed: self.animateTime,
						step: function(top) {
							slideLeft.setHandler(yvLeft);
						}
					});*/
					}, self.animateTime);
					slideLeft.setHandler(yvLeft);

					slideRight.$handler.stop().animate({
						'top': _topRight
					}, self.animateTime);
					slideRight.setHandler(yvRight);

					//isStart来判断是否执行初始化动画(从下往上过渡)

					switch (currentIndex) {
						case 0:
							photo_details.onChange(_topLeft, $slideLeft, isStart);
							photo_details.onChange(_topRight, $slideRight, isStart);
							break;
						case 1:
							noise_density.onChange(_topLeft, ctxLeft, imageDataLeft, originDataLeft, isStart);
							noise_density.onChange(_topRight, ctxRight, imageDataRight, originDataRight, isStart);
							break;
						case 2:
							color_performance.onChange(_topLeft, $slideLeft, isStart);
							color_performance.onChange(_topRight, $slideRight, isStart);
							break;
						case 3:
							exposure_value.onChange(_topLeft, $slideLeft, isStart);
							exposure_value.onChange(_topRight, $slideRight, isStart);
							break;
					}
				}
			});

			slideLeft.$handler.css({'top': '100%'});
			slideRight.$handler.css({'top': '100%'});

			var topest = $lineChart.find('.tipper').length/2;
			var ox = $lineChart.find('.tipper').eq(topest-1).attr('ox');
			$lineChart.find('.tipper[ox='+ox+']').css({'opacity': 1});
			_lineChart.opts.onHover(0, 0, $lineChart.find('.tipper[ox='+ ox + ']'), {target: ''}, true);
		};

		//机型多选
		this.lineChartSelector = new self.select({
			dom: self.$lineChartWrap.find('.mobile_selector'),
			data: (function() {
				var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				//F.ga('button', 'click', 'tools_camera_analytics_mobile_switch');
				self.mobile2id[$(dom).text()] = $(dom).data('id');
				self.id2mobile[$(dom).data('id')] = $(dom).text();
				self.otherMobile_3 = $(dom).text();
				self.lineChartInit();
			}
		});

		//效果多选
		var currentIndex = 0;
		var $options = $wrap.parent().find('.type_select a');
		$options.on('click', function() {
			//$(this).closest('.tools_wrap').addClass('nocompatible');
			var _index = $(this).index();
			currentIndex = _index;

			var activePos = -633; 
			var normalPos = -808; 
			var yActive =  -_index * 44 + activePos;
			$options.removeClass('active').each(function(i, item){
				var yNormal = -i * 44 + normalPos;
				$(item).css({'background-position': '82px ' + yNormal + 'px'}); 	
			});
			$(this).addClass('active').css({'background-position': '82px ' + yActive + 'px'});

			switch (currentIndex) {
				case 0:
					//F.ga('button', 'click', 'tools_camera_analytics_photo_details');
					photo_details.init($slideLeft);
					photo_details.init($slideRight);
					currentType = 'photo_details';
					break;
				case 1:
					//F.ga('button', 'click', 'tools_camera_analytics_noise_density');
					noise_density.init($slideLeft, canvasLeft);
					noise_density.init($slideRight, canvasRight);
					currentType = 'noise_density';
					break;
				case 2:
					//F.ga('button', 'click', 'tools_camera_analytics_color_performance');
					color_performance.init($slideLeft);
					color_performance.init($slideRight);
					currentType = 'color_performance';
					break;
				case 3:
					//F.ga('button', 'click', 'tools_camera_analytics_exposure_value');
					exposure_value.init($slideLeft);
					exposure_value.init($slideRight);
					currentType = 'exposure_value';
					break;
			}
			self.lineChartInit();
			
		});

		//左边亮度的滑动

		var $slideLeft = $wrap.parent().find('.chart_pic_left .camera_slide');
		var $slideRight = $wrap.parent().find('.chart_pic_right .camera_slide');
		
		var imageDataLeft = {};
		var imageDataRight = {};
		var originDataLeft = {};
		var originDataRight = {};
		var canvasLeft = $slideLeft.find('canvas')[0];
		var ctxLeft = canvasLeft.getContext('2d');
		var canvasRight = $slideRight.find('canvas')[0];
		var ctxRight = canvasRight.getContext('2d');

		
		var max_v = 100;
		var min_v = 0;
		//var $slide = $wrap.parent().find('.chart_pic_left .camera_slide');
		//var $slideImg = $slide.find('img');
		slideLeft = new Slide({
			wrap: $slideLeft,
			scale: ['100分', '90', '80', '70', '60', '50', '40', '30', '20', '10', '0'],
			width: leftWidth,
			height: leftHeight,
			onMove: function(moveY) {
				var _val = max_v - (max_v - min_v) * moveY / leftHeight;
				slideLeft.setHandler(_val.toFixed(2));

				switch (currentIndex) {
					case 0:
						photo_details.onChange(moveY, $slideLeft);
						break;
					case 1:
						noise_density.onChange(moveY, ctxLeft, imageDataLeft, originDataLeft);
						break;
					case 2:
						color_performance.onChange(moveY, $slideLeft);
						break;
					case 3:
						exposure_value.onChange(moveY, $slideLeft);
						break;
				}
			},
			onLeave: function(){
				_lineChart.opts.onHover(0, 0, $lineChart.find('.tipper[ox='+nowScale+']'), {target: ''});
			}
		});

		slideRight = new Slide({
			wrap: $slideRight,
			scale: ['100分', '90', '80', '70', '60', '50', '40', '30', '20', '10', '0'],
			width: leftWidth,
			height: leftHeight,
			onMove: function(moveY) {
				var _val = max_v - (max_v - min_v) * moveY / leftHeight;
				slideRight.setHandler(_val.toFixed(2));

				switch (currentIndex) {
					case 0:
						photo_details.onChange(moveY, $slideRight);
						break;
					case 1:
						noise_density.onChange(moveY, ctxRight, imageDataRight, originDataRight);
						break;
					case 2:
						color_performance.onChange(moveY, $slideRight);
						break;
					case 3:
						exposure_value.onChange(moveY, $slideRight);
						break;
				}
			},
			onLeave: function(){
				_lineChart.opts.onHover(0, 0, $lineChart.find('.tipper[ox='+nowScale+']'), {target: ''});
			}
		});
		
		slideLeft.setHandler('0');
		slideRight.setHandler('0');

		//解析力
		var photo_details = {
			init: function($slide) {
				var $slideImg = $slide.find('img');
				$slideImg.show();
				
				
				
				$slideImg.removeClass('smooth_slide').css({
					opacity: 1,
					'filter': 'initial',
					'-webkit-filter': 'initial',
					'-ms-filter': 'initial',
					'-moz-filter': 'initial'
				}).show();
				$(canvasLeft).hide();
				$(canvasRight).hide(); $slide.css('background-image', 'url(jiexili_h.jpg)');
				$slideImg.attr('src', 'jiexili_l.jpg');
			},
			onChange: function(moveY, $slide, isStart) {
				var $slideImg = $slide.find('img');
				if( isStart ){
					$slideImg.css('opacity', 1);
					$slideImg.animate({'opacity': moveY / leftHeight}, self.animateTime);
				} else {
					$slideImg.css('opacity', moveY / leftHeight);
				}
			}
		};

		//色彩
		var color_performance = {
			init: function($slide) {
				var $slideImg = $slide.find('img');
				$slide.css('background-image', 'none');
				$slideImg.css({
					opacity: 1,
					'filter': 'initial',
					'-webkit-filter': 'initial',
					'-ms-filter': 'initial',
					'-moz-filter': 'initial'
				}).show();
				$(canvasLeft).hide();
				$(canvasRight).hide();
				$slideImg.attr('src', 'color.jpg');
			},
			onChange: function(moveY, $slide, isStart) {
				//min 20, max 100
				//if( moveY != 0 ){
				var $slideImg = $slide.find('img');
				var _val = (1 - moveY / leftHeight) * (100 - 20) + 20;
				$slideImg.stop();

				if( isStart ){
					$slideImg.removeClass('smooth_slide').css({
						'filter': 'saturate(0%)',
						'-webkit-filter': 'saturate(0%)',
						'-ms-filter': 'saturate(0%)',
						'-moz-filter': 'saturate(0%)'
					});
					setTimeout(function(){
						$slideImg.addClass('smooth_slide').css({
							'filter': 'saturate(' + _val + '%)',
							'-webkit-filter': 'saturate(' + _val + '%)',
							'-ms-filter': 'saturate(' + _val + '%)',
							'-moz-filter': 'saturate(' + _val + '%)'
						});
					}, 10);
				} else {
					$slideImg.removeClass('smooth_slide').css({
						'filter': 'saturate(' + _val + '%)',
						'-webkit-filter': 'saturate(' + _val + '%)',
						'-ms-filter': 'saturate(' + _val + '%)',
						'-moz-filter': 'saturate(' + _val + '%)'
					});
				}
				//}
			}
		};

		//曝光
		var exposure_value = {
			init: function($slide) {
				var $slideImg = $slide.find('img');
				$slideImg.show();
				$slideImg.css({
					opacity: 1,
					'filter': 'initial',
					'-webkit-filter': 'initial',
					'-ms-filter': 'initial',
					'-moz-filter': 'initial'
				}).show();
				$(canvasLeft).hide();
				$(canvasRight).hide();
				//$slide.css('background-image', 'url(light_h.jpg)');
				$slideImg.attr('src', 'light_h.jpg');
			},
			onChange: function(moveY, $slide, isStart) {
				//min 20, max 120
				var $slideImg = $slide.find('img');
				var _val = (1 - moveY / leftHeight) * (120 - 20) + 20;
				//$slideImg.css('opacity', moveY / leftHeight);
				if( isStart ){
					$slideImg.removeClass('smooth_slide').css({
						'filter': 'brightness(0%)',
						'-webkit-filter': 'brightness(0%)',
						'-ms-filter': 'brightness(0%)',
						'-moz-filter': 'brightness(0%)'
					});
					setTimeout(function(){
						$slideImg.addClass('smooth_slide').css({
							'filter': 'brightness(' + _val + '%)',
							'-webkit-filter': 'brightness(' + _val + '%)',
							'-ms-filter': 'brightness(' + _val + '%)',
							'-moz-filter': 'brightness(' + _val + '%)'
						});
					}, 10);
				} else {
					$slideImg.removeClass('smooth_slide').css({
						'-moz-transition': 'none',
						'filter': 'brightness(' + _val + '%)',
						'-webkit-filter': 'brightness(' + _val + '%)',
						'-ms-filter': 'brightness(' + _val + '%)',
						'-moz-filter': 'brightness(' + _val + '%)'
					});
				}
			}
		};

		//噪点
		function createNoise(canvas, ctx){
			var image = new Image();
			//var canvas = $slide.find('canvas')[0];
			//var ctx = canvas.getContext('2d');
			canvas.width = leftWidth;
			canvas.height = leftHeight;
			image.width = leftWidth;
			image.height = leftHeight;
			return image;
		}
		var imageLeft = createNoise(canvasLeft, ctxLeft);	
		var imageRight = createNoise(canvasRight, ctxLeft);	

		//var noise_img = $('#noise_img');
		imageLeft.onload = function() {
			ctxLeft.drawImage(imageLeft, 0, 0, leftWidth, leftHeight);
			imageDataLeft = ctxLeft.getImageData(0, 0, leftWidth, leftHeight);
			window._id = imageDataLeft.data;
			originDataLeft = noise_density.copyImageData(ctxLeft, imageDataLeft.data);
		};
		imageLeft.src = '/image/noise.jpg';
		//imageLeft.src = NOISEIMG;

		imageRight.onload = function() {
			ctxRight.drawImage(imageRight, 0, 0, leftWidth, leftHeight);
			imageDataRight = ctxRight.getImageData(0, 0, leftWidth, leftHeight);
			window._id = imageDataRight.data;
			originDataRight = noise_density.copyImageData(ctxRight, imageDataRight.data);
		};
		imageRight.src = '/image/noise.jpg';
		//imageRight.src = NOISEIMG;

		var noise_density = {
			width: leftWidth,
			height: leftHeight,
			init: function($slide, canvas) {
				var $slideImg = $slide.find('img');
				$slideImg.hide();
				$(canvas).show();
			},
			onChange: function(moveY, ctx, imageData, originData, isStart) {
				if( isStart ){
					var timer = null;
					var R = moveY / this.height * 100;
					var nowR = 100;
					var This = this;
					timer = setInterval(function(){
						if( nowR <= R ) {
							clearInterval(timer);
							return false;
						}

						var data = This.copyImageData(ctx, originData);
						for (var x = 0; x < This.width; x++) {
							for (var y = 0; y < This.height; y++) {
								var realI = y * This.width + x;
								for (var j = 0; j < 3; j++) {
									var rand = parseInt(Math.random() * nowR * 2) - nowR;
									data[realI * 4 + j] += rand;
								}
							}
						}
						nowR -= 10;

						imageData.data.set(data);
						ctx.putImageData(imageData, 0, 0);
					}, 20);
				} else {
					var R = moveY / this.height * 100;

					var data = this.copyImageData(ctx, originData);
					for (var x = 0; x < this.width; x++) {
						for (var y = 0; y < this.height; y++) {
							var realI = y * this.width + x;
							for (var j = 0; j < 3; j++) {
								var rand = parseInt(Math.random() * R * 2) - R;
								data[realI * 4 + j] += rand;
							}
						}
					}

					imageData.data.set(data);
					ctx.putImageData(imageData, 0, 0);
				}
			},
			copyImageData: function(ctx, imageData) {
				var dst = ctx.createImageData(this.width, this.height);
				//dst.data = imageData;
				//var dst = ctx.getImageData(0, 0, 290, 500);
				if( dst.data.set ){
					dst.data.set(imageData);
					return dst.data;
				} else {
				}
			}
		};

		var _data = {}, isLoading = false;
		self.lineChartInit = function(isStart) {

			if( self.checkIE() ){
				$('.chart_opt').after('<div class="alert_dom">*你的浏览器版本不支持此功能</div>');
			}

			if(isLoading == true) {
				return false;
			}	
			$lineChart.off('mouseenter').off('mouseleave').html('');
			//F.loading($lineChart);

			var requestData = {id: []};
			if(!_data[self.currentMobile]) {
				requestData.id.push(self.mobile2id[self.currentMobile]);
			}
			if(!_data[self.otherMobile_3]) {
				requestData.id.push(self.mobile2id[self.otherMobile_3]);
			}
			if(requestData.id.length) {
				isLoading = true;
				// ajax
				requestData.id = requestData.id.join(',');
				$.ajax({
					url: '/data/cameraAnalysis',
					data: requestData,
					dataType: 'json',
					success: function(json) {
						isLoading = false;
						_data[self.currentMobile] = _data[self.currentMobile] || json.message[self.currentMobile];
						_data[self.otherMobile_3] = json.message[self.otherMobile_3];
						_init([_data[self.currentMobile], _data[self.otherMobile_3]], isStart);
					}
				})
			} else {
				_init([_data[self.currentMobile], _data[self.otherMobile_3]], isStart);
			}
		};

		self.lineChartInit(true);
	},

	//棚拍对比
	initCameraCompare: function() {
		var self = this;
		var $wrap = this.$container.find('.camera_compare_wrap');
		var $leftWrap = $wrap.find('.left_w');
		var $picBig = $wrap.find('.big_pic');
		var $picBigHandler = $picBig.find('.handler');
		var $pic1 = $wrap.find('.pic_1');
		var $pic2 = $wrap.find('.pic_2');
		var $detail1 = $wrap.find('.detail1');
		var $detail2 = $wrap.find('.detail2');

		var pieceNum = 10;
		var bigW = $picBig.width();
		var bigH = $picBig.height();
		var picW = $pic1.width();
		var picH = $pic1.height();

		var $exif = $wrap.find('.exif');
		/*$exif.on('mouseenter', function(){
			var $exifCon = $(this).siblings('.detail');
			$exifCon.stop().fadeIn();
			$exifCon.on('mouseleave', function(){
				$(this).stop().fadeOut();
			});
		});*/

		//插入dom树
		var _html1 = '',
			_html2 = '';
		for (var i = 0; i < pieceNum; i++) {
			for (var j = 0; j < pieceNum; j++) {
				_html1 += '<li></li>';
				_html2 += '<li></li>';
			}
		}

		$pic1.append('<ul style="width:' + pieceNum * picW + 'px;">' + _html1 + '</ul>');
		$pic2.append('<ul style="width:' + pieceNum * picW + 'px;">' + _html2 + '</ul>');

		var $pic1_inner = $pic1.find('ul');
		var $pic2_inner = $pic2.find('ul');
		var $picList1 = $pic1.find('li');
		var $picList2 = $pic2.find('li');

		//事件
		$picBigHandler[0].onmousedown = function(e) {
			var $this = $(this);
			var offset = $picBig.offset();
			var w = this.offsetWidth;
			var h = this.offsetHeight;

			//计算窗口最大值
			var maxLeft = (bigW - w / 2);
			var maxTop = (bigH - h / 2);

			var lastMoveTime = +new Date();

			//F.ga('buttoan', 'click', 'tools_camera_studio_handler');

			document.onmousemove = function(e) {
				var nowMoveTime = +new Date();

				var mouseP = F.getMousePos(e, $picBig);
				var moveX = mouseP.x; //鼠标距obj左边框的距离
				var moveY = mouseP.y; //鼠标距obj上边框的距离

				moveX < w / 2 && (moveX = w / 2);
				moveY < h / 2 && (moveY = h / 2);

				moveX > maxLeft && (moveX = maxLeft);
				moveY > maxTop && (moveY = maxTop);

				$this.css('left', moveX - w / 2);
				$this.css('top', moveY - h / 2);

				changePos(moveX - w / 2, moveY - h / 2, true);
				return false;
			}

			document.onmouseup = function() {
				document.onmousemove = null; //设为 null 是为防止内存泄露
				document.onmousedown = null;
				this.releaseCapture && this.releaseCapture(); //释放鼠标捕获
			};

			this.setCapture && this.setCapture(); //鼠标捕获
			return false;

		};

		$picBig[0].onclick = function(e) {
			var offset = $picBig.offset();
			var w = $picBigHandler[0].offsetWidth;
			var h = $picBigHandler[0].offsetHeight;
			var mouseP = F.getMousePos(e, $picBig);
			var moveX = mouseP.x; //鼠标距obj左边框的距离
			var moveY = mouseP.y; //鼠标距obj上边框的距离
			//窗口最大值
			var maxLeft = bigW - w / 2;
			var maxTop = bigH - h / 2;

			moveX < w / 2 && (moveX = w / 2);
			moveY < h / 2 && (moveY = h / 2);

			moveX > maxLeft && (moveX = maxLeft);
			moveY > maxTop && (moveY = maxTop);

			$picBigHandler.css('left', moveX - w / 2);
			$picBigHandler.css('top', moveY - h / 2);

			changePos(moveX - w / 2, moveY - h / 2);

			return false;
		}

		var _picMove = function(e) {
			var $dom = $(this).find('ul');
			var mouseP = F.getMousePos(e);
			var _pageX = mouseP.x;
			var _pageY = mouseP.y;
			var _left = parseInt($dom.css('left')) || 0;
			var _top = parseInt($dom.css('top')) || 0;
			var maxLeft = -(pieceNum-1)*picW;
			var maxTop = -(pieceNum-1)*picH;
			document.onmousemove = function(e) {
				var mouseP = F.getMousePos(e);
				var moveX = _left + mouseP.x - _pageX; 
				var moveY = _top + mouseP.y - _pageY; 
				
				moveX < maxLeft && (moveX = maxLeft);
				moveY < maxTop && (moveY = maxTop);
				moveX > 0 && (moveX = 0);
				moveY > 0 && (moveY = 0);

				var x = -moveX/rx, y = -moveY/ry;

				$picBigHandler.css('left', x);
				$picBigHandler.css('top', y);
				changePos(x, y);

				return false;
			}

			document.onmouseup = function() {
				document.onmousemove = null; //设为 null 是为防止内存泄露
				document.onmousedown = null;
				this.releaseCapture && this.releaseCapture(); //释放鼠标捕获
			};

			this.setCapture && this.setCapture(); //鼠标捕获
			return false;
		
		};

		$pic1[0].onmousedown = _picMove;
		$pic2[0].onmousedown = _picMove;

		var rx = picW * pieceNum / bigW;
		var ry = picH * pieceNum / bigH;
		
		//改变小图的位置
		var timer = null;
		function changePos(x, y, isMouseMove) {
			var _left = x * rx;
			var _top = y * ry;
			
			_left > picW*(pieceNum-1) && (_left = picW*(pieceNum-1));
			_top > picH*(pieceNum-1) && (_top = picH*(pieceNum-1));
			
			$pic1_inner.css({
				left: -Math.round(_left),
				top: -Math.round(_top)
			});
			$pic2_inner.css({
				left: -Math.round(_left),
				top: -Math.round(_top)
			});

			if(isMouseMove) {
				clearTimeout(timer);
				timer = setTimeout(function() {
					showPic(_left, _top);
				}, 100);
			}else {
				showPic(_left, _top);
			}
		};

		var current_x = 0, current_y = 0;
		function showPic(x, y) {
			var _x = Math.floor(x / picW);
			var _y = Math.floor(y / picH);
			var _list = [];

			current_x = x, current_y = y;

			_list.push($picList1.eq(_x + _y * pieceNum));
			_list.push($picList1.eq((_x + 1) + _y * pieceNum));
			_list.push($picList1.eq(_x + (_y + 1) * pieceNum));
			_list.push($picList1.eq((_x + 1) + (_y + 1) * pieceNum));

			_list.push($picList2.eq(_x + _y * pieceNum));
			_list.push($picList2.eq((_x + 1) + _y * pieceNum));
			_list.push($picList2.eq(_x + (_y + 1) * pieceNum));
			_list.push($picList2.eq((_x + 1) + (_y + 1) * pieceNum));

			$.each(_list, function(i, $item) {
				if ($item.length && !$item.data('done')) {
					var image = new Image();
					image.src = $item.attr('src');
					image.onload = function() {
						//F.unloading($item);
						if($item.data('loading') == true) {
							$item.css('background-image', 'url('+$item.attr('src')+')');
						}
						$item.data('loading', false);
					};

					//F.loading($item);
					$item.data('loading', true);
					
					$item.data('done', true);
				}
			});
		}

		//光亮选项
		var currentType = 1; // 1=明亮，2=较暗，3=弱光
		var $lightSel = $wrap.find('.light_select a');
		$lightSel.on('click', function() {
			var oindex = $(this).index('.light_select a');
			var _index =  oindex + 1;
			currentType = _index;
			self.cameraCompareInit();
			var activePos = -350; 
			var normalPos = -497; 
			var yActive =  -oindex * 49 + activePos;
			$lightSel.removeClass('active').each(function(i, item){
				var yNormal = -i * 49 + normalPos;
				$(item).css({'background-position': '60px ' + yNormal + 'px'}); 	
			});
			$(this).addClass('active').css({'background-position': '60px ' + yActive + 'px'});
			
			switch(currentType) {
				case 1:
					F.ga('button', 'click', 'picture_bright');
					break;
				case 2:
					F.ga('button', 'click', 'picture_middle');
					break;
				case 3:
					F.ga('button', 'click', 'picture_dark');
					break;
			}	
			return false;
		});

		//机型多选
		this.cameraCompareSelector = new self.select({
			dom: $wrap.find('.mobile_selector'),
			data: (function() {
				var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				//F.ga('button', 'click', 'tools_camera_studio_mobile_switch');
				self.mobile2id[$(dom).text()] = $(dom).data('id');
				self.id2mobile[$(dom).data('id')] = $(dom).text();
				self.otherMobile_2 = $(dom).text();
				self.cameraCompareInit();
			}
		});
		function _init(data1, data2) {
			F.loadImg(data1.thumbnail, function() {
				F.unloading($picBig);
				$picBigHandler.show();
				$picBig.css('background-image', 'url('+data1.thumbnail+')');
			});
			$picList1.each(function(i, item) {
				var $item = $(item);
				$item.data('done', false);
				$item.attr('src', data1.list[i]);
			});
			$picList2.each(function(i, item) {
				var $item = $(item);
				$item.data('done', false);
				$item.attr('src', data2.list[i]);
			});
			
			//初始化位置
			if(!current_x || !current_y) {
				var _l = (bigW - bigW/pieceNum)/2;
				var _h = (bigH - bigH/pieceNum)/2;
				$picBigHandler.css({left: _l, top: _h});
				changePos(_l, _h);
			}else {
				showPic(current_x, current_y);
			}

			//更变信息
			$.each(data1.exif, function(i, item) {
				(i == 'aperture' && item) && (item = 'F/' + item);
				$detail1.find('.'+i).text(item);
			});
			$.each(data2.exif, function(i, item) {
				(i == 'aperture' && item) && (item = 'F/' + item);
				$detail2.find('.'+i).text(item);
			});
		};

		//exif 事件
		$exif.on('mouseenter', function() {
			$exif.css({'background-position': '25px -256px'});
			$detail1.show();
			$detail2.show();
		}).on('mouseleave', function() {
			$exif.css({'background-position': '25px -4px'});
			$detail1.hide();
			$detail2.hide();
		});

		var _data = {}, isLoading = false;
		this.cameraCompareInit = function() {
			if(isLoading == true) {
				return ;
			}

			F.ga('button', 'click', 'picture_compare');

			F.loading($picBig, 'blackNew');
			//F.loading($picList1);
			//F.loading($picList2);
			switch (currentType){
				case 1:
					compareType = 'high_light';
					break;
				case 2:
					compareType = 'light';
					break;
				case 3:
					compareType = 'low_light';
					break;
				default:
					compareType = 'high_light';
			}
			//compareType = compareType ? compareType : 'high_light';
			var requestData = {id: [], type: compareType};

			if(_data[self.currentMobile]) {
				if(!_data[self.currentMobile][currentType]) {
					requestData.id.push(self.mobile2id[self.currentMobile]);
				}
			} else {
				requestData.id.push(self.mobile2id[self.currentMobile]);
			}
			if(_data[self.otherMobile_2]) {
				if(!_data[self.otherMobile_2][currentType]) {
					requestData.id.push(self.mobile2id[self.otherMobile_2]);
				}
			} else {
				requestData.id.push(self.mobile2id[self.otherMobile_2]);
			}
			if(requestData.id.length) {
				isLoading = true;
				// ajax
				requestData.id = requestData.id.join(',');
				$.ajax({
					url: '/data/cameraSample',
					data: requestData,
					dataType: 'json',
					success: function(json) {
						isLoading = false;
						_data[self.currentMobile] ? '' : _data[self.currentMobile] = {};
						_data[self.otherMobile_2] ? '' : _data[self.otherMobile_2] = {};

						_data[self.currentMobile][currentType] = _data[self.currentMobile][currentType] || json.message[self.currentMobile];
						_data[self.otherMobile_2][currentType] = json.message[self.otherMobile_2];
						_init(_data[self.currentMobile][currentType], _data[self.otherMobile_2][currentType]);
					}
				});
				
			} else {
				_init(_data[self.currentMobile][currentType], _data[self.otherMobile_2][currentType]);
			}
		};
		self.cameraCompareInit();
	},

	//样张对比
	initRealPic: function() {
		var self = this;
		var $wrap = this.$realPicWrap;
		var $pic1 = $wrap.find('.pic_1');
		var $pic2 = $wrap.find('.pic_2');
		var $exif1 = $pic1.find('.exif');
		var $exif2 = $pic2.find('.exif');
		var $bigBtn = $wrap.find('.big_btn');
		var $download = $wrap.find('.download');
		var $list = $wrap.find('.pic_nav ul');
		var $prev = $wrap.find('.pic_nav .nav_prev');
		var $next = $wrap.find('.pic_nav .nav_next');

		var $bigWrap = $('body').find('.big_real_pic_wrap');
		var $resumeBtn = $bigWrap.find('.resume_btn');
		var $bigPic1 = $bigWrap.find('.big_pic_1');
		var $bigPic2 = $bigWrap.find('.big_pic_2');
		var $bigDownload = $bigWrap.find('.download');
		//_currentInfo是下面图片列表中的当前选中图片的下标
		var _currentInfo = {
			id: 0,
			index: 0
		};
		var _data = {};
		
		var src1, src2;
		var _init = function(list, isBig) {
			//初始化list
			if(list) {
				var _html = '';
				$.each(list, function(i, item) {
					_html += '<li data-id="'+ item.id +'" style="background-image:url('+ item.img +')"></li>';
				});	

				$list.append(_html);

				if(list.length<12) {
					$prev.hide();
					$next.hide();
				}
			}

			if(isBig) {
				src1 = _data[self.currentMobile]['list'][_currentInfo.id];
				src2 = _data[self.otherMobile_1]['list'][_currentInfo.id];

				src1 && (src1 = src1['bmiddle']);
				src2 && (src2 = src2['bmiddle']);

				_setPic(true);
				//$list.find('li').eq(_currentInfo.index).trigger('click');
			}else {
				$list.find('li').eq(_currentInfo.index).trigger('click');
			}
		};
		
		//设置比较图和放大的图像
		var _setPic = function(isBig) {
			var $dom1 = isBig ? $bigPic1 : $pic1;
			var $dom2 = isBig ? $bigPic2 : $pic2;

			if(src1 && $dom1.data('src') != src1) {
				F.loading($dom1, 'blackNew', true);
				F.loadImg(src1, function() {
					F.unloading($dom1);
					isBig?
						$dom1.data('src', src1).find('img').attr('src', src1).show()
					:
						$dom1.css('background-image', 'url('+ src1 +')').data('src', src1);
				});
			}else {
				F.unloading($dom1);
				$bigPic1.find('img').show();
			}

			if(src2 && $dom2.data('src') != src2) {
				F.loading($dom2, 'blackNew', true);
				F.loadImg(src2, function() {
					F.unloading($dom2);
					isBig?
						$dom2.data('src', src2).find('img').attr('src', src2).show()
					:
						$dom2.css('background-image', 'url('+ src2 +')').data('src', src2);
				});
			}else {
				F.unloading($dom2);
				$bigPic2.find('img').show();
			}
		};

		var _setExif = function(exif1, exif2) {
			if( exif1 ){
				$.each(exif1, function(i, item) {
					(i == 'aperture' && item) && (item = 'F/' + item);
					$exif1.find('.'+i).text(item);
				});
			} else {
				$exif1.siblings('.tip_icon').remove();
				$exif1.remove();
				$bigWrap.find('.download.dl_pic1').remove();
			}

			if( exif2 ){
				$.each(exif2, function(i, item) {
					(i == 'aperture' && item) && (item = 'F/' + item);
					$exif2.find('.'+i).text(item);
				});
			} else {
				$exif2.siblings('.tip_icon').remove();
				$exif2.remove();
				$bigWrap.find('.download.dl_pic2').remove();
			}
		};

		var _index = 0; //目前显示照片的下标	
		//thumbnail 点击事件
		$list.on('click', 'li', function() {
			var _id = $(this).data('id');
			_index = $(this).index();
			var data1 = _data[self.currentMobile]['list'][_id];
			var data2 = _data[self.otherMobile_1]['list'][_id];
			var _src1, _src2, exif1, exif2;

			//F.ga('label', 'click', 'tools_camera_realpic_switch');
			F.ga('button', 'click', 'photo_switch');

			if(data1) {
				_src1 = data1['thumbnail'];
				exif1 = data1['exif'];
			}
			if(data2) {
				_src2 = data2['thumbnail'];
				exif2 = data2['exif'];
			}

			$(this).siblings('li').removeClass('active');
			$(this).addClass('active');

			src1 = _src1;
			src2 = _src2;
			_setPic();
			_setExif(exif1, exif2);

			_currentInfo.id = _id;
			_currentInfo.index = _index;
		});
		
		var $realPic = $wrap.find('.real_pic');

		//$realPic.on('mouseenter', function(){
		$wrap.find('.pic_nav').on('mouseenter', function(){
			var $items = $list.find('li');
			_index = $list.find('li.active').index();
			//键盘切换图片
			$(document).on('keydown', function(e) {
				if(e.keyCode == 37 || e.keyCode == 38) { //left
					$prev.trigger('click');
					if( _index == 0 ) return false;
					_index--;
				}
				else if(e.keyCode == 40 || e.keyCode == 39) { //right
					$next.trigger('click');
					if( _index == $items.length - 1 ) return false;
					_index++;
				}
				
				$items.eq(_index).trigger('click');
				return false;
			});
			
			//鼠标滚轮切换图片，高版本的火狐触发mousewheel，但没有e.originalEvent.wheelDelta
			$(document.body).on('mousewheel', function(e){
				if( e.originalEvent.wheelDelta ){
					if( e.originalEvent.wheelDelta > 0 ){

						$prev.trigger('click');
						if( _index == 0 ) return false;
						_index--;

					} else if( e.originalEvent.wheelDelta < 0 ){

						$next.trigger('click');
						if( _index == $items.length - 1 ) return false;
						_index++;
					}
					$items.eq(_index).trigger('click');

				} else {
					$(document.body).trigger('DOMMouseScroll');
				}
				return false;
			});
			
			//对于火狐
			$(document.body).on('DOMMouseScroll', function(e){
				if( e.originalEvent.detail < 0 ){
					$prev.trigger('click');
					if( _index == 0 ) return false;
					_index--;
				} else {
					$prev.trigger('click');
					if( _index == $items.length - 1 ) return false;
					_index++;
				}
				$items.eq(_index).trigger('click');
				return false;
			});
		});
		//$realPic.on('mouseleave', function(){
		$wrap.find('.pic_nav').on('mouseleave', function(){
			$(document).off('keydown');
			$(document.body).off('DOMMouseScroll');
			$(document.body).off('mousewheel');
		});
		
		var maxLeft = 0, step = 78;
		$prev.on('click', function() {
			var left = parseInt($list.css('margin-left'));
			left = left + step;

			left > maxLeft && (left = maxLeft);

			$list.stop().animate({'margin-left': left+'px'}, 'fast');

			return false;
		});

		var minLeft; 
		$next.on('click', function() {
			var left = parseInt($list.css('margin-left'));
			left = left - step;

			if(minLeft == undefined) {
				var $li = $list.find('li');
				var _w = $li[0].offsetWidth, _l = $li.length;
				minLeft = -(_w*_l - parseInt($list.parent().width())); 
			}

			left < minLeft && (left = minLeft);

			$list.stop().animate({'margin-left': left+'px'}, 'fast');

			return false;
		});
		
		//下载
		var $link = $('<a target="_blank">');
		$download.on('click', function() {
			var $this = $(this);
			var src;

			//F.ga('button', 'click', 'tools_camera_realpic_download');

			if($this.hasClass('dl_pic1')) {
				src = _data[self.currentMobile]['list'][_currentInfo.id]['original'];
			} else {
				src = _data[self.otherMobile_1]['list'][_currentInfo.id]['original'];
			}

			$link.attr('href', src)[0].click();
		});

		$bigDownload.on('click', function() {
			var $this = $(this);
			var src;

			//F.ga('button', 'click', 'tools_camera_realpic_download');

			if($this.hasClass('dl_pic1')) {
				src = _data[self.currentMobile]['list'][_currentInfo.id]['original'];
			} else {
				src = _data[self.otherMobile_1]['list'][_currentInfo.id]['original'];
			}

			$link.attr('href', src)[0].click();
		});
		//放大
		$bigBtn.on('click', function() {
			var _imgWidth = $('body').width()*0.49;
			$('.side_btn').hide();

			F.ga('button', 'click', 'photo_fullscreen');

			$bigWrap.show();
			$bigWrap.find('.big_inner').css('margin-top', -(_imgWidth*3/4)/2 - 32/2);
			$bigWrap.find('.big_pic_1, .big_pic_2').height(_imgWidth*3/4);

			self.realPicBigSelector.$select.find('.list_like ul li').each(function(i, item) {
				
				if($(item).text() == self.otherMobile_1) {
					$(item).attr('isclick', 'no');
					$(item).trigger('click');
					return false;
				}
			});

			return false;
		});

		//缩小
		$resumeBtn.on('click', function() {
			$('.side_btn').show();
			$bigWrap.hide();	
			$bigPic1.find('img').hide();
			$bigPic2.find('img').hide();

			//F.ga('button', 'click', 'tools_camera_realpic_shrinkscreen');

			self.realPicSelector.$select.find('.list_like ul li').each(function(i, item) {
				if($(item).text() == self.otherMobile_1) {
					$(item).attr('isclick', 'no');
					$(item).trigger('click');
					return false;
				}
			});
			return false;
		});

		//exif
		self.$realPicWrap.on('mouseenter', '.tip_icon', function() {
			self.$realPicWrap.find('.tip_icon').css({'background-position': '-8px -263px'});
			self.$realPicWrap.find('.exif.detail').show();
		});
		self.$realPicWrap.on('mouseleave', '.exif.detail', function() {
			self.$realPicWrap.find('.tip_icon').css({'background-position': '-8px -1386px'});
			self.$realPicWrap.find('.exif.detail').hide();
		});

		//机型多选
		self.realPicSelector = new self.select({
			dom: $wrap.find('.mobile_selector'),
			data: (function() {
				var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				//F.ga('button', 'click', 'tools_camera_realpic_mobile_switch');
				self.mobile2id[$(dom).text()] = $(dom).data('id');
				self.id2mobile[$(dom).data('id')] = $(dom).text();
				//自定义列表可能会改变，此时也要同时改变放大图像的自定义列表
				self.realPicBigSelector.$select.find('.list_like ul').html(self.realPicSelector.$select.find('.list_like ul').html());
				self.otherMobile_1 = $(dom).text();
				self.realPicInit();
			}
		});

		//放大后的机型多选
		self.realPicBigSelector = new self.select({
			dom: $('.big_real_pic_wrap .mobile_selector'),
			data: (function() {
				var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				//F.ga('button', 'click', 'tools_camera_realpic_mobile_switch');
				self.mobile2id[$(dom).text()] = $(dom).data('id');
				self.id2mobile[$(dom).data('id')] = $(dom).text();
				self.realPicSelector.$select.find('.list_like ul').html(self.realPicBigSelector.$select.find('.list_like ul').html());
				self.otherMobile_1 = $(dom).text();
				self.realPicInit(true);
			}
		});
		
		self.realPicInit = function(isBig) {
			F.ga('button', 'click', 'photo_compare');
			var requestData = {id: [], type: 'landscape'};
			
			if(!_data[self.otherMobile_1]) {
				requestData.id.push(self.mobile2id[self.otherMobile_1]);
			}
			if(!_data[self.currentMobile]) {
				requestData.id.push(self.mobile2id[self.currentMobile]);
			}
			if(requestData.id.length) {
				F.loading( isBig ? $bigPic1 : $pic1, 'blackNew', true);
				F.loading( isBig ? $bigPic2 : $pic2, 'blackNew', true);

				// ajax
				requestData.id = requestData.id.join(',');

				$.get('/data/cameraSample', requestData, function(json){
					//两部手机都没有样张的情况下
					if( json.status == 404 ){
						var $toolsHead = $(".tools .post_camera_head");
						var $headTabs = $toolsHead.find('.head_tabs');

						$headTabs.find('li.active').remove();
						$headTabs.find('[data-tab=shed]').addClass('active');

						$('.camera_tools_wrap').find('.wrap_tab_example').remove();
						$('.camera_tools_wrap').find('.wrap_tab_shed').addClass('active');
					} else {
						_data[self.currentMobile] = _data[self.currentMobile] || json.message[self.currentMobile];
						_data[self.otherMobile_1] = json.message[self.otherMobile_1];
						var noPic = 'no_pic.jpg';
						var noPicBig = 'no_pic_big.jpg';
						
						//其中一部手机没有样张的情况下
						if(!_data[self.currentMobile]) {
							_data[self.currentMobile] = makeNolist(_data[self.otherMobile_1]);	

						} else if( !_data[self.otherMobile_1] ){
							_data[self.otherMobile_1] = makeNolist(_data[self.currentMobile]);	
						}
						//当其中一部手机没有样张照片时
						function makeNolist(havedata){
							var nodata = {list: []};
							$.each(havedata['list'], function(i, item){
								var obj = {
									bmiddle: noPicBig,
									exif: null,
									original: noPicBig,
									thumbnail: noPic
								};
								nodata.list.push(obj);
							});
							return nodata;
						}
						_init(json.message.list, isBig);
					}
					self.$realPicWrap.css('visibility', 'visible');
					self.$container.data('done', true);
					self.$head.find('.head_loading').hide();
				}, 'json');

			} else {
				_init(null, isBig);
			}
		};
		/*self.realPicSelector.$select.find('.list_like ul li').each(function(i, item) {
			if($(item).text() == self.otherMobile_1) {
				$(item).trigger('click');
				return false;
			}
		});*/
	},
	//a对应c，b对应d，已知y(y值在c、d之间),求x(x在a、b之间)
	calculator: function(a, b, c, d, y) {
		return (y - c) * (b - a) / (d - c) + a;
	}
});
