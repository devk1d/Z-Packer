<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 15 Jun 2016 04:37:08 PM CST
*/
?>
<? if (count($review)) { ?>
<div class="plus_container review_container">
	<div class="container_title_line"></div>
	<h2 class="container_title">往期测评</h2>

	<ul class="plus_list clear">
		<?foreach($review as $key => $val) {?>
		<li class="list_item{$key}">
			<a href="{$val['target']}">
				<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
			</a>
			<a href="{$val['target']}"><h3 class="plus_itemTitle">{$val['title'] ? $val['title'] : $val['plus_title']}</h3></a>
		</li>
		<?}?>
	</ul>
</div>
<? } ?>
