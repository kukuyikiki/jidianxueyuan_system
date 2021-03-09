<template>
    <!-- 搜索姓名组件 -->
    <div :class="isPC ? 'select-name-component' : ''">
        <!-- 展示部分 -->
        <div @click="changeShow">
            <slot></slot>
        </div>
        <van-popup :class="isPC ? 'show-select' : ''" v-model="show" position="top" 
        :style="{ maxHeight: '80%' , paddingBottom: '30px' }">
            <!-- 内容部分 -->
            <div class="find-name-area">
                <div class="find-name">
                    <input autocomplete="off" v-model="inputName" id="get-name" maxlength="30"
                    v-on:keydown.enter.prevent placeholder="请输入作者姓名" />
                    <div class="confirm-btn btn" style="width: 68px;" @click="search ? findUser() : close()" >
                        <span>搜索</span>
                    </div>
                </div>
                <ul class="name-list">
                    <li v-for="(names, index) in teacherName" :key="index"
                    @click="selectName(index)" class="name-cell" :class="{'select-cell':selectIndex == index}">
                        <img src="../assets/img/searchName.svg" />
                        <span>{{names.name}}</span>
                    </li>
                </ul>
            </div>
            <!-- 操作按钮 -->
            <div v-if="optionBtn" :class="isPC ? 'pc-operation-btn' : 'operation-btn'">
                <div class="cancel-btn btn" @click='outShow()'>
                    <span>取消</span>
                </div>
                <div class="confirm-btn btn" @click="confirmName()">
                    <span>确定</span>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Global from '../store/global.vue';
    import {getUser} from '../api/common.js';
    export default {
        data() {
            return {
                show: false,
                isPC: false,
                teacherName: [],
                getName: '',
                teacherId: null,
                optionBtn: false,
                selectIndex: null,
                inputName: '',
                search: true
            };
        },
        created() {
            this.isPC = this.$Global.isPC;
        },
        methods: {
            changeShow() {
                this.show = !this.show;
                this.getName = '';
                this.teacherId = null;
            },
            selectName(index) {
                let name = this.teacherName[index].name;
                this.getName = name;
                this.selectIndex = index;
                this.teacherId = this.teacherName[index].id;
            },
            outShow() {
                this.show = false;
                this.selectIndex = null;
                this.getName = '';
                this.init();
            },
            confirmName() {
                this.show = false;
                let params = {
                    name: this.getName,
                    id: this.teacherId
                }
                this.$emit('intoInfo', params);
                this.init();
            },
            init() {
                this.teacherName = [];
                this.selectIndex = null;
                this.inputName = '';
                this.optionBtn = false;
            },
            findUser() {
                this.teacherName = [];
                let name = this.inputName;
                if(name !== '') {
                    this.search = false;
                    this.$toast.loading({
                        duration: 8000,
                        message: '搜索中'
                    })
                    getUser(name).then(res => {
                        this.$toast.clear();
                        this.search = true;
                        this.teacherName.push(
                            {name: name+'（通讯）'},
                            {name: name+'（学生）'},
                            {name: name+'（校外）'}
                        )
                        for(let i = 0; i < res.data.length; i++) {
                            this.teacherName.push({
                                name: res.data[i].nickName+" · "+res.data[i].username,
                                id: res.data[i].id
                            })
                        }
                        this.optionBtn = true;
                    }).catch(er => {
                        this.$toast.clear();
                        this.$toast.fail("请求失败");
                        this.search = true;
                    })
                }
            },
            close() {
                return false;
            }
        }
    }
</script>

<style scoped>
    .show-select,.select-name-component /deep/ .van-overlay {
        width: 768px !important;
        left: 50% !important;
        transform: translate(-50%) !important;
    }

    .select-box {
        border-bottom: 1px solid #F4F4F4;
        padding: 5px 0;
        padding-left: 10px;
    }

    .get-name {
        padding: 0;
        width: auto;
    }

    .get-name /deep/ .van-cell__value--alone {
        display: inline-block;
    }

    .get-name span {
        font-size: 17px;
        color: #1890FF;
        text-decoration: underline;
    }
    
    .name-like {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        font-size: 14px;
        background-color: #F4F4F4;
        color: #1890FF;
        border-radius: 3px;
    }

    .tagging {
        margin-top: 10px;
    }
    .tagging span {
        font-size: 14px;
        color: #B9B7B7;
    }

    .find-name-area {
        width: 90%;
        margin: 0 auto;
    }

    .find-name {
        padding-top: 35px;
        display: flex;
        justify-content: space-between;
    }

    .find-name input {
        padding-left: 10px;
        width: 73%;
        height: 38px;
        border: 1px solid #DEDCDC;
        border-radius: 3px;
    }

    .name-list li{
        display: flex;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #F4F4F4;
        font-size: 16px;
        color: #8C8C8C;
    }
    .operation-btn {
        position: sticky;
        bottom: 0;
        display: inline-block;
        left: calc((100vw - 198px)/2);
        padding-top: 15px;
    }
    .pc-operation-btn {
        position: sticky;
        bottom: 0;
        display: inline-block;
        left: calc((768px - 198px)/2);
        padding-top: 15px;
    }
    
    .btn {
        text-align: center;
        width: 88px;
        border-radius: 2px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
    }
    .confirm-btn {
        background-color: #1890FF;
        color: #fff;
    }
    
    .cancel-btn {
        border: 1px solid #DEDCDC;
        background-color: #fff;
        margin-right: 20px;
    }
    .name-cell img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
    }
    .select-name-component .name-list .name-cell span {
        width: auto !important;
    }
    
    .name-list .select-cell {
        color: #1989fa;
    }
</style>
