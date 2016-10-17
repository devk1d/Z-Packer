Z.define('data/info', {
	initialize: function() {
		var $infoInner = $('.info_inner');
		var $tips = $infoInner.find('.info_box');
		var $tipBlock = $infoInner.find('.info_tipsbg');
		var $tipsIcon = $infoInner.find('.info_tips');

		$tips.on('mouseover', function() {
			$tipBlock.show();
			$tipsIcon.addClass('tipsActive');
		})
		$tips.on('mouseout', function() {
			$tipBlock.hide();
			$tipsIcon.removeClass('tipsActive');
		})

	}
})
