from pathlib import Path
import re
from PIL import Image, ImageChops
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parent
INPUT_ROOT = ROOT / "screenshots"
OUTPUT_ROOT = ROOT / "output"
SUPPORTED = {".png", ".jpg", ".jpeg", ".webp"}
MARGIN = 12
GAP = 6
PADDING = 2

def natural_key(path):
    return [int(part) if part.isdigit() else part.lower() for part in re.split(r"(\d+)", path.name)]

def trim_near_white(image, tolerance=10, padding_px=12):
    image = image.convert("RGB")
    diff = ImageChops.difference(image, Image.new("RGB", image.size, (255,255,255))).convert("L")
    bbox = diff.point(lambda p: 255 if p > tolerance else 0).getbbox()
    if not bbox:
        return image
    x0,y0,x1,y1 = bbox
    return image.crop((max(0,x0-padding_px),max(0,y0-padding_px),min(image.width,x1+padding_px),min(image.height,y1+padding_px)))

def grid(count):
    if count == 1: return 1,1
    if count == 2: return 1,2
    return 2,2

def draw_image(pdf, path, x, y, w, h):
    try:
        with Image.open(path) as im:
            im = trim_near_white(im.copy())
            im.load()
    except Exception as exc:
        print(f"WARNING: cannot read {path}: {exc}")
        return
    maxw, maxh = max(1,w-2*PADDING), max(1,h-2*PADDING)
    scale = min(maxw/im.width, maxh/im.height)
    dw,dh = im.width*scale, im.height*scale
    pdf.drawImage(ImageReader(im), x+(w-dw)/2, y+(h-dh)/2, width=dw, height=dh, preserveAspectRatio=True, mask="auto")

def build_pdf(images, dest):
    pw,ph=A4
    cols,rows=grid(len(images))
    per_page=cols*rows
    pdf=canvas.Canvas(str(dest), pagesize=A4, pageCompression=1)
    for start in range(0,len(images),per_page):
        batch=images[start:start+per_page]
        usablew,usableh=pw-2*MARGIN,ph-2*MARGIN
        cw=(usablew-GAP*(cols-1))/cols
        ch=(usableh-GAP*(rows-1))/rows
        for i,path in enumerate(batch):
            r,c=divmod(i,cols)
            x=MARGIN+c*(cw+GAP)
            y=ph-MARGIN-(r+1)*ch-r*GAP
            draw_image(pdf,path,x,y,cw,ch)
        pdf.showPage()
        # For later pages of >4 images, the grid remains 2x2.
        if start+per_page < len(images):
            cols,rows=2,2
            per_page=4
    pdf.save()

def main():
    if not INPUT_ROOT.exists():
        print(f"No screenshots folder found: {INPUT_ROOT}")
        return
    OUTPUT_ROOT.mkdir(exist_ok=True)
    dirs=[p for p in INPUT_ROOT.iterdir() if p.is_dir()]
    for folder in sorted(dirs,key=natural_key):
        imgs=sorted([p for p in folder.iterdir() if p.suffix.lower() in SUPPORTED],key=natural_key)
        if imgs:
            dest=OUTPUT_ROOT/f"{folder.name}.pdf"
            build_pdf(imgs,dest)
            print(f"Created {dest} from {len(imgs)} screenshots")
    # Also allow a flat screenshots folder as a single experiment.
    flat=sorted([p for p in INPUT_ROOT.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED],key=natural_key)
    if flat:
        dest=OUTPUT_ROOT/"Screenshots.pdf"
        build_pdf(flat,dest)
        print(f"Created {dest} from {len(flat)} screenshots")

if __name__=="__main__": main()
