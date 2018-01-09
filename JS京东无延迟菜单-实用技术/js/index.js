$(document).ready(function(){
	
	var sub = $('#sub');
	var activeRow;
	var activeMenu;
	var timer
	//标识鼠标是否在sub里面
	var mouseInSub = false;

	sub.on('mouseenter', function(e){
		mouseInSub = true;
	}).on('mouseleave', function(e) {
		mouseInSub = false
	})

	var mouseTrack = []
	var moveHandler = function(e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		})

		if(mouseTrack.length>3){
			mouseTrack.shift()
		}

	}

	// 对容器绑定事件
	$('#test')
		.on('mouseenter',function(e){
			sub.removeClass('none')
			// mousemove一般绑定在document对象上面 这是一个常识、
			$(document).bind('mousemove',moveHandler)

		})
		.on('mouseleave',function(e){
			sub.addClass('none')
			if(activeRow) {
			activeRow.removeClass('active');
			activeRow = null
		}

			if(activeMenu) {
				activeMenu.addClass('none');
				activeMenu = null
			}
			// 必须解绑以免影响其他
			$(document).unbind('mousemove',moveHandler)
		})
		.on('mouseenter','li',function(e){
			if(!activeRow) {
				activeRow = $(e.target).addClass('active')
				activeMenu = $('#'+activeRow.data('id'))
				activeMenu.removeClass('none')
				return
			}
			//当timer不为null的时候说明前面的计时器还没有执行，那么就把前面的计时器清除掉
			if(timer) {
				clearTimeout(timer)
			}

			var currMousePos = mouseTrack[mouseTrack.length-1];
			// 上一次的坐标
			var leftCorner = mouseTrack[mouseTrack.length-2]

			var delay = needDelay(sub,leftCorner,currMousePos)
			// 如果在三角形内
			if(delay){
				timer = setTimeout(function(){

					if(mouseInSub) {//如果鼠标在子菜单里面那么我们就不处理 立刻返回
						return
					}
					activeRow.removeClass('active')
					activeMenu.addClass('none')

					activeRow = $(e.target)
					activeRow.addClass('active')
					activeMenu = $('#'+activeRow.data('id'))
					activeMenu.removeClass('none')
					timer = null 
				},500)
			}else {
				var prevActiveRow = activeRow;
	        	var prevActiveMenu = activeMenu;

	        	activeRow = $(e.target)
	        	activeMenu = $('#'+activeRow.data('id'));

	        	prevActiveRow.removeClass('active');
	        	prevActiveMenu.addClass('none')

	        	activeRow.addClass('active')
	            activeMenu.removeClass('none')
			}
			

			 

		})
})