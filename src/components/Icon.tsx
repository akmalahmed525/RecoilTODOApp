import React, {FC} from 'react';

import {SvgProps, SvgXml} from 'react-native-svg';

type IconProps = {
  xml: string;
} & SvgProps;
export const Icon: FC<IconProps> = ({xml, ...props}) => (
  <SvgXml xml={xml} {...props} />
);
