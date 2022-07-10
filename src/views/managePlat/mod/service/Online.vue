<template>
  <div class="page-container">
    <div class="container">
      <div
        class="users-lists"
        v-loading="replyLoading"
      >
        <ul class="users">
          <li
            :class="`user ${target==item.username? 'active' : ''}`"
            @click="changeTarget(item)"
            v-for="item in sessionList"
          >
            <el-badge
              class="item"
              :value="item.unread_msg_count===0?'':item.unread_msg_count"
            >{{item.nickName}}
            </el-badge>
          </li>
        </ul>

      </div>
      <div class="chat-details">
        <div class="chat-title">{{targetName}}</div>
        <div
          class="content"
          id='scrolldIV'
        >
          <div
            v-if="item.content.target_id==target &&username==item.content.from_id || item.content.target_id==username &&target==item.content.from_id"
            v-for="(item,index) in messageList "
            :key="index"
            class="message"
          >
            <div
              v-if="username==item.content.from_id"
              class="right-content"
            >
              <p
                class="chat-name"
                v-cloak
              >{{item.content&&item.content.from_name? item.content.from_name:""}}&nbsp;&nbsp;{{dataFormate(item.content.create_time)}}</p>
              <p
                class="chat-text-right"
                v-cloak
              >{{item.content&&item.content.msg_body&&item.content.msg_body.text?item.content.msg_body.text:''}}</p>
            </div>
            <div
              v-else
              class="left-content"
            >
              <p class="chat-name">{{item.content&&item.content.from_name? item.content.from_name:""}}&nbsp;&nbsp;{{dataFormate(item.content.create_time)}}</p>
              <p
                class="chat-text-left"
                v-cloak
              >{{item.content&&item.content.msg_body.text&& item.content.msg_body?item.content.msg_body.text:''}}</p>
            </div>

          </div>
        </div>
        <div class="btm">
          <el-input
            type="textarea"
            v-model="sendMsg"
            :autosize="{ minRows: 2, maxRows: 2}"
            @keyup.enter.native="handleSendMsg"
          ></el-input>&nbsp;&nbsp;&nbsp;
          <el-button @click="handleSendMsg">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import md5 from "js-md5";
