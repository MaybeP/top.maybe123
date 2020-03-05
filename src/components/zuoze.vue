<template>
  <div >
    <Tupian></Tupian>
    <Card>
      <div style="text-align: center"><h4 solt="title">基本信息</h4></div>
      <Row type="flex"   justify="start">
        <Col :xs="0" :sm="2" :md="6" :lg="8" offset="0"> </Col>
        <Col :xs="24" :sm="20" :md="10" :lg="8" offset="0">
          <Form style=""  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem  @blur="filterMethod('formValidate')" label="用户名" prop="au_name">
              <div>{{this.formValidate.au_name}}</div>
            </FormItem>
            <FormItem style="display: none" @blur="filterMethod('formValidate')" label="用户名" prop="au_imgsrc">
              <Input type="text" v-model="formValidate.au_imgsrc"  placeholder="请输入国家"></Input>
            </FormItem>
            <FormItem label="国籍" prop="au_country">
              <Input type="text" v-model="formValidate.au_country"  placeholder="请输入国家"></Input>
            </FormItem>
            <FormItem label="工作" prop="au_job">
              <Input v-model="formValidate.au_job" placeholder="请输入你的国家"></Input>
            </FormItem>
            <FormItem label="作品" prop="au_famous">
              <Input type="textarea" :rows="2" :autosize="{minRows: 2,maxRows: 3}" v-model="formValidate.au_famous" placeholder="您需要我们介绍你的作品！类似于 《雷火》，《雷雨》"></Input>
            </FormItem>

            <FormItem label="个人介绍" prop="au_say">
              <Input type="textarea" :rows="2" :autosize="{minRows: 2,maxRows: 3}" v-model="formValidate.au_say" placeholder="请输入个人介绍"></Input>
            </FormItem>
            <FormItem style="text-align: center">
              <Button type="primary" @click="handleSubmit('formValidate')">注册</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form></Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  import Tupian from '@/components/tupian'
  export default {
    name: 'zuoze',
    data: function () {
      return { formValidate: {
          au_name: '',
          au_country: '',
          au_job: '',
          au_famous: '',
          au_say: '',
          au_imgsrc: ''

        },
        ruleValidate: {
          au_name: [

          ],
          au_imgsrc: [
            {
              required: true, message: '请先提交头像', trigger: 'blur'}
          ],
          au_country: [{
            required: true, message: '请输入国家', trigger: 'blur'}

          ],
          au_job: [
            {required: true, message: '工作不能为空！', trigger: 'blur'}

          ],
          au_famous: [
            {required: true, message: '输入作品', trigger: 'blur'}
          ],
          au_say: [
            {required: true, message: '输入个人描述', trigger: 'blur'}
          ]
        }

      }
    },
    components: {Tupian},
    methods: {
      handleSubmit (name) {
        this.formValidate.au_imgsrc = sessionStorage.getItem('au_imgsrc') == null ? '' : sessionStorage.getItem('au_imgsrc')

        this.$refs[name].validate((valid) => {
          if (valid) {
            let th = this
            // alert(this.formValidate.au_imgsrc)
            this.$axios.post('http://www.maybe123.top:8080/insertAuthor.action', 'author=' + JSON.stringify(th.formValidate))
              .then(function (res) {
                th.$Message.success(res.data)
                th.$router.push({name: 'shouye'})
              })
              .catch(function (err) {
                alert(err)
              })
          } else {
            this.$Message.error('请先提交头像，或者格式输入错误!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields()
        this.formValidate.au_name = sessionStorage.getItem('u_name')
      },
      filterMethod (name) {
        this.$refs[name].validateField(name, (valid) => {

        })
      }
    },
    mounted () {
      this.formValidate.au_name = sessionStorage.getItem('u_name')
      if (sessionStorage.getItem('islogin') === 'false') {
        this.$Message.error('请先登录！')
        this.$router.push({name: 'shouye'})
        return

      }
      let th = this
      this.$axios.get('http://www.maybe123.top:8080/getAuthorOne.action?name=' + th.formValidate.au_name)
        .then(function (res) {
          if (res.data.au_name != null) {
            th.$Message.error('已经存在作者身份，进入修改！')
            th.formValidate = res.data
          } else { th.$Message.error('尚未注册作者身份！') }
        })
        .catch(function (err) {
          alert(err)
        })
    }
  }
</script>

<style scoped>

</style>
