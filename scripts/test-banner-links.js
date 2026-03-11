// Script to test banner link validation
// Run with: node scripts/test-banner-links.js

// Test the link validation logic
function isValidLink(link) {
  return link && 
         link !== '/' && 
         !link.includes('cloudinary.com') && 
         !link.includes('heeeeee') &&
         (link.startsWith('/') || link.startsWith('http'));
}

function sanitizeLink(link) {
  if (!link || 
      link.trim() === '' || 
      link.includes('cloudinary.com') || 
      link.includes('heeeeee') ||
      (!link.startsWith('/') && !link.startsWith('http'))) {
    return '/'; // Default to home page
  }
  return link;
}

// Test cases
const testLinks = [
  'heeeeeeeeeeeeeeeeeeeeee',
  'https://res.cloudinary.com/dwhrq9zwo/image/upload/v1772800121/banners/izibzk0meg9iao4nsmyf.png',
  '/collections/all',
  'https://example.com',
  '',
  null,
  undefined,
  '/products/123',
  'invalid-link'
];

console.log('🧪 Testing banner link validation:\n');

testLinks.forEach((link, index) => {
  const isValid = isValidLink(link);
  const sanitized = sanitizeLink(link);
  
  console.log(`Test ${index + 1}:`);
  console.log(`  Input: ${link}`);
  console.log(`  Valid: ${isValid ? '✅' : '❌'}`);
  console.log(`  Sanitized: ${sanitized}`);
  console.log('');
});

console.log('✅ Banner link validation test completed!');
console.log('\nInvalid links will now be prevented from navigation and default to home page.');