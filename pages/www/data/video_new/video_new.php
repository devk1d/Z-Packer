<!-- 视频, 前缀: post_video  -->
<div class="tools_head post_video_head <?= $isHide?'hide':'' ?>">
	<div class="tools_switch">
		<div class="head_icon postIcons">
		</div>
	</div>
	<span class="video_title">{$list['title']}</span>
	<div class="share_icon">
		<a href="javascript:;" class="wechat postIcons" rel="{$G_RENREN}"></a>
		<a href="javascript:;" class="weibo postIcons" rel="{$G_QZONE}"></a>
		<a href="javascript:;" class="qzone postIcons" rel="{$G_SINA}"></a>
	</div>
</div>
<? if(!$isHide) { ?>
<div class="tools_wrap post_video_wrap J_post_video_wrap" style="display: block;">
	<div class="wrap_player">
		<!--{if empty($list['link'])}-->
		{echo htmlspecialchars_decode($list['content'])}
		<!--{else}-->
		<div class="player_embed">
		<?
		//判断是否qq弹幕
		if(Yii::app()->request->getQuery('tencent') && !empty($list['tencent_link']) && !empty($list['tencent_banner'])) { 
			echo $list['tencent_link'];
		}else {
			echo $list['link'];
		} ?>
		</div>
		<!--{/if}-->
	</div>
</div>
<? } ?>

<!--{scriptPool}-->
<script>
Z.use('post/video');
</script>
<!--{/scriptPool}-->
