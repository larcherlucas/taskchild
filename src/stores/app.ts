import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    schedule: [
      { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
      { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
      { monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
    ],
    totalStars: 0,
  }),
  actions: {
    toggleStar(index, day) {
      const dayColumn = this.schedule[index][day];
      if (dayColumn.includes('⭐')) {
        this.schedule[index][day] = dayColumn.replace('⭐', '');
      } else {
        this.schedule[index][day] = dayColumn + '⭐';
      }
      this.updateTotalStars();
    },
    updateTotalStars() {
      this.totalStars = this.schedule.reduce((count, activity) => {
        for (const day in activity) {
          if (activity[day].includes('⭐')) {
            count += 1;
          }
        }
        return count;
      }, 0);
    },
  },
});