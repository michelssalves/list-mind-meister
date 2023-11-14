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
        <p>Nature Type: {{ nature.natureTypeName }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      natures: [],
      natureTypes: [],
    };
  },
  mounted() {
    this.fetchNatures();
    this.fetchNatureTypes();
  },
  methods: {
    async fetchNatures() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/natures');
        this.natures = response.data;
        console.log(this.natures)
      } catch (error) {
        console.error('Error fetching natures:', error);
      }
    },
    async fetchNatureTypes() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/natures/type');
        this.natureTypes = response.data;
      } catch (error) {
        console.error('Error fetching nature types:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
