<template>
    <div
        :class="
            isPC === true ? 'select-name-component record-con' : 'record-con'
        "
    >
        <van-form
            @submit="onSubmit"
            validate-trigger="onSubmit"
            AUTOCOMPLETE="OFF"
        >
            <!-- //导航栏 -->
            <van-nav-bar
                class="nav-bar"
                title="美音体获奖成果"
                left-text="返回"
                left-arrow
                @click-left="onClickLeft"
            />
            <div class="warn" v-if="objectState == 4">
                {{ "驳回原因：" + errMsg }}
            </div>
            <!-- 折叠面板 -->
            <van-collapse class="my-collapse" v-model="activeName" accordion>
                <!-- 第一获奖人 -->
                <van-collapse-item name="21">
                    <template #title>
                        <van-field
                            class="inputTemplate"
                            readonly
                            name="firstAwardeeName"
                            label="第一获奖人"
                            :value="group[0].value"
                            v-model="group[0].value"
                            placeholder="选择第一获奖人"
                        >
                            <template #input>
                                <van-tag
                                    class="fir-autor"
                                    v-if="showSelect"
                                    :closeable="isStart"
                                    size="medium"
                                    color="#F4F4F4"
                                    text-color="#1890FF"
                                    type="primary"
                                    @close="close"
                                >
                                    {{ group[0].value }}
                                </van-tag>
                                <searchName @intoInfo="getInfo" v-if="isStart">
                                    <span class="add-autor" v-if="addAutorShow"
                                        >点击添加获奖人</span
                                    >
                                </searchName>
                            </template>
                        </van-field>
                    </template>
                    <!-- 如果下弹有内容div中给个类名newCollapseItemPadding  如果没有不用写div-->
                    <!-- <div class="newCollapseItemPadding">
                        合肥市大阿斯蒂芬黑胡椒阿斯蒂芬黄金卡史蒂芬霍金
                    </div> -->
                </van-collapse-item>
                <!-- 全部获奖人 -->
                <van-collapse-item name="22">
                    <template #title>
                        <van-field
                            class="inputTemplate"
                            readonly
                            name="allAwardeeName"
                            label="全部获奖人"
                            placeholder="选择全部获奖人"
                        >
                            <template #input>
                                <div
                                    v-for="(input, index) in group[1].value"
                                    :key="index"
                                >
                                    <van-tag
                                        class="all-autor"
                                        :closeable="isStart"
                                        size="medium"
                                        color="#F4F4F4"
                                        text-color="#1890FF"
                                        type="primary"
                                        @close="allClose(index)"
                                    >
                                        {{ input.name }}
                                    </van-tag>
                                </div>
                                <searchName
                                    @intoInfo="getInfoAll"
                                    v-if="isStart"
                                >
                                    <span class="add-autor"
                                        >点击添加获奖人</span
                                    >
                                </searchName>
                            </template>
                        </van-field>
                    </template>
                    <!-- <div class="msg-tip newCollapseItemPadding">
                        {{ group[1].message }}
                    </div> -->
                </van-collapse-item>
                <!-- 成果名称 -->
                <van-collapse-item name="23">
                    <template #title>
                        <van-field
                            class="inputTemplate"
                            :readonly="!isStart"
                            rows="1"
                            autosize
                            type="textarea"
                            :value="group[2].value"
                            v-model="group[2].value"
                            maxlength="50"
                            name="objectName"
                            label="成果名称"
                            placeholder="若没有请填写: 无"
                            :rules="[{ required: true }]"
                        />
                    </template>
                </van-collapse-item>
                <!-- 奖励名称 -->
                <van-collapse-item name="24">
                    <template #title>
                        <van-field
                            class="inputTemplate"
                            :readonly="!isStart"
                            rows="1"
                            autosize
                            type="textarea"
                            :value="group[3].value"
                            v-model="group[3].value"
                            name="bonusName"
                            maxlength="50"
                            label="奖励名称"
                            placeholder="请输入奖励名称"
                            :rules="[{ required: true }]"
                        />
                    </template>
                </van-collapse-item>
                <!-- 运动会级别 -->
                <van-collapse-item name="25">
                    <template #title>
                        <div @click="firShowName = true">
                            <van-field
                                readonly
                                clickable
                                name="sportsLevel"
                                label="运动会级别"
                                :value="firValuePicker"
                                placeholder="点击选择运动会级别(单选)"
                                :rules="[{ required: true }]"
                            />
                        </div>
                    </template>
                </van-collapse-item>
                <!-- 获奖类别 -->
                <van-collapse-item name="26">
                    <template #title>
                        <div @click="secShowName = true">
                            <van-field
                                readonly
                                clickable
                                name="awardCategory"
                                label="获奖类别"
                                :value="secValuePicker"
                                placeholder="点击选择获奖类别(单选)"
                                :rules="[{ required: true }]"
                            />
                        </div>
                    </template>
                </van-collapse-item>
                <!-- 获奖等级 -->
                <van-collapse-item name="27">
                    <template #title>
                        <van-field
                            :readonly="!isStart"
                            class="inputTemplate"
                            :value="group[4].value"
                            v-model="group[4].value"
                            rows="1"
                            autosize
                            type="textarea"
                            name="awardLevel"
                            maxlength="50"
                            label="获奖等级"
                            placeholder="请输入获奖等级"
                            :rules="[{ required: true }]"
                        />
                    </template>
                </van-collapse-item>
                <!-- 授奖单位 -->
                <van-collapse-item name="28">
                    <template #title>
                        <van-field
                            :readonly="!isStart"
                            :value="group[5].value"
                            v-model="group[5].value"
                            name="awardUnit"
                            maxlength="50"
                            label="授奖单位"
                            rows="1"
                            autosize
                            type="textarea"
                            placeholder="请输入授奖单位"
                            :rules="[{ required: true }]"
                        />
                    </template>
                    <div class="msg-tip newCollapseItemPadding">
                        {{ group[5].message }}
                    </div>
                </van-collapse-item>
                <!-- 授奖日期日历 -->
                <van-collapse-item name="29">
                    <template #title>
                        <van-field
                            name="awardDate"
                            readonly
                            label="授奖时间"
                            :value="date"
                            placeholder="点击选择授奖日期"
                            @click="show = true"
                            :rules="[{ required: true }]"
                        />
                    </template>
                </van-collapse-item>
                <!-- 证书编号 -->
                <van-collapse-item name="30">
                    <template #title>
                        <van-field
                            class="inputTemplate"
                            :readonly="!isStart"
                            :value="group[6].value"
                            v-model="group[6].value"
                            name="certificateNum"
                            maxlength="255"
                            label="证书编号"
                            rows="1"
                            autosize
                            type="textarea"
                            placeholder="请输入写整数编号"
                            :rules="[{ required: true }]"
                        />
                    </template>
                    <div class="msg-tip newCollapseItemPadding">
                        {{ group[6].message }}
                    </div>
                </van-collapse-item>
                <!-- 备注 -->
                <van-collapse-item name="31">
                    <template #title>
                        <van-field
                            name="remarks"
                            maxlength="512"
                            :readonly="!isStart"
                            v-model="message"
                            rows="3"
                            autosize
                            type="textarea"
                            placeholder="输入备注信息"
                        >
                            <template #label>
                                <span class="spanRemark">
                                    备注
                                    <span class="remark">(选填)</span>
                                </span>
                            </template>
                        </van-field>
                    </template>
                </van-collapse-item>
            </van-collapse>

            <div class="button">
                <!-- 保存按钮 -->
                <li style="flex-grow: 1">
                    <van-button
                        class="bot-button btnFirst"
                        round
                        plain
                        native-type="button"
                        :disabled="!isStart || isQuest"
                        @click="saveClick"
                        >仅保存</van-button
                    >
                </li>
                <!-- 提交按钮 -->
                <li style="flex-grow: 1">
                    <van-button
                        class="bot-button btnSecond"
                        round
                        antive-type="button"
                        type="submit"
                        :disabled="!isStart || isQuest"
                        size="normal"
                        color="RGB(24,144,255)"
                        >提交</van-button
                    >
                    <!-- @click="submitClick" -->
                </li>
            </div>
        </van-form>
        <div v-if="isStart">
            <!-- 选择器1 -->
            <van-action-sheet
                close-on-click-action
                v-model="firShowName"
                :actions="firItem.firItemCloumn"
                @select="firOnSelect"
            />

            <!-- 选择器2 -->
            <van-action-sheet
                close-on-click-action
                v-model="secShowName"
                :actions="secItem.secItemCloumn"
                @select="SecOnSelect"
            />

            <!-- 日历1 -->
            <van-calendar
                v-model="show"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="onConfirm"
                color="rgb(24, 144, 255)"
            />
        </div>
    </div>
