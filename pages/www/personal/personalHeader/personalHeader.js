
Z.define('personal/personalHeader', {
	initialize: function() {				
		this.$person_header_wrap = $(".per_header_main");
		this.bindEvent(); //绑定事件
	},
	bindEvent: function() {
		var self = this;
		
		self.$person_header_wrap.find('.header_pic span').hover(function() {
			self.$person_header_wrap.find('.header_score_wrap').toggle();	
		});
	}
});
