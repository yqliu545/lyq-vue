<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="24">
        <el-card class="update-log">
<!--          <div slot="header" class="clearfix">-->
<!--            <span>联系信息</span>-->
<!--          </div>-->
          <div class="body">
            <p>一个笑话</p>
            <p>价格：{{ price }}￥</p>
            <el-button @click="buy()">立即购买</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="font-size: xxx-large">账号:<span style="color: #a95812;margin-left: 20px;">tlpskv1907@sandbox.com</span></div>
    <div>登录密码:111111</div>
    <div>支付密码:111111</div>
  </div>
</template>

<script>
import {buyjoker} from "@/api";

export default {
  name: "Index",
  data() {
    return {
      orderCode:'',
      price:0.01,
      number:1,
      sumPrice:0,
      merchandiseId:1,
    };
  },
  methods: {
    buy() {
      this.alipay=true;
      var data={
        merchandiseId:this.merchandiseId,
        sumPrice:this.number*this.price,
        price:this.price,
        number:this.number,
      }
      buyjoker(data).then(res=>{
        document.write(res.data);
      })
    },
    cancelOrder(){

    },
    //检查订单状态
    checkOrder(){
      clearTimeout(this.timer);
      this.timer =setTimeout(()=>{
        let initTime = +new Date();
        let loop =()=>{
          checkOrder({orderCode:this.orderCode}).then((res)=>{
            //支付成功操作
            if (res.data.code == 200){

            }else {
              let now = +new Date();
              if (now - initTime < 45000) {
                loop();
              } else {
                // 超时按照失败处理
                //支付失败的结果
              }
            }
          })
        }
        loop();
      },500)
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

