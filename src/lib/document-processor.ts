/**
 * Document Processor
 * Extracts text from various document formats
 */

/**
 * Extract text from a File object
 */
export async function extractTextFromFile(file: File): Promise<string> {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    return extractTextFromPDF(file);
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    return extractTextFromDOCX(file);
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    fileType === "application/vnd.ms-excel" ||
    fileType === "text/csv"
  ) {
    return extractTextFromSpreadsheet(file);
  } else if (fileType.startsWith("image/")) {
    return extractTextFromImage(file);
  } else if (fileType === "text/plain") {
    return file.text();
  } else {
    throw new Error(`Unsupported file type: ${fileType}`);
  }
}

/**
 * Extract text from PDF using client-side parsing
 */
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // For simplicity, we'll use a basic approach
    // In production, you'd use pdfjs-dist or similar
    const text = await file.text();
    // This is a very basic extraction - real PDFs would need proper parsing
    return text.substring(0, 5000); // Return first 5000 chars as preview
  } catch (error) {
    // If text extraction fails, return message
    return `[PDF Document] - ${file.name}\nSize: ${file.size} bytes\n\nNote: Full PDF text extraction requires server-side processing. Showing file metadata instead.`;
  }
}

/**
 * Extract text from DOCX files
 */
async function extractTextFromDOCX(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // Basic extraction - look for text in XML
    const text = new TextDecoder().decode(arrayBuffer);
    // Extract visible text patterns (simplified)
    const matches = text.match(/<t>([^<]*)<\/t>/g) || [];
    const extractedText = matches
      .map((match) => match.replace(/<t>|<\/t>/g, ""))
      .join(" ");

    return (
      extractedText ||
      `[Word Document] - ${file.name}\n\nNote: Automatic text extraction shows limited content. For full extraction, upload to server.`
    );
  } catch (error) {
    return `[Word Document] - ${file.name}\n\nUnable to extract text. Please process on server.`;
  }
}

/**
 * Extract text from spreadsheets (CSV, XLSX)
 */
async function extractTextFromSpreadsheet(file: File): Promise<string> {
  try {
    if (file.type === "text/csv") {
      return await file.text();
    }

    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);

    // For XLSX, extract visible text patterns
    const matches = text.match(/<v>([^<]*)<\/v>/g) || [];
    const extractedText = matches
      .map((match) => match.replace(/<v>|<\/v>/g, ""))
      .join("\n");

    return (
      extractedText ||
      `[Spreadsheet] - ${file.name}\n\nNote: Automatic extraction shows limited content.`
    );
  } catch (error) {
    return `[Spreadsheet] - ${file.name}\n\nUnable to extract spreadsheet data.`;
  }
}

/**
 * Extract text from images using OCR (client-side limitation)
 */
async function extractTextFromImage(file: File): Promise<string> {
  try {
    // For now, return a note since client-side OCR requires Tesseract.js
    return `[Image Document] - ${file.name}

Note: Image text extraction (OCR) requires server-side processing using Tesseract or similar OCR engine.

To enable OCR:
1. Upload the image to the server
2. Server will process using OCR
3. Extracted text will be returned

Image Details:
- File Type: ${file.type}
- File Size: ${file.size} bytes
- Recommended Action: Upload and process on server for accurate text extraction`;
  } catch (error) {
    return `[Image] - ${file.name}\n\nImage OCR processing requires server.`;
  }
}

/**
 * Format extracted text for display
 */
export function formatExtractedText(text: string, maxChars: number = 50000): {
  displayText: string;
  fullText: string;
  isTruncated: boolean;
} {
  const isTruncated = text.length > maxChars;
  const displayText = text.substring(0, maxChars);

  return {
    displayText,
    fullText: text,
    isTruncated,
  };
}

/**
 * Get file type icon and label
 */
export function getFileTypeInfo(fileType: string): {
  icon: string;
  label: string;
  extractionCapability: "full" | "partial" | "server-only";
} {
  if (fileType === "application/pdf") {
    return {
      icon: "📄",
      label: "PDF",
      extractionCapability: "partial",
    };
  } else if (
    fileType.includes("word") ||
    fileType.includes("document")
  ) {
    return {
      icon: "📝",
      label: "Word Document",
      extractionCapability: "partial",
    };
  } else if (
    fileType.includes("spreadsheet") ||
    fileType.includes("excel") ||
    fileType.includes("csv")
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
  }

  return {
    icon: "📎",
    label: "Document",
    extractionCapability: "server-only",
  };
}
