<?
$locationHref = urlencode(Helper::get_url());
?>
<div class="global_cover"></div>

<div class="global_header <?php echo isset($headType) ? $headType : 'bigHead'; ?>">
<div class="header_inner clear">

<a class="inner_logo index_icons global_gaNode" href="/" data-galabel="home_header_logo"></a>

<div class="account_wrap">
<div class="header_account clear">
<ul class="account_nav clear">
<li><a class="" href="/">首页</a></li>
<li><a class="" href="/media">视频</a></li>
<li><a class="" href="<?php echo PLUS_HOST; ?>" target="_blank">社区</a></li>
<li><a class="" href="<?php echo PHONE_HOST; ?>">手机工具</a></li>
<li><a class="" href="<?php echo FIX_HOST; ?>" target="_blank">FIX</a></li>
<li><a class="" href="<?php echo PHONE_HOST; ?>lab" target="_blank">实验室</a></li>
</ul>

<div class="account_right clear">
<div class="header_search clear">
<input class="head_searchInput" placeholder="搜点什么..."/>
<div class="index_icons head_searchIcon global_gaNode" data-type="video" data-galabel="home_header_search"></div>
</div>
<div class="account_seperate"></div>
<div class="inner_account">
<a href="/search" target="_blank" class="account_search index_icons"></a>
<a href="/message?type=discuss" target="_blank" class="account_message global_gaNode" data-galabel="home_header_notification">通知
<span class="message_num"></span>
</a>
<a href="/message?type=inbox" target="_blank" class="account_letter global_gaNode" data-galabel="home_header_message">私信
<span class="letter_num"></span>
</a>
<span class="account_user clear">
<a class="img_link global_gaNode clear" data-galabel="home_header_user_img" href="/personal">
<img class="user_img" src="<?php echo STATIC_HOST; ?>images/mb_pic30.gif" alt="会员头像" />
</a>
<span class="user_active <?php echo isset($headType) ? $headType : 'bigHead'; ?>">
<a href="/personal" class="active_name" rel="nofollow"></a>
<a href="/user/logout" rel="nofollow">退出</a>
</span>
</span>
<div class="account_list message_list clear"></div>
<div class="account_list sms_list clear">
</div>

<div class="sms_inform">
<div class="account_list  clear"><div class="sms_arrow account_list_arrow" totalnum="3"></div>
<div class="sms_inform_list">
<ul>
</ul>
</div>
</div>
</div>
</div>
<div class="inner_login" style="display:none">
<a class="login_in global_gaNode" href="<?php echo WWW_HOST; ?>login/?from=index&redirect=<?php echo $locationHref; ?>" data-galabel="home_header_login">登录</a>
<a class="logoutCss global_gaNode" href="<?php echo WWW_HOST; ?>reg?from=Index&redirect=<?php echo $locationHref; ?>" data-galabel="home_header_reg">注册</a>
</div>


</div>

<ul class="inner_nav">
<li><a class="global_gaNode" href="/" data-galabel="home_header_nav_index">首页</a></li>
<li><a class="global_gaNode" href="/media" data-galabel="home_header_nav_media">视频</a></li>
<li><a class="global_gaNode" href="<?php echo PLUS_HOST; ?>" target="_blank" data-galabel="home_header_nav_plus">社区</a></li> 
<li><a class="global_gaNode" href="<?php echo PHONE_HOST; ?>" data-galabel="home_header_nav_phone">手机工具</a></li>
<li><a class="global_gaNode" href="<?php echo FIX_HOST; ?>" target="_blank" data-galabel="home_header_nav_fix">FIX</a></li> 
<li><a class="global_gaNode" href="<?php echo PHONE_HOST; ?>lab" target="_blank" data-galabel="home_header_nav_lab">实验室</a></li> 
<li class="inner_nav_last"><a href="/about?type=contect" class="header_contactUs global_gaNode" target="_blank" rel="nofollow" data-galabel="home_header_nav_contact">联系我们</a></li>
</ul>

</div>
</div>
</div>
</div>

<script id="showData.tpl" type="text/html">
<div class="msg_content">
<h2>欢迎你!</h2>
<a href="<?php echo WWW_HOST; ?>user?pagetype=setbasic" class="msg_btn_box">
<img src='' id="msg_pic"/>
</a>
<div id="msg_name"></div>
你与极客之间的距离，可能只差个性<br />的头像！快去完善吧~
<a href="<?php echo WWW_HOST; ?>user?pagetype=setbasic" class="msg_btn msg_btn_box">完善资料</a>
</div>
</script>



<div class="global_mHeader">
<div class="mHeader_menu"></div>
<div class="mHeader_right">
<a class="mHeader_login" href="<?php echo WWW_HOST; ?>mobile/login/?from=index&redirect=<?php echo $locationHref; ?>">登录</a>
<a class="img_link clear" href="/user?pagetype=setbasic">
<img class="user_img" src="<?php echo STATIC_HOST; ?>images/mb_pic30.gif" alt="会员头像" />
</a>
</div>
<ul class="mHeader_menuList">
<li><a class="" href="/">首页</a></li>
<li><a class="" href="/media">视频</a></li>
<li><a class="" href="<?php echo PLUS_HOST; ?>" target="_blank">社区</a></li>
<li><a class="" href="<?php echo PHONE_HOST; ?>">手机工具</a></li>
<li><a class="" href="<?php echo FIX_HOST; ?>" target="_blank">维修</a></li>
<li><a class="" href="<?php echo PHONE_HOST; ?>lab" target="_blank">实验室</a></li>
<li><a href="/about?type=contect" class="header_contactUs" target="_blank" rel="nofollow">联系我们</a></li>
</ul>
</div>

<? $showAppDownload = false; ?>
<?if($showAppDownload){?>

<div class="global_appDownload">
<div class="appDownload_text">
<div class="appDownload_icon"></div>
<span class="text_title">ZEALER 手机客户端<span>
</div>
<a href="<?php echo APP_DOWNLOAD; ?>" class="appDownload_btn">立即下载</a>
</div>
<?}?>

<?php $this->scriptPoolStart(); ?>
<script>
Z.use('global/header');
</script>
<?php $this->scriptPoolEnd(); ?>
