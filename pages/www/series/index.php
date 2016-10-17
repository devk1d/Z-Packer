<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 15 Jun 2016 04:06:24 PM CST
*/
?>

<?
	$data = $list['list'];
	$locationHref = urlencode(Helper::get_url());
	if($data['TITLE'] == '2016 苹果秋季发布会') {
		$data['TITLE'] = '王自如深度解读 iPhone 7';
	}
?>

{setLayout "www"}
{setTitle 'ZEALER - '.$data['TITLE']}

<!--{startBlock "content"}-->
<div class="series_wrap">
<?if(preg_match('/apple2016/',$locationHref)){  ?>  <!--微信分享显示图片 -->
	<img src="http://img0.zealer.com/99/f5/b3/1c942b7751c2ca5cfc3ae899e1.jpg" style="width: 0; height: 0" />
<? } ?>
	<?if($source == 'uc') {?>
	<img class="series_ucBanner" src="{_STATIC_HOST}images/www/UC_banner.jpg" />
	<?}?>

	<div class="series_head">
		<div class="series_nav global_nav">
			<a href="/">首页</a>&nbsp;&nbsp;>&nbsp;&nbsp;<span>搜索</span>
		</div>
		<h1>{$data['TITLE']}</h2>
	</div>

	<div class="series_video">
		{widget "video", array("video" => $data["VIDEO"], "video_pic" => $data['VIDEO_PIC'], "title" => $data['TITLE'], "source" => $source)}
	</div>

	<div class="series_pic">
		{widget "pic", array("pic" => $data["PIC"], "spic" => $data["SPIC"], "title" => $data['TITLE'])}
	</div>

	<div class="series_review">
		{widget "review", array("review" => $data["REVIEW"], "title" => $data['TITLE'])}
	</div>

	<div class="series_news">
		{widget "news", array("news" => $data["NEWS"], "title" => $data['TITLE'])}
	</div>

	<div class="series_plus">
		{widget "plus", array("plus" => $data["PLUS"], "title" => $data['TITLE'])}
	</div>

	<div class="series_app">
		{widget "app", array("app" => $data["APP"], "title" => $data['TITLE'])}
	</div>

	<div class="series_recom">
		{widget "goods", array("goods" => $data["GOODS"], "title" => $data['TITLE'])}
	</div>

	<div class="series_footer">
		{widget "footer", array("footer" => $data["FOOTER"], "title" => $data['TITLE'])}
	</div>

	<div class="series_partner">
		{widget "partner", array("partner" => $data["PARTNER"], "title" => $data['TITLE'])}
	</div>

	<div class="series_nbsp">

	</div>
	

</div>

<div style="display:none" class="wechat_mask">
	<div class="mask_bg">
		<div class="mask_content mask_wechat">
			<div class="pop_close pop_image"></div>
			<div class="inner_box">
				<div class="wechat_tit">分享到微信</div>
				<! --  默认apple2016 页面-->
				<img src="{_STATIC_HOST}images/www/er_appleh5.png" width="212" height="212" />
				<div class="wechat_bot">打开微信，点击底部的“发现”，使用 “扫一扫”即可将网页分享到我的朋友圈。</div>
			</div>
		</div>
	</div>
</div>

<!--{endBlock}-->
{widget "page"}

