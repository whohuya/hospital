<template>
    <div style="height: 100%;width: 100%;">
        <pubHeader class="pub_header"></pubHeader>
        <pubMenu @checkMenu="checkMenuState"></pubMenu>
        <div class="pubContent" :class="{ml60:isCollapse,screenHeight:!outLink}">
<!--            <div class='default-padding' v-show='!$route.meta.noTitle'>{{parentTitle}} <span v-if="parentTitle&&title">/</span> {{title}}</div>-->
            <div :class="{'scroll-set':scrollget,'scroll-d':!scrollget}"> <slot v-wechat-title="title"></slot></div>  <!--插槽-->
        </div>
    </div>
</template>
<script>
    import pubHeader from '@components/pubHeader';
    import pubMenu from '@components/pubMenu';
    import { mapGetters } from 'vuex'
    export default {
        components: {
            pubHeader,
            pubMenu
        },
        data () {
            return {
                isCollapse: false,
            }
        },
        computed:{
            ...mapGetters([
                'scrollget',
            ]),
            title() {
                return this.$route && this.$route.meta && this.$route.meta.title;
            },
            parentTitle(){
                return this.$route && this.$route.meta && this.$route.meta.parent;
            },
            outLink(){
                return this.$route && this.$route.meta && this.$route.meta.outLink;
            }
        },

        methods: {
            checkMenuState (state) {
                this.isCollapse = state
            }
        },
        mounted(){
        }
    }
</script>
<style lang="scss">
    .scroll-set{
        height: calc(100% - 78px);
        overflow-y: scroll;
    }
    .scroll-d{
        height: calc(100% - 78px);
        overflow: hidden;
        display: flex;
        align-items: center;
    }
    .pubContent {
        overflow: hidden;
        width:calc(100% - 234px);
        margin-left: 222px;
        box-sizing: border-box;
        overflow-y: auto;
        background: #f6f7fb;
        position: relative;
        transition: all 0.3s ease-in;
    }
    .screenHeight{
        height: 100%;
    }
    .ml60 {
        margin-left: 60px;
        width:calc(100% - 72px);
    }
    .default-padding{
        padding: 0 30px;
        line-height: 50px;
        height: 50px;
        font-size: 14px;
        background-color:#fff;
        font-weight:400;
        color: rgba(0,0,0,0.45);
    }
  .pub_header{
    margin-bottom: 12px;
  }
</style>
