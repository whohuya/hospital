export default {
    phone: function (val) {
        if (!/^1\d{10}$/.test(val)) {
            return true
        }
        return false
    },
    // 验证汉字个数
    getByteLen (val) {
        var len = 0
        for (var i = 0; i < val.length; i++) {
            var a = val.charAt(i)
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2
            } else {
                len += 1
            }
        }
        return len
    },
    // 保留两位小数
    toDecimal2 (val) {
        var reg = /^[1-9](\d+)(\.\d{1,2})$/
        if (!reg.test(val)) {
            return true
        }
        return false
    },
    getUrlKey () {
        const url = window.location.href
        var theRequest = {}
        if (url.indexOf('?') !== -1) {
            var str = url.split('?')[1]
            str = str.split('&')
            for (var i = 0; i < str.length; i++) {
                theRequest[str[i].split('=')[0]] = unescape(str[i].split('=')[1])
            }
        }
        return theRequest
    },
    productWeight (rule,value,callback){
        let exep = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/
        let exep1 = /^[1-9]\d{0,6}$/  //(?:\.000)*

        // let exep1 = /^(0|\+?[1-9][0-9]{1,9})$/
        let {productUnit='',productWeight='',price=''}= value;
        let productWeights= productWeight || price
        if(!productWeights){
            callback(new Error("输入不能为空"))
        }else{
            if(productUnit=='吨' ||  productUnit=='立方米'){
                if(!exep.test(productWeights)){
                    callback(new Error("请输入6位内数字"))
                }else{
                    callback();
                }
            }else{
                if(!exep1.test(productWeights)){
                    callback(new Error("请输入6位内数字"))
                }else{
                    callback();
                }
            }
        }

    },
    productWeight1 (rule,value,callback){//指派专享
        let exep = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,3})?$/
        let exep1 = /^[1-9]\d{0,6}$/
        // let exep1 = /^(0|\+?[1-9][0-9]{1,9})$/
        let {productUnit='',productWeight='',price=''}= value;
        let productWeights= productWeight || price
        if(!productWeights){
            if(productUnit!=='车'){
                callback(new Error("输入不能为空"))
            }else{
                callback()
            }
        }else{
            if(productUnit=='吨' ||  productUnit=='立方米'){
                if(!exep.test(productWeights)){
                    callback(new Error("请输入6位内数字"))
                }else{
                    callback();
                }
            }else{
                if(!exep1.test(productWeights) && productUnit!=='车'){
                    callback(new Error("请输入6位内数字"))
                }else{
                    callback();
                }
            }
        }

    },
    validAddress (rule,value,callback){
        let val= value && JSON.parse(JSON.stringify(value))
        let result = val && !(JSON.stringify(val) == "{}") || '';
        if(!result){
            callback(new Error("地址不能为空"))
        }else{
            callback()
        }
    },
    validPrice (rule,value,callback){
        if(!value || value<=0){
            callback(new Error("年化利率为正整数"))
        }else if(value>100){
            callback(new Error("请输入100以内的百分数"))
        }else{
            callback()
        }
    },
    validnPrice (rule,value,callback){
        if(value>100){
            callback(new Error("请输入100以内的百分数"))
        }else if(value && value<=0){
            callback(new Error("年化利率为正整数"))
        }else{
            callback()
        }
    },
    validDistance (rule,value,callback){
        let exep = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{0,1})?$/;
        if(!exep.test(value)){
            callback(new Error("请输入5位以内数字，保留一位小数"))
        }else{
            callback()
        }
    },
    validSequence (rule,value,callback){
        if(value<1||value>10){
            callback(new Error("请输入1-10以内的数字"))
        }else{
            callback()
        }
    }
}
