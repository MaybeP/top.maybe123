<template>
  <div id="main" style="background: #f5f5f5" >
    <div  :style="styleba" class="logo" ></div>

    <Row justify="center">
      <Col :xs="7" :sm="0" :md="0" :lg="0">
        <router-link :to="{name:'back',params:{pl_title:text_data.prose_titl}}">
          <div style="position: fixed;right: 0px;bottom: 80%;color: #324004">
            <Icon type="ios-text-outline" size="30"/></div></router-link></Col>
      <Col :xs="22" :sm="16" :md="16" :lg="16" style="padding-left: 20px"   >

        <div style="padding-top: 30px">
          <h1 slot="title" style="text-align: center">{{text_data.prose_titl}}</h1>

          <p style="text-align: center;padding-top: 10px"  >{{text_data.prose_time}}  来源:{{text_data.prose_from}} 作者:{{text_data.prose_author}} 阅读次数:{{text_data.prose_times}}</br></p>

          <p  style="text-align: center;padding-top: 30px;"  v-html="text_data.prose_content">{{text_data.prose_content}}</p></div>
      </Col>

      <Col :xs="0" :sm="7" :md="7" :lg="7" style="padding-left: 20px;padding-top: 30px">
        <Card  class="dh_lan">
          <p slot="title" >推荐阅读</p>
          <Row >
            <Col v-for="item in tj_yd"  span="24">
              <router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}
              </router-link></Col>
            <Col span="24" style="padding-top: 15px" ><div :style="styleba" class="dh_back1" > </div></Col>
            <!--        <Col span="24" style="padding-top: 15px" ><div class="dh_back" > </div></Col>-->
            <Col span="24" style="padding-top: 15px" ><div :style="styleba" class="dh_back" > </div></Col>
            <Col v-if="author_info.au_name!=null" span="24" style="padding-top: 50px"><Card >
              <div slot="title" style="font-size: 13px;"><Avatar  :src="author_info.au_imgsrc"></Avatar> {{author_info.au_name}} </div>
              <p>国籍：{{author_info.au_country}}</p>
              <p>职业：{{author_info.au_job}}</p>
              <p>代表作：{{author_info.au_famous}}</p>
              <p>{{author_info.au_say}}</p>

            </Card> </Col>
            <Col style="padding-top: 30px" span="24">
              <Card >
                <p slot="title">
                  <Icon type="ios-chatboxes-outline" ></Icon>
                  热门读后感
                </p>
                <router-link slot="extra" :to="{name:'back',params:{pl_title:this.$route.params.title}}">更多...</router-link>

                <Card dis-hover v-for="(item, index) in pl_data" :key="index" >
                  <div slot="title" style="font-family: 幼圆;"><Avatar  src="http://www.maybe123.top:888/image/face/1c8b3s0.334979844078376timg.jpgtimg.jpg">

                  </Avatar>  {{item.pl_man}}: </div>
                  <p > {{item.pl_content}}</p>
                </Card>

              </Card>

            </Col>
          </Row>

        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'tex',
    data: function () {
      return {
        value2: 1,
        // eslint-disable-next-line no-undef
        styleba: null,
        value3: 1,
        text_data: [{
        }],
        tj_yd: [{title: '那时我们太年轻', herf: ''},
          {title: '心雨.心愿', herf: ''},
          {title: '如果注定要一个人走', herf: ''},
          {title: '那时我们太年轻', herf: ''},
          {title: '素笺心语', herf: ''},
          {title: '先走后走', herf: ''},
          {title: '那时我们太年轻', herf: ''},
          {title: '素笺心语', herf: ''},
          {title: '如果注定要一个人走', herf: ''}
        ],
        pl_data: [{icon_src: 'http://img1.imgtn.bdimg.com/it/u=1218485516,264644399&fm=26&gp=0.jpg',
          pl_content: '我走过许多的地方，看过许多次数的云，喝多许多种类的酒，却只爱过一个正当最好年龄的人。',
          pl_man: '东方不败'},
          {icon_src: 'http://image.biaobaiju.com/uploads/20181007/16/1538901138-PeuZAynQfv.jpg',
            pl_content: '我走过许多的地方，看过许多次数的云，喝多许多种类的酒，却只爱过一个正当最好年龄的人。',
            pl_man: '东方不败'},
          {icon_src: 'http://img2.3lian.com/2014/f4/98/d/11.jpg',
            pl_content: '我走过许多的地方，看过许多次数的云，喝多许多种类的酒，却只爱过一个正当最好年龄的人。',
            pl_man: '东方不败'},
          {icon_src: 'http://sjbz.fd.zol-img.com.cn/t_s320x510/g5/M00/00/01/ChMkJ1fJUZyIVZpFAAHbMOCVgAAAAU9fABXgmIAAdtI432.jpg',
            pl_content: '我走过许多的地方，看过许多次数的云，喝多许多种类的酒，却只爱过一个正当最好年龄的人。',
            pl_man: '东方不败'}],
        author_info: [{}]
      }
    },
    mounted: function () {
      var th = this
      this.$Loading.start()
      this.$axios.get('http://www.maybe123.top:8080/getProseOne.action?title=' + (sessionStorage.getItem('nowTex')))
        .then(function (response) {
          th.text_data = response.data
          console.log(th.text_data.prose_content)
          // var a = th.text_data.prose_content.split('\r\n')
          var a = th.text_data.prose_content.split(/\n/g)
          for (var i = 0; i < a.length; i++) {
            if (!a[i].indexOf('<img')) {
              a[i] = a[i].replace(/width=..{0,5}/g, 'width="100%"  ').replace(/height=..{0,5}/g, 'height="auto"  ')
                .replace(/width:..{0,5}/g, 'width:100%;').replace(/height:..{0,5}/g, 'height:300px;')
            } else {
              a[i] = '<p style="text-align: left;font-size: 14px;text-indent: 2em;padding-top: 10px">' + a[i] + '</p>'
            }

          }
          var c = a.toString()

          c = c.replace(/,/g, ' ')
          th.styleba = {backgroundImage: 'url("' + th.text_data.prose_img + '")'}
          th.text_data.prose_content = c
          // alert(th.text_data.prose_content)
          th.$Loading.finish()

          // 加载作者信息
          th.$axios.get('http://www.maybe123.top:8080/getAuthorOne.action?name=' + th.text_data.prose_author)
            .then(function (res) {
              th.author_info = res.data
            })
            .catch(function (err) {
              alert(err)
            })
        })
        .catch(function (err) {
          alert(err)
        })
    },
    methods: {

    }
  }
