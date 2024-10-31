// GrandparentComponent.vue
<template>
  <ParentComponent />
</template>

<script>
import { provide } from 'vue';

export default {
    setup() {
        provide('sharedData', 'This is shared data');

        return {};
    }
};
</script>

// ParentComponent.vue
<template>
  <ChildComponent />
</template>

<script>
export default {
  setup() {
    return {};
  }
};
</script>

// ChildComponent.vue
<template>
    <div>{{ sharedData }}</div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const sharedData = inject('sharedData');

    return { sharedData };
  }
};
</script>
