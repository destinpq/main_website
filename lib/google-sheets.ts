import { CaseStudy } from "@/types/case-study";

const SPREADSHEET_ID = '1UOENiWfQgHjz9MuFyu-SXK-k2YZ-zDaEjqz2QAL8frs';
const SHEET_NAME = 'Sheet1'; // Adjust this to your actual sheet name

// Function to fetch the case studies from Google Sheets
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  // Try each approach in sequence until one works
  const errors: string[] = [];

  // Approach 1: Try direct CSV fetch
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;
    console.log('Approach 1: Direct CSV fetch from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: { 'Accept': 'text/csv' },
    });
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const csvText = await response.text();
    if (csvText.trim().length === 0) {
      throw new Error('Received empty CSV response');
    }
    
    console.log('CSV fetch successful, length:', csvText.length);
    const studies = parseCSVToCaseStudies(csvText);
    
    if (studies.length > 0) {
      console.log('Successfully parsed case studies from direct CSV fetch');
      return studies;
    }
    
    throw new Error('No case studies found in CSV data');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Approach 1 failed: ${errorMsg}`);
    console.error('Approach 1 failed:', errorMsg);
  }

  // Approach 2: Try JSON API method
  try {
    console.log('Approach 2: Using JSON API method');
    const response = await fetch('/api/google-sheets-alt');
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data && result.data.length > 0) {
      console.log('Successfully fetched via JSON API');
      return result.data;
    }
    
    throw new Error('No valid data from JSON API');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Approach 2 failed: ${errorMsg}`);
    console.error('Approach 2 failed:', errorMsg);
  }

  // Approach 3: Try our direct API endpoint
  try {
    console.log('Approach 3: Using server-side direct API');
    const response = await fetch('/api/case-studies/direct');
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.csvData) {
      throw new Error(data.message || 'No CSV data returned');
    }
    
    console.log('Direct API fetch successful, length:', data.dataLength);
    const studies = parseCSVToCaseStudies(data.csvData);
    
    if (studies.length > 0) {
      console.log('Successfully parsed case studies from direct API');
      return studies;
    }
    
    throw new Error('No case studies found in direct API data');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Approach 3 failed: ${errorMsg}`);
    console.error('Approach 3 failed:', errorMsg);
  }

  // Approach 4: Try debug API endpoint
  try {
    console.log('Approach 4: Using debug API');
    const response = await fetch('/api/case-studies/debug');
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success && result.data && result.data.length > 0) {
      console.log('Successfully fetched from debug API');
      return result.data;
    }
    
    throw new Error('No data from debug API');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Approach 4 failed: ${errorMsg}`);
    console.error('Approach 4 failed:', errorMsg);
  }

  // Approach 5: Fall back to local case studies
  try {
    console.log('Approach 5: Fetching from local API endpoint');
    const response = await fetch('/api/case-studies');
    
    if (!response.ok) {
      throw new Error(`Failed with status: ${response.status}`);
    }
    
    const studies = await response.json();
    
    if (studies && studies.length > 0) {
      console.log('Successfully fetched from local API');
      return studies;
    }
    
    throw new Error('No data from local API');
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    errors.push(`Approach 5 failed: ${errorMsg}`);
    console.error('Approach 5 failed:', errorMsg);
  }

  // Final fallback: Use hardcoded case studies
  console.warn('All fetch approaches failed, using hardcoded data');
  console.error('Errors:', errors);
  return getHardcodedCaseStudies();
}

