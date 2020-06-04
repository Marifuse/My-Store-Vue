<template>
    <div data-testId='hello-component'>{{ msg }}</div>
</template>

<script>
export default {
    props: {
        msg: {
            type: String,
            default: 'Light, Camara, Lasser'
        }
    }
}
</script>

<style>

</style>