# Z-Project

第一次运行：

	CopyFiles 拷贝 pages 目录至 output

	PackLibs 打包libs代码

	EachPage 遍历各页面

		-> 单页面打包流程


单页面打包流程：(PackSinglePage)

	page 底部添加 libs.js libs.css

	PackGlobal 打包页面 Global 代码，page 底部添加 global.js global.css

 	PackImage 拷贝页面下的 img 至 static/img，对引用到 img 的文件进行内容替换

 	ReplaceTemplate 解析模板，替换为原生代码

 	PackPageStatic 打包合并页面js和css，并在页面php尾部添加page.js, page.css

WatchFiles

页面或页面 widget 变化

	CopyFiles：拷贝页面目录
	-> 单页面打包流程


页面 global 变化

	CopyFiles 拷贝 global 目录

	PackGlobal

	EachPage 遍历各页面
		-> 替换 global.js global.css


libs 变化

	PackLibs

	EachPage 遍历各页面
		替换 libs.js libs.css


辅助方法：

    PackJSCSS // 合并JS CSS

End
