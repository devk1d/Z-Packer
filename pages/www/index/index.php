{setLayout "www"}
{setTitle "ZEALER - 科技生活方式第一站"}
{setKeywords "手机评测，数码产品测评，科技产品测评"}
{setDescription "ZEALER 是中国权威的科技电子产品测评网站，由王自如等科技达人傾力打造，测评内容涉及手机的 Android，iOS，WP 等周边数码产品，致力于还原科技本质，为用户提供最专业的点评和最客观的资讯"}

<!--{startBlock "content"}-->
<div id="main" style="overflow: initial;">

	<!-- 大banner & 副banner -->
	<div id="main_banner">
		{widget "banner", array('banner' => $banner, 'secSlider' => $secSlider)}
	</div>

	<!-- media -->
	<div id="main_video">
		{widget "videoList", array('acid' => $acid, 'videoBanner' => $videoBanner,  'videoSeries' => $videoSeries)}
	</div>
	
	<!-- OK 精品 -->
	<div id="main_plusRecom">
		{widget "plusList", array('plusRecom' => $plusRecom)}
	</div>

	<!-- 深度好文 
	<div id="main_plusArt">
		{widget "plusArt", array('plusArtList' => $plusArtList, 'plusSlider' => $plusSlider)}
	</div>
	-->

	<!-- phone -->
	<div id="main_phone">
		{widget "phoneList", array('phone' => $phone, 'module' => $module)}
	</div>

	<!-- fix && rePhone -->
	<div id="main_rephone">
		{widget "rephoneList", array('fixBanner' => $fixBanner)}
	</div>

</div>
<!--{endBlock}-->
{widget "page"}
