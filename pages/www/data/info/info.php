<!-- ask info-->

<!--{if (count($list['askeds']))}-->
<div class="tools_head info_inner">
	<div class="info_left left_ask">
	</div>
	<div class="info_center">
		问答
	</div>
	<div class="info_right">
		<!--{loop $list['askeds'] $key $val}-->
		<a href="{_ASK_HOST}post/{$val['id']}" target="_blank">{echo LibBase::substr($val['title'], 58, 60)}</a>
		<!--{/loop}-->
	</div>
	<div class="clear"></div>
</div>
<!--{/if}-->

<!-- price info-->
<!--{if (!empty($pricelist))}-->
<div class="tools_head info_inner">
	<div class="info_left left_price">
	</div>
	<div class="info_center">
		报价
	</div>
	<div class="info_right">
		<!--{loop $pricelist $key $val}-->
			<!--{if !empty($val['price'])}-->
			<span><a href="{$val['url']}" target='_blank'>{$val['site_name']} ￥{$val['price']}</a></span>
			<!--{/if}-->
		<!--{/loop}-->
	</div>
	<div class="clear"></div>
	<div class="info_box">
		<div class="info_tipsbg">
			<div class="info_block">
				报价数据由<a href="http://www.gwdang.com/" target="_blank" >购物党</a> 提供</br> 
				实际价格以各网站实时售价为准
			</div>
		</div>
		<div class="info_tips">
		</div>
	</div>
</div>
<!--{/if}-->


<!--{scriptPool}-->
<script>
Z.use('data/info');
</script>
<!--{/scriptPool}-->
