"use client";

import theme from "@material-tailwind/react/theme";
import combineMerge from "@material-tailwind/react/utils/combineMerge";
import deepmerge from "deepmerge";

theme.rating.defaultProps.ratedIcon = null;
theme.rating.defaultProps.unratedIcon = null;

deepmerge(theme, {}, { arrayMerge: combineMerge });

export { ThemeProvider } from "@material-tailwind/react";
