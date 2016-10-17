
Z.define('personal/joinGroup',{
	initialize: function() {
		this.$wrap = $('.joinGroup_wrap');		
		this.load();
	},
	load: function() { 
		var self = this;
		var load_page = 1;	
		
		self.$wrap.on('click', '.tab_change', function() {
			$.get('/personal/GetRecJoinGroup', function(json) {
				if(json.status == 200) {
					self.$wrap.find('.empty_con').html(json.message.html);
				}
			}, 'json');
		});

		//加入小组操作	
		self.$wrap.on('click', '.no_add', function() {
			//if(self.islogin) {
				var $this = $(this);
				var data = {
					group_id: $this.data('groupid'),
				}
				$.get('/personal/AddGroup', data, function(json) {
					if(json.status == 200) {
						$this.hide();	
						$this.siblings('.yes_add').show();	
					}
				}, 'json');
			//} else {
				//loginDialog.show();
			//}	
		});
		
		var $initHtml = self.$wrap.find('.join_groups').html();
		//加载更多
		self.$wrap.on('click', '.load_more_btn', function() {
			var $this = $(this);	
			var max_page = $this.data('maxpage');	
			var uid = $this.data('uid');
			
			if($this.find('span').html() == '收起') {
				self.$wrap.find('.join_groups').html($initHtml);
				$this.find('span').html('加载更多');
				load_page = 1;	
				return;	
			}
			if(load_page < max_page) {
				load_page ++;	
				var data = {
					page: load_page,	
				}
				if($this.find('span').html() == '加载中...') {
					return;
				}
				$this.find('span').html('加载中...');
				$.get('/personal/GetJoinGroup/'+ uid, data, function(json) {
					if(json.status == 200) {
						self.$wrap.find('.join_groups').append(json.message.html);
					}
					if(load_page >= max_page ) {
						$this.find('span').html('收起');
					} else {
						$this.find('span').html('加载更多');
					}
				}, 'json');
			}
		});
		
		/*
		//加载更多
		var loadMore = new Loadmore({
			wrap: $('.join_groups'),
			requestData: {},
			url: '/personal/getJoinGroup',
			count: 6,
			callback: function() {
			}
		});
		*/
	}
});
