"""Re-encode the served WebP frames at higher quality.

1280x720 is the native resolution of vid1/vid2/vid3.mp4, so it is also the
ceiling: there is no finer detail to recover, and Lanczos upscales to 1080p and
1440p measured SOFTER than a high-quality 720p while costing 2x the bytes. What
was actually costing sharpness was the encode. The frames shipped at WebP q78,
which is low enough to smear lip and gum texture on the close-up shots.

Encoded from the lossless PNGs, which already have the watermark removed, so
each frame goes through exactly one lossy generation rather than two.
"""
import sys
from PIL import Image

QUALITY = int(sys.argv[1]) if len(sys.argv) > 1 else 88

for v in (1, 2, 3):
    for i in range(1, 301):
        Image.open(f'frames_video{v}/frame_{i:04d}.png').convert('RGB').save(
            f'public/videos/video_{v}_frames/frame_{i:04d}.webp',
            'WEBP', quality=QUALITY, method=6,
        )
    print(f'sequence {v}: 300 frames re-encoded at q{QUALITY}', flush=True)
print('done')
