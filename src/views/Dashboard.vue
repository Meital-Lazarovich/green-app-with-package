<template>
    <section class="dashboard">
        <h2>סיכום נתונים לתקופה</h2>
        <div class="date-inputs flex space-between align-center wrap">
            <input v-model="startDate" type="date" @change="loadData" />
            עד
            <input v-model="endDate" type="date" @change="loadData" />
        </div>
        <div class="graphs flex wrap space-between">
            <div class="flex column align-center">
                <h3>תקבולים לפי לקוחות עיקריים</h3>
                <MPGraph
                    :loading="isLoading || !userData"
                    :data="incomePerClient.data"
                    :labels="incomePerClient.names"
                />
                <MPButton @click.native="updateIncomePerClient(true)">עדכון</MPButton>
            </div>
            <div class="flex column align-center">
                <h3>נתוני הכנסות</h3>
                <MPGraph
                    type="bar"
                    :loading="isLoading || !userData"
                    :data="incomePerMonth.data"
                    :labels="incomePerMonth.months"
                    colors="rgb(86, 202, 97)"
                    title="סך הכנסות"
                />
                <MPButton @click.native="updateIncomePerMonth(true)">עדכון</MPButton>
            </div>
            <div class="flex column align-center">
                <h3>נתוני הוצאות</h3>
                <MPGraph
                    type="bar"
                    :loading="isLoading || !userData"
                    :data="outcomePerMonth.data"
                    :labels="outcomePerMonth.months"
                    colors="rgb(99, 166, 181)"
                    title="סך הוצאות"
                />
                <MPButton @click.native="updateOutcomePerMonth(true)">עדכון</MPButton>
            </div>
        </div>
    </section>
</template>

<script>
import { userService } from '../services/userService.js'
import MeitalsPackage from 'meitals-package';

export default {
    created() {
        if (!this.user) this.$router.push('/login');
        this.loadData()
        setTimeout(this.updateData, 5000, true);
    },
    data() {
        return {
            startDate: '2019-01-01',
            endDate: '2019-12-01',
            userData: {},
            isLoading: false,
            incomePerClient: { names: [], data: [] },
            incomePerMonth: { months: [], data: [] },
            outcomePerMonth: { months: [], data: [] }
        }
    },
    computed: {
        user() {
            return this.$store.getters.loggedinUser;
        }
    },
    methods: {
        async loadData() {
            if (!this.startDate || !this.endDate) return
            this.userData = await userService.getChartData(this.startDate, this.endDate)
            this.updateData(false)
        },
        getRandomValues(values) {
            return values.map(v => v + Math.floor(Math.random() * 200))
        },
        updateData(isMock) {
            if (!this.userData) return
            this.updateIncomePerClient(isMock)
            this.updateIncomePerMonth(isMock)
            this.updateOutcomePerMonth(isMock)
        },
        updateIncomePerClient(isMock) {
            if (isMock) {
                // random data changes for demonstrating the reactive graph
                this.incomePerClient.data = this.getRandomValues(this.incomePerClient.data)
                return
            }
            const clients = [...this.userData.clients]
            clients.shift()
            const names = clients.map(i => i[0])
            var data = clients.map(i => i[1])
            this.incomePerClient = { names, data }
        },
        updateIncomePerMonth(isMock) {
            if (isMock) {
                // random data changes for demonstrating the reactive graph
                this.incomePerMonth.data = this.getRandomValues(this.incomePerMonth.data)
                return
            }
            const cashflow = [...this.userData.cashflow]
            cashflow.shift()
            const months = cashflow.map(i => i[0])
            var data = cashflow.map(i => i[1])
            this.incomePerMonth = { months, data }
        },
        updateOutcomePerMonth(isMock) {
            if (isMock) {
                // random data changes for demonstrating the reactive graph
                this.outcomePerMonth.data = this.getRandomValues(this.outcomePerMonth.data)
                return
            }
            const cashflow = [...this.userData.cashflow]
            cashflow.shift()
            const months = cashflow.map(i => i[0])
            var data = cashflow.map(i => i[2])
            this.outcomePerMonth = { months, data }
        }
    },
    components: {
        ...MeitalsPackage
    }
}
</script>