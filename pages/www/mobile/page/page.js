var Page = function(opts) {
	this.opts = $.extend({
		wrap: '',
		currentPage: 1,
		totalPage: 0,
		data: {},
		url: '/geturl',
		callback: function(data) {
		}
	}, opts);

	this.init();
};

Page.prototype = {
	init: function() {
		this.currentPage = this.opts.currentPage;
		this.totalPage = this.opts.totalPage;

		this.html = '<div class="global_page box3 clear">'+
					'<button  data-page="prev">&lt;&nbsp;上一页</button>'+
					'<button data-page="1" class="page_num">'+ this.currentPage+'/'+this.totalPage +'</button>'+
					'<button data-page="next">下一页&nbsp;&gt;</button></div>';

		this.$wrap = $(this.opts.wrap);

		this.$wrap.html(this.html);
		//如果小于1页不显示分页
		if(this.opts.totalPage<=1) {
			this.$wrap.html('');
		}
		this.$page = this.$wrap.find('.global_page');
		this.$pageNum = this.$page.find('.page_num');
		this.$btNext = this.$wrap.find("button").eq(2);		
		this.$btPrev = this.$wrap.find("button").eq(0);		
		this.dataCache = {};

		this.bindEvent();
	},
	bindEvent: function() {
		var self = this;
		this.locked = false;
		this.$page.on('click', 'button', function() {
			if(self.locked == true) {
				return false;
			}

			var page = $(this).data('page');

			if(isNaN(Number(page))) {
				switch(page) {
					case 'prev': 
						--self.currentPage;
						self.currentPage == 1 && (self.$btPrev.css("color", "#c8cbd3"));
						self.currentPage < 1 && (self.currentPage = 1);
						self.$btNext.css("color","#757e91");
						self.getData();
						break;
					case 'next': 
						self.getData(++self.currentPage);
						self.currentPage == self.totalPage && (self.$btNext.css("color", "#c8cbd3"));
						self.$btPrev.css("color","#757e91");
						break;
				}
			}
			});
	},
	getData: function() {
		var self = this;

		if(this.currentPage > this.totalPage) {
			this.currentPage = this.totalPage;
			return ;
		}else if(this.currentPage < 1) {
			this.currentPage = 1;
			return ;
		}

		if(this.dataCache[this.currentPage]) {
			this.opts.callback && this.opts.callback(this.dataCache[this.currentPage]);
			this.$pageNum.text(this.currentPage+'/'+self.totalPage);
		}else {
			self.locked = true;
			$.get(this.opts.url, $.extend({page: self.currentPage}, this.opts.data), function(json) {
				self.locked = false;
				if(json.status == 200) {
					if($.trim(json.message) == '') {
						self.currentPage--;
						self.$pageNum.text(self.currentPage+'/'+self.totalPage);
						return ;
					}else {
						self.dataCache[self.currentPage] = json.message;
						self.opts.callback && self.opts.callback(self.dataCache[self.currentPage]);
						self.$pageNum.text(self.currentPage+'/'+self.totalPage);
					}
				}else {
					alert(json.message);
				}
			}, 'json');
		}
	}
}
