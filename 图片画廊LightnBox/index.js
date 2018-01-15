;(function($){
	var LightBox = function(setting){
	this.settings = {
			speed:600
		}
	// 对默认参数进行扩展，如果没有传参数就用一个空对象给他扩展
	$.extend(this.settings,setting||{})
	var self = this
	// 创建遮罩和弹出框
	this.popupMask = $('<div id="G-lightbox-mask">');
	this.popupWindow = $('<div id="G-lightbox-popup">')
	this.bodyNode = $(document.body)
	 // 渲染DOM，并插入到body
	this.renderDom()	 
	this.groupName = null;
	this.groupData = []

	this.popupPic = this.popupWindow.find('img.lightbox-image')
	this.popCaptionArea = this.popupWindow.find('div.lightbox-pic-caption')//图片描述区域
	this.picViewArea = this.popupWindow.find('div.lightbox-pic-view'); //图片预览区域
	// this.picCaptionArea = this.popupWindow.find('div.lightbox-pic-caption'); 

	this.captionText = this.popupWindow.find('p.lightbox-pic-desc');
	this.currentIndex = this.popupWindow.find('span.lightbox-of-index');

	this.nextBtn = this.popupWindow.find('span.lightbox-next-btn');
    this.prevBtn = this.popupWindow.find('span.lightbox-prev-btn');

    this.closeBtn = this.popupWindow.find('span.lightbox-close-btn');

	this.bodyNode.delegate('js-lightbox,*[data-role="lightbox"]','click',function(e){
		 
		e.stopPropagation();

		var currentGroupName = $(this).attr('data-group')
		console.log(currentGroupName)
		// 判断点击的图片是不是同一组，如果不是那么就执行里面的获取数据的方法
		if(currentGroupName != self.groupName){
			// console.log(self.groupName)
			self.groupName = currentGroupName
			// 根据当前的组名获取同一组的数据
			self.getGroup()
		}
		// 初始化弹出框、
		self.initPopup($(this))
	})

	this.popupMask.click(function() {
		$(this).fadeOut()
		self.popupWindow.fadeOut()
		self.clear=false
	})

	this.closeBtn.click(function(){
		self.popupMask.fadeOut()
		self.popupWindow.fadeOut()
		self.clear=false
	})

	// 对按钮进行事件的绑定
	this.flag = true
	this.nextBtn.hover(function(){
		if(!$(this).hasClass('disabled')&&self.groupData.length>1){
			self.nextBtn.addClass('lightbox-next-btn-show')
		}
	},function(){
		self.nextBtn.removeClass('lightbox-next-btn-show')
	}).click(function(e){
		e.stopPropagation()
		if(!$(this).hasClass('disabled')&&self.flag==true&&self.groupData.length>1){
			self.flag=false
			self.goto('next')
		}
	});

	this.prevBtn.hover(function(){
		if(!$(this).hasClass('disabled')&&self.groupData.length>1){
			self.prevBtn.addClass('lightbox-prev-btn-show')
		}
	},function(){
		self.prevBtn.removeClass('lightbox-prev-btn-show')
	}).click(function(e){
		e.stopPropagation()
		if(!$(this).hasClass('disabled')&&self.flag==true&&self.groupData.length>1){
			self.flag=false
			self.goto('prev')
		}
	})
	// 绑定窗口调整事件
	var timer = null
	// 控制 在没有弹出框的时候这个resize里面的方法不执行
	this.clear = false
	// resize的触发是非常频繁的所以需要过滤下，只执行最后一次
	$(window).resize(function(){
		if(self.clear){
			window.clearTimeout(timer)
			timer = window.setTimeout(function(){
				// 重新加载图片
				self.loadPicSize(self.groupData[self.index].src)
			},500)
		}
	}).keyup(function(e){
		var keyValue = e.which
		if(self.clear){
			if(keyValue==37||keyValue==38){
				self.prevBtn.click()
			}else if(keyValue==39||keyValue==40){
				self.nextBtn.click()
			}
		}
	
	})

}

	LightBox.prototype = {
		goto:function(dir){
			 if(dir=="next"){
			 	this.index++;
			 	if(this.index>=this.groupData.length-1){
			 		this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show');
                }
                if (this.index != 0) { //如果索引不为0，则让pre按钮可用
                    this.prevBtn.removeClass('disabled');
                }
                //拿下一个要显示的图片的地址
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            }else if (dir === 'prev') {
                this.index--;
                if (this.index <= 0) {
                    this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show');
                };
                if (this.index != this.groupData.length - 1) {
                    this.nextBtn.removeClass('disabled');
                };
                var src = this.groupData[this.index].src;
                this.loadPicSize(src);
            }
			 
		},
		changePic:function(width,height){
			var self = this,
				winWidth = $(window).width()
				winHeight = $(window).height();
			//限制图片的显示，让他不超出当前视口，最多就和视口一样比例=1	
			var scale = Math.min(winWidth / (width + 10), winHeight / (height + 10), 1); //边框为10
            width = width * scale; //如果图片太大则只显示限定比例后的宽高
            height = height * scale;
			console.log(width,height)
			this.picViewArea.animate({
				width:width-10,
				height:height-10
			},self.settings.speed);
			this.popupWindow.animate({
				width:width,
				height:height,
				marginLeft:-(width/2),
				top:(winHeight-height)/2
			},self.settings.speed,function(){
				self.popupPic.css({
					width:width-10,
					height:height-10,
				}).fadeIn();
				self.popCaptionArea.fadeIn()
			})
			this.captionText.text(this.groupData[this.index].caption);
			this.currentIndex.text('当前索引:' + (this.index + 1) + ' of ' + this.groupData.length)
			self.flag = true; //图片做完动画再改变标识值
			self.clear = true //控制window的resize方法里面的函数
		},
		loadPicSize:function(sourceSrc){
			var self = this;
			self.popupPic.css({ width: 'auto', height: 'auto' }).hide(); //每次要把上次的宽高清空
            this.popCaptionArea.hide(); //切换图片时，图片未加载完成，下面的文字先隐藏
			this.preLoadImg(sourceSrc,function(){
				// 重新设置图片 得到新图片的尺寸
				self.popupPic.attr('src', sourceSrc);
                var picWidth = self.popupPic.width();
                var picHeight = self.popupPic.height();
                console.log(picWidth,picHeight)

                self.changePic(picWidth,picHeight)
			})







		},
		// 预加载图片，相当于先把图片缓存进来
		preLoadImg:function(src,callback){
			var img = new Image();
			if(!!window.ActiveXObject){
				img.onreadystatechange = function(){
					if(this.readyState=='complete'){
						callback()
					}
				}
			}else{
				img.onload = function(){
					callback()
				}
			}
			img.src = src
		},
		showMaskAndPopup:function(sourceSrc,currentId){
			var self = this;
 
			this.popupPic.hide()
			this.popCaptionArea.hide()

			// 获得视口的宽高
			var winWidth = $(window).width()
			var winHeight = $(window).height()

			this.picViewArea.css({
					width:winWidth/2,
					height:winHeight/2
			})

			this.popupMask.fadeIn(); //遮罩层弹出
            this.popupWindow.fadeIn(); //弹出框弹出

            var viewHeight = winHeight/2+10;
            // var topAnimate = (winHeight-viewHeight)/2;
            //设置弹出层的水平垂直居中及动画效果
            this.popupWindow.css({
            	width: winWidth/2+10, //5像素边框问题
            	height: winHeight / 2 + 10,
            	marginLeft: -(winWidth / 2 + 10) / 2, //水平居中
            	 top: -viewHeight//隐藏起来，以便后来好淡入
            }).animate({
            	top:(winHeight-viewHeight)/2
            },self.settings.speed,function(){
            	self.loadPicSize(sourceSrc)
            })
            this.index = this.getIndexOf(currentId)
            console.log(this.index)

            

            var groupDataLength = this.groupData.length;
            console.log(groupDataLength)
            if(groupDataLength>1){
            	 if (this.index === 0) {
            	 	this.prevBtn.addClass('disabled');
                    this.nextBtn.removeClass('disabled');
                } else if (this.index === groupDataLength - 1) {
	                this.nextBtn.addClass('disabled');
	                this.prevBtn.removeClass('disabled');
                } else {
	                this.nextBtn.removeClass('disabled');
	                this.prevBtn.removeClass('disabled'); 
	            }
            }else{
            		this.prevBtn.addClass('disabled');
                	this.nextBtn.addClass('disabled');
            }

		},
		getIndexOf:function(currentId){
			var index = 0;
			// 把普通数组转为jq对象
			$(this.groupData).each(function(i) {
				index=i;
				// jQuery里面使用return false跳出循环、
				if(this.id===currentId){return false}
			})

			return index


		},
		initPopup:function(currentObj){
			var self = this;
			// 获取当前被点击图片的src和id 后续确定是否有前后按钮使用
			sourceSrc = currentObj.attr('data-sourse')
			currentId = currentObj.attr('data-id')
			// 显示遮罩层和弹出框
			this.showMaskAndPopup(sourceSrc,currentId)

		},
		getGroup:function(){
			var self = this;
			// 据当前的组名获得所有相同组名的对象
			var groupList = this.bodyNode.find('*[data-group='+this.groupName+']')
			// 清空数据，避免和下一组出现叠加
			self.groupData.length = 0;
			groupList.each(function(){
				self.groupData.push({
							src:$(this).attr('data-sourse'),
							id:$(this).attr('data-id'),
							caption:$(this).attr('data-caption')
				})
			})
		},
		renderDom:function(){
			var domStr = 
			'<div class="lightbox-pic-view">'+
			'<span class="lightbox-btn lightbox-prev-btn"> </span>'+
			'<img class="lightbox-image" src="./images/2-6.jpg">'+
			'<span class="lightbox-btn lightbox-next-btn"> </span>'+
			'</div>'+
			'<div class="lightbox-pic-caption">'+
			'<div class="lightbox-caption-area">'+
			'<p class="lightbox-pic-desc">标题</p>'+
			'<span class="lightbox-of-index">索引</span>'+
			'</div>'+
			'<span class="lightbox-close-btn"></span>'+
			'</div>';
		this.popupWindow.html(domStr);
		this.bodyNode.append(this.popupMask,this.popupWindow)
		}
	}

	window["LightBox"] = LightBox
})(jQuery)