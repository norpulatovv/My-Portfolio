export const languages = ["en", "ru", "uz"] as const;
export type Lang = typeof languages[number];

export const translations = {
  en: {
    nav: { home:"Home", about:"About", skills:"Skills", projects:"Projects", experience:"Experience", contact:"Contact" },
    hero: {
      badge:"Available for hire",
      greeting:"Hi, I'm",
      description:"A 16-year-old Full Stack Developer from Uzbekistan. I build fast, beautiful web apps with React and Node.js.",
      projects_btn:"View Projects", contact_btn:"Contact Me", cv_btn:"Download CV",
    },
    about: {
      tag:"// about me", title:"About Me", greeting:"Hello! I'm",
      p1:"I'm a 16-year-old self-taught Full Stack Developer passionate about creating modern digital experiences. I started coding at 14 and haven't stopped since.",
      p2:"I build full-stack applications using React and Node.js. I love clean code, minimal design, and solving complex problems elegantly.",
      age:"Age", location:"Location", projects:"Projects", experience:"Experience",
      location_val:"Uzbekistan", projects_val:"10+", experience_val:"1 yr",
    },
    skills: { tag:"// my skills", title:"Skills & Technologies" },
    projects: {
      tag:"// my work", title:"Projects", subtitle:"Open source projects from GitHub",
      view:"View Repo", loading:"Fetching projects...", error:"Failed to load. Check GitHub username.",
    },
    experience: { tag:"// my journey", title:"Experience & Education" },
    contact: {
      tag:"// say hello", title:"Get In Touch", subtitle:"Have a project in mind? Let's build it together!",
      name:"Name", email:"Email", message:"Message",
      send:"Send Message", sending:"Sending...", success:"Message sent! 🎉",
      or:"Or find me on",
    },
  },
  ru: {
    nav: { home:"Главная", about:"Обо мне", skills:"Навыки", projects:"Проекты", experience:"Опыт", contact:"Контакт" },
    hero: {
      badge:"Открыт для работы",
      greeting:"Привет, я",
      description:"16-летний Full Stack разработчик из Узбекистана. Создаю быстрые и красивые веб-приложения на React и Node.js.",
      projects_btn:"Мои проекты", contact_btn:"Написать мне", cv_btn:"Скачать CV",
    },
    about: {
      tag:"// обо мне", title:"Обо мне", greeting:"Привет! Я",
      p1:"16-летний самоучка Full Stack разработчик. Начал программировать в 14 лет и с тех пор не останавливаюсь.",
      p2:"Создаю full-stack приложения на React и Node.js. Люблю чистый код и минималистичный дизайн.",
      age:"Возраст", location:"Локация", projects:"Проекты", experience:"Опыт",
      location_val:"Узбекистан", projects_val:"10+", experience_val:"1 года",
    },
    skills: { tag:"// мои навыки", title:"Навыки и Технологии" },
    projects: {
      tag:"// мои работы", title:"Проекты", subtitle:"Open source проекты с GitHub",
      view:"Открыть", loading:"Загрузка...", error:"Ошибка загрузки.",
    },
    experience: { tag:"// мой путь", title:"Опыт и Образование" },
    contact: {
      tag:"// напишите", title:"Связаться", subtitle:"Есть проект? Давайте создадим его вместе!",
      name:"Имя", email:"Email", message:"Сообщение",
      send:"Отправить", sending:"Отправка...", success:"Отправлено! 🎉",
      or:"Или найдите меня",
    },
  },
  uz: {
    nav: { home:"Bosh sahifa", about:"Men haqimda", skills:"Ko'nikmalar", projects:"Loyihalar", experience:"Tajriba", contact:"Aloqa" },
    hero: {
      badge:"Ish uchun tayyor",
      greeting:"Salom, men",
      description:"O'zbekistondan 16 yoshli Full Stack Dasturchi. React va Node.js bilan tez va chiroyli web ilovalar yarataman.",
      projects_btn:"Loyihalarim", contact_btn:"Bog'lanish", cv_btn:"CV yuklab olish",
    },
    about: {
      tag:"// men haqimda", title:"Men haqimda", greeting:"Salom! Men",
      p1:"16 yoshli o'z-o'zini o'rgatgan Full Stack Dasturchi. 14 yoshimda kodlashni boshladim va to'xtatmadim.",
      p2:"React va Node.js bilan full-stack ilovalar yarataman. Toza kod va minimalist dizaynni yaxshi ko'raman.",
      age:"Yosh", location:"Joylashuv", projects:"Loyihalar", experience:"Tajriba",
      location_val:"O'zbekiston", projects_val:"10+", experience_val:"1 yil",
    },
    skills: { tag:"// ko'nikmalarim", title:"Ko'nikmalar va Texnologiyalar" },
    projects: {
      tag:"// ishlarim", title:"Loyihalar", subtitle:"GitHub'dagi open source loyihalarim",
      view:"Reponi ko'rish", loading:"Yuklanmoqda...", error:"Yuklanmadi.",
    },
    experience: { tag:"// mening yo'lim", title:"Tajriba va Ta'lim" },
    contact: {
      tag:"// salom", title:"Bog'lanish", subtitle:"Loyihangiz bormi? Birgalikda yarataylik!",
      name:"Ism", email:"Email", message:"Xabar",
      send:"Yuborish", sending:"Yuborilmoqda...", success:"Yuborildi! 🎉",
      or:"Yoki meni toping",
    },
  },
};