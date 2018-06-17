/**
 * @author lulu
 * @email lulu27753@163.com
 * @create date 2018-06-16 02:39:48
 * @modify date 2018-06-16 02:39:48
 * @desc [description]
*/
// 类具有隔离作用域

class MUtil {
    // 发起后端请求
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    // 数据请求成功
                    if (res.status === 0) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (res.status === 10) {
                        // 没有登录状态，强制登录
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    // 跳转登录,传入redirect参数，方便从哪里跳转到登录页面的再跳回到那个页面去
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParam(name) {
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || ''
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        let result = queryString.match(reg)
        // result: ['param=123', '', '123', '&']
        return result ? decodeURIComponent(result[2]) : null
    }

    // 提示
    // 成功提示
    successTips(successMsg) {
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg) {
        alert(errMsg || '好像哪里不对了~');
    }

    // 存储
    // 如何让本地存储和cookie那样支持对过期时间的处理？可以在set和get里面添加对过期时间的处理
    // 本地存储
    setStorage(name, data) {
        let dataType = typeof data;
        if (dataType === 'object') {
            // json对象
            window.localStorage.setItem(name, JSON.stringify(data));
        } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) {
            // 基础类型
            window.localStorage.setItem(name, data);
        } else {
            // 其他不支持的类型
            alert('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if (data) {
            return JSON.parse(data);
        } else {
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default MUtil;
