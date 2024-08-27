<template>
<div>
  <el-card>
    <div style="display: flex">
      <div style="width: 300px;">
        <el-image :src="merchandise.mainImage" :preview-src-list="[merchandise.mainImage]" style="width: 100%;"></el-image>
      </div>
      <div style="flex: 1;padding-left: 50px">
        <div class="item1"><h3>{{merchandise.name}}</h3></div>
        <div class="item1" style="font-size: 14px;">{{merchandise.description}}</div>
        <div class="item1" style="color: orangered">价格 ￥ {{merchandise.price}}</div>
        <div class="item1" style="font-size: 14px">库存 {{merchandise.stock}}<span style="margin-left: 10px">{{merchandise.unit}}</span></div>
        <div class="item1">
          <el-input-number v-model="form.num" :min="1" :max="100" label="描述文字"></el-input-number>
          <span style="margin-left: 10px">{{merchandise.unit}}</span>
        </div>
        <div class="item1" style="margin-top:40px ">
<!--          <el-button size="medium" style="background-color: red;color: white" ><i class="el-icon-wallet">直接购买</i></el-button>-->
<!--          <el-button size="medium" style="background-color: red;color: white" v-on:click="addCart"><i class="el-icon-shopping-cart-2">加入购物车</i></el-button>-->
        </div>
      </div>
    </div>
  </el-card>
  <el-card>
    <div style="height: 300px;">
      <div><span style="color: black;font-size: 20px;font-weight: bold">请选择支付方式</span></div>
      <div class="bigdiv">
        <div class="innerdiv" @click="pay_way=1">
          <div style="margin-left: 25px">
            <span class="checkmark" :class="{ 'checked': pay_way == '1' }" @click="pay_way=1"></span>
          </div>
            <el-image :src="alipay" fit="scale-down" style="width:168px;height: 58px;margin-left: 20px"></el-image>
            <el-image :src="alipayTui" fit="scale-down" style="width:50px;margin-left: 40px"></el-image>
        </div>
<!--        <div class="innerdiv" @click="pay_way=2">-->
<!--          <div style="margin-left: 25px">-->
<!--            <span class="checkmark" :class="{ 'checked': pay_way == '2' }" @click="pay_way=2"></span>-->
<!--          </div>-->
<!--          <el-image :src="alipay" fit="scale-down" style="width:168px;height: 58px;margin-left: 20px"></el-image>-->
<!--          <el-image :src="alipayTui" fit="scale-down" style="width:50px;margin-left: 40px"></el-image>-->
<!--        </div>-->
      </div>


    </div>
  </el-card>
  <el-button class="bottom-right-button" size="medium" style="background-color: red;color: white" @click="open"><i class="el-icon-wallet">直接购买</i></el-button>
  <el-button type="text" @click="open">点击打开 Message Box</el-button>
</div>
</template>

<script>
import {getMerchandise} from "@/api/order/merchandise";
import {addCart} from "@/api/order/cart";
import alipayImage from "@/assets/images/pay/80_232_白底.png"
import alipayTui from "@/assets/images/pay/按钮标签.png"
import {buyjoker}  from "@/api/index.js"

export default {
  name: "index",
  props: {},
  data() {
    return {
      alipay:alipayImage,
      alipayTui:alipayTui,
      pay_way:1,
      merchandiseId:this.$route.query.merchandiseId,
      merchandise:{
        name:null,
        price:null,
        stock:null,
        type:null,
        description:null,
        mainImage:null,
        shuxing:null,
        unit:null
      },
      form:{
        merchandiseId:null,
        num:1,
      }
    };
  },
  mounted() {
    this.getMerchandiseItem()
  },
  methods:{
    getMerchandiseItem(){
      getMerchandise(this.merchandiseId).then(response => {
        this.merchandise = response.data
        console.log("buydetail:",this.merchandise)
      })
    },
    addCart(){
      this.form.merchandiseId=this.merchandiseId
      addCart(this.form).then(response => {
        this.$message.success("加入购物车成功")
      });
    },
    buy(iphoneNum) {
      //确定是否有电话号码
      var data={
        merchandiseId:this.merchandiseId,
        payment:this.form.num*this.merchandise.price,
        numbers:this.number,
        iphone:iphoneNum,
      }
      buyjoker(data).then(res=>{
        document.write(res.data);
      })
    },
    open() {
      this.$prompt('请输入手机号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        inputErrorMessage: '手机格式不正确'
      }).then(({ value }) => {
        this.buy(value)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  },
}
</script>

<style scoped>
.item1{
  padding: 5px;

}
.bottom-right-button{
  /*position: absolute;*/
  margin-top:120px ;
  margin-left: 90%;
  bottom: 10px;
}
.bigdiv{
  margin-top: 40px;
  display: flex;
  justify-content: flex-start;
  /*align-items: center;*/
  flex-wrap: wrap;
  /*align-content: space-around;*/
}
.innerdiv{
  height: 100px;
  width: 380px;
  margin-right: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 2px #dddddd solid;
  border-radius: 10px;
  cursor: pointer;
}
.checkmark {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #ddd;
  margin-right: 5px;
  cursor: pointer;
}

.checked {
  background-color: #00b4ff;
}

.checked::after {
  content: "✔";
  position: absolute;
  /*display: none;*/
  text-align: center;
  line-height: 20px;
  font-size: 14px;
  color: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

input[type="radio"]:checked + .checkmark::after {
  /*display: block;*/
}

.checkmark::after {
  /*content: "✔";*/
  /*text-align: center;*/
  /*line-height: 20px;*/
  /*font-size: 14px;*/
  /*color: white;*/
  /*position: absolute;*/
  /*left: 50%;*/
  /*top: 50%;*/
  /*transform: translate(-50%, -50%);*/
}
</style>
