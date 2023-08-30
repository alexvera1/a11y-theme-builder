﻿/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import React from 'react';
import { useEffect, useState, ReactNode } from 'react';
import { DesignSystem, Event, EventType, Popovers } from 'a11y-theme-builder-sdk';
import TemplatesIntro from './TemplatesIntro';
import { ErrorHandler } from '../../../ErrorHandler';
import { List, ListItemButton, ListItemText, ListSubheader, styled, Collapse, Button, InputLabel, TextField, InputAdornment } from '@mui/material';
import { LeftNavHeader, LeftNavItem } from '../../../components/LeftNavTabs';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { TextLayouts } from '../../templates/TextLayouts';
import { TextIconLayouts } from '../../templates/TextIconLayouts';
import { DecorativeTextLayouts } from '../../templates/DecorativeTextLayouts';
import { DecorativeTextIconLayouts } from '../../templates/DecorativeTextIconLayouts';
import { ImagesOnly } from '../../templates/ImagesOnly';
import { TemplateExample } from '../../templates/TemplateExample';
import { BackgroundImageExample } from '../../templates/BackgroundImageExample';
import { FullWidthBackgrounds } from '../../templates/FullWidthBackgrounds';
import { FullWidthVideo } from '../../templates/FullWidthVideo';
import { ListsSingle } from '../../templates/ListsSingle';
import { ListsDouble } from '../../templates/ListsDouble';
import { ListsDoubleImageLeft } from '../../templates/ListsDoubleImageLeft';
import { ListsTriple } from '../../templates/ListsTriple';
import { ListsSingleClickable } from '../../templates/ListsSingleClickable';
import { ListsDoubleClickable  } from '../../templates/ListsDoubleClickable';
import { ListsTripleClickable  } from '../../templates/ListsTripleClickable';
import { ListsDoubleClickableImageLeft } from '../../templates/ListsDoubleClickableImageLeft';
import { CardsStandard  } from '../../templates/CardsStandard';
import { IconCardsStandard  } from '../../templates/IconCardsStandard';
import { ImageCardsStandard  } from '../../templates/ImageCardsStandard';
import { ImageCardsStandard916  } from '../../templates/ImageCardsStandard916';
import { PricingCardSamples } from '../../templates/PricingCardSamples';
import { StatCardSamples } from '../../templates/StatCardSamples';
import { StatIconCardSamples } from '../../templates/StatIconCardSamples';
import { VideoLayouts  } from '../../templates/VideoLayouts';
import { YouTubeLayouts  } from '../../templates/YouTubeLayouts';
import { FooterLayouts  } from '../../templates/FooterLayouts';
import { TeamLayouts  } from '../../templates/TeamLayouts';
import { FeatureLayouts  } from '../../templates/FeatureLayouts';
import { TestimonialLayouts  } from '../../templates/TestimonialLayouts';
import { TestimonialCardLayouts  } from '../../templates/TestimonialCardLayouts';

import { Preferences } from '../../../Preferences';

const name = "TemplatesContent"

interface templateItem {
    value: string;
    label: string;
    template: string;
    disabled: boolean;
}

