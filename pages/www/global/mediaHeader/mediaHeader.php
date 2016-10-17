
<div class="media_nav">
	<div class="nav_wrap">
		<a href="/media" class="media_nav_title"></a>
		<a href="/media" style="display:none;">首页</a>
		<? if(!empty($acid)){
			foreach ($acid['list'] as $key => $value) {  
		?>
				<a class="media_btn" href="/media?cid={$value['id']}&index={$key}" cid="{$value['id']}">{$value['title']}</a>
		<? } } ?>
		<span class="nav_arrow"></span>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('global/mediaHeader');
</script>
<!--{/scriptPool}-->
