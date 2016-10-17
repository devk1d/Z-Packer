
Z.define('data/tools_show', {
	initialize: function(opts) {
		this.initEvent();

		var $tagHead = $(".tools_head.post_"+ opts.defaultTag +"_head");
		if($tagHead.length) {
			$tagHead.addClass('active');
		}
	},

	initEvent: function() {
		var self = this;

		

		var $toolsHead = $(".tools .tools_head");
		var $headTabs = $toolsHead.find('.head_tabs');
		var $videoHead = $(".post_video_head");
		var $titleList = {'结构外观':'tools_products_label', '配置参数':'tools_configure_label', '相机':'tools_camera_label', 
		'屏幕':'tools_screen_label', '续航':'tools_battery_label', '温度':'tools_temp_label', 'ZEALER 点评': 'tools_comment_label'}
	
		// click incons(left&right) and tilte to open/close tool
		// 点击每个测评内容 
		$toolsHead.click(function(e){
			var $this = $(this);
			var $target = $(e.target);
			var $headTabs = $this.find('.head_tabs');
			var $wrap = $this.next('.tools_wrap');
			var $confMore = $('.conf_compareMore');

			if(!$wrap.data('done')) return;

			$wrap.stop().slideToggle('', function() {
				var $headRight = $this.find('.head_right_icon');
				if($wrap.is(':visible')) {
					$headRight.addClass('right_icon_active');

					$(this).trigger('ga');
					//$this.find('.head_icon, .head_right_icon').addClass('active');
					$headTabs.show();
					self.liAnimate($headTabs);
					$('body,html').animate({scrollTop: 571}, 600);	
					$(this).trigger('init');
					//var $title = $.trim($this.find('.head_title').text());
					//var $label = eval('$titleList.' + $title);
					//F.ga('tab', 'click', $label);
				} else {
					$headRight.removeClass('right_icon_active');
					//$this.find('.head_icon, .head_right_icon').removeClass('active');
				    $headTabs.find('li').animate({bottom: '-32px', opacity: 0}, 'fast');
					//$headTabs.hide();
				}
			});
			
			// 关闭其他工具
			$toolsHead.not($this).each(function(i, item) {
				var $this = $(this);
				var $wrap = $this.next('.tools_wrap');

				//$headIcon = $wrap.closest('.tools').find('.head_right_icon');
				//$.each($headIcon, function(i, item){
					if( $(item).find('.head_right_icon').hasClass('right_icon_active') ) $(item).find('.head_right_icon').removeClass('right_icon_active');
				//});

				$wrap.stop().slideUp('', function() {
					$this.find('.head_icon, .head_right_icon').removeClass('active');
					$this.find('.head_tabs').hide();
				});
			});


			// 关闭配置参数更多抽屉
			//$confMore.stop().slideUp('fast').parent().find('.info_more').removeClass('active');
			return false;
		});

		var $toolsContent = $('.tools_content');
		$toolsContent.on('click', 'li', function(){
			var type = $(this).data('type');
			$('.post_' + type + '_head').trigger('click');
		});

	},

	liAnimate: function($ul) {
		var $lis = $ul.find('li');

		$.each($lis, function(index, item) {
			$item = $(item);
			$item.animate({bottom: '0px', opacity: 1}, 100 * index);
		});
	},

	//尺标
	scale: function(opts) {
		var self = this;

		this.opts = $.extend({
			dom: '',
			vertical: false, // 水平还垂直
			num: 5
		}, opts);

		this.$dom = this.opts.dom;
		var verticalClass = this.opts.vertical ? 'scale_vertical' : '';

		this.setDom = function() {
			var html = ''+
				'<div class="tools_scale ' + verticalClass + '">'+
				'		<div>'+
				'			<ul class="scale_item">';
				for(var i=1; i<self.opts.num; i++) {
					html += '<li class="item_' + i + ' ' + verticalClass + '"><span></span></li>';
				}

				html += 	'<li class="item_'+i+' ' + verticalClass + '"><span></span><span class="scale_last"></span></li>'+
				'			</ul>'+
				'			<div class="item_light"><span></span></div>'+
				'			<div class="item_recommend"></div>'+
				'			<div class="recommend_text"></div>'+
				'		</div>'+
				'</div>';

			self.$dom.append(html);
			self.$items = self.$dom.find('.scale_item').find('li');

			if(verticalClass) {
				self.$items.css('height', self.opts.height/self.opts.num-1);
			} else {
				self.$items.css('width', self.opts.width/self.opts.num-1);
			}

			self.$level = self.$items.find('span');
			self.$light = self.$dom.find('.item_light');
			self.$lightIcon = self.$light.find('span');
			self.$rec = self.$dom.find('.item_recommend');
			self.$recText = self.$dom.find('.recommend_text');
		};

		this.setData = function(data) {
			self.$level.each(function(i, item) {
				var $this = $(this);
				$this.html(data[i]);
				if($this.hasClass('scale_last')) {
					$this.css('margin-right', $this.textWidth()/-2); 
				}else {
					$this.css('margin-left', $this.textWidth()/-2); 
				}
			});
		};

		//设置推荐区域，from，to: 传入的是百分比: 例如0,60%
		this.setRecommend = function(text, from, to) {
			self.$recText.text(text);
			self.$rec.css({
				left: from + '%',
				width: to-from + '%'
			});

			var _recWidth = self.$rec.outerWidth();
			var _textWidth = self.$recText.outerWidth();

			self.$recText.css({
				left: from + '%',
				marginLeft: (_recWidth-_textWidth)/2
			});
		};

		//设置高亮宽度
		this.setWidth = function(width, stepCall, doneCall) {
			if(width) {
				this.$light.dequeue().stop().animate({'width': width}, {
					duration: 'fast',
					step: stepCall, 
					done: function() {
						doneCall && doneCall();
					}
				});
			}else {
				this.$light.stop().delay(500).animate({'width': width}, {
					duration: 'fast',
					step: stepCall,
					done: function(){
						self.$light.hide();
						self.$level.removeClass('active');
						doneCall && doneCall();
					}
				});
			}

			this.$light.show();
		};

		this.initEvent = function() {
			//推荐区域
			this.$dom.on('mouseenter', function() {
				if(self.$recText.text()) {
					self.$rec.show();	
					self.$recText.show();	
					self.$level.hide();
				}
			}).on('mouseleave', function() {
				if(self.$recText.text()) {
					self.$rec.hide();	
					self.$recText.hide();
					self.$level.show();
				}
			});
		};
		this.setDom();
		this.initEvent();
	},
	//横向条表
	chartTools: function(opts) {
		this.opts = $.extend({
			wrap: '',
			option: '',
			htmlStruct: '',
			data: {},
			defaultIndex: 0, //默认展示数据的下标，传入'all'为所有的和
			isRevert: false, //是否倒序
			maxWidth: 0,
			maxActive: 999
		}, opts);

		this.$wrap = this.opts.wrap;

		var len = 0;
		this.choosed = {};
		for(var i in this.opts.data) {
			len = this.opts.data[i].length;
			break;
		}
		for(var j=0; j<len; j++) {
			if(this.opts.defaultIndex == 'all') {
				this.choosed[j] = 1;
			}else if (this.opts.defaultIndex == j){
				this.choosed[j] = 1;
			}else {
				this.choosed[j] = 0;
			}
		}

		this.init = function() {
			var _html = '';
			for(var i in this.opts.data) {
				_html += this.opts.htmlStruct(i);	
			}

			this.$wrap.append(_html);
			this.$wrap.css({width: this.opts.maxWidth+95, height: this.$wrap.height()});

			this.$items = this.$wrap.find('.chart_item');

			this.$items.each(function(i, val){
				$(val).data('pos', $(val).position());		
			});

			this.$items.each(function(i, val) {
				var $val = $(val);
				$val.css({
					position: 'absolute',
					left: $val.data('pos').left,
					top: $val.data('pos').top
				});
			});
			
			this._bindEvent();
		};

		this.setData = function() {
			var self = this;
			var data = {};
			var maxWidth = this.opts.maxWidth*0.01;
			
			for(var i in this.opts.data) {
				data[i] = 0;
				for(var j in this.choosed){
					if(this.choosed[j] == 1) {
						data[i] += this.opts.data[i][j];
					}
				}
				data[i] = F.round_number(data[i], 10);
			}
			
			data = this.sort(data);
			
			$.each(data, function(i, val) {
				var label = val[0];
				var width = maxWidth*val[1];
				var top = val[2];
				var $label = self.$wrap.find('.item_label[text="'+label+'"]').parent().attr('val', val[1]).end();

				var $itemNum = $label.siblings('.item_num').stop().animate({width: width}, '', '', function(){
					$label.parent().stop().animate({top: top});
				}).attr('width', width);

				if(self._isShowData) {
					self.hideData();
				}
			});
		};

		this.sort = function(data) {
			var self = this;
			var _data = [];
			var top = 0;
			for(var i in data) {
				_data.push([i, data[i]]);
			}
			_data.sort(function(a, b) {
				return self.opts.isRevert ? (Number(a[1]) - Number(b[1])) : (Number(b[1]) - Number(a[1]));
			});
			
			$.each(_data, function(i, val) {
				val = val.push(top+40*i);
			});

			return _data;
		};

		this._isShowData = false;
		this.showData = function(func) {
			this.$items.each(function(i, val) {
				var $val = $(val);
				var _text = $val.attr('val');
				$val.find('.item_num').text(func ? func(_text) : _text);
			});
			this._isShowData = true;
		};
		this.hideData = function() {
			this.$items.each(function(i, val) {
				var $val = $(val);
				$val.find('.item_num').text('');
			});
			this._isShowData = false;
		};
		this.toggleData = function(func) {
			if(this._isShowData) {
				this.hideData();
			}else {
				this.showData(func);
			}
		};
		
		this._bindEvent = function() {
			var self = this;

			this.$wrap.on("click", ".item_label, .item_num", function() {
				var $parent = $(this).parent();

				if(!$parent.hasClass('current'))
					$parent.toggleClass('active');

				//统计
				var gaType = $(this).data('type');
				if(gaType) {
					switch(gaType) {
						case 'camera':
							F.ga('column', 'click', 'tools_camera_top_column');	
							break;
						case 'temp':
							F.ga('column', 'click', 'tools_temp_top_column');	
							break;
						case 'battery':
							F.ga('column', 'click', 'tools_baterry_top_column');	
							break;
					}
				}

				return false;
			});

			this.$wrap.on("dblclick", ".item_label, .item_num", function() {
				self.$items.not('.current').removeClass('active');
				$(this).parent().addClass('active');
				return false;
			});

		};
	},
	//下拉菜单
	select: function(opts) {
		var self = this;
		opts = $.extend({
			dom: '',
			data: [],
			defaultKey: '',
			onClick: function() {
				
			}
		}, opts);
		this.$dom = opts.dom;
		this.$dom.append('<a href="#">'+opts.defaultKey+'</a>');
		//append html
		var _html = '';
		$.each(opts.data, function(i, item) {
			_html += '<a href="#">'+item+'</a>';
		});
		this.$dom.append('<div class="select">' + _html + '</div>');
		
		//bindEvent
		this.$current = this.$dom.children('a');
		this.$select = this.$dom.find('.select');
		this.$selects = this.$select.children('a');
		this.$current.on('click', function(e) {
			self.$selects.each(function(i, item) {
				if($(item).text() == self.$current.text()) {
					$(item).addClass('current');
				} else {
					$(item).removeClass('current');
				}
			});
			self.show();
			return false;
		});

		this.$select.on('click', 'a', function(e) {
			var _name = $(this).text();
			self.$current.text(_name);
			self.hide();
			opts.onClick(e, this);
			return false;
		});

		this.show = function() {
			self.$select.show();
			$('body').on('click', self.hide);
		};
		this.hide = function() {
			self.$select.hide();
			$('body').off('click', self.hide);
		};

	},
	//线条表格
	lineChart: function(opts) {
		var self = this;
		this.opts = $.extend({
			wrap: '',
			x: [],
			y: [],
			width: 500,
			height: 400,
			data: [
			],
			onHover: function(xv, yv) {
			
			}
		}, opts);

		this.$wrap = this.opts.wrap;
		this.height = this.opts.height;
		this.width = this.opts.width;
		this.lenX = this.opts.x.length;
		this.lenY = this.opts.y.length;
		this.y_min = parseInt(this.opts.y.slice(-1));
		this.y_max = this.opts.y[0];
		this.x_max = parseInt(this.opts.x.slice(-1));
		this.x_min = this.opts.x[0];
		this.x_scale = (this.width)/(this.lenX-1);
		this.y_scale = (this.height)/(this.lenY-1);

		this.y_num = this.height/(this.y_max - this.y_min);
		this.x_num = this.width/(this.x_max - this.x_min);
		//this.x_scale = (this.x_max - this.x_min)/(this.lenX-1);
		//this.y_scale = (this.y_max - this.y_min)/(this.lenY-1);
		
		this.$wrap.css({width: self.width, height: self.height});
		//设置html
		function setHtml() {
			var _html = '';
			//y线
			_html += '<div class="lineY">';
			$.each(self.opts.y, function(i, item) {
				_html += '<div style="top: '+ ((self.opts.height/(self.lenY-1))*(self.lenY-1-i)-7.5) +'px;">'+ item +'</div>';
			});
			_html += '</div>';
			
			//x线
			_html += '<div class="lineX">';
			$.each(self.opts.x, function(i, item) {
				var _w = (i == self.opts.x.length-1) ? 0 : self.opts.width/(self.lenX-1);
				var _marginL = (i == self.opts.x.length-1) ? -7 : -$.textWidth(item)/2;
				_html += '<div style="width: '+ _w +'px; text-indent: '+ _marginL +'px;">'+ item +'</div>';
			});
			_html += '</div>';

			self.$wrap.append(_html);
		};

		function drawSVG() {
			var _h = (self.height)/(self.lenY-1);
			
			var _svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="'+ self.width +'" height="'+ self.height +'">';
			var _tipperHtml = '';
			$.each(self.opts.y, function(i, item) {
				if(i+1 != self.lenY) {
					//画矩形
					_svgHtml += rect(0, _h*i, self.width, _h, (i%2?'#25272c':'#353941'));
					//画线
					_svgHtml += line(0, _h*i, self.width, _h*i, '#575d6b');
				}
			});

			$.each(self.opts.data, function(i, item) {
				_svgHtml += '<path d="';

				$.each(item, function(j, subItem) {
					var _x = j*self.x_scale;
					var _y = self.y_num*(subItem.y-self.y_min);
					var _ox = subItem.x;
					var _oy = subItem.y;


					if(j == 0) {
						_svgHtml += 'M';	
					} else {
						_svgHtml += 'L';
					}
					_svgHtml += _x +' '+ _y + ' ';

					_tipperHtml += tipper(_x, _y, _ox, _oy, i, j, subItem.v);
				});
				_svgHtml += '" stroke="'+ (i==0?'#05e88e':'#abb0bc') +'" fill="none"/>';
			});

			self.$wrap.append(_tipperHtml + _svgHtml);
		};

		function rect(x, y, w, h, c) {
			return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" style="fill:'+c+';" />';
		};

		function line(x1, y1, x2, y2, c, w) {
			w = w || 1;
			y1 += 0.5;
			y2 += 0.5;
			return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" style="stroke:'+c+';stroke-width:'+w+'" />';
		};

		function tipper(x, y, ox, oy, i, j, v) {
			return '<div class="tipper'+ (v?' hasImg':'') + (i==0?'':' black') +'" ox='+ox+' oy="'+oy+'" style="left: '+x+'px; top: '+y+'px; '+ (v?'background-image: url('+v+')':'') +'" ><div>'+oy+'</div></div>';
		};

		function bindEvent() {
			var $tips = self.$wrap.find('.tipper');

			self.$tips = $tips;

			self.opts.onTipperHover && $tips.hover(function(e) {
				self.opts.onTipperHover(e, $(this));
			});

			$.each($tips, function(i, item) {
				var $item = $(item);
				var _top = parseInt($item.css('top'));
				var _ox = $item.attr('ox');
				
				if(i >= self.lenX) 
					return false;

				var $sib = $item.siblings('.tipper[ox="'+ _ox +'"]');
				var _sibTop = parseInt($sib.css('top'));
				var _len;
				var a = $item.hasClass('hasImg');
				var b = $sib.hasClass('hasImg');

				if(a && b) {
					_len = 75;
				}else if((!a && b) || (a && !b)) {
					_len = 75;
				}else if(!a && !b) {
					_len = 40;
				}
				
				if(_top > _sibTop && _top -_sibTop < _len) {
					$(item).addClass('b');
				}
				else if(_top < _sibTop && _sibTop - _top < _len) {
					$sib.addClass('b');
				}

			});

			var _contentOffset,
				mouseMove = function(e) {

					_contentOffset = self.$wrap.offset();

					var mouseP = F.getMousePos(e, self.$wrap);
					var moveX = mouseP.x;
					var moveY = mouseP.y;

					if(moveX < 0 || moveX > self.width || 
						moveY < 0 || moveY > self.height
						) {
						return ;
					}
					
					
					var _matchNum = Math.round(moveX/self.x_scale);

					var $tip = $tips.eq(_matchNum);

					var ox = $tip.attr('ox');
					var $dom = $tips.filter('[ox="'+ox+'"]').stop(true).animate({'opacity': 1}, 30);

					$tips.not($dom).stop(true).animate({'opacity': 0}, 30);

					self.opts.onHover(moveX, moveY, $dom, e);

					return false;
					
				};

			self.$wrap.on('mouseenter', function() {
				$(this).on('mousemove', mouseMove);
			});

			self.$wrap.on('mouseleave', function() {
				$(this).off('mousemove', mouseMove);
			});


		};

		function setData(data) {
			self.opts.data = data;
			draw();
		};

		this.setData = setData;

		drawSVG();
		setHtml();
		bindEvent();
	}
});

