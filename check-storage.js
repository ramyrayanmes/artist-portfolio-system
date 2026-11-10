require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function checkBucket() {
  const { data, error } = await supabase.storage.from('artworks-bucket').list();

  if (error) {
    console.error('Error fetching bucket contents:', error.message);
    return;
  }

  console.log('\n--- Supabase Bucket Contents ---');
  if (data.length === 0) {
    console.log('The bucket is currently empty.');
  } else {
    data.forEach(item => {
      const type = item.id ? '📁 File' : '📂 Folder';
      console.log(`${type}: ${item.name} (${item.metadata?.size || 'N/A'} bytes)`);
    });
  }
}

checkBucket();