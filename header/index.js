var timer = null;

$('.logo').on('mouseenter', function () {
    $('.logo a').fadeOut();
    $('.logo_scene_img').css({
        backgroundImage: 'url(//img1.360buyimg.com/da/jfs/t1/27790/14/11705/159508/5c90a499Eef2eb290/a3d7423388163c0e.gif?v=' + Math.random() + ')'
    }).fadeIn();
}).on('mouseleave', function () {
    setTimeout(function () {
        $('.logo a').fadeIn();
    }, 3000);
});

function getSearchData (val) {
    $.ajax({
        url: 'https://suggest.taobao.com/sug',
        type: 'GET',
        data: {
            area: 'c2c',
            code: 'utf-8',
            q: val,
            callback: "renderDom"
        },
        dataType: 'jsonp'
    });
}

$('.text').on('input', function () {
    var val = $(this).val();
    if(val == ''){
        $('.search_bg').show();
    }
    $('.search_bg').hide();
    clearTimeout(timer);
    timer = setTimeout(function () {
        getSearchData(val);
    }, 500);
});

function renderDom (res) {

    var data = res.result;
    var str = '';
    console.log(data.length)

    data.forEach(function (ele, index) {
        str += `<li><a herf="#">${ele[0]}</a></li>`;
    });

    $('.search-list').html(str).show();
} 

var hideTimer = null;

$('.search-list').on('mouseleave', function () {
    hideTimer = setTimeout(function () {
        $('.search-list').hide();
    });
});