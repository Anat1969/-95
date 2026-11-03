# 95° Guide — הנחיות לקלוד קוד

## מהו הפרויקט
כלי עבודה דיגיטלי לאדריכלים, אדריכלי עיר ומנהלי אגף מבני ציבור בישראל.
המטרה: להבין, ליישם ולבדוק תכנון מרחב ידידותי לילדים ולמשפחותיהם.
כל הטקסטים בעברית. כיוון RTL מלא. אין תרגום לאנגלית בממשק.

---

## סטאק טכני

- **Framework:** Next.js 14 App Router
- **שפה:** TypeScript
- **עיצוב:** Tailwind CSS + CSS Variables (tokens.css)
- **פונטים:** Google Fonts — DM Serif Display, Heebo, JetBrains Mono
- **נתונים:** JSON סטטי מהתיקייה `/data`
- **Hosting:** Vercel (ברירת מחדל)
- **Auth:** אין — אפליקציה ציבורית

---

## מבנה תיקיות

```
/
├── app/
│   ├── layout.tsx              # Root layout עם RTL, פונטים, Nav
│   ├── page.tsx                # Landing screen
│   ├── principles/
│   │   ├── page.tsx            # רשת כל העקרונות עם סינון
│   │   └── [id]/
│   │       └── page.tsx        # דף עיקרון בודד
│   ├── checklist/
│   │   └── page.tsx            # צ׳קליסט אינטראקטיבי
│   ├── cases/
│   │   ├── page.tsx            # רשת מקרי בוחן
│   │   └── [id]/
│   │       └── page.tsx        # דף מקרה בוחן בודד
│   └── sources/
│       └── page.tsx            # מקורות ותיעוד
├── components/
│   ├── Nav.tsx                 # ניווט קבוע עליון
│   ├── PrincipleCard.tsx       # כרטיסיית עיקרון
│   ├── ChecklistItem.tsx       # פריט צ׳קליסט
│   ├── CaseCard.tsx            # כרטיסיית מקרה בוחן
│   ├── SourceBlock.tsx         # בלוק מקור
│   ├── DimensionBadge.tsx      # תג ממד טכני
│   ├── FilterPills.tsx         # פילים לסינון
│   └── BackButton.tsx          # כפתור חזרה אחיד
├── data/
│   ├── principles.json         # 12 עקרונות
│   ├── cases.json              # 4 מקרי בוחן
│   └── sources.json            # 3 מקורות
├── styles/
│   └── tokens.css              # כל משתני העיצוב
├── types/
│   └── index.ts                # TypeScript interfaces
├── lib/
│   └── utils.ts                # פונקציות עזר (סינון, מיון)
└── public/
    └── images/cases/           # תמונות מקרי בוחן (placeholder בינתיים)
```

---

## Routes סגורים — אל תוסיף בלי אישור

| Route | תיאור |
|-------|--------|
| `/` | Landing — שאלה מרכזית + 3 כניסות |
| `/principles` | רשת כל 12 העקרונות עם סינון |
| `/principles/[id]` | דף עיקרון בודד מלא |
| `/checklist` | צ׳קליסט אינטראקטיבי עם אחוז עמידה |
| `/cases` | רשת 4 מקרי בוחן |
| `/cases/[id]` | דף מקרה בוחן בודד |
| `/sources` | מקורות מתועדים עם קישורים |
| `/walk` | הליכה בגובה 95 ס״מ: כיכר מול גן ילדים, מצב נפוץ מול ההנחיות (אושר ע״י ענת, 03.11.2026) |

---

## שפה עיצובית — חובה לשמור

### זהות
- **שם:** 95° Guide
- **קונספט:** תכנון מגובה 95 ס״מ — גובה ילד בן 3
- **טון:** מקצועי, אדריכלי, עירוני. לא אפליקטיבי. לא AI-גנרי.

### כללים שאסור לשבור
1. **אין פינות מעוגלות** — `border-radius: 0` בכל מקום
2. **אין אייקונים** מ-icon libraries (Heroicons, Lucide וכד׳)
3. **אין צללים** — `box-shadow: none`. גבולות וקווים במקום
4. **אין gradients** — צבעים אחידים בלבד
5. **RTL מלא** — `dir="rtl"` על `<html>`, flex-direction מותאם
6. **אין Inter, Roboto, Arial** — רק הפונטים המוגדרים
7. **ניגודיות גבוהה** — טקסט כהה על בהיר, טקסט בהיר על כהה. אף פעם אפור על אפור

### היררכיית טיפוגרפיה
- כותרות ראשיות: `DM Serif Display` — גדול, italic לפעמים
- גוף וממשק: `Heebo` — weight 300/400/700/900
- נתונים ומידות: `JetBrains Mono` — תמיד למספרים טכניים

---

## Design Tokens — השתמש תמיד במשתנים

```css
/* ראה styles/tokens.css לרשימה המלאה */
--paper:  #F0EDE6   /* רקע ראשי */
--ink:    #1A1A18   /* טקסט ראשי */
--forest: #2D4A3E   /* אקצנט ירוק */
--earth:  #8C7B6B   /* טקסט משני */
--lime:   #C5E07A   /* הדגשה על כהה */
--fog:    #D4D0C7   /* גבולות */
--white:  #FAFAF8   /* רקע כרטיסיות */
```

---

## נתונים — איך לקרוא

