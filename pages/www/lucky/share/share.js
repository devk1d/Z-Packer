Z.define('lucky/share', {
	initialize: function() {
		var height = document.documentElement.clientHeight;
		var width = document.documentElement.clientWidth;
		var isBegin = false;

		$('.lucky_contain').css({'height': height*0.98, 'marginTop': height*0.02});
		$('.lucky_box').css('width', height*0.5);
		$('.overlay').css({'height': height, 'width': width});
		$('.close_r').css('height', height*0.1);
		$('.item').css('width', $('.item').innerWidth());
		var u = $('.item').innerWidth()*264/166;
		
		//点击抽奖操作
		$('.btn').click(function(){
			if(isBegin) return false;
			isBegin = true;
			var result = Rand();
			$(".audio_pole")[0].play();    //播放
			var arr = (result + '').split('');
			$(this).attr('src','machine_pole.gif');
			$(".audio_pan")[0].play();    //播放  	
			$('.item').css('backgroundPositionY', 0);
			$('.item').each(function(index){
				var item = $(this);
				setTimeout(function(){
					item.animate({
						backgroundPositionY: (u*20)-(u*arr[index])
					},{
						duration: 2000+index*500,
						easing: 'easeInOutCirc',
						complete: function(){
							if(index==2){
							isBegin = false;
							setTimeout(function(){
							$('.overlay').css('display', 'block');
								$('.lucky_tips').css('display', 'block');
								$(".audio_award")[0].play();    //播放 	
							},500);
							}
						}
					});
				}, index * 300);
			});
		});
		//随机函数(不中奖)	
		function Rand(){
			var rand = 0;
				do{
					var x = parseInt(Math.random()*5+1);
					var y = parseInt(Math.random()*5+1)*10;
					var z = parseInt(Math.random()*5+1)*100;
					rand = x + y + z;
				}while(rand%111==0)
			return rand;
		}
		$('.close_r').click(function(){
			$('.lucky_tips').css('display', 'none');	
			$('.overlay').css('display', 'none');	
		});

	}
});
