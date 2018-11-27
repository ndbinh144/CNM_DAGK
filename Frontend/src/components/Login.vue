<template>
  <div class="login">
    <Header Title="LOGIN"></Header>
    <div class="title">
      <lable>NHẬP TÊN ĐĂNG NHẬP VÀ MẬT KHẨU</lable>
    </div>
    <h3 class="notification">{{ message }}</h3>
    <div class="inputLogin">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          :counter="10"
          label="username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="passRules"
          label="password"
          required
          type="password"
        ></v-text-field>
        <v-btn
          :disabled="!valid"
          @click="submit">
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'

export default {
  data: () => ({
    message: '',
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'username is required'
    ],
    password: '',
    passRules: [
      v => !!v || 'password is required'
    ]
  }),
  components: { Header },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('http://localhost:3000/api/user/login', {
          username: this.username,
          password: this.password
        }).then(rs => {
          var result = rs.data
          if (result.auth) {
            var token = result.access_token
            
            if (result.user.type === 0) {
              this.$router.push('/app1')
            } else if (result.user.type === 1) {
              this.$router.push('/app2')
            } else if (result.user.type === 2) {
              this.$router.push('/app3')
            } else {
              this.$router.push('/app4/' + result.user.ID)
            }
          } else {
            this.message = 'Sai tên đăng nhập hoặc mật khẩu'
          }
        }).catch(rj => {
          console.error('Invalid username or password')
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top: 2rem;
  }
  .title {
    margin-top: 2rem;
    font-weight: bold;
    font-size: 50rem;
    color: rgb(24, 128, 110);
  }
  .notification {
    color: red
  }
  .inputLogin {
    width: 40%;
    margin: 0 auto;
  }
</style>
