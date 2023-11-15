import { useEffect } from "react"

export default function Viewer({ viewerRef, content }) {
    useEffect(() => {
        const putViewer = async () => {
            const toastViewer = (await import("@toast-ui/editor/dist/toastui-editor-viewer")).default;

            try {
                if (viewerRef.current === null) return;

                viewerRef.current.innerText = "";

                viewerRef.current.viewerInstance = new toastViewer({
                    el: viewerRef.current,
                    height: "90vh",
                    initialValue: content
                });
            } catch (error) {
                console.error(error);
            }
        }

        putViewer();
    }, []);

    useEffect(() => {
        if (viewerRef.current.viewerInstance === undefined) return;

        viewerRef.current.viewerInstance.setMarkdown(content);
    }, [content])

    return <div ref={viewerRef}>Loading</div>
}