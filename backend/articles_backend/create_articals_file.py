import json


import random

# date נותן את התאריך של היום
# timedelta מאפשר להחסיר מספר ימים מתאריך
from datetime import date, timedelta

# =========================================================
# 1. נתונים בסיסיים שמהם נייצר את המשתמשים והכתבות
# =========================================================

# ערים אפשריות לפרופיל המשתמש
cities = [
    "Tel Aviv",
    "Jerusalem",
    "Haifa",
    "Lod",
    "Beer Sheva",
]

# נושאים אפשריים לביוגרפיה של המשתמש
topics = [
    "Technology",
    "Health",
    "Sport",
    "Politics",
    "Finance",
    "Travel",
    "Education",
    "AI",
    "Django",
    "Science",
]

# אלו גם התגיות שיהיו זמינות לכתבות
tags = [
    "Technology",
    "Health",
    "Sport",
    "Politics",
    "Finance",
    "Travel",
    "Education",
    "AI",
    "Django",
    "Science",
]

# כותרות בסיסיות לכתבות
# בהמשך נוסיף לכל כותרת מספר כדי שהיא תהיה ייחודית
titles = [
    "New AI Tool Changes The Tech World",
    "Health Experts Recommend Better Sleep",
    "Local Team Wins Important Match",
    "New Government Plan Announced",
    "Finance Market Shows Strong Growth",
    "Best Travel Destinations This Year",
    "Students Learn Programming With Django",
    "Scientists Discover New Research Results",
    "Technology Companies Invest In AI",
    "Education System Moves Online",
]

# משפטים שמהם נרכיב את תוכן הכתבות
content_parts = [
    "This article explains the main details of the topic.",
    "Experts say this subject is becoming more important every year.",
    "Many people are interested in this story because it affects daily life.",
    "The article includes background information, examples, and analysis.",
    "According to recent discussions, this topic will continue to grow.",
    "Researchers continue to examine the possible effects of this development.",
    "The subject has created discussion among experts and the general public.",
    "More information is expected to become available in the coming months.",
]

# תגובות אפשריות
comment_texts = [
    "Great article!",
    "Very interesting.",
    "I learned something new.",
    "I disagree with part of this.",
    "Thanks for sharing.",
]


# =========================================================
# 2. יצירת משתמשים
# =========================================================

# הרשימה הזאת תכיל את כל המשתמשים שניצור
users = []

# הלולאה רצה 10 פעמים ויוצרת משתמשים עם id מ־1 עד 10
for i in range(1, 11):

    # ששת המשתמשים הראשונים יהיו כותבים
    if i <= 6:
        role = "author"

    # שני המשתמשים הבאים יהיו עורכים
    elif i <= 8:
        role = "editor"

    # שני המשתמשים האחרונים יהיו קוראים
    else:
        role = "reader"

    # יצירת אובייקט של משתמש אחד
    user = {
        "id": i,
        "username": f"user{i}",
        "email": f"user{i}@example.com",
        "first_name": f"User{i}",
        "last_name": "Demo",
        # מידע נוסף על המשתמש
        # בעתיד הנתונים האלה יוכלו להיכנס ל־UserProfile
        "profile": {
            "bio": f"I write about {random.choice(topics)}.",
            # בחירת עיר אקראית
            "city": random.choice(cities),
            # גיל אקראי בין 22 ל־60
            "age": random.randint(22, 60),
            # מספר שנות ניסיון אקראי בין 1 ל־20
            "experience_years": random.randint(1, 20),
            # התפקיד שקבענו למעלה
            "role": role,
        },
    }

    # הוספת המשתמש לרשימת המשתמשים
    users.append(user)


# אנחנו לא רוצים לבחור reader בתור כותב של כתבה
# לכן יוצרים רשימה חדשה שמכילה רק authors ו־editors
article_authors = []

for user in users:
    if user["profile"]["role"] in ["author", "editor"]:
        article_authors.append(user)


# =========================================================
# 3. יצירת 1,000 כתבות
# =========================================================

# הרשימה הזאת תכיל את כל הכתבות
articles = []

