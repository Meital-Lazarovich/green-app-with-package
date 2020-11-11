<template>
    <section class="user-info" v-if="user">
        <img @click="logout" class="logout pointer" src="../assets/imgs/logout.png" alt="יציאה" title="יציאה">
        <div class="user grid">
            <div v-for="(section, idx) in userInfoToShow" :key="idx">
                <h2>{{ section.title }}</h2>
                <div
                    class="data"
                    v-for="(dataField, idx) in section.dataFields"
                    :key="idx"
                >
                    <p class="field">{{ dataField.field }}</p>
                    <p>{{ dataField.value }}</p>
                </div>
            </div>
        </div>
        <div class="businesses">
            <h2>עסקים</h2>
            <div
                class="business grid"
                v-for="business in businessesToShow"
                :key="business.id"
            >
                <div class="title flex align-center">
                    <img :src="business.logo" :alt="business.name" />
                    <div>
                        <h3>{{ business.name }}</h3>
                        <h3>{{ business.nameEn }}</h3>
                    </div>
                </div>
                <div class="flex wrap">
                    <div
                        class="data"
                        v-for="(dataField, idx) in business.dataFields"
                        :key="idx"
                    >
                        <p class="field">{{ dataField.field }}</p>
                        <p>{{ dataField.value }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    created() {
        if (!this.user) this.$router.push('/login');
    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser;
        },
        userInfoToShow() {
            // These data stractures (userInfoToShow and businessesToShow) allow adding more relevant fields to the component
            // without the need to make changes in the template
            const { user } = this
            return [
                {
                    title: 'פרטים אישיים',
                    dataFields: [
                        { field: 'שם פרטי', value: user.firstName },
                        { field: 'שם משפחה', value: user.lastName },
                        { field: 'מספר ת.ז', value: user.idNumber },
                    ]
                },
                {
                    title: 'פרטי מנוי',
                    dataFields: [
                        { field: 'תאריך רישום', value: new Date(user.signUpDate * 1000).toLocaleDateString('en-GB') },
                        { field: 'טלפון ליצירת קשר', value: user.phone },
                        { field: 'מייל חשבון', value: user.email},
                    ]
                }
            ]
        },
        businessesToShow() {
            const { businesses } = this.user
            return businesses.map(business => {
                const { id, name, nameEn, logo } = business;
                return {
                    id, name, nameEn, logo,
                    dataFields: [
                        { field: 'מספר עוסק', value: business.taxId },
                        { field: 'כתובת', value: `${business.address}, ${business.city}` }
                    ]
                }
            })
        }
    },
    methods: {
        async logout() {
            await this.$store.dispatch({ type: 'logout' });
            this.$router.push('/login');
        }
    }
}
</script>