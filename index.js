// 加载
// 网络请求
// https://github.com/xiaoliangtz/my-jd-web.git
$('#shortcut').load('./shortcut/shortcut.html');
// $('#shortcut').clean();
$('#header').load('./header/index.html');
$('.fs_col1').load('./fs/fs_col1.html');
// $('.fs_col2').load('./fs/fs_col2.html');
$('.fs_col3').load('./fs/fs_col3.html');
$('#app').load('./app/index.html');

$('.slider-wrapper').swiper({
    // 轮播的列表
    list: $('.slider-wrapper img'),
    // 延时
    duration: 3000,
    // type: 'animate',
    // 显示left,right按钮?
    showChangeBtn: true,
    // 显示下面的点?
    showSpotsBtn: true
});

$('.slider_list').swiper({
    list: $('.focus_item_recommend'),
    width: 190,
    height: 470,
    showChangeBtn: true,
    showSpotsBtn: false,
    // isAutoChange: false
    duration: 7000
})