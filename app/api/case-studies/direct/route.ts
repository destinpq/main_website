import { NextResponse } from 'next/server';
import https from 'https';

// Helper function for direct HTTPS requests
function httpsGet(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed with status: ${res.statusCode}`));
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

export async function GET() {
  try {
    const SPREADSHEET_ID = '1UOENiWfQgHjz9MuFyu-SXK-k2YZ-zDaEjqz2QAL8frs';
    
    // Try multiple URLs to see which one works
    const urls = [
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`,
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1`,
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/pub?output=csv`,
    ];
    
    let csvText = '';
    let errorMessages = [];
    
    // Try each URL until one works
    for (const url of urls) {
      try {
        console.log(`Trying to fetch from: ${url}`);
        csvText = await httpsGet(url);
        
        if (csvText && csvText.trim().length > 0) {
          console.log(`Successfully fetched ${csvText.length} bytes from ${url}`);
          break;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        errorMessages.push(`${url}: ${errorMessage}`);
        console.error(`Error fetching from ${url}:`, errorMessage);
      }
    }
    
    if (!csvText) {
      return NextResponse.json({
        success: false,
        errors: errorMessages,
        message: 'Failed to fetch CSV from any URL'
      }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      csvData: csvText,
      dataLength: csvText.length,
      preview: csvText.substring(0, 200) + '...',
      message: 'Successfully fetched CSV data'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to fetch CSV data'
    }, { status: 500 });
  }
} 