<template>
  <div class="headNav">
    <div class="pro-name">金管家仓库管理系统</div>
    <div class="info">
      <div class="name">欢迎您{{ userInfo?.userName }}</div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="avatar imges"><img :src="userInfo?.avatar" alt="" /></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="editPassWord">修改密码</el-dropdown-item>
          <el-dropdown-item command="loginLog">登录日志</el-dropdown-item>
          <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Details ref="detail" v-model="detailsShow" @edit="edit"></Details>
    <Edit ref="edit" v-model="editShow" @refresh="getUserInfo"></Edit>
    <EditPass ref="editPass" v-model="editPassShow" @refresh="getUserInfo"></EditPass>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Details from './details.vue'
import Edit from './edit.vue'
import store from '@/store'
import EditPass from './editPassword.vue'
export default {
  name: 'headNav',
  components: { Details, Edit, EditPass },
  data() {
    return {
      detailsShow: false,
      editShow: false,
      editPassShow: false
    }
  },
  computed: {
    userInfo() {
      return store.getters.getUserInfo
    }
  },
  created() {},
  methods: {
    ...mapActions(['Logout', 'GetInfo']),
    handleCommand(command) {
      if (command == 'info') {
        this.info()
      } else if (command == 'editPassWord') {
        this.editPassWord()
      } else if (command == 'loginLog') {
        this.loginLog()
      } else if (command == 'signOut') {
        this.signOut()
      }
    },
    async getUserInfo() {
      this.GetInfo()
    },
    info() {
      this.$refs.detail.data = this.userInfo
      this.$refs.detail.title = '个人信息'
      this.detailsShow = true
    },
    edit() {
      this.detailsShow = false
      this.$refs.edit.data = this.userInfo
      setTimeout(() => {
        this.editShow = true
      }, 200)
    },
    editPassWord() {
      this.$refs.editPass.data = this.userInfo
      this.editPassShow = true
    },
    loginLog() {
      this.$router.push({ name: 'systemLog', params: { userName: this.userInfo.userName } })
    },
    signOut() {
      this.$confirm('确认推出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.Logout().then(() => {
            window.location.reload()
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.headNav {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .pro-name {
    margin-left: 30px;
    font-size: 25px;
    font-weight: 400;
  }
  .info {
    height: 100%;
    margin-right: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .imges {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      border: 1px solid rgba($color: #000000, $alpha: 0.3);
      margin-left: 20px;
      overflow: hidden;
    }
    .name {
      margin-left: 20px;
    }
    .log {
      height: 50px;
    }
  }
}
</style>
