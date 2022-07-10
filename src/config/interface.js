
  /**
   *  接口通用调用方式（返回result）
   * @param {*} service 所属服务
   * @param {*} method 方法名
   */
  export const getResult = async function (scope, service, method, params) {
    const result = await scope.API[service][method](params)
    if (result.code == '200') {
      if(!(result.data.constructor === Array)){
        return result.data.list
      }else{
        return result.data
      }
    } else {
      return {
        code:result.code,
        msg:result.message.message
      }
    }
  }


