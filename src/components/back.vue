<template>
  <div>
    <div class="logo1" ></div>
    <Modal @on-visible-change="gotoTex()" v-model="model" fullscreen :title="title" :footer-hide="true">
      <Row>
        <Scroll v-if="this.pl_data[0]!=null" :on-reach-bottom="handleReachBottom"  :height="this.scheight" class="scrollbar" style="padding-bottom: 50px;" >
          <Card dis-hover v-for="(item, index) in pl_data" :key="index" >
            <div  style="font-family: 幼圆;">
              <Avatar style="color: #bcbebf;background-color: #307528" >{{item.comment_src}}
              </Avatar>  {{item.comment_date}} {{item.comment_person}}: </div>
            <p > {{item.comment_content}}</p>
          </Card>

        </Scroll>
        <div v-else>暂无数据</div>
        <div class="add_pl">
          <Row style="position: fixed;bottom: 20px">
            <Col span="18" offset="1"  > <input v-model="inpu" style="font-size: 20px;height: 30px;border:none;width: 100%; border-bottom:1px solid #bcbebf;outline: none;"
                                                placeholder="请输入读后感..."  /></Col>

            <Col span="3"  ><i-button type="text" style="font-size: 20px" @click="insPl()" >发送</i-button></Col></Row>
        </div>

        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      model: true,
      inpu: null,
      scheight: 430,
      title: sessionStorage.getItem('nowTex') + '的读后感',
      pl_data: [{}]
    }
  },
  methods: {
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          var th = this
          this.$axios.get('http://www.maybe123.top:8080/getCommentPage.action?lastid=' + (this.pl_data[this.pl_data.length - 1].id - 1))
            .then(function (res) {
              if (res.data[0] == null) {
                th.$Message.success('没有更多！')
                return
              }

              for (let i = 0; i < res.data.length; i++) {
                th.pl_data.push(res.data[i])
              }
              th.$Message.success('加载成功！')
              // // 冒泡排序
              // var temp
              // for (let m = 0; m < th.pl_data.length; m++) {
              //   for (let n = 0; n < th.pl_data.length; n++) {
              //     if (th.pl_data[n].id < th.pl_data[n + 1].id) {
              //       temp = th.pl_data[n]
              //       th.pl_data[n] = th.pl_data[n + 1]
              //       th.pl_data[n + 1] = temp
              //     }
              // }
              // }
            })
            // const last = this.pl_data[this.pl_data.length - 1]
            // for (let i = 0; i < 10; i++) {
            //   this.pl_data.push(last)
            // }
          resolve()
        }, 2000)
      })
    },
    gotoTex: function () {
      this.$router.push({name: 'tex'})
    },
    refrsh: function () {
      var th = this
      this.$axios.get('http://www.maybe123.top:8080/getComment.action?title=' + sessionStorage.getItem('nowTex'))
        .then(function (res) {
          th.pl_data = res.data
        })
        .catch(function (err) {
          alert(err)
        })
    },
    insPl: function () {
      var list = []
      let th = this
      var date = new Date()
      list.push({
        comment_person: sessionStorage.getItem('u_name'),
        comment_src: sessionStorage.getItem('u_name'),
        comment_content: this.inpu,
        comment_times: 0,
        comment_title: sessionStorage.getItem('nowTex'),
        comment_date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' + date.getHours() + ':' + date.getMinutes()
      })
      if (confirm('确定提交当前内容？')) {
        this.$axios.post('http://www.maybe123.top:8080/addComment.action?', 'comment=' + JSON.stringify(list))
          .then(function (res) {
            th.$Message.success(res.data.toString())
            th.inpu = null
            th.refrsh()
          })
          .catch(function (er) {
            alert(er)
          })
      }
    }
  },
  mounted () {
    this.scheight = window.screen.availHeight - 150
    var th = this
    this.$axios.get('http://www.maybe123.top:8080/getComment.action?title=' + sessionStorage.getItem('nowTex'))
      .then(function (res) {
        th.pl_data = res.data
      })
      .catch(function (err) {
        alert(err)
      })
  }
}
</script>
<style>
  .add_pl{
    position: absolute;
    padding-top: 3px;
    bottom: 0px;
    width: 100%;
    height: 40px;

  }
  .scollbar{

  }
  .input{

    border: none;
    border-bottom: 100%;
  }
  .scollbar::-webkit-scrollbar{
    display: none;
  }
  .logo1{
    background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552842344250&di=f802c11a7ecae98c82f05f668cb03d49&imgtype=0&src=http%3A%2F%2Fimg2.ooopic.com%2F12%2F39%2F21%2F19bOOOPIC5d_202.jpg");
    background-size: contain;
    width: 100%;
    height: auto;
    position: fixed;
    top: 35px;
    bottom: 70px;
    opacity: 0.1;

  }
</style>