</template>
<script>
import Global from "../../../store/global.vue";
import searchName from "../../../components/searchName.vue";
import { postArt } from "../../../api/common.js";
import { getArt } from "../../../api/common.js";
import { getArtOption } from "../../../api/common.js";
import { putArt } from "../../../api/common.js";
export default {
    name: "index",
    components: {
        searchName,
    },
    data() {
        return {
            //点击按钮请求数据中
            isQuest: false,
            //包含
            pass: false,
            //状态
            objectState: null,
            //根据级别是否开启
            isStart: true,
            //第一,全部作者id
            firstId: "",
            allWriteId: [],
            // ----------------------
            //作者第二次不可用
            addAutorShow: true,
            // 弹出框
            activeName: "1",
            username: "",
            password: "",
            // 两个选择器的值
            firValuePicker: "",
            firValuePickerId: null,
            secValuePicker: "",
            secValuePickerId: null,
            // 开启选择器
            showPicker: false,
            firFlag: false,
            addAutorShow: true,
            //日历开启，选择日历范围
            show: false,
            minDate: new Date(1980, 0, 1),
            maxDate: new Date(2050, 0, 31),

            // 开启选择组件
            showSelect: false,

            //传出去的时间
            full: "",
            // 留言的值
            message: "",
            // 日期
            date: "",
            //错误信息
            errMsg: "",

            // 选择器1
            firItem: {
                firItemName: "运动会级别",
                firItemMessage: "“运动会”级别请填写“全运会、锦标赛、省运会”等",
                firItemCloumn: [],
            },
            // 选择器2
            secItem: {
                secItemName: "获奖类别",
                secItemMessage:
                    "获奖类别请选填“美术作品类、音乐表演类、音乐作品类、运动竞赛类”",
                secItemCloumn: [],
            },
            //两个选择器
            firShowName: false,
            secShowName: false,
            group: [
                {
                    name: "第一获奖",
                    value: "",
                    message: "",
                },
                {
                    name: "全部获奖",
                    value: [],
                    message:
                        "全部获奖人一栏是为编制科研年报所用，须填写完整全部获奖人，姓名间请以“、”隔开。获奖人不是我校的，请在姓名后加*号注明。",
                },
                {
                    name: "成果名称",
                    value: "",
                    message: "",
                },
                {
                    lable: "奖励名称",
                    value: "",
                    message: "",
                },

                {
                    lable: "获奖等级",
                    value: "",
                    message: "",
                },
                {
                    lable: "授奖单位",
                    value: "",
                    message:
                        "授奖单位一栏请填写：展会或比赛组织机构和奖励评选机构，请依序注明全部参加组织和评选机构。",
                },

                {
                    lable: "证书编号",
                    value: "",
                    message: "请正确输入证书编号",
                },
            ],
        };
    },
    created() {
        this.isPC = this.$Global.isPC;
        this.selectOption();
    },

    methods: {
        // 回显
        async projectDetails(id) {
            this.$toast.loading({
                duration: 8000,
                message: "加载中",
                forbidClick: true,
            });
            await getArt(id)
                .then((res) => {
                    console.log(res.data);
                    console.log(this.group[1].value);
                    this.group[0].value = res.data.firstAwardeeName;
                    this.group[1].value = JSON.parse(res.data.allAwardeeName);
                    this.showSelect = true;
                    this.addAutorShow = false;
                    this.group[2].value = res.data.objectName;
                    this.group[3].value = res.data.bonusName;
                    //  运动会级别
                    let firIteme = this.firItem.firItemCloumn.filter(function (
                        item
                    ) {
                        return item.key == res.data.sportsLevel;
                    });

                    // 获奖类别
                    let secIteme = this.secItem.secItemCloumn.filter(function (
                        item
                    ) {
                        return item.key == res.data.awardCategory;
                    });

                    this.firValuePickerId = res.data.sportsLevel;
                    this.firValuePicker = firIteme[0].name;
                    console.log(firIteme.name, "zaizheliiiiiiiiiasfsda");

                    this.secValuePickerId = res.data.awardCategory;
                    this.secValuePicker = secIteme[0].name;

                    this.group[4].value = res.data.awardLevel;
                    console.log(this.group[4].value, "165123845");
                    this.group[5].value = res.data.awardUnit;
                    console.log(this.group[4].value, "789789");
                    this.group[6].value = res.data.certificateNum;
                    this.full = res.data.awardDate;
                    this.date =
                        res.data.awardDate.substring(0, 4) +
                        "年" +
                        res.data.awardDate.substring(5, 7) +
                        "月" +
                        res.data.awardDate.substring(8, 10) +
                        "日";

                    this.firstId = res.data.firstAwardeeId;
                    //isStart
                    //测试2级别
                    // res.data.objectState = 2;
                    if (
                        res.data.objectState == 1 ||
                        res.data.objectState == 2 ||
                        res.data.objectState == 3
                    ) {
                        this.isStart = false;
                    } else if (res.data.objectState == 4) {
                        //状态更改
                        this.objectState = res.data.objectState;
                    }

                    // console.log(this.secValuePicker);
                    //留言的值
                    this.message = res.data.remarks;
                    //错误信息
                    if (res.data.rejectionReason) {
                        this.errMsg = res.data.rejectionReason;
                    }
                    console.log(res.data, "enddddddddd");
                })
                .catch((res) => {
                    this.$toast.clear();
                    this.$toast.fail({
                        message: "查询失败\n请重试",
                        forbidClick: true,
                    });
                });
            this.$toast.clear();
        },

        //处理所有作者数据
        dealAllWriter() {
            this.allWriteId = [];
            for (var i = 0; i < this.group[1].value.length; i++) {
                if (this.group[1].value[i].id != 0) {
                    this.allWriteId.push(this.group[1].value[i].id);
                }
            }
        },
        // 组件
        close() {
            this.firstId = null;
            this.addAutorShow = true;
            this.showSelect = false;
        },
        allClose(index) {
            // this.group[1].value[index].show = false;
            this.group[1].value.splice(index, 1);
            console.log(this.group[1].value);
        },
        getInfo(info) {
            if (info.id != undefined) {
                this.group[0].value = info["name"].split("·")[0];
                if (this.group[0].value != "") {
                    this.showSelect = true;
                    this.addAutorShow = false;
                    this.firstId = info.id;
                    console.log(info);
                } else {
                    this.showSelect = false;
                }
            } else {
                this.$toast.fail("第一获奖人选择校内获奖人");
            }
        },
        getInfoAll(info) {
            if (info.id != undefined) {
                if (info["name"].split("·")[0] != "") {
                    this.dealAllWriter();
                    if (this.allWriteId.indexOf(info.id) !== -1) {
                        this.$toast.fail("该作者已添加");
                    } else {
                        this.group[1].value.push({
                            name: info["name"].split("·")[0],
                            id: info.id,
                        });
                    }
                }
            } else {
                if (info["name"].split("·")[0] != "") {
                    this.group[1].value.push({
                        name: info["name"].split("·")[0],
                        id: 0,
                    });
                }
            }
        },

        // 保存按钮
        async saveClick() {
            this.isQuest = true;
            //调用所有作者id
            this.dealAllWriter();
            //点击保存按钮
            this.$toast.loading({
                duration: 8000,
                message: "保存中...",
                forbidClick: true,
            });
            console.log(this.firValuePickerId, "rrrrrrrrrrrrr");
            let values = {
                id: this.$route.query.id,
                allAwardeeId: this.allWriteId,
                allAwardeeName: JSON.stringify(this.group[1].value),
                firstAwardeeId: this.firstId,
                firstAwardeeName: this.group[0].value,
                objectName: this.group[2].value,
                bonusName: this.group[3].value,
                sportsLevel: this.firValuePickerId,
                awardCategory: this.secValuePickerId,
                awardLevel: this.group[4].value,
                awardUnit: this.group[5].value,
                awardDate: this.full + " 00:00:00",
                certificateNum: this.group[6].value,
                remarks: this.message,
                objectState: 0,
            };
            console.log(values, "saveeeee");

            var vm = this;
            this.isAll();
            if (values.firstAwardeeName && this.firstId) {
                if (this.$route.query.id) {
                    await putArt(values)
                        .then(function (res) {
                            vm.$toast.clear();
                            vm.$toast.success("保存成功");
                            setTimeout(() => {
                                // 延迟跳转，清除提示，跳转到列表页面
                                vm.$toast.clear();
                                vm.$router.go(-1);
                                // vm.$router.replace({
                                //     path: "/showArtView",
                                // });
                                // //延迟时间：0.8秒
                            }, 800);
                        })
                        .catch((er) => {
                            this.isQuest = false;
                            this.$toast.clear();
                            this.$toast.fail({
                                message: "保存失败\n请填写完整字段",
                                forbidClick: true,
                            });
                        });
                } else {
                    await postArt(values)
                        .then(function (res) {
                            vm.$toast.clear();
                            vm.$toast.success("保存成功");
                            setTimeout(() => {
                                // 延迟跳转，清除提示，跳转到列表页面
                                vm.$toast.clear();
                                vm.$router.replace({
                                    path: "/showArtView",
                                });
                                //延迟时间：0.8秒
                            }, 800);
                        })
                        .catch((er) => {
                            this.isQuest = false;
                            this.$toast.clear();
                            this.$toast.fail({
                                message: "保存失败\n请填写完整字段",
                                forbidClick: true,
                            });
                        });
                }
            } else {
                this.isQuest = false;
                this.$toast.clear();
                this.$toast.fail({
                    message: "请选择第一获奖人",
                    forbidClick: true,
                });
            }
        },
        // 日历填入格式
        formatDate(date) {
            let fullYear = `${date.getFullYear()}`;
            let fullMonth = `${date.getMonth() + 1}`;
            let fullDay = `${date.getDate()}`;
            if (fullMonth.length < 2) {
                fullMonth = "0" + fullMonth;
            }
            if (fullDay.length < 2) {
                fullDay = "0" + fullDay;
            }
            this.full = fullYear + "-" + fullMonth + "-" + fullDay;
            // console.log(this.full);
            return `${date.getFullYear()}年${
                date.getMonth() + 1
            }月${date.getDate()}日`;
        },
        // 日历点击确认触发事件
        onConfirm(date) {
            this.show = false;
            this.date = this.formatDate(date);
        },
        //第一个选择器
        firOnSelect(e) {
            this.activeName = "0";
            this.show = false;
            this.firValuePicker = e.name;
            this.firValuePickerId = e.key;
        },
        //第二个选择器
        SecOnSelect(e) {
            this.activeName = "0";
            this.show = false;
            this.secValuePicker = e.name;
            this.secValuePickerId = e.key;
            // console.log(e.key);
        },
        //包含
        isAll() {
            this.group[1].value.forEach((item, index) => {
                if (item.id == this.firstId) {
                    this.pass = true;
                }
            });
        },
        //提交
        async onSubmit(values) {
            this.isQuest = true;
            //调用所有作者id
            this.dealAllWriter();
            //点击提交按钮
            this.$toast.loading({
                duration: 8000,
                message: "提交中...",
                forbidClick: true,
            });
            //日期拼接，后端改了 2020-01-01
            values.awardDate = this.full + " 00:00:00";
            console.log(values.awardDate, "提交时间");
            // 运动会级别
            values.sportsLevel = this.firValuePickerId;
            // 获奖类别
            values.awardCategory = this.secValuePickerId;

            // this.$set(values, "objectState", this.objectState);
            //作者和id

            values.allAwardeeName = JSON.stringify(this.group[1].value);
            values["firstAwardeeId"] = this.firstId;
            values["allAwardeeId"] = this.allWriteId;
            values["id"] = parseInt(this.$route.query.id);

            console.log(values, "111111");
            //---------------
            var vm = this;
            this.isAll();
            if (values.firstAwardeeName && this.firstId) {
                //项目状态
                // let objectState;
                values["objectState"] = this.objectState = 1;
                if (this.$route.query.id) {
                    await putArt(values)
                        .then(function (res) {
                            vm.$toast.clear();
                            vm.$toast.success("提交成功");
                            setTimeout(() => {
                                // 延迟跳转，清除提示，跳转到列表页面
                                vm.$toast.clear();
                                vm.$router.go(-1);
                                // vm.$router.replace({
                                //     path: "/showArtView",
                                // });
                                // //延迟时间：0.8秒
                            }, 800);
                        })
                        .catch((er) => {
                            this.isQuest == false;
                            vm.$toast.clear();
                            vm.$toast.fail("提交失败\n请重试");
                        });
                } else {
                    await postArt(values)
                        .then(function (res) {
                            vm.$toast.clear();
                            vm.$toast.success("提交成功");
                            setTimeout(() => {
                                // 延迟跳转，清除提示，跳转到列表页面
                                vm.$toast.clear();
                                vm.$router.replace({
                                    path: "/showArtView",
                                });
                                //延迟时间：0.8秒
                            }, 800);
                        })
                        .catch((er) => {
                            this.isQuest == false;
                            vm.$toast.clear();
                            vm.$toast.fail("提交失败\n请重试");
                        });
                }
            } else {
                this.isQuest = false;
                this.$toast.clear();
                this.$toast.fail({
                    message: "请选择第一获奖人",
                    forbidClick: true,
                });
            }
        },
        // 返回按钮事件
        onClickLeft() {
            this.$router.go(-1); //返回上一层
        },
        //获取下拉框
        selectOption() {
            getArtOption("ams")
                .then((res) => {
                    //项目级别
                    var firNewArr = res.data.sportsLevel.map((item) => ({
                        key: item.key,
                        name: item.value,
                    }));
                    //研究类别
                    var secNewArr = res.data.awardCategory.map((item) => ({
                        key: item.key,
                        name: item.value,
                    }));

                    this.firItem.firItemCloumn = firNewArr;
                    this.secItem.secItemCloumn = secNewArr;
                    if (this.$route.query.id) {
                        const id = this.$route.query.id;
                        this.projectDetails(id);
                    }
                })
                .catch((res) => {
                    this.$toast.fail({
                        message: "下拉框获取失败",
                        forbidClick: true,
                    });
                });
        },
    },
};
</script>
<style scoped>
/* 适应PC */
.select-name-component /deep/ .van-overlay,
.select-name-component /deep/ .van-popup {
    width: 768px;
    left: auto;
}
/* 导航条高度背景 */
.nav-bar {
    height: 40px;
    background-color: rgb(250, 250, 250);
}
/* 右侧按钮取消样式 */
div /deep/ .van-cell__right-icon {
    display: none;
}
/* 两个按钮横向 */
.button {
    padding: 16px 0;
    display: flex;
    background-color: rgb(250, 250, 250);
}
.button li {
    list-style: none;
    flex-direction: row;
    text-align: center;
}
.bot-button {
    height: 41px;
    width: 150px;
}
/* 全部背景 */
.record-con {
    background-color: rgb(250, 250, 250);
    min-height: 100vh;
    overflow: hidden;
    font-size: 17px;
}
.record-con /deep/ .van-cell {
    padding: 4.3px 8px;
}
/* 处理弹出框空白的处理 */
.my-collapse /deep/ .van-collapse-item__content {
    padding: 0;
}
.my-collapse .newCollapseItemPadding {
    padding: 4.3px 16px;
}
/* 备注字体大小 */
.msg-tip {
    font-size: 14px;
    color: #b9b7b7;
}
.my-collapse /deep/ .van-cell--clickable:active {
    background-color: #ffffff;
}
/* 改90 */
.record-con /deep/ .van-field .van-cell__title span {
    display: inline-block;
    /* width: 68px; */
    width: 90%;
    font-size: 17px;
}
.record-con /deep/ .van-button__content .van-button__text {
    font-size: 17px;
}
.record-con /deep/ .van-cell__value {
    display: flex;
    align-items: center;
}
/* 第一个按钮背景色 */
.btnFirst {
    background-color: rgb(250, 250, 250);
}
/* 第二个按钮背景 */
.btnSecond {
    background-color: rgb(24, 144, 255);
}
/* 按钮边框 */
.record-con /deep/ .van-button--default {
    border: 2px solid #ebedf0;
}
.record-con /deep/ .van-cell::after {
    display: none;
}
.record-con .button li:nth-child(2) /deep/ .bot-button {
    border: none;
}
/* 改变pc输入框宽度 */
.record-con /deep/ .van-field__body {
    width: 100%;
}

