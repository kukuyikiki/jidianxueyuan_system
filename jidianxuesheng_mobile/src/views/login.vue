<template>
    <div id="login">
        <div class="top-section">

            <div class="top">
                <div class="bgimg">
                    <img  src="../assets/img/500w.png" >
                    <div class="logo" >
                        <center>
                            <img src="../assets/img/jidian_logo.png" width="80px" >
                        </center>
                    </div>
                    <p class="title">机电学院学生端</p>
                </div>
            </div>


            <div class="file">
                <center>
                    <div >
                        <p class="userLogin"> 用户登录</p>
                    </div>
                    <van-field  class="textarea id" v-model="user.username"  type='dight' placeholder="请输入学号" >     // @blur.prevent="getCount()"
                        <template v-slot:left-icon> 
                            <i class="iconfont icon-usercenter"></i>
                        </template>
                    </van-field>
                    <van-field  class="textarea pswd" v-model="user.password"
                    :class="!isShow ? 'border' : ''"
                    left-icon="" autosize type='password' placeholder="请输入密码" >
                        <template v-slot:left-icon> 
                            <i class="iconfont icon-unlock"></i>
                        </template>
                    </van-field>
                    <van-field  v-if="isShow" class="textarea code" v-model="user.code"  type='text' placeholder="请输入验证码" >
                        <template v-slot:left-icon> 
                            <i class="iconfont icon-security"></i>
                        </template>
                        <template v-slot:right-icon> 
                            <img class="codeimg" :src="img" alt=""  @click="getCode()">
                        </template>
                    </van-field>
                </center>
            </div>

            <div>
                <van-button type="info" class="logbtn" @click="loginStyle">登录</van-button>
            </div>

            <div>
                <p class="forgetpd">
                    <span @click="showMessage()">忘记密码</span>
                </p>
            </div>
        </div>

        <div class="footer">
            <a href="http://www.marchsoft.cn/">技术支持：三月软件</a>
        </div>
    </div>   
</template>



<script>
import '../assets/icons/iconfont'
import Cookies from 'js-cookie'
import { getCode,loginNoCode,login, failed, ifCode,request } from '../../src/api/login'
import   '../../src/utils/rsaEncrypt'
import { encrypt } from '@/utils/rsaEncrypt'

    export default {
        name: 'login',
        data() { 
            return {
                isShow: false,
                img:'',
                user: {
                    code: null,
                    uuid: null,
                    username: null,
                    password: null,
                }
            }
        },
        created () {
            // this.getCode();
            let path=this.$route.query.toPath;
            if(path){
                this.toPath=path
            }
        },
        methods: {
            //修改密码
            showMessage() {
            this.$dialog.alert({
             message: "请联系辅导员进行修改",
            })
            },

            //需要验证码登录
            login(){
                this.$toast.loading({ message: '登录中...', forbidClick: true, loadingType: 'spinner' });
                let user = {
                    password: encrypt(this.user.password),
                    username:this.user.username,
                    uuid:this.user.uuid,
                    code:this.user.code
                }
                login(user).then((res) => {
                    Cookies.set('EL-ADMIN-TOEKN', res.data.token);  
                    this.$router.replace('/');
                    this.$toast.clear();
                }).catch(err => {
                    this.$toast.fail({message: "信息填写有误"});
                    this.failedLogin();
                    this.$toast.clear();
                });
            },

            //不需要验证码登录
            loginWithoutCode(){
                this.$toast.loading({ message: '登录中...', forbidClick: true, loadingType: 'spinner' });
                let user = {
                    password: encrypt(this.user.password),
                    username:this.user.username,
                }
                loginNoCode(user).then((res) => {
                    Cookies.set('EL-ADMIN-TOEKN', res.data.token);
                    this.$router.replace('/');
                    this.$toast.clear();
                }).catch(err => {
                    this.$toast.clear();
                    // console.log(err);
                    this.$toast.fail("信息填写有误,请重新填写");
                    this.failedLogin();
                });
            },
          
            //获取图片验证码
            getCode () {
                getCode().then((res) => {
                    this.img = res.data.img
                    this.user.uuid=res.data.uuid;
                }).catch(err => {
                    this.$toast.fail({message: "图片获取失败，请重试~"});
                });
            },
            //登录失败 存储用户登录失败次数
            failedLogin() {
                let user = {
                    username: this.user.username
                }
                failed(this.user.username).then((res) => {
                    console.log(res)
                })
            },
                //判断当前用户是否需要验证码
            ifNeedCode() {
                let user = {
                    username: this.user.username
                }
                ifCode(this.user.username).then((res)=> {
                    if(res.data === true) {
                        this.getCode();
                        this.isShow = true;
                    }
                    return res.data;
                })
            },

            // 判断是否需要验证码登录
            loginStyle() {
                this.ifNeedCode();
                if(this.isShow){
                    this.login();
                }
                else{
                    this.loginWithoutCode();
                }
            }
        }
    }
        
</script>

<style scoped>
    .top-section {
        z-index: 10;
        background-color: #fff;
    }

    .bgimg {
        width: 100%;
    }

    .bgimg > img {
        width: 100%;
        height: 240px;
    }

    .top {
        height: 240px;
        display: flex;
    }
  
   .logo {
        margin: 0 auto;
        margin-top: -183px;
        margin-bottom:20px ;
    }
    .title {
        color: white;
        text-align: center;
        font-size: 28px;
    }
    .userLogin {
        text-align: center;
        margin:20px ;
        width: 80px;
        height: 28px;
        font-size: 20px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        line-height: 28px;
        margin-bottom: 7px;
    }

    .footer {
        display: flex;
        justify-content: center;
    }

    .footer  a {
        z-index: -10;
        color: #5C5B5B; 
        font-size: 12px;
        position: fixed;
        bottom: 10px;
        height: 17px;
        font-weight: 400;
    }
    .logbtn {
        width: 80%;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 4px;
    }
    
    
    .forgetpd {
        text-align: right;
        margin-right: 10%;
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #343434;
        line-height: 22px;
        margin-top:7px ;
    }

    /* 
    border-top-left-radius ：设置左上角边框的圆角样式。
    border-top-right-radius ：设置右上角边框的圆角样式。
    border-bottom-left-radius ：设置左下角边框的圆角样式。
    border-bottom-right-radius ：设置右下角边框的圆角样式。
     */
    .textarea {
        /* border-radius: 3px; */
        border-left: 1px solid #cccccc;  
        border-right: 1px solid #cccccc;  
        width: 80%;
        color: #CCCCCC;
        height:45px
    }

    .code {
        border-bottom:1px solid #cccccc;
        border-bottom-left-radius:3px;
        border-bottom-right-radius:3px;
    }

    .codeimg {
        width: 74px;
        height: 32px;
    }
    .pswd {
        border-radius:0 ;
        border-bottom:1px solid #cccccc;
    }
    .border {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
    }
    .id {
        border-top-left-radius:3px;
        border-top-right-radius :3px;
        border-top:  1px solid #cccccc;
        border-bottom:1px solid #cccccc;
    }
    .iconfont {
        font-size: 20px;
        margin-left: -8px;
    }
    .van-field__control {
        margin-bottom:14px;
    }

    .code /deep/  .van-field__control {
        margin-bottom: 10px;
    }
    
</style>
