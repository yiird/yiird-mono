<template>
    <div>
        <y-list :items="items"></y-list>
    </div>
</template>

<script setup lang="ts">
import type { ListItem } from '@yiird/elements';
import axios from 'axios';

const items:Array<ListItem> = [{
    avatar:'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    title:'php如何使用PHP的Filter扩展？',
    description:'在PHP中，Filter扩展提供了一种方便和安全地验证、过滤和操作输入数据的方式。它提供了多个内置的过滤器，可以使用这些过滤器来验证和处理不同类型的输入数据。在这篇文章中，我们将深入了解PHP的Filter扩展，它的优点以及',
}]

const xx = await axios.get('/api/user')
console.log(xx)

</script>

<style scoped>

</style>