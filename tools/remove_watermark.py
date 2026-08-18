"""Removes the Gemini sparkle from the scroll-scrub frame sequences.

The mark is a fixed 48x48 four-point star at x1136-1183, y576-623 on every
1280x720 frame of all three sequences, alpha-blended white at a peak opacity of
0.30. Because it is translucent rather than opaque, it can be un-composited
exactly -- src = (out - a*255) / (1 - a) -- which recovers the real pixels
instead of guessing at them. Only the anti-aliased 2px boundary, where the
sub-pixel coverage cannot be recovered, is inpainted.

The matte and its peak opacity were solved from the footage itself: the matte
from the per-pixel minimum across frames, the opacity by minimising residual
edge energy along the mark's own contour across all three sequences.

Reads the lossless PNG originals so the WebP the site serves is encoded once,
not twice. Idempotent in effect but not in fact: it assumes an unprocessed
source, so re-run it against a clean checkout, not its own output.
"""
import sys
import numpy as np
import cv2
from PIL import Image

X0, Y0, X1, Y1 = 1126, 566, 1194, 634   # ROI enclosing the mark with margin
PEAK_ALPHA = 0.30
WEBP_QUALITY = 78                        # matches the original encode's bytes

S = sys.argv[1]
matte = np.load(f'{S}/matte.npy')
alpha = (PEAK_ALPHA * matte)[..., None].astype(np.float32)
ring = np.load(f'{S}/ring.npy').astype(np.uint8)


def declean(roi: np.ndarray) -> np.ndarray:
    recovered = np.clip((roi - alpha * 255.0) / (1.0 - alpha), 0, 255).astype(np.uint8)
    return cv2.inpaint(recovered, ring, 3, cv2.INPAINT_TELEA)


for v in (1, 2, 3):
    for i in range(1, 301):
        src = f'frames_video{v}/frame_{i:04d}.png'
        im = Image.open(src).convert('RGB')
        a = np.asarray(im).copy()
        a[Y0:Y1, X0:X1] = declean(a[Y0:Y1, X0:X1].astype(np.float32))
        out = Image.fromarray(a)
        out.save(src)
        out.save(f'public/videos/video_{v}_frames/frame_{i:04d}.webp',
                 'WEBP', quality=WEBP_QUALITY, method=6)
    print(f'sequence {v}: 300 frames cleaned', flush=True)
print('done')
