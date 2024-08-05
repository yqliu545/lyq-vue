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
    <div ref="formRef" style="width: 1000px;height: 800px" v-html="aliform"></div>
  </div>
</template>

<script>
import {buyjoker} from "@/api";

export default {
  name: "Index",
  data() {
    return {
      dialogFormVisible:false,
      alipay:false,
      aliform:"",
      wxpayUrl:"",
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
        // this.wxpayUrl="http://localhost:8080/pay/alipay/code?url="+res.data.code_url;
        console.log(res.data)
        this.aliform=res.data;
        // const newWindow = window.open('', '_self');
        // newWindow.document.write(res.data);
        // newWindow.focus();
        this.$nextTick(() => {
          // 获取订单详情来轮询支付结果
          // this.checkOrder();
          console.log(document.forms);  //跳转之前,可以先打印看看forms,确保后台数据和forms正确,否则，可能会出现一些奇奇怪怪的问题 ╮(╯▽╰)╭
          document.forms[0].submit();  //重点--这个才是跳转页面的核心,获取第一个表单并提交
        });
        // form.innerHTML="<p>张三</p>"
        // this.checkOrder(res.data.trade_no);
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

