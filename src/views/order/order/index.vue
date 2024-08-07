<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="订单编号" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品id" prop="merchandiseId">
        <el-input
          v-model="queryParams.merchandiseId"
          placeholder="请输入商品id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购买人id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入购买人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购买数量" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入购买数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际消费金额" prop="payment">
        <el-input
          v-model="queryParams.payment"
          placeholder="请输入实际消费金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易完成时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择交易完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付时间" prop="paymentTime">
        <el-date-picker clearable
          v-model="queryParams.paymentTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择支付时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['order:order:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['order:order:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['order:order:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['order:order:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="" align="center" prop="id" />
      <el-table-column label="订单编号" align="center" prop="orderNo" />
      <el-table-column label="商品id" align="center" prop="merchandiseId" />
      <el-table-column label="购买人id" align="center" prop="userId" />
      <el-table-column label="购买数量" align="center" prop="number" />
      <el-table-column label="实际消费金额" align="center" prop="payment" />
      <el-table-column label="是否支付1.已支付，0未支付,-1订单取消，2交易成功" align="center" prop="status" />
      <el-table-column label="支付类型 1在线支付" align="center" prop="paymentType" />
      <el-table-column label="交易完成时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付时间" align="center" prop="paymentTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['order:order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['order:order:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="订单编号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="商品id" prop="merchandiseId">
          <el-input v-model="form.merchandiseId" placeholder="请输入商品id" />
        </el-form-item>
        <el-form-item label="购买人id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入购买人id" />
        </el-form-item>
        <el-form-item label="购买数量" prop="number">
          <el-input v-model="form.number" placeholder="请输入购买数量" />
        </el-form-item>
        <el-form-item label="实际消费金额" prop="payment">
          <el-input v-model="form.payment" placeholder="请输入实际消费金额" />
        </el-form-item>
        <el-form-item label="交易完成时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择交易完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付时间" prop="paymentTime">
          <el-date-picker clearable
            v-model="form.paymentTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择支付时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">支付信息信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddPayInfo">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeletePayInfo">删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="payInfoList" :row-class-name="rowPayInfoIndex" @selection-change="handlePayInfoSelectionChange" ref="payInfo">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50"/>
          <el-table-column label="用户id" prop="userId" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.userId" placeholder="请输入用户id" />
            </template>
          </el-table-column>
          <el-table-column label="支付平台1支付宝2微信" prop="payPlatform" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.payPlatform" placeholder="请输入支付平台1支付宝2微信" />
            </template>
          </el-table-column>
          <el-table-column label="支付流水号" prop="tradeNo" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.tradeNo" placeholder="请输入支付流水号" />
            </template>
          </el-table-column>
          <el-table-column label="支付状态0未支付1已支付" prop="status" width="150">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status" placeholder="请选择支付状态0未支付1已支付">
                <el-option label="请选择字典生成" value="" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="支付金额" prop="payAmount" width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.payAmount" placeholder="请输入支付金额" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOrder, getOrder, delOrder, addOrder, updateOrder } from "@/api/order/order";

export default {
  name: "Order",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedPayInfo: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 订单表格数据
      orderList: [],
      // 支付信息表格数据
      payInfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderNo: null,
        merchandiseId: null,
        userId: null,
        number: null,
        payment: null,
        status: null,
        paymentType: null,
        endTime: null,
        paymentTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        number: [
          { required: true, message: "购买数量不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "是否支付1.已支付，0未支付,-1订单取消，2交易成功不能为空", trigger: "change" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        orderNo: null,
        merchandiseId: null,
        userId: null,
        number: null,
        payment: null,
        status: null,
        paymentType: null,
        endTime: null,
        paymentTime: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      };
      this.payInfoList = [];
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getOrder(id).then(response => {
        this.form = response.data;
        this.payInfoList = response.data.payInfoList;
        this.open = true;
        this.title = "修改订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.payInfoList = this.payInfoList;
          if (this.form.id != null) {
            updateOrder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除订单编号为"' + ids + '"的数据项？').then(function() {
        return delOrder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
	/** 支付信息序号 */
    rowPayInfoIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
    },
    /** 支付信息添加按钮操作 */
    handleAddPayInfo() {
      let obj = {};
      obj.userId = "";
      obj.payPlatform = "";
      obj.tradeNo = "";
      obj.status = "";
      obj.payAmount = "";
      obj.remark = "";
      this.payInfoList.push(obj);
    },
    /** 支付信息删除按钮操作 */
    handleDeletePayInfo() {
      if (this.checkedPayInfo.length == 0) {
        this.$modal.msgError("请先选择要删除的支付信息数据");
      } else {
        const payInfoList = this.payInfoList;
        const checkedPayInfo = this.checkedPayInfo;
        this.payInfoList = payInfoList.filter(function(item) {
          return checkedPayInfo.indexOf(item.index) == -1
        });
      }
    },
    /** 复选框选中数据 */
    handlePayInfoSelectionChange(selection) {
      this.checkedPayInfo = selection.map(item => item.index)
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('order/order/export', {
        ...this.queryParams
      }, `order_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
