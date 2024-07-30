<template>
  <div v-loading="loading" class="social-callback"></div>
</template>

<script>
import { login, callback } from '@/api/login';
import { setToken, getToken } from '@/utils/auth';

export default {
  name: "SocialCallback",
  data() {
    return {
      loading: true,
      route:this.$route.query,
      code:this.$route.query.auth_code,
      state:this.$route.query.state,
      source:this.$route.query.source,
      // stateJson:JSON.parse(atob(state)),
      tenantId:"",
      // domain:this.stateJson.domain,
    };
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    async processResponse(res){
      console.log("res",res)
      if (res.code !== 200) {
        throw new Error(res.msg);
      }
      if (res.data !== null) {
        setToken(res.data.access_token);
      }
      this.$message.success(res.msg);
      setTimeout(() => {
        location.href =process.env.VITE_APP_CONTEXT_PATH + 'index';
      }, 2000);
    },
    handleError(error){
      this.$message.error(error.message);
      setTimeout(() => {
        location.href = process.env.VITE_APP_CONTEXT_PATH + 'index';
      }, 2000);
    },
    async callbackByCode(data){
      try {
        const res = await callback(data);
        await this.processResponse(res);
        this.loading = false;
      } catch (error) {
        this.handleError(error);
      }
    },
    async loginByCode(data){
      try {
        const res = await login(data);
        await this.processResponse(res);
        this.loading = false;
      } catch (error) {
        this.handleError(error);
      }
    },
    async init(){
      // 如果域名不相等 则重定向处理
      let host = window.location.host;
      console.log(this.domain,host)
      console.log(this.source)
      // if (this.domain !== host) {
      //   let urlFull = new URL(window.location.href);
      //   urlFull.host = this.domain;
      //   window.location.href = urlFull.toString();
      //   return;
      // }

      var data = {
        socialCode: this.code,
        socialState: this.state,
        tenantId: this.tenantId,
        source: this.source[0],
        clientId: process.env.VITE_APP_CLIENT_ID,
        grantType: 'social'
      };

      if (!getToken()) {
        await this.loginByCode(data);
      } else {
        await this.callbackByCode(data);
      }
    },
  }

};
</script>