# הלולאה רצה 1,000 פעמים
for i in range(1, 1001):

    # -----------------------------------------------------
    # יצירת תוכן הכתבה
    # -----------------------------------------------------

    # בוחרים בין 10 ל־80 משפטים אקראיים
    # random.choices מאפשר לבחור גם את אותו משפט יותר מפעם אחת
    paragraphs = random.choices(
        content_parts,
        k=random.randint(10, 80),
    )

    # מחברים את כל המשפטים לטקסט אחד
    # הרווח " " יהיה בין משפט למשפט
    content = " ".join(paragraphs)

    # split מפרק את הטקסט למילים
    # len סופר כמה מילים יש
    word_count = len(content.split())

    # -----------------------------------------------------
    # בחירת כותב ותגיות
    # -----------------------------------------------------

    # בחירת כותב אקראי מתוך הכותבים והעורכים
    article_author = random.choice(article_authors)

    # בחירה אקראית של 1 עד 3 תגיות שונות
    # sample לא בוחר את אותה תגית פעמיים
    article_tags = random.sample(
        tags,
        random.randint(1, 3),
    )

    # סופרים כמה תגיות נבחרו
    tags_count = len(article_tags)

    # מוציאים את שנות הניסיון מפרופיל הכותב
    author_experience = article_author["profile"]["experience_years"]

    # -----------------------------------------------------
    # האם זו ידיעה מתפרצת
    # -----------------------------------------------------

    # יש כאן True אחד ושלושה False
    # לכן בערך 25% מהכתבות יהיו breaking news
    is_breaking_news = random.choice([True, False, False, False])

    # -----------------------------------------------------
    # חישוב מספר הצפיות
    # -----------------------------------------------------

    # הצפיות מחושבות לפי מידע שאפשר לדעת לפני הפרסום:
    #
    # 1. בסיס של 1,000 צפיות
    # 2. כל מילה מוסיפה 30 צפיות
    # 3. כל תגית מוסיפה 1,200 צפיות
    # 4. כל שנת ניסיון מוסיפה 250 צפיות
    # 5. breaking news מקבלת בונוס של 6,000 צפיות
    # 6. מוסיפים רעש אקראי כדי שהנתונים לא יהיו מושלמים מדי
    noise = random.randint(-1500, 1500)

    views = (
        1000
        + word_count * 30
        + tags_count * 1200
        + author_experience * 250
        + (6000 if is_breaking_news else 0)
        + noise
    )

    # max מוודא שמספר הצפיות לא יהיה שלילי
    views = max(0, views)

    # -----------------------------------------------------
    # יצירת לייקים
    # -----------------------------------------------------

    # הלייקים נוצרים רק אחרי שכבר חישבנו צפיות
    # בין 2% ל־12% מהצופים יתנו לייק
    like_rate = random.uniform(0.02, 0.12)

    likes = int(views * like_rate)

    # -----------------------------------------------------
    # יצירת תאריך פרסום
    # -----------------------------------------------------

    # בוחרים מספר אקראי של ימים בין 0 ל־1,000
    days_ago = random.randint(0, 1000)

    # מחסירים את הימים האלה מהיום
    published_date = date.today() - timedelta(days=days_ago)

    # -----------------------------------------------------
    # יצירת אובייקט הכתבה
    # -----------------------------------------------------

    article = {
        "id": i,
        # הוספת מספר לכותרת כדי שכל כותרת תהיה ייחודית
        "title": random.choice(titles) + f" #{i}",
        "content": content,
        # כל אובייקט הכותב נשמר בתוך הכתבה
        "author": article_author,
        # רשימת התגיות שנבחרו
        "tags": article_tags,
        # הופכים את התאריך לטקסט כדי שיהיה אפשר לשמור אותו ב־JSON
        "published_at": str(published_date),
        # הנתון שנרצה לנבא במודל
        "views": views,
        # נתון שנוצר לאחר הפרסום ולא ישמש במודל הראשון
        "likes": likes,
        # מספר המילים בכתבה
        "word_count": word_count,
        # האם זו ידיעה מתפרצת
        "is_breaking_news": is_breaking_news,
        # כרגע מתחילים עם רשימת תגובות ריקה
        "comments": [],
    }

    # -----------------------------------------------------
    # יצירת תגובות לכתבה
    # -----------------------------------------------------

    # מספר התגובות מושפע מעט ממספר הצפיות
    # אבל מגבילים אותו למקסימום 10 תגובות בדאטה המדומה
    maximum_comments = min(10, views // 5000)

    # בחירת מספר תגובות אקראי
    comments_count = random.randint(0, maximum_comments)

    # יצירת התגובות
    for j in range(comments_count):

        comment = {
            # id של התגובה בתוך הכתבה
            "id": j + 1,
            # בחירת משתמש אקראי שכתב את התגובה
            "user": random.choice(users),
            # בחירת טקסט אקראי לתגובה
            "content": random.choice(comment_texts),
        }

        # הוספת התגובה לרשימת התגובות של הכתבה
        article["comments"].append(comment)

    # אחרי שהכתבה מוכנה, מוסיפים אותה לרשימת הכתבות
    articles.append(article)


# =========================================================
# 4. בניית האובייקט הראשי
# =========================================================

# האובייקט הראשי כולל:
# משתמשים, תגיות וכל הכתבות
data = {
    "users": users,
    "tags": tags,
    "articles": articles,
}


# =========================================================
# 5. כתיבת הנתונים לקובץ JSON
# =========================================================

# open פותח או יוצר קובץ בשם articals.json
#
# "w" אומר שאנחנו פותחים אותו לכתיבה
# אם כבר קיים קובץ בשם הזה, התוכן הישן יוחלף
#
# utf-8 מאפשר לשמור גם עברית בעתיד
with open("articals.json", "w", encoding="utf-8") as file:

    # json.dump מעביר את האובייקט data לתוך הקובץ
    #
    # ensure_ascii=False מאפשר לשמור אותיות בעברית בצורה רגילה
    #
    # indent=4 מסדר את הקובץ בצורה קריאה עם הזחות
    json.dump(
        data,
        file,
        ensure_ascii=False,
        indent=4,
    )


# הודעה שתופיע אחרי שהקובץ נוצר
print("articals.json file created successfully")

# בדיקה של מספר האובייקטים שנוצרו
print(f"Users created: {len(users)}")
print(f"Tags created: {len(tags)}")
print(f"Articles created: {len(articles)}")
