(function () {

	function Swiper (config, wrap) {

		this.wrap = wrap || $('body');
		this.width = config.width || $(wrap).width();
		this.height = config.height || $(wrap).height();
		// 延时
		this.duration = config.duration || 2000;
		// 是否自动animate或fade
		this.isAutoChange = config.isAutoChange || true;
		// 是否显示左右按钮
		this.showChangeBtn = config.showChangeBtn || false;
		// 锁
		this.lock = false;
		// 轮播列表
		this.list = config.list || [];
		this.num = this.list.length;
		// animate or fade?
		this.type = config.type || 'fade';
		this.nowIndex = 0;
		// 是否显示下面那个小点点?
		this.showSpotsBtn = config.showSpotsBtn || false;
		this.timer = null;
		this.direction = config.direction || 'right';
		// console.log(this.showSpotsBtn)
		// console.log(this.num)
		// console.log(this.wrap)
		this.init = function () {
			
			this.createDom();
			this.initStyle();
			this.bindEvent();

			if(this.isAutoChange) {
				this.autoChange();
				// console.log('autoChange1')
			}

		}
		// 建dom
		Swiper.prototype.createDom = function () {
			// console.log('a');
			var mySwiper = $('<div class="my-swiper"></div>');
			var mySwiperUl = $('<ul class="my-swiper-list"></ul>');
			var mySwiperSpots = $('<div class="my-swiper-spots"></div>');
			// console.log(mySwiperSpots);
			for(var i = 0; i < this.num; i++ ) {
				// console.log('zzz');
				var item = this.list[i];
				$('<li class="my-swiper-item"></li>').append($(item))
													 .appendTo(mySwiperUl);
				$('<span></span>').appendTo(mySwiperSpots);									 
			}

			if(this.type == 'animate') {
				$('<li class="my-swiper-item"></li>').append($(this.list[0]).clone(true))
													 .appendTo(mySwiperUl);
			}

			mySwiper.append(mySwiperUl)
					.append($('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>'))
					.append($('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>'))
					.append(mySwiperSpots)
					.appendTo(this.wrap)
					.addClass('my-swiper-' + this.type);

		}

		Swiper.prototype.initStyle = function () {

			if(this.type == 'animate') {

				$('.my-swiper-list', this.wrap).css({
					width: (this.num + 1) * this.width,
					height: this.height
				});
				$('.my-swiper-item',  this.wrap).css({
					width: this.width,
					height: this.height
				});

			} else {
				$('.my-swiper-list', this.wrap).hide().eq(this.nowIndex).show();
			}

			if(!this.showChangeBtn) {
				// console.log(this.showChangeBtn)
				$('.my-swiper-btn', this.wrap).hide();
				// console.log('showChangeBtn hide')
			}

			if(!this.showSpotsBtn) {
				// console.log('spots hide')
				$('.my-swiper-spots', this.wrap).hide();
			}
																// 到末尾后归零
			$('.my-swiper-spots span', this.wrap).eq(this.nowIndex % this.num).addClass('active');

		}
		// 添加事件监听
		Swiper.prototype.bindEvent = function () {

			var _this = this;

			$('.my-swiper', this.wrap).on('mouseenter', function () {
				clearInterval(_this.timer);
			}).on('mouseleave', function () {
				if(_this.isAutoChange) {
					_this.autoChange();
					// console.log('autoChange');
				}
			});

			$('.my-swiper-spots span', this.wrap).on('mouseenter', function () {

				if(_this.lock) {
					return false;
				}
				_this.lock = true;
				_this.nowIndex = $(this).index();
				_this.change();

			});

			$('.my-swiper-lbtn', this.wrap).on('click', function () {
				if(_this.lock) {
					return false;
				}
				_this.lock = true;

				if(_this.nowIndex == 0) {

					if(_this.type == 'animate') {
						$('.my-swiper-list', _this.wrap).css({
							left: -_this.num * _this.width
						});
						// console.log(_this.num)
					}

					_this.nowIndex = _this.num - 1;
				} else {
					_this.nowIndex--;
				}
				_this.change();
			});

			$('.my-swiper-rbtn', this.wrap).on('click', function () {

				if(_this.lock) {
					return false;
				}
				_this.lock = true;

				if(_this.type == 'fade' && _this.nowIndex == _this.num - 1) {

					_this.nowIndex = 0;

				} else  if (_this.type == 'animate' && _this.nowIndex == _this.num) {

					$('.my-swiper-list', _this.wrap).css({
						left: 0
					});
					// console.log(_this.num)
					_this.nowIndex = 1;

				} else {
					_this.nowIndex++;
				}
				_this.change();
			});
		}
		// 轮播
		Swiper.prototype.change = function () {

			var _this = this;
			if(this.type == 'fade') {
				$('.my-swiper-item', _this.wrap).fadeOut().eq(_this.nowIndex % this.num).fadeIn(function () {
					_this.lock = false;
				});
			} else {
				$('.my-swiper-list', _this.wrap).animate({
					left: -_this.nowIndex * _this.width
				}, function () {
					_this.lock = false;
				});
			}
			$('.my-swiper-spots span', this.wrap).removeClass('active').eq(this.nowIndex % this.num).addClass('active');
		}
		// 自动轮播
		Swiper.prototype.autoChange = function () {

			var _this = this;
			this.timer = setInterval(function () {
				if(_this.direction == 'right') {
					$('.my-swiper-rbtn', _this.wrap).click();
				} else {
					$('.my-swiper-lbtn', _this.wrap).click();
				}
			}, _this.duration);

		}

	}

	// 重写override
	// 添加一个swiper函数
	$.fn.extend({
		swiper: function (config) {
			var obj = new Swiper(config, this);
			obj.init();
		}
	});

})();