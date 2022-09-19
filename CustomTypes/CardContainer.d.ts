import CardContainer from "react-native-imaged-card-view";
import { FC } from "react";

export interface CardContainer extends FC<CardContainerProps> {}

export type CardContainerProps = {
  title: string;
  width: number;
  height: number;
  subtitle: string;
  titleColor: string;
  borderRadius: number;
  dividerColor: string;
  leftSideColor: string;
  leftSideTitle: string;
  subtitleColor: string;
  leftSideValue: string;
  rightSideValue: string;
  rightSideColor: string;
  rightSideTitle: string;
  backgroundColor: string;
  leftSideValueColor: string;
  rightSideValueColor: string;
};

export default CardContainer;
