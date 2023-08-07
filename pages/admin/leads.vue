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



        <!-- Rejected -->
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
                        <th>Approve</th>
                        <th>Reject</th>
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
                                <button class="success">Approve</button>
                            </td>
                            <td>
                                <button class="danger">Reject</button>
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
                        <th>Reject</th>
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
                               <button class="danger">Reject</button>
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
                            
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>
    </div>

    <DialogLeadDetail :is-visible="false" :data="leads[0]" :is-update="false"></DialogLeadDetail>
</template>
<style scoped></style>