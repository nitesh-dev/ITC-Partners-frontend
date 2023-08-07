<script setup lang='ts'>
import { Lead, LeadStatus } from '~/data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString } from '~/extra/utils'


const leads = ref(Array<Lead>())

leads.value.push({
    id: 'dfadf',
    first: 'Nitehs',
    last: 'Kumar',
    phone: 456465,
    address: 'hjahf sdhfjd f',
    dob: 456456456456,
    city: 'Indiaidf',
    pincode: '455645',
    gender: 'Male',
    purpose_of_loan: 'dsfdsjkdf dsfjfklajdfdf dfsasadfkdfl dsfjksdjf jsdafjads fj',
    employer_status: 'Farmer',
    monthly_income: '10000',
    consultant_id: 'jkldsjf',
    status: LeadStatus.Pending,
    datetime: 0
})

leads.value.push({
    id: 'dfadf',
    first: 'Nitehs',
    last: 'Kumar',
    phone: 456465,
    address: 'hjahf sdhfjd f',
    dob: 456456456456,
    city: 'Indiaidf',
    pincode: '455645',
    gender: 'Male',
    purpose_of_loan: 'dsfdsjkdf dsfjfklajdfdf dfsasadfkdfl dsfjksdjf jsdafjads fj',
    employer_status: 'Farmer',
    monthly_income: '10000',
    consultant_id: 'jkldsjf',
    status: LeadStatus.Approved,
    datetime: 0
})


leads.value.push({
    id: 'dfadf',
    first: 'Nitehs',
    last: 'Kumar',
    phone: 456465,
    address: 'hjahf sdhfjd f',
    dob: 456456456456,
    city: 'Indiaidf',
    pincode: '455645',
    gender: 'Male',
    purpose_of_loan: 'dsfdsjkdf dsfjfklajdfdf dfsasadfkdfl dsfjksdjf jsdafjads fj',
    employer_status: 'Farmer',
    monthly_income: '10000',
    consultant_id: 'jkldsjf',
    status: LeadStatus.Rejected,
    datetime: 0
})



leads.value.push({
    id: 'dfadf',
    first: 'Nitehs',
    last: 'Kumar',
    phone: 456465,
    address: 'hjahf sdhfjd f',
    dob: 456456456456,
    city: 'Indiaidf',
    pincode: '455645',
    gender: 'Male',
    purpose_of_loan: 'dsfdsjkdf dsfjfklajdfdf dfsasadfkdfl dsfjksdjf jsdafjads fj',
    employer_status: 'Farmer',
    monthly_income: '10000',
    consultant_id: 'jkldsjf',
    status: LeadStatus.Progress,
    datetime: 0
})


leads.value.push({
    id: 'dfadf',
    first: 'Nitehs',
    last: 'Kumar',
    phone: 456465,
    address: 'hjahf sdhfjd f',
    dob: 456456456456,
    city: 'Indiaidf',
    pincode: '455645',
    gender: 'Male',
    purpose_of_loan: 'dsfdsjkdf dsfjfklajdfdf dfsasadfkdfl dsfjksdjf jsdafjads fj',
    employer_status: 'Farmer',
    monthly_income: '10000',
    consultant_id: 'jkldsjf',
    status: LeadStatus.Pending,
    datetime: 0
})




















const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}
</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="2" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile name="Nitesh kr" role="Admin" />
        </div>

        <h2>Leads</h2>
        <div class="reports">
            <div class="card">
                <p>Approved</p>
                <span>49</span>
                <div class="progress success"></div>
            </div>
            <div class="card">
                <p>Progress</p>
                <span>5</span>
                <div class="progress"></div>
            </div>
            <div class="card">
                <p>Pending</p>
                <span>3</span>
                <div class="progress neutral"></div>
            </div>
            <div class="card">
                <p>Rejects</p>
                <span>4</span>
                <div class="progress danger"></div>
            </div>
        </div>


        <WidgetsTab :active-tab="activeTabIndex" :names="['Pending', 'Progress', 'Approved', 'Rejected']"
            :onChange="event => onTabChange(event)" />



        <!-- Pending -->
        <div v-if="activeTabIndex == 0" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Submitted At</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == LeadStatus.Pending">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                            <td>
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                            <td>
                                <svg class="danger" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Progress -->
        <div v-if="activeTabIndex == 1" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Submitted At</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == LeadStatus.Progress">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                            <td>
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                            <td>
                                <svg class="danger" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Approved -->
        <div v-if="activeTabIndex == 2" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Submitted At</th>
                        <th>View</th>

                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == LeadStatus.Approved">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                            <td>
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <!-- Rejected -->
        <div v-if="activeTabIndex == 3" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Gender</th>
                        <th>Submitted At</th>
                        <th>View</th>
                        <th>Approve</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in leads">
                        <tr v-if="item.status == LeadStatus.Rejected">
                            <td>{{ item.first }} {{ item.last }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.address }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.pincode }}</td>
                            <td>{{ item.gender }}</td>
                            <td>{{ dateTimeString(item.datetime) }}</td>
                            <td>
                                <svg class="normal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path
                                        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                                </svg>
                            </td>
                            <td>
                               <span class="chip success">Approve</span>
                            </td>
                            <td>
                               <span class="chip danger">Reject</span>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

    </div>
</template>
<style scoped>

</style>