<!-- NatureList.vue -->
<template>
  <div>
    <h2>Nature List</h2>
    <ul>
      <li v-for="natureT in natureTypes" :key="natureT._id">
        {{ natureT.code }} - {{ natureT.name }}
        <ul v-if="natureT.natureCodes && natureT.natureCodes.length > 0">
          <li v-for="(code, index) in natureT.natureCodes" :key="index">
            {{ code }} - {{ getDescriptionForCode(code) }}
            <ul v-if="getSubNatureCodes(code).length > 0">
              <li v-for="(subCode, subIndex) in getSubNatureCodes(code)" :key="subIndex">
                {{ subCode }} - {{ getSubNatureName(subCode) }}
              </li>
            </ul>
          </li>
        </ul>
        <div v-else>
          No Nature Codes available
        </div>
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
      docs: [],
      sub: [],
    };
  },
  mounted() {
    this.fetchNatures();
    this.fetchNatureTypes();
    this.fetchNatureDoc();
    this.fetchNatureSub();  
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
    async fetchNatureTypes() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/natures/type');
        this.natureTypes = response.data;


      } catch (error) {
        console.error('Error fetching nature types:', error);
      }
    },
    async fetchNatureSub() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/natures/sub');
        this.sub = response.data;
        console.log(this.sub)
    

      } catch (error) {
        console.error('Error fetching nature types:', error);
      }
    },
    async fetchNatureDoc() {
      try {
        const response = await this.$axios.get('http://localhost:3000/api/natures/doc');
        this.docs = response.data;

      } catch (error) {
        console.error('Error fetching nature types:', error);
      }
    },
    getDescriptionForCode(code) {
      const nature = this.natures.find((item) => item.code === code);
      return nature ? nature.name : 'N/A';
    },
    getSubNatureCodes(code) {
      const nature = this.natures.find((item) => item.code === code);
      return nature ? nature.subNatureCodes || [] : [];
    },
    getSubNatureName(subCode) {
      const subNature = this.sub.find((item) => item.code === subCode);
      return subNature ? subNature.name : 'N/A';
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
