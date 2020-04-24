$('.seckill-list').swiper({
    // 要轮播的列表
    list: $('.slider-list'),
    // 轮播类型
    type: 'animate',
    // 延时
    duration: 5000,
    // 是否显示下面的点点
    showSpotsBtn: false,
    // 是否显示按钮(left, right)
    showChangeBtn: true
});
$('.seckill-brand-slider').swiper({
    list: $('.brand-item'),
    showSpotsBtn: true,
    showChangeBtn: false
});
// console.log('success')
var jdHour = new Date().getHours();
var jdMinute = 59 - new Date().getMinutes();
var jdSecond = new Date().getSeconds();
// console.log(jdHour)
$('.seckill-countdown strong').text(jdHour + 1 + ':00');
$('.seckill-countdown .timer-unit-hour').text('00');

var timer = null;
// var jdSecond = 0;
timer = setInterval(function () {
    jdSecond--;
    if(jdSecond == 0) {
        jdSecond = 59;
        jdMinute--;
        if(jdMinute == 0 && jdHour != 0) {
            jdHour --;
        }
    }
    $('.seckill-countdown .timer-unit-minute').text(jdMinute);
    $('.seckill-countdown .timer-unit-second').text(jdSecond);
}, 1000)