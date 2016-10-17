<? if( isset($select) ){ ?>
<a href="javascript:;" class="tool_compPhone" style="cursor:default; background-position:0px -471px;" data-id="{$mobile['compId']}">
	{$mobile['compName']}
	<span class="new_icons"></span>
</a> 
<? } else { ?>
<a href="javascript:;" class="tool_icons tool_compPhone" style="cursor:default;" data-id="{$mobile['compId']}">{$mobile['compName']}</a> 
<? } ?>
<div class="compare_list">
	<div class="recomm_header prices_box clear">
		<span class="header_tag"></span>
		<span class="header_title">选择机型</span>
	</div>
	<div class="list_img">
		<img class="img_phone" alt="" src="{$mobile['compImg']}" />
	</div>

	<div class="list_choose select_list">
		<div class="list_name new_icons">请选择手机品牌</div>
		<ul class="list_company">
			<?foreach ($company['list'] as $key => $value) { ?>
			<li data-id="{$value['id']}">{$value['name']}</li>
			<? } ?>
		</ul>
	</div>

	<div class="list_like select_list">
		<div class="list_name noclick new_icons">请选择手机型号</div>
		<ul class="like_phone">
			<!-- 获取数组第一个颜色为默认颜色 -->
			<li data-id="{$mobile['compId']}" data-img="{$mobile['compImg']}" style="display:none">{$mobile['compName']}</li> 
		</ul>
	</div>
	<button class="select_btn">对比</button>
</div>
