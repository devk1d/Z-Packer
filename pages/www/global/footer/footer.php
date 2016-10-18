<div class="global_footer">
	<div class="footer_inner">
		<div class="inner_link clear">
			<dl>
				<!--<img src="logo_footer.png"/>-->
				<p class="logo_footer index_icons"></p>
			</dl>
			<dl>
				<dt>业务</dt>12
				<dd>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="{_FIX_HOST}" rel="nofollow">手机服务</a>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="{_LAB_HOST}" rel="nofollow">实验室</a>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="{_PLUS_HOST}" rel="nofollow">社区</a>
				</dd>
			</dl>
			<dl>
				<dt>关于我们</dt>
				<dd>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="/about.html?type=item" rel="nofollow">会员条款</a>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="/about.html?type=join" rel="nofollow">加入我们</a>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="/about.html?type=about" rel="nofollow">关于 ZEALER</a>
				</dd>
			</dl>
			<dl class="footer_follow">
				<dt>关注我们</dt>
				<dd>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="http://weibo.com/zealerchina" target="_blank" rel="nofollow">新浪微博</a>
					<a class="global_gaNode" data-galabel="home_footer_nav_link" href="/about?type=contect" rel="nofollow">联系我们</a>
				</dd>
			</dl>
			<dl class="footer_wechat">
				<dt>官方微信</dt>
				<dd class="wechat_img"></dd>
			</dl>
			<dl class="footer_appDownload">
				<dt>APP 下载</dt>
				<dd class="app_img"></dd>
			</dl>
		</div>

		<!-- zealer首页添加友情链接 -->
		<? if($seoTag!=''){ ?>
			{widget 'tagList', array('seoTag' => $seoTag), 'global'}
		<? } ?>

		<div class="footer_message">
			<div class="footer_pcMsg clear">
				<div class="inner_copyr">
					<img class="inner_lisense" src="global_footer_lisence.png" />
					<span class="inner_no"><a class="global_gaNode" data-galabel="home_footer_nav_link" href="http://www.miitbeian.gov.cn" target="_blank" rel="nofollow">粤ICP备12076188号-1</a>&nbsp;</span>
					<span class="inner_img">
						<a class="global_gaNode" data-galabel="home_footer_nav_link" href="http://szcert.ebs.org.cn/1d7f198a-09f0-4844-8212-07761b11dffe" target="_blank" rel="nofollow">
							<img src="http://szcert.ebs.org.cn/Images/newGovIcon.gif"
								 title="深圳市市场监督管理局企业主体身份公示" alt="深圳市市场监督管理局企业主体身份公示"
								 width="80" height="33" border="0" style="border-width:0px;border:hidden; border:none;"
							 />
						 </a>
					</span>
				</div>
			</div>

			<div class="footer_mMsg">
				<div class="mMsg_slogen"></div>
				<div>© 2016 ZEALER | 粤ICP备12076188号-1 </div>
			</div>
		</div>
	</div>
</div>

<div class="side_btn">
	<span class="contect_btn"></span>
	<span class="to_up"></span>
</div>

<div class="bg_writer">
	<div class="content_writer">
		<p>我们十分重视您的体验感受</p>
		<p>请写下您的建议或者吐槽帮助我们更好的改进</p>
	</div>
</div>

<div class="user_reply">
	<div class="bg_title">
		<span style="width:13px; height:14px; background-position:0 -106px;" class="title_logo"></span>
	</div>
	<div class="bg_content">
		<div class="contect_box">
			<textarea class="content_contect">请输入您的反馈内容...</textarea>
			<div>
				<button class="contect_btn">提交</button>
			</div>
		</div>
	</div>
</div>

<!--{scriptPool}-->
<script>
Z.use('footer/footer');
</script>
<!--{/scriptPool}-->
