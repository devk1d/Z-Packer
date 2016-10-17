<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 08 Jun 2016 06:32:12 PM CST
*/
?>
{setLayout "www"}
{setTitle "ZEALER - 科技生活方式第一站"}
{setKeywords "手机评测，数码产品测评，科技产品测评"}
{setDescription "ZEALER 是中国权威的科技电子产品测评网站，由王自如等科技达人傾力打造，测评内容涉及手机的 Android，iOS，WP 等周边数码产品，致力于还原科技本质，为用户提供最专业的点评和最客观的资讯"}

<!--{startBlock "content"}-->
<?
$typeArr = array(
	'video' => '视频',
	'post' => '贴子',
	'ask' => '问答',
	'user' => '用户'
);
?>
<div class="search_wrap">
	<div class="search_nav global_nav">
		<a href="/">首页</a>&nbsp;&nbsp;>&nbsp;&nbsp;<span>搜索</span>
	</div>
	<div class="search_container clear">
		<div class="search_main">
			<div class="search_input">
				<div class="input_type" data-type="{$type}">{$typeArr[$type]}</div>
				<input class="input_content" value="{$keyword}" />
				<button class="input_btn"></button>
				<ul class="input_select">
					<li data-type="post">贴子<li>
					<li data-type="video">视频<li>
					<li data-type="ask">问答<li>
					<li data-type="user">用户<li>
				</ul>
			</div>

			<div class="search_result">
				<ul class="result_tabs clear">
					<li class="tabs_video {$type == 'video' ? 'active' : ''}" data-type="video"><div>视频</div><div class="tabs_amount tabs_videoAmount">(0)</div></li>
					<li class="tabs_post {$type == 'post' ? 'active' : ''}" data-type="post"><div>贴子</div><div class="tabs_amount tabs_postAmount">(0)</div></li>
					<li class="tabs_ask {$type == 'ask' ? 'active' : ''}" data-type="ask"><div>问答</div><div class="tabs_amount tabs_askAmount">(0)</div></li>
					<li class="tabs_user {$type == 'user' ? 'active' : ''}" data-type="user"><div>用户</div><div class="tabs_amount tabs_userAmount">(0)</div></li>
				</ul>
				<div class="result_content">
					<div class="result_contentItem result_empty">
						{widget "resultEmpty", array("video" => $video, "post" => $post)}
					</div>
					<div class="result_contentItem result_video"></div>
					<div class="result_contentItem result_post"></div>
					<div class="result_contentItem result_ask"></div>
					<div class="result_contentItem result_user"></div>
				</div>
				<div class="page_resultList page_center"></div>
			</div>
		</div>

		<?if($side && !isset($side['error'])) {?>
		<div class="search_side">
			<div class="side_go2ask {=($type == 'ask' ? 'show' : '')}"><a class="" href="{_ASK_HOST}quiz">我要提问？</a></div>
			<h2 class="side_title">大家都在搜</h2>
			<ul>
				<?foreach($side['list'] as $key => $val){?>
				<li><a href="{$val['url']}">{=LibBase::substr($val['title'], 36, 33)}</a></li>
				<?}?>
			</ul>
		</div>
		<?}?>

	</div>
</div>
<!--{endBlock}-->
{widget "page"}
{widget "ajax"}

