export function saveBookmarks(
  bookmarks: any[]
) {
  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );
}

export function getBookmarks() {
  return JSON.parse(
    localStorage.getItem(
      "bookmarks"
    ) || "[]"
  );
}