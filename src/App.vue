<template lang="pug">
  .wrapper
    header
    .navbar
      .container
        .navbar-content
          router-link.header-logo(
            to="/"
          ) FilmLibrary
          .button-burger(
            @click="menuShow = !menuShow"
            :class="{ active: menuShow }"
          )
            span.line.line-1
            span.line.line-2
            span.line.line-3
          .navbar-list__wrapper(
            :class="{ active: menuShow }"
          )
            ul.navbar-list
              li.navbar-item(
                v-for="link in links"
                :key="link.title"
                @click="menuShow = false"
              )
                router-link.navbar-link(
                  :to="`${link.url}`"
                ) {{link.title}}
              li.navbar-item(
                v-if="checkUser"
                @click="logoutUser"
              )
                span.navbar-link Logout
    router-view(:class="{blur: loading}")
    .spinner(v-if="loading")
      .bounce1
      .bounce2
      .bounce3
</template>

<script>
import '@/assets/stylus/main.styl'
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logoutUser () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {
    checkUser () {
      return this.$store.getters.checkUser
    },
    links () {
      if (this.checkUser) {
        this.$router.push('/')
        return [
          { title: 'Home', url: '/' },
          { title: 'Tasks', url: '/task' }
        ]
      }
      return [
        { title: 'Login', url: '/login' },
        { title: 'Registration', url: '/registration' }
      ]
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