import moment from 'moment';
export default {
  name: "list",
  components: {

  },
  data () {
    return {
      target: '',
      targetName: '',
      JIM: null,
      username: '',
      nick: '',
      messageList: [],
      sendMsg: '',
      appKey: "1adde12e01aac6acdde7a394",
      master: '6eba9416a0b4d06158219713',
      sessionList: [],
      filterMessageList: [],
      historyData: [],
      replyLoading: true,
      mesListLoading: true,
      target_key: ''
    }
  },

  methods: {
    unreadMsgCount (item) {

      const count =
        this.JIM.getUnreadMsgCnt({
          'username': item.username
        });

      console.log(this.JIM.getUnreadMsgCnt({
        'username': item.username
      }), '------------------------------')
      return count
    },

    //会话列表
    getConversation () {
      const that = this
      this.JIM.getConversation().onSuccess(function (data) {
        function compare (property) {
          return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;
          }
        }
        // that.friendList = data.conversations.sort(compare('unread_msg_count'));
        that.sessionList = data.conversations
        that.replyLoading = false
        //data.code 返回码
        //data.message 描述
        //data.conversations[] 会话列表，属性如下示例
        //data.conversations[0].extras 附加字段
        //data.conversations[0].unread_msg_count 消息未读数
        //data.conversations[0].name  会话名称
        //data.conversations[0].appkey  appkey(单聊)
        //data.conversations[0].username  用户名(单聊)
        //data.conversations[0].nickname  用户昵称(单聊)
        //data.conversations[0].avatar  头像 media_id 
        //data.conversations[0].mtime 会话最后的消息时间戳
        //data.conversations[0].gid 群 id(群聊)
        //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
      }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
      });
    },

    getHistoryMes () {
      const that = this;
      setTimeout(() => {
        this.JIM.onSyncConversation(function (data) {

          console.log('object', '离线监听')
          // that.historyData = data.map(ele => ele.);
          that.historyData = [...data]
          // data[]
          // data[].msg_type 会话类型
          // data[].from_appey 单聊有效
          // data[].from_username 单聊有效
          // data[].from_gid 群聊有效
          // data[].unread_msg_count 消息未读数
          // 消息已读回执状态，针对自己发的消息
          // data[].receipt_msgs[]
          // data[].receipt_msgs[].msg_id
          // data[].receipt_msgs[].unread_count
          // data[].receipt_msgs[].mtime
          // 消息列表
          // data[].msgs[]
          // data[].msgs[].msg_id
          // data[].msgs[].content
          // data[].msgs[].msg_type
          // data[].msgs[].ctime_ms
          // data[].msgs[].need_receipt
          // data[].msgs[].custom_notification.enabled
          // data[].msgs[].custom_notification.title
          // data[].msgs[].custom_notification.alert
          // data[].msgs[].custom_notification.at_prefix
        });
      })

      // this.JIM.getConversation().onSuccess(function (data) {
      //   //data.code 返回码
      //   //data.message 描述
      //   console.log('00000000000000000000000000000', data)
      //   //data.conversations[] 会话列表，属性如下示例
      //   //data.conversations[0].extras 附加字段
      //   //data.conversations[0].unread_msg_count 消息未读数
      //   //data.conversations[0].name  会话名称
      //   //data.conversations[0].appkey  appkey(单聊)
      //   //data.conversations[0].username  用户名(单聊)
      //   //data.conversations[0].nickname  用户昵称(单聊)
      //   //data.conversations[0].avatar  头像 media_id 
      //   //data.conversations[0].mtime 会话最后的消息时间戳
      //   //data.conversations[0].gid 群 id(群聊)
      //   //data.conversations[0].type  会话类型(3 代表单聊会话类型，4 代表群聊会话类型)
      // }).onFail(function (data) {
      //   //data.code 返回码
      //   //data.message 描述
      // })
    },

    filterContent () {
      let filterMes;
      filterMes = this.messageList.filter(item =>
        item.content.target_id == this.target

      )
      this.filterMessageList = filterMes
    },
    dataFormate (date) {
      return date && date.toString().length == 10 ? moment(date * 1000).format('YYYY-MM-DD HH:mm:ss') : date && date.toString().length !== 10 ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
      // console.log(date.toString().length, date.toString().slice(0, 10), typeof date)
    },
    refresh () { this.JIM.loginOut(); setTimeout(() => this.init()) },
    changeTarget (item) {
      const that = this
      this.target = item?.username
      this.targetName = item?.nickName
      this.target_key = item?.key
      const history = this.historyData && this.historyData.length > 0 && this.historyData.filter(ele => ele.from_username == this.target)

      if (history && history.length > 0) {
        that.messageList = [...history[0].msgs]

      }
      that.JIM.resetUnreadCount({
        'username': this.target
      });
      that.getConversation()
      setTimeout(() => {
        var div = document.getElementById('scrolldIV');
        div.scrollTop = div.scrollHeight
      }, 100)

      // this.refresh()

    },

    handleSendMsg () {
      let that = this
      if (this.target) {
        this.JIM.sendSingleMsg({
          'target_username': this.target,
          'appkey': that.appKey,
          'content': that.sendMsg,
          'no_offline': false,
          'no_notification': false,
          //'custom_notification':{'enabled':true,'title':'title','alert':'alert','at_prefix':'atprefix'}
          need_receipt: true
        }).onSuccess(function (data, msg) {
          that.messageList.push(msg)
          let currentIndex
          that.historyData.forEach((ele, index) => {
            if (ele.from_username === that.target) {
              currentIndex = index;
            }
          })
          that.historyData[currentIndex].msgs.push(msg)
          that.sendMsg = ''
          setTimeout(() => {
            var div = document.getElementById('scrolldIV');
            div.scrollTop = div.scrollHeight
          }, 100)
          that.JIM.updateConversation({

            'username': that.target,

          });
          // var div = document.getElementById('scrolldIV');
          // div.scrollTop = div.scrollHeight
          // appendToDashboard('success: ' +JSON.stringify(data));
        }).onFail(function (data) {
          console.log('error:' + JSON.stringify(data));
          // appendToDashboard('error: ' +JSON.stringify(data));
        });
      }
    },
    lising () {
      let that = this

      this.JIM.onMsgReceive(function (data) {

        that.messageList.push(data.messages[0])
        let currentIndex
        that.historyData.forEach((ele, index) => {
          if (ele.from_username === that.target) {
            currentIndex = index;
          }
        })
        that.historyData[currentIndex].msgs.push(data.messages[0])
        // this.filterContent()
        // data.messages[]
        // data.messages[].ctime_ms
        // data.messages[].msg_type 会话类型
        // data.messages[].msg_id
        // data.messages[].from_appey 单聊有效
        // data.messages[].from_username 单聊有效
        // data.messages[].from_gid 群聊有效
        // data.messages[].need_receipt
        // data.messages[].content
        // data.messages[].custom_notification.enabled
        // data.messages[].custom_notification.title
        // data.messages[].custom_notification.alert
        // data.messages[].custom_notification.at_prefix
      });


    },
    init () {

      const that = this
      let date = new Date().getTime();
      let appKey = this.appKey
      let sing = md5(
        `appkey=${this.appKey}&timestamp=${date}&random_str=404&key=${this.master}`
      );
      this.JIM.init({
        appkey: appKey,
        random_str: "404",
        signature: sing,
        timestamp: date,
        flag: 1,
      })
        .onSuccess(function () {
          that.login()
          console.log('初始化完成')
        }, () => {

        })
        .onFail(function (data) {

          // alert('重新加载页面')
          console.log("error:" + JSON.stringify(data));
          // appendToDashboard('error: ' +JSON.stringify(data));
        });
    },
    login () {
      const that = this
      this.JIM.login({
        'username': 'admin',
        'password': 'admin',
      }).onSuccess(function (data) {
        if (data.message == 'success') {
          console.log('登录完成')
          that.getConversation()
          that.getUserInfo()
          that.getHistoryMes()
          that.lising();

        }
        localStorage.setItem('username', data.username)
        that.username = data.username
        //data.code 返回码
        //data.message 描述
        //data.online_list[] 在线设备列表
        //data.online_list[].platform  Android,ios,pc,web
        //data.online_list[].mtime 最近一次登录时间
        //data.online_list[].isOnline 是否在线 true or false
        //data.online_list[].isLogin 是否登录 true or false
        //data.online_list[].flag 该设备是否被当前登录设备踢出 true or false
      }).onFail(function (data) {
        //同上
        console.log('error:' + JSON.stringify(data))
      });
    },
    getAllInfo () {

    },

    getUserInfo () {
      const that = this
      this.JIM.getUserInfo({
        'username': that.username,
      }).onSuccess(function (data) {
        that.username = data.user_info.username
        that.nick = data.user_info.nickname
        //data.code 返回码
        //data.message 描述
        //data.user_info.username
        //data.user_info.appkey
        //data.user_info.nickname
        //data.user_info.avatar 头像
        //data.user_info.birthday 生日，默认空
        //data.user_info.gender 性别 0 - 未知， 1 - 男 ，2 - 女
        //data.user_info.signature 用户签名
        //data.user_info.region 用户所属地区
        //data.user_info.address 用户地址
        //data.user_info.mtime 用户信息最后修改时间
        //data.extras 自定义json字段
      }).onFail(function (data) {
        //data.code 返回码
        //data.message 描述
      });
    },
  },
  created () {

  },
  mounted () {
    this.JIM = Vue.prototype.JIM;
    const user_telephone = JSON.parse(localStorage.getItem('user_telephone')) ?? ''
    // if (user_telephone === '13027600183') {
    setTimeout(() => {
      this.init();
    })
    // } else {
    //   this.$message({
    //     message: '当前账号没有权限',
    //     type: 'warning'
    //   });
    // }

  },
  beforeDestroy () {
    this.JIM.loginOut()
  },

};
</script>

