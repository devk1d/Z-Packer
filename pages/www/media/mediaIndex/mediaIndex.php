<? 
if( !empty($list) && !isset($list['error']) ){ 
	//var_dump($list);die; 
?>
<ul class="content_abstract">
	<li class="abstract_big">
		<a href="/post/{$list['list'][0]['post_id']}.html" target="_blank">
			<img src="{echo ImagesQcloud::image_url($list['list'][0]['cover'], 550, 550)}" alt="{$list['list'][0]['title']}" />
			<span class="big_title">
				<span class="title_back"></span>
				<span class="title_name">{$list['list'][0]['title']}</span>	
			</span>
		</a>
	</li>
	<? 
	for($i=1; $i<count($list['list']); $i++){
	?>
	<li class="abstract_small">
		<a href="/post/{$list['list'][$i]['post_id']}.html" target="_blank">
			<img src="{echo ImagesQcloud::image_url($list['list'][$i]['cover'], 265, 265)}" alt="{$list['list'][$i]['cover']}" />
			<span class="small_title">
				<span class="title_back"></span>
				<span class="title_name">{$list['list'][$i]['title']}</span>	
			</span>
		</a>
	</li>
	<? } ?>
</ul>
<? } ?>

<?
	$html = $this->getTemplate('_firstUp', array(
		'acid' => $acid,
		'acid_sort' => $acid_sort,
		'arr_tags' => $arr_tags,
		'arr_video' => $arr_video
	), 'mediaIndex');
	echo $html;
?>
<!--{scriptPool}-->
<script>
Z.use('mediaIndex/mediaIndex');
</script>
<!--{/scriptPool}-->
