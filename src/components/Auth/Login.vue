<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth-banner
            h1.ui-title-1 Banner
          .auth-form
            span.ui-title-2 Login
            form(@submit.prevent="onSubmit")
              .form-item(
                :class="{ 'errorInput': $v.email.$error }"
              )
                input(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{ 'error': $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Field is required
                .error(v-if="!$v.email.email") Email isn't correct
                .form-item(
                  :class="{ 'errorInput': $v.password.$error }"
                  )
                input(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{ 'errorInput': $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Password is required.
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.
              .buttons-list
                button.button.button-primary.button--round(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                ) Login
              .buttons-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-else) {{ submitStatus }}
                //- p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
              .buttons-list.buttons-list--info
                span Need account ?
                  router-link(to="/registration")  Enter here

</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
          .then(() => {
            console.log('ENTERED!')
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => {
            this.submitStatus = err.message
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
.auth-banner,
.auth-form
  width 50%
  @media screen and (max-width: 768px)
    width 100%
    margin-bottom 30px
    &.last-child
      margin-bottom 0
.form-item
  .error
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
    display none
  &.errorInput
    .error
      display block
input
  &.error
    border-color #fc5c65
    animation shake .3s
.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &.last-child
      margin-bottom 0
a
  color #444ce0
</style>
