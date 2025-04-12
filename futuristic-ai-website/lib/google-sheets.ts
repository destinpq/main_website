import { CaseStudy } from "@/types/case-study";

const SPREADSHEET_ID = '1UOENiWfQgHjz9MuFyu-SXK-k2YZ-zDaEjqz2QAL8frs';
const SHEET_ID = '0'; // First sheet is 0

// Function to fetch the case studies from Google Sheets
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  try {
    // Using the sheets API endpoint to get JSON data which preserves more structure
    // than CSV export
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A1:H100?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      // Fallback to CSV if the API call fails (e.g., no API key)
      return fetchCaseStudiesCSV();
    }
    
    const data = await response.json();
    if (!data.values || data.values.length <= 1) {
      return [];
    }
    
    const values = data.values;
    const headerRow = values[0];
    
    // Find column indices
    const titleIdx = headerRow.indexOf('Title');
    const clientIdx = headerRow.indexOf('Client name');
    const descIdx = headerRow.indexOf('Description');
    const imageIdx = headerRow.indexOf('Image path');
    const resultsIdx = headerRow.indexOf('Results list');
    const dateIdx = headerRow.indexOf('Date');
    const categoryIdx = headerRow.indexOf('Category');
    
    // Process rows to identify case studies
    const caseStudies: CaseStudy[] = [];
    let currentCaseStudy: Partial<CaseStudy> | null = null;
    let currentResults: string[] = [];
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      
      // Skip empty rows
      if (!row || row.length === 0 || row.every((cell: any) => !cell || cell.trim() === '')) {
        continue;
      }
      
      // Check if this row starts a new case study (has a title)
      if (row[titleIdx] && row[titleIdx].trim() !== '') {
        // Save previous case study if exists
        if (currentCaseStudy && currentCaseStudy.title) {
          caseStudies.push({
            ...currentCaseStudy,
            results: currentResults,
          } as CaseStudy);
        }
        
        // Start a new case study
        currentCaseStudy = {
          title: row[titleIdx]?.trim() || '',
          client: row[clientIdx]?.trim() || '',
          description: row[descIdx]?.trim() || '',
          image: row[imageIdx]?.trim() || '/placeholder.svg',
          date: row[dateIdx]?.trim() || '',
          category: row[categoryIdx]?.trim() || '',
        };
        currentResults = [];
        
        // Add result if present
        if (row[resultsIdx] && row[resultsIdx].trim() !== '') {
          currentResults.push(cleanResultText(row[resultsIdx]));
        }
      } 
      // This row continues a case study (add to description or results)
      else if (currentCaseStudy) {
        // Append to description if present
        if (row[descIdx] && row[descIdx].trim() !== '') {
          currentCaseStudy.description += ' ' + row[descIdx].trim();
        }
        
        // Add result if present
        if (row[resultsIdx] && row[resultsIdx].trim() !== '') {
          currentResults.push(cleanResultText(row[resultsIdx]));
        }
        
        // Update date and category if present (they might be in a merged cell below)
        if (row[dateIdx] && row[dateIdx].trim() !== '') {
          currentCaseStudy.date = row[dateIdx].trim();
        }
        
        if (row[categoryIdx] && row[categoryIdx].trim() !== '') {
          currentCaseStudy.category = row[categoryIdx].trim();
        }
      }
    }
    
    // Add the last case study
    if (currentCaseStudy && currentCaseStudy.title) {
      caseStudies.push({
        ...currentCaseStudy,
        results: currentResults,
      } as CaseStudy);
    }
    
    return caseStudies;
  } catch (error) {
    console.error("Error fetching case studies:", error);
    // Fallback to CSV method
    return fetchCaseStudiesCSV();
  }
}

// Helper function to clean result text (remove quotes, etc.)
function cleanResultText(text: string): string {
  return text.replace(/^["']|["']$/g, '').trim();
}

// Fallback function to fetch case studies via CSV export
async function fetchCaseStudiesCSV(): Promise<CaseStudy[]> {
  try {
    // Format to get a CSV version of the sheet
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch case studies: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSVComplex(csvText);
  } catch (error) {
    console.error("Error fetching case studies via CSV:", error);
    return [];
  }
}

// Parse CSV data to case studies array, handling the complex structure
function parseCSVComplex(csvText: string): CaseStudy[] {
  const lines = csvText.split('\n');
  
  // Skip the header row
  const rows = lines.slice(1);
  
  const caseStudies: CaseStudy[] = [];
  let currentCaseStudy: Partial<CaseStudy> | null = null;
  let currentResults: string[] = [];
  
  // Get header info
  const headers = parseCSVRow(lines[0]);
  const titleIdx = headers.indexOf('Title');
  const clientIdx = headers.indexOf('Client name');
  const descIdx = headers.indexOf('Description');
  const imageIdx = headers.indexOf('Image path');
  const resultsIdx = headers.indexOf('Results list');
  const dateIdx = headers.indexOf('Date');
  const categoryIdx = headers.indexOf('Category');
  
  for (const row of rows) {
    if (row.trim() === '') continue;
    
    const columns = parseCSVRow(row);
    
    // This row starts a new case study if it has a title
    if (columns[titleIdx] && columns[titleIdx].trim() !== '') {
      // Save the previous case study if it exists
      if (currentCaseStudy && currentCaseStudy.title) {
        caseStudies.push({
          ...currentCaseStudy,
          results: currentResults,
        } as CaseStudy);
      }
      
      // Start a new case study
      currentCaseStudy = {
        title: columns[titleIdx]?.trim() || '',
        client: columns[clientIdx]?.trim() || '',
        description: columns[descIdx]?.trim() || '',
        image: columns[imageIdx]?.trim() || '/placeholder.svg',
        date: columns[dateIdx]?.trim() || '',
        category: columns[categoryIdx]?.trim() || '',
      };
      currentResults = [];
      
      // Add result if present
      if (columns[resultsIdx] && columns[resultsIdx].trim() !== '') {
        currentResults.push(cleanResultText(columns[resultsIdx]));
      }
    } 
    // This row continues a case study
    else if (currentCaseStudy) {
      // Append to description if present
      if (columns[descIdx] && columns[descIdx].trim() !== '') {
        currentCaseStudy.description += ' ' + columns[descIdx].trim();
      }
      
      // Add result if present
      if (columns[resultsIdx] && columns[resultsIdx].trim() !== '') {
        currentResults.push(cleanResultText(columns[resultsIdx]));
      }
      
      // Update date and category if present
      if (columns[dateIdx] && columns[dateIdx].trim() !== '') {
        currentCaseStudy.date = columns[dateIdx].trim();
      }
      
      if (columns[categoryIdx] && columns[categoryIdx].trim() !== '') {
        currentCaseStudy.category = columns[categoryIdx].trim();
      }
    }
  }
  
  // Add the last case study
  if (currentCaseStudy && currentCaseStudy.title) {
    caseStudies.push({
      ...currentCaseStudy,
      results: currentResults,
    } as CaseStudy);
  }
  
  return caseStudies;
}

// Helper function to parse CSV row properly (handling quoted fields with commas)
function parseCSVRow(text: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let currentValue = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Add the last value
  result.push(currentValue);
  
  return result;
} 