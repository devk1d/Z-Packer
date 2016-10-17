
Z.define('personal/hotTag',{
	initialize: function() {
		this.$wrap = $('.hotTag_wrap');		
		this.load();
	},
	load: function() { 
		var self = this;
		
		$('.spinner').each(function(index, el) {
			var pra = $(this).data('praise');	
			if(pra < 10 ) {
				pra = 10;	
			}
			if(pra > 300) {
				pra = 300;	
			}
			var num = (pra/300)*360;
			
			if(num <= 180) {	
				$(this).find('.right').css('transform', "rotate(" + (num + 180) + "deg)");
				$(this).find('.left').css('transform', "rotate(" + (-180) + "deg)");
			} else {
				$(this).find('.left').css('transform', "rotate(" + num  + "deg)");
			}
		});
		
		/*
		$.get('/personal/GetGoodAt', function(json) {
			if(json.status == 200) {
				self.$wrap.find('.empty_con').html(json.message.html);
			}
		}, 'json');
		*/
		self.$wrap.on('click', '.tab_change', function() {
			$.get('/personal/GetGoodAt', function(json) {
				if(json.status == 200) {
					self.$wrap.find('.empty_con').html(json.message.html);
				}
			}, 'json');
		});
	}
});
