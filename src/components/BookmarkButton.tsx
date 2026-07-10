interface Props {
  onBookmark: () => void;
}

export default function BookmarkButton({
  onBookmark,
}: Props) {
  return (
    <button
      onClick={onBookmark}
      style={{
        marginTop: "10px",
        padding: "10px",
      }}
    >
      ⭐ Bookmark
    </button>
  );
}