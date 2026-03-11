#!/usr/bin/env node

// Comprehensive codebase validation script
// Run with: node scripts/validate-codebase.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Running comprehensive codebase validation...\n');

// Check for common issues
const issues = [];

// 1. Check for hardcoded Firebase credentials
function checkFirebaseCredentials(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory() && !['node_modules', '.git', '.next'].includes(file.name)) {
      checkFirebaseCredentials(fullPath);
    } else if (file.isFile() && (file.name.endsWith('.js') || file.name.endsWith('.ts') || file.name.endsWith('.tsx'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('AIzaSyBjaSfVpgSpOG5ZnaRUawafzpH6mxHzQhU')) {
          issues.push(`🔐 Hardcoded Firebase API key found in: ${fullPath}`);
        }
        if (content.includes('lipsa-aec23.firebaseapp.com') && !fullPath.includes('firebase-config.js')) {
          issues.push(`🔐 Hardcoded Firebase domain found in: ${fullPath}`);
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }
}

// 2. Check for missing error boundaries
function checkErrorBoundaries() {
  const layoutPath = 'src/app/layout.tsx';
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    if (!content.includes('ErrorBoundary') && !content.includes('error.tsx')) {
      issues.push('⚠️  No error boundary found in layout.tsx');
    }
  }
}

// 3. Check for missing environment variables
function checkEnvFiles() {
  if (!fs.existsSync('.env.local')) {
    issues.push('📄 Missing .env.local file');
  }
  if (!fs.existsSync('.env.example')) {
    issues.push('📄 Missing .env.example file');
  }
}

// 4. Check for duplicate configuration files
function checkDuplicateConfigs() {
  const configs = [
    ['next.config.js', 'next.config.ts'],
    ['tailwind.config.js', 'tailwind.config.ts'],
  ];
  
  for (const [js, ts] of configs) {
    if (fs.existsSync(js) && fs.existsSync(ts)) {
      issues.push(`⚠️  Duplicate config files found: ${js} and ${ts}`);
    }
  }
}

// 5. Check for missing dependencies
function checkPackageJson() {
  if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check for common missing dependencies
    const requiredDeps = ['firebase', 'next', 'react', 'react-dom'];
    for (const dep of requiredDeps) {
      if (!pkg.dependencies[dep] && !pkg.devDependencies[dep]) {
        issues.push(`📦 Missing dependency: ${dep}`);
      }
    }
  }
}

// Run all checks
console.log('Checking for hardcoded credentials...');
checkFirebaseCredentials('src');
checkFirebaseCredentials('scripts');

console.log('Checking for error boundaries...');
checkErrorBoundaries();

console.log('Checking environment files...');
checkEnvFiles();

console.log('Checking for duplicate configs...');
checkDuplicateConfigs();

console.log('Checking package.json...');
checkPackageJson();

// Report results
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION RESULTS');
console.log('='.repeat(50));

if (issues.length === 0) {
  console.log('✅ No critical issues found!');
  console.log('\nYour codebase looks good. Consider running:');
  console.log('- npm run lint (to check for code style issues)');
  console.log('- npm run build (to check for build errors)');
  console.log('- npm run type-check (if you have TypeScript checking)');
} else {
  console.log(`❌ Found ${issues.length} issue(s):\n`);
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
  
  console.log('\n💡 RECOMMENDATIONS:');
  console.log('- Move hardcoded credentials to environment variables');
  console.log('- Add error boundaries for better error handling');
  console.log('- Ensure all required files are present');
  console.log('- Remove duplicate configuration files');
}

console.log('\n🎯 Next steps:');
console.log('1. Fix any critical issues listed above');
console.log('2. Run: npm run build');
console.log('3. Run: npm run lint');
console.log('4. Test the application thoroughly');

process.exit(issues.length > 0 ? 1 : 0);