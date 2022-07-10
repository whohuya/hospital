<template>
    <div id="app" v-wechat-title="$route.meta.title">
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {},
    methods: {},
    mounted () {
        window.location.href="/login.html#"
    },
}
</script>

