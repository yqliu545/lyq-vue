<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="24">
        <el-card class="update-log">
<!--          <div slot="header" class="clearfix">-->
<!--            <span>联系信息</span>-->
<!--          </div>-->
          <div class="body">
<!--            <p>-->
<!--              <i class="el-icon-s-promotion"></i> 官网：<el-link-->
<!--                href="http://www.ruoyi.vip"-->
<!--                target="_blank"-->
<!--                >http://www.ruoyi.vip</el-link-->
<!--              >-->
<!--            </p>-->
<!--            <p>-->
<!--              <i class="el-icon-user-solid"></i> QQ群： <s> 满42799195 </s>  <s> 满170157040 </s>-->
<!--              <s> 满130643120 </s> <s> 满225920371 </s> <s> 满201705537 </s> <s> 满236543183 </s>-->
<!--              <s> 满213618602 </s> <s> 满148794840 </s> <s> 满118752664 </s> <s> 满101038945 </s>-->
<!--              <s> 满128355254 </s> <s> 满179219821 </s> <a href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Z6j1amUmIPBXamuZzxpwjY8GwaP45XB6&authKey=zfSnxECfnScfY1HLCWilSqCq%2BmSVtr%2Bi%2F4oXeBcuQVwlq6XlrAfbZ0awp3%2B4Bdec&noverify=0&group_code=158753145" target="_blank">158753145</a>-->
<!--            </p>-->
<!--            <p>-->
<!--              <i class="el-icon-chat-dot-round"></i> 微信：<a-->
<!--                href="javascript:;"-->
<!--                >/ *若依</a-->
<!--              >-->
<!--            </p>-->
<!--            <p>-->
<!--              <i class="el-icon-money"></i> 支付宝：<a-->
<!--                href="javascript:;"-->
<!--                class="支付宝信息"-->
<!--                >/ *若依</a-->
<!--              >-->
<!--            </p>-->

            <p>一个笑话</p>
            <p>价格：{{ price }}￥</p>
            <el-button @click="buy()">立即购买</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogFormVisible" :before-close="cancelOrder" :modal="true" :close-on-click-modal="false" style="width:800px;margin:0px auto;" >
      <h1 style="font-size:30px;color:#00B38A" >微信扫一扫支付</h1>
      <img id="qrcode" :src="wxpayUrl">
      <h2 id="statusText"></h2>
      <p id="closeText"></p>
    </el-dialog>
  </div>
</template>

<script>
import {buyjoker} from "@/api";

export default {
  name: "Index",
  data() {
    return {
      dialogFormVisible:false,
      wxpayUrl:"",
      // 版本号
      version: "3.6.4",
      price:0.01,
      number:1,
      sumPrice:0,
      merchandiseId:1,

    };
  },
  methods: {
    buy() {
      this.dialogFormVisible=true;
      var data={
        merchandiseId:this.merchandiseId,
        sumPrice:this.number*this.price,
        price:this.price,
        number:this.number,
      }
      buyjoker(data).then(res=>{
        this.wxpayUrl="http://localhost:8080/pay/alipay/code?url="+res.data.code_url;
        this.checkOrder(res.data.trade_no);
      })
    },
    cancelOrder(){

    },
    //检查订单状态
    checkOrder(){

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

