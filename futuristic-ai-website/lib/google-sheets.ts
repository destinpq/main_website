import { CaseStudy } from "@/types/case-study";

const SPREADSHEET_ID = '1UOENiWfQgHjz9MuFyu-SXK-k2YZ-zDaEjqz2QAL8frs';
const SHEET_ID = '0'; // First sheet is 0

// Function to fetch the case studies from Google Sheets
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  // Return static case studies data instead of fetching from Google Sheets
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

// Helper function to clean result text (remove quotes, etc.)
function cleanResultText(text: string): string {
  return text.replace(/^["']|["']$/g, '').trim();
}

// Fallback function to fetch case studies via CSV export
async function fetchCaseStudiesCSV(): Promise<CaseStudy[]> {
  // Return the same static data as fetchCaseStudies
  return fetchCaseStudies();
}

// Parse CSV data to case studies array, handling the complex structure
function parseCSVComplex(csvText: string): CaseStudy[] {
  // Return the same static data for simplicity
  return fetchCaseStudies();
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