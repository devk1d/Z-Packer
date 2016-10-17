
// 温度 
Z.define('data/temp', {
	initialize: function() {
		var self = this;

		self.currentMobile = window.mobile_name;
		//self.otherMobile为每个tab的当前手机
		self.otherMobile_1 = null;
		self.otherMobile_2 = null;
		self.otherMobile_3 = null;
		self.otherMobile_4 = null;
		self.mobile2id = {};
		self.id2mobile = {};

		self.$container = $('.temp_tools_wrap');
		self.$head = $('.post_temp_head');
		self.$lineChartWrap1 = this.$container.find('.wrap_tab.wrap_tab_battery');
		self.$lineChartWrap2 = this.$container.find('.wrap_tab.wrap_tab_charging');
		self.$lineChartWrap3 = this.$container.find('.wrap_tab.wrap_tab_weibo');
		self.$lineChartWrap4 = this.$container.find('.wrap_tab.wrap_tab_game');

		self.$tempPic = this.$container.find('.temp_pic');
		self.select = Z.require('data/tools').select;
		self.lineChart = Z.require('data/tools').lineChart;

		$.get('/data/tempShow', {id: window.mobile_id, comid: window.compMobileId}, function(json){
			if(json.status == 200) {
				self.data = json.message;
				self.$container.data('done', true);
				self.$head.find('.head_loading').hide();
				if(self.$head.hasClass('active')) {
					self.$head.trigger('click');
				}
			}
		}, 'json');

		self.redPic = function(index, otherMobile, _data, tempFace){ 
			var _ox = 2;
			var mid1 = window.mobile_name;
			var mid2 = otherMobile;
			//var tip = self._tipArr1[Math.floor(_ox/2)-1] || '';
			//tip = tip ? '红外线图谱（'+tip+'）' : '红外线图谱';
			tempFace = tempFace ? tempFace : 0;
			self.tempPicInit(mid1, mid2, _ox, index, _data, tempFace);
		}

		self.$container.on('ga', function(){
			F.ga('button', 'click', 'heat');
		});

		self.$container.on('init', function() {
			//self.initAreaChart(self.data);
			if(F.hasSVG()) {
				self.initLineChart1(self.data, 'front');
				self.initLineChart2(self.data, 'front');
				self.initLineChart3(self.data, 'front');
				self.initLineChart4(self.data, 'front');
			} else {
				/*var $opts = self.$container.find('.temp_options');
				var $opt_0 = $opts.find('.opt_0').clone(true);
				$opts.html('').append($opt_0);*/
			}
			
			self.initTempPic(self.data);
			self.initEvent(self.data);

			$(this).off('init');
		});
	},
	
	initEvent: function(data) {
		var self = this;
		//self.face=0为正面，=1为反面
		self.face1 = 0;
		self.face2 = 0;
		self.face3 = 0;
		self.face4 = 0;
		
		var $options = self.$head.find('.head_tabs li');
		
		var $leftSidebar = this.$container.find('.left_sidebar');
		//侧边栏正反面按钮
		$leftSidebar.on('click', 'div', function(){
			var face = $(this).index();
			var index = $options.parent().find('li.active').index();
			$leftSidebar.children().removeClass('active');
			$(this).addClass('active');
			switch (index){ 
				case 0:
					self.face1 = face; 
					$options.eq(index).trigger('click');

					if( self.face1 ) F.ga('button', 'click', '5hheat_sideb');
					else F.ga('button', 'click', '5hheat_sidea');
					break;
				case 1:
					self.face2 = face; 
					$options.eq(index).trigger('click');

					if( self.face2 ) F.ga('button', 'click', 'charging_sideb');
					else F.ga('button', 'click', 'charging_sidea');
					break;
				case 2:
					self.face3 = face; 
					$options.eq(index).trigger('click');

					if( self.face3 ) F.ga('button', 'click', 'weibo_sideb');
					else F.ga('button', 'click', 'weibo_sidea');
					break;
				case 3:
					self.face4 = face; 
					$options.eq(index).trigger('click');

					if( self.face4 ) F.ga('button', 'click', 'game_sideb');
					else F.ga('button', 'click', 'game_sidea');
					break;
			}
		});
		//温度的顶部导航条
		$options.on('click', function() {
			var $this = $(this);
			var index = $this.index();
			var oldIndex = $(this).parent().children('.active').index();
			//如果是通过点击tab来切换(区别于点击正面反面的点击)，线图从手机正面开始
			if( oldIndex != index ){
				self.face1 = 0;
				self.face2 = 0;
				self.face3 = 0;
				self.face4 = 0;
				$leftSidebar.children().removeClass('active').eq(0).addClass('active');
			}

			self.$container.find('.wrap_tab').hide();
			$options.removeClass('active');
			$this.addClass('active');

			var $pic_wrap = self.$container.find('.pic_wrap');
			if( index > 1 ){
				$pic_wrap.addClass('pic_small');
			} else {
				$pic_wrap.removeClass('pic_small');
			}

			if(index == 0) {
				self.otherMobile_1 = setOtherMobile(self.otherMobile_1);

				F.ga('button', 'click', '5hheat_sidea');
				self.$lineChartWrap1.show();
				self.lineChartSelector1.$select.find('.list_like ul li').each(function(i, item) {
					if($(item).text() == self.otherMobile_1) {
						$(item).attr('isclick', 'no');
						$(item).trigger('click');
						return false;
					}
				});
			}
			else if(index == 1) {
				self.otherMobile_2 = setOtherMobile(self.otherMobile_2);

				F.ga('button', 'click', 'charging_sidea');
				self.$lineChartWrap2.show();
				self.lineChartSelector2.$select.find('.list_like ul li').each(function(i, item) {
					if($(item).text() == self.otherMobile_2) {
						$(item).attr('isclick', 'no');
						$(item).trigger('click');
						return false;
					}
				});
			}
			else if(index == 2) {
				self.otherMobile_3 = setOtherMobile(self.otherMobile_3);

				F.ga('button', 'click', 'weibo_sidea');
				self.$lineChartWrap3.show();

				self.lineChartSelector3.$select.find('.list_like ul li').each(function(i, item) {
					if($(item).text() == self.otherMobile_3) {
						$(item).attr('isclick', 'no');
						$(item).trigger('click');
						return false;
					}
				});
			}
			else if(index == 3) {
				self.otherMobile_4 = setOtherMobile(self.otherMobile_4);

				F.ga('button', 'click', 'game_sidea');
				self.$lineChartWrap4.show();

				self.lineChartSelector4.$select.find('.list_like ul li').each(function(i, item) {
					if($(item).text() == self.otherMobile_4) {
						$(item).attr('isclick', 'no');
						$(item).trigger('click');
						return false;
					}
				});
			}

			return false;
		});

		self._tipArr1 = [
			'网络视频',
			'本地视频',
			'文字阅读',
			'微博阅读',
			'拍照录像',
			'单机游戏',
			'微信收发',
			'网页浏览',
			'语音通话',
			'本地音乐'
		];
		
		function setOtherMobile(otherMobile) {
			if(otherMobile) return otherMobile;

			//var minTop = 99999, $dom = self.$areaChartWrap.find('.chart_item').not('.current');
			/*$dom.each(function(i, item) {
				if( minTop > parseInt($(item).css('top')) ) {
					minTop = parseInt($(item).css('top'));
					self.otherMobile = $(item).find('.item_label').attr('text');
				}
			});*/
			//self.otherMobile = window.compMobileName;
			return  window.compMobileName;
		};

		$options.eq(0).trigger('click');
		//var _ox = $this.attr('ox');
		//初始化显示红外线图像
		
	},
	/*initAreaChart: function(data) {
	},*/
	initLineChart1: function(data) {
		var self = this;
		var $container = self.$lineChartWrap1;
		var $chartWrap = $container.find('.temp_chart');
		//每个tab都有一个_data存放当前tab的数据
		var _data = self.setData(data, 'battery_temp');

		//self.redPic(0, self.otherMobile_1, _data, self.face1);
		
		var _init = function(chartData) {
			/*var line_x = [
				'网络视频',
				'本地视频',
				'文字阅读',
				'微博阅读',
				'拍照录像',
				'单机游戏',
				'微信收发',
				'网页浏览',
				'语音通话',
				'本地音乐'
			];*/

			//var _tipArr = ['0', '', '0.5', '', '1.0', '', '1.5', '', '2.0', '', '2.5', '', '3.0', '', '3.5', '', '4.0', '', '4.50', '', '5.0&nbsp;h'];
			$chartWrap.off('mouseenter').off('mouseleave').html('');
			new self.lineChart({
				wrap: $chartWrap,
				width: 700,
				height: 175,
				x: [0, '', 0.5, '', 1.0, '', 1.5, '', 2.0, '', 2.5, '', 3.0, '', 3.5, '', 4.0, '', 4.50, '', '5.0&nbsp;h'],
				y: [25, 30, 35, 40, 45, 50, '55 ℃'],
				data: chartData,
				onHover: function(moveX, moveY, $dom, e) {
					if($dom.hasClass('hasImg')) {
						//找到另一个有图的
						/*var $ele = $dom.siblings('.tipper.hasImg').not($dom);
						var ox = $ele.attr("ox");
						var $sib = $ele.siblings('.tipper[ox="'+ox+'"]');

						$ele.stop(true).animate({'opacity': 1}, 30);
						$sib.stop(true).animate({'opacity': 1}, 30);*/
					}
				}
			});


			var $lineX = $chartWrap.find('.lineX');
			var _tipArr = [
				'网络视频',
				'本地视频',
				'文字阅读',
				'微博阅读',
				'拍照录像',
				'单机游戏',
				'微信收发',
				'网页浏览',
				'语音通话',
				'本地音乐'
			];

			$lineX.find('div').each(function(i, item) {
				var o_t = $(item).text();
				var o_i = -$.textWidth(o_t)/2 + 'px';

				if(i%2 == 1) {
					var c_t = _tipArr[Math.floor(i/2)];
					var c_i = -$.textWidth(c_t)/2 + 'px';

					$(item).data('c_t', c_t);
					$(item).data('o_t', o_t);
				}
				$(item).data('c_i', c_i);
				$(item).data('o_i', o_i);
			});

			$lineX.on('mouseenter', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);
					
					if($this.data('c_t')) {
						$this.text($this.data('c_t')).css('text-indent', $this.data('c_i')).css('color', '#abb0bc').addClass('com_after_hide');
					} else {
						$this.css('text-indent', '-99999px');
					}
				});
			});

			$lineX.on('mouseleave', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);

					if($this.data('c_t')) {
						$this.text($this.data('o_t')).css('color', '#abb0bc').removeClass('com_after_hide');
					}
					$this.css('text-indent', $this.data('o_i'));	
				});
			});
		};

		//机型多选
		this.lineChartSelector1 = new self.select({
			dom: $container.find('.tool_compare'),
			data: (function() {
				/*var _data = [];
				for(var i in data) {
					if(i != self.currentMobile)
						 _data.push(i);
				}
				return _data;*/
			})(),
			defaultKey: self.currentMobile,
			onClick: function(e, dom) {
				self.otherMobile_1 = $(dom).text();
				//F.ga('button', 'click', 'tools_temp_battery_mobile_switch');
				//_init([_data[self.currentMobile], _data[self.otherMobile]]);
				var tempFace = self.face1 ? 'back' : 'front';
				if( !self.data[self.otherMobile_1] ){
					$.get('/data/tempShow', {id: $(dom).data('id')}, function(json){
						if(json.status == 200){
							var new_data = self.setData(json.message, 'battery_temp');
							_data[self.otherMobile_1] = new_data[self.otherMobile_1];
							_init([_data[self.otherMobile_1][tempFace], _data[self.currentMobile][tempFace]]);
							self.redPic(0, self.otherMobile_1, _data, self.face1);
						}
					}, 'json');
				} else {
					if(!_data[self.otherMobile_1]){
						//var new_data = self.setData(self.data[self.otherMobile_1], 'battery_temp');
						var obj = {};
						obj[self.otherMobile_1] = self.data[self.otherMobile_1];
						var new_data = self.setData(obj, 'battery_temp');
						_data[self.otherMobile_1] = new_data[self.otherMobile_1];
					}
					_init([_data[self.otherMobile_1][tempFace], _data[self.currentMobile][tempFace]]);
					self.redPic(0, self.otherMobile_1, _data, self.face1);
				}
			}
		});
		self.$lineChartWrap1.on('mouseover', 'div.hasImg', function() {
			var $this = $(this);
			var _ox = $this.attr('ox');
			//var mid1 = self.data[self.currentMobile]['id'];
			//var mid2 = self.data[self.otherMobile_1]['id'];
			var tip = self._tipArr1[Math.floor(_ox/2)-1] || '';

			tip = tip ? '红外线图谱（'+tip+'）' : '红外线图谱';
			
			self.tempPicInit(self.currentMobile, self.otherMobile_1, _ox, 0, _data, self.face1);

			//self.$tempPic.animate({left: 0}, 'fast');
			//F.ga('button', 'click', 'tools_screen_battery_temppic');
			return false;
		});
	},
	initLineChart2: function(data, tempFace) {
		var self = this;
		var $container = self.$lineChartWrap2;
		var $chartWrap = $container.find('.temp_chart');
		
		var _data = self.setData(data, 'charging_temp');
		//var x = [0, '', 0.5, '', 1.0, '', 1.5, '', 2.0, '', 2.5]; 

		var _init = function(chartData) {
			$chartWrap.off('mouseenter').off('mouseleave').html('');
			new self.lineChart({
				wrap: $chartWrap,
				width: 700,
				height: 175,
				x: [0, '', 0.5, '', 1.0, '', 1.5, '', 2.0, '', 2.5, '', 3.0, '', 3.5, '', 4.0, '', 4.50, '', '5.0&nbsp;h'],
				y: [25, 30, 35, 40, 45, 50, '55 ℃'],
				data: chartData,
				onHover: function(moveX, moveY, $dom, e) {

				}
			});

			var $lineX = $chartWrap.find('.lineX');
			var _tipArr = [
				'网络视频',
				'本地视频',
				'文字阅读',
				'微博阅读',
				'拍照录像',
				'单机游戏',
				'微信收发',
				'网页浏览',
				'语音通话',
				'本地音乐'
			];

			$lineX.find('div').each(function(i, item) {
				var o_t = $(item).text();
				var o_i = -$.textWidth(o_t)/2 + 'px';

				if(i%2 == 1) {
					var c_t = _tipArr[Math.floor(i/2)];
					var c_i = -$.textWidth(c_t)/2 + 'px';

					$(item).data('c_t', c_t);
					$(item).data('o_t', o_t);
				}
				$(item).data('c_i', c_i);
				$(item).data('o_i', o_i);
			});

			$lineX.on('mouseenter', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);
					
					/*if($this.data('c_t')) {
						$this.text($this.data('c_t')).css('text-indent', $this.data('c_i')).css('color', '#abb0bc').addClass('com_after_hide');
					} else {
						$this.css('text-indent', '-99999px');
					}*/
				});
			});

			$lineX.on('mouseleave', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);

					if($this.data('c_t')) {
						$this.text($this.data('o_t')).css('color', '#abb0bc').removeClass('com_after_hide');
					}
					$this.css('text-indent', $this.data('o_i'));	
				});
			});
		};

		//多选
		this.lineChartSelector2 = new self.select({
			dom: $container.find('.tool_compare'),
			data: (function() {
				var _data = [];
				for(var i in data) {
					if(i != self.currentMobile)
						 _data.push(i);
				}
				return _data;
			})(),
			defaultKey: self.currentMobile,
			onClick: function(e, dom) {
				self.otherMobile_2 = $(dom).text();
				//F.ga('button', 'click', 'tools_temp_battery_mobile_switch');
				var tempFace = self.face2 ? 'back' : 'front';
				if( !self.data[self.otherMobile_2] ){
					$.get('/data/tempShow', {id: $(dom).data('id')}, function(json){
						if(json.status == 200){
							var new_data = self.setData(json.message, 'charging_temp');
							/*$.each(new_data, function(i, item){
								_data[i] = item;
							});*/
							_data[self.otherMobile_2] = new_data[self.otherMobile_2];
							_init([_data[self.otherMobile_2][tempFace], _data[self.currentMobile][tempFace]]);
							self.redPic(1, self.otherMobile_2, _data, self.face2);
						}
					}, 'json');
				} else {
					if(!_data[self.otherMobile_2]){
						var obj = {};
						obj[self.otherMobile_1] = self.data[self.otherMobile_1];
						var new_data = self.setData(obj, 'charging_temp');
						_data[self.otherMobile_2] = new_data[self.otherMobile_2];
					}
					_init([_data[self.otherMobile_2][tempFace], _data[self.currentMobile][tempFace]]);
					self.redPic(1, self.otherMobile_2, _data, self.face2);
				}
			}
		});
		self.$lineChartWrap2.on('mouseover', 'div.hasImg', function() {
			var $this = $(this);
			var _ox = $this.attr('ox');
			//var mid1 = self.data[self.currentMobile]['id'];
			//var mid2 = self.data[self.otherMobile_2]['id'];
			var tip = self._tipArr1[Math.floor(_ox/2)-1] || '';

			tip = tip ? '红外线图谱（'+tip+'）' : '红外线图谱';
			
			self.tempPicInit(self.currentMobile, self.otherMobile_2, _ox, 0, _data, self.face2);

			//self.$tempPic.animate({left: 0}, 'fast');
			//F.ga('button', 'click', 'tools_screen_battery_temppic');
			return false;
		});
	},

	//微博冲刺
	initLineChart3: function(data, tempFace) {
		var self = this;
		var $container = self.$lineChartWrap3;
		var $chartWrap = $container.find('.temp_chart');


		var _data = self.setData(data, 'weibo_sprint');

		var _init = function(chartData) {
			$chartWrap.off('mouseenter').off('mouseleave').html('');
			new self.lineChart({
				wrap: $chartWrap,
				width: 700,
				height: 175,
				x: [0, '', '', '', '', 5, '', '', '', '', '10', '', '', '', '', 15, '', '', '', '', 20, '', '', '', '', 25, '', '', '', '', '30&nbsp;min'],
				y: [25, 30, 35, 40, 45, 50, '55 ℃'],
				data: chartData
			});

			var $lineX = $chartWrap.find('.lineX');
			var _tipArr = [
				'网络视频',
				'本地视频',
				'文字阅读',
				'微博阅读',
				'拍照录像',
				'单机游戏',
				'微信收发',
				'网页浏览',
				'语音通话',
				'本地音乐'
			];

			$lineX.find('div').each(function(i, item) {
				var o_t = $(item).text();
				var o_i = -$.textWidth(o_t)/2 + 'px';

				if(i%2 == 1) {
					var c_t = _tipArr[Math.floor(i/2)];
					var c_i = -$.textWidth(c_t)/2 + 'px';

					$(item).data('c_t', c_t);
					$(item).data('o_t', o_t);
				}
				$(item).data('c_i', c_i);
				$(item).data('o_i', o_i);
			});

			$lineX.on('mouseenter', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);
					
					/*if($this.data('c_t')) {
						$this.text($this.data('c_t')).css('text-indent', $this.data('c_i')).css('color', '#abb0bc').addClass('com_after_hide');
					} else {
						$this.css('text-indent', '-99999px');
					}*/
				});
			});

			$lineX.on('mouseleave', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);

					if($this.data('c_t')) {
						$this.text($this.data('o_t')).css('color', '#abb0bc').removeClass('com_after_hide');
					}
					$this.css('text-indent', $this.data('o_i'));	
				});
			});
		};

		//多选
		this.lineChartSelector3 = new self.select({
			dom: $container.find('.tool_compare'),
			data: (function() {
				var _data = [];
				for(var i in data) {
					if(i != self.currentMobile)
						 _data.push(i);
				}
				return _data;
			})(),
			defaultKey: self.currentMobile,
			onClick: function(e, dom) {
				self.otherMobile_3 = $(dom).text();
				//F.ga('button', 'click', 'tools_temp_battery_mobile_switch');
				var tempFace = self.face3 ? 'back' : 'front';
				if( !self.data[self.otherMobile_3] ){
					$.get('/data/tempShow', {id: $(dom).data('id')}, function(json){
						if(json.status == 200){
							var new_data = self.setData(json.message, 'weibo_sprint');
							_data[self.otherMobile_3] = new_data[self.otherMobile_3];
							_init([_data[self.otherMobile_3][tempFace], _data[self.currentMobile][tempFace]]);
							self.redPic(2, self.otherMobile_3, _data, self.face3);
						}
					}, 'json');
				} else {
					if(!_data[self.otherMobile_3]){
						var obj = {};
						obj[self.otherMobile_3] = self.data[self.otherMobile_3];
						var new_data = self.setData(obj, 'battery_temp');
						$.each(new_data, function(i, item){
							_data[i] = item;
						});
					}
					_init([_data[self.otherMobile_3][tempFace], _data[self.currentMobile][tempFace]]);
					self.redPic(2, self.otherMobile_3, _data, self.face3);
				}
			}
		});
		self.$lineChartWrap3.on('mouseover', 'div.hasImg', function() {
			var $this = $(this);
			var _ox = $this.attr('ox');
			//var mid1 = self.data[self.currentMobile]['id'];
			//var mid2 = self.data[self.otherMobile_3]['id'];
			var tip = self._tipArr1[Math.floor(_ox/2)-1] || '';

			tip = tip ? '红外线图谱（'+tip+'）' : '红外线图谱';
			
			self.tempPicInit(self.currentMobile, self.otherMobile_3, _ox, 0, _data, self.face3);

			//self.$tempPic.animate({left: 0}, 'fast');
			//F.ga('button', 'click', 'tools_screen_battery_temppic');
			return false;
		});
	},

	//游戏冲刺
	initLineChart4: function(data, tempFace) {
		var self = this;
		var $container = self.$lineChartWrap4;
		var $chartWrap = $container.find('.temp_chart');

		var _data = self.setData(data, 'game_sprint');

		var _init = function(chartData) {
			$chartWrap.off('mouseenter').off('mouseleave').html('');
			new self.lineChart({
				wrap: $chartWrap,
				width: 700,
				height: 175,
				x: [0, '', '', '', '', 5, '', '', '', '', '10', '', '', '', '', 15, '', '', '', '', 20, '', '', '', '', 25, '', '', '', '', '30&nbsp;min'],
				y: [25, 30, 35, 40, 45, 50, '55 ℃'],
				data: chartData
			});

			var $lineX = $chartWrap.find('.lineX');
			var _tipArr = [
				'网络视频',
				'本地视频',
				'文字阅读',
				'微博阅读',
				'拍照录像',
				'单机游戏',
				'微信收发',
				'网页浏览',
				'语音通话',
				'本地音乐'
			];

			$lineX.find('div').each(function(i, item) {
				var o_t = $(item).text();
				var o_i = -$.textWidth(o_t)/2 + 'px';

				if(i%2 == 1) {
					var c_t = _tipArr[Math.floor(i/2)];
					var c_i = -$.textWidth(c_t)/2 + 'px';

					$(item).data('c_t', c_t);
					$(item).data('o_t', o_t);
				}
				$(item).data('c_i', c_i);
				$(item).data('o_i', o_i);
			});

			$lineX.on('mouseenter', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);
					
					/*if($this.data('c_t')) {
						$this.text($this.data('c_t')).css('text-indent', $this.data('c_i')).css('color', '#abb0bc').addClass('com_after_hide');
					} else {
						$this.css('text-indent', '-99999px');
					}*/
				});
			});

			$lineX.on('mouseleave', function() {
				$lineX.find('div').each(function(i, item) {
					var $this = $(item);

					if($this.data('c_t')) {
						$this.text($this.data('o_t')).css('color', '#abb0bc').removeClass('com_after_hide');
					}
					$this.css('text-indent', $this.data('o_i'));	
				});
			});
		};

		//多选
		this.lineChartSelector4 = new self.select({
			dom: $container.find('.tool_compare'),
			data: (function() {
				var _data = [];
				for(var i in data) {
					if(i != self.currentMobile)
						 _data.push(i);
				}
				return _data;
			})(),
			defaultKey: self.currentMobile,
			onClick: function(e, dom) {
				self.otherMobile_4 = $(dom).text();
				//F.ga('button', 'click', 'tools_temp_battery_mobile_switch');
				var tempFace = self.face4 ? 'back' : 'front';
				if( !self.data[self.otherMobile_4] ){
					$.get('/data/tempShow', {id: $(dom).data('id')}, function(json){
						if(json.status == 200){
							var new_data = self.setData(json.message, 'game_sprint');
							_data[self.otherMobile_4] = new_data[self.otherMobile_4];
							_init([_data[self.otherMobile_4][tempFace], _data[self.currentMobile][tempFace]]);
							self.redPic(3, self.otherMobile_4, _data, self.face4);
						}
					}, 'json');
				} else {
					if(!_data[self.otherMobile_4]){
						var obj = {};
						obj[self.otherMobile_4] = self.data[self.otherMobile_4];
						var new_data = self.setData(obj, 'battery_temp');
						_data[self.otherMobile_4] = new_data[self.otherMobile_4];
					}
					_init([_data[self.otherMobile_4][tempFace], _data[self.currentMobile][tempFace]]);
					self.redPic(3, self.otherMobile_4, _data, self.face4);
				}
			}
		});
		self.$lineChartWrap4.on('mouseover', 'div.hasImg', function() {
			var $this = $(this);
			var _ox = $this.attr('ox');
			//var mid1 = self.data[self.currentMobile]['id'];
			//var mid2 = self.data[self.otherMobile_4]['id'];
			var tip = self._tipArr1[Math.floor(_ox/2)-1] || '';

			tip = tip ? '红外线图谱（'+tip+'）' : '红外线图谱';
			
			self.tempPicInit(self.currentMobile, self.otherMobile_4, _ox, 0, _data, self.face4);

			//self.$tempPic.animate({left: 0}, 'fast');
			//F.ga('button', 'click', 'tools_screen_battery_temppic');
			return false;
		});
	},

	//温度对比图
	initTempPic: function(data) {
		var self = this;
		var $wrap = this.$container.find('.temp_pic');

		var TempPic = function($wrap, data, text, x, tempFace) {

			var $pic = $wrap.find('.pic_wrap');
			var $tip = $wrap.find(".pic_tip");
			var $text = $wrap.find(".pic_text").text(text);
			var $detail = $wrap.find('.pic_det');

			var imgWidth = 320;
			var imgHeight = 240;
			
			tempFace = tempFace ? 'back': 'front';
			if( data[text][tempFace][x] ){
				var src = data[text][tempFace][x].v;
				F.loadImg(src, function() {
					F.unloading($pic);

					$pic.css('background-image', 'url(' + src + ')');
				});
			} else {
				var theLast = data[text][tempFace].length;
				var src = data[text][tempFace][theLast-1].v;
				F.loadImg(src, function() {
					F.unloading($pic);

					$pic.css('background-image', 'url(' + src + ')');
				});
			}
		};

		var _tempData = {};
		var $pic1 = $wrap.find('.pic_1');
		var $pic2 = $wrap.find('.pic_2');

		self.tempPicInit = function(mid1, mid2, x, type, _data, tempFace) {
			F.loading($pic1.find('.pic_wrap'), 'blackNew');
			F.loading($pic2.find('.pic_wrap'), 'blackNew');
			
			new TempPic($pic1, _data, mid1, x, tempFace);
			new TempPic($pic2, _data, mid2, x, tempFace);
		};
	},

	setData: function(data, tab){
		var self = this;
		var _data = {};
		$.each(data, function(i, item) {
			if( !self.data[i] ) 
			self.data[i] = item;
			_data[i] = {};
			$.each(item['performance'][tab], function(j, subItem) {
				_data[i][j] = [];
				$.each(subItem, function(k, tempItem){
					_data[i][j].push({x: k, y: tempItem.values, v: tempItem.fever_heat_pic});
				});
			});
		});
		return _data;
	}
});
