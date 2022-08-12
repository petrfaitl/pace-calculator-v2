import { reactive } from "vue";

export const state = reactive({
  activity: {},
  bookmarks: [
    // {
    //   id: 0,
    //   time: "00:01:10",
    //   distance: 10,
    //   distanceUnits: "km",
    //   pace: "3:40/km",
    //   speed: "17km/h",
    // },
    // {
    //   id: 1,
    //   time: "00:01:10",
    //   distance: 10,
    //   distanceUnits: "km",
    //   pace: "3:40/km",
    //   speed: "17km/h",
    // },
    // {
    //   id: 2,
    //   time: "00:01:10",
    //   distance: 10,
    //   distanceUnits: "km",
    //   pace: "3:40/km",
    //   speed: "17km/h",
    // },
    // {
    //   id: 3,
    //   time: "00:01:10",
    //   distance: 10,
    //   distanceUnits: "km",
    //   pace: "3:40/km",
    //   speed: "17km/h",
    // },
  ],
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
    this.saveBookmarks();
  },
  saveBookmarks() {
    if (this.bookmarks.length > 0) {
      localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
      return true;
    }
    return false;
  },
  loadBookmarks() {
    if (this.bookmarks.length === 0) {
      this.bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    }
  },
});