/* 组件 */
/* .record-con /deep/ .all-autor {
    
} */
.record-con /deep/ .fir-autor {
    display: flex !important;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    height: 30px;
    /* width: 90px; */
}
/* 组件所有作者 */
.record-con /deep/ .all-autor {
    display: flex !important;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    height: 30px;
    margin: 5px 8px 0 0;
    margin-left: 0;
}
/* 两边间距 */
.record-con /deep/ .van-field__label {
    width: 85px;
}
/* 返回字体大小 */
.record-con /deep/ .van-nav-bar__left {
    font-size: 17px;
}
/* 箭头 */
.record-con /deep/.van-nav-bar__arrow {
    min-width: 1em;
    margin-right: 2px;
    font-size: 18px;
    margin-left: -2px;
}
/* 标题字体大小 */
.record-con /deep/.van-nav-bar__title {
    font-size: 17px;
}
/* 输入框字体大小和换行 */
.record-con /deep/ .van-field__control {
    font-size: 15px;
    display: flex !important;
    align-items: center;
    flex-wrap: wrap;
}
.add-autor {
    margin-right: 8px;
    color: #1890ff;
    width: 107px !important;
    text-decoration: underline;
    height: 21px;
    font-size: 15px !important;
}
/* 备注 */
.remark {
    width: 68px !important;
    margin-left: -4px;
    color: rgba(144, 144, 144, 1);
    font-size: 16px !important;
    /* font-family: PingFangSC; */
}
/* 备注 */
.spanRemark {
    width: 110px !important;
}
/* bohui */
.record-con /deep/ .van-hairline--bottom::after {
    display: none;
}
.warn {
    font-size: 16px;
    color: #f5222d;
    margin-left: 18px;
    padding: 10px 0;
}
</style>
