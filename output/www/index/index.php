<?php $this->setLayout("www"); ?>
<?php $this->setTitle("ZEALER - 科技生活方式第一站"); ?>
<?php $this->setKeywords( "手机评测，数码产品测评，科技产品测评"); ?>
<?php $this->setDescription( "ZEALER 是中国权威的科技电子产品测评网站，由王自如等科技达人傾力打造，测评内容涉及手机的 Android，iOS，WP 等周边数码产品，致力于还原科技本质，为用户提供最专业的点评和最客观的资讯"); ?>

<?php $this->startBlock("content"); ?>
<div id="main" style="overflow: initial;">


<div id="main_banner">
<?php $this->loadWidget("banner", array('banner' => $banner, 'secSlider' => $secSlider)); ?>
</div>


<div id="main_video">
<?php $this->loadWidget("videoList", array('acid' => $acid, 'videoBanner' => $videoBanner,  'videoSeries' => $videoSeries)); ?>
</div>


<div id="main_plusRecom">
<?php $this->loadWidget("plusList", array('plusRecom' => $plusRecom)); ?>
</div>

<!-- 深度好文 
<div id="main_plusArt">
<?php $this->loadWidget("plusArt", array('plusArtList' => $plusArtList, 'plusSlider' => $plusSlider)); ?>
</div>
-->


<div id="main_phone">
<?php $this->loadWidget("phoneList", array('phone' => $phone, 'module' => $module)); ?>
</div>


<div id="main_rephone">
<?php $this->loadWidget("rephoneList", array('fixBanner' => $fixBanner)); ?>
</div>

</div>
<?php $this->endBlock(); ?>
<?php $this->loadWidget("page"); ?>

<?php $this->pageLibsStatic("libs_d8760.js", "libs_ac28c.css"); ?>

<?php $this->pageGlobalStatic("global_874c0ae858.js", "global_874c0cda03.css"); ?>

<?php $this->pageStatic("page_0aa3bec524.js", "page_0aa3b0ed94.css"); ?>
