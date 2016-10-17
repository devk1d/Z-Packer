
Z.define('personal/collect',{
	initialize: function() {
		this.$wrap = $('.collect_wrap');		
		this.load();
	},
	load: function() { 
		var self = this;
		var load_page = 1;	
		
		self.$wrap.on('click', '.tab_change', function() {
			$.get('/personal/GetRecCollect', function(json) {
				if(json.status == 200) {
					self.$wrap.find('.empty_con').html(json.message.html);
				}
			}, 'json');
		});
		
		self.$wrap.on('click', '.view_all_collect', function() {
			/*
			$('.per_main_wrap').html('');		
			
			$.get('/personal/getAllCollect', function(html) {
				$('.per_main_wrap').html(html);
			},'html');
			*/	
		});
		
		var $initHtml = self.$wrap.find('.collec_post_wrap').html();
		//加载更多
		self.$wrap.on('click', '.load_more_btn', function() {
			var $this = $(this);	
			var max_page = $this.data('maxpage');	
			var uid = $this.data('uid');	

			if($this.find('span').html() == '收起') {
				self.$wrap.find('.collec_post_wrap').html($initHtml);
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
				$.get('/personal/GetCollectMore/' + uid, data, function(json) {
					if(json.status == 200) {
						self.$wrap.find('.collec_post_wrap').append(json.message.html);
					}
					if(load_page >= max_page ) {
						$this.find('span').html('收起');
					} else {
						$this.find('span').html('加载更多');
					}
					//$this.find('span').html('加载更多');
				}, 'json');
			}
		});
	}
});
