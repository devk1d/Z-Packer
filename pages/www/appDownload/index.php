
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>ZEALER APP</title> 
		<meta name="keywords" content="ZEALER 手机测评 手机评测" />
		<script>
		//移动设备判断
		var isMobile = {  
			Android: function() {  
				return navigator.userAgent.match(/Android/i) ? true : false;  
			},  
			BlackBerry: function() {  
				return navigator.userAgent.match(/BlackBerry/i) ? true : false;  
			},  
			IOS: function() {  
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;  
			},  
			Windows: function() {  
				return navigator.userAgent.match(/IEMobile/i) ? true : false;  
			},  
			Phone: function() {
				return navigator.userAgent.match(/Mobile/i) ? true : false; 
			},
			any: function() {  
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.Windows() || isMobile.Phone());  
			}  
		};

		// ga统计
		/* 上线请打开
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-42162857-1', 'zealer.com');
		*/

		// 跳转逻辑
		function redirect(){
			location.href = href;
		}

		var url_parts = document.URL.split('?');
		//var query = url_parts.length == 2 ? ('?' + url_parts[1]) : '';
		var href = '/';
		var ua = navigator.userAgent.toLowerCase();
		if (isMobile.IOS()) {
			href = 'itms-apps://itunes.apple.com/us/app/zealer/id1031782623?l=zh&ls=1&mt=8';
			ga('set', 'page', '/appDownload/ios');
			ga('send', 'pageview');
			ga('send', 'event', 'app', 'download-via-qrcode', 'ios', {'hitCallback': redirect});
			setTimeout(redirect, 300);
		} else if (isMobile.Android()) {
			href = 'http://www.zealer.com/assets/zealer-android-app.apk';
			ga('set', 'page', '/download/android');
			ga('send', 'pageview');
			ga('send', 'event', 'app', 'download-via-qrcode', 'android-local', {'hitCallback': redirect});
			setTimeout(redirect, 300);
		} else {
			ga('set', 'page', '/appDownload/other');
			ga('send', 'pageview');
			alert('抱歉，暂不支持您的系统');
			location.href = '/';
		} 
		
		</script>
	</head>
	<body>
	</body>
</html>
