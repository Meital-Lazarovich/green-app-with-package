<template>
    <section class="login grid">
        <div class="login-background"></div>
        <LoginForm @login="login" />
        <LoginHero />
        <div class="login-err" v-if="isActiveErr">מייל או סיסמה לא נכונים</div>
    </section>
</template>

<script>
import LoginHero from '../components/LoginHero'
import LoginForm from '../components/LoginForm'
export default {
    data() {
        return {
            isActiveErr: false
        }
    },
    created() {
        const user = this.$store.getters.loggedinUser;
        if (user) this.$router.push('/');
    },
    methods: {
        async login(credentials) {
            const user = await this.$store.dispatch({ type: 'login', credentials });
            if (!user) {
                this.isActiveErr = true;
                setTimeout(() => this.isActiveErr = false, 2000)
            }
            else this.$router.push('/');
        }
    },
    components: {
        LoginHero,
        LoginForm
    }
}
</script>