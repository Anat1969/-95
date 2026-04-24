# 95° Guide

כלי עבודה לאדריכלים ומתכנני ערים — להבנה, יישום וביקורת של תכנון מרחב ידידותי לילדים.

---

## הוראות התחלה עם קלוד קוד

### שלב 1 — צור פרויקט Next.js

```bash
npx create-next-app@latest 95guide --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd 95guide
```

### שלב 2 — העתק את הקבצים מהתיקייה הזו

העתק לתוך תיקיית הפרויקט החדשה:

```
CLAUDE.md          → שורש הפרויקט (חובה — קלוד קוד קורא אותו אוטומטית)
data/              → /data
styles/tokens.css  → /styles/tokens.css
types/index.ts     → /types/index.ts
lib/utils.ts       → /lib/utils.ts
```

### שלב 3 — עדכן globals.css

ב-`app/globals.css`, הוסף בתחילת הקובץ:

```css
@import '../styles/tokens.css';
```

### שלב 4 — פתח קלוד קוד

```bash
claude
```

קלוד קוד יקרא את `CLAUDE.md` אוטומטית ויתחיל לעבוד לפי ההנחיות.

---

## סדר הפרומפטים לקלוד קוד

שלח את הפרומפטים הבאים **לפי הסדר**. סיים כל שלב לפני שתתחיל את הבא.

---

### פרומפט 1 — Layout ו-Nav

```
בנה את app/layout.tsx עם:
- dir="rtl" על html
- טעינת פונטים מ-tokens.css (DM Serif Display, Heebo, JetBrains Mono)
- קומפוננט Nav קבוע עליון בגובה 52px
- Nav כולל: לוגו "95°" משמאל, קישורים לניווט מימין (עקרונות, צ׳קליסט, מקרי בוחן, מקורות)
- background: var(--paper), border-bottom: var(--border)
- ללא border-radius, ללא אייקונים, ללא צללים
- הדף הפעיל מסומן ב-border-bottom: var(--border-ink)
```

---

### פרומפט 2 — Landing Page

```
בנה את app/page.tsx — דף נחיתה:
- רקע מלא var(--ink)
- מספר ענק "95°" ברקע (opacity 0.04, גופן DM Serif Display)
- תגית עליונה: "מדריך תכנון ידידותי לילדות — ישראל"
- כותרת גדולה: "מה גובה נקודת המבט שלך?" — DM Serif Display, italic על המילה "נקודת המבט", צבע var(--lime)
- כיתוב: "כלי עבודה לאדריכלים ומתכנני ערים — להבנה, יישום וביקורת של תכנון מרחב ידידותי לילדים."
- 3 כפתורי כניסה (בלי עיגולים):
  1. "אני מתכנן פרויקט" → /principles (primary: background var(--lime))
  2. "אני בודק תוכנית מוגשת" → /checklist (outline)  
  3. "אני רוצה ללמוד את העקרונות" → /principles (outline)
- בתחתית: שורת מקורות קטנה "Urban95 — קרן ון ליר · משרד החינוך — אגף מיפוי ותכנון"
```

---

### פרומפט 3 — עמוד עקרונות

```
בנה את app/principles/page.tsx:
- קרא נתונים מ data/principles.json
- כותרת: "עקרונות" (DM Serif Display)
- שורת סינון: pills לפי תגיות (בטיחות, משחק, נגישות וכד׳)
- גריד 3 עמודות (responsive: 2 על טאבלט, 1 על מובייל)
- כל כרטיסייה (PrincipleCard):
  - מספר עדיפות: "#01" בגופן mono
  - כותרת בגופן DM Serif Display
  - תיאור קצר
  - תג ממד (dimension) עם accentColor כרקע
  - תגיות
  - badges של מקורות (U95 / MOE)
  - border: var(--border), ללא צל, ללא עיגולים
  - hover: border-color: var(--ink)
- לחיצה → /principles/[id]
- אין pagination — כל 12 מוצגים
```

---

### פרומפט 4 — דף עיקרון בודד

