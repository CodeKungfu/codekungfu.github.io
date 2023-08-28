const { useRef } = React;
import useIntersectionObserver from "../hooks/useIntersectionObserver.js";

export function LazyLoadWithSrcSet({url, srcset}) {
    const imgRef = useRef();
    useIntersectionObserver({
        target: imgRef,
        onIntersect: () => {
            if (imgRef.current) {
                imgRef.current.src = url;
                imgRef.current.srcset = srcset;
            }
        },
    });
    return (
        <img
            ref={imgRef}
            width="100"
            height="100"
            alt=""
            className="w-[60%] mx-auto"
        />
    );
}