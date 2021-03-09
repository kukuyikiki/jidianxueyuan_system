<template>
    <div class="persion-index">
        <div class="top-introduce">
            <div class="top-introduce-text">
                <div class="index-null"></div>
                <span class="index-person-msg">个人信息</span>
                <img @click="editSkip()" class="top-edit" src="../../assets/img/edit.svg" />
            </div>
            <!-- ../../assets/lb.jpg -->
            <div id="testDiv">
                <img id="head-img" @click="viewerjs()" class="round-icon" :src="avatarName" />
            </div>
            <span class="top-introduce-name">{{nickName}}</span>
        </div>
        <van-cell-group class="info-area">
            <van-field v-for="(item, index) in staticDump" :key="index" v-model="analogMsgs[index]" readonly :label="item.head"
                label-class="head-test-style" :left-icon="item.icon" input-align="right" />
            <div class="side-line"></div>
            <van-cell class="changePassword" icon=" my-icon my-icon-mima" title="修改密码" is-link to="/personInfo/changePassword" />
            <van-cell class="changePassword" icon=" iconfont icon-tuichu" title="退出登录" is-link @click="outLine()" />
        </van-cell-group>
        <van-tabbar class="tabbar" :class="isPC === true ? 'tabbar-inside' : ''" v-model="active">
            <van-tabbar-item to="/" replace>
                <span>我的科研</span>
                <template #icon="props">
                    <img src="../../assets/img/mySearchSelectIcon.svg" v-show="props.active" />
                    <img src="../../assets/img/mySearchIcon.svg" v-show="!props.active" />
                </template>
            </van-tabbar-item>
            <van-tabbar-item class="tabbar-sec">
                <span>个人信息</span>
                <template #icon="props">
                    <img src="../../assets/img/personSelectIcon.svg" v-show="props.active" />
                    <img src="../../assets/img/personIcon.svg" v-show="!props.active" />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import Global from "../../store/global.vue";
    import "../../assets/css/icon.css";
    import Viewer from "viewerjs";
    import Cookies from 'js-cookie'
    import {
        getInfoEcho
    } from "../../api/common";
    import "viewerjs/dist/viewer.css";
    // import '../../assets/css/text.css';
    export default {
        name: "index",
        data() {
            return {
                avatarName: [],
                nickName: "",
                value1: "23213312",
                value2: "123",
                staticDump: [{
                        head: "工号",
                        icon: " my-icon my-icon-noperson",
                    },
                    {
                        head: "姓别",
                        icon: " my-icon my-icon-gender",
                    },
                    {
                        head: "身份证",
                        icon: " my-icon my-icon-credentials",
                    },
                    // {
                    //     head: "民族",
                    //     icon: " my-icon my-icon-minzu",
                    // },
                    {
                        head: "职称",
                        icon: " my-icon my-icon-zhicheng",
                    },
                    {
                        head: "从事专业",
                        icon: " my-icon my-icon-zhuanye",
                    },
                    {
                        head: "手机",
                        icon: " my-icon my-icon-zu",
                    },
                    {
                        head: "邮箱",
                        icon: " my-icon my-icon-youxiang",
                    },
                    // {
                    //     head: "学院",
                    //     icon: " my-icon my-icon-xueyuan",
                    // },
                    {
                        head: "单位",
                        icon: " my-icon my-icon-bumen",
                    },
                ],
                analogMsg: {},
                analogMsgs: [],
                active: 1,
            };
        },
        methods: {
            //============编辑执行的方法==================
            editSkip() {
                this.$router.push({
                    path: "/personInfo/modifyInformation",
                });
            },
            //==========查看图片==========
            viewerjs() {
                this.$nextTick(function() {
                    const ViewerDom = document.getElementById("head-img");
                    const viewer = new Viewer(ViewerDom, {
                        button: false,
                        toolbar: false,
                        navbar: false,
                        title: false,
                        tooltip: false,
                        hide: function() {
                            //在图片消失的时候销毁viewer
                            viewer.destroy();
                        },
                    });
                    viewer.show();
                });
            },
            showDefault() {
                if (event.type == 'error') {
                    event.target.src = require("../../assets/img/defaultImg.png");
                }
            },
            outLine() {
                let _this = this;
                function beforeClose(action, done) {
                    if (action === 'confirm') {
                        setTimeout(()=> {
                            Cookies.set('EL-ADMIN-TOEKN', '');
                            done();
                            _this.$router.replace('/login');
                        }, 1000);
                    } else {
                        done();
                    }
                }
                this.$dialog.confirm({
                    message: '是否确认退出？',
                    beforeClose,
                });
            }

        },
        created() {
            this.isPC = this.$Global.isPC;
        },
        activated() {
            //=========获取个人信息=============
            // this.$toast.loading({
            //     duration: 0,
            //     // message: "加载中...",
            //     forbidClick: true,
            // });
            this.active = 1;
            var vm = this;
            getInfoEcho().then((res) => {
                console.log(res);
                const defaultImage = res.data.avatarName.split("/picture/")[1];
                if (defaultImage == "" || defaultImage == "null") {
                    vm.avatarName = require("../../assets/img/defaultImg.png");
                } else {
                    let div = document.getElementById("testDiv");
                    let img = document.getElementById("head-img");
                    img.remove();
                    console.log('remove');
                    div.appendChild(img);
                    vm.avatarName = res.data.avatarName;
                }
                vm.nickName = res.data.nickName;
                const that = res.data;
                vm.analogMsgs = [
                    that.username,
                    that.gender,
                    that.cardId,
                    // that.nation,
                    that.positionalTitle,
                    that.professional,
                    that.phone,
                    that.email,
                    that.deptName,
                    // that.jobName,
                ];
                vm.$toast.clear();
                console.log("11111111")
                vm.$forceUpdate(vm.avatarName);
            }).catch(err => {
                vm.$toast.clear();
                vm.$toast.fail("获取个人信息失败");
            });
        }
    };
