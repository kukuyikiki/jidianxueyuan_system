<template>
    <div class="whole-page">
        <div class="modify-head">
            <van-nav-bar
                class="nav-bar"
                title="修改个人信息"
                left-text="返回"
                left-arrow
                @click-left="goback"
            />
        </div>
        <div class="my-cell">
            <van-cell-group class="info-img-top">
                <van-cell center class="info-cell" title="头像">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <!-- <van-uploader
                            :deletable="isShowDeletable"
                            :preview-full-image="previewFullImage"
                            :after-read="afterRead"
                            class="round-img"
                            v-model="fileList"
                            multiple
                            @click-preview="changePhoto"
                            ref="uploaderTrigger"
                            :max-count="1"
                        />-->
                        <!-- <span @click="handleClick" v-if="isconfirm" class="message">2141535454545</span> -->
                        <!--                        -->
                        <van-uploader
                            :deletable="isShowDeletable"
                            accept="image/*"
                            class="round-img"
                            :before-read="isPicture"
                            :preview-full-image="previewFullImage"
                            v-model="fileList"
                            :max-count="2"
                            @click-preview="handleClick"
                            :after-read="afterRead"
                            ref="uploadImg"
                        />
                    </template>
                </van-cell>
            </van-cell-group>
            <!-- 输入任意文本
            <van-field
                v-model="nickName"
                @blur="nickNameReg()"
                right-icon=" my-icon my-icon-bianji"
                input-align="right"
                label="姓名"
            />
            <van-field
                v-model="gender"
                @blur="genderReg()"
                right-icon=" my-icon my-icon-bianji"
                :error="errorGender"
                input-align="right"
                label="性别"
            />
            <van-field
                v-model="nation"
                @blur="nationReg()"
                right-icon=" my-icon my-icon-bianji"
                input-align="right"
                label="民族"
            />
            <van-field
                v-model="phone"
                @blur="phoneReg()"
                right-icon=" my-icon my-icon-bianji"
                :error="errorPhone"
                input-align="right"
                label="手机号"
            />
            <van-field
                v-model="email"
                @blur="emailReg()"
                right-icon=" my-icon my-icon-bianji"
                :error="errorEmail"
                input-align="right"
                label="邮箱"
            /> -->
            <div class="info-sure" @click="showMessage()" id="info-sure">
                <span>确定</span>
            </div>
        </div>
    </div>
</template>

