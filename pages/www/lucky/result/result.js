/*
* @Title
* @Author Oak_YJJ
* @Date   2016年02月26日 星期五 19时21分51秒
*/

Z.define('lucky/result', {
	initialize: function() {
		var height = document.documentElement.clientHeight;
		var width = document.documentElement.clientWidth;
		$('.lucky_contain').css('height', height);
		$('.header').css({'width': width,'height': 0.15*height});
		$('.article').css({'width': width,'height': 0.7*height,'marginTop': 0.15*height});
		$('.picture').css({'height': 4.5*width,'backgroundPositionY': 0.05*height});
		$('.footer').css({'width': width,'height': 0.15*height});
	}
});
