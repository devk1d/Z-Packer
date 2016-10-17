
//外观工具
Z.define('data/surface', {
	initialize: function() {
		var self = this;
		self.select = Z.require('data/tools').select;

		this.currMobileName = window.mobile_name;
		this.currMobileId = window.mobile_id;
		this.currMobileColorId = window.mobile_colorid;
		this.compMobileId = window.compMobileId;
		this.compColorId = window.compColorId;

		this._currentTab = 0; //当前的tab

		// 缓存用
		this.data = {curr: {display: {}, usability: {}, unboxing: [], closeup: []}, comp: {display: {}, usability: {}}};

		this.$container = $('.J_surface_tools_wrap');
		this.$head = $('.post_surface_head');

		this.$360Wrap = this.$container.find('.wrap_tab_show360');
		this.$singleWrap = this.$container.find('.wrap_tab_singleHand');
		this.$unboxWrap = this.$container.find(".J_wrap_unbox");
		this.$partsWrap = this.$container.find(".J_wrap_parts");

		this.$curr360PicWrap = this.$360Wrap.find('.J_pic_0');
		this.$comp360PicWrap = this.$360Wrap.find('.J_pic_1');
		this.$currSinglePicWrap = this.$singleWrap.find('.J_pic_0');
		this.$compSinglePicWrap = this.$singleWrap.find('.J_pic_1');


		// 获取第一个tab 360度展示数据
		self.getData(self.currMobileId, self.currMobileColorId, 'display', function(curr360Data) {
			self.curr360Data = curr360Data;
			self.getData(self.compMobileId, self.compColorId, 'display', function(comp360Data) {
				self.comp360Data = comp360Data;
				self.$head.find('.p_show360').data('data', 'done');
				self.$container.data('done', true);
				self.$head.find('.head_loading').hide();

				if(self.$head.hasClass('active')) {
					//self.$head.trigger('click');
				}
			});
		});

		this.$container.on('init', function() {
			self.init(self.curr360Data, self.comp360Data);
			$(this).off('init');
		});

		this.bindEvent();
	},

	init: function(curr360Data, comp360Data) {
		var self = this;

		self.curr360Player = self.initPicPlayer(self.$curr360PicWrap, curr360Data, function(i, isCurrent) {
			isCurrent && self.comp360Player.setImg(i, false);
		});
		self.comp360Player = self.initPicPlayer(self.$comp360PicWrap, comp360Data, function(i, isCurrent) {
			isCurrent && self.curr360Player.setImg(i, false);
		});
		
		// 初始化评分
		self.initScore();
		this.initEvent();
	},

	initEvent: function() {
		var self = this;
		var $leftPics = this.$container.find('.J_wrap_left .J_pic_0, .J_wrap_left .J_pic_1');
		var $options = $('.J_surface_options a');
		var $toolsHead = $(".tools .post_surface_head");
		var $headTabs = $toolsHead.find('.head_tabs');

		$headTabs.on('click', 'li', function(e) {
			e.stopPropagation();
			var $this = $(this);
			var $currHead = $this.parent().parent();
			var $currTabs = $currHead.find('.head_tabs');
			var $currWrap = $currHead.next('.tools_wrap');
			var tab = $this.data('tab');

			if($this.hasClass('active'))  return;
			$currTabs.find('li.active').removeClass('active');
			$this.addClass('active');
			self.$container.find('.wrap_tab.active').removeClass('active');
			self.$container.find('.wrap_tab_' + $this.data('tab')).addClass('active');
			
			self.loadTabData(tab, $this);
			
			switch (tab){
				case 'show360': 
					F.ga('button', 'click', 'structure_show');
					break;
				case 'singleHand' :
					F.ga('button', 'click', 'structure_singlehand');
					break;
				case 'unbox':
					F.ga('button', 'click', 'structure_unboxgif');
					break;
				case 'parts':
					F.ga('button', 'click', 'structure_details');
					break;
			}
		});
	},

	loadTabData: function(tab, $this) {
		var self = this;

		if($this.data('data') === 'done') return;
		switch (tab) {
			case 'singleHand' :
				self.getData(self.currMobileId, self.currMobileColorId, 'usability', function(data) {
					self.currSinglePlayer = self.initPicPlayer(self.$currSinglePicWrap, data, function(i, isCurrent) {
						isCurrent && self.compSinglePlayer.setImg(i, false);
					});
					self.getData(self.compMobileId, self.compColorId, 'usability', function(data) {
						self.compSinglePlayer = self.initPicPlayer(self.$compSinglePicWrap, data, function(i, isCurrent) {
							isCurrent && self.currSinglePlayer.setImg(i, false);
						});
						$this.data('data', 'done');
					});
				});
				break;
			case 'unbox':
				if(self.unboxPlayer) {
					self.unboxPlayer.initialize();
				} else if(!self.unboxInited) {
					self.getUnboxData();
				}
				break;
			case 'parts':
				F.loading(self.$partsWrap, 'blackNew', true);
				self.getData(self.currMobileId, self.currMobileColorId, 'parts', function(data) {
					$this.data('data', 'done');
					F.unloading(self.$partsWrap);
					self.initParts(data);
				});
				break;
		}
	},

	bindEvent: function(){
		var self = this;

		/*self.$360Wrap.find('.myscore').on('click', '.surface_login', function() {
			if($('.global_dialog').length > 0) {
				$('.global_dialog').show();
			} else {
				url = window.location.href;	
				window.location.href = '/login?redirect=' + url;
			}
		});*/

		// 360度展示对比机型列表
		self.displaySelector = new self.select({
			dom: self.$container.find('.tool_compare360'),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				var mobileid = $(dom).data('id');
				var colors = $(dom).data('color');
				/*
				// 颜色dom 
				var html = ''
				$.each(colors, function(index, item) {
					html += '<span class="' + (index == 0 ? 'active' : '') + ' color_selItem" style="background: #'
							+ item.color_rgb +'" data-id='+ compMobileId +'" data-cid="'+ item.color_id +'" data-rgb="'+ item.color_rgb +  '" data-type="comp"></span>';
				});
				self.$360Wrap.find('.comp_defaultColor').css('background', '#' + colors[0].color_rgb);
				self.$360Wrap.find('.comp_colorSel').html(html);
				*/

				self.getData(mobileid, colors[0].color_id, 'display', function(data) {
					self.$comp360PicWrap.html('');
					self.comp360Player = self.initPicPlayer(self.$comp360PicWrap, data, function(i, isCurrent) {
						isCurrent && self.curr360Player.setImg(i, false);
					});
				});
			}
		});

		// 单手易用性对比机型列表
		self.singleHandSelector = new self.select({
			dom: self.$container.find('.tool_compareSingle'),
			defaultKey: '选择对比机型',
			onClick: function(e, dom) {
				var mobileid = $(dom).data('id');
				var colors = $(dom).data('color');
				/*
				// 颜色dom 
				var html = ''
				$.each(compColors, function(index, item) {
					html += '<span class="' + (index == 0 ? 'active' : '') + ' color_selItem" style="background: #'
							+ item.color_rgb +'" data-id='+ compMobileId +'" data-cid="'+ item.color_id +'" data-rgb="'+ item.color_rgb +  '" data-type="comp"></span>';
				});
				self.$singleWrap.find('.comp_defaultColor').css('background', '#' + compColors[0].color_rgb);
				self.$singleWrap.find('.comp_colorSel').html(html);
				*/
				self.getData(mobileid, colors[0].color_id, 'usability', function(data) {
					self.$compSinglePicWrap.html('');
					self.compSinglePlayer = self.initPicPlayer(self.$compSinglePicWrap, data, function(i, isCurrent) {
						isCurrent && self.currSinglePlayer.setImg(i, false);
					});
				});
			}
		});
		/*

		// toggle颜色Selector
		self.$container.find('.basic_colorSel').on('click', '.defaultColor', function(e) {
			var $this = $(this);
			e.stopPropagation();
			$('.defaultColor').not($this).parent().find('.colorSel').hide();
			$this.parent().find('.colorSel').toggle();
		});

		// 选择其他颜色
		self.$container.on('click', '.colorSel',  function(e) {
			var $this = $(e.target);
			var $wrap = $this.closest('.surface_tabItem');

			if($this.hasClass('color_selItem')) {
				var cid = $this.data('cid');
				var id = $this.data('id');
				var type = $this.data('type');
				var rgb = $this.data('rgb');
				var tab = $this.data('tab');

				if($this.hasClass('active')) return;
				$this.parent().find('.active').removeClass('active');
				$this.addClass('active');

				if(type == 'curr') {
					$wrap.find('.curr_defaultColor').css('background', '#' + rgb);
					self.getData(id, cid, tab, function(data) {
						self.$curr360PicWrap.html('');
						self.curr360Player = self.initPicPlayer(self.$curr360PicWrap, data, function(i, isCurrent) {
							isCurrent && self.comp360Player.setImg(i, false);
						});
					});
				} else {
					$wrap.find('.comp_defaultColor').css('background', '#' + rgb);
				}
				//self.getScoreData(id, cid, type)
			} else {
				e.stopPropagation();
			}
		});

		// 点击外部关掉颜色sel
		$('html').click(function() {
			self.$container.find('.colorSel').hide();
		});
		*/
	},

	// 初始化图片播放，用于每个tab
	initPicPlayer: function($container, data, callback) {
		var self = this;
		$container.data('initPic', data[0]);

		var player = new this.imgPlayer({
			container: $container,
			data: data, 
			loadCompleted: function() {
				F.unloading($container);
			},
			onChange: function(i, isCurrent) {
				if(isCurrent) {
					callback && callback(i, isCurrent);
				}
			},
			onLoading: function(index) {
			}
		});

		F.loading($container, 'blackNew', true);
		//initialize用来初始加载图片
		player.initialize();

		return player;
	},

	getData: function(mobile_id, color_id, type,  callback) {
		$.post('/data/productGetData', {mobile_id: mobile_id, color_id: color_id, type: type}, function(json){
			if(json.status == 200) {
				callback && callback(json.message);
			} else {
			}
		}, 'json');
	},

	// 初始化打分
	initScore: function() {
		var self = this;
		var markTime, timer;
		var duration = 5; //秒
		var scoreObj = {'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5};
		
		function callback(i, $dom, _this) {
			var mobile_id = $dom.parent().data('mobileid');
			var color_id = $dom.parent().data('colorid');
			var $tip = $dom.parent().parent().find('.process_tip');

			if((+new Date() - markTime)/1000 > duration || !markTime) {
				markTime  = +new Date();
				$tip.text('提交中..');
				$.post('/data/score', {mobile_id: mobile_id, color_id: color_id, score: i+1}, function(json) {
					if(json.status == 301) {
						markTime = false;
						var _url = window.location.href;	
						var _newUrl = '/login?redirect=' + _url;
						$tip.html('请先<a class="surface_login" href="' + _newUrl + '">登录</a>');
						//Navigate(this, 'c');
					} else if(json.status == 200){
						_this.currentScore = i+1;
						_this.setPoint();
						$tip.text('评分成功!');
						clearTimeout(timer);
						timer = setTimeout(function() {
							$tip.text('');
						}, 2000);
					}
				}, 'json');
			}
		}

		self.getData(self.currMobileId, self.currMobileColorId, 'userscore', function(data) {
			var myScore = scoreObj[data.score];
			var currScore = new self.Score({
				wrap: self.$360Wrap.find('.do_score_curr'),
				maxScore: 5,
				defaultScore: myScore,
				onClick: function(i, $dom, _this) {
					callback(i, $dom, _this);
				}
			});
		});

		self.getData(self.compMobileId, self.compColorId, 'userscore', function(data) {
			var myScore = scoreObj[data.score];
			var compScore = new self.Score({
				wrap: self.$360Wrap.find('.do_score_comp'),
				maxScore: 5,
				defaultScore: myScore,
				onClick: function(i, $dom, _this) {
					callback(i, $dom, _this);
				}
			});
		});

		self.getData(self.currMobileId, self.currMobileColorId, 'productScore', function(data) {
			self.setScore(self.$360Wrap.find('.score_wrap.current'), data);
		});

		self.getData(self.compMobileId, self.compColorId, 'productScore', function(data) {
			self.setScore(self.$360Wrap.find('.score_wrap.compare'), data);
		});

	},

	setScore: function($wrap, data) {
		//左边评分详细信息
		var self = this;
		var _isHover = false;
		var $scoreNum = $wrap.find('.score_num');
		var $scoreBar = $wrap.find('.score_bar');
		var $scoreTotal = $wrap.find('.total_num');

		$scoreNum.on('mouseenter', function() {
			_isHover = true;
			$('.score_bar').show();
		})
		.on('mouseleave', function() {
			_isHover = false;
			setTimeout(function() {
				if(_isHover == false) {
					$('.score_bar').hide();
				}
			}, 100);
		});

		$scoreBar.on('mouseenter', function() {
			_isHover = true;
		})
		.on('mouseleave', function() {
			_isHover = false;
			setTimeout(function() {
				if(_isHover == false) {
					$('.score_bar').hide();
				}
			}, 100);
		});

		//人数比例设置
		var _score = $.extend({}, data), _total = 0, _num = 0, _average = 0; 
		
		delete(_score.user); //用户的给分不需要了

		$.each(_score, function(i, item) {
			switch(i) {
				case 'one': _total += item*1; break;
				case 'two': _total += item*2; break;
				case 'three': _total += item*3; break;
				case 'four': _total += item*4; break;
				case 'five': _total += item*5; break;
			}
			_num += item;
		});

		if(_num !=0 ) {
			_average = _total/_num;
		}

		$scoreNum.text((_average).toFixed(1));

		$.each(_score, function(i, item) {
			var _p = _num == 0 ? 0: 100*(_score[i]/_num);
			_score[i] = (_p).toFixed(1) + '%';
			$scoreBar.find('.J_'+i+' .text').text(_score[i]);
		});

		$scoreTotal.find('span').text(_num);
		//$scoreTotal.text(_num + ' 人');
	},


	//isClickUnbox 点击的是否是"开箱动画"
	getUnboxData: function() {
		var self = this;

		this.unboxInited = true;
		this._loadingBar = new this.loadingBar({
			container: self.$unboxWrap.find(".J_loading_bar"),
			width: 200,
			height: 4,
			css:{
				'margin-left': -100,
				'margin-top': -30
			}
		});
		this._loadingBar.show();
		this._loadingBar.process(0);
		
		//这里请求开箱的数据
		self.getData(self.currMobileId, self.currMobileColorId, 'unboxing', function(data) {
			self.$head.find('.p_unbox').data('data', 'done');
			self.initUnbox(data);
		});
	},

	//初始化开箱，isInit： 是否需要initialize
	initUnbox: function(data) {
		var self = this;
		var imgLength = data.length;

		self.unboxPlayer = new self.imgPlayer({
			container: self.$unboxWrap,
			data: data, 
			loadCompleted: function() {
				F.unloading(self.$unboxWrap.find('.loading_logo'));
				self._loadingBar.hide();
				self.$unboxWrap.find('.J_unbox_mask').hide();
			},
			onChange: function(i) {
			},
			onLoading: function(index) {
				var process = 1-index/imgLength;
				self._loadingBar.process(process);
			}
		});
			
		/*$(document).on('keydown', function(e) {
			if(e.keyCode == 37) { //left
				self.unboxPlayer.goPrev();
			}
			if(e.keyCode == 39) { //right
				self.unboxPlayer.goNext();
			}
		});*/
		
		F.loading(self.$unboxWrap.find('.loading_logo'), 'blackNew', true);
		this.unboxPlayer.initialize();
	},

	//初始化局部特写
	initParts: function(data) {
		var self = this;

		var $item = self.$partsWrap.find('.parts_dotWrap');
		var $prev = self.$partsWrap.find('.nav_prev');
		var $next = self.$partsWrap.find('.nav_next');
		var $img = self.$partsWrap.find('img');
		var $items;
		var _data = [];

		$.each(data, function(i, item) {
			_data.push(item);	
		});

		$.each(_data, function(i, item) {
			for(var i in item) {
				$item.append('<div><a href="javascript:;" data-bg="'+item[i]+'" style="background-image: url('+ item[i] +')"></a></div>');
			}
		});

		if($item.find('a').length < 7) {
			$prev.hide();
			$next.hide();
		}

		var maxTop= 0, step = 96;
		$prev.on('click', function() {
			var top = parseInt($item.css('margin-top'));
			top = top + step;
			top > maxTop && (top = maxTop);
			$item.stop().animate({'margin-top': top+'px'}, 'fast');
			return false;
		});

		var minTop; 
		$next.on('click', function() {
			var top = parseInt($item.css('margin-top'));
			top = top - step;
			if(minTop == undefined) {
				var $a = $item.find('a');
				var _h = $a[0].offsetHeight, _l = $a.length;
				minTop = -(_h*_l - parseInt($item.parent().height())); 
			}
			top < minTop && (top = minTop);
			$item.stop().animate({'margin-top': top +'px'}, 'fast');
			return false;
		});

		//点击事件
		var _index = 0;
		$items = $item.find('a');
		$items.on('click', function() {
			if($(this).hasClass('active')) return false;
			_index = $(this).parent().index();

			F.ga('button', 'click', 'structure_details_switch');

			$items.removeClass('active');
			$(this).addClass('active');
			$img.css('opacity', 0);
			$img.stop().animate({
				'opacity': 1
			} );
			$img.attr('src', $(this).data('bg'));
			return false;
		});

		/*
		this.$partsWrap.on('click', 'img', function(e) {
			$items.toggle();
		});
		*/

		$items.eq(0).trigger('click');
		
		//键盘控制图片切换
		this.$partsWrap.find('.items').on('mouseenter', function(){
			_index = $item.find('a.active').parent().index();
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
					$next.trigger('click');
					if( _index == $items.length - 1 ) return false;
					_index++;
				}
				$items.eq(_index).trigger('click');
				return false;
			});

		});
		this.$partsWrap.find('.items').on('mouseleave', function(){
			$(document).off('keydown');
			$(document.body).off('DOMMouseScroll');
			$(document.body).off('mousewheel');
		});

		
	},

	//进度条
	loadingBar: function(opts) {
		this.opts = $.extend({
			container: "",
			start: 0,
			width: 150,
			height: 20,
			css: {}
		}, opts);

		this.$container = $(this.opts.container);
		this.$process = this.$container.find('.J_loading_process');
		this.$text = this.$container.find('.J_loading_text');
		//set width and height
		this.$container.css(this.opts.css).css({width: this.opts.width, height: this.opts.height});
		this._total = this.opts.width - this.opts.start;

		this.process = function(process) {
			this.$process.css('width', process*(this._total) );
			this.$text.text((process*100).toFixed(0)+'%');
		};
		this.show = function() {
			this.$container.show();
		};
		this.hide = function() {
			this.$container.hide();
		}
	},

	//图片切换
	imgPlayer: function(opts) {
		opts = $.extend({
			container: "",
			data: [],
			onChange: function(){},
			loadCompleted: function(){},
			onLoading: function(){}
		}, opts);
		
		var self = this;
		var $img;
		var $container = $(opts.container);

		var width, offset, imgIndex = 0;
		var imgLen = opts.data.length;
		var initialized = false;
		
		this.initialize = function() {
			if(initialized) return ;

			var imgUnloadlength = imgLen;
		
			if (!imgUnloadlength) return ;

			$.each(opts.data, function(i, url) {
				F.loadImg(url, function() {
					opts.onLoading(imgUnloadlength);
					imgUnloadlength--;
					if (imgUnloadlength == 0) {
						loadCompleted();
					}
				});
			});
			initialized = true;
		};

		this.goPrev = function() {
			imgIndex -= 1;
			imgIndex < 0 && (imgIndex = 0);
			self.setImg(imgIndex);
		};

		this.goNext= function() {
			imgIndex += 1;
			imgIndex > imgLen && (imgIndex = imgLen);
			self.setImg(imgIndex);
		};

		function loadCompleted() {
			$img = $("<img alt='unbox' />").attr("src", opts.data[0]).appendTo($container);
			opts.loadCompleted();
			initEvent();
		};
		
		this.setImg = function (i, isCurrent) {
			opts.onChange(i, isCurrent);
			$img.attr('src', opts.data[i]);
		};

		function initEvent() {
			var moveEvent = function(e) {
				offset = $container.offset()
				var leftX = F.getMousePos(e).x - offset.left; 
				imgIndex = Math.round(imgLen*leftX/width);
				self.setImg(imgIndex, true);
			};

			$img.on('mouseenter', function() {
				width = $container.width();
				$(this).on('mousemove', moveEvent);
			});
			
			$img.on('mouseleave', function(e) {
				$(this).off('mousemove', moveEvent);
				var leftX = F.getMousePos(e, $container).x;
				if(leftX < 0) {
					self.setImg(0);
				}else if(leftX > width) {
					self.setImg(imgLen-1);
				}
					
			});
		};
	},

	//打分系统
	Score: function(opts) {
		opts = $.extend({
			wrap: '',
			maxScore: 5,
			defaultScore: 0, 
			onClick: function() {}
		}, opts);

		this.currentScore = opts.defaultScore;
		var self = this;
		var $wrap = $(opts.wrap);

		//建立dom结构
		function initHtml() {
			var _html = '';
			for(var i=0; i<opts.maxScore; i++) {
				_html += '<span class="score_star tool_icons';
				if(i < opts.defaultScore) {
					_html += ' active';	
				}
				_html += '"></span>';	
			}
			$wrap.append(_html);
		}

		function initEvent() {
			self.$stars = $wrap.find('.score_star');
			self.$stars.on('mouseenter', function() {
				var _i = $(this).index();
				setPoint(_i+1);
			});
			self.$stars.on('mouseleave', function() {
				setPoint();
			});

			//打分
			self.$stars.on('click', function() {
				var _i = $(this).index();
				opts.onClick(_i, $(this), self);
				return false;
			});
		}

		function setPoint(p) {
			if(!p) {
				p = self.currentScore;
			}

			self.$stars.removeClass('active');
			self.$stars.filter(function(index) {
				return index < p;
			}).addClass('active');
		};

		this.setPoint = setPoint;

		initHtml();
		initEvent();
	}
});
