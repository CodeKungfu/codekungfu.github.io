import { LazyLoadWithSrcSet } from './LazyLoadWithSrcSet'
function getSrcset(url) {
    const sm = `${url}&s=100 640w`;
    const md = `${url}&s=120 768w`;
    const lg = `${url}&s=160 1024w`;
    const xl = `${url}&s=200 1280w`;
    const xl2 = `${url}&s=400 1536w`;
    return `${sm}, ${md}, ${lg}, ${xl}, ${xl2}`;
}
export function Avatar(props) {
    const url = props.url;
    const srcset = getSrcset(url);

    return (
        <LazyLoadWithSrcSet
        url={url}
        srcset={srcset}
        ></LazyLoadWithSrcSet>
    );
}