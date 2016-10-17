
Z.define('personal/variousPost',{
	initialize: function() {
		this.$wrap = $('.various_post_wrap');		
		this.$content_wrap = $('.various_content_wrap');	
		this.dataCache = {};
		this.load();
	},
	
	load: function() { 
		var self = this;

		self.$wrap.on('click', '.tab_change', function() {
			$.get('/personal/GetRecPost', function(json) {
				if(json.status == 200) {
					self.$wrap.find('.empty_con').html(json.message.html);
				}
			}, 'json');
		});
		
		/*
		self.$wrap.on('click', 'h2 a', function() {
			self.$wrap.find('h2 a').removeClass('active');
			$(this).addClass('active');
			var _data = {};
			var _type = $(this).data('type');
			_data.type = _type;
			_data.t = +new Date();
			_data.uid = self.$wrap.data('uid');		
			if(self.dataCache[_type]) {
				self.$content_wrap.html('');
				self.$content_wrap.html(self.dataCache[_type]);
			} else {	
				$.get('/personal/getVariousPost', _data, function(json) {
					if(json.status == 200) {
						self.dataCache[_type] = json.message.html;				
						self.$content_wrap.html(self.dataCache[_type]);
					} else {
						alert(json.message);
					}
				}, 'json');
			}
		});
		*/
	}
});
