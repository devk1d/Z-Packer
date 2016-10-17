Z.define('login/page', {
	initialize: function() {
		this.$wrap = $('.wrap');
		this.doSelect();
		this.changeCode();
	},
	//单选
	doSelect: function() {
		var $selectBtn = this.$wrap.find('.page_select');
		$selectBtn.on('click', function() {
			var $this = $(this);
			if($('.select_box').length >1) {  //控制多选
				$('.select_box').removeClass('active');
			}
			var $selectBox = $this.find('.select_box');
			if($selectBox.hasClass('active')) {
				$selectBox.removeClass('active');
			}else {
				$selectBox.addClass('active');
			}
		})
	},
	changeCode: function() {
		//切换验证码
		$('img.verify').on('click', function() {
			var _num = $(this).data('num');

			this.src = WWW_HOST+ 'login/viewCode?a='+ _num +'&t=' + (+new Date());
			$(this).siblings('input[name="verification"]').val('').focus();
		});
	}
})
