<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
    :transform="rotateSVG()"
  >
    <title v-if="typeof iconName == 'string'" :id="iconName" lang="en">{{ iconName }}</title>
    <title v-else lang="en">
      <v-list v-for="(name, index) in iconName" :key="index">
      {{name}}
      </v-list>
    </title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: "IconHandler",
  props: {
    iconName: {
      type: [String, Array],
      default: "box"
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: "currentColor"
    },
    viewBox: {
      type: String,
      default: "0 0 18 18"
    },
    rotation: {
      type: Number,
      default: 0
    }
  },
  methods: {
    rotateSVG() {
      return "rotate(" + this.rotation + " 0 0)";
    }
  }
};
</script>
