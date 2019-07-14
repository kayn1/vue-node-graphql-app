<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout row wrap pb-5>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Started Here!</h1>
      </v-flex>
    </v-layout>

    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
  
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-container>
            <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignupUser">

              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="username" :rules="usernameRules" prepend-icon="face" label="username" required type="text" color="accent"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field v-model="password" :rules="passwordRules" prepend-icon="security" label="password" required type="text" color="accent"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout>
                <v-flex xs12>
                  <v-text-field v-model="email" :rules="emailRules" prepend-icon="email" label="email" required type="text" color="accent"></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn :loading="loading" color="accent" type="submit" :disabled="!isFormValid || loading">
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Sign Up</v-btn>
                  <h4>Already have an account?
                    <router-link to="/signip">Sign In</router-link>
                  </h4>
                </v-flex>
              </v-layout>

            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SignUp',
  data () {
    return {
      isFormValid: true,
      username: '',
      email: '',
      password: '',
      usernameRules: [
        username => !!username || 'Username is required',
        username => username.length < 10 || 'Username cannot be more than 10 characters'
      ],
      passwordRules: [
        password => !!password || 'Password is required'
      ],
      emailRules: [
        email => !!email || 'Email is required',
        email => /.@./.test(email) || 'Email is not valid'
      ]
    }
  },
  methods: {
    handleSignupUser () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signupUser', {
          username: this.username,
          password: this.password,
          email: this.email
        })
      }
    }
  },
  computed: {
    ...mapGetters(['loading', 'error'])
  }
}
</script>

<style>

</style>
