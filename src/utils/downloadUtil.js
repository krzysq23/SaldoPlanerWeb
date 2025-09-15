const MIME_BY_FORMAT = {
  pdf: "application/pdf",
  csv: "text/csv; charset=utf-8",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

const EXT_BY_FORMAT = {
  pdf: "pdf",
  csv: "csv",
  xlsx: "xlsx",
};

function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]+/g, "_").trim();
}

function decodeRfc5987(value) {
  try {
    const v = value.replace(/^["']|["']$/g, "");
    const parts = v.split("''");
    const encoded = parts.length > 1 ? parts.slice(1).join("''") : v;
    return decodeURIComponent(encoded);
  } catch {
    return value;
  }
}

function extractFileNameFromCD(header) {
  if (!header) return;

  const starMatch = header.match(/filename\*\s*=\s*([^;]+)(?:;|$)/i);
  if (starMatch && starMatch[1]) {
    const decoded = decodeRfc5987(starMatch[1]);
    if (decoded) return sanitizeFileName(decoded);
  }

  const plainMatch = header.match(/filename\s*=\s*("?)([^";]+)\1(?:;|$)/i);
  if (plainMatch && plainMatch[2]) {
    return sanitizeFileName(plainMatch[2]);
  }
}

function ensureExtension(name, desiredExt) {
  const dot = name.lastIndexOf(".");
  if (dot === -1) return `${name}.${desiredExt}`;
  const currentExt = name.slice(dot + 1).toLowerCase();
  if (currentExt !== desiredExt.toLowerCase()) {
    return `${name}.${desiredExt}`;
  }
  return name;
}

function isSafari() {
  const ua = navigator.userAgent;
  return /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);
}

export async function downloadBlobResponse(blob, headers, format, fallbackBaseName = "report") {
  const cd = headers["content-disposition"] || headers["Content-Disposition"];
  let filename =
    extractFileNameFromCD(typeof cd === "string" ? cd : undefined) ||
    `${fallbackBaseName}.${EXT_BY_FORMAT[format]}`;

  filename = ensureExtension(filename, EXT_BY_FORMAT[format]);

  const contentType =
    headers["content-type"] ||
    headers["Content-Type"] ||
    MIME_BY_FORMAT[format];

  const typedBlob = blob.type ? blob : new Blob([blob], { type: contentType });
  const url = URL.createObjectURL(typedBlob);

  try {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    if (isSafari()) a.target = "_blank";

    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}