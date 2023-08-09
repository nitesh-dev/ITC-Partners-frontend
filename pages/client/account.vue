<script setup lang='ts'>
import ApiConsultant from '~/api/ApiConsultant';
import { getToken } from '~/extra/utils';
import { tabs } from '~/data/client' 

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
    }
})

async function getProfileDetail(token: string) {
    try {
        const res = await ApiConsultant.get(token)
        profile.value.image = res.profile_url
        profile.value.name = res.first + ' ' + res.last
    } catch (error) {
        navigateTo('/')
    }
}

</script>
<template>
    <div class="panel">
        <Sidebar :active-tab="5" :tab-data="tabs"></Sidebar>

        <!-- header -->
        <div class="header">
            <Profile :image="profile.image" :name="profile.name" role="Consultant" />
        </div>

        <h2>Account</h2>
       

        

    </div>
</template>
<style scoped>


</style>