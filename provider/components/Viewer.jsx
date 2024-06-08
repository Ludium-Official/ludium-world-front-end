"use client";

import "@toast-ui/editor/dist/toastui-editor.css";
import DOMPurify from "dompurify";
import { useEffect, useRef } from "react";

const copyToClipboard = (text, button) => {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.innerText;
    button.innerText = '복사됨';
    setTimeout(() => {
      button.innerText = originalText;
    }, 2000);
  }).catch(err => {
    console.error('복사 실패: ', err);
  });
};

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
                  { type: "closeTag", tagName: "iframe", outerNewLine: true },
                ];
              },
            },
          },
          customHTMLSanitizer: (html) => {
            return DOMPurify.sanitize(html, {
              ADD_TAGS: ["iframe"],
              ADD_ATTR: [
                "rel",
                "target",
                "hreflang",
                "type",
                "frameborder",
                "allow",
                "allowfullscreen",
              ],
              FORBID_TAGS: [
                "input",
                "script",
                "textarea",
                "form",
                "button",
                "select",
                "meta",
                "style",
                "link",
                "title",
                "object",
                "base",
              ],
            });
          },
        });

        const codeBlocks = document.querySelectorAll('codeBlock');
        for (const codeBlock of codeBlocks) {
          const code = codeBlock.querySelector('code');
          const button = document.createElement('button');
          button.innerText = '복사';
          button.style.position = 'absolute';
          button.style.top = '5px';
          button.style.right = '5px';
          button.style.background = '#d1a0ff';
          button.style.color = 'white';
          button.style.border = 'none';
          button.style.borderRadius = '3px';
          button.style.padding = '5px 10px';
          button.style.cursor = 'pointer';
          button.style.fontSize = '12px';

          button.addEventListener('click', () => {
            copyToClipboard(code.innerText, button);
          });

          codeBlock.style.position = 'relative';
          codeBlock.appendChild(button);
        }

      } catch (error) {
        console.error(error);
      }
    };

    putViewer();
  }, []);

  useEffect(() => {
    if (viewerRef.current.viewerInstance === undefined) return;

    viewerRef.current.viewerInstance.setMarkdown(content);

    const codeBlocks = document.querySelectorAll('codeBlock');
    for (const codeBlock of codeBlocks) {
      const code = codeBlock.querySelector('code');
      const button = document.createElement('button');
      button.innerText = '복사';
      button.style.position = 'absolute';
      button.style.top = '5px';
      button.style.right = '5px';
      button.style.background = '#d1a0ff';
      button.style.color = 'white';
      button.style.border = 'none';
      button.style.borderRadius = '3px';
      button.style.padding = '5px 10px';
      button.style.cursor = 'pointer';
      button.style.fontSize = '12px';
      button.addEventListener('click', () => {
        copyToClipboard(code.innerText, button);
      });

      codeBlock.style.position = 'relative';
      codeBlock.appendChild(button);
    }
  }, [content]);

  return (
    <div className="toast-viewer" ref={viewerRef}>
      뷰어를 불러오는 중입니다...
    </div>
  );
}
