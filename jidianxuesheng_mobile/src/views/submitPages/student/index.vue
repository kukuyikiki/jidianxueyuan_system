<template>
    <div>
        <div class="bigPhoto">
            <div class="photoContent">
                <li>{{name}}</li>
                <li>{{majorClass}}</li>
            </div>
        </div>
        <div class="change">
            <div :class="this.shows == 1?'beClicked':''" @click="showFir()" style="padding-bottom: 2px;">个人信息</div>
            <div :class="this.shows == 2?'beClicked':''" @click="showSec()" style="padding-bottom: 2px;">个人奖惩</div>
        </div>
        <div class="content">
            <van-cell-group v-if="this.shows == 1">
                <van-field :readonly="!isStart" v-model="value" label="姓名" placeholder="姓名" />
                <van-field :readonly="!isStart" v-model="value" label="性别" placeholder="性别" />
                <van-field :readonly="!isStart" v-model="value" label="学院" placeholder="学院" />
                <van-field :readonly="!isStart" v-model="value" label="专业" placeholder="专业" />
                <van-field :readonly="!isStart" v-model="value" label="班级" placeholder="班级" />
                <van-field :readonly="!isStart" v-model="value" label="学号" placeholder="学号" />
                <van-field :readonly="!isStart" v-model="value" label="微信" placeholder="微信" />
                <van-field :readonly="!isStart" v-model="value" label="入学时间" placeholder="入学时间" />
                <van-field :readonly="!isStart" v-model="value" label="QQ" placeholder="QQ" />
                <van-field :readonly="!isStart" v-model="value" label="邮箱" placeholder="邮箱" />
                <van-field :readonly="!isStart" v-model="value" label="手机号" placeholder="手机号" />
                <van-field :readonly="!isStart" v-model="value" label="寝室" placeholder="寝室" />
                <div class="bottom">
                    <van-button @click="clickChange()" size="normal" type="primary">修改</van-button>
                    <van-button @click="clickSave()" size="normal" type="info">保存</van-button>
                </div>
            </van-cell-group>
            <van-cell-group v-if="this.shows == 2" class="need">
                <van-cell is-link title="荣誉" @click="show = true" />
                <van-action-sheet v-model="show" title="荣誉">
                  <div class="content">
                    <van-cell v-for="item in list" :key="item" :title="item" />
                  </div>
                </van-action-sheet>
                <van-cell is-link title="奖学金" @click="show1 = true" />
                <van-action-sheet v-model="show1" title="奖学金">
                  <van-cell v-for="item in list" :key="item" :title="item" />
                </van-action-sheet>
                <van-cell is-link title="惩罚" @click="show2 = true" />
                <van-action-sheet v-model="show2" title="惩罚">
                  <van-cell v-for="item in list" :key="item" :title="item" />
                </van-action-sheet>
                <!-- <van-field v-model="value" label="荣誉" placeholder="姓名" /> -->
                <!-- <van-field v-model="value" label="奖学金" placeholder="性别" /> -->
                <!-- <van-field v-model="value" label="惩罚" placeholder="学院" /> -->
                <van-field v-model="value" label="平时积分" placeholder="平时积分" />
                <!-- <van-field v-model="value" label="辅导员评价" placeholder="辅导员评价" /> -->
                <!-- <van-field v-model="value" label="辅导员建议" placeholder="辅导员建议" /> -->
                <!-- 辅导员评价 -->
                <van-field
                  v-model="message"
                  rows="2"
                  autosize
                  label="辅导员评价"
                  type="textarea"
                  placeholder="辅导员评价"
                />
                <!-- 辅导员建议 -->
                <van-field
                  v-model="message1"
                  rows="2"
                  autosize
                  label="辅导员建议"
                  type="textarea"
                  placeholder="辅导员建议"
                />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
     name:'张小山',
     majorClass: '机电学院应教181',
     shows:1,
     value:'',
     show:false,
     show1:false,
     show2:false,
     list: ["buhao","2不行太不像话了",3,4,5,6,7,8,9],
     finished: false,
     isStart: false,
     //备注
     message:"1111",
     message1:""
    };
  },
  created() {
    this.$toast.loading({
        duration: 2000,
        message: "加载中",
        forbidClick: true,
    });
  },
  activated() {
    
  },
  methods: {
    showFir:function(){
        this.shows = 1; 
    },
    showSec:function(){
        this.shows = 2; 
    },
    onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    clickChange:function(){
        this.isStart = true;
    },
    clickSave:function(){
        this.isStart = false;
    }
  },
};
</script>
<style scoped>
.need .content{
    padding: 16px 16px 160px;
}
.bigPhoto{
    width: 100%;
    height: 200px;
    background-color: rgb(22, 3, 3);
    color: white;
}
.bigPhoto li{
    list-style: none;
}
.photoContent{
    display: flex;
    flex-direction: column;
    padding-top: 129px;
    padding-left: 10px;
}
.photoContent li:nth-child(1){
    margin-bottom: 10px;
    padding-left: 4px;
    font-size: 18px;
}
.photoContent li:nth-child(2){
    width: 113px;
    border-radius: 10px 10px 10px 10px;
    border: 1px solid #dad4d4;
    background-color: white;
    color: gray;
    font-size: 14px;
}
.change{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    margin: 8px 0;
}
.beClicked{
    border-bottom: solid;
}
.bottom{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    margin: 10px 0;
}
.bottom .van-button{
    width: 90px;
    height: 32px;
}
</style>
