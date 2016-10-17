
Z.define('global/mediaHeader', {
	initialize: function() {
		//二级导航置顶
		var $mediaNav = $('.media_nav');
		var navTop = function(){
			if( $(document).scrollTop() > 40 ){
				$mediaNav.css({'top':0}).find('.nav_arrow').hide();
			}
			else{
				$mediaNav.css({'top':40 - $(document).scrollTop()}).find('.nav_arrow').show();
			}
		};
		navTop();
		$(window).scroll(navTop);
	}
});
