<!-- NatureList.vue -->
<template>
  <div>
    <ul>
      <li v-for="natureT in natureTypes" :key="natureT._id">
        {{ natureT.code }} -* {{ natureT.name }}
        <ul>
          <template v-for="(code, index) in natureT.natureCodes">
            <li :key="index">
             
              <template v-if="getSubNatureCodes(code) === undefined">
                jesus
                {{ code }} -+ {{ getDescriptionForCode(code) }}
                <ul>
                  <li v-for="(docType, docIndex) in getDocTypesForCode(code)" :key="docIndex">
                    {{ docType }} - {{ getDocTypeName(docType) }}
                  </li>
                </ul>
              </template>
              <!--SE TIVER SUBNATURE-->
              <template v-else>
                {{ code }} - {{ getDescriptionForCode(code) }}
                <ul>
                  <li
                    v-for="(subCode, subIndex) in getSubNatureCodes(code)"
                    :key="subIndex"
                  >
                    {{ subCode }} - {{ getSubNatureName(subCode) }}
                    <ul>
                      <li
                        v-for="(docType, docIndex) in getDocTypesForCode(
                          subCode
                        )"
                        :key="docIndex"
                      >
                        {{ docType }} - {{ getDocTypeName(docType) }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </template>
            </li>
          </template>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emptyArray: [],
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
        const response = await this.$axios.get(
          "http://localhost:3000/api/natures"
        );
        this.natures = response.data;
      } catch (error) {
        console.error("Error fetching natures:", error);
      }
    },
    async fetchNatureTypes() {
      try {
        const response = await this.$axios.get(
          "http://localhost:3000/api/natures/type"
        );
        this.natureTypes = response.data;
      } catch (error) {
        console.error("Error fetching nature types:", error);
      }
    },
    async fetchNatureSub() {
      try {
        const response = await this.$axios.get(
          "http://localhost:3000/api/natures/sub"
        );
        this.sub = response.data;
       
      } catch (error) {
        console.error("Error fetching nature types:", error);
      }
    },
    async fetchNatureDoc() {
      try {
        const response = await this.$axios.get(
          "http://localhost:3000/api/natures/doc"
        );
        this.docs = response.data;
      } catch (error) {
        console.error("Error fetching nature types:", error);
      }
    },
    getDescriptionForCode(code) {
      const nature = this.natures.find((item) => item.code === code);
      return nature ? nature.name : "N/A";
    },
    getSubNatureCodes(code) {
      const nature = this.natures.find((item) => item.code === code);
      console.log(nature.subNatureCodes);
      return nature ? nature.subNatureCodes || [] : 0;
    },
    getSubNatureName(subCode) {
      const subNature = this.sub.find((item) => item.code === subCode);
      return subNature ? subNature.name : "N/A";
    },
    getDocTypesForCode(subCode) {
      const nature = this.sub.find((item) => item.code === subCode);
     
      return nature ? nature.rules.docTypes || [] : [];
    },
    getDocTypeName(docType) {
      const doc = this.docs.find((item) => item.code === docType);
      return doc ? doc.name : "N/A";
    },
    noSubCodesOrDocTypes(code) {
      const subNatureCodes = this.getSubNatureCodes(code);
      const docTypes = this.getDocTypesForCode(code);
      return subNatureCodes.length === 0 && docTypes.length === 0;
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
