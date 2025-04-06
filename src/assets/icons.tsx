import { Icon } from '@mui/material';
//Icon credit: Katherine Manalo, manaloka.com
import FishSvg from './icons/Fish.svg';
import BugSvg from './icons/Bug.svg';
import SeaSvg from './icons/Sea.svg';

export const FishIcon = () => (
    <Icon>
        <img alt={"fish icon"} src={FishSvg} height={25} width={25}/>
    </Icon>
)

export const BugIcon = () => (
    <Icon>
        <img alt={"bug icon"} src={BugSvg} height={25} width={25}/>
    </Icon>
)

export const SeaIcon = () => (
    <Icon>
        <img alt={"sea creature icon"} src={SeaSvg} height={25} width={25}/>
    </Icon>
)
