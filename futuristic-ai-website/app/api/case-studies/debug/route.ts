import { NextResponse } from 'next/server';
import { fetchCaseStudies } from '@/lib/google-sheets';

export async function GET() {
  try {
    // First try direct fetch from Google Sheets
    const SPREADSHEET_ID = '1UOENiWfQgHjz9MuFyu-SXK-k2YZ-zDaEjqz2QAL8frs';
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;
    
    let csvText = '';
    let csvError = null;
    
    try {
      const csvResponse = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Accept': 'text/csv',
        },
      });
      
      if (csvResponse.ok) {
        csvText = await csvResponse.text();
      } else {
        csvError = `Failed with status: ${csvResponse.status}`;
      }
    } catch (error) {
      csvError = error instanceof Error ? error.message : 'Unknown error';
    }
    
    // Then try to fetch case studies through the regular function
    const caseStudies = await fetchCaseStudies();
    
    // Return detailed information for debugging
    return NextResponse.json({
      success: true,
      count: caseStudies.length,
      data: caseStudies,
      csvAttempt: {
        success: !!csvText,
        error: csvError,
        dataPreview: csvText ? csvText.substring(0, 500) : null,
        dataLength: csvText.length,
      },
      message: 'Debug information for case studies'
    });
  } catch (error) {
    // Detailed error response
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      message: 'Failed to fetch case studies debug info'
    }, {
      status: 500
    });
  }
} 