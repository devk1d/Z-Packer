<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Sun 12 Jun 2016 11:29:23 AM CST
*/
?>

<div class="empty_notice">
	<div>抱歉，未找到相关结果！</div>
	<p>请尽量使用简洁的关键字，或者查看更多精彩推荐.</p>
</div>

<?if($video && !isset($video['error'])) {?>
<div class="empty_media">
	<div class="meia_title search_recommendTitle clear">
		<div class="title_content">最新视频</div>
		<a class="title_link" href="{_WWW_HOST}media">更多 > </a>
	</div>
	<ul class="media_list clear">
		<?foreach($video['list'] as $key => $val) {?>
		<li {=($key < 2 ? 'style="margin-right: 20px;"' : '')}>
			<a href="/post/{$val['id']}.html">
				<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
			</a>
			<a href="/post/{$val['id']}.html" class="list_title">{=LibBase::substr($val['title'], 30, 27)}</a>
		</li>
		<?}?>
	</ul>
</div>
<?}?>

<?if($post && !isset($post['error'])) {?>
<div class="empty_plus">
	<div class="plus_title search_recommendTitle clear">
		<div class="title_content">社区热门帖</div>
		<a class="title_link" href="{_PLUS_HOST}">更多 > </a>
	</div>
	<ul class="post_list clear">
		<?
		foreach($post as $key => $val) {?>
		<li {=(($key +1) % 2 == 0 ? '' : 'style="margin-right: 20px;"')}>
			<?if($val['cover'] && $val['cover'] != '') {?>
			<a href="{_PLUS_HOST}post/{$val['id']}.html">
				<img class="post_listCover" src="{$val['cover']}" />
			</a>
			<?}?>
			<div class="post_listContent">
				<p class="post_listTitle"><a href="{_PLUS_HOST}post/{$val['id']}.html">{=LibBase::substr($val['title'], 39, 36)}</a><p>
				<div class="clear">
					<a href="/personal/{$val['user_id']}" class="post_listUser">
						<img src="{=ImagesQcloud::image_url($val['profile_image_url'], 28, 28)}" />
						<span class="user_name">{=LibBase::substr($val['username'], 14, 11)}</span>
					</a>
					<div class="list_total">
						<span class="list_viewTotal">{$val['views_total']}人,阅读</span>
					</div>
				<div>
			</div>
		</li>
		<?}?>
	</ul>
</div>
<?}?>
