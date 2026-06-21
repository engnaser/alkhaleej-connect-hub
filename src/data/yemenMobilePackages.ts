export type NetworkType = "4G" | "3G" | "VoLTE";

export type YMPackage = {
  id: string;
  name: string;
  price: string;
  internet: string;
  minutes: string;
  sms: string;
  validity: string;
  network: NetworkType;
  code?: string;
};

export type YMCategory = {
  id: string;
  title: string;
  description?: string;
  packages: YMPackage[];
};

export const YEMEN_MOBILE_CATEGORIES: YMCategory[] = [
  {
    id: "mazaya-4g",
    title: "باقات مزايا فورجي",
    description: "باقات شاملة إنترنت ودقائق ورسائل بسرعة 4G.",
    packages: [
      {
        id: "mazaya-4g-500",
        name: "مزايا 500",
        price: "500 ريال",
        internet: "1 جيجا",
        minutes: "30 دقيقة",
        sms: "30 رسالة",
        validity: "7 أيام",
        network: "4G",
        code: "*500#",
      },
      {
        id: "mazaya-4g-1000",
        name: "مزايا 1000",
        price: "1000 ريال",
        internet: "3 جيجا",
        minutes: "60 دقيقة",
        sms: "60 رسالة",
        validity: "15 يوم",
        network: "4G",
        code: "*500#",
      },
      {
        id: "mazaya-4g-2000",
        name: "مزايا 2000",
        price: "2000 ريال",
        internet: "7 جيجا",
        minutes: "150 دقيقة",
        sms: "150 رسالة",
        validity: "30 يوم",
        network: "4G",
        code: "*500#",
      },
    ],
  },
  {
    id: "volte",
    title: "باقات فولتي VoLTE",
    description: "باقات مكالمات عالية الجودة عبر شبكة VoLTE.",
    packages: [
      {
        id: "volte-300",
        name: "فولتي 300",
        price: "300 ريال",
        internet: "—",
        minutes: "60 دقيقة VoLTE",
        sms: "—",
        validity: "7 أيام",
        network: "VoLTE",
        code: "*505#",
      },
      {
        id: "volte-700",
        name: "فولتي 700",
        price: "700 ريال",
        internet: "—",
        minutes: "200 دقيقة VoLTE",
        sms: "—",
        validity: "30 يوم",
        network: "VoLTE",
        code: "*505#",
      },
    ],
  },
  {
    id: "tawfeer-4g",
    title: "باقات توفير فورجي",
    description: "باقات اقتصادية بأسعار منخفضة وسرعة 4G.",
    packages: [
      {
        id: "tawfeer-200",
        name: "توفير 200",
        price: "200 ريال",
        internet: "300 ميجا",
        minutes: "15 دقيقة",
        sms: "15 رسالة",
        validity: "3 أيام",
        network: "4G",
        code: "*501#",
      },
      {
        id: "tawfeer-400",
        name: "توفير 400",
        price: "400 ريال",
        internet: "700 ميجا",
        minutes: "30 دقيقة",
        sms: "30 رسالة",
        validity: "7 أيام",
        network: "4G",
        code: "*501#",
      },
    ],
  },
  {
    id: "net-only-4g",
    title: "باقات نت فقط فورجي",
    description: "باقات إنترنت فقط بدون دقائق أو رسائل.",
    packages: [
      {
        id: "net-1gb",
        name: "نت 1 جيجا",
        price: "300 ريال",
        internet: "1 جيجا",
        minutes: "—",
        sms: "—",
        validity: "7 أيام",
        network: "4G",
        code: "*502#",
      },
      {
        id: "net-5gb",
        name: "نت 5 جيجا",
        price: "1200 ريال",
        internet: "5 جيجا",
        minutes: "—",
        sms: "—",
        validity: "30 يوم",
        network: "4G",
        code: "*502#",
      },
      {
        id: "net-10gb",
        name: "نت 10 جيجا",
        price: "2200 ريال",
        internet: "10 جيجا",
        minutes: "—",
        sms: "—",
        validity: "30 يوم",
        network: "4G",
        code: "*502#",
      },
    ],
  },
  {
    id: "sms-only",
    title: "باقات رسائل فقط",
    description: "باقات رسائل قصيرة بأسعار مناسبة.",
    packages: [
      {
        id: "sms-100",
        name: "رسائل 100",
        price: "100 ريال",
        internet: "—",
        minutes: "—",
        sms: "100 رسالة",
        validity: "7 أيام",
        network: "3G",
        code: "*503#",
      },
      {
        id: "sms-500",
        name: "رسائل 500",
        price: "400 ريال",
        internet: "—",
        minutes: "—",
        sms: "500 رسالة",
        validity: "30 يوم",
        network: "3G",
        code: "*503#",
      },
    ],
  },
  {
    id: "mazaya-3g",
    title: "باقات مزايا ثري جي",
    description: "باقات شاملة على شبكة 3G للمناطق غير المغطاة بـ 4G.",
    packages: [
      {
        id: "mazaya-3g-500",
        name: "مزايا 3G 500",
        price: "500 ريال",
        internet: "500 ميجا",
        minutes: "30 دقيقة",
        sms: "30 رسالة",
        validity: "7 أيام",
        network: "3G",
        code: "*504#",
      },
      {
        id: "mazaya-3g-1000",
        name: "مزايا 3G 1000",
        price: "1000 ريال",
        internet: "1.5 جيجا",
        minutes: "60 دقيقة",
        sms: "60 رسالة",
        validity: "15 يوم",
        network: "3G",
        code: "*504#",
      },
    ],
  },
];

export const APN_SETTINGS = {
  name: "Yemen Mobile 4G",
  apn: "internet",
  username: "",
  password: "",
  authType: "None",
  apnType: "default,supl",
  apnProtocol: "IPv4/IPv6",
};
