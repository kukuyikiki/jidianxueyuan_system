<template>
    <div class="persion-changePass">
        <div class="modify-head">
            <van-nav-bar
                class="nav-bar"
                title="修改密码"
                left-text="返回"
                left-arrow
                @click-left="goback"
            />
        </div>
        <div class="password-form">
            <span>旧密码：</span>
            <van-field type="password" placeholder="若包含字母，请注意区分大小写" v-model="oldPassword" autofocus />
            <span>新密码：</span>
            <van-field type="password" placeholder="请输入新密码，长度不少于8位" v-model="newPassword" />
            <span>确定密码：</span>
            <van-field error-message type="password" placeholder="请再次输入新密码" v-model="newSamePassword" />
        </div>
        <div class="info-sure" @click="passwordReg()" id="info-sure">
            <span>确定</span>
        </div>
    </div>
</template>

<script>
import { putUpdatePass } from "../../api/common";
import { encrypt } from '../../utils/rsaEncrypt';
export default {
    name: "changePassword",
    data() {
        return {
            oldPassword: "", //旧密码
            newPassword: "", //新密码
            newSamePassword: "", //确定密码


            disable: true,
        };
    },
    methods: {
        // ===============点击返回后到上一级=====================
        goback() {
            this.$router.go(-1);
        },
        passwordReg() {
            var vm = this;
            if (this.newPassword === this.newSamePassword &&this.newPassword.length >= 8){
                if(vm.disable){
                    vm.updatePass();
                }
            }else if(this.oldPassword ===""){
                this.$toast.clear();
                this.$toast.fail("请输入旧密码");
            }else if(this.newPassword.length<8){
                this.$toast.clear();
                this.$toast.fail("新密码长度不少于8位");
            }else{
                this.$toast.clear();
                this.$toast.fail("两次密码不相同");
            }
                
            
        },
        updatePass() {
            this.disable = false;
            this.$toast.loading({
                duration: 8000,
                message: "提交中...",
                forbidClick: true,
            });
            var vm = this;
             
            var newPassword = encrypt(this.newPassword);
            var oldPassword = encrypt(this.oldPassword);
            putUpdatePass(newPassword,oldPassword)
            .then(res => {
                vm.$toast.clear();
                vm.$toast.success("修改成功");
                setTimeout(() => {
                    // 延迟跳转，清除提示，跳转到小组列表页面
                    vm.$toast.clear();
                    vm.$router.replace({
                        path: "/personInfo",
                    });
                    //延迟时间：0.8秒
                }, 800);
            }).catch(err => {
                console.log(err);
                vm.disable = true;
                vm.$toast.clear();
                vm.$toast.fail(err);
            })
        },
    },
};
</script>

<style>
.persion-changePass {
    min-height: 100vh;
    background-color: #fafafa;
}

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
    margin-right: 2px;
    font-size: 18px;
    margin-left: -2px;
}
.modify-head .van-nav-bar__text {
    font-size: 17px;
}

.modify-flex {
    flex: auto;
}

.info-null {
    width: 61px;
    height: 100%;
}

.password-form span {
    display: block;
    margin: 10px 16px 10px 16px;
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
</style>
