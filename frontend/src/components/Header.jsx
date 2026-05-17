export default function Header() {
  return (
    <>
      <div className="header">
        <div className="header-left">
          <div className="om-symbol">ॐ</div>
          <div className="header-title">
            <span className="title-main">Devotional AI</span>
            <span className="title-sub">✦ Sacred Scriptures Assistant ✦</span>
          </div>
        </div>
        <div className="header-right">
          <div className="status-dot" />
          <span className="status-text">Divine Connection Active</span>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="divider">
        <div className="divider-line" />
        <span className="divider-lotus">🪷</span>
        <div className="divider-line" />
      </div>
    </>
  );
}
