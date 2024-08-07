<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="租户id" prop="tenantId">
        <el-input
          v-model="queryParams.tenantId"
          placeholder="请输入租户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台+平台唯一id" prop="authId">
        <el-input
          v-model="queryParams.authId"
          placeholder="请输入平台+平台唯一id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户来源" prop="source">
        <el-input
          v-model="queryParams.source"
          placeholder="请输入用户来源"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台编号唯一id" prop="openId">
        <el-input
          v-model="queryParams.openId"
          placeholder="请输入平台编号唯一id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入登录账号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入用户昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input
          v-model="queryParams.email"
          placeholder="请输入用户邮箱"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户的授权令牌" prop="accessToken">
        <el-input
          v-model="queryParams.accessToken"
          placeholder="请输入用户的授权令牌"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户的授权令牌的有效期，部分平台可能没有" prop="expireIn">
        <el-input
          v-model="queryParams.expireIn"
          placeholder="请输入用户的授权令牌的有效期，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="刷新令牌，部分平台可能没有" prop="refreshToken">
        <el-input
          v-model="queryParams.refreshToken"
          placeholder="请输入刷新令牌，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="平台的授权信息，部分平台可能没有" prop="accessCode">
        <el-input
          v-model="queryParams.accessCode"
          placeholder="请输入平台的授权信息，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户的 unionid" prop="unionId">
        <el-input
          v-model="queryParams.unionId"
          placeholder="请输入用户的 unionid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="授予的权限，部分平台可能没有" prop="scope">
        <el-input
          v-model="queryParams.scope"
          placeholder="请输入授予的权限，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小米平台用户的附带属性，部分平台可能没有" prop="macAlgorithm">
        <el-input
          v-model="queryParams.macAlgorithm"
          placeholder="请输入小米平台用户的附带属性，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小米平台用户的附带属性，部分平台可能没有" prop="macKey">
        <el-input
          v-model="queryParams.macKey"
          placeholder="请输入小米平台用户的附带属性，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户的授权code，部分平台可能没有" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入用户的授权code，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Twitter平台用户的附带属性，部分平台可能没有" prop="oauthToken">
        <el-input
          v-model="queryParams.oauthToken"
          placeholder="请输入Twitter平台用户的附带属性，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Twitter平台用户的附带属性，部分平台可能没有" prop="oauthTokenSecret">
        <el-input
          v-model="queryParams.oauthTokenSecret"
          placeholder="请输入Twitter平台用户的附带属性，部分平台可能没有"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建部门" prop="createDept">
        <el-input
          v-model="queryParams.createDept"
          placeholder="请输入创建部门"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['system:social:add']"
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
          v-hasPermi="['system:social:edit']"
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
          v-hasPermi="['system:social:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:social:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="socialList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="租户id" align="center" prop="tenantId" />
      <el-table-column label="平台+平台唯一id" align="center" prop="authId" />
      <el-table-column label="用户来源" align="center" prop="source" />
      <el-table-column label="平台编号唯一id" align="center" prop="openId" />
      <el-table-column label="登录账号" align="center" prop="userName" />
      <el-table-column label="用户昵称" align="center" prop="nickName" />
      <el-table-column label="用户邮箱" align="center" prop="email" />
      <el-table-column label="头像地址" align="center" prop="avatar" />
      <el-table-column label="用户的授权令牌" align="center" prop="accessToken" />
      <el-table-column label="用户的授权令牌的有效期，部分平台可能没有" align="center" prop="expireIn" />
      <el-table-column label="刷新令牌，部分平台可能没有" align="center" prop="refreshToken" />
      <el-table-column label="平台的授权信息，部分平台可能没有" align="center" prop="accessCode" />
      <el-table-column label="用户的 unionid" align="center" prop="unionId" />
      <el-table-column label="授予的权限，部分平台可能没有" align="center" prop="scope" />
      <el-table-column label="个别平台的授权信息，部分平台可能没有" align="center" prop="tokenType" />
      <el-table-column label="id token，部分平台可能没有" align="center" prop="idToken" />
      <el-table-column label="小米平台用户的附带属性，部分平台可能没有" align="center" prop="macAlgorithm" />
      <el-table-column label="小米平台用户的附带属性，部分平台可能没有" align="center" prop="macKey" />
      <el-table-column label="用户的授权code，部分平台可能没有" align="center" prop="code" />
      <el-table-column label="Twitter平台用户的附带属性，部分平台可能没有" align="center" prop="oauthToken" />
      <el-table-column label="Twitter平台用户的附带属性，部分平台可能没有" align="center" prop="oauthTokenSecret" />
      <el-table-column label="创建部门" align="center" prop="createDept" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:social:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:social:remove']"
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

    <!-- 添加或修改社会化关系对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="租户id" prop="tenantId">
          <el-input v-model="form.tenantId" placeholder="请输入租户id" />
        </el-form-item>
        <el-form-item label="平台+平台唯一id" prop="authId">
          <el-input v-model="form.authId" placeholder="请输入平台+平台唯一id" />
        </el-form-item>
        <el-form-item label="用户来源" prop="source">
          <el-input v-model="form.source" placeholder="请输入用户来源" />
        </el-form-item>
        <el-form-item label="平台编号唯一id" prop="openId">
          <el-input v-model="form.openId" placeholder="请输入平台编号唯一id" />
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入登录账号" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入用户邮箱" />
        </el-form-item>
        <el-form-item label="头像地址" prop="avatar">
          <el-input v-model="form.avatar" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="用户的授权令牌" prop="accessToken">
          <el-input v-model="form.accessToken" placeholder="请输入用户的授权令牌" />
        </el-form-item>
        <el-form-item label="用户的授权令牌的有效期，部分平台可能没有" prop="expireIn">
          <el-input v-model="form.expireIn" placeholder="请输入用户的授权令牌的有效期，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="刷新令牌，部分平台可能没有" prop="refreshToken">
          <el-input v-model="form.refreshToken" placeholder="请输入刷新令牌，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="平台的授权信息，部分平台可能没有" prop="accessCode">
          <el-input v-model="form.accessCode" placeholder="请输入平台的授权信息，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="用户的 unionid" prop="unionId">
          <el-input v-model="form.unionId" placeholder="请输入用户的 unionid" />
        </el-form-item>
        <el-form-item label="授予的权限，部分平台可能没有" prop="scope">
          <el-input v-model="form.scope" placeholder="请输入授予的权限，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="id token，部分平台可能没有" prop="idToken">
          <el-input v-model="form.idToken" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="小米平台用户的附带属性，部分平台可能没有" prop="macAlgorithm">
          <el-input v-model="form.macAlgorithm" placeholder="请输入小米平台用户的附带属性，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="小米平台用户的附带属性，部分平台可能没有" prop="macKey">
          <el-input v-model="form.macKey" placeholder="请输入小米平台用户的附带属性，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="用户的授权code，部分平台可能没有" prop="code">
          <el-input v-model="form.code" placeholder="请输入用户的授权code，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="Twitter平台用户的附带属性，部分平台可能没有" prop="oauthToken">
          <el-input v-model="form.oauthToken" placeholder="请输入Twitter平台用户的附带属性，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="Twitter平台用户的附带属性，部分平台可能没有" prop="oauthTokenSecret">
          <el-input v-model="form.oauthTokenSecret" placeholder="请输入Twitter平台用户的附带属性，部分平台可能没有" />
        </el-form-item>
        <el-form-item label="创建部门" prop="createDept">
          <el-input v-model="form.createDept" placeholder="请输入创建部门" />
        </el-form-item>
        <el-form-item label="删除标志" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入删除标志" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSocial, getSocial, delSocial, addSocial, updateSocial } from "@/api/system/social";

