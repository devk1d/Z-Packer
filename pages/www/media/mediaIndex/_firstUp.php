<? 
if(!empty($acid_sort) && !isset($acid['error'])) { 
	foreach ($acid_sort['list'] as $key => $value) {  
		if( $value['title'] != '全部' ){
?>

<div class="content_common" cid="{$value['id']}">
	<h2>{$value['title']}</h2>
	<span class="common_btn">
		<span class="btn_tags">
			<a href="javascript:;" cid="{$value['id']}" tid="0" class="btn_active">最新</a> 

		<? foreach ($arr_tags[$key]['list'] as $tag => $tagval ) { ?> 
			<a href="javascript:;" cid="{$value['id']}" tid="{$tagval['tag_id']}">{$tagval['title']}</a> 
		<? } ?>

		</span>
		<a class="btn_more" href="/media?cid={$value['id']}&index={$key}" rel="nofollow">查看全部</a>
	</span>
	<ul class="common_list">

		<? foreach ($arr_video[$value['id']]['list'] as $video => $videoval ) { ?> 
			<li>
				<a href="/post/{$videoval['id']}.html">
					<img src="{echo ImagesQcloud::image_url($videoval['cover'], 360, 240)}" alt="{$videoval['title']}" />
					<span class="list_cover"></span>
					<span class="left_line"></span>
					<span class="right_line"></span>
					<span class="list_play">播放</span>
				</a>
				<p>
					<?$title_video = preg_replace("/「[^」]+」/", "", $videoval['title']);?>
					{echo LibBase::substr($title_video, 35, 35)}
				</p>
			</li>
		<? } ?>
		
	</ul>
</div>
<? 
} } } ?>
