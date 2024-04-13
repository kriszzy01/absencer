import "../main.css";

import Absences from "@/absences/Absences";
import { AppProvider } from "@/providers/app";

function App() {
  return (
    <AppProvider>
      <Absences />
    </AppProvider>
  );
}

export default App;
