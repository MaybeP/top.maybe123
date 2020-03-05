<template>
  <div>
    <Table border :columns="columns" :data="tab_data">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">预览</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="yes(index)">通过</Button>
        <Button type="error" size="small" @click="remove(index)">不通过</Button>
      </template>
    </Table>
    <Drawer  width="80" title="文章预览" :closable="false" v-model="dr"><tex v-if="type===2"></tex>
      <div v-if="type===1">

        <Table border :columns="columns1" :data="audate">
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="photo">
            <img :src="row.au_imgsrc" width="100%" height="auto">
          </template>
        </Table>
      </div>
      <div v-if="type===3">暂无预览功能</div>

    </Drawer>
  </div>
</template>
<script>
  import tex from '@/components/tex'
  export default {
    data () {
      return {
        dr: false,
        type: 0,
        columns: [
          {
            title: '审核编号',
            key: 'id'
          },
          {
            title: '审核分类',
            key: 'aud_classify'
          },
          {
            title: '审核内容',
            key: 'aud_content'
          },
          {
            title: '当前状态',
            key: 'aud_result'
          },
          {
            title: '操作',
            slot: 'action',
            width: 300,
            align: 'center'
          }
        ],
        tab_data: [],
        columns1: [
          {
            title: '作者编号',
            key: 'id'
          },
          {
            title: '作者姓名',
            key: 'au_name'
          },
          {
            title: '作者国家',
            key: 'au_country'
          },
          {
            title: '工作',
            key: 'au_job'
          },
          {
            title: '作品',
            key: 'au_famous',
            width: 300
          },
          {
            title: '自我描述',
            key: 'au_say'
          },
          {
            title: '个人照片',
            slot: 'photo',
            width: 300

          }
        ],
        audate: []
      }
    },
    components: {tex},
    methods: {
      yes (index) {
        let th = this
        th.tab_data[index].aud_result = 2
        th.tab_data[index].Id = th.tab_data[index].id
        this.$axios.post('http://www.maybe123.top:8080/upAuditing.action?', 'bysjAuditing=' + JSON.stringify(th.tab_data[index]))
          .then(function (res) {
            th.$Message.success(res.data)
          })
          .catch(function (err) {
            alert(err)
          })
      },
      show (index) {
        this.dr = true
        let a = JSON.parse(this.tab_data[index].aud_content)
        // alert(this.tab_data[index].aud_content)
        if (this.tab_data[index].aud_classify === 2) {
          sessionStorage.setItem('nowTex', a[0].prose_titl)
          this.type = 2
        } else if (this.tab_data[index].aud_classify === 1) {
          this.type = 1
          var li = []
          li.push(a)
          this.audate = li
        } else {
          this.type = 3
        }
      },
      remove (index) {
        let th = this
        th.tab_data[index].aud_result = 2
        th.tab_data[index].Id = th.tab_data[index].id
        let a = JSON.parse(this.tab_data[index].aud_content)
        if (this.tab_data[index].aud_classify === 2) {
          a[0].prose_titl = 'delete_prose'
        } else if (this.tab_data[index].aud_classify === 1) {
          a.au_name = 'delete_author'
        } else {
          a.u_name = 'delete_user'
        }
        a.Id = a.id
        this.tab_data[index].aud_content = JSON.stringify(a)
        th.tab_data[index].aud_result = 3
        this.$axios.post('http://www.maybe123.top:8080/upAuditing.action?', 'bysjAuditing=' + JSON.stringify(th.tab_data[index]))
          .then(function (res) {
            th.$Message.success(res.data)
          })
          .catch(function (err) {
            alert(err)
          })
      }
    },
    mounted () {
      let th = this
      if (sessionStorage.getItem('islogin') === 'false') {
        this.$Message.error('请先登录！')
        this.$router.push({name: 'shouye'})
        return
      }

      if (sessionStorage.getItem('u_name').length > 3) {
        this.$Message.error('没有权限访问！')
        this.$router.push({name: 'shouye'})
        return
      }

      this.$axios.get('http://www.maybe123.top:8080/getAuditingAll.action')
        .then(function (res) {
          th.tab_data = res.data
          console.log(res)
        })
        .catch(function (err) {
          alert(err)
        })
    }
  }
</script>



// WEBPACK FOOTER //
// src/components/shenhe.vue
