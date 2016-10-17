Z.define('data/tools', {

	initialize: function(opts) {
		//this.initEvent();
		this.share();

		/*var $tagHead = $(".tools_head.post_"+ opts.defaultTag +"_head");
		if($tagHead.length) {
			$tagHead.addClass('active');
		}*/
	},
	/*initEvent: function() {
		var $toolsHead = $(".tools .tools_head");
		var $videoHead = $(".post_video_head");
		var $titleList = {'结构外观':'tools_products_label', '配置参数':'tools_configure_label', '相机':'tools_camera_label', '屏幕':'tools_screen_label', '续航':'tools_battery_label', '温度':'tools_temp_label'}
		
		$toolsHead.on("click", function(){
			var $this = $(this);
			var $wrap = $this.next('.tools_wrap');

			if(!$wrap.data('done')) 
				return ;
			
			$wrap.stop().slideToggle('', function() {
				if($wrap.is(':visible')) {
					$this.find('.head_icon').addClass('active');
					$wrap.trigger('init');
					var $title = $.trim($this.text());
					var $label = eval('$titleList.' + $title);
					F.ga('tab', 'click', $label);
				}else {
					$this.find('.head_icon').removeClass('active');
				}
			});
			

			$toolsHead.not($this).not($videoHead).each(function(i, item) {
				var $this = $(this);
				var $wrap = $this.next('.tools_wrap');
				$wrap.stop().slideUp('', function() {
					$this.find('.head_icon').removeClass('active');
				});
			});
			return false;
		});
	},*/
	//尺标
	scale: function(opts) {
		var self = this;

		this.opts = $.extend({
			dom: '',
			num: 5
		}, opts);

		this.$dom = this.opts.dom;

		this.setDom = function() {
			var html = ''+
				'<div class="tools_scale">'+
				'		<div>'+
				'			<ul class="scale_item">';
				for(var i=1; i<self.opts.num; i++) {
					html += '<li class="item_'+i+'"><span></span></li>';
				}

				html += 	'<li class="item_'+i+'"><span></span><span class="scale_last"></span></li>'+
				'			</ul>'+
				'			<div class="item_light"><span></span></div>'+
				'			<div class="item_recommend"></div>'+
				'			<div class="recommend_text"></div>'+
				'		</div>'+
				'</div>';

			self.$dom.append(html);
			self.$items = self.$dom.find('.scale_item').find('li');
			self.$items.css('width', self.opts.width/self.opts.num-1);
			self.$level = self.$items.find('span');
			self.$light = self.$dom.find('.item_light');
			self.$lightIcon = self.$light.find('span');
			self.$rec = self.$dom.find('.item_recommend');
			self.$recText = self.$dom.find('.recommend_text');
		};

		this.setData = function(data) {
			self.$level.each(function(i, item) {
				var $this = $(this);
				$this.text(data[i]);
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
			onClick: function(){}
		}, opts);

		self.$dom = opts.dom;
		self.$defaultPhone = self.$dom.find('.tool_compPhone');	
		self.$select = self.$dom.find('.compare_list');
		self.$company = self.$select.find('.list_choose');
		self.$phones = self.$select.find('.list_like');
		self.$selects = self.$phones.find('ul li');
		self.$btn = self.$select.find('.select_btn');
		self.$img = self.$select.find('.list_img');
		//open用来判断对比宽是否打开
		var open = false;

		//switch用来只能从手机信息顶部打开对比框，其它地方不能打开
		if( self.$dom.data('switch') == 1 ) self.$defaultPhone.css('cursor', 'pointer');

		self.$defaultPhone.on('click', function(){
			$newIcons = $(this).find('.new_icons');
			if( self.$dom.data('switch') == 1 ){
				if( !open ){
					self.$dom.find('.tool_icons').addClass('active');
					self.show();
					self.$dom
					open = true;
					
					if( $newIcons.length ){
						//判断是否为视网膜屏
						if( $newIcons.height() == 14 ){
							$newIcons.addClass('iconup2x');
						} else {
							$newIcons.css('background-position', '0 -510px');
						}
					}
				} else {
					self.$select.hide();
					open = false;
					if( $newIcons.length ){
						//判断是否为视网膜屏
						if( $newIcons.height() == 14 ){
							$newIcons.removeClass('iconup2x');
						} else {
							$newIcons.css('background-position', '0 -471px');
						}
					}
				}
			}
			return false;
		});
		
		var companyId, phoneId;
		//用来判断是否品牌和机型都已经选择了
		var comfirmBtn = false;
		var chooseCompany = false;

		self.$company.on('click', 'div', function(){
			var $this = $(this).addClass('new_icons_active');
			$list = $(this).siblings('ul');
			self.$phones.find('ul').hide();

			if( $list.is(':visible') ){
				$list.hide();
				$(this).removeClass('new_icons_active');
			}
			else {
				$list.show();
				$list.on('click', 'li', function(){
					$this.text($(this).text());
					$(this).parent().siblings('div').removeClass('new_icons_active');
					$list.hide();

					companyId = $(this).data('id');
					comfirmBtn = false;
					chooseCompany = true;

					changeList();
					$list.off('click');
				});

				F.ga('button', 'click', 'change_brand');
				//var _index = $(this).get(0).selectedIndex;
			}
		});
		self.$phones.on('click', 'div', function(){
			if( chooseCompany ){
				var $this = $(this).addClass('new_icons_active');
				$list = $(this).siblings('ul');

				if( $list.is(':visible') ){
					$list.hide();
					$(this).removeClass('new_icons_active');
				} else {
					if( $list.find('li').length > 0 ){
						$list.show();
					}
					F.ga('button', 'click', 'change_model');
				}
			} else {
				var _time = 200;
				self.$company.css('border', '1px solid #008cff');
				setTimeout(function(){
					self.$company.css('border', '1px solid #eceef1');
					setTimeout(function(){
						self.$company.css('border', '1px solid #008cff');
						setTimeout(function(){
							self.$company.css('border', '1px solid #eceef1');
						}, _time);
					}, _time);
				}, _time);
			}
		});
		
		var nowChoose = null;
		var nowEvent = null;

		//选择机型
		self.$phones.find('ul').on('click', 'li', function(e){
			self.$phones.find('div').text($(this).text());
			$(this).parent().siblings('div').removeClass('new_icons_active');
			$(this).parent().hide();
			phoneId = $(this).data('id');
			self.$img.find('.img_phone').hide();
			var src = $(this).data('img');

			F.loading(self.$img, 'blackNew', true);
			F.loadImg(src, function() {
				F.unloading(self.$img);
				self.$img.find('.img_phone').attr("src", src).show();
			});
			
			comfirmBtn = true;
			nowChoose = this;
			nowEvent = e;
			//若不是通过点击而是通过trigger来触发的
			if( $(this).attr('isclick') == 'no' ){
				self.$btn.trigger('click');
			}
			$(this).attr('isclick', 'yes');
		});

		self.$btn.on('click', function(){
			if( comfirmBtn ){
				//self.$defaultPhone.attr('data-id', $(nowChoose).data('id')).html($(nowChoose).html());
				opts.onClick(nowEvent, nowChoose);
				self.$select.hide();
			}
			F.ga('button', 'click', 'change_confirm');
		});

		//自定义手机列表
		function changeList(){
			self.$phones.find('div').text('请选择型号');
			if( companyId ){
				$.post('/data/searchPhone', {company: companyId}, function(json){
					if( json.status == 200 ){
						if( json.message.list.length > 0 ){
							var _html = '';
							var total_num = 0;
							$.each(json.message.list, function(i, item){
								if( item['id'] == window.mobile_id ){
								} else {
									var color = JSON.stringify(item.color);
									_html += '<li isclick="yes" data-id=' + item['id'] + ' data-img=' + item['cover'] + ' data-color='+ color +'>' + item['name'] + '</li>';
									total_num++;
								}
								//optionHtml += '<option data-id=' + item['id'] +' data-color='+ color +'>' + item['name'] + '</option>';
							});
							var $likePhone = self.$select.find('.like_phone');
							$likePhone.html(_html);
							if( total_num > 5 ) $likePhone.css('overflow-y', 'scroll');
							else $likePhone.css('overflow-y', 'visible');
							self.$phones.find('div').css('color', '#757e91');
						} else {
							self.$select.find('.like_phone').html('没有相应的手机');
						}
					} else {
						alert('查询失败');
					}
				}, 'json');
			}
		}

		/*function changeRadio(e, othis){
			var _index = $(othis).parent().index();
			self.$radios = self.$select.find('.list_like input');
			self.$radios.prop('checked', false);
			self.$radios.eq(_index).prop('checked', true);
			self.$defaultPhone.attr('data-id', $(othis).data('id')).html($(othis).html());
			self.$select.hide();
			opts.onClick(e, othis);
			return false;
		}*/
		self.show = function() {
			self.$select.show();
			$('body').on('click', self.hide);
		};
		self.hide = function(e) {
			if( $(e.target).closest('.compare_list').length == 0 ){
				self.$dom.find('.tool_icons').removeClass('active');
				self.$select.hide();
				self.$phones.find('ul').hide();
				self.$company.find('ul').hide();
				$('body').off('click', self.hide);
				self.$select.find('div').css('background-position', '226px -548px');
			}
		};
	},

	//相机成分分析--亮度纵向线条
	verticalLine: function(opts) {
		var self = this;
		this.opts = $.extend({
			wrap: '',
			x: [],
			y: [],
			width: 500,
			height: 400,
			data: [],
			onHover: function(xv, yv) {
			}
		}, opts);

		this.$wrap = this.opts.wrap;
		this.height = this.opts.height;
		this.width = this.opts.width;
		this.lenX = this.opts.x.length;
		this.lenY = this.opts.y.length;
		this.y_scale = (this.height)/(this.lenY-1);
		
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

			self.$wrap.append(_html);
		};
		//scaleNum是刻度的数量
		var scaleNum = 0;
		function drawScale() {
			var _tipperHtml = '';
			$.each(self.opts.data, function(i, item) {
				var vertical_scale = 36;	
				scaleNum = item.length;
				$.each(item, function(j, subItem) {
					var _x = (scaleNum - j)*vertical_scale;
					var _y = 0;
					var _ox = subItem.x;
					var _oy = subItem.y;
					
					_tipperHtml += tipper(_x, _y, _ox, _oy, i, j, subItem.v);
				});
			});
			self.$wrap.append(_tipperHtml);
		};

		function tipper(x, y, ox, oy, i, j, v) {
			var posY = -994 - j * 49; 
			return '<div class="tipper'+ (v?' hasImg':'') + (i==0?'':' black') +'" ox='+ox+' oy="'+oy+'" style="left: 36px; top: '+(x-45)+'px; background-position: -8px ' + posY + 'px;"><div></div></div>';
		};

		function bindEvent() {
			var $tips = self.$wrap.find('.tipper');

			self.$tips = $tips;
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
			//初始化时显示亮度值
			var topest = $tips.find('.tipper').length/2;
			var ox = $tips.find('.tipper').eq(topest-1).attr('ox');
			var $dom = $tips.filter('[ox=' + ox + ']').stop(true).animate({'opacity': 1}, 30);
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
					
					var _matchNum = scaleNum - 1 - Math.round(moveY/self.y_scale);
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
		};

		this.setData = setData;
		drawScale();
		setHtml();
		bindEvent();
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
					_svgHtml += rect(0, _h*i, self.width, _h, (i%2?'#fbfbfb':'#fff'));
					//画线
					_svgHtml += line(0, _h*i, self.width, _h*i, '#fff');
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
				_svgHtml += '" stroke="'+ (i==0?'#ffd200':'#008cff') +'" fill="none"/>';
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
			return '<div class="tipper'+ (v?' hasImg':'') + (i==0?' pink':' black') +'" ox='+ox+' oy="'+oy+'" style="left: '+x+'px; top: '+y+'px; '+ (v?'background-image: url('+v+')':'') +'" ><div>'+oy+'</div></div>';
		};

		var allLength, otherLength, currentLength, minLength, maxLength, longOne;

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
			
			allLength = self.$wrap.find('.hasImg').length;
			otherLength = self.$wrap.find('.hasImg.pink').length;
			currentLength = self.$wrap.find('.hasImg.black').length;
			minLength = Math.min(currentLength, otherLength);
			maxLength = Math.max(currentLength, otherLength);
			longOne = currentLength > otherLength ? 'black' : 'pink';

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
					//$tip1为最短线的最后的点，$tip2为最长线超过最短线的点
					var $tip1 = {};
					var $tip2 = {};
					var $tip = {};
					
					//当鼠标超过最短线段时
					if( _matchNum >= (minLength -1) ){
						if( _matchNum >= (maxLength ) ) return false;
						$tip1 = $tips.not('.'+longOne).eq(minLength - 1);
						$tip2 = $tips.filter('.'+longOne).eq(_matchNum);

						var ox = $tip2.attr('ox');
						var $dom1 = $tip1.stop(true).animate({'opacity': 1}, 30);
						var $dom2 = $tips.filter('.'+longOne).filter('[ox="'+ox+'"]').stop(true).animate({'opacity': 1}, 30);

						$tips.not($dom1).not($dom2).stop(true).animate({'opacity': 0}, 30);
						//$tips.not($dom2).stop(true).animate({'opacity': 0}, 30);

						//self.opts.onHover(moveX, moveY, $dom, e);
					} else {
						//当鼠标在最短线段内时
						$tip = $tips.eq(_matchNum);
						var ox = $tip.attr('ox');
						var $dom = $tips.filter('[ox="'+ox+'"]').stop(true).animate({'opacity': 1}, 30);
						$tips.not($dom).stop(true).animate({'opacity': 0}, 30);

						//self.opts.onHover(moveX, moveY, $dom, e);
					}

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

		
	},
	share: function() {
		var $container = $('#content');
		var $videoHead = $container.find('.post_video_head ');
		var $title = $videoHead.find('.video_title');
		var $wb_share = $('.post_answer');

		//网页title
		var title = 'ZEALER「'+$title.text()+'」';

			//微博按钮
			var $wb_shareBtn = $videoHead.find('.share_icon .weibo');

			//空间按钮
			var $qz_shareBtn = $videoHead.find('.share_icon .qzone');

			//分享文字
			var wb_title = title+'（分享自 @ZEALER中国）';

			//分享图片
			var pic = $(this).find('img').attr('src')?$(this).find('img').attr('src'):'';
			//分享地址
			//var url = document.URL;
			var url = '';
			if (typeof letvcloud_player_conf !== 'undefined') {
				url = encodeURIComponent('http://yuntv.letv.com/bcloud.html?uu='+letvcloud_player_conf.uu+'&vu='+letvcloud_player_conf.vu);
			} else {
				url = document.URL;
			}
			var wb_appkey = "";
			var	wb_ralateUid = "3097378697";
			var wb_language = "zh_cn";
			var _height= 400;
			var _width = 600;
			var q_top = ($(window).height()-_height)/2;
			var q_left = ($(window).width()-_width)/2;

			$wb_shareBtn.on("click", function() {
				window.open("http://service.weibo.com/share/share.php?url="+url+"&appkey="+wb_appkey+"&title="+wb_title+"&ralateUid="+wb_ralateUid+"&language="+wb_language+"","_blank","width="+_width+", height="+_height+", top="+q_top+",left="+q_left+"");
				return false;
			});

			$qz_shareBtn.on("click", function() {
				window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+url+"&summary="+wb_title+"&title="+title+"&pics="+pic+"","_blank","width="+_width+", height="+_height+", top="+q_top+",left="+q_left+"");
				return false;
			});
	}
});

