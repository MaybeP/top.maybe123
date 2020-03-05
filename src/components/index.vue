<template>
  <div>

    <header>
      <Row type="flex" style="opacity: 0.8;"  justify="start">
        <Col :xs="4" :sm="2" :md="2" :lg="1"  offset="1"><router-link to="/"><p class="logo" >Maybe</p></router-link></Col>
        <Col :xs="0" :sm="1" :md="1" :lg="1" ><i-button to="/" type="text" ghost >首页</i-button></Col>
        <Col :xs="2" :sm="2" :md="2" :lg="2" offset="1" ><i-button type="text" to="/fenlei" ghost >分类</i-button></Col>
        <Col :xs="2" :sm="1" :md="1" :lg="6"  ></Col>
        <Col :xs="9" :sm="5" :md="5" :lg="6"  offset="0">
          <Input v-model="search" icon="ios-search-outline"  @on-click="searchre()" @on-enter="searchre()" style="width:100%" placeholder="请输入搜索内容" search />
        </Col>
        <Col :xs="0" :sm="2" :md="2" :lg="2" offset="1"><i-button type="text" to="/zuoze" ghost>加入作者</i-button></Col>
        <Col :xs="1" :sm="1" :md="0" :lg="1"  ></Col>
        <Col  :xs="2" :sm="1" :md="1" :lg="1"  ><i-button v-if="this.islogin===false" type="text" @click="login=true" ghost >登录</i-button>
          <div class="touxiang"  v-else @click="gotogeren()"><Tooltip :content="formInline.user">{{this.formInline.user}}</Tooltip></div></Col>
        <Col :xs="0" v-if="this.islogin===false" :sm="1" :md="1" :lg="1" ><i-button  to="/zhuce" type="text" ghost>注册</i-button></Col>
      </Row>
    </header>
    <Modal
      :mask-closable="false"
      v-model="login"
      title="登录"
      :loading="loading"
      @on-ok="asyncOK('formInline')"
      ok-text="登录"
    >
      <Form ref="formInline" label-position="left" :model="formInline"  :rules="ruleInline" >
        <FormItem prop="user" label="用户名：">

          <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem  prop="password" label="密码：">

          <Input type="password" v-model="formInline.password" placeholder="请输入密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>

        </FormItem>

      </Form>
      <Row justify="end"><Col span="6" offset="18">
        <a @click="gotozc()" >注册账号<Icon type="ios-arrow-round-forward" /></a></Col></Row>
    </Modal>

    <router-view/>
    <Back-top :height="500" :bottom="80" >

    </Back-top>
    <footer>
      <Row type="flex" justify="center">
        <Divider>版权声明</Divider>
        <p class="copyright">湖南工业大学 软件工程1502  潘登登  毕业设计&copy;</p>
      </Row>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'index',
  data: function () {
    return {
      login: false,
      islogin: false,
      loading: true,
      search: null,
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '至少输入6位密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    searchre: function () {
      if (this.search !== null) {
        sessionStorage.setItem('search', this.search)
        this.$router.push({name: 'result'})
      }
    },
    gotozc: function () {
      this.login = false
      this.$router.push({name: 'zhuce'})
    },
    gotogeren: function () {
      this.$router.push({name: 'geren'})
      // alert('@click="gotogeren()"')
    },
    asyncOK (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          var _this = this
          this.$axios.get('http://www.maybe123.top:8080/getUser.action?name=' + this.formInline.user)
            .then(function (Response) {
              var userInfo = Response.data
              _this.loading = false
              if (userInfo.u_password === _this.formInline.password) {
                sessionStorage.setItem('u_name', userInfo.u_name)
                sessionStorage.setItem('u_address', userInfo.u_address)
                sessionStorage.setItem('u_sex', userInfo.u_sex)
                sessionStorage.setItem('u_email', userInfo.u_email)
                sessionStorage.setItem('u_birthday', userInfo.u_birthday)
                sessionStorage.setItem('u_password', userInfo.u_password)
                sessionStorage.setItem('Id', userInfo.id)
                sessionStorage.setItem('islogin', true)
                _this.$Message.success('登录成功!')
                _this.islogin = true
                _this.login = false
              } else {
                _this.$Message.error('密码错误!')
                _this.islogin = false
                _this.login = true
                sessionStorage.setItem('islogin', false)
              }
            })
            .catch(function (erro) {
              _this.$Message.error(erro)
            })
        } else {
          this.$Message.error('登录失败!')
          this.islogin = false
          this.loading = false
          this.login = true
        }
      })
    }
  },
  mounted () {
    sessionStorage.setItem('islogin', false)
    if (sessionStorage.getItem('u_name') !== null) {
      this.islogin = true
      this.formInline.user = sessionStorage.getItem('u_name')
    }
  }

}
</script>

<style scoped>
  .touxiang{
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    overflow: hidden;
    border: #759405 ;
    border-radius: 50% 50%;
    color: #759405;background-color: ghostwhite
  }
  .touxiang:hover{
    cursor: pointer;
    color: #a0cf0b;background-color: ghostwhite
  }
  header{
    background: #666633;
  }
  footer{

  }
  .model{
    background-color:#666633 ;

  }

  .copyright{

    font-family: 华文楷体;
    size: 32px;
  }
  .logo{
    font-family: Algerian;
    font-size: 20px;
    color: aliceblue;

  }
  #bg{
    z-index: 1000;
    position: absolute;
  }
</style>
