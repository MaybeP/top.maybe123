<template>
  <div style=";padding-top: 20px">
    <Tabs @on-click="tabclicl()"  v-model="aa">
      <TabPane name="1" label="个人中心" icon="md-person" >
        <Row type="flex">
          <Col :xs="0" :sm="7" :md="9" :lg="9" offset="0"></Col>
          <Col :xs="24" :sm="10" :md="6" :lg="6"  offset="0">
            <Form style=""  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
              <FormItem  @blur="filterMethod('formValidate')" label="当前用户：" prop="u_name">
                <Avatar> {{this.formValidate.u_name}}</Avatar>
              </FormItem>
              <FormItem label="密码" prop="u_password">
                <i-button @click="xgmm()" v-if="this.passxg===false">修改密码</i-button>
                <Input v-else type="password" v-model="formValidate.u_password"  placeholder="请输入密码！"></Input>
              </FormItem>
              <FormItem label="邮箱" prop="u_email">
                <div v-if="isallchage===false">{{this.formValidate.u_email}}</div>
                <Input v-else v-model="formValidate.u_email" placeholder="请输入邮箱账号!"></Input>
              </FormItem>
              <FormItem label="地址" prop="city" >
                <div v-if="isallchage===false">{{this.formValidate.u_address}}</div>
                <Cascader v-else trigger="hover" :data="citys"  v-model="formValidate.city" size="small"></Cascader>
              </FormItem>
              <FormItem label="出生日期" prop="u_birthday">
                <div v-if="isallchage===false">{{this.formValidate.u_birthday}}</div>
                <DatePicker placement="top" size="small" v-else type="date" placeholder="选择出生日期" v-model="formValidate.u_birthday"></DatePicker>
              </FormItem>

              <FormItem label="性别" prop="u_sex">
                <div v-if="isallchage===false">{{this.formValidate.u_sex}}</div>
                <RadioGroup v-else v-model="formValidate.u_sex">
                  <Radio label="男">男</Radio>
                  <Radio label="女">女</Radio>
                </RadioGroup>
              </FormItem>
              <FormItem >
                <Button v-if="isallchage===false" type="primary" @click="isallchage=true">编辑</Button>
                <Button v-else type="primary" @click="handleSubmit('formValidate')">保存</Button>
                <Button v-if="isallchage===true" @click="isallchage=false;passxg=false" style="margin-left: 8px">取消</Button>
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Modal
          title="请验证原密码"
          v-model="passxgmd"
          ok-text="确认"
          cancel-text="取消"
          @on-ok="check"
          :closable="true">
          <Input v-model="supass" placeholder="请输入原密码!"></Input>
        </Modal>
      </TabPane>
      <TabPane name="2"  label="我的空间"  icon="md-happy"></TabPane>
      <TabPane  name="3" label="创作"  icon="ios-create-outline"><write></write></TabPane>
    </Tabs>
  </div>
