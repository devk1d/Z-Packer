
{setLayout "www"}

{setTitle $mobile['name'].'手机测评-'.$mobile['name'].'手机价格对比-ZEALER 测评工具'}

{scripts STATIC_HOST."js/highcharts-4.1.9.js"}
{scripts STATIC_HOST."js/highcharts-more.js"}
{scripts STATIC_HOST."js/progressbar.min.js"}

<!--{startBlock "meta"}-->
ZEALER 手机测评中心，提供全面专业的{$mobile['name']}手机测评数据分享，包含{$mobile['name']}的配置大全、结构外观、相机功能、屏幕、续航能力、发热等性能测评数据，并提供各大平台实时销售价格比较，为您购买产品提供实用参考。
<!--{endBlock}-->

<!--{startBlock "content"}-->
<script>
	var v = window.isIE();	
	if (v == 6 || v == '7' || v == '8') {
		window.location.href ='/notice/notSupport';
	}
</script>

<div id="content" class="clear">
	<div id="main" class="main">
		<div class="info_wrap clear">
			{widget "basicInfo", array('mobile' => $mobile, 'basicData' => $basicData, 'cover' => $cover, 'company' => $company, 'specs' => $specs)}
			{widget "recommendation", array('getRelate' => $getRelate, 'getPrice' => $getPrice)}
		</div>

		<!-- 参数信息 -->
		{eval $concise = 'promosConcise'}
		<!--{widget "promosVideo", array('list'=>$list)}-->
		
		<!-- 工具 -->
		{widget "tools_show", array('id' => $id, 'mobile' => $mobile, 'cover' => $cover, 'specs' => $specs, 'company' => $company)}
		<!-- 工具 -->
		{widget "tools", array('id' => $id, 'mobile' => $mobile, 'specs' => $specs)}
	</div>
	<!-- {//widget "side", arary(), "global"} -->
</div>
<!--{endBlock}-->

<!--{startBlock "afterBody"}-->
<script>
	var mobile_id = {$id};
	var mobile_name = "{=isset($mobile['name'])?$mobile['name']:''}";
	var mobile_colorid = "{=isset($mobile['colorid']) ? $mobile['colorid'] : ''}";
	var compMobileId= "{=isset($mobile['compId']) ? $mobile['compId'] : ''}";
	var compImg = "{=isset($mobile['compImg']) ? $mobile['compImg'] : ''}";
	var compMobileName= "{=isset($mobile['compName']) ? $mobile['compName'] : ''}";
	var compColorId= "{=isset($mobile['compCid']) ? $mobile['compCid'] : ''}";
	var islogin = "{$islogin}";
	var WWW_HOST = "{_WWW_HOST}";
	document.domain = 'zealer.com';
</script>
<script src="{_STATIC_HOST}js/lab_pic_pos.js"></script>
<!--{endBlock}-->

{widget "detail"}

