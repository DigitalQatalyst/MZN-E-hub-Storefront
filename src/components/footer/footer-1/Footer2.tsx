export default function Footer2() {
  return (
    <footer
      //   data-id={dataId}
      className="w-full h-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <span>© 2025 Enterprise Journey</span>
          <span className="hidden sm:inline">v2.1.0</span>
        </div>
        <a
          href="#"
          className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          Support
        </a>
      </div>
    </footer>
  );
}
