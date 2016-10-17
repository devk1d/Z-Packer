<?
if(!empty($list) && !isset($list['error'])) {
	foreach ($list['list'] as $key => $value ) { ?> 
		<li totalnum="{$list['total_number']}">
			<a href="/post/{$value['id']}.html">
				<img src="{echo ImagesQcloud::image_url($value['cover'], 360, 240)}" alt="{$value['title']}" />
				<span class="list_cover"></span>
				<span class="left_line"></span>
				<span class="right_line"></span>
				<span class="list_play">播放</span>
			</a>
			<p>
			<?$title = preg_replace("/「[^」]+」/", "", $value['title']);?>
			{echo LibBase::substr($title, 35, 35)}
			</p>
		</li>
<? } } ?>
