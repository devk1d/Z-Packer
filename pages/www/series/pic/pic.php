<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Wed 15 Jun 2016 04:36:48 PM CST
*/
?>
<? if (count($pic) || count($spic)) { ?>
<div class="pic_container">
	<div class="container_title_line"></div>
	<h2 class="container_title">相关介绍</h2>

	<ul class="pic_bpic clear">
		<?foreach($pic as $key => $val) {?>
		<li class="bpic_item{$key}">
			<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
		</li>
		<?}?>
	</ul>

	<ul class="pic_spic clear">
		<?foreach($spic as $key => $val) {?>
		<li class="spic_item{$key}">
			<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
		</li>
		<?}?>
	</ul>
</div>
<? } ?>
