// contient la configuration de la bibliothèque vue-i18n pour la gestion de l'internationalisation.
// i18n.ts : Configuration de vue-i18n pour la gestion de l'internationalisation

import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    messages: {
      hello: 'Hello',
      welcome: 'Welcome {name}',
      homeIntro: 'Hello everyone, here’s a Vue 3 base for you to work on',
      secondPageIntro: 'Here’s an example of using Vue Router to make your life easier',
      example: 'Click the button to see examples you can copy-paste to save time',
      language: 'Select your language',
    },
    errors: {
      required: '{field} is required',
      invalidEmail: 'Invalid email address',
      minLength: '{field} must be at least {min} characters',
    },
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      loading: 'Loading...',
    },
    buttons: {
      next: 'Next',
      backHome: 'Back to Home',
    },
    sections: {
      core: 'Core Concepts',
      advanced: 'Advanced Features',
    },
  },
  fr: {
    messages: {
      hello: 'Bonjour',
      welcome: 'Bienvenue {name}',
      homeIntro: 'Hello tout le monde voici une base vue3 sur laquelle tu peux travailler',
      secondPageIntro: 'Voilà un exemple d\'utilisation de vuerouter, c\'est pour te faciliter la vie',
      example: 'Clique sur le button pour voir des exemples que tu peux copier-coller pour gagner du temps',
      language: 'Choisissez votre langue',
    },
    errors: {
      required: '{field} est requis',
      invalidEmail: 'Adresse email invalide',
      minLength: '{field} doit contenir au moins {min} caractères',
    },
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      loading: 'Chargement...',
    },
    buttons: {
      next: 'Suivant',
      backHome: 'Retour à l\'accueil',
    },
    sections: {
      core: 'Concepts de Base',
      advanced: 'Fonctionnalités Avancées',
    },
  },
  zh: {
    messages: {
      hello: '你好',
      welcome: '欢迎 {name}',
      homeIntro: '大家好，这是一个 Vue 3 基础项目，供你工作使用',
      secondPageIntro: '这是使用 Vue Router 的一个示例，让你的生活更轻松',
      example: '点击按钮查看可以复制粘贴的示例，以节省时间',
      language: '选择你的语言',
    },
    errors: {
      required: '{field} 是必需的',
      invalidEmail: '无效的电子邮件地址',
      minLength: '{field} 必须至少包含 {min} 个字符',
    },
    common: {
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      loading: '加载中...',
    },
    buttons: {
      next: '下一步',
      backHome: '返回首页',
    },
  },
  ja: {
    messages: {
      hello: 'こんにちは',
      welcome: 'ようこそ {name}',
      homeIntro: 'みなさんこんにちは、これは作業に使用できる Vue 3 の基本プロジェクトです',
      secondPageIntro: 'これは Vue Router を使用した例です。あなたの生活を楽にします',
      example: '時間を節約するためにコピー＆ペーストできる例を見るには、ボタンをクリックしてください',
      language: 'あなたの言語を選択してください',
    },
    errors: {
      required: '{field} は必須です',
      invalidEmail: '無効なメールアドレス',
      minLength: '{field} は少なくとも {min} 文字でなければなりません',
    },
    common: {
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      loading: '読み込み中...',
    },
    buttons: {
      next: '次へ',
      backHome: 'ホームに戻る',
    },
  },
  ko: {
    messages: {
      hello: '안녕하세요',
      welcome: '환영합니다 {name}',
      homeIntro: '안녕하세요, 여기에서 작업할 수 있는 Vue 3 기본 프로젝트입니다',
      secondPageIntro: 'Vue Router를 사용하는 예시입니다. 당신의 삶을 더 쉽게 만듭니다',
      example: '시간을 절약하기 위해 복사하여 붙여넣을 수 있는 예제를 보려면 버튼을 클릭하세요',
      language: '언어를 선택하세요',
    },
    errors: {
      required: '{field} 은(는) 필수입니다',
      invalidEmail: '잘못된 이메일 주소',
      minLength: '{field} 은(는) 최소 {min}자여야 합니다',
    },
    common: {
      save: '저장',
      cancel: '취소',
      delete: '삭제',
      edit: '편집',
      loading: '로딩 중...',
    },
    buttons: {
      next: '다음',
      backHome: '홈으로 돌아가기',
    },
  },
  ru: {
    messages: {
      hello: 'Здравствуйте',
      welcome: 'Добро пожаловать, {name}',
      homeIntro: 'Привет всем, это основа Vue 3 для работы',
      secondPageIntro: 'Пример использования Vue Router для облегчения работы',
      example: 'Нажмите на кнопку, чтобы увидеть примеры, которые можно копировать и вставлять для экономии времени',
      language: 'Выберите ваш язык',
    },
    errors: {
      required: '{field} обязателен',
      invalidEmail: 'Неверный адрес электронной почты',
      minLength: '{field} должен содержать не менее {min} символов',
    },
    common: {
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      edit: 'Редактировать',
      loading: 'Загрузка...',
    },
    buttons: {
      next: 'Далее',
      backHome: 'На главную',
    },
  },
  de: {
    messages: {
      hello: 'Hallo',
      welcome: 'Willkommen {name}',
      homeIntro: 'Hallo zusammen, hier ist eine Vue 3 Basis für die Arbeit',
      secondPageIntro: 'Ein Beispiel für die Verwendung des Vue Routers zur Erleichterung',
      example: 'Klicken Sie auf die Schaltfläche, um Beispiele anzuzeigen, die Sie kopieren und einfügen können, um Zeit zu sparen',
      language: 'Wählen Sie Ihre Sprache',
    },
    errors: {
      required: '{field} ist erforderlich',
      invalidEmail: 'Ungültige E-Mail-Adresse',
      minLength: '{field} muss mindestens {min} Zeichen lang sein',
    },
    common: {
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      loading: 'Laden...',
    },
    buttons: {
      next: 'Weiter',
      backHome: 'Zurück zur Startseite',
    },
  },
  it: {
    messages: {
      hello: 'Ciao',
      welcome: 'Benvenuto {name}',
      homeIntro: 'Ciao a tutti, ecco una base Vue 3 su cui lavorare',
      secondPageIntro: 'Ecco un esempio di utilizzo di Vue Router per semplificare la vita',
      example: 'Clicca sul pulsante per vedere esempi che puoi copiare e incollare per risparmiare tempo',
      language: 'Seleziona la tua lingua',
    },
    errors: {
      required: '{field} è obbligatorio',
      invalidEmail: 'Indirizzo email non valido',
      minLength: '{field} deve contenere almeno {min} caratteri',
    },
    common: {
      save: 'Salva',
      cancel: 'Annulla',
      delete: 'Elimina',
      edit: 'Modifica',
      loading: 'Caricamento...',
    },
    buttons: {
      next: 'Avanti',
      backHome: 'Torna alla home',
    },
  },
  es: {
    messages: {
      hello: 'Hola',
      welcome: 'Bienvenido {name}',
      homeIntro: 'Hola a todos, aquí hay una base de Vue 3 para trabajar',
      secondPageIntro: 'Este es un ejemplo del uso de Vue Router para facilitar la vida',
      example: 'Haz clic en el botón para ver ejemplos que puedes copiar y pegar para ahorrar tiempo',
      language: 'Selecciona tu idioma',
    },
    errors: {
      required: '{field} es obligatorio',
      invalidEmail: 'Dirección de correo electrónico no válida',
      minLength: '{field} debe tener al menos {min} caracteres',
    },
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      loading: 'Cargando...',
    },
    buttons: {
      next: 'Siguiente',
      backHome: 'Volver al inicio',
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'en',
  messages,
});
