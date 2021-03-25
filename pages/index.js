import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../src/components/layout";
import GrayButton from "../src/components/button/GrayButton";
import ButtonItem from "../src/components/button/ButtonItem";
import LinkButtons from "../src/components/button/LinkButtons";
import ScrollPageTop from "../src/components/tools/ScrollPageTop";
import GoogleForm from "../src/components/tools/GoogleForm";
import ListTitle from "../src/components/title/ListTitle";
import Posts from "../src/components/home/posts";
import TitleMessage from "../src/components/qin/TitleMessage";
import MembersTextbox from "../src/components/qin/Textbox";
import Description from "../src/components/qin/Description";
import Editarea from "../src/components/qin/Editarea";
import MemberTag from "../src/components/qin/MemberTag";
import CircleColor from "../src/components/color/CircleColor";

function keywordConv(str) {
  let rep = str
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .toLowerCase();
  return rep;
}

export default function Home() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [json, setJson] = useState({
    titles: [
      "ツール＆サービス",
      "node.jsモジュール",
      "参考記事",
      "Qin-Design共有シート",
      "フォーム受付",
    ],
    data: {
      "ツール＆サービス": [
        {
          分類: "UI/UXデザインツール",
          ツール名: "Figma",
          URL: "https://www.figma.com/files/recent",
          備考: "",
        },
        {
          分類: "ウェブサービス連携",
          ツール名: "IFTTT",
          URL: "https://ifttt.com/",
          備考: "",
        },
        {
          分類: "ウェブサービス連携",
          ツール名: "Zapier",
          URL: "https://zapier.com/",
          備考: "",
        },
        {
          分類: "ウェブサービス連携",
          ツール名: "Integromat",
          URL: "https://www.integromat.com/en/",
          備考: "",
        },
        {
          分類: "ウェブサービス連携",
          ツール名: "Flow",
          URL: "https://flow.microsoft.com/ja-jp/",
          備考: "",
        },
        {
          分類: "オンラインコミュニティ",
          ツール名: "CodePen",
          URL: "https://codepen.io/",
          備考: "",
        },
        {
          分類: "クラウドコンピューティングサービス",
          ツール名: "AWS",
          URL: "https://aws.amazon.com/jp/",
          備考: "",
        },
        {
          分類: "コンテンツ管理ツール",
          ツール名: "Wordpress",
          URL: "https://wordpress.com/ja/",
          備考: "",
        },
        {
          分類: "ホスティングサービス",
          ツール名: "GitHub",
          URL: "https://github.co.jp/",
          備考: "",
        },
        {
          分類: "ホスティングサービス",
          ツール名: "Heroku",
          URL: "https://jp.heroku.com/",
          備考: "",
        },
        {
          分類: "ホスティングサービス",
          ツール名: "Netlify",
          URL: "https://www.netlify.com/",
          備考: "",
        },
        {
          分類: "ホスティングサービス",
          ツール名: "Vercel",
          URL: "https://vercel.com/",
          備考: "",
        },
        {
          分類: "ロゴデザイン",
          ツール名: "Hatchful",
          URL: "https://hatchful.shopify.com/ja/",
          備考: "",
        },
        {
          分類: "開発プラットフォーム",
          ツール名: "firebase",
          URL: "https://firebase.google.com/?hl=ja",
          備考: "",
        },
        {
          分類: "開発プラットフォーム",
          ツール名: "supabase",
          URL: "https://supabase.io/",
          備考: "アナハンターで使用",
        },
        {
          分類: "投票",
          ツール名: "多数決.com",
          URL: "https://tasuketsu.com",
          備考: "",
        },
        {
          分類: "統合開発環境",
          ツール名: "CodeSandBox",
          URL: "https://codesandbox.io/",
          備考: "",
        },
        {
          分類: "分散型バージョン管理システム",
          ツール名: "git",
          URL: "https://git-scm.com/",
          備考: "",
        },
        {
          分類: "翻訳サービス",
          ツール名: "DeepL",
          URL: "https://www.deepl.com/en/translator",
          備考: "",
        },
        {
          分類: "コードエディター",
          ツール名: "VScode",
          URL: "https://azure.microsoft.com/ja-jp/products/visual-studio-code/",
          備考: "",
        },
        {
          分類: "コードエディター",
          ツール名: "Atom",
          URL: "https://atom.io/",
          備考: "",
        },
        {
          分類: "メモアプリケーション",
          ツール名: "Notion",
          URL: "https://www.notion.so/",
          備考: "",
        },
        {
          分類: "メモアプリケーション",
          ツール名: "Evernote",
          URL: "https://evernote.com/intl/jp",
          備考: "",
        },
        {
          分類: "SVGアイコン素材",
          ツール名: "Heroicons",
          URL: "https://heroicons.com/",
          備考: "",
        },
        {
          分類: "イラスト素材",
          ツール名: "unDraw",
          URL: "https://undraw.co/illustrations",
          備考: "",
        },
        {
          分類: "アイコン素材",
          ツール名: "Font Awesome",
          URL: "https://fontawesome.com/",
          備考: "",
        },
        {
          分類: "画像圧縮",
          ツール名: "squoosh",
          URL: "https://squoosh.app/",
          備考: "",
        },
        {
          分類: "チートシート",
          ツール名: "Tailwind Cheat Sheet",
          URL: "https://nerdcave.com/tailwind-cheat-sheet",
          備考: "",
        },
        {
          分類: "タスク管理ツール",
          ツール名: "Trello",
          URL: "https://trello.com/",
          備考: "",
        },
        {
          分類: "出欠表ツール",
          ツール名: "調整さん",
          URL: "https://chouseisan.com/",
          備考: "",
        },
        {
          分類: "デザインツール",
          ツール名: "whimsical",
          URL: "https://whimsical.com/",
          備考: "",
        },
        {
          分類: "アプリランチャー",
          ツール名: "CLaunch",
          URL: "https://t.co/LUwT3fY6BM?amp=1",
          備考: "",
        },
        {
          分類: "クリップボード管理",
          ツール名: "Clibor",
          URL: "https://t.co/4IubZFEt8y?amp=1",
          備考: "",
        },
        {
          分類: "キーバインド関連",
          ツール名: "ChgKey",
          URL: "https://t.co/FNKwXEZcKd?amp=1",
          備考: "",
        },
        {
          分類: "キーバインド関連",
          ツール名: "AutoHotKey",
          URL: "https://t.co/J3f1tRQVBC?amp=1",
          備考: "",
        },
        {
          分類: "HTTP通信キャプチャアプリ",
          ツール名: "Fiddler",
          URL: "https://t.co/d5KYn3NGOz?amp=1",
          備考: "",
        },
        {
          分類: "統合開発環境",
          ツール名: "GitPod",
          URL: "https://www.gitpod.io/",
          備考: "",
        },
        {
          分類: "スクリプト言語",
          ツール名: "Google Apps Script(GAS)",
          URL: "https://developers.google.com/apps-script?hl=ja",
          備考: "",
        },
      ],
      "node.jsモジュール": [
        {
          分類: "React フレームワーク",
          ツール名: "Material UI",
          URL: "https://material-ui.com/ja/",
          備考: "",
        },
        {
          分類: "Javascript フレームワーク",
          ツール名: "React.js",
          URL: "https://reactjs.org/",
          備考: "",
        },
        {
          分類: "CSS フレームワーク",
          ツール名: "Tailwind.css",
          URL: "https://tailwindcss.com/",
          備考: "",
        },
        {
          分類: "Javascript フレームワーク",
          ツール名: "Vue.js",
          URL: "https://jp.vuejs.org/index.html",
          備考: "",
        },
        {
          分類: "Vue フレームワーク",
          ツール名: "Nuxt.js",
          URL: "https://ja.nuxtjs.org/",
          備考: "",
        },
        {
          分類: "JavaScriptトランスコンパイラ",
          ツール名: "Babel",
          URL: "https://babeljs.io/",
          備考: "",
        },
        {
          分類: "JavaScriptモジュールバンドラー",
          ツール名: "Webpack",
          URL: "https://webpack.js.org/",
          備考: "",
        },
        {
          分類: "フロントエンドフレームワーク",
          ツール名: "Bootstrap",
          URL: "https://getbootstrap.jp/",
          備考: "",
        },
        {
          分類: "React フレームワーク",
          ツール名: "Gatsby",
          URL: "https://www.gatsbyjs.com/",
          備考: "",
        },
        {
          分類: "Vue フレームワーク",
          ツール名: "Vuetify",
          URL: "https://vuetifyjs.com/ja/",
          備考: "",
        },
        {
          分類: "Webアプリケーションフレームワーク",
          ツール名: "Express",
          URL: "https://expressjs.com/ja/",
          備考: "",
        },
        {
          分類: "コードフォーマッター",
          ツール名: "Prettier",
          URL: "https://prettier.io/",
          備考: "",
        },
        {
          分類: "静的検証ツール",
          ツール名: "ESLint",
          URL: "https://eslint.org/",
          備考: "",
        },
        {
          分類: "React コンポーネントセット",
          ツール名: "Ant Design",
          URL: "https://ant.design/",
          備考: "",
        },
      ],
      参考記事: [
        {
          分類: "Qiita",
          ツール名: "エンジニアの情報収集法まとめ",
          URL: "https://qiita.com/nesheep5/items/e7196ba496e59bb2aa28",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名:
            "非デザイナーエンジニアが一人でWebサービスを作るときに便利なツール32選",
          URL: "https://qiita.com/okappy/items/119e31cae9aa9bd9da6d",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名: "プログラマが独立・起業する時によくするミスと対策 まとめ",
          URL: "https://qiita.com/hshimo/items/776e3ca62be51c3bdc89",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名:
            "WebAPIでエラーをどう表現すべき？15のサービスを調査してみた",
          URL: "https://qiita.com/suin/items/f7ac4de914e9f3f35884",
          備考: "",
        },
        {
          分類: "Tech-Camp",
          ツール名:
            "ノーコード開発ツールおすすめ13選 プログラミングなしでアプリやWebサイトを作ろう",
          URL: "https://tech-camp.in/note/technology/92173/",
          備考: "",
        },
        {
          分類: "Udemy",
          ツール名: "React入門講座（Qin国民のじゃけぇさんが講師！！）",
          URL:
            "https://www.udemy.com/course/modern_javascipt_react_beginner/?couponCode=JAK20210106",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名:
            "早く・それなりの UI を実現する React コンポーネントセット 16 選",
          URL: "https://qiita.com/kyrieleison/items/39ce30dd2d204791a9ea",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名: "JavaScript ベスト・オブ・ザ・イヤー 2020",
          URL: "https://qiita.com/rana_kualu/items/e8a0f8f5589ff082539d",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名: "Reactなどの開発を効率化する拡張機能を紹介 #VS Code",
          URL: "https://qiita.com/e8750520/items/2052702c365dab09d3db",
          備考: "",
        },
        {
          分類: "Qiita",
          ツール名: "JSON.stringifyの出力結果を整形して可読性を向上させる",
          URL: "https://qiita.com/unsoluble_sugar/items/7df08527215ea92831a6",
          備考: "",
        },
      ],
      "Qin-Design共有シート": [
        {
          ツール名: "MEDULLA",
          URL: "https://medulla.co.jp/",
          紹介者: "sana",
          分類: "ウェブサイト",
          追加日: "2021-01-01T15:00:00.000Z",
          コメントなど: "パーソナライズ用のUIが美しい",
        },
        {
          ツール名: "code my UI",
          URL: "https://codemyui.com/",
          紹介者: "sana",
          分類: "アプリケーション",
          追加日: "2021-01-01T15:00:00.000Z",
          コメントなど: "JSアニメーションの勉強におすすめ！",
        },
        {
          ツール名: "undraw",
          URL: "https://undraw.co/illustrations",
          紹介者: "ぱぱっぷ",
          分類: "アプリケーション",
          追加日: "2021-01-01T15:00:00.000Z",
          コメントなど:
            "サイトやサービスに使える無料イラスト素材（色を自由にカスタマイズできるのが個人的に好きです！）",
        },
        {
          ツール名: "fontawesome",
          URL: "https://fontawesome.com/",
          紹介者: "ぱぱっぷ",
          分類: "アプリケーション",
          追加日: "2021-01-01T15:00:00.000Z",
          コメントなど: "無料でも豊富なアイコン素材を利用できる！",
        },
        {
          ツール名: "Onsen UI",
          URL: "https://ja.onsen.io/",
          紹介者: "yoshi",
          分類: "アプリケーション",
          追加日: "2021-01-01T15:00:00.000Z",
          コメントなど: "HTML5モバイルアプリ、Webアプリ向けの UIフレームワーク",
        },
        {
          ツール名: "読者が選ぶビジネス書グランプリ",
          URL: "https://business-book.jp/",
          紹介者: "sana",
          分類: "ウェブサイト",
          追加日: "2021-01-02T15:00:00.000Z",
          コメントなど: "スクロールによってエリアが分割されてて見やすい！",
        },
        {
          ツール名: "Basecamp",
          URL: "https://basecamp.dev/",
          紹介者: "しまぶー",
          分類: "ウェブサイト",
          追加日: "2021-01-02T15:00:00.000Z",
          コメントなど:
            "つよつよデザイナーが集まってコンサル的な仕事をしているとこ。サイト自体もポップで素敵です。",
        },
        {
          ツール名: "THE GUILD",
          URL: "https://theguild.jp/",
          紹介者: "しまぶー",
          分類: "ウェブサイト",
          追加日: "2021-01-02T15:00:00.000Z",
          コメントなど:
            "上記と同じくデザイナーが集まって仕事しています。ここが作るサイトはどれも使い勝手が良いです。",
        },
        {
          ツール名: "Awwards",
          URL: "https://www.awwwards.com/",
          紹介者: "サク",
          分類: "ウェブサイト",
          追加日: "2021-01-02T15:00:00.000Z",
          コメントなど:
            "デザインをアワードしていると思います。（個人的にこちらのサイトどのサイトも見てて楽しいです。）",
        },
        {
          ツール名: "earCOUTURE",
          URL: "https://earcouture.jp/",
          紹介者: "サク",
          分類: "ウェブサイト",
          追加日: "2021-01-02T15:00:00.000Z",
          コメントなど:
            "美しくて忘れられない、まだ暫く消えないで欲しいサイトです。（個人的意見ですみません）",
        },
        {
          ツール名: "IFTTT",
          URL: "https://ifttt.com/",
          紹介者: "しまぶー",
          分類: "ウェブサイト",
          追加日: "2021-03-24T15:00:00.000Z",
          コメントなど:
            "太目なデザインかつシンプルで分かりやすくインパクトがあります",
        },
        {
          ツール名: "ランドセルのatara",
          URL: "https://www.atara-xyl.jp/f/lineup",
          紹介者: "manarak",
          分類: "ウェブサイト",
          追加日: "2021-03-24T15:00:00.000Z",
          コメントなど: "シンプルでふわっとした感じが優しさを感じさせる。",
        },
        {
          ツール名: "note",
          URL: "https://note.com/",
          紹介者: "しぐ",
          分類: "ウェブサイト",
          追加日: "2021-03-24T15:00:00.000Z",
          コメントなど:
            "言わずと知れたブログサービスですが、眺めているだけで改めてUIの重要さに気付かされます。",
        },
        {
          ツール名: "v-resas",
          URL: "https://v-resas.go.jp/",
          紹介者: "しぐ",
          分類: "ウェブサイト",
          追加日: "2021-03-24T15:00:00.000Z",
          コメントなど: "",
        },
        {
          ツール名: "box",
          URL: "https://alliancelp-itscom.jp/box/",
          紹介者: "しぐ",
          分類: "ウェブサイト",
          追加日: "2021-02-05T15:00:00.000Z",
          コメントなど: "クラウドストレージサービス",
        },
      ],
      フォーム受付: [
        {
          タイムスタンプ: "2021-03-17T22:18:00.529Z",
          分類: "記事",
          名称: "カラーネーム/RGB/HSL ウェブでのカラー指定いろいろ",
          URL: "http://creator.aainc.co.jp/archives/5724",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-17T22:43:25.188Z",
          分類: "記事",
          名称: "GoogleフォームをWEBサイトに埋め込む方法",
          URL: "https://souken-blog.com/2019/05/28/gogle-form/",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-18T03:56:19.746Z",
          分類: "記事",
          名称:
            "ホームページのアクセス数を調べる方法 | Googleアナリティクスを使ってみよう",
          URL:
            "https://www.google.com/amp/s/wacul-ai.com/blog/access-analysis/google-analytics-method/access-count/%3Famp",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-18T23:38:30.667Z",
          分類: "記事",
          名称:
            "GitHubのURLをちょろっと書き換えるだけでコードを「Visual Studio Code」で閲覧できる素敵なサービスが話題に",
          URL:
            "https://forest.watch.impress.co.jp/docs/serial/yajiuma/1306113.html",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T05:34:49.169Z",
          分類: "記事",
          名称:
            "JavaScriptでGETパラメータを取得する方法を現役エンジニアが解説【初心者向け】",
          URL: "https://techacademy.jp/magazine/25659",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T06:21:14.613Z",
          分類: "記事",
          名称:
            "【GAS】スマホやタブレットからスプレッドシートのスクリプトを実行する方法",
          URL:
            "https://for-dummies.net/gas-noobs/how-to-excute-gas-functions-from-smartphones-and-tablets/",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T06:53:17.340Z",
          分類: "Qitta",
          名称: "GASが動かない時に見るところ",
          URL: "https://qiita.com/sy250f/items/7fe62873255e1b4e4c2b",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T07:07:45.266Z",
          分類: "記事",
          名称: "GAS ビギナーが GAS を使いこなすために知るべきこと 10 選",
          URL: "https://qiita.com/tanabee/items/2c51681396fe12b6a0e4",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T07:35:01.652Z",
          分類: "記事",
          名称:
            "【保存版！】Googleフォームの質問と回答をGASで自在に取り出す方法まとめ",
          URL: "https://www.yukibnb.com/entry/form_responses",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T09:19:08.976Z",
          分類: "スクリプト言語",
          名称: "Python",
          URL: "https://www.python.org/",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T09:23:20.516Z",
          分類: "Webアプリケーションフレームワーク(Python)",
          名称: "Django",
          URL: "https://docs.djangoproject.com/ja/3.1/",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T09:25:40.856Z",
          分類: "Webアプリケーションフレームワーク(PHP)",
          名称: "Laravel",
          URL: "https://laravel.com/",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T09:27:17.211Z",
          分類: "スクリプト言語",
          名称: "PHP",
          URL: "https://www.php.net/manual/ja/intro-whatis.php",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T10:03:28.802Z",
          分類: "タイピング練習ゲーム",
          名称: "寿司打",
          URL: "http://typingx0.net/sushida",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T10:04:21.276Z",
          分類: "タイピング練習ゲーム",
          名称: "e-typing",
          URL: "https://www.e-typing.ne.jp",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-21T12:32:20.472Z",
          分類: "画面落書きアプリ",
          名称: "ScreenBrush",
          URL: "https://imagestudiopro.com/screenbrush/",
          備考:
            "しまぶーさんの講座でも使用されてました。プレゼンをするときやLT会でも使えると思います。",
        },
        {
          タイムスタンプ: "2021-03-22T13:53:10.044Z",
          分類: "Webフォントアイコン集",
          名称: "Webフォント「Font Awesome4」の使い方",
          URL: "https://www.just-size.net/support/tips_fontawesome.php",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-22T15:15:13.169Z",
          分類: "記事",
          名称: "IPA_安全なウェブサイトの作り方",
          URL: "https://www.ipa.go.jp/security/vuln/websecurity.html",
          備考: "少し古いですが、どのような攻撃があり得るのかも学べます。",
        },
        {
          タイムスタンプ: "2021-03-22T15:19:32.535Z",
          分類: "記事",
          名称: "ISMAPクラウドサービスリスト",
          URL: "https://www.ipa.go.jp/security/ismap/cslist.html",
          備考: "クラウド選定の参考になります",
        },
        {
          タイムスタンプ: "2021-03-22T15:25:10.400Z",
          分類: "記事",
          名称: "CRYPTREC暗号リスト",
          URL: "https://www.cryptrec.go.jp/list/cryptrec-ls-0001-2012r5.pdf",
          備考: "暗号技術選択の参考",
        },
        {
          タイムスタンプ: "2021-03-22T15:37:04.217Z",
          分類: "サービス",
          名称: "feedly",
          URL: "https://feedly.com/i/welcome",
          備考: "RSSリーダー",
        },
        {
          タイムスタンプ: "2021-03-22T21:19:21.242Z",
          分類: "ツール",
          名称: "Tailwind Templates",
          URL: "https://tailwindtemplates.io/",
          備考: "classをclassNameにしなければいけませんがコピペで使えます。",
        },
        {
          タイムスタンプ: "2021-03-23T01:42:32.431Z",
          分類: "サービス",
          名称: "Freenom",
          URL: "http://www.freenom.com/ja/index.html",
          備考:
            "無料でドメイン取得できるサービス(開発環境などで試したいときによく使う)",
        },
        {
          タイムスタンプ: "2021-03-23T12:25:31.678Z",
          分類: "VScode拡張機能",
          名称: "Todo Tree",
          URL:
            "https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-23T13:45:25.847Z",
          分類: "記事",
          名称: "日本語対応！CSS Flexboxのチートシートを作ったので配布します",
          URL: "https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-24T21:52:11.293Z",
          分類: "アイコン",
          名称: "gitmoji",
          URL: "https://gitmoji.dev/",
          備考: "",
        },
        {
          タイムスタンプ: "2021-03-25T03:11:18.342Z",
          分類: "記事",
          名称: "hygenでテンプレートからReactコンポーネントを生成する",
          URL: "https://panda-program.com/posts/hygen-react",
          備考: "",
        },
      ],
    },
  });
  useEffect(() => {}, items);
  function load() {
    let self = this;
    axios
      .get(
        "https://script.google.com/macros/s/AKfycbzdElyGY3H5HYcoUKOxOG9-F7LpmwlPe2y13jZv3lskhajjF20A4KiZNT7e6EoMvF2aOQ/exec"
      )
      .then(function (res) {
        console.log(res);
        self.items = res.data;
      });
  }
  function doSearch(e) {
    setKeyword(keywordConv(e.target.value));
  }
  return (
    <Layout>
      <Head>
        <title>QinTechBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div class="w-full px-4 mt-4">
        <input
          type="search"
          className="w-full bg-black focus:bg-gray-900 outline-none rounded-full border border-gray-800 px-4 py-1 text-white"
          placeholder="検索"
          onClick={doSearch}
        ></input>
      </div>
      <ButtonItem>
        <GrayButton title="test" url="google.com"></GrayButton>
      </ButtonItem>
      <ListTitle title="ツール＆サービス" />
      <ListTitle title="npm module" />
      <ListTitle title="記事" />
      <ListTitle title="Qin-Design共有シート" />
      <ListTitle title="フォーム受付" />
      <ListTitle title="受付フォーム" />
      <GoogleForm />
      <ScrollPageTop></ScrollPageTop>
    </Layout>
  );
}
