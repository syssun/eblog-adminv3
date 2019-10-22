<template>
  <div>
    <div style="margin-bottom: 1rem;"><Input v-model="formdata.title" placeholder="输入标题" clearable style="width: 50%" /></div>
    <div ref="editor" style="text-align:left"></div>
    <Button type="primary" style="margin-top: 1rem;" v-on:click="fsubmit">发布</Button>
  </div>
</template>

<script>
import E from 'wangeditor'
import axios from '@/libs/api.request'
export default {
  name: 'editor',
  data () {
    return {
      formdata: {
        content: '',
        title: ''
      }
    }
  },
  methods: {
    getContent: function () {
      alert(this.formdata.content)
    },
    fsubmit: function () {
      var fordata = this.formdata
      return axios.request({
        url: 'artadd',
        data: fordata,
        type: 'POST',
        method: 'POST'
      })
    }
  },
  mounted () {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = html => {
      this.formdata.content = html
    }
    editor.create()
  }
}
</script>

<style scoped></style>
