<template>
    <div class="date-picker">
        <input type="text" readonly :value="formattedDate" @click="toggleCalendar" placeholder="Select Date" />
        <transition name="fade">
            <div class="calendar" v-if="showCalendar">
                <div class="calendar-header">
                    <button @click="prevMonth">«</button>
                    <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
                    <button @click="nextMonth">»</button>
                </div>
                <div class="calendar-grid">
                    <div class="day" v-for="(day, index) in days" :key="index">{{ day }}</div>
                    <div class="date" v-for="date in monthDates" :key="date" :class="{ selected: isSelected(date) }"
                        @click="selectDate(date)">
                        {{ date }}
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
    name: 'AnimatedDatePicker',
    setup() {
        const showCalendar = ref(false);
        const currentDate = new Date();
        const currentMonth = ref(currentDate.getMonth());
        const currentYear = ref(currentDate.getFullYear());
        const selectedDate = ref<string | null>(null);
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const toggleCalendar = () => {
            showCalendar.value = !showCalendar.value;
        };

        const monthDates = computed(() => {
            const date = new Date(currentYear.value, currentMonth.value + 1, 0);
            return Array.from({ length: date.getDate() }, (_, i) => i + 1);
        });

        const isSelected = (date: number) => selectedDate.value === `${currentYear.value}-${currentMonth.value + 1}-${date}`;

        const selectDate = (date: number) => {
            selectedDate.value = `${currentYear.value}-${currentMonth.value + 1}-${date}`;
            showCalendar.value = false; // Close calendar after selection
        };

        const prevMonth = () => {
            if (currentMonth.value === 0) {
                currentMonth.value = 11;
                currentYear.value--;
            } else {
                currentMonth.value--;
            }
        };

        const nextMonth = () => {
            if (currentMonth.value === 11) {
                currentMonth.value = 0;
                currentYear.value++;
            } else {
                currentMonth.value++;
            }
        };

        const formattedDate = computed(() => {
            if (!selectedDate.value) return '';
            const [year, month, day] = selectedDate.value.split('-');
            return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
        });

        return {
            showCalendar,
            monthNames,
            days,
            monthDates,
            toggleCalendar,
            isSelected,
            selectDate,
            prevMonth,
            nextMonth,
            formattedDate,
        };
    },
});
</script>
  
<style lang="scss" scoped>
.date-picker {
    position: relative;

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 200px;
        cursor: pointer;
    }

    .calendar {
        position: absolute;
        top: 40px;
        left: 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 10;

        &-header {
            display: flex;
            justify-content: space-between;
            padding: 10px;

            button {
                background: none;
                border: none;
                cursor: pointer;
            }
        }

        &-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            padding: 10px;

            .day,
            .date {
                text-align: center;
                padding: 5px;
            }

            .date {
                cursor: pointer;

                &.selected {
                    background-color: #4caf50;
                    color: white;
                    border-radius: 50%;
                }

                &:hover {
                    background-color: #f0f0f0;
                }
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
  