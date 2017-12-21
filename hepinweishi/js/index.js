$(function() {
	$('#navbar-nav li').hover(function(){
	 
		var leftVal = $(this).offset().left;
			 
		$('.nav-every').eq($(this).index()).css({'display':'block','left':leftVal+'px'})
		
	},
		function(){
		 
			$('.nav-every').eq($(this).index()).css({'display':'none'})
			
		})


})