{setLayout "www"}

{setTitle 'ZEALER测评工具-最全的手机测评数据和参数价格对比中心'}

{scripts STATIC_HOST."js/highcharts-4.1.9.js"}
{scripts STATIC_HOST."js/highcharts-more.js"}

<!--{startBlock "meta"}-->
ZEALER 手机中心，提供最全面专业的智能手机测评数据分享，包括各大热门机型的配置大全、结构外观、相机功能、屏幕、续航能力、发热等性能测评数据，并提供各大平台实时销售价格比较，为您购买产品提供实用参考。
<!--{endBlock}-->

<!--{startBlock "content"}-->
<div id="page_content" class="clear">
	<div  class="main">
		{widget "list", array('list' => $list, 'cid' => $cid)}
	</div>
</div>
<!--{endBlock}-->

<!--{startBlock "afterBody"}-->
<script>
var mobile_id = true;
var islogin = "{$islogin}";
var WWW_HOST = "{_WWW_HOST}";
</script>
<!--{endBlock}-->


