import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './scrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationStart = 'top bottom',
  rotationEnd = 'bottom 70%',
  wordAnimationStart = 'top 85%',
  wordAnimationEnd = 'bottom 35%',
}) => {
  const containerRef = useRef(null);

  // Robust string extraction from string, array, or nested React elements
  const textContent = useMemo(() => {
    const extract = (node) => {
      if (node == null) return '';
      if (typeof node === 'string' || typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extract).join('');
      if (node.props && node.props.children) return extract(node.props.children);
      return '';
    };
    return extract(children);
  }, [children]);

  const splitText = useMemo(() => {
    return textContent.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [textContent]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Use gsap.context for React 18 / StrictMode compatibility & proper cleanup
    const ctx = gsap.context(() => {
      if (baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: '0% 50%', rotate: baseRotation },
          {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: rotationStart,
              end: rotationEnd,
              scrub: true,
            },
          }
        );
      }

      const wordElements = el.querySelectorAll('.word');
      if (wordElements.length > 0) {
        const fromVars = {
          opacity: baseOpacity,
          willChange: enableBlur ? 'opacity, filter' : 'opacity',
        };
        const toVars = {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: wordAnimationStart,
            end: wordAnimationEnd,
            scrub: true,
          },
        };

        if (enableBlur) {
          fromVars.filter = `blur(${blurStrength}px)`;
          toVars.filter = 'blur(0px)';
        }

        gsap.fromTo(wordElements, fromVars, toVars);
      }
    }, containerRef);

    // Refresh ScrollTrigger so trigger coordinates are accurately calculated
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationStart,
    rotationEnd,
    wordAnimationStart,
    wordAnimationEnd,
    blurStrength,
    splitText,
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
