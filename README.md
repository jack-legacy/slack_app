# じゃっくん(Slack BOT)

<div align="center">
<img src="https://github.com/jack-legacy/slack_app/blob/main/docs/%E3%81%98%E3%82%83%E3%81%A3%E3%81%8F%E3%82%93.jpg?raw=true" alt="じゃっくんのアイコン" style="justify-content: center; width: 20%;">
</div>

jackLegacyで動くじゃっくんの実体です。
Boltで作成。

# じゃっくんの機能

- Boltで実装されているため、Boltで実現できることはなんでもできます。
- 一定間隔でSlackへメッセージを投稿することが可能です。
  - ただし、1分おきのみ対応

# Development

## 必要ツール

- docker

## ローカルで動かすには？

1. `.env`を作成する。
   詳細は管理者にメンションください。

   ```
   SLACK_SIGNING_SECRET=
   SLACK_BOT_TOKEN=
   GATHER_SPACE_ID=
   GATHER_API_KEY=
   ```

2. `make`で起動

## 機能追加するには？

**🙇WIP🙇**
基本的には`/admin`配下のファイルを参考にしてください。
