<template>
  <div class="user-info">
    <!-- 个人信息 -->
    <el-form label-width="220px" :data="userInfo">
      <!-- 工号 入职时间 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="userInfo.workNumber" class="inputW" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="userInfo.timeOfEntry"
              type="date"
              class="inputW"
              value-format="YYYY-MM-DD"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 姓名 部门 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="userInfo.username" class="inputW" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门">
            <el-input v-model="userInfo.departmentName" class="inputW" />
          </el-form-item>
        </el-col>
      </el-row>
      <!--手机 聘用形式  -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="手机">
            <el-input v-model="userInfo.mobile" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="聘用形式">
            <el-select v-model="userInfo.formOfEmployment" class="inputW">
              <el-option
                v-for="item in EmployeeEnum.hireType"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 员工照片 -->
      <el-row class="inline-info">
        <el-col :span="12">
          <el-form-item label="员工头像">
            <!-- 放置上传图片 -->
            <!-- update -->
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="onchange"

              :http-request="upload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <img v-else :src="newimgs" alt="" class="avatar">
              <!-- <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
            </el-upload>
            <el-progress
              v-if="showPercent"
              style="width: 180px"
              :percentage="percent"
            />
          </el-form-item>
        </el-col>
        <el-row type="flex" justify="end">
          <el-tooltip content="打印个人基本信息">
            <router-link :to="`/management/print/${firsetata.id}?type=personal`">
              <i class="el-icon-printer" />
            </router-link>
          </el-tooltip>
        </el-row>
      </el-row>
      <!-- 保存个人信息 -->
      <el-row class="inline-info" type="flex" justify="center">
        <el-col :span="12">
          <el-button type="primary" @click="saveUser">保存更新</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 基础信息 -->
    <el-form label-width="220px">
      <div class="block">
        <div class="title">基础信息</div>
        <el-form-item label="最高学历">
          <el-select
            v-model="formData.theHighestDegreeOfEducation"
            class="inputW2"
          >
            <el-option
              v-for="item in EmployeeEnum.highestDegree"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 个人头像 -->
        <!-- 员工照片 -->

        <el-form-item label="员工照片">
          <!-- 放置上传图片 -->
        </el-form-item>
        <el-form-item label="国家/地区">
          <el-select v-model="formData.nationalArea" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.isOverseas"
              :key="item.value"
              file-list
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="护照号">
          <el-input
            v-model="formData.passportNo"
            placeholder="正规护照格式"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="formData.idNumber"
            placeholder="正规身份证格式"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input
            v-model="formData.nativePlace"
            placeholder="籍贯地址"
            class="inputW5"
          />
        </el-form-item>
        <el-form-item label="民族">
          <el-input
            v-model="formData.nation"
            placeholder="请输入民族"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="婚姻状况">
          <el-select v-model="formData.maritalStatus" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.maritaStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-input
            v-model="formData.birthday"
            placeholder="示例 0323"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formData.age" type="number" class="inputW2" />
        </el-form-item>
        <el-form-item label="星座">
          <el-select v-model="formData.constellation" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.constellation"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="血型">
          <el-select v-model="formData.bloodType" class="inputW2">
            <el-option
              v-for="item in EmployeeEnum.bloodType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="户籍所在地">
          <el-input v-model="formData.domicile" class="inputW5" />
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input v-model="formData.politicalOutlook" class="inputW2" />
        </el-form-item>
        <el-form-item label="入党时间">
          <el-date-picker
            v-model="formData.timeToJoinTheParty"
            type="date"
            placeholder="选择日期"
            class="inputW"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="存档机构">
          <el-input
            v-model="formData.archivingOrganization"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="子女状态">
          <el-input v-model="formData.stateOfChildren" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="子女有无商业险">
          <el-radio-group v-model="formData.doChildrenHaveCommercialInsurance">
            <el-radio label="1">有</el-radio>
            <el-radio label="2">无</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="有无违法违纪状态">
          <el-input
            v-model="formData.isThereAnyViolationOfLawOrDiscipline"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="有无重大病史">
          <el-input
            v-model="formData.areThereAnyMajorMedicalHistories"
            placeholder="请输入"
          />
        </el-form-item>
      </div>
      <!-- 通讯信息 -->
      <div class="block">
        <div class="title">通讯信息</div>
        <el-form-item label="QQ">
          <el-input v-model="formData.qq" placeholder="请输入" class="inputW" />
        </el-form-item>
        <el-form-item label="微信">
          <el-input
            v-model="formData.wechat"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="现居住地">
          <el-input v-model="formData.placeOfResidence" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="通讯地址">
          <el-input v-model="formData.postalAddress" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系手机">
          <el-input
            v-model="formData.contactTheMobilePhone"
            placeholder="11位字符"
            maxlength="11"
            class="inputW"
            @change.native="handlePhone(2)"
          />
        </el-form-item>
        <el-form-item label="个人邮箱">
          <el-input
            v-model="formData.personalMailbox"
            placeholder="请输入"
            type="mail"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="紧急联系人">
          <el-input
            v-model="formData.emergencyContact"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="紧急联系电话">
          <el-input
            v-model="formData.emergencyContactNumber"
            placeholder="11位字符"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 账号信息 -->
      <div class="block">
        <div class="title">账号信息</div>
        <el-form-item label="社保电脑号">
          <el-input
            v-model="formData.socialSecurityComputerNumber"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="公积金账号">
          <el-input
            v-model="formData.providentFundAccount"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input
            v-model="formData.bankCardNumber"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="开户行">
          <el-input
            v-model="formData.openingBank"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 教育信息 -->
      <div class="block">
        <div class="title">教育信息</div>
        <el-form-item label="学历类型">
          <el-select v-model="formData.educationalType" placeholder="请选择">
            <el-option
              v-for="item in EmployeeEnum.educationType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="毕业学校">
          <el-input
            v-model="formData.graduateSchool"
            placeholder="请输入"
            class="inputW2"
          />
        </el-form-item>
        <el-form-item label="入学时间">
          <el-date-picker
            v-model="formData.enrolmentTime"
            type="data"
            placeholder="请输入时间"
            class="inputW"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="毕业时间">
          <el-date-picker
            v-model="formData.graduationTime"
            type="data"
            placeholder="请输入时间"
            class="inputW"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="专业">
          <el-input
            v-model="formData.major"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
      </div>
      <!-- 从业信息 -->
      <div class="block">
        <div class="title">从业信息</div>
        <el-form-item label="上家公司">
          <el-input
            v-model="formData.homeCompany"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="职称">
          <el-input
            v-model="formData.title"
            placeholder="请输入"
            class="inputW"
          />
        </el-form-item>
        <el-form-item label="有无竞业限制">
          <el-input
            v-model="formData.isThereAnyCompetitionRestriction"
            placeholder="请输入"
            style="width: 80%"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formData.remarks"
            type="textarea"
            placeholder="请输入备注"
            style="width: 80%"
          />
        </el-form-item>
        <!-- 保存员工信息 -->
        <el-row class="inline-info" type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" @click="savePersonal">保存更新</el-button>
            <el-button @click="$router.back()">返回</el-button>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div>{{ userInfo }}</div>
  </div>