const templateList: {[key: string]:templateItem} = {
    textVariations: {value: "textVariations", label: "Text Only, Centered to Page", template: "textVariations", disabled: false},
    textIconVariations: {value: "textIconVariations", label: "Text with Icon, Centered to Page", template: "textIconVariations", disabled: false},
    decoractivetextVariations: {value: "decoractivetextVariations", label: "Decorative Text, Centered to Page", template: "decoractivetextVariations", disabled: false},
    decoractivetextIconVariations: {value: "decoractivetextIconVariations", label: "Decorative Text with Icon, Centered to Page", template: "decoractivetextIconVariations", disabled: false},
    imageText: {value: "imageText", label: "Image & Text", template: "ImageText", disabled: false},
    backgroundimageText: {value: "backgroundimageText", label: "Background Image & Text", template: "ImageText", disabled: false},
    fullBackground: {value: "fullBackground", label: "Full Width Backgrounds", template: "fullBackground", disabled: false},
    fullVideo: {value: "fullVideo", label: "Full Width Video", template: "fullVideo", disabled: false},
    listVariations: {value: "listVariations", label: "List - Single Line", template: "listVariations", disabled: false},
    listsDoubleVariations: {value: "listsDoubleVariations", label: "List - Double Line", template: "listsDoubleVariations", disabled: false},
    listsTripleVariations: {value: "listsTripleVariations", label: "List - Triple Line", template: "listsTripleVariations", disabled: false},
    listVariationsClickable: {value: "listVariationsClickable", label: "Lists, Clickable - Single Line", template: "listVariationsClickable", disabled: false},
    listsDoubleVariationsClickable: {value: "listsDoubleVariationsClickable", label: "Lists, Clickable - Double Line", template: "listsDoubleVariationsClickable", disabled: false},
    listsTripleVariationsClickable: {value: "listsTripleVariationsClickable", label: "Lists, Clickable - Triple Line", template: "listsTripleVariationsClickable", disabled: false},
    listsDoubleVariationsImageLeft: {value: "listsDoubleVariationsImageLeft", label: "List - Double Line", template: "listsDoubleVariationsImageLeft", disabled: false},
    listsDoubleVariationsClickableImageLeft: {value: "listsDoubleVariationsClickableImageLeft", label: "Lists, Clickable - Double Line", template: "listsDoubleVariationsClickableImageLeft", disabled: false},
    cardVariationsStandard: {value: "cardVariationsStandard", label: "Cards, Standard", template: "cardVariationsStandard", disabled: false},
    cardVariationsIcons: {value: "cardVariationsIcons", label: "Cards, with Icons", template: "cardVariationsIcons", disabled: false},
    imageCardVariations: {value: "imageCardVariations", label: "Cards, with Images 9:21", template: "imageCardVariations", disabled: false},
    imageCard916Variations: {value: "imageCard916Variations", label: "Cards, with Images 9:16", template: "imageCard916Variations", disabled: false},
    pricingCardVariations: {value: "pricingCardVariations:", label: "Cards, with Pricing", template: "pricingCardVariations:", disabled: false},
    statCardVariations: {value: "statCardVariations:", label: "Cards, with Stats", template: "statCardVariations:", disabled: false},
    staticonCardVariations: {value: "staticonCardVariations:", label: "Cards, with Stats & Icons", template: "staticonCardVariations", disabled: false},
    imagesOnlyVariations: {value: "imagesOnlyVariations", label: "Images Only", template: "imagesOnlyVariations", disabled: false},
    videoVariations: {value: "videoVariations", label: "Videos", template: "videoVariations", disabled: false},
    youTubeVariations: {value: "youTubeVariations", label: "YouTube Videos", template: "youTubeVariations", disabled: false},
    footerVariations: {value: "footerVariations", label: "Footers", template: "footerVariations", disabled: false},
    teamVariations: {value: "teamVariations", label: "Teams", template: "teamVariations", disabled: false},
    featureVariations: {value: "featureVariations", label: "Feature Highlights", template: "featureVariations", disabled: false},
    testimonialVariations: {value: "testimonialVariations", label: "Testimonials", template: "testimonialVariations", disabled: false},
    testimonCardVariations: {value: "testimonCardVariations", label: "Testimonial Cards", template: "testimonCardVariations", disabled: false},

}

interface Props {
    user: any;
    designSystem: DesignSystem;
}

