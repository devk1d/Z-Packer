Z.define('page/page',{
	initialize: function() {
		this.$wrap = $('.wrap');
		this.bindEvent();

	},
	bindEvent: function(){ 
		var self = this;
		var params = F.parseURL().params;
		var pageType = params.type;
		self.$wrap.find('.content_left a').removeClass('sidebar_active').closest('[otype=' + pageType + ']').addClass('sidebar_active');
	}
});
	