</template>
<script>
import zuoze from '@/components/zuoze'
import write from '@/components/write'
export default {
  name: 'geren',
  aa: 0,
  data () {
    return {
      aa: 1,
      isallchage: false,
      supass: '',
      passxgmd: false,
      passxg: false,
      formValidate: {
        u_name: '',
        u_password: '',
        u_email: '',
        city: [],
        u_sex: '',
        u_birthday: '',
        u_address: '',
        Id: ''

      },
      ruleValidate: {
        u_name: [
        ],
        u_password: [{
          required: true, message: '请输入6-20位密码！', trigger: 'blur'},
        {type: 'string', min: 6, max: 20, message: '密码长度或格式错误！', trigger: 'blur'}
        ],
        u_email: [
          {required: true, message: '邮箱不能为空！', trigger: 'blur'},
          {type: 'email', message: '邮箱格式错误！', trigger: 'blur'}
        ],
        city: [

        ],
        u_sex: [
          {required: true, message: '请选择性别！', trigger: 'change'}
        ],
        u_birthday: [
          {required: true, type: 'date', message: '请选择出生日期！', trigger: 'change'}
        ]
      },
      citys: [
        {
          label: '北京市',
          value: '北京市'

        },
        {
          label: '天津市',
          value: '天津市'

        },
        {
          label: '河北省',
          value: '河北省',
          children: [
            {
              label: '石家庄市',
              value: '石家庄市'
            },
            {
              label: '唐山市',
              value: '唐山市'
            },
            {
              label: '秦皇岛市',
              value: '秦皇岛市'
            },
            {
              label: '邯郸市',
              value: '邯郸市'
            },
            {
              label: '邢台市',
              value: '邢台市'
            },
            {
              label: '保定市',
              value: '保定市'
            },
            {
              label: '张家口市',
              value: '张家口市'
            },
            {
              label: '承德市',
              value: '承德市'
            },
            {
              label: '沧州市',
              value: '1309'
            },
            {
              label: '廊坊市',
              value: '廊坊市'
            },
            {
              label: '衡水市',
              value: '衡水市'
            }
          ]
        },
        {
          label: '山西省',
          value: '山西省',
          children: [
            {
              label: '太原市',
              value: '太原市'
            },
            {
              label: '大同市',
              value: '大同市'
            },
            {
              label: '阳泉市',
              value: '阳泉市'
            },
            {
              label: '长治市',
              value: '长治市'
            },
            {
              label: '晋城市',
              value: '晋城市'
            },
            {
              label: '朔州市',
              value: '朔州市'
            },
            {
              label: '晋中市',
              value: '晋中市'
            },
            {
              label: '运城市',
              value: '运城市'
            },
            {
              label: '忻州市',
              value: '忻州市'
            },
            {
              label: '临汾市',
              value: '临汾市'
            },
            {
              label: '吕梁市',
              value: '吕梁市'
            }
          ]
        },
        {
          label: '内蒙古自治区',
          value: '内蒙古自治区',
          children: [
            {
              label: '呼和浩特市',
              value: '呼和浩特市'
            },
            {
              label: '包头市',
              value: '包头市'
            },
            {
              label: '乌海市',
              value: '乌海市'
            },
            {
              label: '赤峰市',
              value: '赤峰市'
            },
            {
              label: '通辽市',
              value: '通辽市'
            },
            {
              label: '鄂尔多斯市',
              value: '鄂尔多斯市'
            },
            {
              label: '呼伦贝尔市',
              value: '呼伦贝尔市'
            },
            {
              label: '巴彦淖尔市',
              value: '巴彦淖尔市'
            },
            {
              label: '乌兰察布市',
              value: '乌兰察布市'
            },
            {
              label: '兴安盟',
              value: '兴安盟'
            },
            {
              label: '锡林郭勒盟',
              value: '锡林郭勒盟'
            },
            {
              label: '阿拉善盟',
              value: '阿拉善盟'
            }
          ]
        },
        {
          label: '辽宁省',
          value: '辽宁省',
          children: [
            {
              label: '沈阳市',
              value: '沈阳市'
            },
            {
              label: '大连市',
              value: '大连市'
            },
            {
              label: '鞍山市',
              value: '鞍山市'
            },
            {
              label: '抚顺市',
              value: '抚顺市'
            },
            {
              label: '本溪市',
              value: '本溪市'
            },
            {
              label: '丹东市',
              value: '丹东市'
            },
            {
              label: '锦州市',
              value: '锦州市'
            },
            {
              label: '营口市',
              value: '营口市'
            },
            {
              label: '阜新市',
              value: '阜新市'
            },
            {
              label: '辽阳市',
              value: '辽阳市'
            },
            {
              label: '盘锦市',
              value: '盘锦市'
            },
            {
              label: '铁岭市',
              value: '铁岭市'
            },
            {
              label: '朝阳市',
              value: '朝阳市'
            },
            {
              label: '葫芦岛市',
              value: '葫芦岛市'
            }
          ]
        },
        {
          label: '吉林省',
          value: '吉林省',
          children: [
            {
              label: '长春市',
              value: '长春市'
            },
            {
              label: '吉林市',
              value: '吉林市'
            },
            {
              label: '四平市',
              value: '四平市'
            },
            {
              label: '辽源市',
              value: '辽源市'
            },
            {
              label: '通化市',
              value: '通化市'
            },
            {
              label: '白山市',
              value: '白山市'
            },
            {
              label: '松原市',
              value: '松原市'
            },
            {
              label: '白城市',
              value: '白城市'
            },
            {
              label: '延边朝鲜族自治州',
              value: '延边朝鲜族自治州'
            }
          ]
        },
        {
          label: '黑龙江省',
          value: '黑龙江省',
          children: [
            {
              label: '哈尔滨市',
              value: '哈尔滨市'
            },
            {
              label: '齐齐哈尔市',
              value: '齐齐哈尔市'
            },
            {
              label: '鸡西市',
              value: '鸡西市'
            },
            {
              label: '鹤岗市',
              value: '鹤岗市'
            },
            {
              label: '双鸭山市',
              value: '双鸭山市'
            },
            {
              label: '大庆市',
              value: '大庆市'
            },
            {
              label: '伊春市',
              value: '伊春市'
            },
            {
              label: '佳木斯市',
              value: '佳木斯市'
            },
            {
              label: '七台河市',
              value: '七台河市'
            },
            {
              label: '牡丹江市',
              value: '牡丹江市'
            },
            {
              label: '黑河市',
              value: '黑河市'
            },
            {
              label: '绥化市',
              value: '绥化市'
            },
            {
              label: '大兴安岭地区',
              value: '大兴安岭地区'
            }
          ]
        },
        {
          label: '上海市',
          value: '上海市'
        },
        {
          label: '江苏省',
          value: '江苏省',
          children: [
            {
              label: '南京市',
              value: '南京市'
            },
            {
              label: '无锡市',
              value: '无锡市'
            },
            {
              label: '徐州市',
              value: '徐州市'
            },
            {
              label: '常州市',
              value: '常州市'
            },
            {
              label: '苏州市',
              value: '苏州市'
            },
            {
              label: '南通市',
              value: '南通市'
            },
            {
              label: '连云港市',
              value: '连云港市'
            },
            {
              label: '淮安市',
              value: '淮安市'
            },
            {
              label: '盐城市',
              value: '盐城市'
            },
            {
              label: '扬州市',
              value: '扬州市'
            },
            {
              label: '镇江市',
              value: '镇江市'
            },
            {
              label: '泰州市',
              value: '泰州市'
            },
            {
              label: '宿迁市',
              value: '宿迁市'
            }
          ]
        },
        {
          label: '浙江省',
          value: '浙江省',
          children: [
            {
              label: '杭州市',
              value: '杭州市'
            },
            {
              label: '宁波市',
              value: '宁波市'
            },
            {
              label: '温州市',
              value: '温州市'
            },
            {
              label: '嘉兴市',
              value: '嘉兴市'
            },
            {
              label: '湖州市',
              value: '湖州市'
            },
            {
              label: '绍兴市',
              value: '绍兴市'
            },
            {
              label: '金华市',
              value: '金华市'
            },
            {
              label: '衢州市',
              value: '衢州市'
            },
            {
              label: '舟山市',
              value: '舟山市'
            },
            {
              label: '台州市',
              value: '台州市'
            },
            {
              label: '丽水市',
              value: '丽水市'
            }
          ]
        },
        {
          label: '安徽省',
          value: '安徽省',
          children: [
            {
              label: '合肥市',
              value: '合肥市'
            },
            {
              label: '芜湖市',
              value: '芜湖市'
            },
            {
              label: '蚌埠市',
              value: '蚌埠市'
            },
            {
              label: '淮南市',
              value: '淮南市'
            },
            {
              label: '马鞍山市',
              value: '马鞍山市'
            },
            {
              label: '淮北市',
              value: '淮北市'
            },
            {
              label: '铜陵市',
              value: '铜陵市'
            },
            {
              label: '安庆市',
              value: '安庆市'
            },
            {
              label: '黄山市',
              value: '黄山市'
            },
            {
              label: '滁州市',
              value: '滁州市'
            },
            {
              label: '阜阳市',
              value: '阜阳市'
            },
            {
              label: '宿州市',
              value: '宿州市'
            },
            {
              label: '巢湖市',
              value: '巢湖市'
            },
            {
              label: '六安市',
              value: '六安市'
            },
            {
              label: '亳州市',
              value: '亳州市'
            },
            {
              label: '池州市',
              value: '池州市'
            },
            {
              label: '宣城市',
              value: '宣城市'
            }
          ]
        },
        {
          label: '福建省',
          value: '福建省',
          children: [
            {
              label: '福州市',
              value: '福州市'
            },
            {
              label: '厦门市',
              value: '厦门市'
            },
            {
              label: '莆田市',
              value: '莆田市'
            },
            {
              label: '三明市',
              value: '三明市'
            },
            {
              label: '泉州市',
              value: '泉州市'
            },
            {
              label: '漳州市',
              value: '漳州市'
            },
            {
              label: '南平市',
              value: '南平市'
            },
            {
              label: '龙岩市',
              value: '龙岩市'
            },
            {
              label: '宁德市',
              value: '宁德市'
            }
          ]
        },
        {
          label: '江西省',
          value: '江西省',
          children: [
            {
              label: '南昌市',
              value: '南昌市'
            },
            {
              label: '景德镇市',
              value: '景德镇市'
            },
            {
              label: '萍乡市',
              value: '萍乡市'
            },
            {
              label: '九江市',
              value: '九江市'
            },
            {
              label: '新余市',
              value: '新余市'
            },
            {
              label: '鹰潭市',
              value: '鹰潭市'
            },
            {
              label: '赣州市',
              value: '赣州市'
            },
            {
              label: '吉安市',
              value: '吉安市'
            },
            {
              label: '宜春市',
              value: '宜春市'
            },
            {
              label: '抚州市',
              value: '抚州市'
            },
            {
              label: '上饶市',
              value: '上饶市'
            }
          ]
        },
        {
          label: '山东省',
          value: '山东省',
          children: [
            {
              label: '济南市',
              value: '济南市'
            },
            {
              label: '青岛市',
              value: '青岛市'
            },
            {
              label: '淄博市',
              value: '淄博市'
            },
            {
              label: '枣庄市',
              value: '枣庄市'
            },
            {
              label: '东营市',
              value: '东营市'
            },
            {
              label: '烟台市',
              value: '烟台市'
            },
            {
              label: '潍坊市',
              value: '潍坊市'
            },
            {
              label: '济宁市',
              value: '济宁市'
            },
            {
              label: '泰安市',
              value: '泰安市'
            },
            {
              label: '威海市',
              value: '威海市'
            },
            {
              label: '日照市',
              value: '日照市'
            },
            {
              label: '莱芜市',
              value: '莱芜市'
            },
            {
              label: '临沂市',
              value: '临沂市'
            },
            {
              label: '德州市',
              value: '德州市'
            },
            {
              label: '聊城市',
              value: '聊城市'
            },
            {
              label: '滨州市',
              value: '滨州市'
            },
            {
              label: '菏泽市',
              value: '菏泽市'
            }
          ]
        },
        {
          label: '河南省',
          value: '河南省',
          children: [
            {
              label: '郑州市',
              value: '郑州市'
            },
            {
              label: '开封市',
              value: '开封市'
            },
            {
              label: '洛阳市',
              value: '洛阳市'
            },
            {
              label: '平顶山市',
              value: '平顶山市'
            },
            {
              label: '安阳市',
              value: '安阳市'
            },
            {
              label: '鹤壁市',
              value: '鹤壁市'
            },
            {
              label: '新乡市',
              value: '新乡市'
            },
            {
              label: '焦作市',
              value: '焦作市'
            },
            {
              label: '濮阳市',
              value: '濮阳市'
            },
            {
              label: '许昌市',
              value: '许昌市'
            },
            {
              label: '漯河市',
              value: '漯河市'
            },
            {
              label: '三门峡市',
              value: '三门峡市'
            },
            {
              label: '南阳市',
              value: '南阳市'
            },
            {
              label: '商丘市',
              value: '商丘市'
            },
            {
              label: '信阳市',
              value: '信阳市'
            },
            {
              label: '周口市',
              value: '周口市'
            },
            {
              label: '驻马店市',
              value: '驻马店市'
            }
          ]
        },
        {
          label: '湖北省',
          value: '湖北省',
          children: [
            {
              label: '武汉市',
              value: '武汉市'
            },
            {
              label: '黄石市',
              value: '黄石市'
            },
            {
              label: '十堰市',
              value: '十堰市'
            },
            {
              label: '宜昌市',
              value: '宜昌市'
            },
            {
              label: '襄樊市',
              value: '襄樊市'
            },
            {
              label: '鄂州市',
              value: '鄂州市'
            },
            {
              label: '荆门市',
              value: '荆门市'
            },
            {
              label: '孝感市',
              value: '孝感市'
            },
            {
              label: '荆州市',
              value: '荆州市'
            },
            {
              label: '黄冈市',
              value: '黄冈市'
            },
            {
              label: '咸宁市',
              value: '咸宁市'
            },
            {
              label: '随州市',
              value: '随州市'
            },
            {
              label: '恩施土家族苗族自治州',
              value: '恩施土家族苗族自治州'
            }
          ]
        },
        {
          label: '湖南省',
          value: '湖南省',
          children: [
            {
              label: '长沙市',
              value: '长沙市'
            },
            {
              label: '株洲市',
              value: '株洲市'
            },
            {
              label: '湘潭市',
              value: '湘潭市'
            },
            {
              label: '衡阳市',
              value: '衡阳市'
            },
            {
              label: '邵阳市',
              value: '邵阳市'
            },
            {
              label: '岳阳市',
              value: '岳阳市'
            },
            {
              label: '常德市',
              value: '常德市'
            },
            {
              label: '张家界市',
              value: '张家界市'
            },
            {
              label: '益阳市',
              value: '益阳市'
            },
            {
              label: '郴州市',
              value: '郴州市'
            },
            {
              label: '永州市',
              value: '永州市'
            },
            {
              label: '怀化市',
              value: '怀化市'
            },
            {
              label: '娄底市',
              value: '娄底市'
            },
            {
              label: '湘西土家族苗族自治州',
              value: '湘西土家族苗族自治州'
            }
          ]
        },
        {
          label: '广东省',
          value: '广东省',
          children: [
            {
              label: '广州市',
              value: '广州市'
            },
            {
              label: '韶关市',
              value: '韶关市'
            },
            {
              label: '深圳市',
              value: '深圳市'
            },
            {
              label: '珠海市',
              value: '珠海市'
            },
            {
              label: '汕头市',
              value: '汕头市'
            },
            {
              label: '佛山市',
              value: '佛山市'
            },
            {
              label: '江门市',
              value: '江门市'
            },
            {
              label: '湛江市',
              value: '湛江市'
            },
            {
              label: '茂名市',
              value: '茂名市'
            },
            {
              label: '肇庆市',
              value: '肇庆市'
            },
            {
              label: '惠州市',
              value: '惠州市'
            },
            {
              label: '梅州市',
              value: '梅州市'
            },
            {
              label: '汕尾市',
              value: '汕尾市'
            },
            {
              label: '河源市',
              value: '河源市'
            },
            {
              label: '阳江市',
              value: '阳江市'
            },
            {
              label: '清远市',
              value: '清远市'
            },
            {
              label: '东莞市',
              value: '东莞市'
            },
            {
              label: '中山市',
              value: '中山市'
            },
            {
              label: '潮州市',
              value: '潮州市'
            },
            {
              label: '揭阳市',
              value: '揭阳市'
            },
            {
              label: '云浮市',
              value: '云浮市'
            }
          ]
        },
        {
          label: '广西壮族自治区',
          value: '广西壮族自治区',
          children: [
            {
              label: '南宁市',
              value: '南宁市'
            },
            {
              label: '柳州市',
              value: '柳州市'
            },
            {
              label: '桂林市',
              value: '桂林市'
            },
            {
              label: '梧州市',
              value: '梧州市'
            },
            {
              label: '北海市',
              value: '北海市'
            },
            {
              label: '防城港市',
              value: '防城港市'
            },
            {
              label: '钦州市',
              value: '钦州市'
            },
            {
              label: '贵港市',
              value: '贵港市'
            },
            {
              label: '玉林市',
              value: '玉林市'
            },
            {
              label: '百色市',
              value: '百色市'
            },
            {
              label: '贺州市',
              value: '贺州市'
            },
            {
              label: '河池市',
              value: '河池市'
            },
            {
              label: '来宾市',
              value: '来宾市'
            },
            {
              label: '崇左市',
              value: '崇左市'
            }
          ]
        },
        {
          label: '海南省',
          value: '海南省',
          children: [
            {
              label: '海口市',
              value: '海口市'
            },
            {
              label: '三亚市',
              value: '三亚市'
            }
          ]
        },
        {
          label: '重庆市',
          value: '重庆市',
          children: [
            {
              label: '重庆市',
              value: '重庆市'
            }
          ]
        },
        {
          label: '四川省',
          value: '四川省',
          children: [
            {
              label: '成都市',
              value: '成都市'
            },
            {
              label: '自贡市',
              value: '自贡市'
            },
            {
              label: '攀枝花市',
              value: '攀枝花市'
            },
            {
              label: '泸州市',
              value: '泸州市'
            },
            {
              label: '德阳市',
              value: '德阳市'
            },
            {
              label: '绵阳市',
              value: '绵阳市'
            },
            {
              label: '广元市',
              value: '广元市'
            },
            {
              label: '遂宁市',
              value: '遂宁市'
            },
            {
              label: '内江市',
              value: '内江市'
            },
            {
              label: '乐山市',
              value: '乐山市'
            },
            {
              label: '南充市',
              value: '南充市'
            },
            {
              label: '眉山市',
              value: '眉山市'
            },
            {
              label: '宜宾市',
              value: '宜宾市'
            },
            {
              label: '广安市',
              value: '广安市'
            },
            {
              label: '达州市',
              value: '达州市'
            },
            {
              label: '雅安市',
              value: '雅安市'
            },
            {
              label: '巴中市',
              value: '巴中市'
            },
            {
              label: '资阳市',
              value: '资阳市'
            },
            {
              label: '阿坝藏族羌族自治州',
              value: '阿坝藏族羌族自治州'
            },
            {
              label: '甘孜藏族自治州',
              value: '甘孜藏族自治州'
            },
            {
              label: '凉山彝族自治州',
              value: '凉山彝族自治州'
            }

          ]
        },
        {
          label: '其他地区',
          value: '其他地区'
        }
      ]

    }
  },
  components: { zuoze, write},
  methods: {
    tabclicl: function () {
      if (this.aa === 3) {
        var a_name = sessionStorage.getItem('u_name');
        let th = this;
        this.$axios.get('http://www.maybe123.top:8080/getAuthorOne.action?name=' + a_name)
          .then(function (res) {
            if (res.data.au_name != null) {
            } else {
              th.$Message.error('尚未注册作者身份！');
              th.$router.push({name: 'zuoze'})
            }
          })
          .catch(function (err) {
            alert(err)
          })
      }
    },
    xgmm: function () {
      this.passxgmd = true
    },
    check: function () {
      if (this.formValidate.u_password === this.supass) {
        this.$Message.success('验证通过！');
        this.passxg = true;
        this.isallchage = true
      } else {
        this.$Message.error('验证不通过！')
      }
    },
    handleSubmit (name) {
      console.log(this.formValidate.city.toString());
      this.$refs[name].validate((valid) => {
        if (valid) {
          let th = this;
          th.formValidate.u_address = th.formValidate.city.toString();
          // th.formValidate.deleteIndex('city')

          th.$axios.post('http://www.maybe123.top:8080/updateUser.action?', 'user=' + JSON.stringify(th.formValidate))
            .then(function (res) {
              th.$Message.success(res.data);
              th.isallchage = false;
              sessionStorage.setItem('u_name', th.formValidate.u_name);
              sessionStorage.setItem('u_address', th.formValidate.u_address);
              sessionStorage.setItem('u_sex', th.formValidate.u_sex);
              sessionStorage.setItem('u_email', th.formValidate.u_email);
              sessionStorage.setItem('u_birthday', th.formValidate.u_birthday);
              sessionStorage.setItem('u_password', th.formValidate.u_password);
            })
            .catch(function (err) {
              alert(err)
            })
        } else {
          this.$Message.error('格式错误!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    filterMethod (name) {
      this.$refs[name].validateField(name, (valid) => {

      })
    }
  },
  mounted: function () {
    this.formValidate.u_name = sessionStorage.getItem('u_name')
    this.formValidate.u_address = sessionStorage.getItem('u_address')
    this.formValidate.u_password = sessionStorage.getItem('u_password')
    this.formValidate.u_sex = sessionStorage.getItem('u_sex')
    this.formValidate.u_email = sessionStorage.getItem('u_email')
    this.formValidate.u_birthday = sessionStorage.getItem('u_birthday')
    this.formValidate.Id = sessionStorage.getItem('Id')
    this.formValidate.city = this.formValidate.u_address.split(',')
  }
}
</script>
