<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Mon 13 Jun 2016 03:45:19 PM CST
*/
?>

<ul>
	<?foreach($list['list'] as $key => $val) {?>
	<li>
		<h3><a href="{_ASK_HOST}question/{$val['id']}.html">{$val['title']}</a></h3>
		<p class="resultList_content">{$val['content']}</p>
		<div class="resultList_foot clear">
			<span>{$val['answer_total']} 回答</span>
			<span class="search_time">{=LibBase::changeDate($val['created_at'])}</span>
		</div>
	</li>
	<?}?>
</ul>

