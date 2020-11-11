<template>
    <section class="dashboard">
        <h2>סיכום נתונים לתקופה</h2>
        <div class="date-inputs flex space-between align-center wrap">
            <input @change="loadData" type="date" v-model="startDate" />
            עד
            <input @change="loadData" type="date" v-model="endDate" />
        </div>
        <h3>תקבולים לפי לקוחות עיקריים</h3>
        <MPGraph
            :loading="isLoading || !userData"
            :data="incomePerClient.data"
            :labels="incomePerClient.names"
        />
        <h3>נתוני הכנסות</h3>
        <MPGraph
            type="bar"
            :loading="isLoading || !userData"
            :data="dataPerMonth.incomeData"
            :labels="dataPerMonth.months"
            colors="rgb(86, 202, 97)"
            title="סך הכנסות"
        />
        <h3>נתוני הוצאות</h3>
        <MPGraph
            type="bar"
            :loading="isLoading || !userData"
            :data="dataPerMonth.outcomeData"
            :labels="dataPerMonth.months"
            colors="rgb(99, 166, 181)"
            title="סך הוצאות"
        />
    </section>
</template>

<script>
import { userService } from '../services/userService.js'
import MeitalsPackage from 'meitals-package';

export default {
    created() {
        this.loadData()
        setTimeout(() => this.isUpdated = true, 3000);
    },
    data() {
        return {
            startDate: '2019-01-01',
            endDate: '2019-12-01',
            userData: {},
            isLoading: false,
            isUpdated: false
        }
    },
    computed: {
        incomePerClient() {
            if (!this.userData || !this.userData.clients) return { names: [], data: [] }
            const clients = [...this.userData.clients]
            clients.shift()
            const names = clients.map(i => i[0])
            var data = clients.map(i => i[1])
            if (this.isUpdated) data = this.getRandomValues(data)
            // random data changes for demonstrating the reactive graph
            return { names, data }
        },
        dataPerMonth() {
            if (!this.userData || !this.userData.cashflow) return { months: [], incomeData: [], outcomeData: [] }
            const cashflow = [...this.userData.cashflow]
            cashflow.shift()
            const months = cashflow.map(i => i[0])
            var incomeData = cashflow.map(i => i[1])
            if (this.isUpdated) incomeData = this.getRandomValues(incomeData)
            // random data changes for demonstrating the reactive graph
            var outcomeData = cashflow.map(i => i[2])
            if (this.isUpdated) outcomeData = this.getRandomValues(outcomeData)
            // random data changes for demonstrating the reactive graph
            return { months, incomeData, outcomeData }
        }
    },
    methods: {
        async loadData() {
            if (!this.startDate || !this.endDate) return
            this.userData = await userService.getChartData(this.startDate, this.endDate)
            console.log('loadData -> this.userData', this.userData);
        },
        getRandomValues(values) {
            return values.map(v => v + Math.floor(Math.random() * 400 + 100))
        }
    },
    components: {
        ...MeitalsPackage
    }
}
</script>