<template>
  <div class="record-con">
    <!-- //导航栏 -->
    <van-nav-bar
      class="nav-bar"
      title="美音体"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-pull-refresh class="hold" v-model="isLoading" @refresh="onRefresh">
      <!-- 内容 -->
      <div class="dataReview" v-if="isEmpty">
        <!-- <div>456132</div> -->
        <van-cell-group v-for="(input, index) in group" :key="index">
          <van-cell
            :title="input.objectName"
            :value="input.value"
            :label="
              input.createTime.substring(0, 4) +
              '年' +
              input.createTime.substring(5, 7) +
              '月' +
              input.createTime.substring(8, 10) +
              '日'
            "
            @click="click(input.id)"
          >
            <div class="content">
              <!-- 根据状态显示 -->
              <span v-if="input.objectState == '0'" class="isSave">未提交</span>
              <span v-if="input.objectState == '1'" class="isDeal"
                >待科研秘书认定</span
              >
              <span v-if="input.objectState == '2'" class="isDeal"
                >待科技处认定</span
              >
              <span v-if="input.objectState == '3'" class="isDeal">通过</span>
              <span v-if="input.objectState == '4'" class="isQuit">已驳回</span>
              <!-- <span class="isDeal">未提交</span> -->
            </div>
          </van-cell>
        </van-cell-group>
      </div>
      <van-empty description="内容为空" v-if="!isEmpty" />
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArtList } from "../../../api/common.js";
export default {
  data() {
    return {
      // 下拉刷新
      isLoading: false,
      group: [],
      isEmpty: true,
    };
  },
  created() {
    this.$toast.loading({
      duration: 8000,
      message: "加载中",
      forbidClick: true,
    });
  },
  activated() {
    this.getList();
  },
  methods: {
    //点击进入详情页
    async click(id) {
      var vm = this;
      vm.$router.push({
        path: "/artMusicSport?id=" + id,
      });
    },
    getList() {
      let page = "ams";
      getArtList(page)
        .then((res) => {
          this.$toast.clear();
          console.log(res.data, "123132123");
          if (res.data.length > 0) {
            this.group = res.data;
            this.$forceUpdate(this.group);
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
            console.log(this.isEmpty);
          }
        })
        .catch((er) => {
          this.$toast.fail({
            message: "查询失败，请重试",
            forbidClick: true,
          });
        });
    },
    //导航栏点解返回
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    //刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      this.getList();
    },
  },
};
</script>
<style scoped>
.dataReview {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.record-con /deep/ .van-cell span {
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  line-height: 24px;
  font-size: 17px;
}

.content {
  height: 46px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.content span {
  font-size: 14px !important;
}

.isSave {
  color: #8c8c8c;
}
.isDeal {
  color: #1890ff;
}
.hold {
  height: 92vh;
}
.isQuit {
  color: #f5222d;
}
.dataReview /deep/ .van-cell__label {
  font-size: 16px;
}
.nav-bar /deep/ .van-nav-bar__title {
  font-size: 17px;
  line-height: 24px;
  flex-grow: 2;
}
.nav-bar /deep/ .van-nav-bar__value {
  flex-grow: 1;
}
/* .nav-bar /deep/ .van-icon-arrow-left {
    font-size: 21px;
}
.nav-bar /deep/ .van-nav-bar__left {
    font-size: 17px;
} */
.record-con {
  background-color: rgb(250, 250, 250);
  min-height: 100vh;
  overflow: hidden;
  font-size: 17px;
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
.record-con /deep/ .van-field__control {
  font-size: 15px;
  color: #8c8c8c;
}
/* pandding边距 */
.record-con /deep/ .van-cell {
  padding: 10px 11px;
}
/* 十个字拼接 */
.dataReview .van-cell__title {
  flex: none;
  width: 63%;
}
.dataReview .van-cell__title > span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  white-space: nowrap;
  /* width: 80%; */
  /* width: 50px; */
}
</style>
