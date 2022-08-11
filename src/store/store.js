import { reactive } from "vue";

export const state = reactive({
  activity: {},
  bookmarks: [],
  distances: [],
  toggleBookmarkItem(item) {
    const itemIndex = this.bookmarks.findIndex((el) => {
      return el.id === item.id;
    });
    if (itemIndex !== -1) {
      this.bookmarks.splice(itemIndex, 1);
      this.activity.id === item.id ? (this.activity.bookmarked = false) : "";
    } else {
      this.bookmarks.push(item);
    }
  },
});
