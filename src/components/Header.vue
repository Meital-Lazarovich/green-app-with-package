<template>
    <header :class="['header', 'flex', 'space-between', 'align-center', { 'blended': isBlendedHeader }]">
        <router-link to="/" class="flex align-center">
            <img
                class="pointer"
                src="../assets/imgs/green_logo.svg"
                alt="חשבונית ירוקה"
            />
        </router-link>
    </header>
</template>

<script>
export default {
    computed: {
        isBlendedHeader() {
            // this is for making it easier to determine if the header is lined (for "regular" site views)
            const specialViewRoutes = ['Welcome', 'Login']
            return specialViewRoutes.some(route => this.$route.name === route)
        }
    }
}
</script>