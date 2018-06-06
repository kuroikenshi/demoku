function init_menu() {
	var $target = $('#menu');

	var $menu = $('<div class="navbar navbar-default navbar-static-top no-margin-bottom" role="navigation">' +
		'<div class="container-fluid">' +
		'<div class="navbar-header">' +
			'<a class="navbar-brand" href="javascript:void(0);">demoku</a>' +
		'</div>' +
		'<div>' +
			'<ul class="nav navbar-nav">' +
				'<li><a href="plugins.html">插件</a></li>' +
				'<li><a href="fix-ie8.html">兼容ie8</a></li>' +
				'<li class="dropdown">' +
					'<a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown">' +
						'标准/规范' +
						'<b class="caret"></b>' +
					'</a>' +
					'<ul class="dropdown-menu">' +
						'<li><a href="standard-and-rules.html">共通标准</a></li>' +
						'<li class="divider"></li>' +
						'<li><a href="standard-and-rules-pc.html">纯PC端</a></li>' +
						'<li><a href="standard-and-rules-responsive.html">响应式</a></li>' +
						'<li><a href="standard-and-rules-mobile.html">纯移动端</a></li>' +
						'<li class="divider"></li>' +
						'<li><a href="javascript:void(0);">H5页面</a></li>' +
					'</ul>' +
				'</li>' +
			'</ul>' +
			'<ul class="nav navbar-nav navbar-right">' +
				'<li class="active"><a href="javascript:void(0);">iOS</a></li>' +
				'<li><a href="javascript:void(0);">SVN</a></li>' +
			'</ul>' +
		'</div>' +
		'</div>' +
	'</div>');

	var url = location.href;
	$menu.find('li').each(function() {
		var $this = $(this);
		if (url.match($this.find('a').attr('href')) !== null) {
			$this.addClass('active');
		}
	});

	$target.after($menu);
	$target.remove();
}

init_menu();