# 95° Guide — מדריך תכנון ידידותי לילדות

אפליקציית ווב מקצועית לאדריכלים ואדריכלי עיר בישראל. כלי לבנייה, בדיקה והבנת עקרונות תכנון מרחב בגובה 95 ס״מ — גובה עיניו של ילד בן 3.

## 🎯 תכונות

- **12 עקרונות תכנון** — מחקריים, עם דרישות מינימום
- **צ׳קליסט אינטראקטיבי** — חישוב אחוז עמידה בזמן אמת
- **מקרי בוחן** — 4 דוגמאות מעשיות מישראל
- **מקורות תיעוד** — Urban95, משרד החינוך
- **RTL מלא** — עברית טהורה, דיזיין מינימליסטי
- **נגישות** — responsive, touch-friendly, WCAG

## 🛠️ Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- Tailwind CSS + Design Tokens
- JSON static data
- Vercel deployment

## 🚀 התחלה

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Production build
```

## 📁 מבנה

```
/app               # Pages and routes
/components        # Reusable components
/styles           # Design tokens
/data             # JSON datasets
/lib              # Utilities (filtering, compliance)
/types            # TypeScript interfaces
```

## 🎨 עקרונות עיצוביים

- ✅ אין border-radius — זוויות חדות
- ✅ אין אייקונים — טקסט בלבד
- ✅ אין צללים — גבולות וקווים
- ✅ אין gradients — צבעים מוצקים
- ✅ RTL מלא — עברית כברירת מחדל
- ✅ ניגודיות גבוהה — קריאות מכל מרחק

## 📊 Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing |
| `/principles` | Principles grid + filtering |
| `/principles/[id]` | Principle detail |
| `/checklist` | Interactive compliance check |
| `/cases` | Case studies grid |
| `/cases/[id]` | Case study detail |
| `/sources` | Attribution & sources |

## 📝 כל עקרון מכיל

- **Title** — השם של העקרון
- **Summary** — תיאור קצר בעברית
- **Why** — הסבר מדוע חשוב
- **Requirement** — דרישה מינימום
- **Dimension** — מדד טכני (מטרים, סנטימטרים, אחוזים)
- **Sources** — מקורות (Urban95, MOE, POB)
- **Related** — עקרונות קשורים

## 🔍 מקורות

1. Urban95 — קרן ברנרד ון ליר
2. משרד החינוך — אגף מיפוי ותכנון
3. משרד החינוך — פורטל רשויות

---

**Version**: 0.1.0 | **Built**: June 2026 | **Deployed**: Vercel
