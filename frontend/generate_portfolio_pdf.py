"""
Generate a PDF version of the Portfolio Content Blocks Reference Guide.
Uses fpdf2 to produce a professional, image-rich document.
"""

import os
from fpdf import FPDF
from PIL import Image

IMG_DIR = r"C:\Users\User\.gemini\antigravity\brain\95306e18-9900-4d81-8437-b355e45affa2"
OUTPUT = os.path.join(os.path.dirname(__file__), "Portfolio_Blocks_Reference.pdf")

# --- Configuration ---
BRAND_DARK = (18, 18, 24)
BRAND_ACCENT = (99, 102, 241)  # indigo
WHITE = (255, 255, 255)
LIGHT_BG = (245, 245, 250)
TABLE_HEADER_BG = (55, 55, 70)
TABLE_ROW_ALT = (235, 235, 245)
CODE_BG = (40, 42, 54)
CODE_FG = (248, 248, 242)
SECTION_BORDER = (99, 102, 241)


class PortfolioPDF(FPDF):
    def __init__(self):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.set_auto_page_break(auto=True, margin=20)
        # Add DejaVu for Unicode/Georgian support -- fallback to Helvetica
        try:
            font_dir = os.path.join(os.path.dirname(__file__), "fonts")
            if os.path.isdir(font_dir):
                self.add_font("DejaVu", "", os.path.join(font_dir, "DejaVuSans.ttf"), uni=True)
                self.add_font("DejaVu", "B", os.path.join(font_dir, "DejaVuSans-Bold.ttf"), uni=True)
        except Exception:
            pass

    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 130)
        self.cell(0, 8, "Portfolio Content Blocks - Visual Reference Guide", align="R")
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(150, 150, 160)
        self.cell(0, 10, f"Page {self.page_no()}/{{nb}}", align="C")

    # ---- helpers ----
    def section_title(self, num, title, purpose=""):
        self.ln(6)
        # accent bar
        self.set_fill_color(*BRAND_ACCENT)
        self.rect(10, self.get_y(), 3, 9, "F")
        self.set_x(16)
        self.set_font("Helvetica", "B", 16)
        self.set_text_color(*BRAND_DARK)
        self.cell(0, 9, f"{num}. {title}", new_x="LMARGIN", new_y="NEXT")
        if purpose:
            self.set_font("Helvetica", "", 10)
            self.set_text_color(100, 100, 110)
            self.cell(0, 6, purpose, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def sub_heading(self, text):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*BRAND_DARK)
        self.cell(0, 7, text, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(50, 50, 60)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def add_image_block(self, filename, caption="", max_w=170, max_h=100):
        path = os.path.join(IMG_DIR, filename)
        if not os.path.isfile(path):
            self.body_text(f"[Image not found: {filename}]")
            return
        # Get image dimensions
        with Image.open(path) as img:
            iw, ih = img.size
        # Scale
        ratio = min(max_w / iw, max_h / ih, 1.0)
        w = iw * ratio
        h = ih * ratio
        # Check if we need a new page
        if self.get_y() + h + 12 > self.h - 20:
            self.add_page()
        x = (self.w - w) / 2
        # light background behind image
        self.set_fill_color(*LIGHT_BG)
        self.rect(x - 2, self.get_y() - 1, w + 4, h + 3, "F")
        self.image(path, x=x, y=self.get_y(), w=w, h=h)
        self.set_y(self.get_y() + h + 2)
        if caption:
            self.set_font("Helvetica", "I", 8)
            self.set_text_color(120, 120, 130)
            self.cell(0, 5, caption, align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(3)

    def code_block(self, code):
        self.set_font("Courier", "", 8)
        lines = code.strip().split("\n")
        block_h = len(lines) * 4.5 + 6
        if self.get_y() + block_h > self.h - 20:
            self.add_page()
        # background
        self.set_fill_color(*CODE_BG)
        y0 = self.get_y()
        self.rect(12, y0, self.w - 24, block_h, "F")
        self.set_y(y0 + 3)
        self.set_text_color(*CODE_FG)
        for line in lines:
            self.set_x(15)
            self.cell(0, 4.5, line, new_x="LMARGIN", new_y="NEXT")
        self.set_y(y0 + block_h + 2)
        self.ln(2)

    def data_table(self, headers, rows):
        col_count = len(headers)
        available = self.w - 20
        # distribute widths
        if col_count == 4:
            widths = [available * 0.18, available * 0.13, available * 0.27, available * 0.42]
        elif col_count == 3:
            widths = [available * 0.25, available * 0.15, available * 0.60]
        else:
            widths = [available / col_count] * col_count

        row_h = 7
        total_h = (len(rows) + 1) * row_h + 4
        if self.get_y() + total_h > self.h - 20:
            self.add_page()

        # header row
        self.set_font("Helvetica", "B", 8)
        self.set_fill_color(*TABLE_HEADER_BG)
        self.set_text_color(*WHITE)
        for i, h in enumerate(headers):
            self.cell(widths[i], row_h, f"  {h}", border=0, fill=True)
        self.ln()

        # data rows
        self.set_font("Helvetica", "", 8)
        for ri, row in enumerate(rows):
            if ri % 2 == 0:
                self.set_fill_color(*WHITE)
            else:
                self.set_fill_color(*TABLE_ROW_ALT)
            self.set_text_color(50, 50, 60)
            for i, cell in enumerate(row):
                self.cell(widths[i], row_h, f"  {cell}", border=0, fill=True)
            self.ln()
        self.ln(3)

    def separator(self):
        self.ln(2)
        y = self.get_y()
        self.set_draw_color(200, 200, 210)
        self.line(20, y, self.w - 20, y)
        self.ln(4)


def build_pdf():
    pdf = PortfolioPDF()
    pdf.alias_nb_pages()
    pdf.set_title("Portfolio Content Blocks - Visual Reference Guide")
    pdf.set_author("Team Creative")

    # ==================== COVER PAGE ====================
    pdf.add_page()
    pdf.ln(50)
    pdf.set_font("Helvetica", "B", 32)
    pdf.set_text_color(*BRAND_DARK)
    pdf.cell(0, 14, "Portfolio Content Blocks", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 16)
    pdf.set_text_color(*BRAND_ACCENT)
    pdf.cell(0, 10, "Visual Reference Guide", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(100, 100, 110)
    pdf.cell(0, 7, "For the Content Team", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Every available block, its data structure, and how it looks on the website.", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(30)
    # decorative bar
    pdf.set_fill_color(*BRAND_ACCENT)
    pdf.rect((pdf.w - 60) / 2, pdf.get_y(), 60, 2, "F")
    pdf.ln(15)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(150, 150, 160)
    pdf.cell(0, 6, "Team Creative  |  February 2026", align="C")

    # ==================== HOW IT WORKS ====================
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*BRAND_DARK)
    pdf.cell(0, 12, "How It Works", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(2)
    pdf.body_text(
        "Each portfolio project has a 'content' array. Each item in the array is "
        "a block with a 'type' field. You compose a portfolio page by stacking "
        "blocks in any order."
    )
    pdf.code_block('''{
  "content": [
    { "type": "hero", ... },
    { "type": "text-highlight", ... },
    { "type": "info-card", ... }
  ]
}''')
    pdf.body_text(
        "IMPORTANT: All text fields support localization. You can pass either "
        'a plain string "Hello" or an object { "en": "Hello", "ge": "<Georgian>" }.'
    )
    pdf.separator()

    # ==================== 1. HERO BLOCK ====================
    pdf.add_page()
    pdf.section_title("1", "Hero Block",
                      'Type: "hero" - Full-screen intro section with background media. Usually the first block.')
    pdf.add_image_block("01_hero_center_1771540956533.png", "Hero Block - Center Aligned")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "hero",
  "media": "/images/project/cover.jpg",
  "mediaType": "image",
  "title": { "en": "Project Title", "ge": "..." },
  "subtitle": { "en": "Category / Client", "ge": "..." },
  "badge": { "en": "Social Media", "ge": "..." },
  "align": "center"
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["media", "Yes", "image/video path", "Background media"],
            ["mediaType", "Yes", '"image" or "video"', "Type of media"],
            ["title", "Optional", "text", "Large heading"],
            ["subtitle", "Optional", "text", "Smaller text above title"],
            ["badge", "Optional", "text", "Pill-shaped tag above subtitle"],
            ["align", "Optional", '"center" / "left"', "Text alignment (default: center)"],
        ],
    )
    pdf.separator()

    # ==================== 2. TEXT HIGHLIGHT ====================
    pdf.section_title("2", "Text Highlight Block",
                      'Type: "text-highlight" - Important statements, chapter titles, or section text.')
    pdf.add_image_block("02_text_center_1771540957613.png", "Text Highlight - Center Aligned")
    pdf.add_image_block("03_text_left_1771540964616.png", "Text Highlight - Left Aligned")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "text-highlight",
  "label": { "en": "The Challenge", "ge": "..." },
  "text": { "en": "Your main statement here...", "ge": "..." },
  "align": "center"
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["text", "Yes", "text", "Main paragraph content"],
            ["label", "Optional", "text", "Small uppercase label above text"],
            ["align", "Optional", '"center" / "left"', "Text alignment (default: center)"],
        ],
    )
    pdf.separator()

    # ==================== 3. LEGACY COLUMNS ====================
    pdf.section_title("3", "Legacy Columns Block",
                      'Type: "legacy-columns" - Two-column layout for comparisons.')
    pdf.add_image_block("04_legacy_columns_1771540965688.png", "Legacy Columns")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "legacy-columns",
  "left": {
    "label": { "en": "The Task", "ge": "..." },
    "title": { "en": "Challenge", "ge": "..." },
    "text": { "en": "Describe the problem...", "ge": "..." }
  },
  "right": {
    "label": { "en": "The Strategy", "ge": "..." },
    "title": { "en": "Our Approach", "ge": "..." },
    "text": { "en": "Describe the solution...", "ge": "..." }
  }
}''')
    pdf.data_table(
        ["Field", "Required", "Description"],
        [
            ["left.title", "Yes", "Left column heading"],
            ["left.text", "Yes", "Left column paragraph"],
            ["left.label", "Optional", "Small label above heading"],
            ["right.*", "Same as left", "Right column content"],
        ],
    )
    pdf.separator()

    # ==================== 4. INFO CARD ====================
    pdf.section_title("4", "Info Card Block",
                      'Type: "info-card" - Media with an overlaid information card.')
    pdf.sub_heading("Variations")
    pdf.add_image_block("05_infocard_paper_left_1771540973903.png", "Paper Theme / Left Aligned")
    pdf.add_image_block("06_infocard_paper_right_1771540975358.png", "Paper Theme / Right Aligned")
    pdf.add_image_block("07_infocard_dark_1771540976724.png", "Dark Theme")
    pdf.add_image_block("08_infocard_glass_1771540978141.png", "Glass Theme")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "info-card",
  "media": "/images/project/photo.jpg",
  "mediaType": "image",
  "title": { "en": "Card Title", "ge": "..." },
  "align": "left",
  "theme": "paper",
  "details": [
    { "label": { "en": "Client" }, "value": { "en": "Brand X" } },
    { "label": { "en": "Platform" }, "value": { "en": "Instagram" } }
  ]
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["media", "Yes", "path", "Background image or video"],
            ["mediaType", "Yes", '"image" / "video"', "Type of media"],
            ["title", "Optional", "text", "Card heading"],
            ["align", "Optional", '"left" / "right"', "Which side the card appears"],
            ["theme", "Optional", '"paper"/"dark"/"glass"', "Visual style of the card"],
            ["details", "Optional", "array", "List of label/value pairs"],
        ],
    )
    pdf.separator()

    # ==================== 5. MEDIA GRID ====================
    pdf.section_title("5", "Media Grid Block",
                      'Type: "media-grid" - Gallery of images/videos in a grid layout.')
    pdf.add_image_block("09_mediagrid_square_1771540979470.png", "Square Items (2 columns)")
    pdf.add_image_block("10_mediagrid_wide_1771540980898.png", "Wide Item (full width)")
    pdf.add_image_block("11_mediagrid_mixed_v2_1771541045998.png", "Mixed (squares + wide)")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "media-grid",
  "items": [
    { "media": "/images/photo1.jpg", "mediaType": "image", "size": "sq" },
    { "media": "/images/photo2.jpg", "mediaType": "image", "size": "sq" },
    { "media": "/images/wide.jpg", "mediaType": "image", "size": "wide" }
  ]
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["items[].media", "Yes", "path", "Image or video path"],
            ["items[].mediaType", "Yes", '"image" / "video"', "Type"],
            ["items[].size", "Optional", '"sq" / "wide"', "sq = one column, wide = full width"],
        ],
    )
    pdf.separator()

    # ==================== 6. REEL GRID ====================
    pdf.section_title("6", "Reel Grid Block",
                      'Type: "reel-grid" - Vertical 9:16 cards for Reels/TikTok/Stories.')
    pdf.add_image_block("12_reelgrid_1771540983592.png", "Reel Grid")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "reel-grid",
  "mobileLayout": "swipe",
  "items": [
    { "media": "/images/reel1.mp4", "mediaType": "video",
      "caption": { "en": "Behind the Scenes" } },
    { "media": "/images/reel2.mp4", "mediaType": "video",
      "caption": { "en": "Product Demo" } },
    { "media": "/images/reel3.mp4", "mediaType": "video",
      "caption": { "en": "Testimonial" } }
  ]
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["mobileLayout", "Optional", '"swipe" / "column"', "swipe = horizontal scroll on mobile"],
            ["items[].media", "Yes", "path", "Media path"],
            ["items[].mediaType", "Yes", '"image" / "video"', "Type"],
            ["items[].caption", "Optional", "text", "Caption overlay at the bottom"],
        ],
    )
    pdf.separator()

    # ==================== 7. BENTO GRID ====================
    pdf.section_title("7", "Bento Grid Block",
                      'Type: "bento-grid" - Asymmetric layout, 2 small + 1 large.')
    pdf.add_image_block("13_bentogrid_v2_1771541015499.png", "Bento Grid")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "bento-grid",
  "items": [
    { "media": "/images/small1.jpg", "mediaType": "image",
      "span": "small", "caption": { "en": "Detail 1" } },
    { "media": "/images/small2.jpg", "mediaType": "image",
      "span": "small", "caption": { "en": "Detail 2" } },
    { "media": "/images/feature.jpg", "mediaType": "image",
      "span": "large", "caption": { "en": "Main Feature" } }
  ]
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["items[].media", "Yes", "path", "Media path"],
            ["items[].mediaType", "Yes", '"image" / "video"', "Type"],
            ["items[].span", "Yes", '"small" / "large"', "small = stacks left, large = fills right"],
            ["items[].caption", "Optional", "text", "Caption overlay"],
        ],
    )
    pdf.separator()

    # ==================== 8. VERTICAL SHOWCASE ====================
    pdf.section_title("8", "Vertical Showcase Block",
                      'Type: "vertical-showcase" - Single tall vertical media.')
    pdf.add_image_block("14_vertical_showcase_1771540986229.png", "Vertical Showcase")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "vertical-showcase",
  "media": "/images/mobile-screen.jpg",
  "mediaType": "image",
  "title": { "en": "App Design", "ge": "..." },
  "overlayText": { "en": "Award-winning UX", "ge": "..." }
}''')
    pdf.data_table(
        ["Field", "Required", "Options", "Description"],
        [
            ["media", "Yes", "path", "Image or video"],
            ["mediaType", "Yes", '"image" / "video"', "Type"],
            ["title", "Optional", "text", "Bold heading at the bottom"],
            ["overlayText", "Optional", "text", "Smaller text under the title"],
        ],
    )
    pdf.separator()

    # ==================== 9. RESULTS ====================
    pdf.section_title("9", "Results Block",
                      'Type: "results" - Displaying campaign outcomes with big numbers.')
    pdf.add_image_block("15_results_v2_1771541016632.png", "Results Block")
    pdf.sub_heading("Data Structure")
    pdf.code_block('''{
  "type": "results",
  "title": { "en": "Campaign Results", "ge": "..." },
  "description": { "en": "Our strategy delivered...", "ge": "..." },
  "stats": [
    { "label": { "en": "Engagement" }, "value": { "en": "150%" } },
    { "label": { "en": "Reach" }, "value": { "en": "500K+" } },
    { "label": { "en": "Conversions" }, "value": { "en": "12K" } },
    { "label": { "en": "ROI" }, "value": { "en": "3.5x" } }
  ]
}''')
    pdf.data_table(
        ["Field", "Required", "Description"],
        [
            ["title", "Yes", "Section heading"],
            ["description", "Yes", "Summary paragraph"],
            ["stats", "Yes", "Array of label/value metric pairs"],
        ],
    )
    pdf.separator()

    # ==================== QUICK REFERENCE TABLE ====================
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*BRAND_DARK)
    pdf.cell(0, 12, "Quick Reference Table", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)
    pdf.data_table(
        ["Block Type", "Best For", "Media?", "Text?"],
        [
            ["hero", "Page intro", "Background", "Title, Subtitle, Badge"],
            ["text-highlight", "Key statements", "No", "Label + Text"],
            ["legacy-columns", "Challenge vs Strategy", "No", "Two columns"],
            ["info-card", "Project details", "Background", "Title + key-value details"],
            ["media-grid", "Photo/video gallery", "Grid items", "No"],
            ["reel-grid", "Reels/Stories showcase", "Vertical items", "Captions"],
            ["bento-grid", "Asymmetric highlight", "Mixed sizes", "Captions"],
            ["vertical-showcase", "Mobile/portrait", "Single vertical", "Title + overlay text"],
            ["results", "Campaign metrics", "No", "Title + stats"],
        ],
    )

    # ==================== SAVE ====================
    pdf.output(OUTPUT)
    print(f"\n  PDF generated successfully!")
    print(f"  Location: {OUTPUT}")
    print(f"  Pages: {pdf.page_no()}\n")


if __name__ == "__main__":
    build_pdf()
