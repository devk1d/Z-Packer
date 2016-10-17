<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 15 Jun 2016 04:36:32 PM CST
*/
?>
<? if (count($goods)) { ?>
<div class="buy_container">
	<div class="container_title_line"></div>
	<? if ($title == '2016 苹果秋季发布会') { ?>
	<h2 class="container_title">苹果周边推荐</h2>
	<? } else { ?>
	<h2 class="container_title">相关商品推荐</h2>
	<? } ?>

	<ul class="buy_list clear">
		<?foreach($goods as $key => $val) {?>
		<li class="list_item{$key}">
			<a href="{$val['target']}">
				<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
			</a>
			<h3 class="buy_itemTitle"><a href="{$val['target']}">{$val['note']}</a></h3>
			<div class="buy_price">¥ {$val['price']}</div>
			<a href="{$val['target']}" class="buy_buyBtn">立即购买</a>
		</li>
		<?}?>
	</ul>
</div>
<? } ?>
