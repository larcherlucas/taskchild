<template>
    <div>
        <input type="text" v-model="filter" placeholder="Filter items..." />
        <ul>
            <li v-for="item in filteredItems" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
    name: 'ListFilter',
    setup() {
        const items = ref(['Apple', 'Banana', 'Orange', 'Grape']);
        const filter = ref('');

        const filteredItems = computed(() => {
            return items.value.filter(item => item.toLowerCase().includes(filter.value.toLowerCase()));
        });

        return {
            items,
            filter,
            filteredItems,
        };
    },
});
</script>
  
<style lang="scss" scoped>
input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
</style>
  