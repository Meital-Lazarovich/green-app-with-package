<template>
    <section class="welcome grid" v-if="user">
        <content>
            <h2>היי {{ user.firstName }},</h2>
            <h3 class="flex wrap bold">
                <span>זהו עמוד העסק שלך עבור</span>
                {{ user.businesses[0].name }}
            </h3>
            <div class="flex">
                <router-link to="/user">פרטי משתמש</router-link>
                <button @click="logout">יציאה</button>
            </div>
        </content>
        <img src="../assets/imgs/welcome.png" alt="ברוכים הבאים">
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