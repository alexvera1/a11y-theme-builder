﻿/*
 * Copyright (c) 2023 Discover Financial Services
 * Licensed under MIT License. See License.txt in the project root for license information
 */
import React, {} from 'react';
import "./Hero.css";

interface Props {
    style?: any;
    children?: React.ReactNode;
    className?: string;
    color: string;
}

export const Hero: React.FC<Props> = ({style, children, className="", color=""}) => {
    return (
        <div className={"hero " + className} data-background={color} style={style}>
            {children}
        </div>
    )
}
