
<div class="inner_tag clear">
	<div><ul><span>友情链接</span></ul></div>
	<div class="inner_tag_seolink">
		<ul>
		<?
		foreach($seoTag['list'] as $k => $valueText){
		?>
			<li>
				<a class="global_gaNode" href="{$valueText['url']}" target="_blank" data-galabel="home_footer_friend_link">
					{=LibBase::substr($valueText['name'],12,12)}
				</a>
			</li>
		<?
		}
		?>
		</ul>
	</div>
</div>
