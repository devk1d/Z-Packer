
//登录弹窗
var Dialog = function(opts) {
	this.opts = $.extend({
		content: '',
		popClose: false,
		ok: ['确认', function() {

		}],
		cancel: ['取消', function() {

		}],
		close: function() {
		},
		height: '',
		width: ''
	}, opts);

	this.init();
};

Dialog.prototype = {
	init: function() {
		this.createDom();
		this.bindEvent();
	},
	createDom: function() {
		var _html = [], self = this;

		_html.push('<div class="global_dialog">');
		_html.push('<div class="dialog_closebg">');
		_html.push('</div>');

		_html.push('<div class="dialog_inner">');

		if(self.opts.popClose) {
			_html.push('<div class="dialog_close">x');
			_html.push('</div>');

		}

		_html.push('<div class="dialog_content">');
		_html.push('</div>');

		_html.push('</div>');
		_html.push('</div>');

		this.$wrap = $(_html.join(''));
		$wrapinnerWidth = this.opts.width;
		$wrapinnerHeight = this.opts.height;
		var autoHeight = ($wrapinnerHeight == 0 ) ? 'autoHeight' : '';
		this.$wrap.find(".dialog_inner").addClass(autoHeight).css({'margin-left': -($wrapinnerWidth/2), 'margin-top': -($wrapinnerHeight/2)});

		this.$wrap.find('.dialog_content').append(this.opts.content);

		$('body').append(this.$wrap);
		this.$close = this.$wrap.find('.pop_close');
	},
	bindEvent: function() {
		var self = this;

		this.$close.on('click', function(e) {
			self.opts.close && self.opts.close(e);
			self.hide();
		});
	},
	show: function() {
		this.$wrap.show();
	},
	hide: function() {
		this.$wrap.hide();
	},
	setContent: function(html) {
		this.$wrap.find('.dialog_content').html(html);
	},
	on: function() {
		this.$wrap.on.apply(this.$wrap, arguments);
	},

	find: function() {
		return this.$wrap.find.apply(this.$wrap, arguments)
	},
};


//global Drawer
var Drawer = function(opts) {
	this.opts = $.extend({
		wrap: '',
		onSelect: function() {
		}
	}, opts);

	this.init();
};

Drawer.prototype = {
	init: function() {
		this.$wrap = $(this.opts.wrap);
		this.$drawer = this.$wrap.find('ul.drawer_list');
		this.bindEvent();
	},
	bindEvent: function() {
		var self = this;
		this.$wrap.on('mouseenter', function() {
			self.$drawer.show();
		});
		this.$wrap.on('mouseleave', function() {
			self.$drawer.hide();
		});
		this.$drawer.on('click', 'li', function(e) {
			var $this = $(this);

			self.opts.onSelect && self.opts.onSelect($this);

			e.stopPropagation();
		});
	}
};

//分页
var Page = function(opts) {
	this.opts = $.extend({
		wrap: '',
		num: 3,  //定义当前页面的前后显示个数
		currentPage: 1,
		totalPage: 0,
		data: {},
		url: '/media',
		type: 'json',
		next: true,
		prev: true,
		loadWrap: '',
		callback: function(data, currentPage, isCache) {
		}
	}, opts);
	this.init();
};