<script>
import "../../assets/css/icon.css";
import "vant/lib/index.css";
import axios from "axios";
import { getToken } from '@/utils/auth'
import "../../utils/validate";
import { validatePhone } from "../../utils/validate";
import { getInfoEcho, putUpdateUser } from "../../api/common"; //获取个人信息&&修改个人信息
export default {
    name: "modifyInformation",
    data() {
        return {
            // maxCount: 2,
            isconfirm: true,
            //
            fileList: [],

            analogMsg: {},
            isShowDeletable: false, //是否展示上传图片的删除按钮
            previewFullImage: false, //关闭图片全屏预览
            showPhone: false,
            inputPhone: "",

            nickName: "", //页面展示姓名
            gender: "", //性别
            nation: "", //民族
            phone: "", //手机号
            email: "", //邮箱

            upFile: [], //上传的图片
            isNoUpFile:true,//标识是否上传图片

            errorPhone: false, //判定手机错误提示
            errorGender: false, //判定性别错误提示
            errorEmail: false, //判定邮箱错误提示
        };
    },
    methods: {
        // ===============点击返回后到上一级=====================
        goback() {
            this.$router.go(-1);
        },
        //获取个人信息
        async getPersionMsg() {
            // this.$toast.loading({
            //     duration: 0,
            //     message: "加载中...",
            //     forbidClick: true,
            // });
            var vm = this;
            await getInfoEcho().then((res) => {
                console.log(res);
                vm.analogMsg = res.data
                const that = res.data;
                const defaultImage = res.data.avatarName.split("/picture/")[1];
                if(defaultImage == "" || defaultImage == "null"){
                    vm.fileList = [{ url: require("../../assets/img/defaultImg.png") }];
                }else{
                    vm.fileList = [{ url: that.avatarName }];
                }
                vm.$toast.clear();
            }).catch;
        },
        //===============修改个人信息===============
        async UpdateUser() {
            this.$toast.loading({
                duration: 8000,
                message: "修改中...",
                forbidClick: true,
            });
            if(this.isNoUpFile){
                const noUp = [];
                let formData = new FormData();
                formData.append("file",noUp);
                this.upFile = formData;
            }
            this.isNoUpFile = true;

            var vm = this;
            axios({
                method: "put",
                url: process.env.VUE_APP_API_HOST+'api/sys-user/update-user',
                data: this.upFile,
                headers: {
                    "Authorization": getToken(),
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                vm.$toast.success("修改信息成功");
                console.log(res);
                setTimeout(() => {
                vm.$toast.clear();
                vm.$router.go(-1);
            }, 800);
            })
            .catch((er) => {
                vm.$toast.clear();
                vm.$toast.fail("修改失败,请确保信息填写完整");
                console.log(er);
            });
        },
        isPicture(file){
            console.log(file)
            var fileType = file.type.split("/")[0];
            if(fileType == "image"){
                return true;
            }else{
                this.$toast.fail({
                    message: "请选择图片",
                    forbidClick: true,
                });
                return false;
            }
        },
        //================上传图片======================
        afterRead(file) {
            console.log(file);
            this.fileList.splice(0, 1);
            console.log(this.fileList);
            this.isNoUpFile = false;

            let formData = new FormData();
            formData.append("file", file.file);
            this.upFile = formData;
            console.log(this.upFile);
        },
        //==============判断手机号是否正确====================
        phoneReg() {
            const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (
                this.phone === "" ||
                this.phone === undefined ||
                this.phone == null
            ) {
                this.phone = this.analogMsg.phone;
                this.errorPhone = false;
            } else if (!reg.test(this.phone) && this.phone !== "") {
                this.errorPhone = true;
            } else {
                this.errorPhone = false;
            }
        },
        //================判断性别是否正确==================
        genderReg() {
            if (
                this.gender === "" ||
                this.gender === undefined ||
                this.gender == null
            ) {
                this.gender = this.analogMsg.gender;
                this.errorGender = false;
            } else if (this.gender === "男" || this.gender === "女") {
                this.errorGender = false;
            } else {
                this.errorGender = true;
            }
        },
        //==================判断邮箱是否正确=====================
        emailReg() {
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (
                this.email === "" ||
                this.email === undefined ||
                this.email == null
            ) {
                this.email = this.analogMsg.email;
                this.errorEmail = false;
            } else if (!reg.test(this.email) && this.email !== "") {
                this.errorEmail = true;
            } else {
                this.errorEmail = false;
            }
        },
        //==================姓名处理==========================
        nickNameReg() {
            if (
                this.nickName === "" ||
                this.nickName === undefined ||
                this.nickName == null
            ) {
                this.nickName = this.analogMsg.nickName;
            }
        },
        //=================民族处理===========================
        nationReg() {
            if (
                this.nation === "" ||
                this.nation === undefined ||
                this.nation == null
            ) {
                this.nation = this.analogMsg.nation;
            }
        },
        //===================点击确定的处理事件================
        showMessage() {
            console.log(this.errorPhone)
            if(this.errorPhone==false&&this.errorGender==false&&this.errorEmail==false) {
                this.UpdateUser();
            }
            // alert("点击了确定");
        },
        handleClick() {
            this.$nextTick(() => {
                this.$refs.uploadImg.chooseFile();
            });
        },
    },
    created() {
        // =================渲染到页面上的数据======================
        this.getPersionMsg();
    },
};
</script>

<style scoped>
.whole-page {
    width: 100%;
    min-height: 100vh;
    /* text-align: center; */
    background-color: rgba(250, 250, 250, 1);
}
/* .modify-head {
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-size: 17px;
} */
/* 	.van-dialog{
		width: 270px;
	} */

.modify-head .van-nav-bar {
    background-color: #fafafa;
    height: 44px;
}
.modify-head .van-hairline--bottom::after {
    border: 0;
}
.modify-head .van-nav-bar__arrow {
    font-size: 17px;

    /* line-height: 2px; */
    height: 19px;
    /* width: 14px; */
}
.modify-head .van-nav-bar__text {
    font-size: 17px;
}

.go-back {
    /* position: absolute; */
    left: 10px;
    color: #1890ff;
    padding-left: 10px;
}
.my-cell .van-cell {
    border-bottom: 1px solid #f4f4f4;
    min-height: 45px;
    padding: 9px 16px;
}
.my-cell /deep/ .van-cell::after {
    border: 0;
}
[class*="van-hairline"]::after {
    border: 0;
}
.modify-flex {
    flex: auto;
}
.back-icon-style {
    font-size: 15px;
}
.my-cell .van-cell /deep/ .van-icon-edit {
    font-size: 22px;
}
.search-icon {
    font-size: 16px;
    line-height: inherit;
}
.round-img {
    height: 60px;
    width: 60px;
}
.input-dialag /deep/ .van-field__control {
    border-bottom: blue solid 2px;
}
.round-img /deep/ .van-uploader__upload {
    width: 60px;
    height: 60px;
    display: flex;
    margin: auto;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.round-img /deep/ .van-uploader__preview-image {
    width: 60px;
    height: 60px;
    display: flex;
    margin: auto;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.info-null {
    width: 59px;
    height: 100%;
}
.my-cell /deep/ .van-cell span {
    font-size: 17px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
}
.info-sure {
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    /*实现水平居中*/
    justify-content: center;
    /* max-width: 400px; */
    /* min-width: 209px; */
    width: 209px;
    margin: auto;
    margin-top: 29px;
    text-align: center;
    height: 45px;
    background: #1890ff;
    border-radius: 2px;
}
.info-sure > span {
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #ffffff;
}
.modify-head /deep/ .van-nav-bar__text {
    font-size: 17px;
}
.modify-head /deep/ .van-nav-bar__arrow {
    font-size: 17px;
    height: 19px;
}
</style>