```
בנה את app/principles/[id]/page.tsx:
- קרא עיקרון לפי id מ data/principles.json
- generateStaticParams לכל העקרונות
- כפתור חזרה: "→ חזרה לעקרונות"
- Hero section (var(--paper)):
  - PRIORITY #01 (mono)
  - כותרת גדולה (DM Serif Display, 60px)
  - תיאור סיכום
  - תגיות
- Grid 2 עמודות:
  - שמאל: "מדוע זה חשוב" — טקסט ה-why
  - ימין: ממד גדול בצבע var(--lime) על רקע כהה + מקורות
- בלוק "דרישת מינימום" — רקע var(--ink), טקסט בהיר, כל דרישה עם dash
- מקרה בוחן (אם קיים): כפתור קישור → /cases/[id]
- עקרונות קשורים: 3 כרטיסיות קישור
```

---

### פרומפט 5 — צ׳קליסט

```
בנה את app/checklist/page.tsx (Client Component):
- useState לכל עיקרון: 'yes' | 'no' | 'na' | null
- בראש: כותרת + אחוז עמידה חי (JetBrains Mono, 32px, צבע var(--forest))
- Progress bar: קו אחד, 4px גובה, רקע var(--fog), fill var(--forest)
- כל פריט:
  - שתי תיבות סימון: V (ירוק) ו-X (אדום)
  - כותרת העיקרון
  - דרישת המינימום בקטן
  - כפתורים: "הסבר מלא" → /principles/[id] | "לא רלוונטי"
  - תג ממד עם accentColor
- בתחתית: סיכום + כפתור "הורד דוח" (placeholder)
```

---

### פרומפט 6 — מקרי בוחן

```
בנה את app/cases/page.tsx ו-app/cases/[id]/page.tsx:

דף רשימה:
- גריד 2×2
- כל כרטיס: רקע accentColor, טקסט בהיר
- עיר (mono), שם (DM Serif Display, 30px), סוג + שנה, תיאור, תגיות עקרונות

דף בודד:
- Hero: רקע accentColor, כותרת גדולה, תיאור ארוך
- גריד עקרונות מקושרים
- מקור בתחתית
```

---

### פרומפט 7 — מקורות

```
בנה את app/sources/page.tsx:
- כותרת: "מקורות"
- כיתוב: "כל עיקרון מסומן במקור המדויק שלו. מידע ללא מקור — אינו מידע."
- 3 בלוקים (לפי sources.json):
  - Header: תג צבעוני (tag) + שם + subtitle + שנה
  - Body: תיאור + נושאים (pills) + קישור "עבור למקור המלא ←"
- בתחתית: הצהרת שקיפות בגבול
```

---

### פרומפט 8 — עיבוי ו-Responsive

```
עבר על כל הדפים ובצע:
1. Responsive: mobile (1 עמודה), tablet (2), desktop (3)
2. וודא dir="rtl" תקין בכל הגרידים (flex-direction: row-reverse אם נדרש)
3. הוסף transition: var(--transition-base) לכל הכפתורים והכרטיסיות
4. וודא שאין border-radius בשום מקום
5. וודא שאין box-shadow בשום מקום
6. Meta tags: title, description, og:image לכל עמוד
7. Loading states פשוטים (skeleton) לדפים דינמיים
```

---

## מבנה הפרויקט לאחר הגדרה

```
95guide/
├── CLAUDE.md              ← קלוד קוד קורא זאת תמיד
├── data/
│   ├── principles.json    ← 12 עקרונות
│   ├── cases.json         ← 4 מקרי בוחן
│   └── sources.json       ← 3 מקורות
├── styles/
│   └── tokens.css         ← כל משתני העיצוב
├── types/
│   └── index.ts           ← TypeScript interfaces
├── lib/
│   └── utils.ts           ← פונקציות עזר
└── app/                   ← Next.js יבנה זאת
```

---

## כללים לא לשבור

- אין `border-radius` בשום מקום
- אין `box-shadow`
- אין אייקונים (Heroicons, Lucide וכד׳)
- אין `localStorage` — רק `useState`
- הכל בעברית, `dir="rtl"` על `<html>`
- רק הפונטים: DM Serif Display, Heebo, JetBrains Mono
- כל צבע דרך `var(--...)` מ-tokens.css
