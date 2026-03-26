import { useReducedMotion as useFramerReducedMotion, type Variants } from "framer-motion";

export const EASING = {
  default: [0.4, 0.0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
} as const;

export const useReducedMotion = () => useFramerReducedMotion();

export function getSafeDuration(duration: number, prefersReducedMotion?: boolean) {
  return prefersReducedMotion ? 0.1 : duration;
}

type MotionConfig = {
  duration: number;
  y?: number;
  x?: number;
  scale?: number;
};

function createFadeVariant(
  config: MotionConfig,
  prefersReducedMotion?: boolean,
  customDelay?: number
): Variants {
  return {
    hidden: {
      opacity: 0,
      y: config.y ?? 0,
      x: config.x ?? 0,
      scale: config.scale ?? 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: getSafeDuration(config.duration, prefersReducedMotion),
        delay: customDelay ?? 0,
        ease: EASING.default,
      },
    },
  };
}

export function fadeUp(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 0.8, y: 12 }, prefersReducedMotion, delay);
}

export function fadeDown(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 0.8, y: -12 }, prefersReducedMotion, delay);
}

export function fadeLeft(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 0.8, x: 16 }, prefersReducedMotion, delay);
}

export function fadeRight(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 0.8, x: -16 }, prefersReducedMotion, delay);
}

export function fadeIn(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 0.8 }, prefersReducedMotion, delay);
}

export function slowReveal(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 1.2, y: 20 }, prefersReducedMotion, delay);
}

export function scaleIn(prefersReducedMotion?: boolean, delay?: number): Variants {
  return createFadeVariant({ duration: 0.6, scale: 0.95 }, prefersReducedMotion, delay);
}

function createStagger(staggerChildren: number, prefersReducedMotion?: boolean): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
      },
    },
  };
}

export function staggerContainer(prefersReducedMotion?: boolean): Variants {
  return createStagger(0.12, prefersReducedMotion);
}

export function staggerContainerFast(prefersReducedMotion?: boolean): Variants {
  return createStagger(0.06, prefersReducedMotion);
}

export function staggerContainerSlow(prefersReducedMotion?: boolean): Variants {
  return createStagger(0.2, prefersReducedMotion);
}

export const inViewOnce = { once: true, amount: 0.2 } as const;
