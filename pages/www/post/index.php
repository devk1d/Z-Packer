{scripts STATIC_HOST . "ueditor1_4_3/ueditor.config.js"}
{scripts STATIC_HOST . "ueditor1_4_3/ueditor.all.js"}

{setLayout "www"}

<? if(isset($video['detail']['title'])) {?> 
{setTitle htmlspecialchars_decode($video['detail']['title']).'-ZEALER'}
<?} else {?>
{setTitle '视频'}
<?}?>

<!--{startBlock "content"}-->
<?php
	$locationHref = urlencode(Helper::get_url());
	//'全部'这个分类的id
	$all_id = 0;
	//‘全部'这个分类在所有分类排序的下标(从0开始)
	$all_index = 0;
?>

<div id="main" class="post_wrap">

	{widget "mediaHeader", array('acid' => $acid), 'global'}

	<div class="media_content">
		<? 
		if(!empty($video) && !isset($video['error'])) {
			//判断是视频 
			if($video['detail']['type'] == 'VIDEO') {
		?>
		<div class="content_video">
			<div class="video_nav">
				<a href="/">首页</a>&nbsp;&nbsp;>&nbsp;&nbsp; 
				<a href="/media">ZEALER｜MEDIA</a>&nbsp;&nbsp;>&nbsp;&nbsp; 
				<span class="nav_curr">{$video['detail']['title']}<span>
			</div>
			<div class="video_title">
			<? if($video && !isset($video['error'])) { ?> <h1 class="title_top" data-id="{$video['detail']['id']}">{$video['detail']['title']}</h1> <? } ?> 
				<div class="title_share">
					<a href="javascript:;" class="wechat postIcons"></a>
					<a href="javascript:;" class="weibo postIcons"></a>
					<a href="javascript:;" class="qzone postIcons"></a>
				</div>
			</div>
			
			<div class="video_post">
				<div class="post_player clear">
					{widget "video", array('video' => $video)}
				</div>
			</div>
		</div>

		<div class="content_more">
			<!-- 视频介绍 -->
			<?
			$recommend = $video['detail']['recommend'];
			if(!empty($recommend)) {
			?>
			<div class="post_description">
				<p class="des_title">视频介绍</p>	
				<p class="des_content">{$recommend}<p>
			</div>
			<?}?>
			<!-- 工具3.0页面入口 -->
			<?if(count($phoneData) > 0) {?>
			{widget "dataEntrance", array('phoneData' => $phoneData)}
			<?}?>
			<div class="more_side clear">
				<div class="side_left">
					<div class="item">
					</div>
						<p class="post_commentTotal">评论( <span>
							{$video['detail']['comment_total']}
						</span> )</p>
					<div class="cmWrap">
						<div class="no_login_toReply clear">
							<span>
								需要<a href="javascript:;" class="is_login">登录</a>才能回复
							</span>
							<a href="{_WWW_HOST}Index/qq?redirect={$locationHref}" class="qq_login outer_login" alt="qq登录官网"> </a>
							<a href="{_WWW_HOST}Index/sina?redirect={$locationHref}" class="weibo_login outer_login" alt="微博登录官网"> </a>
							<a href="{_WWW_HOST}Index/wechatLogin?redirect={$locationHref}" class="wechat_login outer_login" alt="微信登录社区"> </a>
						</div>
						<div class="user_comment clear" style="display: none;">

							<div class="user_card">
							<img src="{_STATIC_HOST}images/mb_pic50.gif" alt="会员头像" />
							</div>

							<div class="sendReply_form" id="post_new_reply">
								<div class="inText1">
									<textarea class="sendPost_textarea" name="comment" placeholder="说点什么吧…" style="width:700px; height:145px;" id="comment"></textarea>
									<input type="button" value="评论" name="comment" class="comment_btn" />
									<input type="hidden" value="0" name="reply_id" />
									<input type="hidden" value="0" name="reply_author" />
								</div>

							</div>
						</div>
						<div id="comments">						
							<div class="comments_list cmtList" data-total="{=isset($comment['total_number']) ? $comment['total_number'] : 0}">
								<ul class="clear">
								</ul>
							</div>
						</div>
						<div class="page_cmtList page_center"> </div>
					</div>
				</div>
				<div class="side_right">
					<h3>标签</h3>
					<div class="right_tag">
						<? if( !empty($video) && !isset($video['error']) ){
							foreach ($video['relatedTags'] as $key => $value) { 
						?>
						<a href="/media?cid={$all_id}&index={$all_index}&tid={$value['id']}">{$value['name']}</a>
						<? }
						} ?>
					</div>

					<h3 style="height:54px; line-height:54px;">推荐视频</h3>
					<ul class="right_recommend">
						<?if(!empty($recommend_video) ){
							foreach ($recommend_video['list'] as $key => $value) { 
						?>
						<li>
							<a href="/post/{$value['post_id']}.html">
								<img src="{echo ImagesQcloud::image_url($value['cover_small'], 0, 0)}" alt="{$value['title']}" />
								<span class="recommend_cover"></span>
								<span class="recommend_title">{$value['title']}</span>
							</a>
						</li>
						<?}}?>
					</ul>
					
					<!-- 相关推荐逻辑 -->
					<?
					$relationList = $video['recommendPost'];
						if($relationList && !empty($relationList) ){
					?>
					<h3 style="height:30px; line-height:21px;">相关推荐</h3>
					<ul class="right_relation">
						<?
							foreach ($relationList as $key => $value) { 
						?>
						<li>
							<a href="/post/{$value['id']}.html">{=LibBase::substr($value['title'], 42, 39)}</a>
						</li>
						<?}}?>
					</ul>
					<!-- end of  相关推荐逻辑 -->

				</div>
			</div>
		</div>
		<? }else if($video['detail']['type'] == 'NEWS')  { ?>
			<div class="media_content">
				<div class="content_video" style="height: auto; padding-bottom: 50px;">
					<div class="video_title" style="height: auto">
					<? if($video && !isset($video['error'])) { ?>
						<h1 class="title_top" data-id="{$video['detail']['id']}">{$video['detail']['title']}</h1>
					<? } ?>
						<div class="title_share">
							<a href="javascript:;" class="wechat postIcons"></a>
							<a href="javascript:;" class="weibo postIcons"></a>
							<a href="javascript:;" class="qzone postIcons"></a>
						</div>
					</div>
					<div class="video_post_news">
						<div class="news_inner">
							<? echo htmlspecialchars_decode($video['detail']['content']); ?>
						</div>
					</div>
				</div>
			</div>
		<? }} ?>

	</div>	
	<div style="display:none" class="wechat_mask">
		<div class="mask_bg">
				<div class="mask_content mask_wechat">
					<div class="pop_close pop_image"></div>
					<div class="inner_box">
						<div class="wechat_tit">分享到微信</div>
						<img src="http://s.jiathis.com/qrcode.php?url={$locationHref}" width="212" height="212" />
						<div class="wechat_bot">打开微信，点击底部的“发现”，使用 “扫一扫”即可将网页分享到我的朋友圈。</div>
					</div>
				</div>
		</div>
	</div>
</div>

<!--{endBlock}-->

{widget "comments"}
{widget "page"}


