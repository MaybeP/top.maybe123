<template>
  <div style="background-color: #f5f5f5">
    <div class="logo" >

    </div>
    <Row align="top" style="opacity: 0.9" >
      <Col :xs="22" :sm="22" :md="16" :lg="14"   style="padding-top: 10px;padding-left: 10px">
        <Row>
          <Col span="24">
            <Card >
              <p slot="title">精美图文</p>
              <Row  >
                <Col  class="jm" v-for="item in jmtw_data" :xs="0" :sm="0" :md="4" :lg="4"><img :title="item.title" :src="item.imgurl"
                                                                                                width="100px" height="150px"
                />
                  <router-link class="aa" style="padding-left: 10px"  :to="{name:'tex',params:{title:item.title}}">{{item.title}}</router-link>
                </Col>

              </Row>
            </Card></Col>
          <Col span="24" style="padding-top: 10px">

            <Row align="top">
              <Col style="padding-right: 7px"  span="12"><Card><p slot="title">爱情</p>
                <a class="aa" slot="extra">更多</a>
                <Row> <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>
              <Col  span="12"><Card><p slot="title">伤感</p>
                <a class="aa" slot="extra">更多</a>
                <Row><Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>

            </Row>
          </Col>

          <Col span="24" style="padding-top: 10px">

            <Row align="top">
              <Col style="padding-right: 7px"  span="12"><Card><p slot="title">抒情</p>
                <a class="aa" slot="extra">更多</a>
                <Row> <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>
              <Col  span="12"><Card><p slot="title">散文诗</p>
                <a class="aa" slot="extra">更多</a>
                <Row><Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>

            </Row>
          </Col>

          <Col span="24" style="padding-top: 10px">

            <Row align="top">
              <Col style="padding-right: 7px"  span="12"><Card><p slot="title">写景</p>
                <a class="aa" slot="extra">更多</a>
                <Row> <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>
              <Col  span="12"><Card><p slot="title">叙事</p>
                <a class="aa" slot="extra">更多</a>
                <Row><Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>

            </Row>
          </Col>

          <Col span="24" style="padding-top: 10px">

            <Row align="top">
              <Col style="padding-right: 7px" span="12"><Card><p slot="title">优美</p>
                <a class="aa" slot="extra">更多</a>
                <Row> <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>
              <Col  span="12"><Card><p slot="title">游记</p>
                <a class="aa" slot="extra">更多</a>
                <Row><Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>

            </Row>
          </Col>

          <Col span="24" style="padding-top: 10px">

            <Row align="top">
              <Col style="padding-right: 7px" span="12"><Card><p slot="title">名家</p>
                <a class="aa" slot="extra">更多</a>
                <Row> <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>
              <Col  span="12"><Card><p slot="title">春天</p>
                <a class="aa" slot="extra">更多</a>
                <Row><Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>

            </Row>
          </Col>

          <Col span="24" style="padding-top: 10px">

            <Row align="top">
              <Col style="padding-right: 7px"  span="12"><Card><p slot="title">清明节</p>
                <a class="aa" slot="extra">更多</a>
                <Row> <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
              </Card></Col>

            </Row>
          </Col>
        </Row>
      </Col>

      <Col :xs="0" :sm="0" :md="5" :lg="8"  style="padding-top: 10px;padding-left: 20px" >
        <Row>
          <Col span="24">
            <Card>
              <p slot="title">栏目导航</p>
              <a href="#" class="aa">爱情</a>
              <a href="#" class="aa">伤感</a>
              <a href="#" class="aa">抒情</a>
              <a href="#" class="aa">散文诗</a>
              <a href="#" class="aa">写景</a>
              <a href="#" class="aa">叙事</a>
              <a href="#" class="aa">优美</a>
              <a href="#" class="aa">游记</a>
              <a href="#" class="aa">名家</a>
              <a href="#" class="aa">春天</a>
              <a href="#" class="aa">清明节</a>

            </Card>
          </Col>
          <Col style="padding-top: 10px" span="24"><Card >

            <p slot="title" >推荐阅读</p>
            <Row>
              <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
          </Card>
          </Col>

          <Col style="padding-top: 10px" span="24"><Card >

            <p slot="title" >热门阅读</p>
            <Row>
              <Col v-for="item in tj_yd"  span="24"><router-link :to="{name:'tex',params:{title:item.title}}" class="tj_a">{{item.title}}</router-link></Col></Row>
          </Card>
          </Col>
        </Row>
      </Col>

    </Row>

  </div>
</template>

<script>
export default {
  name: 'fenlei',
  data: function () {
    return {
      jmtw_data: [{title: '心雨.心愿', imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1552291032&di=b6aae81e42b8841071a6d6706fa37cae&src=http://img.besoo.com/file/201807/13/1tenxhk0b5o.jpg', href_to: ' '},
        {title: '心雨.心愿', imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1552290760&di=6d37ad5f970707a01f6e885e948381a3&src=http://pic36.photophoto.cn/20150722/0008118443651464_b.jpg', href_to: ' '},
        {title: '心雨.心愿', imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1552290760&di=6d37ad5f970707a01f6e885e948381a3&src=http://pic36.photophoto.cn/20150722/0008118443651464_b.jpg', href_to: ' '},
        {title: '心雨.心愿', imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1552290760&di=6d37ad5f970707a01f6e885e948381a3&src=http://pic36.photophoto.cn/20150722/0008118443651464_b.jpg', href_to: ' '},
        {title: '心雨.心愿', imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1552290760&di=6d37ad5f970707a01f6e885e948381a3&src=http://pic36.photophoto.cn/20150722/0008118443651464_b.jpg', href_to: ' '},
        {title: '心雨.心愿', imgurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1552290760&di=6d37ad5f970707a01f6e885e948381a3&src=http://pic36.photophoto.cn/20150722/0008118443651464_b.jpg', href_to: ' '}
      ],
      tj_yd: [{title: '那时我们太年轻', herf: ''},
        {title: '心雨.心愿', herf: ''},
        {title: '如果注定要一个人走', herf: ''},
        {title: '那时我们太年轻', herf: ''},
        {title: '素笺心语', herf: ''},
        {title: '先走后走', herf: ''},
        {title: '那时我们太年轻', herf: ''},
        {title: '素笺心语', herf: ''},
        {title: '如果注定要一个人走', herf: ''}
      ]
    }
  }
}
</script>

<style scoped>
  img{
    /*display: block;*/
    border: solid 2px;
    border-color: #eedfe3;
  }
  img:hover{
    cursor: pointer;
  }
  .aa{
    color: #666633;
    margin: 15px;

  }
  .logo{
    background: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1481235670,4284836716&fm=26&gp=0.jpg");
    background-size: contain;
    width: 100%;
    height: auto;
    position: fixed;
    top: 35px;
    bottom: 70px;
    opacity: 0.6;

  }

  .tj_a{
    color: #666633;
    margin: 15px;
  }
  .tj_a:hover{
    color: #c4ffcd;
  }
  .aa:hover{
    color: #ededed;
  }
</style>