export const TemplatesContent: React.FC<Props> = ({ user, designSystem }) => {
    const pref = new Preferences(designSystem.name);

    let generalSelected = false;
    if (pref.get("templates-general-selected") == "true") {
        generalSelected = true;
    }
    const [displayGeneral, setDisplayGeneral] = useState<boolean>(generalSelected);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayGeneral)
    }, [displayGeneral])

    let videoSelected = false;
    if (pref.get("templates-templates-selected") == "true") {
        videoSelected = true;
    }
    const [displayVideo, setDisplayVideo] = useState<boolean>(videoSelected);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayVideo)
    }, [displayVideo])

    let listSelected = false;
    const [displayLists, setDisplayList] = useState<boolean>(listSelected);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayLists)
    }, [displayLists])

    let listSelectedImageLeft = false;
    const [displayListsImageLeft, setDisplayListImageLeft] = useState<boolean>(listSelectedImageLeft);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayListsImageLeft)
    }, [displayListsImageLeft])

    let cardsClickable = false;
    const [displayCardsClickable, setDisplayCardsClickable] = useState<boolean>(cardsClickable);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayCardsClickable)
    }, [displayCardsClickable])

    let otherSelected = false;
    const [displayOther, setDisplayOther] = useState<boolean>(otherSelected);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayOther)
    }, [displayOther])

    let textSelected = false;
    const [displayText, setDisplayText] = useState<boolean>(textSelected);
    useEffect(() => {
        pref.set("templates-templates-selected", ""+displayText)
    }, [displayText])

    const [templates, setTemplates] = useState<{[key: string]:templateItem}>(templateList);



    useEffect(() => {
    }, [templates])

    const [showTemplate, setShowTemplate] = React.useState(pref.get("template-content-selected") || "templates");
    useEffect(() => {
        pref.set("template-content-selected", showTemplate)
        console.log(`${name} - showTemplate=${showTemplate}`)
    }, [showTemplate])

    interface LeftNavTemplatesProps { item: any, indent?:number, disabled?:boolean };
    const LeftNavTemplates : React.FC<LeftNavTemplatesProps> = ({item, indent, disabled}) => {
        return (
            <LeftNavItem
                selected={showTemplate}
                value={item.value}
                text={item.label}
                indent={indent}
                disabled={disabled !== undefined ? disabled : item.disabled}
                onClick={()=> {setShowTemplate(item.value)}}
            />
        )
    }
    return (
        <>
            <div className="design-system-editor-left-nav">
            <div className="design-system-editor-left-nav-scrollable">
                <List
                    sx={{
                        '& ul': {padding:0},
                        paddingTop: "0px",
                    }}
                >
                    <LeftNavHeader>Introduction</LeftNavHeader>
                    <LeftNavItem text={"Templates"} value="templates" indent={1} selected={showTemplate} onClick={()=> {setShowTemplate("templates")}}/>

                    <LeftNavHeader>Template Settings</LeftNavHeader>
                    <LeftNavItem text={"Text"} indent={1} onClick={()=>setDisplayText(!displayText)}>
                        {displayText ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayText} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                          <LeftNavTemplates item={templates.textVariations} indent={2} />
                      </List>
                      <List component="div" disablePadding>
                          <LeftNavTemplates item={templates.textIconVariations} indent={2} />
                      </List>
                      <List component="div" disablePadding>
                          <LeftNavTemplates item={templates.decoractivetextVariations} indent={2} />
                      </List>
                      <List component="div" disablePadding>
                          <LeftNavTemplates item={templates.decoractivetextIconVariations} indent={2} />
                      </List>
                    </Collapse>
                    <LeftNavItem text={"Images"} indent={1} onClick={()=>setDisplayGeneral(!displayGeneral)}>
                        {displayGeneral ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayGeneral} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.imagesOnlyVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.imageText} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.backgroundimageText} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.fullBackground} indent={2} />
                        </List>
                    </Collapse>
                    <LeftNavItem text={"Videos"} indent={1} onClick={()=>setDisplayVideo(!displayVideo)}>
                        {displayVideo ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayVideo} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.videoVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.youTubeVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.fullVideo} indent={2} />
                        </List>
                    </Collapse>
                    <LeftNavItem text={"Lists, Center Aligned"} indent={1} onClick={()=>setDisplayList(!displayLists)}>
                        {displayLists ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayLists} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listsDoubleVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listsTripleVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listVariationsClickable} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listsDoubleVariationsClickable} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listsTripleVariationsClickable} indent={2} />
                        </List>
                    </Collapse>
                    <LeftNavItem text={"Lists, Image Left"} indent={1} onClick={()=>setDisplayListImageLeft(!displayListsImageLeft)}>
                        {displayListsImageLeft ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayListsImageLeft} timeout="auto" unmountOnExit>

                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listsDoubleVariationsImageLeft} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.listsDoubleVariationsClickableImageLeft} indent={2} />
                        </List>
                    </Collapse>
                    <LeftNavItem text={"Cards, White"} indent={1} onClick={()=>setDisplayCardsClickable(!displayCardsClickable)}>
                        {displayCardsClickable ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayCardsClickable} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.cardVariationsStandard} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.cardVariationsIcons} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.imageCard916Variations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.imageCardVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.statCardVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.staticonCardVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.pricingCardVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.testimonCardVariations} indent={2} />
                        </List>
                    </Collapse>

                    <LeftNavItem text={"Cards, White"} indent={1} onClick={()=>setDisplayCardsClickable(!displayCardsClickable)}>
                        {displayCardsClickable ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <LeftNavItem text={"Other"} indent={1} onClick={()=>setDisplayOther(!displayOther)}>
                        {displayOther ? <ExpandLess /> : <ExpandMore />}
                    </LeftNavItem>
                    <Collapse in={displayOther} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.footerVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.teamVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.featureVariations} indent={2} />
                        </List>
                        <List component="div" disablePadding>
                            <LeftNavTemplates item={templates.testimonialVariations} indent={2} />
                        </List>
                    </Collapse>
                </List>
            </div>
            </div>
            <div className="design-system-editor-right-content">
            <div className="design-system-editor-right-content-scrollable">
                {showTemplate === "templates" &&
                    <TemplatesIntro />
                }
                {showTemplate === templates.imageText.value && (
                    <ErrorHandler>
                        <TemplateExample />
                    </ErrorHandler>
                )}
                {showTemplate === templates.imagesOnlyVariations.value && (
                    <ErrorHandler>
                        <ImagesOnly />
                    </ErrorHandler>
                )}
                {showTemplate === templates.backgroundimageText.value && (
                    <ErrorHandler>
                        <BackgroundImageExample />
                    </ErrorHandler>
                )}
                {showTemplate === templates.fullBackground.value && (
                    <ErrorHandler>
                        <FullWidthBackgrounds />
                    </ErrorHandler>
                )}
                {showTemplate === templates.fullVideo.value && (
                    <ErrorHandler>
                        <FullWidthVideo />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listVariations.value && (
                    <ErrorHandler>
                        <ListsSingle />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listsDoubleVariations.value && (
                    <ErrorHandler>
                        <ListsDouble />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listsDoubleVariationsImageLeft.value && (
                    <ErrorHandler>
                        <ListsDoubleImageLeft />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listsTripleVariations.value && (
                    <ErrorHandler>
                        <ListsTriple />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listVariationsClickable.value && (
                    <ErrorHandler>
                        <ListsSingleClickable />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listsDoubleVariationsClickable.value && (
                    <ErrorHandler>
                        <ListsDoubleClickable />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listsDoubleVariationsClickableImageLeft.value && (
                    <ErrorHandler>
                        <ListsDoubleClickableImageLeft />
                    </ErrorHandler>
                )}
                {showTemplate === templates.listsTripleVariationsClickable.value && (
                    <ErrorHandler>
                        <ListsTripleClickable />
                    </ErrorHandler>
                )}
                {showTemplate === templates.cardVariationsStandard.value && (
                    <ErrorHandler>
                        <CardsStandard />
                    </ErrorHandler>
                )}
                {showTemplate === templates.cardVariationsIcons.value && (
                    <ErrorHandler>
                        <IconCardsStandard />
                    </ErrorHandler>
                )}
                {showTemplate === templates.imageCardVariations.value && (
                    <ErrorHandler>
                        <ImageCardsStandard />
                    </ErrorHandler>
                )}
                {showTemplate === templates.imageCard916Variations.value && (
                    <ErrorHandler>
                        <ImageCardsStandard916 />
                    </ErrorHandler>
                )}
                {showTemplate === templates.statCardVariations.value && (
                    <ErrorHandler>
                        <StatCardSamples />
                    </ErrorHandler>
                )}
                {showTemplate === templates.staticonCardVariations.value && (
                    <ErrorHandler>
                        <StatIconCardSamples />
                    </ErrorHandler>
                )}
                {showTemplate === templates.pricingCardVariations.value && (
                    <ErrorHandler>
                        <PricingCardSamples />
                    </ErrorHandler>
                )}
                {showTemplate === templates.videoVariations.value && (
                    <ErrorHandler>
                        <VideoLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.youTubeVariations.value && (
                    <ErrorHandler>
                        <YouTubeLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.textVariations.value && (
                    <ErrorHandler>
                        <TextLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.decoractivetextIconVariations.value && (
                    <ErrorHandler>
                        <DecorativeTextIconLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.decoractivetextVariations.value && (
                    <ErrorHandler>
                        <DecorativeTextLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.textIconVariations.value && (
                    <ErrorHandler>
                        <TextIconLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.footerVariations.value && (
                    <ErrorHandler>
                        <FooterLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.teamVariations.value && (
                    <ErrorHandler>
                        <TeamLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.featureVariations.value && (
                    <ErrorHandler>
                        <FeatureLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.testimonialVariations.value && (
                    <ErrorHandler>
                        <TestimonialLayouts />
                    </ErrorHandler>
                )}
                {showTemplate === templates.testimonCardVariations.value && (
                    <ErrorHandler>
                        <TestimonialCardLayouts />
                    </ErrorHandler>
                )}

            </div>
            </div>
        </>
    );
}