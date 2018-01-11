;(function($){
	var Carousel = function(poster) {
		var self = this;
		this.poster = poster;
		this.posterItemMain = poster.find('ul.poster-list');
		this.prevBtn = poster.find('div.poster-prev-btn')
		this.nextBtn = poster.find('div.poster-next-btn')
		this.posterItems=poster.find("li.poster-item");
		this.posterFirstItem = this.posterItems.first()
		this.posterLastItem = this.posterItems.last()


		// 默认值，会被设置的data-setting替换掉
		this.setting =  {
							"width":1000,		 
							"height":270,			 
							"posterWidth":640,	 
							"posterHeight":270,	 
							"scale":0.9,					 
							"speed":500,
							"autoPlay":false,
							"delay":2000,
							"verticalAlign":"middle" //top bottom
						}
		// 如果用户设置了data-setting就使用用户的否则使用默认的
		$.extend(this.setting,this.getSetting())
		console.log(this.setting)
		this.setSettingValue()
		this.setPosterPos()
		this.flag = true;//设置一个标志来避免用户快速点击出现的问题
		this.nextBtn.click(function(){
			if(self.flag){
				self.flag=false
				self.carouseRotate('left')
			}
			
		})
		this.prevBtn.click(function(){
			if(self.flag){
				self.flag=false
				self.carouseRotate('right')
			}
			
		})
		this.timer = null;

		if(this.setting.autoPlay){
			this.autoPlay();
			this.poster.hover(function(){
			clearInterval(self.timer)
		},function(){
			self.autoPlay();
		})
		}
		
	}

	Carousel.prototype = {
		autoPlay:function(){
			var self = this
			this.timer=setInterval(function(){
				self.nextBtn.click()
			},this.setting.delay)
		},
		carouseRotate:function(dir){
			// 点击右边按键往左方向旋转
			if(dir=='left'){
				var _this_ = this,
					zIndexArr = []

				this.posterItems.each(function(){
					var self = $(this)
					var prev = self.prev().get(0)?self.prev():_this_.posterLastItem,
						width=prev.width(),
						height=prev.height(),
						opacity=prev.css('opacity'),
						left = prev.css("left"),
						top = prev.css("top"),
						zIndex=prev.css("zIndex");
					zIndexArr.push(zIndex);	

					self.animate({
						width:width,
						height:height,
						//zIndex:zIndex,//不过度这个，效果不好体验不好
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){_this_.flag = true});

				});
				this.posterItems.each(function(i){
					var self = $(this)
					self.css('zIndex',zIndexArr[i])
				})


			}else if(dir=='right'){
				var _this_ = this,
					zIndexArr = []
				this.posterItems.each(function(){
					var self = $(this)
					var next = self.next().get(0)?self.next():_this_.posterFirstItem,
						width=next.width(),
						height=next.height(),
						opacity=next.css('opacity'),
						left = next.css("left"),
						top = next.css("top"),
						zIndex=next.css("zIndex");
					zIndexArr.push(zIndex);	

					self.animate({
						width:width,
						height:height,
						//zIndex:zIndex,//不过度这个，效果不好体验不好
						opacity:opacity,
						left:left,
						top:top
					},_this_.setting.speed,function(){_this_.flag = true});

				});
				this.posterItems.each(function(i){
					var self = $(this)
					self.css('zIndex',zIndexArr[i])
				})
			}
			

		},
		setVerticalAlign:function(h){
			var verticalType = this.setting.verticalAlign,
				top = 0;
			if(verticalType==='middle'){
				top = (this.setting.height-h)/2
			}else if(verticalType==='top'){
				top = 0
			}else if(verticalType==='bottom'){
				top = this.setting.height-h
			}else{
				top = (this.setting.height-h)/2
			}
			return top
		},
		setPosterPos:function(){
			var self = this
			var sliceItems = this.posterItems.slice(1);
				sliceSize = sliceItems.size()/2,
				rightSlice = sliceItems.slice(0,sliceSize),
				leftSlice = sliceItems.slice(sliceSize);
				level= Math.floor(this.posterItems.size()/2);


			// 设置第一张图片作为数据的参考
			var rw = this.setting.posterWidth,
				rh = this.setting.posterHeight,
				gap = ((this.setting.width-this.setting.posterWidth)/2)/level

			var firstLeft = (this.setting.width-this.setting.posterWidth)/2
			var fixOffsetLeft = firstLeft+rw;
			// 设置右边的图片的位置
			rightSlice.each(function(i){
				level--;
				console.log(self.setting)
				rw = rw *self.setting.scale;
				rh = rh *self.setting.scale
				var j = i

				$(this).css({
								zIndex:level,
								width:rw,
								height:rh,
								opacity:1/(++j),
								left:fixOffsetLeft+(++i)*gap-rw,
								top:self.setVerticalAlign(rh)
							});
				})
			// 设置左边的图片的位置

			// 以右边的最后一张图片的属性作为参考
			var lw = rightSlice.last().width(),
				lh = rightSlice.last().height(),
				oloop = Math.floor(this.posterItems.size()/2);
			leftSlice.each(function(i){
			
			

				$(this).css({
								zIndex:i,
								width:lw,
								height:lh,
								opacity:1/oloop,
								left:i*gap,
								top:self.setVerticalAlign(lh)
								});
					lw = lw/self.setting.scale;
					lh = lh/self.setting.scale;
					oloop--;
			})
			


		},


		setSettingValue:function(){
			this.poster.css({
				width:this.setting.width,
				height:this.setting.height
		
			})
			this.posterItemMain.css({
				width:this.setting.width,
				height:this.setting.height
			})
			var w = (this.setting.width-this.setting.posterWidth)/2; 
			this.prevBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			})
			this.nextBtn.css({
				width:w,
				height:this.setting.height,
				zIndex:Math.ceil(this.posterItems.size()/2)
			})
			this.posterFirstItem.css({
				width:this.setting.posterWidth,
				height:this.setting.posterHeight,
				zIndex:Math.floor(this.posterItems.size()/2),
				left:w,
				top:0
			})
		},

		getSetting:function(){
			var setting = this.poster.attr('data-setting');
			if(setting&&setting!=='') return $.parseJSON(setting)
		}
	}

	Carousel.init = function(posters){
		posters.each(function(){
			new Carousel($(this))
		})
	}

	window.Carousel = Carousel //注册为全局变量














})(jQuery)