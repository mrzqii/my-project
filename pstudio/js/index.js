$(function () {
	var win_width = 0;
	var win_height = 0;
	var headHeight = 100;
	var box = $(".listBox").get(0);
	var imgs = $(".listBox ul").get(0);
	var aImg = imgs.getElementsByTagName("li");
	var downX = 0;
	var downY = 0;
	var downLeft = 0;
	var bannerInd = 0;
	var aboutInd = 0;
	var skillArr = [0.96, 0.96, 0.96, 0.96, 0.96];
	var workInd = 0;
	var workWid = 303;
	var workBox = $(".listBox");
	var workShowSize = 4;

	init();
	main();

	

	function init() {
		// 一屏的尺寸
		win_width = $(window).width();
		win_height = $(window).height();
		$(".banner").height(win_height);
		$(".banner li").width(win_width);
		// 缩放窗口宽度大小导致导航条的样式变化
		if (win_width < 1050 - 17) {
			headHeight = 56;
		} else {
			headHeight = 70;
		}
		// 设置工作区每行显示的案列个数
		setWorkStyle();
		if (workInd >= $(".work .listBox li").length - workShowSize) {
			workInd = $(".work .listBox li").length - workShowSize;
		}
		// $(".listBox ul").stop(false, false).css({
		// 设置定位的盒子left=0对齐
		$(".listBox ul").css({
			left: -workWid * workInd
		});
	}

	function main() {
		// 控制welcome消失，nav出现
		loadPage();
		// 创建work区域
		createWork("ALL");
		// service区域向上弹出的动画设置
		$(document).on("touchstart", ".service li", function () {
			if ($(this).hasClass("tc")) {
				$(this).removeClass("tc");
			} else {
				$(this).addClass("tc");
			}
		}).on("mouseover", ".service li", function () {
			$(this).addClass("tc");
		}).on("mouseleave", ".service li", function () {
			$(this).removeClass("tc");
		});
		//设置锚链接	
		$(".nav li a").click(function () {
			// var anchorCur = "#" + $(this).attr("href").split("#")[1];
			var anchorCur = $(this).attr("href");
			if ($(anchorCur).length > 0) {
				// anchorCur 不能等于index所以需要判断不然不好设置
				setScroll(anchorCur);
				// 当a标签里面没有#号的时候
			} else {
				$("html,body").animate({
					scrollTop: 0
				}, 700);
			}
			return false;
		});

		$(".navM li a").click(function () {
			// var anchorCur = "#" + $(this).attr("href").split("#")[1];
			var anchorCur = $(this).attr("href");
			if ($(anchorCur).length > 0) {
				setScroll(anchorCur);
			} else {
				$("html,body").animate({
					scrollTop: 0
				}, 700);
			}
			// 移动端下面关于导航条的一些动画：按钮旋转；nav收上去
			$(".navBtn").removeClass("navShow")
			$(".navM").slideUp();
			return false;
		});

		$(".banner .more a").click(function () {
			var anchorCur = "#work";
			setScroll(anchorCur);
			return false;
		});

		$(".banner .arrow").click(function () {
			var anchorCur = "#about";
			setScroll(anchorCur);
			return false;
		});

		// work区域点击进行分类显示
		$(".work .menu a").click(function () {
			// 调用分类的方法
			createWork($(this).attr("type"));
			// 添加点击样式
			$(".work .menu a").removeClass("cur");
			$(this).addClass("cur");
			return false;
		});
		// 点击左右箭头
		$(".work .btnLeft").click(function () {
			// 处理边界问题
			if (workInd <= 0) {
				return false;
			}
			workInd--;
			$(".work .list ul").stop().animate({
				left: -workWid * workInd
			});

			return false;
		});

		$(".work .btnRight").click(function () {
			// 处理边界问题：当已经点到了最后面
			if (workInd >= $(".work .list li").length - workShowSize) {
				return false;
			}
			workInd++;
			$(".work .list ul").stop().animate({
				left: -workWid * workInd
			});
			return false;
		});

	}
	//滚动到不同位置 变换nav的选中状态
	$(window).scroll(function () {
		// 窗口卷去的高度
		var sT = $(window).scrollTop();
		console.log("1;",sT)
		console.log("2;",$(".row.about").offset().top)
		var aRow = $(".row");
		var curInd = 0;
		for (var i = 0; i < 5; i++) {
			// 卷曲的高度>row距离视口的top -窗口高度*0.3
			if (sT > aRow.eq(i).offset().top - win_height * 0.3) {
				// 这里之前的索引如果满足条件后面还会覆盖，所以取最后一个满足条件的
				curInd = i;
			}
		}
		if (sT > win_height) {
			// 移除nav的背景图
			$(".head").removeClass("headFirst");
		} else {
			$(".head").addClass("headFirst");
		}
		// 滚动窗口和上面的导航选中样式联动
		$(".nav li").removeClass("cur").eq(curInd).addClass("cur");

	});
	
	
	// 控制welcome消失，nav出现
	function loadPage() {
		// var aLoadImg = $(".loadImg");
		// loadImg元素数量为1
		// var maxNum = $(".loadImg").length;
		// var curNum = 0;
		// var oLineCur = $(".lineCur");
		setTimeout(function () {
			$(".welcome").fadeOut(800);
			setTimeout(function () {
				$(".head").animate({
					top: 0
				}, 600);
				changeBanner();
			}, 100)

		}, 500)

		// for(var i=0;i<maxNum;i++){
		// 	aLoadImg.eq(i).attr("src",aLoadImg.eq(i).attr("_src")).load(function(){
		// 		curNum++;
		// 		oLineCur.css({width:parseInt(curNum/maxNum*win_width)})
		// 		if(curNum==maxNum){
		// 			setTimeout(function(){
		// 				$(".welcome").fadeOut(800);
		// 				setTimeout(function(){
		// 					$(".head").animate({top:0},600);
		// 					changeBanner();
		// 				},100)

		// 			},500)
		// 		}
		// 	});
		// }

	}
	// 点击导航跳转到指定位置
	function setScroll(anchorCur) {
		// 兼容性写法 支持chrome 和 firfox
		$("html,body").animate({
			scrollTop: $(anchorCur).offset().top - headHeight
		}, 700);
	};
	//banner的轮播切换 
	function changeBanner() {
		var bannerInv = setInterval(function () {
			if (bannerInd >= 1) {
				bannerInd = 0;
			} else {
				bannerInd++;
			}
			$(".banner .imgs li").stop().fadeOut(600).eq(bannerInd).stop().fadeIn(600);
		}, 4000);

	}
	// 生成work部分
	function createWork(type) {
		var str = '';
		for (var i = 0; i < workData.length; i++) {
			if (type == 'ALL' || workData[i].type == type) {
				str += '<li><a href="javascript:;" target="_blank"><div class="imgBox"><img src="' + workData[i].imgSrc + '" class="img"/><div class="bg"></div><img src="images/i5.png" class="i5"/><img src="images/i6.png" class="i6"/></div><div class="t">' + workData[i].title + '</div><p class="time">' + workData[i].time + '</p></a></li>';
			}
		}
		$(".work ul").css({
			left: 0
		}).html(str);
		workInd = 0;
		setWorkStyle();
	}
	// 设置work部分
	function setWorkStyle() {
		workShowSize = 4;
		if (win_width <= 440 - 17) {
			workWid = workBox.width() * 1.05;
			workShowSize = 1;
			//   对每个图片的外层li设置样式
			workBox.find("li").css({
				width: workBox.width(),
				marginRight: workBox.width() * 0.05
			});
			// 对图片的高度进行动态设置
			var workImgHeight = workBox.width() * 1.05 * 180 / 272;
			workBox.find(".imgBox").css({
				height: workImgHeight
			});
			//   对每个图片的外层li设置样式
			workBox.css({
				height: workBox.find("li").height() + 19
			});

		} else if (win_width <= 840 - 17) {
			workWid = workBox.width() * 0.54;
			workShowSize = 2;
			workBox.find("li").css({
				width: workBox.width() * 0.46,
				marginRight: workBox.width() * 0.08
			});

			var workImgHeight = workBox.width() * 0.23 * 2 * 180 / 272;
			workBox.find(".imgBox").css({
				height: workImgHeight
			});
			workBox.css({
				height: workBox.find("li").height() + 19
			});

		} else if (win_width <= 1280 - 17) {
			workWid = workBox.width() * 0.257;
			workBox.find("li").css({
				width: workBox.width() * 0.227,
				marginRight: workBox.width() * 0.03
			});

			var workImgHeight = workBox.width() * 0.227 * 220 / 272;
			workBox.find(".imgBox").css({
				height: workImgHeight
			});
			workBox.css({
				height: workBox.find("li").height() + 19
			});
		} else {

			workWid = workBox.width() * 0.257;
			workBox.find("li").css({
				width: workBox.width() * 0.227,
				marginRight: workBox.width() * 0.03
			});

			var workImgHeight = workBox.width() * 0.227 * 220 / 272;
			workBox.find(".imgBox").css({
				height: workImgHeight
			});
			workBox.css({
				height: workBox.find("li").height() + 19
			});
		}

	}

});