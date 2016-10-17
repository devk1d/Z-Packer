<div class="list_inner inner_brand">
	<div class="brand_header">
		<span class="brand_title">ZEALER手机</span>
	</div>

	<input type="hidden" id="mobile_company" value="{$cid}" >
	<input type="hidden" id="mobile_system" value="0" >

	<div class="brand_content clear">
		<div class="content_left">
			<div class="left_brand"> <span class="brand_icon"></span>品牌 </div>
		</div>
		<div class="content_right logo_right">
		<? 
			$company = $list['company']['list'];
		    
		?>
			<dl class="clear brand_logo logo_list">
					<dd>
					<? if(!empty($cid)) { ?>
						<img src="all_norm.png" data-id="0" class="" data-source="all_hov.png" data-source-hover="all_norm.png">
					<? }else { ?>
						<img src="all_hov.png" data-id="0" class="active" data-source="all_hov.png" data-source-hover="all_norm.png">
					<? } ?>
					</dd>
				<? 
					foreach ($company as $key => $value) { 
					$active = '';
					$logo = $value['logo'];
					if($value['id'] == $cid) {
						$active = 'active';
						$logo = $value['logo_hover'];
					}
				?>
					<dd>
						<img src="{echo ImagesQcloud::image_url($logo, 0, 0)}" data-id="{$value['id']}" class="{$active}" data-source="{echo ImagesQcloud::image_url($value['logo_hover'], 0, 0)}" data-source-hover="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}">
					</dd>
				<? } ?>
			</dl>
		</div>
   </div>
   <?if(false){?>
	<div class="brand_content clear">
		<div class="content_left">
			<div class="left_sys"> <span class="sys_icon"></span>系统 </div>
		</div>
		<div class="content_right logo_right">
		<? 
			$system = $list['system']['list'];
		?>
			<dl class="system_logo clear logo_list">
					<dd>
						<img src="all_hov.png" data-id="0" class="active" data-source="all_hov.png" data-source-hover="all_norm.png">
					</dd>
				<? foreach ($system as $key => $value) { ?>
					<dd>
						<img src="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}"  data-id="{$value['id']}" data-source="{echo ImagesQcloud::image_url($value['logo_hover'], 0, 0)}" data-source-hover="{echo ImagesQcloud::image_url($value['logo'], 0, 0)}">
					</dd>
				<? } ?>
			</dl>
		</div>
   </div>
   <?}?>
   <div class="list_mobile" data-num ="">
   </div>
   <div class="list_page">
   </div>
</div>

<!--{scriptPool}-->
<script>
	Z.use('data/list');
</script>
<!--{/scriptPool}-->

