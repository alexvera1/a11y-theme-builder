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
import { SmBackgroundImageTextRight } from "../../mui-a11y-tb/templates/SmBackgroundImageTextRight";
import { SmBackgroundImageTextLeft } from "../../mui-a11y-tb/templates/SmBackgroundImageTextLeft";
import { MdBackgroundImageTextRight } from "../../mui-a11y-tb/templates/MdBackgroundImageTextRight";
import { MdBackgroundImageTextLeft } from "../../mui-a11y-tb/templates/MdBackgroundImageTextLeft";
import { LgBackgroundImageTextRight } from "../../mui-a11y-tb/templates/LgBackgroundImageTextRight";
import { LgBackgroundImageTextLeft } from "../../mui-a11y-tb/templates/LgBackgroundImageTextLeft";

interface Props {
    colorMode?: string;
}


export const BackgroundImageExample: React.FC<Props> = ({ }) => {

      const [colorMode, setColorMode] = useState<string>("");

      return (
          <div>
              <HeadingSection title="Templates" heading="Image & Text" />
              <SectionColorModeSelector colorMode={colorMode} setColorMode={setColorMode}>
              </SectionColorModeSelector>
              <div className={colorMode}></div>
              <ExampleSection>
                  <div className="subtitle1">Small Image on Right</div>
                  <SmBackgroundImageTextRight className={"top40 " + colorMode} />
                  <p></p>
                  <div className="subtitle1">Small Image on Left</div>
                  <SmBackgroundImageTextLeft className={"top40 " + colorMode} />
                  <p></p>
                  <div className="subtitle1">Medium Image on Right</div>
                  <MdBackgroundImageTextRight className={"top40 " + colorMode} />
                  <p></p>
                  <div className="subtitle1">Medium Image on Left</div>
                  <MdBackgroundImageTextLeft className={"top40 " + colorMode} />
                  <p></p>
                  <div className="subtitle1">Large Image on Right</div>
                  <LgBackgroundImageTextRight className={"top40 " + colorMode} />
                  <p></p>
                  <div className="subtitle1">Large Image on Left</div>
                  <LgBackgroundImageTextLeft className={"top40 " + colorMode} />
              </ExampleSection>
          </div>
      )
  }