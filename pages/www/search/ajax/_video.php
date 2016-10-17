<?php
/*
* @Title
* @Author	ecoChan
* @Date 	Mon 13 Jun 2016 03:45:03 PM CST
*/
?>
<ul class="clear">
	<?foreach($list['list'] as $key => $val) {?>
	<li {=(($key +1 ) % 3 == 0 ? '' : 'style="margin-right: 20px;"')}>
		<a href="/post/{$val['id']}" class="">
			<img src="{=ImagesQcloud::image_url($val['cover'], 0, 0)}" />
		</a>
		<h3><a href="/post/{$val['id']}" class="">{$val['title']}</a></h3>
	</li>
	<?}?>
</ul>
