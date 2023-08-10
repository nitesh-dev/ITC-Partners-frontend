<script setup lang='ts'>
import ApiAdmin from '~/api/ApiAdmin';
import { Offer } from 'data/dataTypes';
import { tabs } from '~/data/admin'
import { dateTimeString, getToken } from '~/extra/utils'

const offers = ref(Array<Offer>())

let token: string | null = null

const profile = ref({
    image: '',
    name: ''
})

onMounted(() => {
    token = getToken()
    if (!token) {
        //redirect to login
        navigateTo('/admin/login')
    } else {
        getProfileDetail(token)

    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiAdmin.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        console.log(error)
        navigateTo('/admin/login')
    }
}



const activeTabIndex = ref(0)

function onTabChange(index: number) {
    // alert(index)
    activeTabIndex.value = index
}

</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="4" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Admin" />
        </div>

        <h2>Offers</h2>
        <button class="primary">Add Offer</button>
        <WidgetsTab :active-tab="activeTabIndex" :names="['Active', 'Expired']" :onChange="event => onTabChange(event)">
        </WidgetsTab>

        <!-- Active -->
        <div v-if="activeTabIndex == 0" class="tab-container">

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Offer Start</th>
                        <th>Offer End</th>
                        <th>Label</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="spacer">
                        <td></td>
                    </tr>
                    <template v-for="item, index in offers">

                        <!-- TODO add condition to check offer expiry -->
                        <tr>
                            <td><img src="~/public/images/no_image.png"></td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.discount }}</td>
                            <td>{{ dateTimeString(item.start_datetime) }}</td>
                            <td>{{ dateTimeString(item.end_datetime) }}</td>
                            <td><span class="chip pink">{{ item.label }}</span></td>
                            <td>
                                <button class="primary">Edit</button>
                            </td>
                            <td>
                                <button class="danger">Delete</button>
                            </td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>
    </div>

    <DialogAddOffer :is-visible="false" :data="offers[0]" :is-update="false"></DialogAddOffer>
</template>
<style scoped></style>