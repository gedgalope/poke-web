<template>
  <v-container class="loading-handler" fluid>
    <v-text-field color="success" loading disabled></v-text-field>
  </v-container >
</template>

<script>
export default {
  name:"loading-handler",
  props:{
    isLoading:{
      type:Boolean,
      default:()=>{
        return true
      }
    }
  }
}
</script>