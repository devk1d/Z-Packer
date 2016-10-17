<? 
//最新标签的class
$new_class = '';
if( empty($tid) ){ 
	$new_class = 'btn_active';
}
$p_content = $tag_name ? $tag_name : $acid['list'][$index]['title'];
?>
<h2 class="hand_title">{$p_content}</h2>
<p class="hand_recommend">{$acid['list'][$index]['introduce']}</p>
<p class=="hand_tag">热门标签</p>
<span class="hand_btn">
	<a class="{$new_class}" href="javascript:;" cid="{$cid}" tid="0">最新</a>
<? if(!empty($tags)){ 
	foreach ($tags['list'] as $key => $value) {  
		$new_class = $value['tag_id'] == $tid ? 'btn_active' : '';
?>
	<a href="javascript:;" cid="{$cid}" tid="{$value['tag_id']}" class="{$new_class}">{$value['title']}</a>
<? } } ?>
</span>
<ul class="hand_video">
	<?foreach ($list['list'] as $key => $value) { ?> 
	<li totalnum="{$list['total_number']}">
		<a href="/post/{$value['id']}.html">
			<img src="{echo ImagesQcloud::image_url($value['cover'], 360, 240)}" alt="{$value['title']}" />
			<span class="list_cover"></span>
			<span class="left_line"></span>
			<span class="right_line"></span>
			<span class="list_play">播放</span>
		</a>
		<p>
		<?$title = preg_replace("/「.+」/", "", $value['title']);?>
		{echo LibBase::substr($title, 35, 35)}
		</p>
	</li>
	<? } ?>
	
</ul>
<div class="wrap_go">
	<span></span>
	<a href="javascript:;">加载更多</a>
</div>
<!--{scriptPool}-->
<script>
Z.use('mediaFirst/mediaFirst');
</script>
<!--{/scriptPool}-->
