import { GoogleGenAI } from '@google/genai';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_CLOUD_NAME = 'dikkdclum';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Shared style reference appended to every prompt
const STYLE =
  'Warm children\'s storybook watercolor and colored pencil illustration. ' +
  'Soft parchment-toned background. Detailed, cozy, slightly whimsical. ' +
  'The image has a thin hand-drawn book-page border framing it. ' +
  'Horizontal / landscape orientation, cinematic wide crop.';

const GULUTH =
  'Guluth is a very small field-mouse with soft warm grey-brown fur, large rounded ears, ' +
  'and a small bright purple spot on the middle of his back. ' +
  'He typically wears a tiny blue satchel on his side.';

const IMAGES = [
  {
    id: 'hero-guardian',
    prompt:
      `${GULUTH} ` +
      'Scene: Guluth stands proudly on a small cushion in front of a roaring stone fireplace inside a cozy family home. ' +
      'A framed photo of a little girl sits on the mantle. Warm orange firelight illuminates the room. ' +
      'Guluth looks calm, confident, and heroic — the unsung guardian of this home. ' +
      `${STYLE}`,
  },
  {
    id: 'hero-city-of-cheese',
    prompt:
      `${GULUTH} ` +
      'Scene: Guluth stands at the edge of a cliff, gazing in wonder at a magnificent golden city made entirely of cheese — ' +
      'towering wheels of aged cheddar, archways of gouda, cobblestone streets of parmesan. ' +
      'The city glows like El Dorado in warm afternoon light. Guluth wears a tiny explorer\'s hat alongside his blue satchel, ' +
      'one paw raised as if he just discovered something legendary. Epic and adventurous. ' +
      `${STYLE}`,
  },
  {
    id: 'hero-radagatcha',
    prompt:
      `${GULUTH} ` +
      'Scene: Guluth faces off against Radagatcha — a large, menacing dark-furred rat with a sneering expression, twice Guluth\'s size. ' +
      'They stand in a shadowy alley between walls. Radagatcha towers over Guluth, but Guluth stands perfectly still, ' +
      'calm and clever, holding up a small piece of paper like a contract or a riddle. ' +
      'The mood is tense but playful — Guluth is clearly going to outsmart him. ' +
      `${STYLE}`,
  },
  {
    id: 'hero-night-watch',
    prompt:
      `${GULUTH} ` +
      'Scene: Late at night, Guluth sits on a moonlit windowsill looking out over a quiet neighborhood street. ' +
      'Stars and a full moon glow outside. Inside the room, a little girl sleeps peacefully in her bed in the soft background. ' +
      'Guluth\'s silhouette is small against the silver moonlight — a tiny, loyal protector keeping watch through the night. ' +
      'Peaceful, tender, quietly heroic. ' +
      `${STYLE}`,
  },
];

async function generateAndUpload(image) {
  console.log(`\n⏳ Generating: ${image.id}`);

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: image.prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '16:9',
    },
  });

  const imgData = response.generatedImages?.[0]?.image?.imageBytes;
  if (!imgData) {
    throw new Error(`No image returned for ${image.id}`);
  }

  const tmpDir = process.env.TEMP || process.env.TMP || process.cwd();
  const tmpPath = path.join(tmpDir, `${image.id}.png`);
  fs.writeFileSync(tmpPath, Buffer.from(imgData, 'base64'));
  console.log(`  ✅ Image saved locally: ${tmpPath}`);

  console.log(`  ☁️  Uploading to Cloudinary as guluth/${image.id}...`);
  const result = await cloudinary.uploader.upload(tmpPath, {
    public_id: `guluth/${image.id}`,
    overwrite: true,
    folder: '',
  });

  console.log(`  ✅ Uploaded: ${result.secure_url}`);
  return { id: image.id, url: result.secure_url };
}

async function main() {
  const results = [];
  for (const image of IMAGES) {
    try {
      const r = await generateAndUpload(image);
      results.push(r);
    } catch (err) {
      console.error(`  ❌ Failed ${image.id}:`, err.message);
      results.push({ id: image.id, url: null, error: err.message });
    }
  }

  console.log('\n\n=== RESULTS ===');
  results.forEach((r) => {
    if (r.url) console.log(`${r.id}: ${r.url}`);
    else console.log(`${r.id}: FAILED - ${r.error}`);
  });

  fs.writeFileSync(
    path.join(process.cwd(), 'hero-image-urls.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('\nSaved to hero-image-urls.json');
}

main();
