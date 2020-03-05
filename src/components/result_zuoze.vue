<template>
  <div >

    <Card border="true" >
      <p slot="title">搜索结果</p>
      <Row   justify="start" align="top" style="padding-top: 15px;background:#f5f5f5;padding-bottom: 15px;padding-right: 3%">
        <Col span="24"><Input v-model="search" icon="ios-search-outline"  @on-click="searchre()" @on-enter="searchre()" style="width:100%" placeholder="请输入搜索内容" search /></Col>
        <Col v-for="item in recom_data" :xs="18" :sm="10" :md="6" :lg="4" offset="2" style="padding-top: 30px;">
          <Card  style="height: 390px;text-align: center;">
            <img  class="img_border" width="100%" height="120px"  :title="item.prose_titl" :alt="item.prose_titl" v-lazy="item.prose_img" :key="item.prose_img">
            <h3 style="color: black;padding-top: 10px" >{{item.prose_titl}}</h3>
            <h4 style="text-align: left;padding-top: 8px"> 作者：<a>{{item.prose_author}}</a></h4>
            <h4 style="text-align: left;padding-bottom: 10px">分类：<a>{{item.prose_classify}}</a></h4>

            <p style="">{{item.some_content}}</p>

            <i-button  type="text" @click="tex(item.prose_titl,item.id)" :to="{name:'tex',params:{title:item.prose_titl}}" style="position: absolute;bottom: 5px;right: 5px" >阅读更多...</i-button></Card>
        </Col>

      </Row>

    </Card>

  </div>
</template>
<script>
  export default {
    name: 'result_zuoze',
    data: function () {
      return {
        speed: 3000,
        search: null,
        pageNow: 1,
        pageLast: null,
        pageSize: 16,
        value: 0,
        total: 100,
        car_value: 0,
        recom_data: [],
        recom_person_data: [{}],
        recom_pome_data: [{content: '他生莫作有情痴，人间无地着相思。', author: '——况周颐 《减字浣溪沙》'}, {content: '他生莫作有情痴，人间无地着相思。', author: '——况周颐 《减字浣溪沙》'}, {content: '他生莫作有情痴，人间无地着相思。', author: '——况周颐 《减字浣溪沙》'}]
      }
    },
    methods: {
      tex: function (aa, bb) {
        sessionStorage.setItem('nowTex', aa)
        sessionStorage.setItem('nextTex', this.recom_data[bb] === undefined ? '没有合适的下一篇,请返回首页！' : this.recom_data[bb].prose_titl)
        sessionStorage.setItem('BacTex', this.recom_data[bb - 2] === undefined ? '没有上一篇' : this.recom_data[bb - 2].prose_titl)
        this.$router.push({name: 'tex'})
      },
      searchre: function () {
        if (this.search !== null) {
          sessionStorage.setItem('search', this.search)
          var th = this
          // alert(this.recom_data)
          // 获取分页文章
          this.$Loading.start()
          this.$axios.get('http://www.maybe123.top:8080/getProseOne.action?title=' + sessionStorage.getItem('search'))
            .then(function (response) {
              th.recom_data = []

              if (response.data.prose_titl !== undefined) {
                th.recom_data.push(response.data)
                var count = 0
                for (var it in th.recom_data) {
                  th.recom_data[it]['some_content'] = th.recom_data[it]['prose_content'].substring(0, 60) + '...'
                  // alert('数据：' + th.recom_data[it]['prose_content'])

                  count++
                }
                th.total = count
              }
            }).catch(function (err) {
            alert(err)
          })

          th.$Loading.finish()
        }
      },
      texTj: function (aa) {
        sessionStorage.setItem('nowTex', aa)
        this.$router.push({name: 'tex'})
      },
      pageChange: function () {
        this.pageLast = this.pageNow
      },
      backPage: function () {
        var th = this
        th.$Loading.start()
        var getString = 'http://www.maybe123.top:8080/getProsePage.action?page=' + (th.pageNow - 1 < 0 ? 1 : th.pageNow - 1)
        this.$axios.get(getString)
          .then(function (response) {
            if (response.data[0] == null) {
              th.$Message.error('当前已经是第一页！')
              th.$Loading.finish()
              return
            }
            th.recom_data = response.data
            for (var it in th.recom_data) {
              th.recom_data[it]['some_content'] = th.recom_data[it]['prose_content'].substring(0, 60) + '...'
              // alert('数据：' + th.recom_data[it]['prose_content'])
            }
            th.$Loading.finish()
            th.pageNow = th.pageNow - 1 < 0 ? 1 : th.pageNow - 1
          }).catch(function (err) {
          alert(err)
        })
      },
      nextPage: function () {
        var th = this
        this.$Loading.start()
        var getString = 'http://www.maybe123.top:8080/getProsePage.action?page=' + (th.pageNow + 1)
        this.$axios.get(getString)
          .then(function (response) {
            if (response.data[0] == null) {
              th.$Message.error('当前已经是最后一页！')
              th.$Loading.finish()
              return
            }
            th.recom_data = response.data
            for (var it in th.recom_data) {
              th.recom_data[it]['some_content'] = th.recom_data[it]['prose_content'].substring(0, 60) + '...'
              // alert('数据：' + th.recom_data[it]['prose_content'])
            }
            th.pageNow++
            th.$Loading.finish()
          }).catch(function (err) {
          alert(err)
        })
      },
      goToPage: function () {
        var th = this
        this.$Loading.start()
        var getString = 'http://www.maybe123.top:8080/getProsePage.action?page=' + (th.pageNow)
        this.$axios.get(getString)
          .then(function (response) {
            if (response.data[0] == null) {
              th.$Message.error('当前页不存在！')
              th.pageNow = th.pageLast
              th.$Loading.finish()
              return
            }
            th.recom_data = response.data
            for (var it in th.recom_data) {
              th.recom_data[it]['some_content'] = th.recom_data[it]['prose_content'].substring(0, 60) + '...'
              // alert('数据：' + th.recom_data[it]['prose_content'])
            }
            th.$Loading.finish()
          }).catch(function (err) {
          alert(err)
        })
      }
    },
    mounted: function () {
      var th = this
      // alert(this.recom_data)
      // 获取分页文章
      this.$Loading.start()
      this.$axios.get('http://www.maybe123.top:8080/getProseOne.action?title=' + sessionStorage.getItem('search'))
        .then(function (response) {
          if(response.data.prose_titl!==undefined){
            th.recom_data.push(response.data)
            var count = 0
            for (var it in th.recom_data) {
              th.recom_data[it]['some_content'] = th.recom_data[it]['prose_content'].substring(0, 60) + '...'
              // alert('数据：' + th.recom_data[it]['prose_content'])

              count++
            }
            th.total = count}
        }).catch(function (err) {
        alert(err)
      })

      th.$Loading.finish()
    }

  }
</script>

<style scoped>
  /*img{background-size: contain}*/

  .title_author{
    position: absolute;
    top:20%;
    left: 10%;
    font-family: 华文行楷;
    color: black;
    font-size: 25px;
    opacity: 0.8;
  }
  .img_border{
    display: block;
    border: solid 2px;
    border-color: #eedfe3;
    z-index: -1;
  }
  .car_text{
    position: absolute;
    opacity: 0.7;
    background-color: rgba(71,73,74,0.84);
    color: #f7f7f7;
    opacity: 0.8;
    width: 360px;
    text-align: center;
    top: 20%;
    font-family: 华文楷体;
    font-size: 30px;
  }
  .car_text:hover{
    cursor: pointer;
  }

</style>
