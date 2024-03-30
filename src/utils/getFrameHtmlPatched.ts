import { Frame, FrameFlattened, GetFrameHtmlOptions } from "frames.js";


export function getFrameFlattened(frame: Frame): FrameFlattened {
  const metadata = {
    "fc:frame": frame.version,
    "fc:frame:image": frame.image,
    "fc:frame:post_url": frame.postUrl,
    "fc:frame:input:text": frame.inputText,
    ...(frame.imageAspectRatio
      ? { [`fc:frame:image:aspect_ratio`]: frame.imageAspectRatio }
      : {}),
    ...frame.buttons?.reduce(
      (acc, button, index) => ({
        ...acc,

        [`fc:frame:button:${index + 1}`]: button.label,
        [`fc:frame:button:${index + 1}:action`]: button.action,
        [`fc:frame:button:${index + 1}:target`]: button.target,
      }),
      {}
    ),
   "of:accepts:xmtp": "vNext"

  };

  return metadata;
}



export function getFrameHtml(
  frame: Frame,
  options: GetFrameHtmlOptions = {}
): string {
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>${options.title ?? "frame"}</title>
      ${
        options.og?.title
          ? `<meta property="og:title" content="${options.og.title}"/>`
          : ""
      }
      ${getFrameHtmlHead(frame)}
      ${options.htmlHead || ""}
    </head>
    <body>${options.htmlBody ? options.htmlBody : ""}</body>
  </html>`;
  return html;
}

/**
 * Formats a `Frame` ready to be included in a <head> of an html string
 * @param frame The `Frame` to get the <head> contents for
 * @returns an string with tags to be included in a <head>
 */
export function getFrameHtmlHead(frame: Frame): string {
  const tags = [
    `<meta name="og:image" content="${frame.ogImage || frame.image}"/>`,
    `<meta name="fc:frame" content="${frame.version}"/>`,
    `<meta name="fc:frame:image" content="${frame.image}"/>`,
    `<meta name="fc:frame:post_url" content="${frame.postUrl}"/>`,
    frame.imageAspectRatio
      ? `<meta name="fc:frame:image:aspect_ratio" content="${frame.imageAspectRatio}"/>`
      : "",
    frame.inputText
      ? `<meta name="fc:frame:input:text" content="${frame.inputText}"/>`
      : "",
    ...(frame.buttons?.flatMap((button, index) => [
      `<meta name="fc:frame:button:${index + 1}" content="${button.label}"/>`,
      button.action
        ? `<meta name="fc:frame:button:${index + 1}:action" content="${
            button.action
          }"/>`
        : "",
      button.target
        ? `<meta name="fc:frame:button:${index + 1}:target" content="${
            button.target
          }"/>`
        : "",
    ]) ?? []),
    `<meta name="of:accepts:xmtp" content="vNext"/>`,
  ];

  return tags.join("");
}
