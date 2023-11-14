<!-- NatureList.vue -->
<template>
  <div>
    <h2>Nature List</h2>
    <ul>
      <li v-for="nature in natures" :key="nature._id">
        {{ nature.code }} - {{ nature.name }}
        <ul>
          <li v-for="subNatureCode in nature.subNatureCodes" :key="subNatureCode">
            {{ subNatureCode }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      natures: [],
    };
  },
  mounted() {
    this.fetchNatures();
  },
  methods: {
    async fetchNatures() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/natures');
        this.natures = response.data;
      } catch (error) {
        console.error('Error fetching natures:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
