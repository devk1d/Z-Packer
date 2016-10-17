<!-- flash 插件 -->
{scripts STATIC_HOST."js/swfobject.js"}

<?
$vu = $video['detail']['vu'];
$uu = $video['detail']['uu'];
$danmaku = $video['danmaku']['video_status'] == 'on' ? 1 : 0;
?>
<div class="player_screen"  data-vu="{$vu}" data-uu="{$uu}">
	<?if($vu != '' && $uu != '') {?>
	<div id="post_playerWrap"></div>

	<script>
		var uu = "{$uu}";
		var vu = "{$vu}";
		var comment_enable = "{$danmaku}";
		var letvjsURL = STATIC_HOST + 'js/letv.min.js';
		//var letvjsURL = {_STATIC_HOST} + 'js/letv.min.js';
		var letvjsURL = 'http://static.zealer.com/js/letv.min.js';
		var letvcloud_player_conf =  {"uu": uu,"vu": vu,"auto_play":1,"gpcflag":1,"width":1120,"height":664,"extend":0};
		// 如果是移动端，则加载乐视的 html5 播放器
		if(isMobile.Phone()) {
			document.write('<scr'+'ipt type="text/javascript" src="'+ letvjsURL +'"><\/script>');
		}
	</script>
	<?} else {?> 
	{$video['detail']['link']}
	<?}?>
	<div>请安装 flash 插件</div>
</div>

<ul class="player_list">
	<li>
		<a href="/post/{$video['detail']['id']}.html">
			<span>
				<img src="{echo ImagesQcloud::image_url($video['detail']['cover'], 150, 150,IMG_TYPE_SQ_M)}" />
			</span>
			<span>
				<em class="small_list_title">ZEALER MEDIA</em>
				<h3>{$video['detail']['title']}</h3>
			</span>
		</a>
	</li>

	<? foreach ($video['relatedVideos'] as $key => $value) { 
	?>
	<li>
		<a href="/post/{$value['id']}.html">
			<span>
				<img src="{echo ImagesQcloud::image_url($value['cover'], 150, 150,IMG_TYPE_SQ_M)}" />
			</span>
			<span>
				<em class="small_list_title">ZEALER MEDIA</em>
				<h3>{$value['title']}</h3>
			</span>
		</a>
	</li>
	<? } ?>
</ul>

<!--{scriptPool}-->
<script>
Z.use('post/video');
</script>
<!--{/scriptPool}-->

