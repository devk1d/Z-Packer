Z.define('data/screen', {
	initialize: function() {
		var self = this;

		self.currentMobile = window.mobile_name;
		self.otherMobile_0 = window.compMobileName; 
		self.otherMobile_1 = window.compMobileName; 
		self.otherMobile_2 = window.compMobileName; 
		self.otherMobile_3 = window.compMobileName; 
		self.$container = $('.screen_tools_wrap');
		self.$head = $('.post_screen_head');
		self.select = Z.require('data/tools').select;
		self._currentTab = 0;
		self._initAnimateTime = 800; //初始tab时动画的时间
		self.leftHeight = 500;
		self.leftWidth = parseInt(this.leftHeight*9/16);
		self.data = {};
		self.top_0 = 0;
		self.top_1 = 0;
		self.top_2 = 0;
		self.top_3 = 0;
		var firstSlide = true;

		$.get('/data/screen', {id: window.mobile_id}, function(json){ 
			if( json.status == 200 ){
				//$wrapCompare.html(json.message.html);
				self.$container.data('done', true);
				self.$head.find('.head_loading').hide();
				self.data[json.message[0]['mobile_phone']] = json.message[0];
				//self.data = json.message[0];
			}
		}, 'json');
		
		var ie6_8 = !$.support.leadingWhitespace;
		if(ie6_8) {
			self.$container.html('<div style="color:#fff;">抱歉，你使用的浏览器不支持此工具</div>');
		}

		self.$container.on('ga', function(){
			F.ga('button', 'click', 'screen');
		});

		self.$container.on('init', function() {
			if( firstSlide ){
				if(!ie6_8) {
					self.init(self.data);
				}
				$(self).off('init');
				self.bindEvent();
				firstSlide = false;
			} else {

			}
		});
	},

	init: function(data) {
		var self = this;
		self.setInch(data);	
		self.setLight(data);
		self.setColor(data);
		self.setShow(data);
	},
	bindEvent: function(){
		var self = this;
		var $toolsHead = $(".tools .post_screen_head");
		var $headTabs = $toolsHead.find('.head_tabs');
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
			$('.screen_tools_wrap').find('.wrap_tab.active').removeClass('active');
			$('.screen_tools_wrap').find('.wrap_tab_' + $this.data('tab')).addClass('active');

			if(_index == 0) self.initOpt_0();
			else if(_index == 1) self.initOpt_1();
			else if(_index == 2) self.initOpt_2();
			else if(_index == 3) self.initOpt_3();
		});
	},
	slide: function(opts) {
		var self = this;
		this.opts = $.extend({
			wrap: '',
			scale: [],
			height: 0,
			width: 0,
			onMove: function(moveY) {},
			onLeave: function() {}
		}, opts);
		this.opts.wrap.css('cursor', 'none');
		this.setDom = function() {
			this.$dom = $('<div class="slide"></div>').appendTo(this.opts.wrap);
			this.$handler = $('<div class="slide_handler"><div></div><div class="middle"></div><div></div></div>').appendTo(this.$dom);
			this.$handlerText = this.$handler.find('div.middle');

			//设置刻度
			var _spacing = (this.opts.height-1)/(this.opts.scale.length-1);
			var _top = -10;
			$.each(this.opts.scale, function(i, item) {
				self.$dom.append('<div class="scale" style="top: '+ (_spacing*i+_top) +'px;">' + item + '<div></div></div>');
			});
		};

		this.setHandler = function(html) {
			this.$handlerText.html(html);
		};

		this._initEvent = function() {
			var mouseMove = function(e) {
				self.$handler.stop();
				var moveY = F.getMousePos(e, self.$dom).y;

				if( moveY < 0 || moveY > self.opts.height) {
					return ;
				}

				self.opts.onMove(moveY<0?0:moveY);
				self.$handler.css('top', moveY);
			};
			this.opts.wrap.on('mouseenter', function() {
				$(this).on('mousemove', mouseMove);
			});

			this.opts.wrap.on('mouseleave', function(e) {
				var moveY = F.getMousePos(e, self.$dom).y;
				/*if( moveY < 0) {
					self.$handler.css('top', 0);
					self.opts.onMove(0);
				}else if(moveY > self.opts.height){
					self.$handler.css('top', self.opts.height);
					self.opts.onMove(self.opts.height);
				}*/

				self.opts.onLeave();

				$(this).off('mousemove', mouseMove);
				return false;
			});
		
		};

		this.setDom();
		this._initEvent();
	},
	//a对应c，b对应d，已知y(y值在c、d之间),求x(x在a、b之间)
	calculator: function(a, b, c, d, y) {
		return (y-c)*(b-a)/(d-c)+a;
	},

	setInch: function(data){
		var self = this;
		var $wrapToolsInch = self.$container.find('.wrap_tab_inch');
		var $inchLeft = $wrapToolsInch.find('.inch_left');
		var $inchRight = $wrapToolsInch.find('.inch_right');
		var $inchTip = $wrapToolsInch.find('.screen_tip');
		var $inchTipCont = $wrapToolsInch.find('.screen_tip_content');
		$inchTip.on('mouseenter', function(){
			$inchTipCont.fadeIn(300);
			$inchTip.on('mouseleave', function(){
				$inchTipCont.fadeOut(300);
			});
		});

		//机型多选
		self.scaleSelector_0 = new self.select({
			dom: $inchRight.find('.tool_compare'),
			data: (function() {
				/*var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;*/
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				//self.mobile2id[$(dom).text()] = $(dom).data('id');
				//self.id2mobile[$(dom).data('id')] = $(dom).text();
				self.otherMobile_0 = $(dom).text();
				self.initOpt_0();
			}
		});

		var showInch = function($inchWay, data){
			var $wayContent = $inchWay.find('.way_content');
			var $detailNum = $wayContent.find('.content_detail p');
			$wayContent.css({
				width: '162px',
				height: '288px'
			}); $wayContent.find('.content_width div').html(data.height);
			$wayContent.find('.content_height div').html(data.width);
			$detailNum.eq(0).html(data.inch + "''");
			$detailNum.eq(1).html(data.ppi+ "PPI");

			var rx = data.height;
			var ry = data.width;
			//避免与上面的css()方法冲突，延迟10毫秒执行
			setTimeout(function(){
				$wayContent.animate({
					//width: 290*(rx/1440),
					//height: 500*(ry/2560)
					width: ((rx/ry)*Math.sqrt(ry*ry/(rx*rx+ry*ry))*self.leftWidth*data.inch)/3.19,
					height: (Math.sqrt(ry*ry/(rx*rx+ry*ry))*self.leftHeight*data.inch)/5.67
				}, self._initAnimateTime);
			}, 10);	
		};

		self.initOpt_0 = function(){
			/*if( !cid ){
				cid = window.compMobileId;
			}*/
			//用data('id')获取无效
			var cid = self.scaleSelector_0.$defaultPhone.attr('data-id'); 
			if( !self.data[self.otherMobile_0] ){
				$.get('/data/screen', {id: cid}, function(json){ 
					if( json.status == 200 ){
						//showInch($inchLeft, data);
						self.data[json.message[0]['mobile_phone']] = json.message[0];
						showInch($inchLeft, self.data[self.currentMobile]);
						showInch($inchRight, json.message[0]);
					}
				}, 'json');
			} else {
				showInch($inchLeft, self.data[self.currentMobile]);
				showInch($inchRight, self.data[self.otherMobile_0]);
			}

			F.ga('button', 'click', 'screen_size');
		};
		self.initOpt_0();
	},

	setLight: function(data){
		var self = this;
		var maxVal = 700;
		var minVal = 100;
		var _data = {}; //机型对应的数值
		var _topData = {}; //机型对应的top值
		var $wrapLight = self.$container.find('.wrap_tab_light');
		var $contentLeft =  $wrapLight.find('.light_left .pic_content');
		var $contentRight =  $wrapLight.find('.light_right .pic_content');
		var picWidth = 290;
		var picHeight = 500;

		var $inchTip =  $wrapLight.find('.screen_tip');
		var $inchTipCont = $wrapLight.find('.screen_tip_content');
		$inchTip.on('mouseenter', function(){
			$inchTipCont.fadeIn(300);
			$inchTip.on('mouseleave', function(){
				$inchTipCont.fadeOut(300);
			});
		});
		//机型多选
		this.scaleSelector_1 = new self.select({
			dom: $wrapLight.find('.tool_compare'),
			data: (function() {
				/*var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;*/
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				self.otherMobile_1 = $(dom).text();
				self.initOpt_1();
			}
		});

		_data[data.mobile_phone] = data.light;
		_topData[data.mobile_phone] = Math.floor( (maxVal-data.light)*picHeight/(maxVal-minVal) );
		
		var lightValue = function($content){	
			var $mask = $content.find('.mask');
			var slide = new self.slide({
				wrap: $content,
				scale: ['700nits', '600nits', '500nits', '400nits', '300nits', '200nits', '100nits'],
				width: picWidth,
				height: picHeight,
				onMove: function(moveY) {
					var _mark = false, _arr = [];
					/*$.each(_topData, function(i, item) {
						if(item == moveY) {
							_arr.push(i);
							_mark = true;
						}
					});*/

					if(_mark) {
						var _html = _data[_arr[0]] + 'nits ';
						_html += '(' + _arr.join(',') + ')';
						slide.setHandler(_html);
					}else {
						slide.setHandler(Math.round(maxVal-(maxVal-minVal)/picHeight*moveY) + 'nits');
					}
					//变化亮度
					var _val = maxVal -(maxVal-minVal)*moveY/picHeight;

					if(_val<=700 && _val>=600) {
						_val = self.calculator(0, 0.05625, 700, 600, _val);
					}
					else if(_val<600 && _val>=500) {
						_val = self.calculator(0.05625, 0.11875, 600, 500, _val);
					}
					else if(_val<500 && _val>=400) {
						_val = self.calculator(0.11875, 0.2, 500, 400, _val);
					}
					else if(_val<400 && _val>=300) {
						_val = self.calculator(0.2, 0.30625, 400, 300, _val);
					}
					else if(_val<300 && _val>=200) {
						_val = self.calculator(0.30625, 0.41875, 300, 200, _val);
					}
					else if(_val<200 && _val>=100) {
						_val = self.calculator(0.41875, 0.5875, 200, 100, _val);
					}

					$mask.css('opacity', _val);
				},
				onLeave: function(){
					var _top  = (maxVal-$content.originTop)*picHeight/(maxVal-minVal);
					slide.$handler.stop().animate({
						'top' : _top
					}, self._initAnimateTime);
					slide.opts.onMove(_top);
					/*slide.$handler.stop().animate({
						'top': _top 
					}, {
						speed: self._initAnimateTime,
						step: function(top) {
							slide.opts.onMove(top);
						}
					});*/
				}
			});

			$content.initOpt = function(light){ 

				slide.$handler.css({'top': picHeight});
				//var _top = Math.floor( (maxVal-light)*picHeight/(maxVal-minVal) );
				var _top  = (maxVal-light)*picHeight/(maxVal-minVal);
				/*slide.$handler.stop().animate({
					'top' : _top
				}, self._initAnimateTime);
				slide.opts.onMove(_top);*/

				slide.$handler.stop().animate({
					'top': _top
				}, {
					speed: self._initAnimateTime,
					step: function(top) {
						slide.opts.onMove(top);
					}
				});
			};
			//$content.initOpt();
			$contentLeft.originTop = 0;
			$contentRight.originTop = 0;

			self.initOpt_1 = function(){ 
				var cid = self.scaleSelector_1.$defaultPhone.attr('data-id'); 
				if( !self.data[self.otherMobile_1] ){
					$.get('/data/screen', {id: cid}, function(json){ 
						if( json.status == 200 ){
							self.data[json.message[0]['mobile_phone']] = json.message[0];
							$contentLeft.originTop = self.data[self.currentMobile].light;
							$contentRight.originTop = self.data[self.otherMobile_1].light;
							$contentLeft.initOpt($contentLeft.originTop);
							$contentRight.initOpt($contentRight.originTop);
						}
					}, 'json');
				} else {
					$contentLeft.originTop = self.data[self.currentMobile].light;
					$contentRight.originTop = self.data[self.otherMobile_1].light;
					$contentLeft.initOpt($contentLeft.originTop);
					$contentRight.initOpt($contentRight.originTop);
					//$contentLeft.initOpt(self.data[self.currentMobile].light);
					//$contentRight.initOpt(self.data[self.otherMobile_1].light);
				}

				F.ga('button', 'click', 'screen_lux');
			};
		};

		lightValue($contentLeft);
		lightValue($contentRight);
	},

	setColor: function(data){
		var self = this;
		var maxVal = 9000;
		var minVal = 5500;
		var _data = {}; //机型对应的数值
		var _topData = {}; //机型对应的top值
		var $wrapColor = self.$container.find('.wrap_tab_color');
		var $contentLeft =  $wrapColor.find('.color_left .pic_content');
		var $contentRight =  $wrapColor.find('.color_right .pic_content');
		var picWidth = 290;
		var picHeight = 500;
		var changeVal = 6500;		

		var $inchTip =  $wrapColor.find('.screen_tip');
		var $inchTipCont = $wrapColor.find('.screen_tip_content');
		$inchTip.on('mouseenter', function(){
			$inchTipCont.fadeIn(300);
			$inchTip.on('mouseleave', function(){
				$inchTipCont.fadeOut(300);
			});
		});
		//机型多选
		this.scaleSelector_2 = new self.select({
			dom: $wrapColor.find('.tool_compare'),
			data: (function() {
				/*var _data = [];
				for (var i in self.mobile2id) {
					if (i != self.currentMobile)
						_data.push(i);
				}
				return _data;*/
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				self.otherMobile_2 = $(dom).text();
				self.initOpt_2();
			}
		});

		_data[data.mobile_phone] = data.color_temp;
		_topData[data.mobile_phone] = Math.floor( (maxVal-data.color_temp)*picHeight/(maxVal-minVal) );
		
		var showColor = function($content){	
			var $colorWarm = $content.find('.color_warm');
			var $colorOrigin= $content.find('.color_origin');
			var $colorCold= $content.find('.color_cold');
			var slide = new self.slide({
				wrap: $content,
				scale: ['9000K', '8500K', '8000K', '7500K', '7000K', '6500K', '6000K', '5500K'],
				width: picWidth,
				height: picHeight,
				onMove: function(moveY) {
					var _mark = false, _arr = [];
					/*$.each(_topData, function(i, item) {
						if(item == moveY) {
							_arr.push(i);
							_mark = true;
						}
					});*/

					if(_mark) {
						var _html = _data[_arr[0]] + 'k';
						_html += '(' + _arr.join(',') + ')';
						//slide.setHandler(_html);
					}else {
						slide.setHandler(Math.round(maxVal-(maxVal-minVal)/picHeight*moveY) + 'K');
					}
					//色温变化
					var _val = maxVal-(maxVal-minVal)*moveY/picHeight;
					var _changeVal;

					if(_val<=9000 && _val>=8500) {
						_changeVal = self.calculator(1, 0.825, 9000, 8500, _val);
					}
					else if(_val<8500 && _val>=8000) {
						_changeVal = self.calculator(0.825, 0.60, 8500, 8000, _val);
					}
					else if(_val<8000 && _val>=7500) {
						_changeVal = self.calculator(0.6, 0.43, 8000, 7500, _val);
					}
					else if(_val<7500 && _val>=7000) {
						_changeVal = self.calculator(0.43, 0.3, 7500, 7000, _val);
					}
					else if(_val<7000 && _val>=6500) {
						_changeVal = self.calculator(0.3, 0, 7000, 6500, _val);
					}
					else if(_val<6500 && _val>=6000) {
						_changeVal = self.calculator(0, 0.5, 6500, 6000, _val);
					}
					else if(_val<6000 && _val>=5500) {
						_changeVal = self.calculator(0.5, 1, 6000, 5500, _val);
					}

					if(_val > changeVal) {
						$colorWarm.css('opacity', 0);
						$colorCold.css({
							'opacity': _changeVal
						});
					} else if(_val < changeVal){
						$colorCold.css('opacity', 0);
						$colorWarm.css({
							'opacity': _changeVal
						});
					} else {
						$colorCold.css('opacity', 0);
						$colorWarm.css('opacity', 0);
					}
				},
				onLeave: function(){
					var _top  = (maxVal-$content.originTop)*picHeight/(maxVal-minVal);
					slide.$handler.stop().animate({
						'top' : _top
					}, self._initAnimateTime);
					slide.opts.onMove(_top);

					/*slide.$handler.stop().animate({
						'top': _top 
					}, {
						speed: self._initAnimateTime,
						step: function(top) {
							slide.opts.onMove(top);
						}
					});*/
				}
			});

			$content.initOpt = function(color_temp){ 

				slide.$handler.css({'top': picHeight});
				//var _top = Math.floor( (maxVal-color_temp)*picHeight/(maxVal-minVal) );
				var _top = (maxVal-color_temp)*picHeight/(maxVal-minVal);
				/*slide.$handler.stop().animate({
					'top' : _top
				}, self._initAnimateTime);
				slide.opts.onMove(_top);*/

				slide.$handler.stop().animate({
					'top': _top 
				}, {
					speed: self._initAnimateTime,
					step: function(top) {
						slide.opts.onMove(top);
					}
				});
			};
			//$content.initOpt();
			$contentLeft.originTop = 0;
			$contentRight.originTop = 0;

			self.initOpt_2 = function(cid){ 
				var cid = self.scaleSelector_2.$defaultPhone.attr('data-id'); 
				if( !self.data[self.otherMobile_2] ){
					$.get('/data/screen', {id: cid}, function(json){ 
						if( json.status == 200 ){
							self.data[json.message[0]['mobile_phone']] = json.message[0];

							$contentLeft.originTop = self.data[self.currentMobile].color_temp;
							$contentRight.originTop = self.data[self.otherMobile_1].color_temp;
							$contentLeft.originTop = $contentLeft.originTop > 9000 ? 9000 : $contentLeft.originTop;
							$contentRight.originTop = $contentRight.originTop > 9000 ? 9000 : $contentRight.originTop;
							$contentLeft.initOpt($contentLeft.originTop);
							$contentRight.initOpt($contentRight.originTop);

							//$contentLeft.initOpt(self.data[self.currentMobile].color_temp);
							//$contentRight.initOpt(self.data[self.otherMobile_2].color_temp);
						}
					}, 'json');
				} else {
					$contentLeft.originTop = self.data[self.currentMobile].color_temp;
					$contentRight.originTop = self.data[self.otherMobile_1].color_temp;
					$contentLeft.originTop = $contentLeft.originTop > 9000 ? 9000 : $contentLeft.originTop;
					$contentRight.originTop = $contentRight.originTop > 9000 ? 9000 : $contentRight.originTop;
					$contentLeft.initOpt($contentLeft.originTop);
					$contentRight.initOpt($contentRight.originTop);
					//$contentLeft.initOpt(self.data[self.currentMobile].color_temp);
					//$contentRight.initOpt(self.data[self.otherMobile_2].color_temp);
				}
				F.ga('button', 'click', 'screen_temp');
			};
		};

		showColor($contentLeft);
		showColor($contentRight);
	},

	setShow: function(data){
		var self = this;

		var _originColor = [
			{r:"255", g:"255", b:"255"},
			{r:"230", g:"230", b:"230"},
			{r:"222", g:"222", b:"222"},
			{r:"209", g:"209", b:"209"},
			{r:"196", g:"196", b:"196"},
			{r:"186", g:"186", b:"186"},
			{r:"184", g:"184", b:"184"},
			{r:"171", g:"171", b:"171"},
			{r:"158", g:"158", b:"158"},
			{r:"156", g:"156", b:"156"},
			{r:"143", g:"143", b:"143"},
			{r:"117", g:"117", b:"117"},
			{r:"107", g:"107", b:"107"},
			{r:"94", g:"94", b:"94"},
			{r:"84", g:"84", b:"84"},
			{r:"74", g:"74", b:"74"},
			{r:"54", g:"54", b:"54"},
			{r:"43", g:"43", b:"43"},
			{r:"0", g:"0", b:"0"},
			{r:"115", g:"82", b:"66"},
			{r:"194", g:"150", b:"130"},
			{r:"94", g:"122", b:"156"},
			{r:"89", g:"107", b:"66"},
			{r:"130", g:"128", b:"175"},
			{r:"99", g:"189", b:"168"},
			{r:"217", g:"120", b:"41"},
			{r:"74", g:"92", b:"163"},
			{r:"194", g:"84", b:"97"},
			{r:"92", g:"61", b:"107"},
			{r:"158", g:"186", b:"64"},
			{r:"230", g:"161", b:"46"},
			{r:"51", g:"61", b:"150"},
			{r:"71", g:"148", b:"71"},
			{r:"176", g:"48", b:"59"},
			{r:"237", g:"199", b:"33"},
			{r:"186", g:"84", b:"145"},
			{r:"0", g:"133", b:"163"},
			{r:"145", g:"28", b:"84"},
			{r:"74", g:"46", b:"71"},
			{r:"217", g:"209", b:"194"},
			{r:"112", g:"64", b:"38"},
			{r:"204", g:"138", b:"102"},
			{r:"89", g:"112", b:"130"},
			{r:"84", g:"97", b:"31"},
			{r:"128", g:"117", b:"145"},
			{r:"107", g:"181", b:"143"},
			{r:"255", g:"199", b:"153"},
			{r:"99", g:"28", b:"41"},
			{r:"191", g:"31", b:"74"},
			{r:"189", g:"128", b:"156"},
			{r:"110", g:"89", b:"138"},
			{r:"252", g:"199", b:"181"},
			{r:"232", g:"112", b:"0"},
			{r:"61", g:"79", b:"143"},
			{r:"199", g:"64", b:"69"},
			{r:"82", g:"38", b:"82"},
			{r:"168", g:"181", b:"0"},
			{r:"235", g:"150", b:"0"},
			{r:"214", g:"232", b:"181"},
			{r:"204", g:"0", b:"20"},
			{r:"87", g:"33", b:"54"},
			{r:"117", g:"31", b:"112"},
			{r:"0", g:"54", b:"89"},
			{r:"189", g:"219", b:"184"},
			{r:"13", g:"43", b:"117"},
			{r:"66", g:"140", b:"41"},
			{r:"178", g:"0", b:"26"},
			{r:"247", g:"191", b:"0"},
			{r:"194", g:"66", b:"122"},
			{r:"0", g:"128", b:"140"},
			{r:"232", g:"204", b:"191"},
			{r:"214", g:"117", b:"120"},
			{r:"191", g:"0", b:"38"},
			{r:"0", g:"125", b:"173"},
			{r:"84", g:"153", b:"173"},
			{r:"255", g:"199", b:"171"},
			{r:"191", g:"214", b:"194"},
			{r:"222", g:"117", b:"102"},
			{r:"240", g:"51", b:"38"},
			{r:"48", g:"161", b:"166"},
			{r:"0", g:"59", b:"69"},
			{r:"219", g:"212", b:"133"},
			{r:"255", g:"102", b:"0"},
			{r:"255", g:"161", b:"0"},
			{r:"0", g:"59", b:"51"},
			{r:"117", g:"148", b:"176"},
			{r:"219", g:"122", b:"71"},
			{r:"247", g:"171", b:"125"},
			{r:"199", g:"140", b:"92"},
			{r:"143", g:"92", b:"51"},
			{r:"207", g:"150", b:"115"},
			{r:"161", g:"87", b:"33"},
			{r:"214", g:"133", b:"92"},
			{r:"199", g:"178", b:"0"},
			{r:"255", g:"191", b:"0"},
			{r:"0", g:"161", b:"143"},
			{r:"0", g:"140", b:"117"},
			{r:"209", g:"138", b:"105"},
			{r:"250", g:"153", b:"115"},
			{r:"199", g:"143", b:"107"},
			{r:"201", g:"140", b:"107"},
			{r:"204", g:"143", b:"105"},
			{r:"122", g:"74", b:"38"},
			{r:"217", g:"140", b:"94"},
			{r:"184", g:"143", b:"23"},
			{r:"186", g:"178", b:"0"},
			{r:"64", g:"54", b:"36"},
			{r:"89", g:"161", b:"89"},
			{r:"0", g:"138", b:"79"},
			{r:"31", g:"64", b:"41"},
			{r:"59", g:"161", b:"110"},
			{r:"122", g:"156", b:"56"},
			{r:"51", g:"138", b:"26"},
			{r:"74", g:"168", b:"41"},
			{r:"201", g:"133", b:"43"},
			{r:"158", g:"150", b:"26"},
			{r:"166", g:"186", b:"0"},
			{r:"76", g:"43", b:"26"},
			{r:"255", g:"0", b:"0"},
			{r:"0", g:"255", b:"0"},
			{r:"0", g:"0", b:"255"},
			{r:"0", g:"255", b:"255"},
			{r:"255", g:"0", b:"255"},
			{r:"255", g:"255", b:"0"},
		];

		var $wrapShow = self.$container.find('.wrap_tab_show');
		var $inchTip = $wrapShow.find('.screen_tip');
		var $inchTipCont = $wrapShow.find('.screen_tip_content');
		$inchTip.on('mouseenter', function(){
			$inchTipCont.fadeIn(300);
			$inchTip.on('mouseleave', function(){
				$inchTipCont.fadeOut(300);
			});
		});
		//将rgb值转为16进制
		var rgb2Hex	 = function (rgb){ 
		    var regexp = /[0-9]{0,3}/g;  
		    var re = rgb.match(regexp);//利用正则表达式去掉多余的部分，将rgb中的数字提取
		    var hexColor = "";
			var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];  
		    for (var i=0; i<re.length; i++) {
				var r = null, c = re[i], l = c; 
				var hexAr = [];
				while (c > 16){  
					  r = c % 16;  
					  c = (c / 16) >> 0; 
					  hexAr.push(hex[r]);  
				 } 
				 hexAr.push(hex[c]);
				 if(l < 16 && l != ""){        
					 hexAr.push(0)
				 }
			   hexColor += hexAr.reverse().join(''); 
			}  
			return hexColor;  
		} 
		var imgWidth = 290;
		var imgHeight = 500;
		//初始化记录标准图颜色相对应的下标值给_picIndex
		var _picIndex = [];
		var currentColor = [];

		
        var hex2Rgb = function(color){
			color = window.parseInt(color.slice(0),16);//去除"#"，如#ff0000变为ff0000
            var r = color >> 16 & 0xff,
                g = color >> 8 & 0xff,
                b = color & 0xff;
            var obj = {r: r, g: g, b: b};
            return obj;
        }
		var phone2Rgb = function(arr){
			var rgbArr = [];
			$.each(arr, function(i, item){
				$.each(item, function(j, hex){
					rgbArr.push(hex2Rgb(hex));
				});
			});
			return rgbArr;
		}
		var currentColor = phone2Rgb(self.data[self.currentMobile].colors);
		//picPos为图片每个像素颜色的下标值
		var arrPos = PICPOS.split(',');

		/*=============	canvas获取原图像素标准色相应下标 =============*/
		/*$canvas = $('#canvas1');
		var ctx = $canvas.get(0).getContext("2d");

		var img = $('#img1').get(0);
		var $div1 = $('#div1');
		ctx.drawImage(img, 0, 0);
		var colorPos = [];
		var searchColor = function(r, g, b) {
			var _index = 0;
			$.each(_originColor, function(j, item) {
				if( r == item.r && g == item.g && b == item.b ) {
				//if( r == 255 && g == 199 && b == 153 ) {
					_index = j;
					return false;
				}
			});
			return _index;
		};
		//获取图片像素颜色相应的下标 
		var strPos = '';
		$btn = $('#btn');
		$btn.on('click', function(){
			var imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
			for (var i=0; i<imgData.data.length; i+=4){
				var red = imgData.data[i];
				var green = imgData.data[i+1];
				var blue = imgData.data[i+2];
				var _index = searchColor(red, green, blue);
				colorPos.push(_index);
			}
			strPos = colorPos.join(',');	
			$div1.html(strPos);
		});
		self.initOpt_3 = function(){};
		
		var nowIndex = 0;
		for(var i=0; i<imgData.data.length; i+=4){
			imgData.data[i] = currentColor[arrPos[nowIndex]].r;
			imgData.data[i+1] = currentColor[arrPos[nowIndex]].g;
			imgData.data[i+2] = currentColor[arrPos[nowIndex]].b;
			nowIndex++;
		}
		ctx.putImageData(imgData,0,0);*/

		/*====================================================*/


		var $contentLeft =  $wrapShow.find('.show_left .pic_content');
		var $contentRight =  $wrapShow.find('.show_right .pic_content');

		//将img的图片根据手机颜色数据重新渲染到canvas标签上
		var canvasImg = function($content, phoneColor){
			var img  = $content.find('img').get(0);
			var $canvas = $content.find('canvas');
			var ctx = $canvas.get(0).getContext("2d");
			ctx.drawImage(img, 0, 0);
			var imgData = ctx.getImageData(0, 0, imgWidth, imgHeight);
			var nowIndex = 0;
			for(var i=0; i<imgData.data.length; i+=4){
				imgData.data[i] = phoneColor[arrPos[nowIndex]].r;
				imgData.data[i+1] = phoneColor[arrPos[nowIndex]].g;
				imgData.data[i+2] = phoneColor[arrPos[nowIndex]].b;
				nowIndex++;
			}
			ctx.putImageData(imgData, 0, 0);
			$content.slide.opts.onMove(imgHeight);
		};

		//机型多选
		self.scaleSelector_3 = new self.select({
			dom: $wrapShow.find('.tool_compare'),
			data: (function() {
			})(),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				self.otherMobile_3 = $(dom).text();
				self.initOpt_3();
			}
		});

		var showCanvas = function($content, phoneColor){
			var $canvas = $content.find('canvas');

			$content.slide = new self.slide({
				wrap: $content,
				scale: ['标准', '实测'],
				width: imgWidth,
				height: imgHeight,
				onMove: function(moveY) {
					//变化亮度
					var _val = moveY/imgHeight;
					$canvas.css('opacity', _val);				
				}
			});

			self.initOpt_3 = function(cid){ 
				var cid = self.scaleSelector_3.$defaultPhone.attr('data-id'); 

				if( !self.data[self.otherMobile_3] ){
					$.get('/data/screen', {id: cid}, function(json){ 
						if( json.status == 200 ){
							self.data[json.message[0]['mobile_phone']] = json.message[0];
							var otherColor = phone2Rgb(self.data[self.otherMobile_3].colors);
							canvasImg($contentLeft, currentColor);
							canvasImg($contentRight, otherColor);
						}
					}, 'json');
				} else {
					var otherColor = phone2Rgb(self.data[self.otherMobile_3].colors);
					canvasImg($contentLeft, currentColor);
					canvasImg($contentRight, otherColor);
				}

				F.ga('button', 'click', 'screen_effect');
			};
		};

		showCanvas($contentLeft, currentColor);
		showCanvas($contentRight, currentColor);
	}
});