Page.prototype = {
	init: function() {
		this.dataCache = {};
		var _page = F.parseURL().params.page;
		if(_page) {
			this.setStyle(_page);
			this.getData(_page);
		}else{
		    this.setStyle(this.opts.currentPage);
		}
	},

	setStyle: function(cp) {

		this.currentPage = cp;
		this.totalPage = this.opts.totalPage;
		var html = '';
		var begin = 1;
		var end = this.opts.totalPage;
		var cNum = this.opts.num;
		var showPage = 2*cNum+3;
		var cltNum = (showPage+1)/2;
		this.currentPage = parseInt(this.currentPage);

		//设定上一页
		//获取url当前页面

		var queryPage = F.parseURL().query;
		var i = queryPage.search(/page=/);
		queryPage = queryPage.slice(i+5);

		if(this.opts.prev) {
			html += '<a class="prev" style="display: none" data-value='+ this.currentPage+' href="javascript:;"> &lt;</a>';
			if(queryPage && queryPage>1) {
				$('.global_page').find('.prev').show().data('value', queryPage);
			}
		}
		var pageLink = function(i, type) {
			type = type || '';

			if(type == 'current') {
				return '<a href="javascript:;" class="curr page">' +i+ '</a>';
			} else if(type == 'dot') {
				return '<span>&nbsp;</span>';
			}
			return '<a href="javascript:;" class="page" title="第'+i+'页">'+i+'</a>';
		};

        //首尾样式...
		var dot = pageLink('','dot');
		var dotEnd = pageLink('','dot')+pageLink(this.totalPage);

		//分页处理 1~9
		if(this.totalPage <= showPage) {
			for(var i=1; i<=this.totalPage; i++) {
				if(this.currentPage == i) {
					html += pageLink(i, 'current');
				}else {
					html += pageLink(i);
				}
			}

		} else {
			// 当前页小于6页 1~8...end
			if(this.currentPage <=cltNum) {
				for(var i=1; i<=showPage-1; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				}
				html += dotEnd;

			}else {
				//当前页大于6页前面加上1...c-3~c+3...end
				 html += pageLink(1);
				 html += dot;

				 begin = this.currentPage - cNum;
				 end =  this.currentPage + cNum;

				 //当最后4页的时候不显示后面的
				 //1...end-7~end
				 if(this.totalPage - this.currentPage <= cNum+1) {
					 end = this.totalPage;
					 begin = this.totalPage - (2*cNum+1);
				 }

				 //当前页切换
				 for(var i=begin; i<=end; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				 }
				 if(end != this.totalPage) {
					html += dotEnd;
				 }
			}
		}



		this.$wrap = $(this.opts.wrap);
		this.$page = $('<div class="global_page">');

		if(this.opts.next) {
			html += '<a class="next" data-value='+ this.currentPage+' href="javascript:;">&gt; </a>';
		}

        //如果只有一页，不显示分页
		if(this.totalPage <= 1) {
			html = '';
		}

		this.$page.html(html);
		this.$wrap.empty().append(this.$page);
		this.$pageNum = this.$page.find('a');

		this.bindEvent();

	},
	bindEvent: function() {
		var self = this;

		/*$(window).bind('popstate',  function(event) {
			var page = (event.originalEvent.state && event.originalEvent.state.page) ? event.originalEvent.state.page : '1';
		    self.setStyle(page);
			self.getData(page);
		});*/

		//分页操作
		this.$page.on('click', '.page', function() {
			var $this = $(this);
			//当前页不进行操作
			if($this.hasClass("curr")) {
				return false;
			}
			self.currentPage = parseInt($this.text());

			//设定样式
		    self.setStyle(self.currentPage);
			//获取数据
			self.getData(self.currentPage);

			//上一页隐藏
			if(self.currentPage == 1) {
				$('.global_page').find('.prev').hide();
			}else {
				$('.global_page').find('.prev').show();
			}
			//下一页隐藏
			if(self.currentPage >=  self.opts.totalPage) {
				$('.global_page').find('.next').hide();
			}

			var urlQuery = F.parseURL().query.replace(/[?&]page=(\d)*/, '');
			//console.log(urlQuery);
			var type =  (urlQuery === '') ? 'all' : urlQuery.split('=')[1];
			//console.log(type);

			window.history.pushState && window.history.pushState({"page": self.currentPage, "type": type}, '');

			//上一页隐藏
			if(this.currentPage == 1) {
				$('.global_page').find('.prev').hide();
			}else {
				$('.global_page').find('.prev').show();
			}
			//下一页隐藏
			if(this.currentPage >=  self.opts.totalPage) {
				$('.global_page').find('.next').hide();
			}

			var urlQuery = F.parseURL().query.replace(/[?&]page=(\d)*/, '');
			var params = urlQuery + (urlQuery.indexOf('?') > -1 ? '&' : '?') + 'page='+this.currentPage;
			//console.log(urlQuery);
			var type =  (urlQuery === '') ? 'all' : urlQuery.split('=')[1];
			//console.log(type);

			//window.history.pushState && window.history.pushState({"page": this.currentPage, "type": type}, '', params);

			return false;
		})

		//上一页
		this.$page.on('click', '.prev', function() {
			var $this = $(this);
			var prevPage = $this.data('value')-1;

			if(prevPage >= 1) {
				self.setStyle(prevPage);
				self.getData(prevPage);
			}

			//上一页隐藏
			if(prevPage == 1) {
				$('.global_page').find('.prev').hide();
			}else {
				$('.global_page').find('.prev').show();
			}
			//window.history.pushState && window.history.pushState({"page": prevPage}, '', '?page='+prevPage);
		})
		//下一页
		this.$page.on('click', '.next', function() {
			var $this = $(this);
			var nextPage = $this.data('value')+1;

			if(nextPage <= self.opts.totalPage) {
				self.setStyle(nextPage);
				self.getData(nextPage);
			}
			$('.global_page').find('.prev').show();

			//下一页隐藏
			if(nextPage >= self.opts.totalPage) {
				$('.global_page').find('.next').hide();
			}
			//window.history.pushState && window.history.pushState({"page": nextPage}, '', '?page='+nextPage);
		})

	},

	getData: function(cp) {
		var self = this;
		this.currentPage = cp;
		if(this.opts.loadWrap) {
			this.opts.loadWrap.html('<div class="load_wrap"><span class="loading"></span></div>');
		}
		if(this.dataCache[this.currentPage]) {
			this.opts.callback && this.opts.callback(this.dataCache[this.currentPage], this.currentPage, true);
			return ;
		}

		if(this.opts.type == 'html') {
			$.post(this.opts.url, $.extend({page: self.currentPage}, this.opts.data), function(html) {
				self.dataCache[self.currentPage] = html;
				self.opts.callback && self.opts.callback(html, self.currentPage, false);
			});
		}else {
			$.post(this.opts.url, $.extend({page: self.currentPage}, this.opts.data), function(json) {
				if(json.status == 200) {
					self.dataCache[self.currentPage] = json;
					self.opts.callback && self.opts.callback(json, self.currentPage, false);
				}else {
					alert(json.message);
				}
			}, 'json');
		}
	}
}

