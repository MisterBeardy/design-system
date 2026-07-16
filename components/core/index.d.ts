import type { FC } from "react";
import type { ButtonProps } from "./Button";
import type { CardProps } from "./Card";
import type { ChipProps } from "./Chip";
import type { InputProps } from "./Input";
import type { StatTileProps } from "./StatTile";
import type { GroupProps } from "./Group";
import type { RowProps } from "./Row";
import type { GlyphTileProps, GlyphTone } from "./GlyphTile";
import type { SegmentedProps, SegmentedOption } from "./Segmented";
import type { SwitchProps } from "./Switch";
import type { StatStripProps, Stat } from "./StatStrip";

export type {
  ButtonProps,
  CardProps,
  ChipProps,
  InputProps,
  StatTileProps,
  GroupProps,
  RowProps,
  GlyphTileProps,
  GlyphTone,
  SegmentedProps,
  SegmentedOption,
  SwitchProps,
  StatStripProps,
  Stat,
};

export declare const Button: FC<ButtonProps>;
export declare const Card: FC<CardProps>;
export declare const Chip: FC<ChipProps>;
export declare const Input: FC<InputProps>;
export declare const StatTile: FC<StatTileProps>;

export declare const Group: FC<GroupProps>;
export declare const Row: FC<RowProps>;
export declare const GlyphTile: FC<GlyphTileProps>;
export declare function Segmented<T extends string = string>(props: SegmentedProps<T>): JSX.Element;
export declare const Switch: FC<SwitchProps>;
export declare const StatStrip: FC<StatStripProps>;
