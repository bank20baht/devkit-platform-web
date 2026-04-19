export interface Tool {
  id: string;
  cat: string;
  name: string;
  ic: string;
  desc: string;
  path: string;
}

export const TOOLS: Tool[] = [
  {
    id: 'diff-checker',
    cat: 'Converters',
    name: 'Diff Checker',
    ic: 'braces',
    desc: 'Compare and highlight differences',
    path: 'diff-checker',
  },
];

export const CAT_ORDER = [
  'Converters',
  'Generators',
  'Security',
  'Text',
  'Network',
  'Time',
  'Design',
];
