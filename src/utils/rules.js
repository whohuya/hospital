import validator from './validate'

/*平台用户查询*/
let platSearch = {
    userNick: [
        {type: 'number', message: '年龄必须为数字值', trigger: 'blur'}
    ],
    organize: [
        {required: true, message: '产品名称不能为空', trigger: 'blur'},
    ],
}

let groupAddRules = { //集团新增
    contactNumber: [
        {required: true, message: '联系电话不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '联系电话内不能包含空格', trigger: ['blur', 'change']},
        {max:20, message: '联系电话最长为20字符', trigger: 'change'}
    ],
    name: [
        {required: true, message: '集团名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '集团名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ],
    address: [
        {required: true, message: '地址不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '地址内不能包含空格', trigger: ['blur', 'change']},
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
    contactPerson: [
        {required: true, message: '联系人不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '联系人内不能包含空格', trigger: ['blur', 'change']},
        {max: 10, message: '长度最长不超过10个字符', trigger: ['blur', 'change']}
    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: ['blur', 'change']},
    ],
    type: [
        {required: true, message: '集团性质不能为空', trigger: ['blur', 'change']},
    ],

}
let organizeAddRules = { //组织新增
    contactNumber: [
        {required: true, message: '联系电话不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '联系电话内不能包含空格', trigger: ['blur', 'change']},
        {max:20, message: '联系电话最长为20字符', trigger: 'change'},
    ],
    name: [
        {required: true, message: '组织名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '组织名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ],
    address: [
        {required: true, message: '地址不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '地址内不能包含空格', trigger: ['blur', 'change']},
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
    contactPerson: [
        {required: true, message: '联系人不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '联系人内不能包含空格', trigger: ['blur', 'change']},
        {max: 10, message: '长度最长不超过10个字符', trigger: ['blur', 'change']}
    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: ['blur', 'change']},
    ],
    groupId: [
        {required: true, message: '所属集团不能为空', trigger: ['blur', 'change']},
    ],
}

let factoryAddRules = { //厂区新增
    contactNumber: [
        {required: true, message: '联系电话不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '联系电话内不能包含空格', trigger: ['blur', 'change']},
        {max:20, message: '联系电话最长为20字符', trigger: 'change'}

    ],
    name: [
        {required: true, message: '厂区名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '厂区名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ],
    address: [
        {required: true, message: '地址不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '地址内不能包含空格', trigger: ['blur', 'change']},
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
    contactPerson: [
        {required: true, message: '联系人不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '联系人内不能包含空格', trigger: ['blur', 'change']},
        {max: 10, message: '长度最长不超过10个字符', trigger: ['blur', 'change']}
    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: ['blur', 'change']},
    ],
    orgId: [
        {required: true, message: '所属组织不能为空', trigger: ['blur', 'change']},
    ],
}

let departmentAddRules = { //部门新增
    title: [
        {required: true, message: '消息标题不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '消息标题内不能包含空格', trigger: ['blur', 'change']},
        {max: 30, message: '长度最长不超过30个字符', trigger: ['blur', 'change']}
    ],
    content: [
        {required: true, message: '消息内容不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '消息内容内不能包含空格', trigger: ['blur', 'change']},
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
    type: [
        {required: true, message: '消息类型不能为空', trigger: ['blur', 'change']},
    ],
    sendScope: [
        {required: true, message: '请选择消息接收人', trigger: ['blur', 'change']},
    ],
    sendMethod: [
        {required: true, message: '请选择发送时间', trigger: ['blur', 'change']},
    ],
    note: [
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
}
let projectAddRules = { //项目新增
    code: [
        {required: true, message: '项目编号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '项目编号内不能包含空格', trigger: ['blur', 'change']},
    ],
    serviceId: [
        {required: true, message: 'serviceId不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: 'serviceId内不能包含空格', trigger: ['blur', 'change']},
        {pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能输入字母（开头）、数字、下划线', trigger: 'blur'},
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur']}

    ],
    name: [
        {required: true, message: '项目名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '项目名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    adminUser: [
        {required: true, message: '超管姓名不能为空', trigger: 'blur'},
    ],
    description: [
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
}
let productRules = {//产品管理
    productName: [
        {required: true, message: '产品名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '产品名称内不能包含空格', trigger: ['blur', 'change']},
        {min: 1, max: 12, message: '长度在12位以内', trigger: 'blur'}
    ],

    percents: [
        {required: true, message: '年利率不能为空', trigger: 'blur'},
        {validator: validator.validPrice, trigger: 'blur'},
    ],
    newpercents: [
        {validator: validator.validnPrice, trigger: 'blur'},
    ],
    notice: [
        {required: true, message: '产品说明不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '产品说明内不能包含空格', trigger: ['blur', 'change']},
    ],
}

let userRules = { //用户新增
    employeeNum: [
        {required: true, message: '工号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '工号内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    username: [
        {required: true, message: '工号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '工号内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    nickname: [
        {required: true, message: '真实姓名不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '真实姓名内不能包含空格', trigger: ['blur', 'change']},
        {max: 10, message: '长度最长不超过10个字符', trigger: ['blur', 'change']}
    ],
    telephone: [
        {required: true, message: '手机号不能为空', trigger: 'blur'},
        {min:11,max: 11, message: '手机号应为11个字符', trigger: ['blur', 'change']},
        {pattern: /^[0-9]*$/, message: '手机号需为数字', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[^\s]*$/, message: '密码内不能包含空格', trigger: ['blur', 'change']},
    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: ['blur', 'change']},
    ],
    userOrgList:[
        {type: 'array',required: true, message: '组织不能为空', trigger: ['blur', 'change']},
    ],
    description: [
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
}

let userEditRules = { //用户新增
    employeeNum: [
        {required: true, message: '工号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '工号内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    username: [
        {required: true, message: '工号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '工号内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    nickname: [
        {required: true, message: '真实姓名不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '真实姓名内不能包含空格', trigger: ['blur', 'change']},
        {max: 10, message: '长度最长不超过10个字符', trigger: ['blur', 'change']}
    ],
    telephone: [
        {required: true, message: '手机号不能为空', trigger: 'blur'},
        {min:11,max: 11, message: '手机号应为11个字符', trigger: ['blur', 'change']},
        {pattern: /^[0-9]*$/, message: '手机号需为数字', trigger: 'blur'}
    ],
    password: [
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[^\s]*$/, message: '密码内不能包含空格', trigger: ['blur', 'change']},

    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: ['blur', 'change']},
    ],
    userOrgList:[
        {type: 'array',required: true, message: '组织不能为空', trigger: ['blur', 'change']},
    ],
    description: [
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
}
let roleRules={
    appId: [
        {required: true, message: '项目名称不能为空', trigger: ['blur', 'change']},
        {pattern: /^[^\s]*$/, message: '项目名称内不能包含空格', trigger: ['blur', 'change']},
    ],
    roleCode: [
        {required: true, message: '角色编码不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '角色编码内不能包含空格', trigger: ['blur', 'change']},
    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: ['blur', 'change']},
    ],
    name: [
        {required: true, message: '角色名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '角色名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    description: [
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
}
let menuRules={
    appId: [
        {required: true, message: '项目名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '项目名称内不能包含空格', trigger: ['blur', 'change']},
    ],
    code: [
        {max: 100, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能输入字母（开头）、数字、下划线', trigger: 'blur'}
    ],
    path: [
        {required: true, message: '菜单地址不能为空', trigger: 'blur'},
        {max: 100, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, message: '只能输入字母（开头）、数字、下划线', trigger: 'blur'}
    ],
    enabled: [
        {required: true, message: '状态不能为空', trigger: 'blur'},
    ],
    name: [
        {required: true, message: '菜单名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '菜单名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    sequence: [
        {required: true, message: '不能为空', trigger: 'blur'},
        {pattern: /^[0-9]*$/, message: '需为数字值', trigger: 'blur'},
        {validator: validator.validSequence, trigger: 'blur'},
    ],
    description: [
        {max: 100, message: '长度最长不超过100个字符', trigger: ['blur', 'change']}
    ],
}
let menuFunRules={
    name: [
        {required: true, message: '功能名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '功能名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    code: [
        {required: true, message: '功能编码不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '功能编码内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
    ],
}
let authRules={
    appId: [
        {required: true, message: '项目名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '项目名称内不能包含空格', trigger: ['blur', 'change']},
    ],
    roleId: [
        {required: true, message: '角色不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '角色内不能包含空格', trigger: ['blur', 'change']},
    ],
}
let appAddRules = { //APP新增
    name: [
        {required: true, message: 'APP名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: 'APP名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ],
    version: [
        {required: true, message: '版本号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '版本号内不能包含空格', trigger: ['blur', 'change']},
        {type:"number" ,min: 0, max: 2147483647, message: '版本号只能输入数字,最大长度为9位', trigger: ['blur', 'change']}
    ],
    code: [
        {required: true, message: '编码Code不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '编码Code内不能包含空格', trigger: ['blur', 'change']},
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ],
    resource: [
        {required: true, message: '请选择发送时间', trigger: ['blur', 'change']},
    ],
    // urlName: [
    //     {required: true, message: '请上传APK', trigger:['blur', 'change']},
    // ],
    fileList: [{
        message: '请上传',
        trigger: ['change'],
        required: true
    }],
    description:[
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ]
}
let appletsAddRules = { //小程序新增
    name: [
        {required: true, message: '小程序名称不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '小程序名称内不能包含空格', trigger: ['blur', 'change']},
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ],
    version: [
        {required: true, message: '版本号不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: '版本号内不能包含空格', trigger: ['blur', 'change']},
        {type:"number" ,min: 0, max: 2147483647, message: '版本号只能输入数字,最大长度为9位', trigger: ['blur', 'change']}
    ],
    appletId: [
        {required: true, message: 'APPID不能为空', trigger: 'blur'},
        {pattern: /^[^\s]*$/, message: 'APPID内不能包含空格', trigger: ['blur', 'change']},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']}
    ],
    resource: [
        {required: true, message: '请选择发送时间', trigger: 'blur'},
    ],
    description:[
        {max: 50, message: '长度最长不超过50个字符', trigger: ['blur', 'change']}
    ]

}

let editPasswordRules={
    oldPsw: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[^\s]*$/, message: '密码内不能包含空格', trigger: ['blur', 'change']},
    ],
    newPsw: [
        {required: true, message: '新密码不能为空', trigger: 'blur'},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[^\s]*$/, message: '密码内不能包含空格', trigger: ['blur', 'change']},
    ],
    rePsw: [
        {required: true, message: '密码不能为空', trigger: 'blur'},
        {max: 20, message: '长度最长不超过20个字符', trigger: ['blur', 'change']},
        {pattern: /^[^\s]*$/, message: '密码内不能包含空格', trigger: ['blur', 'change']},
    ],
}
export {
    platSearch,
    productRules,
    userRules,
    groupAddRules,
    organizeAddRules,
    factoryAddRules,
    departmentAddRules,
    projectAddRules,
    roleRules,
    menuRules,
    authRules,
    menuFunRules,
    userEditRules,
    appAddRules,
    appletsAddRules,
    editPasswordRules
}
