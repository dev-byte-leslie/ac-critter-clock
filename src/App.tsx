import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import {acTheme} from "./theme/theme.ts";
import CritterClock from "./CritterClock.tsx";

function App() {
    return (
        <ThemeProvider theme={acTheme}>
            <CritterClock />
        </ThemeProvider>
    );
}

export default App;
