/*
 *  模板内容替换
 *
 *	例如： <!--{if a==1}--> 替换为 <?php if(a==1) { ?>
 */

let compileTplReg = [
			//if 语句
			[/<!--{if (.+?)}-->/gi, '<?php if ($1) { ?>'],
			[/<!--{\/if}-->/gi, '<?php } ?>'],
			[/<!--{else}-->/gi, '<?php } else { ?>'],
			[/<!--{elseif (.*?)}-->/gi, '<?php } elseif ($1){ ?>'],

			//echo 语句
			[/{\$G_(.*?)}/gi, '<?php global $$$1; echo $$$1; ?>'], //快捷输出global变量
			[/{\$lang_(.*?)}/gi, '<?php echo $language["$1"]; ?>'],
			[/{_(.*?)}/gi, '<?php echo $1; ?>'],
			[/{=(.*?)}/gi, '<?php echo $1; ?>'],
			[/{echo (.*?)}/gi, '<?php echo $1; ?>'],
			[/{eval (.*?)}/gi, '<?php $1; ?>'],
			[/{\$(.*?)}/gi, '<?php echo $$$1; ?>'],

			//foreach for 语句
			[/<!--{loop (.*?) (.*?) (.*?)}-->/gi, '<?php if(is_array($1)) { foreach($1 as $2=>$3) { ?>'],
			[/<!--{\/loop}-->/gi, '<?php } } ?>'],
			[/<!--{for (.*?)}-->/gi, '<?php for($1) { ?>'],
			[/<!--{\/for}-->/gi, '<?php } ?>'],

			[/\t/gi, ''],


			//自定义方法
			[/<!--{startBlock (.*?)}-->/gi, '<?php $this->startBlock($1); ?>'],
			[/<!--{endBlock}-->/gi, '<?php $this->endBlock(); ?>'],

			//内嵌script处理
			[/<!--{scriptPool}-->/, '<?php $this->scriptPoolStart(); ?>'],
			[/<!--{\/scriptPool}-->/, '<?php $this->scriptPoolEnd(); ?>'],

			//widget 方法
			[/{widget ([\s\S]*?)}/mgi, '<?php $this->loadWidget($1); ?>'],

            [/{pageLibsStatic (.*?)}/gi, '<?php $this->pageLibsStatic($1); ?>'],
            [/{pageGlobalStatic (.*?)}/gi, '<?php $this->pageGlobalStatic($1); ?>'],
			[/{pagePageStatic (.*?)}/gi, '<?php $this->pagePageStatic($1); ?>'],
			[/{setLayout (.*?)}/gi, '<?php $this->setLayout($1); ?>'],
			[/{setTitle (.*?)}/gi, '<?php $this->setTitle($1); ?>'],
			[/{setKeywords(.*?)}/gi, '<?php $this->setKeywords($1); ?>'],
			[/{setDescription(.*?)}/gi, '<?php $this->setDescription($1); ?>'],
			[/{styles (.*?)}/gi, '<?php $this->styles($1); ?>'],
			[/{scripts (.*?)}/gi, '<?php $this->scripts($1); ?>'],

			//最后把注释去掉
			[/<!--([\s\S]*?)-->/mgi, ''],
];

export default function ReplaceTemplate(content) {
	compileTplReg.forEach(reg => {
		content = content.replace(reg[0], reg[1]);
	})
	return content;
};
