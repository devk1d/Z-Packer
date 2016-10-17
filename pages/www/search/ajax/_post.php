<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Mon 13 Jun 2016 03:45:11 PM CST
*/
//var_dump($list);die;
?>
<ul>
	<?foreach($list['list'] as $key => $val) {?>
	<li>
		<h3><a href="{_PLUS_HOST}post/{$val['id']}.html">{$val['title']}</a></h3>
		<p class="resultList_content">{$val['content']}</p>
		<div class="resultList_foot clear">
			<span>来自：<a href="{_PLUS_HOST}group/{$val['group_id']}">{$val['group_name']}</a></span>
			<span class="search_time">{=LibBase::changeDate($val['created_at'])}</span>
		</div>
	</li>
	<?}?>
</ul>
