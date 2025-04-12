import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const SPREADSHEET_ID = '1UOENiWfQgHjz9MuFyu-SXK-k2YZ-zDaEjqz2QAL8frs';
    
    // Use the JSON output for published sheets - this often works when CSV doesn't
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;
    
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        error: 'Failed to fetch Google Sheets data',
      }, { status: 500 });
    }
    
    const responseText = await response.text();
    
    // Google returns invalid JSON with a prefix that needs to be removed
    const jsonText = responseText.replace(/^.*?\(/, '').replace(/\);$/, '');
    
    try {
      const jsonData = JSON.parse(jsonText);
      
      // Transform the Google Sheets JSON format into case studies
      const caseStudies = transformGoogleSheetsData(jsonData);
      
      return NextResponse.json({
        success: true,
        method: 'json',
        data: caseStudies,
        rawDataSample: jsonText.substring(0, 500) + '...',
        message: 'Successfully fetched Google Sheets data'
      });
    } catch (parseError) {
      return NextResponse.json({
        success: false,
        responseText: responseText.substring(0, 1000),
        error: parseError instanceof Error ? parseError.message : 'Unknown error',
        message: 'Failed to parse Google Sheets JSON response'
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to fetch or process Google Sheets data'
    }, { status: 500 });
  }
}

// Transform Google Sheets data format to our case studies format
function transformGoogleSheetsData(data: any) {
  if (!data.table || !data.table.rows || !data.table.cols) {
    return [];
  }
  
  // Extract column headers to find indices
  const cols = data.table.cols;
  const columnMap: Record<string, number> = {};
  
  cols.forEach((col: any, index: number) => {
    if (col.label) {
      columnMap[col.label.toLowerCase()] = index;
    }
  });
  
  // Define the required columns
  const titleIdx = columnMap['title'] ?? -1;
  const clientIdx = columnMap['client name'] ?? columnMap['client'] ?? -1;
  const descIdx = columnMap['description'] ?? -1;
  const imageIdx = columnMap['image path'] ?? columnMap['image'] ?? -1;
  const resultsIdx = columnMap['results list'] ?? columnMap['results'] ?? -1;
  const dateIdx = columnMap['date'] ?? -1;
  const categoryIdx = columnMap['category'] ?? -1;
  
  // Return early if essential columns aren't found
  if (titleIdx === -1 || clientIdx === -1 || descIdx === -1) {
    return [];
  }
  
  // Process rows
  const caseStudyMap = new Map<string, {
    title: string;
    client: string;
    description: string;
    image: string;
    results: string[];
    date: string;
    category: string;
  }>();
  
  data.table.rows.forEach((row: any) => {
    if (!row.c) return;
    
    const cells = row.c;
    const title = cells[titleIdx]?.v?.toString().trim();
    
    if (!title) return;
    
    // If this is a new case study
    if (!caseStudyMap.has(title)) {
      const caseStudy = {
        title,
        client: cells[clientIdx]?.v?.toString().trim() || '',
        description: cells[descIdx]?.v?.toString().trim() || '',
        image: (imageIdx >= 0 && cells[imageIdx]?.v) 
          ? cells[imageIdx].v.toString().trim() 
          : '/placeholder.svg',
        results: [],
        date: (dateIdx >= 0 && cells[dateIdx]?.v) 
          ? cells[dateIdx].v.toString().trim() 
          : '',
        category: (categoryIdx >= 0 && cells[categoryIdx]?.v) 
          ? cells[categoryIdx].v.toString().trim() 
          : ''
      };
      
      // Add first result
      if (resultsIdx >= 0 && cells[resultsIdx]?.v) {
        caseStudy.results.push(cells[resultsIdx].v.toString().trim());
      }
      
      caseStudyMap.set(title, caseStudy);
    } 
    // If this row is just adding another result to existing case study
    else if (resultsIdx >= 0 && cells[resultsIdx]?.v) {
      const caseStudy = caseStudyMap.get(title);
      caseStudy.results.push(cells[resultsIdx].v.toString().trim());
    }
  });
  
  return Array.from(caseStudyMap.values());
} 