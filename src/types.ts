export interface AITool {
  id: string;
  name: string;
  vendor: string;
  users: string[];
  type: string[];
  category: string;
  workflow: string;
  problemSolved: string;
  successRate: string;
  status: 'Active' | 'Inactive' | 'Acquired' | string;
  year: string;
  useCases: string[];
  issues: string;
  legalCases: string;
  aiSupportLevel: 'Full AI Replacement' | 'Partial AI Support';
  aiSupportLevelExplanation: string;
  domain: 'Clinical' | 'Administrative' | 'Both';
  targetScale: 'Enterprise' | 'Small Clinic' | 'Both';
  references?: { title: string; url: string }[];
}
