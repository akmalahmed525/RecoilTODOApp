import React, {FC} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import {Icon} from '.';
import {scaleWidth} from '@src/utils';

type AppBarIconProps = {
  xml: string;
  onPress: (event: GestureResponderEvent) => void;
  iconStyle?: ViewStyle;
};
export const AppBarIcon: FC<AppBarIconProps> = ({
  xml,
  onPress,
  iconStyle,
  ...props
}) => {
  const {width} = useWindowDimensions();

  const hw = scaleWidth(width);

  return (
    <Pressable onPress={onPress} style={[iconStyle]} {...props}>
      <Icon xml={xml} {...{width: hw(25), height: hw(25)}} fill="#0A0A0A" />
    </Pressable>
  );
};
