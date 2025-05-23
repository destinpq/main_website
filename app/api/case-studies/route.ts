import { NextResponse } from 'next/server';
import caseStudiesData from '@/lib/case-studies.json';

export async function GET() {
  try {
    // Return the imported case studies as JSON
    return NextResponse.json(caseStudiesData);
  } catch (error) {
    console.error('Error serving case studies:', error);
    
    // Return a fallback with an error
    return NextResponse.json(
      { error: 'Failed to load case studies' },
      { status: 500 }
    );
  }
} 