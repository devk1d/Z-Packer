
Z.define('personal/personalRight',{
	initialize: function() {
		this.$wrap = $('.per_right_wrap');		
		this.load();
	},
	load: function() { 
		var self = this;
		var $liItems = self.$wrap.find('ul');	
		 
		$liItems.on('mouseenter','a', function(e) {
			//$curr = $(e.currentTarget) == $(this);
			$liItems.find('a').removeClass('hover_active');
			$(this).addClass('hover_active');
		}).on('mouseout','a', function() {
			$liItems.find('a').removeClass('hover_active');
		});
		
		$liItems.on('click','a', function(e) {
			//$curr = $(e.currentTarget) == $(this);
			$liItems.find('a').removeClass('active');
			$(this).addClass('active');
		});	
	}
});