//html分页样式
var PageHtml = function(opts) {
	this.opts = $.extend({
		wrap: '',
		num: 3,  //定义当前页面的前后显示个数
		currentPage: 1,
		totalPage: 0,
		next: true,
		prev: true
	}, opts);
	this.init();
};

PageHtml.prototype = {
	init: function() {
		this.setStyle(this.opts.currentPage);
	},
	setStyle: function(cp) {
		this.currentPage = cp;
		this.totalPage = this.opts.totalPage;
		var html = '';
		var begin = 1;
		var end = this.opts.totalPage;
		var cNum = this.opts.num;
		var showPage = 2*cNum+3;
		var cltNum = (showPage+1)/2;
		this.currentPage = parseInt(this.currentPage);

		//设定上一页
		var getUrl = function(i) {
			var url = F.parseURL().source;
			var regPage = /page=([0-9]*)/;
			if(regPage.test(url)) {
				var urlPage = parseInt(RegExp.$1);
				url = url.replace(regPage,'page=' + i);
			}else {
				url = F.parseURL().path + '?page=' + i;
			}
			return url;
		}

		if(this.opts.prev && this.currentPage >1 ) {
			html += '<a class="prev"  data-value='+ this.currentPage + ' href="' + getUrl(this.currentPage-1) + '"> &lt;</a>';
		}

		var pageLink = function(i, type) {
			type = type || '';

			if(type == 'current') {
				return '<a href="' + getUrl(i) + '" class="curr page">' +i+ '</a>';
			} else if(type == 'dot') {
				return '<span>&nbsp;</span>';
			}
			return '<a href="' + getUrl(i) + '" class="page" title="第'+i+'页">'+i+'</a>';
		};

        //首尾样式...
		var dot = pageLink('','dot');
		var dotEnd = pageLink('','dot')+pageLink(this.totalPage);

		//分页处理 1~9
		if(this.totalPage <= showPage) {
			for(var i=1; i<=this.totalPage; i++) {
				if(this.currentPage == i) {
					html += pageLink(i, 'current');
				}else {
					html += pageLink(i);
				}
			}

		} else {
			// 当前页小于6页 1~8...end
			if(this.currentPage <=cltNum) {
				for(var i=1; i<=showPage-1; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				}
				html += dotEnd;

			}else {
				//当前页大于6页前面加上1...c-3~c+3...end
				 html += pageLink(1);
				 html += dot;

				 begin = this.currentPage - cNum;
				 end =  this.currentPage + cNum;

				 //当最后4页的时候不显示后面的
				 //1...end-7~end
				 if(this.totalPage - this.currentPage <= cNum+1) {
					 end = this.totalPage;
					 begin = this.totalPage - (2*cNum+1);
				 }

				 //当前页切换
				 for(var i=begin; i<=end; i++) {
					if(this.currentPage == i) {
						html += pageLink(i, 'current');
					}else {
						html += pageLink(i);
					}
				 }
				 if(end != this.totalPage) {
					html += dotEnd;
				 }
			}
		}



		this.$wrap = $(this.opts.wrap);
		this.$page = $('<div class="global_page">');

		if(this.opts.next && this.currentPage < this.totalPage) {
			html += '<a class="next" data-value='+ this.currentPage+' href="' + getUrl(this.currentPage+1) + '">&gt; </a>';
		}

        //如果只有一页，不显示分页
		if(this.totalPage <= 1 || isNaN(this.totalPage)) {
			html = '';
		}

		this.$page.html(html);
		this.$wrap.empty().append(this.$page);
	}
}

