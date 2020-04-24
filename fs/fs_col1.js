// var menuList = [{
//     titles: ['家用电器'],
//     content: {
//         tabs: ['家电馆', '家电专卖店', '家电服务', '企业采购', '商用电器', '以旧换新'],
//         subs: [{
//             title: '电视',
//             items: ['超薄电视', '全面屏电视', '智能电视', 'OLED电视', '智慧屏', '4k超清电视', '55英寸', '65英寸', '电视配件']
//         },{
//             title: '空调',
//             items: ['空调挂机', '空调柜机', '中央空调', '变频空调', '一级能效', '移动空调', '以旧换新']
//         },{
//             title: '洗衣机',
//             items: ['滚筒洗衣机', '洗烘一体机', '波轮洗衣机', '迷你洗衣机', '烘干机', '洗衣机配件']
//         },{
//             title: '冰箱',
//             items: ['多门', '对开门', '三门', '双门', '冷柜/冰吧', '酒柜', '冰箱配件']
//         },{
//             title: '厨卫大电',
//             items: ['油烟机', '燃气罩', '烟灶套餐']
//         },{
//             title: '厨房小电',
//             items: ['电饭煲', '电烤箱', '电压力锅']
//         },{
//             title: '生活电器',
//             items: ['电风扇', '冷风扇', '空气净化器']
//         },{
//             title: '个护健康',
//             items: ['剃须刀', '电动牙刷', '电吹风']
//         },{
//             title: '视听影音',
//             items: ['家庭影院', 'KTV音响', '迷你音响']
//         }]
//     }
// },{
//     titles: ['手机', '运营商', '数码'],
//     content: {
//         tabs: ['玩3c', '手机频道', '网上营业厅', '配件频道', '智能数码', '影响Club'],
//         subs: [{
//             title: '手机通讯',
//             items: ['手机', '游戏手机', '5G手机', '拍照手机', '全面屏手机', '老人机', '对讲机', '以旧换新', '手机维修']
//         },{
//             title: '运营商', 
//             items: ['合约机', '手机卡', '宽带']
//         },{
//             title: '手机配件',
//             items: ['手机壳', '贴膜', '手机存储卡']
//         }]
//     }
// },{
//     titles: ['电脑', '办公'],
//     content: {
//         tabs: ['玩3c', '电脑办公', '企业采购', 'GAME+'],
//         subs: [{
//             title: '电脑整机',
//             items: ['笔记本', '游戏本', '平板电脑', '台式机', '一体机', '服务站/工作站']
//         },{
//             title: '电脑配件',
//             items: ['显示器', 'CPU', '主板', '显卡', '硬盘']
//         },{
//             title: '外设产品',
//             items: ['鼠标', '键盘', '键鼠套装', '网络仪表仪器']
//         }]
//     }
// }];
(function (menuList) {
    
function renderMenuDom (data) {
    
    var frag = document.createDocumentFragment();
    data.forEach(function (ele, index) {
        var oLi = $('<li class="cate_menu_item"></li>').data('index', index);
        var titlesLen = ele.titles.length;
        // console.log(titlesLen)
        ele.titles.forEach(function (titles, index) {
            // console.log(ele, index)
            $('<a herf="#"></a>').text(titles).appendTo(oLi);
            if(index != titlesLen - 1) {
                $('<span>/</span>').appendTo(oLi);
            }
        });
        $(frag).append(oLi);
    });
    $('.cate_menu').append($(frag));
}
renderMenuDom(menuList);




$('.cate_menu_item').on('mouseenter', function () {
    $('.cate_pop').show();
    // console.log($(this).data('index'));
    var index = $(this).data('index');
    var data = menuList[index].content;
    // console.log(data);
    renderMenuContent(data);
}).on('mouseleave', function () {
    $('.cate_pop').on('mouseleave', function () {
        $('.cate_pop').hide();
    }).on('mouseenter', function() {
        $('.cate_pop').show();
    });
    $('.cate_pop').hide(); 
});

function renderMenuContent (data) {
    var cate_channel = $('<div class="cate_channel"></div>');
    var cate_detail = $('<div class="cate_detail"></div>');
    var frag = document.createDocumentFragment();
    data.tabs.forEach(function (ele, index) {
        $('<a herf="#">' + ele + '<i class="iconfont">&#xe603;</i></a>').appendTo(cate_channel);
    });
    data.subs.forEach(function (subs, index) {
        var oDl = $('<dl class="cate_detail_item"></dl>');
        $(`
            <dt><a herf="#">${subs.title}</a><i class="iconfont"></i></dt>
        `).appendTo(oDl);
        var oDd = $('<dd class="cate_detail_con"></dd>');
        subs.items.forEach(function (ele, index) {
            $(`
                <a herf="#" class="cate_detail_con_lk">${ele}</a>
            `).appendTo(oDd);
            oDd.appendTo(oDl);
        });
        oDl.appendTo(cate_detail);
    })
    $('.cate_part_col1').empty();
    $(frag).append(cate_channel).append(cate_detail).appendTo($('.cate_part_col1'));
    // console.log($('.cate_part_col1'));
}
})(menuList);