export default {
  name: "Social",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 社会化关系表格数据
      socialList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        tenantId: null,
        authId: null,
        source: null,
        openId: null,
        userName: null,
        nickName: null,
        email: null,
        avatar: null,
        accessToken: null,
        expireIn: null,
        refreshToken: null,
        accessCode: null,
        unionId: null,
        scope: null,
        tokenType: null,
        idToken: null,
        macAlgorithm: null,
        macKey: null,
        code: null,
        oauthToken: null,
        oauthTokenSecret: null,
        createDept: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        authId: [
          { required: true, message: "平台+平台唯一id不能为空", trigger: "blur" }
        ],
        source: [
          { required: true, message: "用户来源不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "登录账号不能为空", trigger: "blur" }
        ],
        accessToken: [
          { required: true, message: "用户的授权令牌不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询社会化关系列表 */
    getList() {
      this.loading = true;
      listSocial(this.queryParams).then(response => {
        this.socialList = response.rows;
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
        userId: null,
        tenantId: null,
        authId: null,
        source: null,
        openId: null,
        userName: null,
        nickName: null,
        email: null,
        avatar: null,
        accessToken: null,
        expireIn: null,
        refreshToken: null,
        accessCode: null,
        unionId: null,
        scope: null,
        tokenType: null,
        idToken: null,
        macAlgorithm: null,
        macKey: null,
        code: null,
        oauthToken: null,
        oauthTokenSecret: null,
        createDept: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        delFlag: null
      };
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
      this.title = "添加社会化关系";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSocial(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改社会化关系";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSocial(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSocial(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除社会化关系编号为"' + ids + '"的数据项？').then(function() {
        return delSocial(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/social/export', {
        ...this.queryParams
      }, `social_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
