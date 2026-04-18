export interface Tool {
  id: string;
  cat: string;
  name: string;
  ic: string;
  desc: string;
}

export const TOOLS: Tool[] = [
  { id: 'json-format',   cat: 'Converters', name: 'JSON Formatter',    ic: 'braces',           desc: 'Pretty, minify, validate' },
  { id: 'json-yaml',     cat: 'Converters', name: 'JSON ↔ YAML',       ic: 'arrow-left-right', desc: 'Two-way convert' },
  { id: 'json-csv',      cat: 'Converters', name: 'JSON ↔ CSV',        ic: 'table-2',          desc: 'Tabular convert' },
  { id: 'base64',        cat: 'Converters', name: 'Base64',            ic: 'file-code',        desc: 'Encode / decode' },
  { id: 'url-encode',    cat: 'Converters', name: 'URL Encoder',       ic: 'link',             desc: 'Encode / decode' },
  { id: 'html-entities', cat: 'Converters', name: 'HTML Entities',     ic: 'code-xml',         desc: 'Escape / unescape' },
  { id: 'number-base',   cat: 'Converters', name: 'Number Base',       ic: 'binary',           desc: 'Bin · Oct · Dec · Hex' },

  { id: 'uuid',          cat: 'Generators', name: 'UUID / ULID',       ic: 'fingerprint-pattern', desc: 'v4 · v7 · ULID · NanoID' },
  { id: 'hash',          cat: 'Generators', name: 'Hash',              ic: 'hash',             desc: 'md5 · sha-1 · sha-256' },
  { id: 'ts-interface',  cat: 'Generators', name: 'JSON → TypeScript', ic: 'braces',           desc: 'Generate interfaces' },
  { id: 'lorem',         cat: 'Generators', name: 'Lorem Ipsum',       ic: 'pilcrow',          desc: 'Placeholder text' },
  { id: 'qr',            cat: 'Generators', name: 'QR Code',           ic: 'qr-code',          desc: 'From text or URL' },
  { id: 'mock-data',     cat: 'Generators', name: 'Mock Data',         ic: 'database-zap',     desc: 'Names · emails · dates' },

  { id: 'jwt',           cat: 'Security',   name: 'JWT Decoder',       ic: 'key-round',        desc: 'Decode header, payload' },
  { id: 'bcrypt',        cat: 'Security',   name: 'Bcrypt',            ic: 'lock',             desc: 'Hash & verify' },
  { id: 'rsa',           cat: 'Security',   name: 'RSA Key Pair',      ic: 'key',              desc: 'Generate pub / priv' },
  { id: 'password',      cat: 'Security',   name: 'Password',          ic: 'shield-check',     desc: 'Generate · check strength' },

  { id: 'diff',          cat: 'Text',       name: 'Text Diff',         ic: 'git-compare',      desc: 'Line & word diff' },
  { id: 'regex',         cat: 'Text',       name: 'Regex Tester',      ic: 'regex',            desc: 'Live matches' },
  { id: 'case',          cat: 'Text',       name: 'Case Converter',    ic: 'case-sensitive',   desc: 'camel · snake · kebab' },
  { id: 'markdown',      cat: 'Text',       name: 'Markdown Preview',  ic: 'file-text',        desc: 'GFM rendered' },

  { id: 'curl',          cat: 'Network',    name: 'cURL → fetch',      ic: 'terminal',         desc: 'Convert cURL' },
  { id: 'http-status',   cat: 'Network',    name: 'HTTP Status',       ic: 'gauge',            desc: 'Codes reference' },
  { id: 'ip',            cat: 'Network',    name: 'IP / CIDR',         ic: 'network',          desc: 'Subnet calculator' },
  { id: 'dns',           cat: 'Network',    name: 'DNS Lookup',        ic: 'globe',            desc: 'A · MX · TXT records' },

  { id: 'timestamp',     cat: 'Time',       name: 'Timestamp',         ic: 'clock',            desc: 'Epoch ↔ ISO date' },
  { id: 'cron',          cat: 'Time',       name: 'Cron Editor',       ic: 'calendar-clock',   desc: 'Visualize schedule' },
  { id: 'timezone',      cat: 'Time',       name: 'Timezone',          ic: 'earth',            desc: 'Convert across zones' },

  { id: 'color',         cat: 'Design',     name: 'Color Picker',      ic: 'pipette',          desc: 'HEX · RGB · OKLCH' },
  { id: 'gradient',      cat: 'Design',     name: 'Gradient',          ic: 'palette',          desc: 'Interpolate stops' },
  { id: 'svg-opt',       cat: 'Design',     name: 'SVG Optimizer',     ic: 'shapes',           desc: 'Minify · clean' },
];

export const CAT_ORDER = ['Converters', 'Generators', 'Security', 'Text', 'Network', 'Time', 'Design'];