var Loadmore = function(opts) {

	this.opts = $.extend({
		wrap: '',
		requestData: {},
		url: '',
		count: 10,  //显示的数量
		callback: function() {
		}
	}, opts);

	this.init();
}

Loadmore.prototype = {
	init: function() {
		var self = this;
		var $wrap = self.opts.wrap;
		//load内容
		this.$moreWrap = $wrap.find('.global_more_wrap');
		//load.gif
		this.$loadGif = $wrap.find('.global_load');
		//显示加载更多
		this.$loadBox = $wrap.find('.global_more_content');

		this.total_num = 0;  //
		this.page = 1; //scroll请求
		this.postSwitch = true; //防止到达底部的多次触发

		this.bindEvent();
		this.getData();
	},
	bindEvent: function() {
		var self = this;
		var winHeight = $(window).height();
		var _distance = 50; //滑动距离底边距

		$(window).scroll(function(){
			var scrollPos = $(window).scrollTop();
			var totalHeight = parseFloat(winHeight) + parseFloat(scrollPos);
			var docHeight = parseFloat($(document).height());
			var _max_page = Math.ceil(self.total_num/self.opts.count); //多请求了一次,加载更多
			if(docHeight-_distance < totalHeight && self.page <= _max_page && self.postSwitch) {
				self.postSwitch = false;
				self.page++;
				self.getData(self.page);
			}

			if(self.page > _max_page) {
				self.$loadBox.show();
			}
		});
	},
	getData: function(page) {
		var self = this;
		var _url = self.opts.url;
		var _data = self.opts.requestData;
		var _count = self.opts.count;

		page = page || 1;

		self.$loadGif.show();

		_data.page = page; //请求page
		_data.count = _count;
		_data.t = +new Date();

		$.get(_url, _data,function(json) {
			self.postSwitch = true;
			if(json.status == 200) {
				setTimeout(function(){}, 2000)
				self.$loadGif.hide();
				self.$loadBox.hide();
				self.$moreWrap.append(json.message.html);
				self.total_num = json.message.total_number;
				if(self.total_num < self.opts.count) {
					self.$loadBox.show();
				}
				self.opts.callback && self.opts.callback();
			}else {
				alert(json.message);
			}
		}, 'json');
	}
}

// 全局 google 事件统计
$('body').on('click', '.global_gaNode', function(){
	var $this = $(this);
	// 点击位置说明
	var lable = $this.data('galabel') || '';
	// 点击的数据 id， e.g. banner id
	var id = $this.data('id') || 0;
	// value 其实是统计某个位置点击一次返利多少钱
	var value = $this.data('gavalue') || 0;
	// 默认以页面 URL 来分类: zealer.com  zealer.com/index/index/2?type=eco 应该属于同一个页面 zealer.com
	var url = F.parseURL();
	var ctr = url.controller == 'index' ? '/' : '/' + url.controller;
	var act = url.action == 'index' ? '' : '/' + url.action;
	var category = url.protocol + '://' + url.host + ctr + act;

	// 首页大广告位 banner 需要统计到具体哪个banner（以 id 区分）
	if(lable.indexOf('home_banner_big_detail') > -1) {
		var contentLable = lable + '_' + id;
		F.ga('home_big_banner', 'click', contentLable, value);
	}
	// 区域点击统计
	F.ga(category, 'click', lable, value);
});
