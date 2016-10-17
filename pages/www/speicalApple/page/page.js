Z.define('speicalApple/page', {
	initialize: function() {
		this.$wrap= $('.wrap');
		this.bindEvent();
	},

	bindEvent: function(){ 
		var self = this;
		var $specAppContainer = self.$wrap.find('.specApp_container');

		$specAppContainer.on('click', '.specApp_link', function(e){
			var $curr = $(this);
			var name = $curr.data('name');

			F.ga('button','click', name);
		}); 
	}
});
