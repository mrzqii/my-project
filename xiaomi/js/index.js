$(function(){


	var ipt = $('.nav-text');
	var placeholder = $('.placeholder');
	ipt.focus(function() {
		placeholder.fadeOut()
	})
	ipt.blur(function() {
		placeholder.fadeIn()
	})


// 二级导航
	var olist = $(".nav-list-li"),
		obox = $(".nav-second-list");
	for(var i = 0; i < olist.length; i++){
		olist[i].id = i;
		olist[i].onmouseover = function(){
			for(var j = 0; j < obox.length; j++){
				obox[j].style.display = "none";
				}
			obox[this.id].style.display = "block";
			}
		}
	$("#nav-list").on("mouseover",function(){
		$("#nav-second").stop().slideDown('slow');
	})
	
	$("#nav-list").on("mouseleave",function(){
		$("#nav-second").stop().slideUp('slow');
	})

//图片轮播	
	var a = 0,
		Time;
		function imgCha(){
			$(".pic-wrap img").eq(a).stop(true).fadeIn(900).siblings().hide();
			$(".smallbtn li").eq(a).addClass("hov").siblings().removeClass("hov");
		};
		$(".smallbtn li").hover(function(){
			a = $(this).index();imgCha()
		});
		function auto(){
			Time = setInterval(function(){
				(a<6)?(a++):(a=0);imgCha();
			},3000);
		};
		auto();
		$(".pic-wrap").hover(function(){clearInterval(Time)},function(){auto()});
	
//侧边导航条
	$(".main1-nav-ul > li").on('mouseover', function(event) {
		$(this).children(".main1-nav-list").show();
	});
	$(".main1-nav-ul > li").on('mouseout', function(event) {
		$(this).children(".main1-nav-list").hide();
	});

// main2图片卡滚动切换
	var oWidth = $(".main2").width();
	var index = 0;
	var timer = null;
	$("#spanleft").on( "click" , leftPlay);
	
	function leftPlay () {
		$("#spanleft").removeClass('span-color');
		$("#main2-wrap").animate({
			"margin-left":0+"px"
		},500);
		$("#spanright").addClass("span-color");
	}
	
	$("#spanright").on("click",rightPlay);
	
	function rightPlay(){
		$("#spanright").removeClass("span-color");
		$("#main2-wrap").animate({
			"margin-left":-oWidth+"px"
		},500);
		$("#spanleft").addClass("span-color")
	}
	
	$("#main2-wrap").hover(function() {
		clearInterval(timer);
		timer = null;
	}, function() {
		timer = setInterval(timeAuto,10000);
	});
	
	function timeAuto(){
		leftPlay();
		setTimeout(rightPlay,4000);
	}
	timer = setInterval(timeAuto,10000);
	

// 搭配选项切换
	var oLi = $(".dapei-head-list li"),
		oBox = $(".dapei-tab");
		for(var i = 0; i < oLi.length; i++){
			oLi[i].id = i;
			oLi[i].onmouseover = function(){
				for(var j = 0; j < oBox.length; j++){
					oBox[j].style.display = "none";
					oLi[j].className = "";
				}
					oBox[this.id].style.display = "block";
					oLi[this.id].className = "dapei-lion";
			}
		}
// 为你推荐
	 var sWidth = $(".main-tuijian").width();
		index = 0;
	$(".spanleft").on("click",function(){
		index++;
		if(index > 0){
			index = 0
		}
		$(".tuijian-wrap").animate({
			"margin-left":sWidth*index+"px"
		},500);
		$(".span-btn span").removeClass("span-color");
		$(this).addClass("span-color");
	
		console.log(index);
	})
	
	$(".spanright").on("click",function(){
		index--;
		if(index < -3){
			index = -3
		}
		$(".tuijian-wrap").animate({
			"margin-left":sWidth*index+"px"
		},500)
		$(".span-btn span").removeClass("span-color");
		$(this).addClass("span-color");
	})
	
// 内容
	 
	function picChange(pic,list,wrap,btn){
		var index=0;
	    list.click(function() {
	    	 // var index=0;
	        index = list.index(this);  //获取鼠标点击 li 的index
	        showImg(index)})
	    //滑入按钮显示，滑出隐藏.
	    wrap.hover(function() {
	       	btn.show();
	    }, function() {
	       	btn.hide();        
	    })//.trigger("mouseleave");
	
	    //图片切换
	    function showImg(index) {
	        var adWidth = $(".neirong-box").width();
	        pic.animate({
	            "marginLeft": -adWidth * index + "px" 
	        }, 200);
	        list.removeClass("liOn").eq(index).addClass("liOn");
	    }
	}
	picChange($("#neirong-tab1"),$("#card-list1>li"),$("#neirong-box1"),$("#neirong-tab1 span"));
	picChange($("#neirong-tab2"),$("#card-list2>li"),$("#neirong-box2"),$("#neirong-tab2 span"));
	picChange($("#neirong-tab3"),$("#card-list3>li"),$("#neirong-box3"),$("#neirong-tab3 span"));
	picChange($("#neirong-tab4"),$("#card-list4>li"),$("#neirong-box4"),$("#neirong-tab4 span"));

	function btnChange(leftbtn,rightbtn,boxwrap,listNum){
		var index=0;
		rightbtn.on("click",function(){
			index++;
			if(index > 3){
				index = 3
			}
			var bWidth = $(".neirong-box").width();
			boxwrap.animate({
				"marginLeft":bWidth*-index
			},200);
			for (var i = 0; i < listNum.length; i++) {
				listNum[i].className = "";
			}

			listNum[index].className = "liOn";
		})
		leftbtn.on("click",function(){
			index--;
			if(index < 0){
				index = 0
			}
			var bWidth = $(".neirong-box").width();
			boxwrap.animate({
				"marginLeft":-bWidth*index
			},200);
			for (var i = 0; i < listNum.length; i++) {
				listNum[i].className = "";
			}
			listNum[index].className = "liOn";
		})

	}
	btnChange($("#card-left1"),$("#card-right1"),$("#neirong-tab1"),$("#card-list1>li"));
	btnChange($("#card-left2"),$("#card-right2"),$("#neirong-tab2"),$("#card-list2>li"));
	btnChange($("#card-left3"),$("#card-right3"),$("#neirong-tab3"),$("#card-list3>li"));
	btnChange($("#card-left4"),$("#card-right4"),$("#neirong-tab4"),$("#card-list4>li"));
	
	
});