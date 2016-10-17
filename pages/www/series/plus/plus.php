<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 15 Jun 2016 04:37:08 PM CST
*/
?>
<? if (count($plus)) { ?>
<div class="plus_container">
	<div class="container_title_line"></div>
	<? if ($title == '2016 苹果秋季发布会') { ?>
	<h2 class="container_title">最新资讯</h2>
	<? } else { ?>
	<h2 class="container_title">相关帖子</h2>
	<? } ?>

	<ul class="plus_list clear">
		<?foreach($plus as $key => $val) {?>
		<li class="list_item{$key}">
			<a href="{$val['target']}">
				<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
			</a>
			<a href="{$val['target']}"><h3 class="plus_itemTitle">{$val['title'] ? $val['title'] : $val['plus_title']}</h3></a>
			<div class="plus_total">{$val['views_total']} 人阅读</div>
		</li>
		<?}?>
	</ul>
</div>
<? } ?>
