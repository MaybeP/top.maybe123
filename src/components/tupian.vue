<template>
  <div style="text-align: center">
    <Card>
      <p slot="title">个人照片</p>
      <Upload
        v-if="file=='尚未选择'"
        :before-upload="handleUpload"
        type="drag"
        accept=".jpg,.img"
        name="imag"
        :on-success="onsuccess"
        :on-progress="onprogress"
        :on-error="onerror"
        action="http://www.maybe123.top:8080/uptext.action">
        <div style="padding: 20px 0;border-color: #324004">
          <Icon type="ios-cloud-upload" size="52" style="color: #324004"></Icon>
          <p id="up_tex">选择图片</p>
        </div>
      </Upload>

      <Tooltip  placement="right" max-width="100" :content="tip"><div style="text-align: center" @click="file='尚未选择';tip='点击提交，出现识别信息'"><img style="display: none;border-radius: 10px 10px 10px 10px" id="im" width="auto" height="200px"/></div>
      </Tooltip>
      <div v-if="file!=='尚未选择'">已选择头像: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ this.isup==true ? '再次提交' : '提交' }}</Button></div>

    </Card>
  </div>
</template>
<script>
  export default {
    name: 'tupian',
    data () {
      return {
        isup: false,
        file: '尚未选择',
        loadingStatus: false,
        aftername: '',
        tip: '点击提交，出现识别信息'
      }
    },
    methods: {
      onerror (error) {
        alert(error)
      },
      onsuccess () {
        this.$Message.success('图片上传成功！')
      },
      onprogress () {
        this.loadingStatus = true
      },
      ab () {
        var date = new Date()
        var a = ['0a', '1c', '2r', '3s', '4h', '5b', '6o', '7p', '8b', '9w']
        a.reverse()
        var times = Math.random()
        var uid = ''
        uid += a[date.getDate() % 10] + a[date.getHours() % 10] + a[date.getSeconds() % 10] + Math.abs(times)
        // document.getElementById('a').value = uid
        return uid
      },
      handleUpload (file) {
        var reader = new FileReader()
        reader.onload = function () {
          document.querySelector('#im').src = reader.result
          document.querySelector('#im').style.display = 'inline'
        }
        reader.readAsDataURL(file)
        this.file = file
        return false
      },
      upload () {
        this.loadingStatus = true
        let th = this
        this.aftername = this.ab() + th.file.name
        let formData = new FormData()
        formData.append('imag_name', th.aftername)
        formData.append('imag', this.file)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        th.$Loading.start()
        this.$axios.post('http://www.maybe123.top:8080/upface.action?',
          formData, config)
          .then(function (result) {
            // th.file = null
            th.isup = true
            th.loadingStatus = false
            if (result.data.result_num !== 1) {
              th.$Message.error('未检查到人脸或人脸数过多！,请重新选择其它图片！')
              th.tip = '未检查到人脸或人脸数过多！,请重新选择其它图片！'
            } else {
              if (result.data.result[0].face_probability !== 1) {
                th.$Message.error('未检查到人脸！,请重新选择其它图片！')
                th.tip = '未检查到人脸！,请重新选择其它图片！'
              } else {
                th.$Message.success('上传成功！')
                sessionStorage.setItem('au_imgsrc', 'http://www.maybe123.top:888/image/face/' + th.aftername + th.file.name)
                th.tip = '年龄：' + result.data.result[0].age + '\r\n评分:' + result.data.result[0].beauty + '\r\n性别：' + (result.data.result[0].gender === 'female' ? '女' : '男')
              }
            }
            th.$Loading.finish()
          })
          .catch(
            function (err) {
              alert(err)
              th.file = null
            }
          )
        // 调用图片识别接口
      }
    }
  }
</script>
