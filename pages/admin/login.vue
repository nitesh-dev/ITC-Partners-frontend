<script setup lang='ts'>

const cli = "796799204712-nc3hc7nhj2l2pj6q1fn6e03f6g4elf7h.apps.googleusercontent.com"

async function handleCredentialResponse(response: any) {
  const googleToken = response.credential
  //send to server and get token
  console.log(googleToken)

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

</script>
<template>
  <div class="login">
    <div class="login-dialog">
      <h2>Sign Up or Log In</h2>
      <hr>
      <div id="buttonDiv"></div>

    </div>
  </div>
</template>
<style scoped>
button{
  width: 100%;
  background-color: aqua;
}
</style>