import HemisphereSelect from "./components/HemisphereSelect.tsx";
import CritterTypeSelect from "./components/CritterTypeSelect.tsx";
import CritterLookup from "./components/CritterLookup.tsx";
import MonthSelect from "./components/MonthSelect.tsx";
// import CritterClockShowcase from "./test/CritterClockShowcase.tsx";

function CritterClock() {
    return (<>
        {/*<CritterClockShowcase></CritterClockShowcase>*/}
        <HemisphereSelect></HemisphereSelect>
        <MonthSelect></MonthSelect>
        <CritterTypeSelect></CritterTypeSelect>
        <CritterLookup></CritterLookup>
    </>)
}

export default CritterClock;