```typescript
// דוגמה לקריאת נתונים ב-Next.js App Router
import principles from '@/data/principles.json'
import cases from '@/data/cases.json'
import sources from '@/data/sources.json'

// הנתונים סטטיים — אין API calls, אין fetch
// סינון קורה ב-client עם useState
```

---

## TypeScript Interfaces

```typescript
// ראה types/index.ts לרשימה המלאה

interface Principle {
  id: string
  priority: number
  title: string
  summary: string
  why: string
  requirement: string
  dimension: string
  sources: ('urban95' | 'moe' | 'moeconstruction')[]
  projectTypes: string[]
  phase: ('general' | 'execution')[]
  caseStudy: string | null
  tags: string[]
  accentColor: string
}
```

---

## סדר בנייה — עבוד לפי הסדר הזה

**שלב 1:** `app/layout.tsx` — RTL, פונטים, Nav, globals  
**שלב 2:** `app/page.tsx` — Landing screen  
**שלב 3:** `app/principles/page.tsx` — רשת עקרונות עם סינון  
**שלב 4:** `app/principles/[id]/page.tsx` — עיקרון בודד  
**שלב 5:** `app/checklist/page.tsx` — צ׳קליסט עם state  
**שלב 6:** `app/cases/page.tsx` + `[id]/page.tsx`  
**שלב 7:** `app/sources/page.tsx`  
**שלב 8:** עיבוי — תמונות, אנימציות, responsive  

---

## מקורות הנתונים — חשוב לתיעוד

| קוד | שם מלא | קישור |
|-----|--------|--------|
| `urban95` | Urban95 — קרן ברנרד ון ליר | https://vanleerfoundation.org/he/publications-reports/urban95-israel-guidelines/ |
| `moe` | משרד החינוך — אגף מיפוי ותכנון | https://pituach.education.gov.il/about-agaf/planning-guidelines/ |
| `moeconstruction` | משרד החינוך — פורטל רשויות | https://pob.education.gov.il/institutions/main-construction/ |

---

## מה אסור לייצר

- תוכן שלא מבוסס על המקורות המתועדים
- עיצוב עם אייקונים מ-emoji או icon libraries
- טקסט placeholder כמו "Lorem ipsum" — תשתמש בנתונים האמיתיים מה-JSON
- קומפוננטות שצורכות localStorage — כל state ב-useState בלבד
- קבצים מחוץ למבנה התיקיות המוגדר בלי אישור

## A&I logo button
The top bar holds only the app name (links home), content navigation, and ONE logo button "אד' ענת שטיבלמן A&I" (`<ai-menu>` from https://appofapp-gh.vercel.app/ai-menu.js). Every editing and development action (העתקת קישור, שיחת הפיתוח, פרויקט המחקר, התקנת האפליקציה, edit mode, add, delete) lives only inside it, never as loose buttons. Standard: https://github.com/Anat1969/AppOfApp-GH/blob/main/docs/ai-menu-standard.md

## הליכה בגובה העיניים (`/walk`)
- הרכיב המשותף `<space-walk>` נטען מ-https://appofapp-gh.vercel.app/walk.js. התקן: https://github.com/Anat1969/AppOfApp-GH/blob/main/docs/walk-standard.md
- התוכנית נמצאת ב-`data/walk.json`. כל מידה בה לקוחה מ-`principles.json`, ולכל פריט נמדד יש `ref` לעיקרון שלו.
- הכלל, שמוצג גם במסך: אלמנט אטום חוסם כשהחלק העליון שלו מגיע לגובה העיניים. מגבלה: גובה בלבד, בלי מרחק.
- המצב נשמר בכתובת (`?eye=95&v=guide&view=top`).
- בדיקה: `npm run build && npx next start -p 3095 & node tests/walk.e2e.mjs`. ‏walk.js ו-ai-menu.js מוגשים מעותק מקומי של AppOfApp-GH.

## כתובת שנייה בלי מכסת Vercel
- https://anat1969.github.io/-95/ : עותק סטטי של main ב-GitHub Pages, מענף `static`. ה-Action `static-preview.yml` בונה אותו עם `STATIC_EXPORT=1` ו-`BASE_PATH=/-95`, בלי `app/api`. הגדרה חד־פעמית: Settings > Pages > Deploy from a branch > `static`.
- לא raw.githack: הוא מציג דף ביניים עם פרסומת לפני דפי HTML (נבדק 03.11.2026).
- כל נתיב לקובץ ציבורי עובר דרך `asset()` מ-`lib/utils.ts`. אף פעם לא `/` חשוף.
- ענפי `claude/*` ו-`static` לא נפרסים ב-Vercel (`vercel.json`).
- `walk.js` נטען מ-Vercel, ואם הוא לא עונה, מ-Pages של AppOfApp-GH.

## יומן תיקונים
- 03.11.2026: מכסת Vercel של החשבון נוצלה ("Deployment rate limited"), ולכן נוספה כתובת שנייה ב-GitHub Pages.
- 03.11.2026: נוסף דף `/walk`, מתוך סרטון על spaceplanner.co, באישור ענת. נוסף קישור "בגובה 95" בסרגל וכפתור בדף הבית. בנייד הקישורים בסרגל גוללים בתוכו, וכפתור A&I נשאר גלוי.

## למדנו בבנייה
- `next start` ישן שרץ ברקע מגיש בנייה קודמת, ולכן הבדיקה נכשלת בלי סיבה נראית. עוצרים את `next-server` לפני כל הרצה.
- JetBrains Mono בלי עברית: תוויות בעברית בגופן הרגיל, ומספרים עם `tabular-nums`.
