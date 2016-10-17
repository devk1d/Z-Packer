
<? 
	foreach ($collectList['list'] as $key => $value) {  
?>	
<a href="{_PLUS_HOST}post/{$value['source_id']}.html" target="_blank">
	<span class="title">
		{=LibBase::substr($value['title'], 62, 62)}	
	</span>
	<span class="collect_time">
		<s class="global_grey_icons grey_time">
		</s>	
		<? echo LibBase::changeDate($value['created_at'])?>
	</span>
</a>
<?}?>