</template>
<script>
import EmployeeEnum from '@/api/constant/employees'
import COS from 'cos-js-sdk-v5'
import { putuser, putpersonallnfo } from '@/api/userinfo/userinfo'
const cos = new COS({
  SecretId: 'AKIDoSqxnMefOq47uSlpdBTWJr9ByVmob9RU',
  SecretKey: 'pOimbAUYNwFIAm7ByVnoZ4IL8gz2pMfi'
})
export default {
  props: {
    firsetata: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      imageUrl: this.firsetata.staffPhoto,
      url: null,
      userId: this.$route.params.id,
      EmployeeEnum, // 员工枚举数据
      userInfo: {
        username: this.firsetata.username,
        workNumber: this.firsetata.workNumber,
        mobile: this.firsetata.mobile,
        correctionTime: this.firsetata.correctionTime,
        departmentName: this.firsetata.departmentName
      },
      formData: {
        userId: '',
        username: ' ', // 用户名
        sex: '', // 性别
        mobile: '', // 手机
        companyId: '', // 公司id
        departmentName: '', // 部门名称
        //  onTheJobStatus: '', // 在职状态 no
        dateOfBirth: '', // 出生日期
        timeOfEntry: '', // 入职时间
        theHighestDegreeOfEducation: '', // 最高学历
        nationalArea: '', // 国家
        passportNo: '', // 护照号
        idNumber: '', // 身份证号
        idCardPhotoPositive: '', // 身份证照正
        idCardPhotoBack: '', // 身份证照正
        nativePlace: '', // 籍贯
        nation: '', // 民族
        englishName: '', // 英文名字
        maritalStatus: '', // 婚姻状况
        staffPhoto: '', // 员工照片
        birthday: '', // 生日
        zodiac: '', // 属相
        age: '', // 年龄
        constellation: '', // 星座
        bloodType: '', // 血型
        domicile: '', // 户籍所在地
        politicalOutlook: '', // 政治面貌
        timeToJoinTheParty: '', // 入党时间
        archivingOrganization: '', // 存档机构
        stateOfChildren: '', // 子女状态
        doChildrenHaveCommercialInsurance: '1', // 保险状态
        isThereAnyViolationOfLawOrDiscipline: '', // 违法违纪状态
        areThereAnyMajorMedicalHistories: '', // 重大病史
        qq: '', // QQ
        wechat: '', // 微信
        residenceCardCity: '', // 居住证城市
        dateOfResidencePermit: '', // 居住证办理日期
        residencePermitDeadline: '', // 居住证截止日期
        placeOfResidence: '', // 现居住地
        postalAddress: '', // 通讯地址
        contactTheMobilePhone: '', // 联系手机
        personalMailbox: '', // 个人邮箱
        emergencyContact: '', // 紧急联系人
        emergencyContactNumber: '', // 紧急联系电话
        socialSecurityComputerNumber: '', // 社保电脑号
        providentFundAccount: '', // 公积金账号
        bankCardNumber: '', // 银行卡号
        openingBank: '', // 开户行
        educationalType: '', // 学历类型
        graduateSchool: '', // 毕业学校
        enrolmentTime: '', // 入学时间
        graduationTime: '', // 毕业时间
        major: '', // 专业
        graduationCertificate: '', // 毕业证书
        certificateOfAcademicDegree: '', // 学位证书
        homeCompany: '', // 上家公司
        title: '', // 职称
        resume: '', // 简历
        isThereAnyCompetitionRestriction: '', // 有无竞业限制
        proofOfDepartureOfFormerCompany: '', // 前公司离职证明
        remarks: '' // 备注,
      },
      filelist: [{ url: this.firsetata.staffPhoto }],
      percent: 0,
      showPercent: false,

      newimgs: ''
    }
  },

  methods: {
    handlePhone() {},
    // 保存头像
    async saveUser() {
      console.log(this.userInfo)
      const { success } = await putuser(this.firsetata.id, { staffPhoto: this.newimgs })
      if (success) {
        this.$emit('runder')
        this.$message({
          message: '更新成功',
          type: 'success'
        })
      }
    },
    // 保存更新
    async savePersonal() {
      await putpersonallnfo(this.firsetata.id, this.formData)
    },
    handleAvatarSuccess(res, file) {
      // console.log(res, file)
      this.imageUrl = URL.createObjectURL(res.raw)
    },
    onchange(res, file) {
      const reader = new FileReader()
      this.showPercent = true
      reader.readAsDataURL(res.raw)
      const that = this
      reader.onload = function(e) {
        // target.result 该属性表示目标对象的DataURL
        that.url = e.target.result
        // console.log(that.url)
      }
    },
    upload(params) {
      const that = this
      //   console.log(params.file)
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: '123456789-1252930734', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            onProgress: (params) => {
              this.percent = params.percent * 100
            },
            StorageClass: 'STANDARD' // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          },
          function(err, data) {
            // data返回数据之后 应该如何处理
            console.log(err || data)
            that.newimgs = 'http://' + data.Location
            return 'http://' + data.Location
          }
        )
        // 进度条
        setTimeout(() => {
          this.showPercent = false // 隐藏进度条
          this.percent = 0 // 进度归0
        }, 2000)
      }
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
