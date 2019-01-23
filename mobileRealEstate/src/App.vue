<template>
  <div class="all">
    <router-view/>
<<<<<<< HEAD
     <top></top>
=======
    <top></top>
>>>>>>> 80dffc3f9b4343bb4fa3a9d3473cbd19a1128f32
  </div>
</template>

<script>
  import top from '@/components/topOption'
export default {
  name: 'all',
  components: {
    top: top
  }
}
</script>

<<style lang="scss">
@import './styles/common';
@import './styles/main';
.all {
  width: 100%;
  height: 100%;
}
</style>
