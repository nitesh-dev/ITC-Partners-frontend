<script setup lang='ts'>
import { getToken } from '~/extra/utils';
import { tabs } from '~/data/client'
import ApiConsultant from '~/api/ApiConsultant';
import { Referral } from 'data/dataTypes';
import { dateTimeString } from '~/extra/utils'


const isLoaded = ref(false)
const referrals = ref(Array<Referral>())

let token: string | null = null

const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/')
    } else {
        getProfileDetail(token)
        getReferrals(token)
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiConsultant.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        navigateTo('/')
    }
}


async function getReferrals(token: string) {
    try {
        const res = await ApiConsultant.getReferrals(token)
        isLoaded.value = true
        referrals.value = res
    } catch (error) {
        console.log(error)
    }
}

</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="3" :tab-data="tabs"></Sidebar>

        <template v-if="isLoaded">
            <!-- header -->
            <div class="header">
                <Profile :image="profile.image" :name="profile.name" role="Consultant" />
            </div>

            <h2>Referrals</h2>

            <p class="message">Share your <b>referral code</b> with friends and relative, earn <b>0.5%</b> of there each
                earning.</p>
            <p class="message">The below list will shows your all referrals that are joined with your <b>referral code</b>.
            </p>

            <br>
            <br>
            <br>
            <div class="tab-container">

                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>City</th>
                            <th>Pincode</th>
                            <!-- <th>Earning</th> -->
                            <th>Joined at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="spacer">
                            <td></td>
                        </tr>
                        <template v-for="item, index in referrals">
                            <tr>
                                <td><img :src="item.profile_url"></td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.city }}</td>
                                <td>{{ item.pincode }}</td>
                                <!-- <td>{{ item.earning }}</td> -->
                                <td>{{ dateTimeString(item.created_at) }}</td>
                            </tr>
                        </template>

                    </tbody>
                </table>
            </div>
        </template>

    </div>
</template>
<style scoped></style>