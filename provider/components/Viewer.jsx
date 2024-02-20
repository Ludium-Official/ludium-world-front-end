"use client";

import { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function Viewer({ content, height }) {
  const viewerRef = useRef(null);
  useEffect(() => {
    const putViewer = async () => {
      const toastViewer = (
        await import("@toast-ui/editor/dist/toastui-editor-viewer")
      ).default;

      try {
        if (viewerRef.current === null) return;

        viewerRef.current.innerText = "";

        viewerRef.current.viewerInstance = new toastViewer({
          el: viewerRef.current,
          width: "100%",
          height: height ?? "90vh",
          initialValue: content,
          usageStatistics: true,
          customHTMLRenderer: {
            htmlBlock: {
              iframe(node) {
                return [
                  {
                    type: "openTag",
                    tagName: "iframe",
                    outerNewLine: true,
                    attributes: node.attrs,
                  },
                  { type: "html", content: node.childrenHTML },
                  { type: "closeTag", tagName: "iframe", outerNewLine: false },
                ];
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    putViewer();
  }, []);

  useEffect(() => {
    if (viewerRef.current.viewerInstance === undefined) return;

    viewerRef.current.viewerInstance.setMarkdown(content);
  }, [content]);

  return (
    <div className="toast-viewer" ref={viewerRef}>
      뷰어를 불러오는 중입니다...
    </div>
  );
}
