<template>
    <div>
        <div v-for="i in numPages" :key="i">
            <pdf v-if="i <= index" :src="src" :page="i" @page-loaded="test"></pdf>
        </div>
        <van-loading v-if="loaded === false" size="24px" vertical>加载中...</van-loading>
    </div>
</template>

<script>
    import pdf from 'vue-pdf'
    var loadingTask = pdf.createLoadingTask(process.env.VUE_APP_API_HOST+"pdf/社会经济目标分类与代码.pdf");
    export default {
        components: {
            pdf
        },
        data() {
            return {
                src: loadingTask, // pdf文件地址
                numPages: 1,
                loaded: false,
                index: 1
            }
        },
        mounted() {
            this.src.promise.then(pdf => {
                this.loaded = true;
                this.numPages = pdf.numPages;
            });
            
        },
        methods: {
            test(res) {
                this.index = this.index + 1;
            }
        }
    }
</script>

<style scoped>
</style>
