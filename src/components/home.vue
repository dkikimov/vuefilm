<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
        input(
          type="text"
          placeholder="What we will watch?"
          v-model="taskTitle"
          @keyup.enter="newTask"
        )
        textarea(
          type="text"
          v-model="taskDescription"
          @keyup.enter="newTask"
        )
        .option-list
          input.what-watch--radio(
            type="radio"
            id="radioFilm"
            value="Film"
            v-model="whatWatch"
          )
          label(
            for="radioFilm"
          ) Film
          input.what-watch--radio(
            type="radio"
            id="radioSerial"
            value="Serial"
            v-model="whatWatch"
          )
          label(
            for="radioSerial"
          ) Serial
        .total-time
          .total-time__film(
            v-if="whatWatch === 'Film'"
          )
            span.time-title Hours
            input.time-input(
              type="number"
              v-model="filmHours"
            )
            span.time-title Minutes
            input.time-input(
              type="number"
              v-model="filmMinutes"
            )
            p.serialTime {{ filmTime }}
          .total-time__serial(
            v-if="whatWatch === 'Serial'"
          )
            span.time-title How many seasons?
            input.time-input(
              type="number"
              v-model="serialSeason"
            )
            span.time-title How many series?
            input.time-input(
              type="number"
              v-model="serialSeries"
            )
            span.time-title How long are series? (minutes)
            input.time-input(
              type="number"
              v-model="serialSeriesMinutes"
            )
            p.serialTime {{ serialTime }}
          // TAG LIST
          // Add new Tag
          .tag-list.tag-list-add
            .ui-tag__wrapper(
              @click="tagMenuShow = !tagMenuShow"
            )
              .ui-tag
                span.tag-title Add New
                span.button-close(
                  :class="{ active: !tagMenuShow }"
                )
          // Show Input
          .tag-list.tag-list--menu(
            v-if="tagMenuShow"
          )
            input.tag-add--input(
              type="text"
              placeholder="New tag"
              v-model="tagTitle"
              @keyup.enter="newTag"
            )
            .button.button-default(
              @click="newTag"
            ) Send
          // All Tags
          .tag-list
            .ui-tag__wrapper(
              v-for="tag in tags"
              :key="tag.title"
            )
              .ui-tag(
                @click="addTagUsed(tag)"
                :class="{active: tag.use}"
              )
                span.tag-title {{ tag.title }}
                span.button-close
        .button.button-primary.button--round.sendButton(
          @click="newTask"
        ) Send

</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',
      filmHours: 1,
      filmMinutes: 30,
      serialSeason: 1,
      serialSeries: 11,
      serialSeriesMinutes: 40,
      tagMenuShow: false,
      tagsUsed: [],
      tagTitle: ''
    }
  },
  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
      this.tagTitle = ''
    },
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const task = {
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tags: this.tagsUsed,
        completed: false,
        editing: false
      }
      this.$store.dispatch('newTask', task)

      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []
      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes '
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    },
    filmTime () {
      let min = this.filmHours * 60 + this.filmMinutes
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      let min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
.serialTime
  margin-bottom 15px
.option-list {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .what-watch--radio {
    margin-right: 12px;
  }

  input {
    margin-bottom: 0;
  }

  label {
    margin-right: 20px;
    margin-bottom: 0;

    &.last-child {
      margin-right: 0;
    }
  }
}

.total-time {
  margin-bottom: 20px;
}

.time-title {
  display: block;
  margin-bottom: 6px;
}

.time-input {
  max-width: 80px;
  margin-right: 10px;
}

.tag-list
  margin-bottom 20px
.ui-tag__wrapper
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 0

.ui-tag
  .button-close
    &.active
      transform rotate(45deg)
  &.active
    background-color #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color #fff
  &:hover
    cursor pointer
.tag-list--menu
  display flex
  justify-content space-between
  align-items center

.tag-add--input
  margin-bottom 0
  margin-right 10px
  height 42px
</style>
<style lang="stylus">
input, textarea, button
  font-family: 'Montserrat', Helvetica, Arial, sans-serif;
</style>
