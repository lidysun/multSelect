# multSelect
layui select 多选
# How to use ?
```
layui.use(['multSelect'], function() {
    var multSelect = layui.multSelect;
    var data = [{
        id: 1,
        name: '微信',
        initChecked: 1
    }, {
        id: 2,
        name: '支付宝',
        initChecked: 0
    }, {
        id: 3,
        name: '信用卡',
        initChecked: 1
    }];
    
    // 参数elem(jq元素), data(数据), checkedFn(选中回调), canceledFn(取消回调)
    // 返回值：从原data数据中选中的数据,格式同data
    // 禁用方式：elem为空 data为空 或者 加类名select-mult-disabled
    var checkData = multSelect.init($('#j_selectMultPay'), data, function(id, checkedDate) {
        // console.log('添加' + id);
        // console.log(checkedDate);
    }, function(id, checkedDate) {
        // console.log('取消' + id);
        // console.log(checkedDate);
    });
})
```
