
Z.define('personal/useTag',{
	initialize: function() {
		this.$wrap = $('.useTag_wrap');		
		this.load();
	},
	load: function() { 
		var self = this;
		
		self.$wrap.on('click', '.tab_change', function() {
			$.get('/personal/GetUseTag', function(json) {
				if(json.status == 200) {
					self.$wrap.find('.empty_con').html(json.message.html);
				}
			}, 'json');
		});
	}
});
