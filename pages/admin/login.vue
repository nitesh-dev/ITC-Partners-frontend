<script setup lang='ts'>
import { AdminAccount } from 'data/dataTypes';
import ApiAdmin from '~/api/ApiAdmin';


const cli = "796799204712-nc3hc7nhj2l2pj6q1fn6e03f6g4elf7h.apps.googleusercontent.com"

let catchGoogleToken = ''

async function handleCredentialResponse(response: any) {
  catchGoogleToken = response.credential
  isAccountExist()

}



const isSignupVisible = ref(false)



async function isAccountExist() {
  try {
    const isExist = await ApiAdmin.isAdminExist()
    if (isExist) {

      const res = await ApiAdmin.signIn(catchGoogleToken)
      localStorage.setItem('jwtToken', res.jwtToken)
      navigateTo('/admin')

    } else {
      // do sign up process
      isSignupVisible.value = true
    }

  } catch (error) {
    alert('Something went wrong')
  }
}

onMounted(function () {

  const script = document.createElement('script');
  script.src = "https://accounts.google.com/gsi/client";
  script.async = true;
  script.onload = () => {
    window.google?.accounts.id.initialize({
      client_id: cli,
      callback: handleCredentialResponse
    });
    window.google?.accounts.id.renderButton(
      document.getElementById("buttonDiv")!,
      { theme: "outline", size: "large" }
    );

  }
  document.body.appendChild(script);
})



async function onSubmit() {
  account.value.dob = new Date(dob.value).getTime()

  try {
    const res = await ApiAdmin.signUp(catchGoogleToken, account.value)
    localStorage.setItem('jwtToken', res.jwtToken)
    navigateTo('/admin')

  } catch (error) {
    console.log(error)
    alert('Something went wrong')
    window.location.reload()
  }

}

const dob = ref('')

const account = ref<AdminAccount>({
  id: 0,
  first: '',
  last: '',
  email: '',
  phone: 0,
  city: '',
  address: '',
  pincode: 0,
  gender: 'Male',
  created_at: 0,
  dob: 0,
  profile_url: ''
})




</script>
<template>
  <div class="login">
    <div>
      <h1>Welcome to ITC Partner</h1>
      <h3>Admin</h3>

      <div class="login-dialog">
        <h2>Sign Up or Log In</h2>
        <hr>
        <div id="buttonDiv"></div>
        <p class="end">Your privacy and security are our top priorities. By logging in with Google, you agree to our Terms of Service and Privacy Policy.</p>
      </div>



      <div v-if="isSignupVisible" class="dialog-holder">
        <form @submit.prevent="onSubmit()">
          <div class="dialog card">
            <h4>Account Details</h4>
            <div class="content">
              <p>You are one step away to create an account. Please fill all the details to create your account.</p>

              <div class="col-2">
                <div class="input">
                  <span>Contact number*</span>
                  <input type="number" v-model="account.phone" required>
                </div>

                <div class="input">
                  <span>Date of birth*</span>
                  <input type="date" v-model="dob" required>
                </div>
              </div>

              <div class="col-2">
                <div class="input">
                  <span>City*</span>
                  <input type="text" v-model="account.city" required>
                </div>

                <div class="input">
                  <span>Pincode*</span>
                  <input type="number" v-model="account.pincode" required>
                </div>
              </div>

              <div class="col-2">
                <div class="input">
                  <span>Gender*</span>
                  <select v-model="account.gender" required>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div class="input">
                <span>Address*</span>
                <textarea rows="4" v-model="account.address" required></textarea>
              </div>

              
            </div>
            <div class="buttons-holder">
              <button class="primary" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>
<style scoped>
#buttonDiv {
  margin-top: 60px;
  scale: 1.5;
}

h3 {
  color: white;
  text-align: center;
}

h1 {
  margin-bottom: 0;
}
</style>