<style scoped lang="scss">
.container {
  padding: 40px;
  display: flex;
  // justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  .users-lists {
    margin-right: 1px;
    box-shadow: 0px 0px 2px #a4a4ab;
    width: 10%;
    height: 700px;
    margin-top: 5px;
    border: 0.3px solid #ccc;
    .title {
      text-align: center;
      padding: 10px 5px;
    }
    .users {
      width: 100%;
    }
    .user {
      padding: 10px 5px;
      border-bottom: 0.3px dashed #ccc;
      text-align: center;
    }

    .active {
      padding: 10px 5px;
      background-color: #a4a4ab;
      color: aliceblue;
      text-align: center;
      border: 1px solid #ccc;
    }
  }
  .chat-details {
    width: 80%;
    height: 600px;
    padding: 5px 0;

    .chat-title {
      text-align: center;
      padding: 10px 5px;
      min-height: 36px;
      box-shadow: 0px 0px 2px #a4a4ab;
    }
    .content {
      height: 605px;
      min-height: 500px;
      overflow-y: auto;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e7e7e7;
      box-shadow: 0px 0px 2px #a4a4ab;
    }
    .content:last-child {
      margin-bottom: 30px;
    }
    .message {
      padding: 5px 0;
      margin: 10px 0;
      height: 60px;
    }
    .right-content {
      margin: 10px 10px 10px 0;
      float: right;
      width: 55%;
      text-align: right;
    }
    .left-content {
      margin-left: 10px;
      margin: 10px 0 10px 10px;
    }
    .content-msg {
      margin: 3px;
      padding: 2px;
    }
    .chat-text-left {
      font-size: 16px;
      margin-top: 2px;
      height: 32px;
      line-height: 32px;
      width: 45%;
      border-radius: 3px;
      background-color: #668bcb;
      display: inline;
      padding: 5px 10px;
      white-space: wrap;
    }
    .chat-text-right {
      background-color: #fff;
      font-size: 16px;
      margin-top: 2px;
      height: 32px;
      line-height: 27px;
      float: right;
      border-radius: 3px;
      padding: 5px 10px;
      white-space: wrap;
    }
    .chat-name {
      font-size: 16px;
      color: #999;
    }
    .right {
      float: right;
    }
  }

  .btm {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }
  ::v-deep .el-badge__content.is-fixed {
    right: -5px !important;
    top: 5px !important;
  }
}
</style>


