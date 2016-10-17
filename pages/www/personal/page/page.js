
Z.define('personal/page', {
	initialize: function() {				
			
		this.$wrap = $('.per_main_wrap');
		this.setPage(); //分页操作
		this.bindEvt();	
	},
	
	setPage: function() {
		var self = this;
		var currentPage = this.$wrap.find('.personal_inner_wrap').data('page');
		var totalPage = Math.ceil(this.$wrap.find('.personal_inner_wrap').data('totalnum')/5);
		
		var page = new PageHtml({
			wrap: self.$wrap.find('.page_center'),
			next: true,
			goHtml: true,
			currentPage: currentPage,
			totalPage: totalPage,
			callback: function(html, isCache) {
			}
		});
	},

	bindEvt: function() {
		var self = this;
		var $personal_inner_wrap = self.$wrap.find('.personal_inner_wrap');
		var $personal_right = $('.per_right_wrap');
		if(($personal_inner_wrap.data('pos') == 'yes')) {
			F.scrollTo($personal_inner_wrap, -60);	
		} 
		$personal_inner_wrap.on('click', '.tab_change', function() {
			$.get('/personal/GetRecPost', function(json) {
				if(json.status == 200) {
					$personal_inner_wrap.find('.empty_con').html(json.message.html);
				}
			}, 'json');
		});
		
		
		//var topH = $(window).scrollTop() || $(document).scrollTop();	
		var topH = $(document).scrollTop();	
		
		if(topH < 216) {
			$personal_right.css('top', 340 - $(window).scrollTop());
		} 
		if(topH > 216) {
			$personal_right.css('top', 62);
		} 
		
		var	topheight1 =  $(".goodat").offset().top ;
		var	topheight2 =  $(".joinat").offset().top ;
		var	topheight3 =  $(".joingroup").offset().top;
		var	topheight4 =  $(".collect").offset().top;
		var	topheight5 =  $(".comment").offset().top;
		var heights = [topheight1, topheight2, topheight3, topheight4, topheight5];	
		var heights_count = heights.length;
		var $menulis = $personal_right.find('ul a');
		
		$(window).scroll(function () {	
			$personal_right.show();		
			var toph = $(window).scrollTop() || $(document).scrollTop();	
		
			if(toph < 216) {
				$personal_right.css('top', 340 - $(window).scrollTop());
			} 
			
			if(toph == 0) {
				$personal_right.css('top', 340);
			} 
			
			if(toph > 216) {
				$personal_right.css('top', 62);
			} 

			if($(document).height() - toph < 750 ) {
				$personal_right.hide();		
			}

			var last = 0;

			for(var i = 0; i < heights_count; i++) {
				/*	
				if( i == 4) {
					if((heights[i] - 20 < toph)) {
						$menulis.removeClass('active');			
						$($menulis[i]).addClass('active');	
					}
				} else if(toph == 0) {
					$menulis.removeClass('active');			
					$($menulis[0]).addClass('active');	
				} else {
					if((heights[i] - 20 < toph) && (toph < heights[i] + 20)){ 
						$menulis.removeClass('active');			
						$($menulis[i]).addClass('active');	
					}
				}
				*/
				if( toph > heights[i] - 80 ) {
					last = i;	
				} else  {
					break;	
				}
			}
			$menulis.removeClass('active');			
			$($menulis[last]).addClass('active');	
		});
	},
});
