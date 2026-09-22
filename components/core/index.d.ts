import type { FC, ReactElement } from "react";
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
import type { IconProps, IconName } from "./Icon";
import type { SheetProps } from "./Sheet";
import type { FieldProps } from "./Field";
import type { SelectProps, SelectOption } from "./Select";
import type { TextareaProps } from "./Textarea";
import type { CheckboxProps } from "./Checkbox";
import type { BannerProps, BannerTone } from "./Banner";
import type { ToastProps, ToastAction } from "./Toast";
import type { SkeletonProps } from "./Skeleton";
import type { EmptyStateProps } from "./EmptyState";
import type { ErrorStateProps } from "./ErrorState";

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
  IconProps,
  SheetProps,
  FieldProps,
  SelectProps,
  SelectOption,
  TextareaProps,
  CheckboxProps,
  IconName,
  BannerProps,
  BannerTone,
  ToastProps,
  ToastAction,
  SkeletonProps,
  EmptyStateProps,
  ErrorStateProps,
};

export declare const Button: FC<ButtonProps>;
export declare const Card: FC<CardProps>;
export declare const Chip: FC<ChipProps>;
export declare const Input: FC<InputProps>;
export declare const StatTile: FC<StatTileProps>;

export declare const Group: FC<GroupProps>;
export declare const Row: FC<RowProps>;
export declare const GlyphTile: FC<GlyphTileProps>;
export declare function Segmented<T extends string = string>(props: SegmentedProps<T>): ReactElement;
export declare const Switch: FC<SwitchProps>;
export declare const StatStrip: FC<StatStripProps>;

// Icons.
export declare const Icon: FC<IconProps>;
export { ICON_NAMES } from "./Icon";

// Elevation.
export declare const Sheet: FC<SheetProps>;

// Forms.
export declare const Field: FC<FieldProps>;
export declare const Select: FC<SelectProps>;
export declare const Textarea: FC<TextareaProps>;
export declare const Checkbox: FC<CheckboxProps>;

// Feedback and states.
export declare const Banner: FC<BannerProps>;
export declare const Toast: FC<ToastProps>;
export declare const Skeleton: FC<SkeletonProps>;
export declare const EmptyState: FC<EmptyStateProps>;
export declare const ErrorState: FC<ErrorStateProps>;
