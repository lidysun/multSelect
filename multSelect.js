//数组筛选兼容ie7/8
Array.prototype.filter = function(fn) {
    var newArray = [];
    var length = this.length;
    var i = 0;
    for (; i < length; i++) {
        if (fn(this[i])) {
            newArray.push(this[i])
        }
    }
    return newArray;
};
// 查找数租中指定id对象的索引
Array.prototype.indexOfId = function(id) {
    for (var i = 0; i < this.length; i++) {
        if (this[i]['id'] == id) return i;
    }
    return -1;
};

layui.define(['jquery', 'form'], function(exports) {
    var $ = layui.$;
    var form = layui.form;
    var MultSelect = {
        elem: '',
        data: [],
        renderHtml: function() {
            var _that = this;
            var $elem = _that.elem;
            if (_that.data) {
                var $select = $('<ul class="select-mult-options layui-form" lay-filter="selectMult"></ul>')
                $elem.append($select);
                var html = '';
                $.each(_that.data, function(i, item) {
                    var checkeState = item.initChecked ? " checked " : "";
                    html += '<li class="option-item"><input type="checkbox"' + checkeState + ' value="' + item.id + '" title="' + item.name + '" lay-skin="primary"></li>';
                });
                $select.html(html);
                form.render('checkbox', 'selectMult');
                _that.initState(_that.checkDate);
            }
        },
        initState: function(checkDate) {
            var _that = this;
            var $elem = _that.elem;
            var $title = $elem.find('.select-mult-title');
            var $text = $title.find('.select-text');
            var unselectText = $text.attr('data-unselect') || '请选择';
            if (checkDate.length) {
                var html = '';
                $.each(checkDate, function(i, item) {
                    html += '<span class="option-selected" data-val="' + item.id + '">' + item.name + '</span>';
                });
                $text.html(html);
            } else {
                $text.text(unselectText);
            }
        },
        bindEvents: function() {
            var _that = this;
            var $elem = _that.elem;
            var $select = $elem.find('.select-mult-options');
            $elem.on('click', '.select-mult-title', function(e) {
                if ($elem.hasClass('select-mult-disabled') || !_that.data.length) {
                    return false;
                }
                $select.show();
            });
            // 监听选中
            form.on('checkbox', function(d) {
                var isCheck = d.elem.checked;
                var id = d.elem.value;
                var thisData = _that.data.filter(function(item) {
                    return id == item.id + '';
                });
                if (isCheck) {
                    _that.checkDate.indexOfId(id) < 0 && _that.checkDate.push(thisData[0]);
                    _that.checkedFn && _that.checkedFn(id, _that.checkDate);
                } else {
                    var i = _that.checkDate.indexOfId(id);
                    _that.checkDate.splice(i, 1);
                    _that.canceledFn && _that.canceledFn(id, _that.checkDate);
                }
                _that.initState(_that.checkDate);
            });

            //滑到层外区域隐藏层
            $elem.on('mouseleave', '.select-mult-options', function(e) {
                $(this).hide();
            });
            //点击层外区域隐藏层
            $("html,body").click(function(i) {
                var isParent = $(i.target).parents(".select-mult").length;
                if (!isParent) {
                    $('.select-mult .select-mult-options').hide();
                }
            });
        },
        // 参数elem(jq元素), data(数据), checkedFn(选中回调), canceledFn(取消回调)
        // 从原data数据中选中的数据,格式同data
        // 禁用方式：elem为空 data为空 或者 加类名select-mult-disabled
        // data格式
        /*var data = [{
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
        }];*/
        init: function(elem, data, checkedFn, canceledFn) {
            var _that = this;
            if (!elem.length) {
                console.log('$(elem) is not found!');
                return false;
            }
            if (!data) {
                console.log('data is not available');
                return false
            }
            _that.elem = elem;
            _that.data = data;
            _that.checkedFn = checkedFn;
            _that.canceledFn = canceledFn;
            _that.checkDate = _that.data.filter(function(item) {
                return item.initChecked;
            });
            _that.renderHtml(_that.data);
            _that.bindEvents();
            return _that.checkDate;
        }
    }
    exports('multSelect', MultSelect);
});