</script>

<style scoped>
  /*.a{*/
  /*background: url("http://photo.16pic.com/00/18/75/16pic_1875062_b.jpg");*/
  /*background-size: cover;*/
  /*width: 50px;*/
  /*height: 50px;*/
  /*border-radius: 100% 10% 100% 10%;*/

  /*position: fixed;*/
  /*animation: myfirst 20s infinite;*/
  /*animation-play-state: running;*/
  /*z-index: -1;*/

  /*}*/
  /*.a:hover~{*/
  /*animation-play-state:paused;*/
  /*}*/
  @keyframes myfirst
  {
    0% {background-position: 0% 0%}
    20%{background-position: 50% 0% }
    40%{background-position: 50% 50%}
    60%{background-position: 100% 50%}
    80%{background-position: 100% 100%}
    100%{background-position: 0% 0%}
  }
  @keyframes mysecond
  {
    0% {background-position: 100% 0%}
    20%{background-position: 50% 0% }
    40%{background-position: 50% 50%}
    60%{background-position: 0% 50%}
    80%{background-position: 0% 100%}
    100%{background-position: 100% 0%}
  }
  .logo{
    /*background: url("http://www.maybe123.top:888/image/self/12.jpg");*/
    background-size: contain;
    width: 100%;
    height: auto;
    position: fixed;
    top: 35px;
    bottom: 70px;
    opacity: 0.1

  }
  .text_style{
    padding-left: 2em;
    text-align: center;
  }
  .aa{
    color: #666633;
    margin: 15px;

  }
  .aa:hover{
    color: #ededed;
  }
  .dh_back{
    background: url("http://www.maybe123.top:888/image/self/12.jpg");
    width: 100%;

    height: 200px;
    animation: myfirst 30s infinite;

  }
  .dh_back:hover{
    animation-play-state: paused;
  }
  .dh_back1:hover{
    animation-play-state: paused;
  }
  .dh_back1{

    width: 100%;

    height: 200px;
    animation: mysecond 30s infinite;
  }
  #main{

  }
  .dh_lan{

    width: 100%;

    height: auto;
  }
  .tj_a{
    color: #666633;
    margin: 15px;
  }
  .tj_a:hover{
    color: #c4ffcd;
  }
</style>