</script>

<style scoped>
    .top-introduce-text {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        /* line-height: 44px; */
    }

    .top-edit {
        /* position: absolute; */
        height: 22px;
        width: 22px;
        margin-right: 15px;
        /* line-height: 22px; */
    }

    .index-person-msg {
        flex: auto;
        font-size: 17px;
    }

    .index-null {
        height: 22px;
        width: 22px;
        margin-left: 15px;
    }

    .round-icon {
        width: 60px;
        height: 60px;
        display: flex;
        margin: auto;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .top-introduce {
        text-align: center;
        margin-bottom: 14px;
    }

    .top-introduce-name {
        display: block;
        height: 30px;
        font-size: 18px;
        padding-top: 5px;
    }

    .van-cell {
        background-color: #fafafa;
        max-height: 45px;
        font-size: 16px;
        border-bottom: #f4f4f4 solid 1px;
    }

    .test-style span {
        color: #000000;
    }

    .side-line {
        height: 18px;
        background-color: #fff;
    }

    .info-area {
        padding-bottom: 50px;
        background-color: #FAFAFA;
    }

    .persion-index {
        height: 100vh;
        background-color: #fafafa;
    }

    .persion-index /deep/ .van-cell::after {
        border-bottom: 0;
    }

    .persion-index /deep/ .van-cell-group::after {
        border: 0px;
    }

    .persion-index /deep/ .head-test-style {
        color: #000000;
    }

    .persion-index /deep/ .iconsize {
        font-size: 22px;
    }

    .persion-index /deep/ .van-field__left-icon {
        margin-right: 12px;
    }

    .tabbar /deep/ .van-tabbar-item {
        background-color: rgb(250, 250, 250);
    }

    .tabbar-inside {
        width: 768px;
        left: 50%;
        transform: translate(-50%);
    }

    .tabbar-sec /deep/ .van-tabbar-item__icon img {
        height: 25px;
    }
</style>
