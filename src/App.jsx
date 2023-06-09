import { DownloaderProvider } from "./context/DownloaderProvider";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <DownloaderProvider>
        <HomePage></HomePage>
      </DownloaderProvider>
    </>
  );
}

export default App;
