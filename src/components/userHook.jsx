import { useState, useEffect } from 'react';

export function useScroll(threshold = 20) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past top threshold
      setIsScrolled(currentScrollY > threshold);

      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [threshold]);

  return { isScrolled, isVisible };
}