// Helper function to clean result text (remove quotes, etc.)
function cleanResultText(text: string): string {
  return text.replace(/^["']|["']$/g, '').trim();
}

// Function to get hardcoded case studies as ultimate fallback
function getHardcodedCaseStudies(): CaseStudy[] {
  return [
    {
      title: "AI-Powered Financial Forecasting",
      client: "Global Investment Firm",
      description: "Developed a sophisticated machine learning model that increased prediction accuracy by 35% for a leading investment firm, saving them millions in potential losses.",
      image: "/case-studies/finance.jpg",
      results: ["35% higher forecast accuracy", "Saved $2.4M annually", "95% client satisfaction"],
      date: "2023-08",
      category: "Finance"
    },
    {
      title: "Smart Manufacturing Optimization",
      client: "Manufacturing Corp",
      description: "Implemented AI systems that reduced waste and increased production efficiency for a major manufacturing company. The system optimizes resource allocation in real-time.",
      image: "/case-studies/manufacturing.jpg",
      results: ["28% reduction in waste", "19% efficiency increase", "ROI in 4 months"],
      date: "2023-06",
      category: "Manufacturing"
    },
    {
      title: "Predictive Healthcare Analytics",
      client: "Regional Hospital Network",
      description: "Created a predictive analytics platform that helps doctors identify at-risk patients before symptoms worsen, enabling early intervention and improved patient outcomes.",
      image: "/case-studies/healthcare.jpg",
      results: ["Early diagnosis improved by 42%", "15% reduction in hospital readmissions", "$3.2M annual savings"],
      date: "2023-04",
      category: "Healthcare"
    }
  ];
}

// Parse CSV data to case studies array - improved parsing
function parseCSVToCaseStudies(csvText: string): CaseStudy[] {
  if (!csvText || csvText.trim().length === 0) {
    console.error('Empty CSV data');
    return [];
  }
  
  console.log('Parsing CSV of length:', csvText.length);
  
  try {
    const lines = csvText.split('\n').filter(line => line.trim().length > 0);
    console.log('Found lines:', lines.length);
    
    if (lines.length <= 1) {
      console.error('Not enough lines in CSV (only header?)');
      return [];
    }
    
    // Process header to find column indices
    const header = parseCSVRow(lines[0]).map(h => h.toLowerCase().trim());
    console.log('Headers:', header);
    
    const titleIdx = header.findIndex(h => h.includes('title'));
    const clientIdx = header.findIndex(h => h.includes('client'));
    const descIdx = header.findIndex(h => h.includes('description'));
    const imageIdx = header.findIndex(h => h.includes('image'));
    const resultsIdx = header.findIndex(h => h.includes('results'));
    const dateIdx = header.findIndex(h => h.includes('date'));
    const categoryIdx = header.findIndex(h => h.includes('category'));
    
    console.log('Column indices:', { titleIdx, clientIdx, descIdx, imageIdx, resultsIdx, dateIdx, categoryIdx });
    
    if (titleIdx === -1 || clientIdx === -1 || descIdx === -1) {
      console.error('Missing essential columns in CSV');
      return [];
    }
    
    // Create map to collect all results for each case study
    const caseStudyMap = new Map<string, CaseStudy>();
    
    // Process data rows
    for (let i = 1; i < lines.length; i++) {
      const row = parseCSVRow(lines[i]);
      if (row.length <= Math.max(titleIdx, clientIdx, descIdx)) {
        console.log(`Skipping short row ${i}:`, row);
        continue;
      }
      
      const title = row[titleIdx]?.trim();
      
      if (!title) {
        console.log(`Row ${i} has no title:`, row);
        continue;
      }
      
      // If this is a new case study
      if (!caseStudyMap.has(title)) {
        const caseStudy: CaseStudy = {
          title,
          client: row[clientIdx]?.trim() || '',
          description: row[descIdx]?.trim() || '',
          image: (imageIdx >= 0 && row[imageIdx]) ? row[imageIdx].trim() : '/placeholder.svg',
          results: [],
          date: (dateIdx >= 0 && row[dateIdx]) ? row[dateIdx].trim() : '',
          category: (categoryIdx >= 0 && row[categoryIdx]) ? row[categoryIdx].trim() : ''
        };
        
        // Add first result if it exists
        if (resultsIdx >= 0 && row[resultsIdx]?.trim()) {
          caseStudy.results.push(cleanResultText(row[resultsIdx]));
        }
        
        caseStudyMap.set(title, caseStudy);
      } 
      // If this is another row for the same case study (just adding more results)
      else if (resultsIdx >= 0 && row[resultsIdx]?.trim()) {
        const caseStudy = caseStudyMap.get(title);
        caseStudy?.results.push(cleanResultText(row[resultsIdx]));
      }
    }
    
    const result = Array.from(caseStudyMap.values());
    console.log('Parsed case studies:', result.length);
    
    if (result.length === 0) {
      console.error('No case studies could be parsed from the CSV');
    }
    
    return result;
  } catch (parseError) {
    console.error('Error parsing CSV:', parseError);
    return [];
  }
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