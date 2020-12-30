import React, { useRef } from 'react';
import Animated, {
  block,
  Clock,
  clockRunning,
  concat,
  cond,
  Easing,
  Extrapolate,
  interpolate,
  not,
  set,
  startClock,
  timing,
} from 'react-native-reanimated';
import Svg, { SvgProps, Path, ClipPath, Defs } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedClipPath = Animated.createAnimatedComponent(ClipPath);

const runProgress = (clock: Clock, duration = 1000) => {
  const config: Animated.TimingConfig = {
    duration,
    toValue: new Animated.Value<number>(1),
    easing: Easing.inOut(Easing.linear),
  };

  const state: Animated.TimingState = {
    finished: new Animated.Value<number>(0),
    frameTime: new Animated.Value<number>(0),
    position: new Animated.Value<number>(0),
    time: new Animated.Value<number>(0),
  };

  return block([
    cond(not(clockRunning(clock)), startClock(clock)),

    timing(clock, state, config),

    cond(state.finished, [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, not(config.toValue)),
      set(state.finished, 0),
    ]),
    state.position,
  ]);
};

const glassPath = `
M411.29 43.2
L369.61 480
h-227.2
l-45.52-436.8
z`;

function GlassOfWater(props: SvgProps) {
  const clock_cy_1 = useRef(new Animated.Clock()).current;
  const clock_cy_2 = useRef(new Animated.Clock()).current;
  const clock_translate = useRef(new Animated.Clock()).current;

  const progress_1 = runProgress(clock_cy_1);
  const progress_2 = runProgress(clock_cy_2);
  const progress_trans_Y = runProgress(clock_translate, 10000);

  const c1_y_1 = interpolate(progress_1, {
    inputRange: [0, 1],
    outputRange: [-40.5116, 30.5116],
    extrapolate: Extrapolate.CLAMP,
  });

  const c1_y_2 = interpolate(progress_2, {
    inputRange: [0, 1],
    outputRange: [93.4884, -23.4884],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateY = interpolate(progress_trans_Y, {
    inputRange: [0, 1],
    outputRange: [450, 35],
    extrapolate: Extrapolate.CLAMP,
  });

  const glassClipPath = concat(
    `
    M411.29 43.2
    L369.61 480
    H142.41
    L96.89 43.2
    C174.291 `,
    c1_y_1,
    ` 219.438 `,
    c1_y_2,
    ` 411.29 43.2
    z`
  );

  return (
    <Svg viewBox="0 0 512 512" {...props}>
      <Defs>
        <AnimatedClipPath id="clipRect" style={{ transform: [{ translateY }] }}>
          <AnimatedPath d={glassClipPath} fill="none" />
        </AnimatedClipPath>
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
