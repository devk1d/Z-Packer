{setLayout "www"}
{setTitle "ZEALER科技视频_ZEALER"}
{setKeywords "科技视频"}
{setDescription "ZEALER科技视频，包含智能硬件评测视频，有趣的玩机视频和互联网科技大佬专访视频。科技相对论，以及ZEALER那些事，是科技发烧友的垂直门户视频网站。"}

<!--{startBlock "content"}-->
<div id="main">

	{widget "mediaHeader", array('acid' => $acid), 'global'}

	<div class="media_content">
	<? if(!empty($acid)){
		//var_dump($widget);die;
		if( $widget == 0 ){
		?>
			{widget "mediaIndex", array('list' => $list, 'acid' => $acid, 'acid_sort' => $acid_sort, 'arr_tags' => $arr_tags, 'arr_video' => $arr_video)}
		<? 
		}
		else{
		?>
			{widget "mediaFirst", array('list' => $list, 'acid' => $acid, 'cid' => $cid, 'index' => $index, 'tags' => $tags, 'tid' => $tid, 'tag_name' => $tag_name)}
		<? } 
	} ?>
	</div>
</div>
<!--{endBlock}-->

{widget "page"}
