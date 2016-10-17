<div id="loading"></div>
<div class="lucky_contain">
	<div class="lucky_box">
		<img class="musicOn animationOn" src='music.png'>
		<div class="monkey">
		</div>
		<div class="lucky_innerbox">
			<div class="item"></div>
			<div class="item"></div>
			<div class="item"></div>
		</div>
		<div class="lucky_footerbox">
			<div class="footerbox_detail">
				<div><p>剩余抽奖次数&nbsp;&nbsp;x&nbsp;<span>0</span></p></div>
				<a>查看抽奖说明>></a>
			</div>
			<img class="btn" src="machine_pole0.png" data-token="{=Yii::app()->getRequest()->getCsrfToken()}">
		</div>
	</div>
	<audio autoplay="autoplay" loop="true" src="{_STATIC_HOST}file/bgm.mp3" id="audio_a"></audio>
	<audio src="{_STATIC_HOST}file/award.mp3" id="audio_award"></audio>
	<audio src="{_STATIC_HOST}file/pan.mp3" id="audio_pan"></audio>
	<audio src="{_STATIC_HOST}file/pole.mp3" id="audio_pole"></audio>
	<div class="overlay">
	</div>
	<div class="overlay1">
	</div>
	<div class="lucky_message">
	</div>
	<div class="lucky_tips">
		<div class="tips_content_s">
			<p class="grade"></p>
			<p class="font_s"></p>
			<img src="" class="award_img">
			<img src="award_btn.png" class="award_btn">
		</div>
		<img src="award_bg_yes.png">
		<div class="close_r"></div>
	</div>
	<div class="nolucky_tips">
		<div class="tips_content">
			<img src="award_share_weibo.png" class="weibo">
			<img src="award_share_qzone.png" class="img_e zone">
		</div>
		<img src="award_bg_no.png">
		<div class="close_r"></div>
	</div>
	<div class="nochance_tips">
		<div class="tips_content nochance_tipsc">
			<img class="nochance_img weibo" src="nochance_weibo.png">
			<img class="nochance_img img_e zone" src="nochance_qzone.png">
		</div>
		<img src="nochance.png" class="nochance_i">
		<div class="close_g"></div>
	</div>
	<div class="lucky_awardsign">
		<div class="awardsign_inner">
		<form>
		<p>
		<label>姓名</label>
		<input class="name" type="text" required>
		</p>
		<p>
		<label>电话</label>
		<input class="phone" type="number" required>
		</p>
		<p>
		<label>地址</label>
		<input class="area" type="text" required>
		</p>
		<img class="commit" src="table_btn.png">
		<p class="font_ss">＊中奖结果将会于2月26日在APP首页公布</p>
		</form>
		</div>
	</div>
	<div class="lucky_success">
		<div class="tips_content">
			<img src="table_weibo.png" class="weibo">
			<img src="table_qzone.png" class="img_e zone">
		</div>
		<div class="close_r"></div>
	</div>
	<span class="notice">ok! </span>
</div>


<!--{scriptPool}-->
<script>
Z.use('lucky/page');
<!--Z.use('lucky/page', {appId: '{$appId}', timestamp: '{$timestamp}', nonceStr: '{$nonceStr}', signature: '{$signature}'});-->
</script>
<!--{/scriptPool}-->
