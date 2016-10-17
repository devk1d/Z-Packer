<?
//var_dump($collectList);die;
if($isSelf) {
	$isSelfTxt = "我";
	$isSelfT = "您";
} else {
	$isSelfTxt = "他";
	$isSelfT = "他";
}
?>		
<div class="collect_wrap">
	<h2>
		{$isSelfTxt}的收藏
		<?/*
		<? if($isSelf) {?>
		<a class="view_all_collect" href="/personal/getAllCollect">查看全部 &gt;</a>	
		<?} else {?>	
		<a class="view_all_collect" href="/personal/getAllCollect/{$uid}">查看全部 &gt;</a>	
		<?}?>
		*/?>
	</h2>
	<? if(!empty($collectList['list'])) {?>
		<div class="collec_post_wrap clear">
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
		</div>
		<?if($collectList['total_number'] > 5) {
			//var _max_page = Math.ceil(self.total_num/self.opts.count); //多请求了一次,加载更多
			$max_page = $collectList['total_number'] / 5;	
		?>
			<div class="load_more_btn" data-uid="{$uid}"  data-maxpage="{$max_page}">
				<span>加载更多</span>
				<div class="load_more_logo">
				</div>
			</div>
		<?}?>
	<?} else {?>
		<div class="empty_title clear">
			{$isSelfT}
			还没有收藏过帖子。看看大家都在收藏什么~	
			<div class="tab_change">换一批</div>
		</div>	
		<div class="empty_con">
			<? 
				foreach ($collectList['emptycollect'] as $key => $value) {  
			?>	
			<a href="{_PLUS_HOST}post/{$value['id']}.html" target="_blank">
				<span class="title">
					{=LibBase::substr($value['title'], 62, 62)}	
				</span>
				<span class="collect_time clear">
					<span class="collect_logo">
					</span>	
						{$value['follow_num']}	
				</span>
			</a>
			<?}?>
			<div class="" style="border-bottom: 1px solid #e5e6e8; margin-top: 10px;"></div>
		</div>	
	<?}?>	
</div>
<!--{scriptPool}-->
<script>
Z.use('personal/collect');
</script>
<!--{/scriptPool}-->
