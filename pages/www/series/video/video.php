<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 15 Jun 2016 04:37:23 PM CST
*/
?>
<!-- flash 插件 -->
{scripts STATIC_HOST."js/swfobject.js"}

<?
$vu = $uu = $title = '';

$video = count($video) ? $video[0] : $video;
$video_pic = count($video_pic) ? $video_pic[0] : $video_pic;

if (count($video)) {
	$vu = $video['vu'];
	$uu = $video['uu'];
	$title = $video['title'];
}
?>

<?if($vu != '' && $uu != '') {?>
<div class="video_player" data-vu="{$vu}" data-uu="{$uu}">
	<div id="post_playerWrap"></div>
</div>

<div class="series_letvH5Player">
	<script>
		var uu = "{$uu}";
		var vu = "{$vu}";
		var letvjsURL = STATIC_HOST + 'js/letv.min.js';
		var winW = window.innerWidth > 1120 ? 1120 : window.innerWidth;
		var winH = winW * 9 / 16;
		var letvcloud_player_conf =  {"uu": uu,"vu": vu,"auto_play":1,"gpcflag":1,"width":winW,"height":winH,"extend":0};
		// 如果是移动端，则加载乐视的 html5 播放器
		if(isMobile.Phone()) {
			document.write('<scr'+'ipt type="text/javascript" src="'+ letvjsURL +'"><\/script>');
		}
	</script>
</div>

<?} elseif (!empty($video['title']) && preg_match('/rtmp/', $video['title'])) {?> 
<div class="video_playerOnline">
	{scripts STATIC_HOST."js/video.js"}
	{scripts STATIC_HOST."js/videojs-live.js"}
	<link href="{=STATIC_HOST}css/video.css" rel="stylesheet">
	<?
		$player = explode("\n", $video['title']);
	?>
	<div>
		<video id="my_video_1" class="video-js vjs-default-skin vjs-16-9" controls preload="auto" width="1120" height="630" data-setup='{"fluid": true}'>
			<? echo in_array($source, array('h5','uc')) ? $player[0] : $player[1]; ?>
		</video>
	</div>
</div>
<?} else {?>
<div class="video_playNone">
	<?
	if (count($video_pic)) {
		echo '<img src="' . ImagesQcloud::image_url($video_pic['cover'], 0, 0) .'" />';
	} else {
		echo $title;
	}
	?>
</div>
<? } ?>

<div class="series_share">
	<div class="share_wrap clear">
		<a href="javascript:;" class="wechat series_shareIcons index_icons"></a>
		<a href="javascript:;" class="weibo series_shareIcons index_icons"></a>
		<a href="javascript:;" class="qzone series_shareIcons index_icons"></a>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('series/video');
</script>
<!--{/scriptPool}-->
