# 機能クローズドループ

## 文書目的

この文書は、現在の demo で比較的まとまったクローズドループを形成している機能と、そのページ間の接続を整理するものです。

## 1. コース購入ループ

流れ:

1. ユーザーが `コース` ページに入る
2. 購入可能コースを見る
3. コース詳細へ進む
4. 購入を実行する
5. ローカル購入状態を書き込む
6. 支払い結果ページへ遷移する
7. コースページへ戻ると受講中コースへ移動する

関係ページ:
- `pages/tab/course/index`
- `pages/catalog/course-detail/index`
- `pages/commerce/payment/index`

関係状態:
- `purchased`
- `purchasedCourseIds`
- `lastPurchasedCourseId`

## 2. イベント申込ループ

流れ:

1. ユーザーがホームまたは時間割からイベントページへ進む
2. 申込を押す
3. 申込状態を書き込む
4. イベント通知文面が変わる
5. 時間割にイベント予定が追加される
6. 再度押すと申込を取り消せる

関係ページ:
- `pages/engagement/activity/index`
- `pages/learning/schedule/index`
- `pages/tab/home/index`

関係状態:
- `activitySignedUp`

## 3. 毎日タスクループ

流れ:

1. ユーザーがタスクページに入る
2. 単語カードを開く
3. 単語学習済みを記録する
4. 単語完了後にチェックインする
5. 画面の連続記録と完了状態が更新される

関係状態:
- `learnedVocabIds`
- `dailyTaskCompleted`

## 4. 宿題提出ループ

流れ:

1. ユーザーがタスクまたは時間割から宿題ページへ進む
2. 宿題提出を押す
3. 提出状態を書き込む
4. 関連画面で状態が変わる

関係ページ:
- `pages/tab/task/index`
- `pages/learning/homework/index`
- `pages/tab/profile/index`

関係状態:
- `homeworkSubmitted`

## 5. メッセージ既読ループ

流れ:

1. ユーザーがメッセージセンターに入る
2. 分類を選ぶ
3. メッセージを開く
4. 既読状態を書き込む
5. 詳細を表示する
6. 未読数と一覧状態を更新する

関係状態:
- `readNotificationIds`

## 6. 時間割から学習内容へのループ

流れ:

1. ユーザーが時間割ページに入る
2. コース項目を押す
3. lesson 詳細へ進む
4. 学習内容、単語、文法を確認する
5. 申込済みコースでは練習内容も表示する

関係ページ:
- `pages/learning/schedule/index`
- `pages/learning/lesson-detail/index`

## 7. マイページから成長表示へのループ

流れ:

1. ユーザーがマイページに入る
2. 学習記録、トレンド、レーダー、教師サマリーを確認する
3. 会員センターへ進む

関係ページ:
- `pages/tab/profile/index`
- `pages/account/membership/index`
