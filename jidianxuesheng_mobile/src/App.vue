<template>
  <div>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            // flag: false
        }
    },
    created() {
        let path = window.location.href.split("#");
        let nowPath = path.length > 1 ? path[1] : '/';
        let width = document.body.offsetWidth;
        if (width > 600) {
            // if (nowPath == '/') {
            // } else {
                this.$Global.isPC = true;
                let body = document.body.style;
                body.maxWidth = 768 + "px";
                body.minHeight = 100 + "vh";
                body.boxShadow = "0 0 4px 0 #CECECE";
                body.marginLeft = "auto";
                body.marginRight = "auto";
                this.flag = true;
            // }
        }
        // else {
        //     this.flag = true;
        // }
    },
};
</script>

<style>
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
legend,
button,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
  font-size: 17px;
}
</style>
