
{setLayout "www"}
{setTitle "ZEALER - 科技生活方式第一站"}
{setKeywords "手机测评，数码产品测评，科技产品测评"}
{setDescription "ZEALER 是中国权威的科技电子产品测评网站，由王自如等科技达人傾力打造，测评内容涉及手机的 Android，iOS，WP 等周边数码产品，致力于还原科技本质，为用户提供最专业的点评和最客观的资讯"}

<!--{startBlock "content"}-->
<div class="personal_main clear">
	<!-- personal_header-->
	{widget "personalHeader", array('isSelf' => $isSelf, 'headerList' => $headerList, 'uid' => $uid)}
	<!-- personal_right-->
	{widget "personalRight", array('isSelf' => $isSelf, 'rightList' => $rightList, 'uid' => $uid, 'type' => '')}
	<div class="per_main_wrap clear">	
		<!-- personal_hotTag-->
		<a name="goodat" class="goodat margintop1"></a>
		{widget "hotTag", array('isSelf' => $isSelf, 'tagList' => $tagList)}
		
		<a name="joinat" class="joinat margintop"></a>
		<!-- personal_useTag-->
		{widget "useTag", array('isSelf' => $isSelf, 'tagList' => $tagList)}
		
		<a name="joingroup" class="joingroup margintop"></a>
		<!-- personal_joinGroup-->
		{widget "joinGroup", array('isSelf' => $isSelf, 'uid' => $uid, 'joinGroupList' => $joinGroupList, 'groupRecList' => $groupRecList)}

		<a name="collect" class="collect margintop"></a>
		<!-- personal_collect-->
		{widget "collect", array('isSelf' => $isSelf, 'uid' => $uid, 'collectList' => $collectList)}
		
		<a name="comment" class="comment margintop"></a>
		<!-- personal_post-->
		{widget "variousPost", array('page' => $page, 'isSelf' => $isSelf, 'uid' => $uid, 'greatPostList' => $greatPostList, 'no_great' => $no_great)}
	</div>
</div>
<!--{endBlock}-->
{widget "page"}
