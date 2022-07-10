<template>
  <div id="aboutUs" v-loading="loading">
    <div class="cont_title">公司简介</div>
    <div class="cont_body">
      <div class="img">
        <img src="../../assets/images/tr.png" alt="" />
      </div>
      <div class="cont_article">
        <p>
          天瑞集团信息科技有限公司（以下简称“天瑞信科”）是由天瑞集团股份有限公司投资成立的一家专业从事信息技术服务、软件开发销售、网络技术咨询服务、企业信息化、智能化解决方案服务及工业互联网平台研发运营有关的高新技术企业和软件企业。
        </p>
        <p>
          公司成立于2015年2月，注册资本5000万。现有员工165人，其中研发人员110人，占总人数66.7%，拥有一批长期专业从事软件开发、软件定制的专业人才，具有雄厚的技术开发实力。目前已拥有北京、郑州、汝州三个研发中心。
        </p>
        <p>
          公司先后通过了ISO9001质量管理体系认证，国家软件企业和高新技术企业认定，2016年被汝州市科学技术局评定为汝州市“数字水泥工程技术研究中心”，2017年被河南省科学技术厅评定为“河南省水泥工厂物联网工厂技术研究中心”，2018年入选“河南省智能制造解决方案供应商名单”、“河南省首批行业工业互联网平台培育名单”，2019年入选“河南省企业上云服务提供商名单”，2020年入选“河南省中小企业数字化服务商”和“河南省人工智能创新型企业”。
        </p>
        <p>
          公司拥有自主研发的“天瑞信科制造执行系统集团版V1.0”、“天瑞信科无人值守系统V1.0”等56款软件,均已通过河南省软件评测中心评测，并取得国家计算机软件著作权登记证书。同时还拥有无人值守出厂刷卡机柜等4个发明专利和5个实用新型专利。
        </p>
        <p>
          天瑞信科拥有先进的技术研发能力、开拓性的专业技术队伍、领先的软件设计及开发理念和无限的用户服务、高效的本地化支持。拥有丰富的大型软件系统开发、系统集成、运维服务经验。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "aboutUs",
  data() {
    return {
      loading: false,
      equipments: "web",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped>
@import "../../assets/css/details.css";
</style>
<style lang="scss">
body {
  margin: 0;
}
#aboutUs {
  width: 100%;
  height: 100%;
  overflow: hidden;
  * {
    margin: 0;
  }
  .cont_body {
    overflow: scroll;
    height: 90%;
  }
  .img {
    img {
      width: 100%;
    }
  }
  .cont_title {
    font-size: 25px;
    text-align: center;
    color: #000;
    // line-height: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
    // width: 1180px;
    margin: 0 auto;
  }

  .cont_article {
    font-size: 16px;
    text-align: justify;
    color: #333;
    line-height: 28px;
    // max-width: 1180px;
    padding-top: 20px;
    margin: auto;
    padding: 10px 20px;
  }
  ::-webkit-scrollbar {
    width: 0px;
  }
}
</style>
