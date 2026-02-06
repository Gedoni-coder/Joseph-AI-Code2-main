/**
 * Document Processor
 * Extracts text from various document formats with proper parsing
 */

/**
 * Extract text from a File object
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name;

  try {
    if (fileType === "application/pdf") {
      return await extractTextFromPDF(file);
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword" ||
      fileName.endsWith(".docx")
    ) {
      return await extractTextFromDOCX(file);
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel" ||
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".xls")
    ) {
      return await extractTextFromSpreadsheet(file);
    } else if (fileType === "text/csv" || fileName.endsWith(".csv")) {
      return await file.text();
    } else if (fileType === "text/plain") {
      return await file.text();
    } else if (fileType.startsWith("image/")) {
      return await extractTextFromImage(file);
    } else if (fileType === "application/json") {
      const text = await file.text();
      return formatJSON(text);
    } else {
      return await extractAsPlainText(file);
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to extract text: ${errorMsg}`);
  }
}

/**
 * Extract text from PDF using binary parsing
 */
async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  // Convert to string for searching
  let text = "";

  // Look for text objects in PDF
  const searchString = (bytes: Uint8Array): string => {
    try {
      let result = "";
      let inTextObject = false;
      let i = 0;

      while (i < bytes.length) {
        // Look for BT (Begin Text)
        if (bytes[i] === 66 && bytes[i + 1] === 84 && bytes[i + 2] === 32) {
          inTextObject = true;
          i += 3;
        }
        // Look for ET (End Text)
        else if (bytes[i] === 69 && bytes[i + 1] === 84 && bytes[i + 2] === 32) {
          inTextObject = false;
          result += "\n";
          i += 3;
        }
        // Look for text strings in parentheses
        else if (inTextObject && bytes[i] === 40) {
          // (
          let j = i + 1;
          let str = "";
          let escaped = false;

          while (j < bytes.length && (escaped || bytes[j] !== 41)) {
            if (!escaped && bytes[j] === 92) {
              // \ escape
              escaped = true;
            } else {
              if (bytes[j] >= 32 && bytes[j] <= 126) {
                str += String.fromCharCode(bytes[j]);
              }
              escaped = false;
            }
            j++;
          }

          if (str.length > 0) {
            result += str + " ";
          }
          i = j + 1;
        } else {
          i++;
        }
      }

      return result;
    } catch {
      return "";
    }
  };

  text = searchString(uint8Array);

  // If no text found, try alternative method
  if (text.trim().length < 100) {
    const decoder = new TextDecoder("utf-8", { ignoreBOM: true });
    const rawText = decoder.decode(uint8Array);

    // Extract readable text
    const cleaned = rawText
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
      .replace(/<<.*?>>/g, "")
      .replace(/stream.*?endstream/gs, "")
      .replace(/obj\s*<<.*?>>\s*endobj/gs, "")
      .match(/[A-Za-z0-9\s\.,!?\-'"():;]+/g)
      ?.join(" ");

    text = cleaned || text;
  }

  return text.trim() || "No text content found in PDF";
}

/**
 * Extract text from DOCX files (ZIP format)
 */
async function extractTextFromDOCX(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  // Try using docx library if available
  try {
    // Dynamic import to avoid build issues
    const { readFile } = await import("docx");
    const doc = await readFile(arrayBuffer);

    let text = "";

    // Extract from paragraphs
    if (doc.sections && Array.isArray(doc.sections)) {
      doc.sections.forEach((section: any) => {
        if (section.children) {
          section.children.forEach((para: any) => {
            if (para.text) {
              text += para.text + "\n";
            } else if (para.children) {
              para.children.forEach((child: any) => {
                if (child.text) {
                  text += child.text;
                }
              });
              text += "\n";
            }
          });
        }
      });
    }

    if (text.trim().length > 0) {
      return text.trim();
    }
  } catch (e) {
    // Fallback to binary parsing
  }

  // Fallback: Extract from ZIP structure
  const extractZipText = async (buffer: ArrayBuffer): Promise<string> => {
    let text = "";

    // DOCX is a ZIP file, look for document.xml
    const view = new Uint8Array(buffer);
    let documentXmlStart = -1;

    // Search for document.xml
    for (let i = 0; i < view.length - 11; i++) {
      if (
        String.fromCharCode(
          view[i],
          view[i + 1],
          view[i + 2],
          view[i + 3],
          view[i + 4],
          view[i + 5],
          view[i + 6],
          view[i + 7],
          view[i + 8],
          view[i + 9],
          view[i + 10]
        ) === "document."
      ) {
        documentXmlStart = i;
        break;
      }
    }

    // Try to extract text content
    const decoder = new TextDecoder("utf-8", { ignoreBOM: true });
    const fullText = decoder.decode(view);

    // Extract text from XML tags
    const textMatches = fullText.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
    text = textMatches
      .map((match) => match.replace(/<w:t[^>]*>|<\/w:t>/g, ""))
      .join(" ");

    return text || "Unable to extract text from Word document";
  };

  return await extractZipText(arrayBuffer);
}

/**
 * Extract text from spreadsheets (CSV, XLSX)
 */
async function extractTextFromSpreadsheet(file: File): Promise<string> {
  const fileType = file.type;
  const fileName = file.name;

  // If it's CSV or plain text, just return it
  if (fileType === "text/csv" || fileName.endsWith(".csv")) {
    return await file.text();
  }

  const arrayBuffer = await file.arrayBuffer();

  // Try using xlsx library for Excel files
  try {
    // Fallback: Extract from ZIP structure (XLSX is ZIP)
    const view = new Uint8Array(arrayBuffer);
    const decoder = new TextDecoder("utf-8", { ignoreBOM: true });
    const fullText = decoder.decode(view);

    // Extract cell values from XML
    const cellMatches = fullText.match(/<v>([^<]*)<\/v>/g) || [];
    const values = cellMatches
      .map((match) => match.replace(/<v>|<\/v>/g, ""))
      .filter((v) => v.length > 0);

    if (values.length > 0) {
      // Format as table
      let text = "";
      const rowSize = Math.ceil(Math.sqrt(values.length));

      for (let i = 0; i < values.length; i++) {
        text += values[i] + (i % rowSize === rowSize - 1 ? "\n" : "\t");
      }

      return text || "No data found in spreadsheet";
    }
  } catch (e) {
    // Continue with fallback
  }

  return "Unable to parse spreadsheet data";
}

/**
 * Extract text from images (limited OCR info)
 */
async function extractTextFromImage(file: File): Promise<string> {
  return `[IMAGE DOCUMENT]
File: ${file.name}
Size: ${file.size} bytes
Type: ${file.type}

Note: Image text extraction requires OCR (Optical Character Recognition).

To enable full OCR functionality:
1. Install Tesseract.js: npm install tesseract.js
2. Implement browser-based OCR for image processing
3. Or upload to a server with OCR capabilities

For now, image processing is limited to metadata extraction.
To extract text from images, you would need server-side processing with:
- Tesseract.js (client-side)
- Google Cloud Vision API
- AWS Textract
- Azure Computer Vision API`;
}

/**
 * Try to extract text as plain text
 */
async function extractAsPlainText(file: File): Promise<string> {
  try {
    const text = await file.text();
    if (text.length > 0) {
      return text;
    }
  } catch {
    // Not text
  }

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const decoder = new TextDecoder("utf-8", { ignoreBOM: true });

  // Decode and extract visible characters
  let text = decoder.decode(uint8Array);
  text = text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "")
    .trim();

  return text || "Unable to extract text from file";
}

