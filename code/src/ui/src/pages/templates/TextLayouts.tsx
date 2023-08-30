﻿/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import React, { useState } from 'react';
import { DesignSystem, Images } from 'a11y-theme-builder-sdk';
import { Breadcrumbs, Button, Link, Typography, Grid } from '@mui/material';
import { ExampleSection } from '../content/ExampleSection';
import { SectionColorModeSelector } from '../content/SectionColorModeSelector';
import { HeadingSection } from '../../pages/content/HeadingSection';
import { Text } from "../../mui-a11y-tb/templates/Text";
import { TextWithDivider } from "../../mui-a11y-tb/templates/TextWithDivider";
import { TextGradient} from "../../mui-a11y-tb/templates/TextGradient";
import { TextDropColor} from "../../mui-a11y-tb/templates/TextDropColor";
import { TextCentered } from "../../mui-a11y-tb/templates/TextCentered";
import { TextWithDividerCentered } from "../../mui-a11y-tb/templates/TextWithDividerCentered";
import { TextGradientCentered } from "../../mui-a11y-tb/templates/TextGradientCentered";
import { TextDropColorCentered } from "../../mui-a11y-tb/templates/TextDropColorCentered";

interface Props {
    colorMode?: string;
}


export const TextLayouts: React.FC<Props> = ({ }) => {

      const [colorMode, setColorMode] = useState<string>("");

      return (
          <div>
              <HeadingSection title="Templates" heading="Teams" />
              <SectionColorModeSelector colorMode={colorMode} setColorMode={setColorMode}>
              </SectionColorModeSelector>
              <div className={colorMode}></div>
              <ExampleSection>
                <div className={colorMode}></div>
                <div className="subtitle1">Text with Title, Centered</div>
                <Text className={"top40 " + colorMode} />
                <p></p>
                <div className="subtitle1">Text with Divider, Centered</div>
                <TextWithDivider className={"top40 " + colorMode} />
                <p></p>
                <div className="subtitle1">Text with Title, Centered</div>
                <TextCentered className={"top40 " + colorMode} />
                <p></p>
                <div className="subtitle1">Text with Divider, Centered</div>
                <TextWithDividerCentered className={"top40 " + colorMode} />
                <p></p>        
              </ExampleSection>
          </div>
      )
  }