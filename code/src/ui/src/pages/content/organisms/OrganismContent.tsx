import React from 'react';
import { useEffect, useState, ReactNode } from 'react';
import { DesignSystem, Event, EventType, Organism} from 'a11y-theme-builder-sdk';
import { LeftNavHeader, LeftNavItem } from '../../../components/LeftNavTabs';
import OrganismIntro from './OrganismIntro';
import { ErrorHandler } from '../../../ErrorHandler';
import { HeroOrganism } from '../../organisms/HeroOrganism';
import { List, ListItemButton, ListItemText, ListSubheader, styled, Collapse, Button, InputLabel, TextField, InputAdornment } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface organismItem {
    value: string;
    label: string;
    organism: string;
    disabled: boolean;
}

const organismsList: {[key: string]:organismItem} = {
    dataTables: {value: "dataTables", label: "Data Tables", organism: "Data Tables", disabled: false},
    hero: {value: "hero", label: "Hero", organism: "Hero", disabled: false},
    primaryNav: {value: "primaryNav", label: "Primary Nav", organism: "Primary Nav", disabled: false},
    secondaryNav: {value: "secondaryNav", label: "Secondary Nav", organism: "Secondary Nav", disabled: false},
    footerAndCopyright: {value: "footerAndCopyright", label: "Footer and Copyright", organism: "Footer and Copyright", disabled: false},
}

// Organisms that are not going to be implemented for MVP
const notImplemented = [""]

interface Props {
    user: any;
    designSystem: DesignSystem;
}

export const OrganismContent: React.FC<Props> = ({ user, designSystem }) => {

    let navigationSelected = false;
    if (localStorage.getItem("themebuilder-organism-navigation-selected") == "true") {
        navigationSelected = true;
    }
    const [displayNavigation, setDisplayNavigation] = useState<boolean>(navigationSelected);
    useEffect(() => {
        console.log("displayNavigation=",displayNavigation)
        localStorage.setItem("themebuilder-organism-navigation-selected", ""+displayNavigation)
    }, [displayNavigation])

    const [organisms, setOrganisms] = useState<{[key: string]:organismItem}>(organismsList);
    useEffect(() => {
        if (designSystem) {
            designSystem.setListener("OrganismContent-isEditable", 
                function(event: Event) {
                    if (event.type == EventType.NodeDisabled) {
                        const node = event.node;
                        if (node instanceof Organism) {
                            console.log("Node=",node);
                            const disabled = !node.isEnabled();
                            if (organisms[node.name].disabled != disabled) {
                                const _organisms = {...organisms};
                                _organisms[node.name].disabled = disabled;
                                setOrganisms(_organisms);
                            }
                        }
                    }
                }
            )
            let _organisms = {...organisms};
            for (const [key, node] of Object.entries(designSystem.molecules)) {
                if (node instanceof Organism) {
                    if (notImplemented.indexOf(key) == -1) {
                        if (_organisms[key]) {
                            //_organisms[key].disabled = false; //TODO: remove when done developing
                            _organisms[key].disabled = !node.isEnabled(); //TODO: uncomment when done developing
                        }
                    }
                }
            }
            setOrganisms(_organisms);
        }
    }, [])
    
    useEffect(() => {
        //console.log("Molecules updated =",molecules)
    }, [organisms])

    const [showOrganism, setShowOrganism] = React.useState(localStorage.getItem("themebuilder-organism-content-selected") || "organisms");
    useEffect(() => {
        localStorage.setItem("themebuilder-organism-content-selected", showOrganism)
    }, [showOrganism])

    interface LeftNavOrganismProps { item: any, indent?:number, disabled?:boolean };
    const LeftNavOrganism : React.FC<LeftNavOrganismProps> = ({item, indent, disabled}) => {
        return (
            <LeftNavItem 
                selected={showOrganism}
                value={item.value}
                text={item.label} 
                indent={indent} 
                disabled={disabled !== undefined ? disabled : item.disabled} 
                onClick={()=> {setShowOrganism(item.value)}}
            />
        )
    }

    return (
        <>
            <div className="design-system-editor-left-nav">
            <List 
                    sx={{
                        '& ul': {padding:0}
                    }}
                >
                    <LeftNavHeader>Introduction</LeftNavHeader>
                    <LeftNavItem text="Organisms" value="organisms" selected={showOrganism} indent={1} onClick={()=> {setShowOrganism("organisms")}}/>
                    <LeftNavHeader>Assign Desktop Style</LeftNavHeader>
                    <LeftNavOrganism item={organisms.dataTables} indent={2} />
                    <LeftNavOrganism item={organisms.hero} indent={2} />
                    <LeftNavItem text={"Navigation"} indent={1} onClick={()=>setDisplayNavigation(!displayNavigation)}>
                        {displayNavigation ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayNavigation} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <LeftNavOrganism item={organisms.primaryNav} indent={2} />
                            <LeftNavOrganism item={organisms.secondaryNav} indent={2} />
                            <LeftNavOrganism item={organisms.footerAndCopyright} indent={2} />
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className="design-system-editor-right-content">
                {showOrganism === "organisms" && (
                    <OrganismIntro />
                )}
                {showOrganism === "dataTables" && (
                    <div>dataTables</div>
                )}
                {showOrganism === "hero" && (
                    <ErrorHandler>
                        <HeroOrganism organism={designSystem.organisms.hero}/>
                    </ErrorHandler>
                )}
                {showOrganism === "primaryNav" && (
                    <div>primaryNav</div>
                )}
                {showOrganism === "secondaryNav" && (
                    <div>secondaryNav</div>
                )}
                {showOrganism === "footerCopyright" && (
                    <div>footerCopyright</div>
                )}
            </div>
        </>
    );
}
