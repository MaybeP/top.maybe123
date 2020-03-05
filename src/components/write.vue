<template>
  <div>
    <Card>
      <h3 style="text-align: center" slot="title">编写文章</h3>
      <Row>
        <Col span="24"><Steps :current="current">
          <Step title="编写题目" content=""></Step>
          <Step title="文章信息" content=""></Step>
          <Step title="编写内容" content=""></Step>
          <Step title="等待审核" content=""></Step>
        </Steps></Col>
        <Col  span="24">
          <Row style="padding-top: 80px" v-if="current===0" >
            <Col span="10" offset="5"><Input  v-model="prose.prose_titl" placeholder="输入文章题目..."  /></Col>
            <Col span="4"><i-button @click="checktitle">查询</i-button></Col>
          </Row>

          <Row v-if="current===1">
            <Col span="6">分类：</Col>
            <Col span="18">
              <Select v-model="prose.prose_classify" style="width:200px">
                <Option v-for="item in fenlei" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="6">来源：</Col>
            <Col span="18"><Select v-model="prose.prose_from" style="width:200px">
              <Option v-for="item in laiyuan" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select></Col>
            <Col span="6">时间：</Col>
            <Col span="18"><DatePicker type="date" placeholder="选择发表日期" v-model="prose.prose_time"></DatePicker></Col>
            <Col span="6">封面图片：</Col>
            <Col span="18"><Input  v-model="prose.prose_img" placeholder="输入图片url..."  /></Col>
            <Col span="6">图片预览：</Col>
            <Col  span="18"><Card><img  :src="prose.prose_img" width="auto" height="200px"/></Card></Col>
            <Col span="6">作者：</Col>
            <Col span="18"><Input  v-model="prose.prose_author" placeholder="输入文章作者..."  /></Col>
            <Col style="padding-top: 50px" span="12"><i-button @click="current--">上一步</i-button></Col>
            <Col style="padding-top: 50px" span="12"><i-button @click="checkfenlei()">下一步</i-button></Col>
          </Row>

          <Row v-if="current===2">
            <Col span="10"><i-button @click="inserTex()" type="primary">插入图片识别数据</i-button></Col>
            <Col span="8" offset="6"><i-button @click="dr2=true" type="primary">插入图片</i-button></Col>
            <Drawer @on-close="addtext()" width="50" title="图片识别文字" :closable="false" v-model="dr"><texttp></texttp></Drawer>
            <Drawer @on-close="insertimg()" width="50" title="图片插入" :closable="false" v-model="dr2">
              <Row>
                <Col span="18"><Input  v-model="img" placeholder="输入图片url..."  /></Col>
                <Col span="6">图片预览：</Col>
                <Col  span="18"><Card><img  :src="img" width="auto" height="200px"/></Card></Col>
              </Row></Drawer>
            <Col span="23">
              <Input v-model="prose.prose_content" type="textarea" :autosize="{minRows: 10,maxRows: 30}" placeholder="输入你的文章信息..." />
            </Col>
            <Col style="padding-top: 50px" span="12"><i-button @click="current--">上一步</i-button></Col>
            <Col style="padding-top: 50px" span="12"><i-button @click="sub()">提交</i-button></Col>

          </Row>

        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import texttp from '@/components/texttp'
export default {
  name: 'write',
  data: function () {
    return {
      dr: false,
      dr2: false,
      img: '',
      fenlei: [{value: '爱情',
        label: '爱情'
      },
      {value: '伤感',
        label: '伤感'
      },
      {value: '抒情',
        label: '抒情'
      },
      {value: '散文诗',
        label: '散文诗'
      },
      {value: '写景',
        label: '写景'
      },
      {value: '叙事',
        label: '叙事'
      },
      {value: '优美',
        label: '优美'
      },
      {value: '游记',
        label: '游记'
      },
      {value: '名家',
        label: '名家'
      }
      ],
      laiyuan: [{value: '原创', label: '原创'}, {value: '其它', label: '其它'}],
      current: 0,
      prose: {
        prose_titl: '',
        prose_content: '',
        prose_time: '',
        prose_from: '',
        prose_author: '',
        prose_times: 0,
        prose_classify: '',
        prose_img: null
      }
    }
  },
  components: {texttp},
  methods: {
    checktitle () {
      let th = this
      if (this.prose.prose_titl != null) {
        this.$axios.get('http://www.maybe123.top:8080/getProseOne.action?title=' + (th.prose.prose_titl))
          .then(function (res) {
            if (res.data.prose_author != null) {
              if (res.data.prose_author === sessionStorage.getItem('u_name')) {
                th.prose = res.data
                th.prose.id = res.data.id
                th.$Message.warning('您当前名下存在同名作品，进入编辑模式！')
                th.current++
              } else { th.$Message.error('文章已存在！') }
            } else {
              th.current++
              th.$Message.success('验证通过')
            }
          })
          .catch(function (err) {
            alert(err)
          })
      } else { alert('请输入题目') }
    },
    inserTex () {
      this.dr = true
    },
    insertimg () {
      this.prose.prose_content += '\r\n<img  src="' + this.img + '" width="auto" height="200px"/>'
    },
    addtext () {
      this.prose.prose_content += sessionStorage.getItem('sb_text')
      sessionStorage.setItem('sb_text', '')
    },
    checkfenlei () {
      this.current++
    },
    sub () {
      let th = this
      var list = []
      list.push(th.prose)
      this.$axios.post('http://www.maybe123.top:8080/insertProse.action?', 'proses=' + JSON.stringify(list))
        .then(function (res) {
          th.$Message.success(res.data)
        })
        .catch(function (err) {
          alert(err)
        })
    }

  },
  mounted () {

  }

}
</script>

<style scoped>

</style>
