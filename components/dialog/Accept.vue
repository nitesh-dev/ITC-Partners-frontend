<script setup lang='ts'>
defineProps({
    title: String, 
    message: String,
    buttonName: String,
    isVisible: Boolean,
    isDanger: Boolean
})

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'ok'): void
}>()

function onCancel(){
    emit('cancel')
}

function onOk(){
    emit('ok')
}


</script>
<template>
    <div v-if="isVisible" class="dialog-holder">
        <div class="dialog card">
            <h4>{{ title }}</h4>
            <div class="content">
                <p>{{ message }}</p>
            </div>
            <div class="buttons-holder">
                <button class="primary outline" @click="onCancel()">Cancel</button>
                <button :class="{'danger': isDanger, 'success': !isDanger}" @click="onOk()">{{ buttonName }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>