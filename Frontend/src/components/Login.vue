<template>
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
      label="Password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    username: '',
    usernameRules: [
      v => !!v || 'username is required'
    ],
    password: '',
    passRules: [
      v => !!v || 'Password is required'
    ]
  }),
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('http://localhost:3000/api/user/login', {
          username: this.username,
          password: this.password
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
