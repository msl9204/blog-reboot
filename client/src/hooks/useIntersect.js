import { useCallback, useEffect, useRef } from "react";

const baseOption = {
    root: null,
    threshold: 0.5,
    rootMargin: "0px",
};

export default function useInterSect() {
    const dom = useRef();

    const checkIntersect = useCallback(([entry]) => {
        const { current } = dom;

        if (entry.isIntersecting) {
            current.style.transitionProperty = "opacity transform";
            current.style.transitionDuration = "0.5s";
            current.style.transitionTimingFunction =
                "cubic-bezier(0, 0, 0.2, 1)";
            current.style.transitionDelay = "0s";
            current.style.opacity = 1;
            current.style.transform = "translate3d(0, 0, 0)";
        }
    }, []);
    useEffect(() => {
        let observer;
        const { current } = dom;
        if (current) {
            observer = new IntersectionObserver(checkIntersect, {
                ...baseOption,
            });
            observer.observe(current);
        }

        return () => observer && observer.disconnect();
    }, [dom]);

    return {
        ref: dom,
    };
}