/**
 * Format JSON for display
 */
function formatJSON(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed, null, 2);
  } catch {
    return jsonString;
  }
}

/**
 * Format extracted text for display
 */
export function formatExtractedText(text: string, maxChars: number = 50000): {
  displayText: string;
  fullText: string;
  isTruncated: boolean;
  charCount: number;
  lineCount: number;
} {
  const isTruncated = text.length > maxChars;
  const displayText = text.substring(0, maxChars);
  const lineCount = text.split("\n").length;

  return {
    displayText,
    fullText: text,
    isTruncated,
    charCount: text.length,
    lineCount,
  };
}

/**
 * Get file type icon and label
 */
export function getFileTypeInfo(fileType: string): {
  icon: string;
  label: string;
  extractionCapability: "full" | "partial" | "server-only" | "metadata";
} {
  if (fileType === "application/pdf") {
    return {
      icon: "📄",
      label: "PDF",
      extractionCapability: "partial",
    };
  } else if (
    fileType.includes("word") ||
    fileType.includes("document") ||
    fileType.includes("wordprocessingml")
  ) {
    return {
      icon: "📝",
      label: "Word Document",
      extractionCapability: "partial",
    };
  } else if (
    fileType.includes("spreadsheet") ||
    fileType.includes("excel") ||
    fileType.includes("csv") ||
    fileType.includes("sheet")
  ) {
    return {
      icon: "📊",
      label: "Spreadsheet",
      extractionCapability: "partial",
    };
  } else if (fileType.startsWith("image/")) {
    return {
      icon: "🖼️",
      label: "Image",
      extractionCapability: "server-only",
    };
  } else if (fileType === "text/plain") {
    return {
      icon: "📄",
      label: "Text File",
      extractionCapability: "full",
    };
  } else if (fileType === "text/csv") {
    return {
      icon: "📊",
      label: "CSV",
      extractionCapability: "full",
    };
  } else if (fileType === "application/json") {
    return {
      icon: "{ }",
      label: "JSON",
      extractionCapability: "full",
    };
  }

  return {
    icon: "📎",
    label: "Document",
    extractionCapability: "server-only",
  };
}
