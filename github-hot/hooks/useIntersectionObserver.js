const { useRef, useState, useEffect } = React;

export default function useIntersectionObserver({
  target,
  onIntersect
}) {
  useEffect(() => {
    const config = {
      rootMargin: "0px",
      threshold: 0
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect();
          }
        })
      },
      config
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target, onIntersect]);
}
