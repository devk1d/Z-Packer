Z.define('mediawifi/page', {
	initialize: function() {
		var $button = $('#bt1');
		$button.on('click', function(){
			var $this = $(this);
			$this.hide();
			$('#bt2').show();

			//setTimeout(function(){
			//	$this.html('登入中...').css('background','#a8a8a8');
			//}, 100);
		})
	}
})
