import * as React from 'react';
import Svg, { SvgProps, Path, ClipPath, Defs } from 'react-native-svg';

const glassClipPath = `
M411.29 43.2
L369.61 480
h-227.2
l-45.52-436.8
c40-12.8 100.8-21.44 149.12 18.24
 46.72 38.4 105.6 41.36 135.28 9.2
z`;

const glassPath = `
M411.29 43.2
L369.61 480
h-227.2
l-45.52-436.8
z`;

const waterWavePath = `
  M100 14C241 -41 229 93 401.29 47
`;

function GlassOfWater(props: SvgProps) {
  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Defs>
        <ClipPath id="clipRect">
          <Path d={glassClipPath} fill="none" stroke="#000" translateY={20} />
        </ClipPath>
        <ClipPath id="clipWave">
          <Path d={waterWavePath} fill="none" stroke="#000" />
        </ClipPath>
      </Defs>

      <Path
        d="M443.882 5.28A15.977 15.977 0 00432.01 0h-352c-4.512 0-8.832 1.92-11.872 5.28a16.042 16.042 0 00-4.064 12.32l48 480A16.005 16.005 0 00128.01 512h256c8.224 0 15.104-6.208 15.904-14.4l48-480a15.78 15.78 0 00-4.032-12.32z"
        fill="#eceff1"
      />
      <Path d={glassPath} fill="#2196F3" clipPath="url(#clipRect)" />
    </Svg>
  );
}

export { GlassOfWater };
