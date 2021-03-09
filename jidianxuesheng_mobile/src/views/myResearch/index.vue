<template>
    <div class="total">
        <div class="title">
            <p>我的科研</p>
        </div>
        <div class="outer-box">
            <div
                v-for="(cell, index) in listCell"
                :key="index"
                class="commit-cell"
            >
                <router-link :to="cell.listUrl">
                    <div class="top-sec">
                        <div class="title-sec">
                            <img :src="cell.src" />
                            <span style="color: black">{{ cell.title }}</span>
                        </div>
                        <van-icon class="right-arrow" name="arrow" />
                    </div>
                </router-link>
                <div class="bot-sec">
                    <div class="bot-cell">
                        <p>{{ cell.theYear }}</p>
                        <p>本年度</p>
                    </div>
                    <div class="bot-cell">
                        <p>{{ cell.all }}</p>
                        <p>2020年至今</p>
                    </div>
                    <div class="bot-cell">
                        <router-link :to="cell.url">
                            <p class="add-icon">
                                <van-icon name="add-o" />
                            </p>
                            <p class="add-new">点击新增</p>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <van-tabbar
            class="tabbar"
            :class="isPC === true ? 'tabbar-inside' : ''"
            v-model="active"
        >
            <van-tabbar-item>
                <span>我的科研</span>
                <template #icon="props">
                    <img
                        src="../../assets/img/mySearchSelectIcon.svg"
                        v-show="props.active"
                    />
                    <img
                        src="../../assets/img/mySearchIcon.svg"
                        v-show="!props.active"
                    />
                </template>
            </van-tabbar-item>
            <van-tabbar-item to="/personInfo" replace class="tabbar-sec">
                <span>个人信息</span>
                <template #icon="props">
                    <img
                        src="../../assets/img/personSelectIcon.svg"
                        v-show="props.active"
                    />
                    <img
                        src="../../assets/img/personIcon.svg"
                        v-show="!props.active"
                    />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import Global from "../../store/global.vue";
import searchName from "../../components/searchName.vue";
import { firstEcho } from "../../api/common.js";
export default {
    name: "index",
    data() {
        return {
            listCell: [
                {
                    title: "学术论文",
                    listUrl: "/submitPages/academicItem",
                    url: "/submitPages/academicPaper",
                    src: require("../../assets/img/academicPaperIcon.svg"),
                },
                {
                    title: "项目",
                    listUrl: "/submitPages/researchItem",
                    url: "/submitPages/researchProject",
                    src: require("../../assets/img/projectIcon.svg"),
                },
                {
                    title: "著作",
                    listUrl: "/publicationview",
                    url: "/publication",
                    src: require("../../assets/img/workIcon.svg"),
                },
                {
                    title: "获奖成果",
                    listUrl: "/rewardshow",
                    url: "/reward",
                    src: require("../../assets/img/rewardIcon.svg"),
                },
                {
                    title: "专利",
                    listUrl: "/inventionpatentshow",
                    url: "/inventionpatent",
                    src: require("../../assets/img/patentIcon.svg"),
                },
                {
                    title: "标准",
                    listUrl: "/standardshow",
                    url: "/standard",
                    src: require("../../assets/img/achieveIcon.svg"),
                },
                {
                    title: "美、音、体类获奖",
                    listUrl: "/showArtView",
                    url: "/artMusicSport",
                    src: require("../../assets/img/otherAward.svg"),
                },
                {
                    title: "举办会议",
                    listUrl: "/showHoldView",
                    url: "/holdMeeting",
                    src: require("../../assets/img/holdMeetingIcon.svg"),
                },
                {
                    title: "参加会议",
                    listUrl: "/showAttendView",
                    url: "/attendMeeting",
                    src: require("../../assets/img/joinMeetingIcon.svg"),
                },
                {
                    title: "专家讲学",
                    listUrl: "/showExpertView",
                    url: "/expertReport",
                    src: require("../../assets/img/expertIcon.svg"),
                },
            ],
            active: 0,
            icon: {
                active: "../../assets/img/personIcon.svg",
                inactive: "../../assets/img/personSelectIcon.svg",
            },
            analyzeNum: [],
        };
    },
    created() {
        this.isPC = this.$Global.isPC;
    },
    activated() {
        this.active = 0;
        firstEcho().then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                (this.listCell[i].theYear = res.data[i].theYear),
                    (this.listCell[i].all = res.data[i].all);
            }
            // 强制渲染
            this.$forceUpdate(this.listCell);
        });
    },
    methods: {},
};
</script>

<style scoped>
.total {
    background-color: rgb(250, 250, 250);
}
.title {
    padding-top: 10px;
    margin-bottom: 20px;
}

.title p {
    text-align: center;
    font-size: 17px;
}

.outer-box {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    padding-bottom: 50px;
}

.commit-cell {
    width: 100%;
    height: 126px;
    box-shadow: 0 2px 4px 0 #e0dfdf;
    border-radius: 3px;
    margin-bottom: 20px;
    background-color: white;
}

.top-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
}

.title-sec {
    display: flex;
    align-items: center;
    margin-left: 10px;
}
.title-sec img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
}

.right-arrow {
    margin-right: 10px;
    color: black;
}

.right-arrow:active {
    color: black;
}

.bot-sec {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 81px;
}

.bot-cell {
    position: relative;
    width: 100%;
    text-align: center;
}

.bot-cell p:first-child {
    font-size: 30px;
    font-family: PingFangSC;
    color: #1890ff;
}

.bot-cell::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 35px;
    width: 1px;
    background-color: #f4f4f4;
}

.bot-cell:nth-child(3)::after {
    content: "";
    width: 0px;
}

.add-new {
    color: #1890ff;
}

.add-icon i {
    position: relative;
    top: 5px;
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
